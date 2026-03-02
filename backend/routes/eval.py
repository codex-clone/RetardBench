"""Evaluation routes with sync and async processing."""

import asyncio
import logging
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel

from src.core.models import EvalRequest
from src.evaluators.retard_evaluator import RetardEvaluator
from src.utils.dataset import load_jsonl
from backend.deps import get_conn, PROMPTS_DIR

router = APIRouter(prefix="/eval", tags=["eval"])
logger = logging.getLogger(__name__)

# Keep a reference to background tasks so they aren't garbage collected
_background_tasks = set()


class SyncEvalRequest(BaseModel):
    model: str
    provider: str = "ollama"
    num_prompts: int = 10
    use_llm_judge: bool = False


class EvalStatusResponse(BaseModel):
    evaluation_id: str
    status: str
    progress: float
    completed: int
    total: int
    result: Optional[dict] = None
    started_at: Optional[str] = None
    completed_at: Optional[str] = None


@router.post("/")
async def run_eval(req: EvalRequest):
    """Run synchronous evaluation (max 20 prompts for fast feedback)."""
    if len(req.prompts) > 20:
        logger.warning("sync_eval_too_large", extra={"count": len(req.prompts)})
        raise HTTPException(400, "Max 20 prompts for sync eval. Use /eval/async for larger runs.")

    try:
        evaluator = RetardEvaluator(use_llm_judge=False)
        result = await evaluator.evaluate(req.model, req.provider, req.prompts)
        return result.model_dump()
    except Exception as exc:
        logger.exception("sync_eval_failed", extra={"model": req.model})
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/async")
async def start_async_eval(req: SyncEvalRequest):
    """Start async evaluation with progress tracking. Returns evaluation_id for polling."""
    evaluation_id = str(uuid.uuid4())
    started_at = datetime.now(timezone.utc).isoformat()

    try:
        conn = get_conn()
        conn.execute(
            "INSERT INTO evaluations (id, model_id, provider, status, total_prompts, started_at) VALUES (?, ?, ?, ?, ?, ?)",
            (evaluation_id, req.model, req.provider, "pending", req.num_prompts, started_at),
        )
        conn.commit()
    except Exception as exc:
        logger.exception("failed_to_store_evaluation_start", extra={"id": evaluation_id, "error": str(exc)})
        raise HTTPException(status_code=500, detail="Failed to initialize evaluation") from exc
    finally:
        conn.close()

    async def run_background():
        logger.info("background_eval_started", extra={"id": evaluation_id, "model": req.model})
        try:
            conn = get_conn()
            conn.execute(
                "UPDATE evaluations SET status = 'running' WHERE id = ?",
                (evaluation_id,),
            )
            conn.commit()

            # Load prompts
            prompt_path = PROMPTS_DIR / "custom-retarded.jsonl"
            prompts = load_jsonl(prompt_path, limit=req.num_prompts)

            if not prompts:
                conn.execute(
                    "UPDATE evaluations SET status = 'error' WHERE id = ?",
                    (evaluation_id,),
                )
                conn.commit()
                logger.error("no_prompts_found", extra={"id": evaluation_id})
                return

            evaluator = RetardEvaluator(
                use_llm_judge=req.use_llm_judge,
                max_concurrent=5,
            )

            async def update_progress(completed: int, total: int):
                # Update DB progress less frequently to avoid lock contention
                if completed % 5 == 0 or completed == total:
                    try:
                        conn.execute(
                            "UPDATE evaluations SET completed_prompts = ? WHERE id = ?",
                            (completed, evaluation_id),
                        )
                        conn.commit()
                    except Exception as e:
                        logger.warning("progress_update_failed", extra={"id": evaluation_id, "error": str(e)})

            result = await evaluator.evaluate(
                model=req.model,
                provider=req.provider,
                prompts=prompts,
                evaluation_id=evaluation_id,
                progress_callback=update_progress,
                db_conn=conn,
            )

            completed_at = datetime.now(timezone.utc).isoformat()
            
            # Update final status
            conn.execute(
                """UPDATE evaluations 
                   SET status = 'completed', completed_prompts = ?, completed_at = ? 
                   WHERE id = ?""",
                (len(prompts), completed_at, evaluation_id),
            )
            conn.commit()
            
            logger.info("background_eval_completed", extra={
                "id": evaluation_id, 
                "score": result.retard_index,
            })

        except Exception as exc:
            logger.exception("background_eval_error", extra={"id": evaluation_id, "error": str(exc)})
            try:
                # Update status to error
                conn = get_conn()
                conn.execute(
                    "UPDATE evaluations SET status = 'error', completed_at = ? WHERE id = ?",
                    (datetime.now(timezone.utc).isoformat(), evaluation_id),
                )
                conn.commit()
            except Exception:
                pass
        finally:
            conn.close()

    # Use asyncio.create_task to ensure it runs even if connection closes
    task = asyncio.create_task(run_background())
    _background_tasks.add(task)
    task.add_done_callback(_background_tasks.discard)

    return {"evaluation_id": evaluation_id, "status": "started"}


@router.get("/history")
async def list_evaluations(limit: int = 50):
    """List past evaluation runs."""
    try:
        conn = get_conn()
        rows = conn.execute(
            """SELECT id, model_id, provider, status, total_prompts, 
               completed_prompts, started_at, completed_at, created_at 
               FROM evaluations ORDER BY created_at DESC LIMIT ?""",
            (limit,),
        ).fetchall()
        
        return [dict(r) for r in rows]
    except Exception as exc:
        logger.exception("history_fetch_failed", extra={"error": str(exc)})
        raise HTTPException(500, str(exc)) from exc
    finally:
        conn.close()


@router.get("/{evaluation_id}")
async def get_eval_status(evaluation_id: str):
    """Get evaluation status from DB."""
    try:
        conn = get_conn()
        row = conn.execute(
            """SELECT id as evaluation_id, model_id, provider, status, total_prompts as total, 
               completed_prompts as completed, started_at, completed_at 
               FROM evaluations WHERE id = ?""",
            (evaluation_id,),
        ).fetchone()
        
        if row:
            data = dict(row)
            data["progress"] = (data["completed"] / max(1, data["total"])) * 100.0 if data["total"] else 0.0
            return data
            
        raise HTTPException(404, "Evaluation not found")
        
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("status_fetch_failed", extra={"id": evaluation_id, "error": str(exc)})
        raise HTTPException(500, "Failed to get evaluation status") from exc
    finally:
        if 'conn' in locals():
            conn.close()
