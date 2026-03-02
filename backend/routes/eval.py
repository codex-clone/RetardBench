"""Evaluation routes with sync and async processing."""

import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional

from src.core.models import EvalRequest, PromptItem
from src.evaluators.retard_evaluator import RetardEvaluator
from src.utils.dataset import load_jsonl
from backend.deps import get_conn

router = APIRouter(prefix="/eval", tags=["eval"])

# In-memory storage for async evaluation status tracking
_evaluations: dict = {}


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


@router.post("/")
async def run_eval(req: EvalRequest):
    """Run synchronous evaluation (max 20 prompts for fast feedback)."""
    if len(req.prompts) > 20:
        raise HTTPException(400, "Max 20 prompts for sync eval. Use /eval/async for larger runs.")

    try:
        evaluator = RetardEvaluator(use_llm_judge=False)
        result = await evaluator.evaluate(req.model, req.provider, req.prompts)
        return result.model_dump()
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/async")
async def start_async_eval(req: SyncEvalRequest, background_tasks: BackgroundTasks):
    """Start async evaluation with progress tracking. Returns evaluation_id for polling."""
    evaluation_id = str(uuid.uuid4())

    _evaluations[evaluation_id] = {
        "evaluation_id": evaluation_id,
        "status": "pending",
        "progress": 0.0,
        "completed": 0,
        "total": req.num_prompts,
        "result": None,
        "error": None,
        "started_at": datetime.now(timezone.utc).isoformat(),
    }

    # Store evaluation in database
    try:
        conn = get_conn()
        conn.execute(
            "INSERT INTO evaluations (id, model_id, provider, status, total_prompts, started_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (evaluation_id, req.model, req.provider, "pending", req.num_prompts,
             datetime.now(timezone.utc).isoformat(), datetime.now(timezone.utc).isoformat()),
        )
        conn.commit()
        conn.close()
    except Exception:
        pass  # DB logging is best-effort

    async def run_background():
        try:
            _evaluations[evaluation_id]["status"] = "running"

            # Load prompts from file
            prompts = load_jsonl("prompts/custom-retarded.jsonl", limit=req.num_prompts)

            if not prompts:
                _evaluations[evaluation_id]["status"] = "error"
                _evaluations[evaluation_id]["error"] = "No prompts available"
                return

            _evaluations[evaluation_id]["total"] = len(prompts)

            evaluator = RetardEvaluator(
                use_llm_judge=req.use_llm_judge,
                max_concurrent=5,
            )

            result = await evaluator.evaluate(req.model, req.provider, prompts)

            _evaluations[evaluation_id]["status"] = "completed"
            _evaluations[evaluation_id]["progress"] = 100.0
            _evaluations[evaluation_id]["completed"] = len(prompts)
            _evaluations[evaluation_id]["result"] = result.model_dump()
            _evaluations[evaluation_id]["completed_at"] = datetime.now(timezone.utc).isoformat()

            # Update DB
            try:
                conn = get_conn()
                conn.execute(
                    "UPDATE evaluations SET status = ?, completed_prompts = ?, completed_at = ? WHERE id = ?",
                    ("completed", len(prompts), datetime.now(timezone.utc).isoformat(), evaluation_id),
                )
                conn.commit()
                conn.close()
            except Exception:
                pass

        except Exception as exc:
            _evaluations[evaluation_id]["status"] = "error"
            _evaluations[evaluation_id]["error"] = str(exc)

    background_tasks.add_task(run_background)

    return {"evaluation_id": evaluation_id, "status": "started"}


@router.get("/history")
async def list_evaluations(limit: int = 50):
    """List past evaluation runs."""
    try:
        conn = get_conn()
        rows = conn.execute(
            "SELECT id, model_id, provider, status, total_prompts, completed_prompts, started_at, completed_at, created_at "
            "FROM evaluations ORDER BY created_at DESC LIMIT ?",
            (limit,),
        ).fetchall()
        conn.close()

        return [
            {
                "id": r[0],
                "model_id": r[1],
                "provider": r[2],
                "status": r[3],
                "total_prompts": r[4],
                "completed_prompts": r[5],
                "started_at": r[6],
                "completed_at": r[7],
                "created_at": r[8],
            }
            for r in rows
        ]
    except Exception as exc:
        raise HTTPException(500, str(exc)) from exc


@router.get("/{evaluation_id}")
async def get_eval_status(evaluation_id: str):
    """Get evaluation status. Works for both in-memory async evals and DB-stored evals."""
    # Check in-memory first (active/recent evals)
    if evaluation_id in _evaluations:
        return _evaluations[evaluation_id]

    # Fallback to DB for historical evals
    try:
        conn = get_conn()
        row = conn.execute(
            "SELECT id, model_id, provider, status, total_prompts, completed_prompts, started_at, completed_at "
            "FROM evaluations WHERE id = ?",
            (evaluation_id,),
        ).fetchone()
        conn.close()

        if row:
            return {
                "evaluation_id": row[0],
                "model_id": row[1],
                "provider": row[2],
                "status": row[3],
                "total_prompts": row[4],
                "completed_prompts": row[5],
                "started_at": row[6],
                "completed_at": row[7],
            }
    except Exception:
        pass

    raise HTTPException(404, "Evaluation not found")
