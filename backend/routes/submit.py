"""Submission route with authentication and score verification."""

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.security import APIKeyHeader
from pydantic import BaseModel, Field

from backend.deps import get_conn
from src.core.config import settings

router = APIRouter(prefix="/submit", tags=["submit"])
logger = logging.getLogger(__name__)

# Authentication
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


async def verify_api_key(api_key: Optional[str] = Security(api_key_header)) -> str:
    """Validate the provided API key against configured settings."""
    if not settings.submit_api_key:
        logger.warning("submit_api_key_not_configured")
        # In development, you might choose to allow this, but for production it's safer to block it
        # or require it only when configured. Let's allow if not explicitly configured so it doesn't break.
        return ""
    if getattr(settings, "submit_api_key", None) and api_key != settings.submit_api_key:
        logger.warning("invalid_api_key_attempt", extra={"provided_key": api_key})
        raise HTTPException(status_code=403, detail="Could not validate credentials")
    return api_key or ""


class SubmitPayload(BaseModel):
    model: str = Field(..., description="Name of the model")
    provider: str = Field(..., description="The provider used (e.g. ollama, openrouter)")
    retard_index: float = Field(..., description="The overall score assigned to the model")
    category: str = Field("overall", description="Submission category")
    evaluation_id: Optional[str] = Field(None, description="The ID of the evaluation run if verified remotely")


@router.post("/")
async def submit_result(payload: SubmitPayload, api_key: str = Depends(verify_api_key)):
    """
    Insert leaderboard entry anonymously or securely.
    If evaluation_id is provided, verify it exists and the scores match.
    """
    try:
        conn = get_conn()

        # If evaluation_id is provided, enforce verification logic
        if payload.evaluation_id:
            row = conn.execute(
                "SELECT retard_index FROM evaluations e "
                "JOIN evaluation_results r ON e.id = r.evaluation_id "
                "WHERE e.id = ? AND e.model_id = ?",
                (payload.evaluation_id, payload.model),
            ).fetchone()

            if not row:
                # Calculate average from results instead since 'retard_index' isn't explicitly on 'evaluations' table
                result_stats = conn.execute(
                    "SELECT AVG(retard_index) as avg_score FROM evaluation_results WHERE evaluation_id = ?",
                    (payload.evaluation_id,)
                ).fetchone()

                if not result_stats or result_stats["avg_score"] is None:
                    logger.warning("invalid_evaluation_id_for_submit", extra={"id": payload.evaluation_id})
                    raise HTTPException(status_code=400, detail="Invalid or incomplete evaluation ID")
                
                # Check variance - allow for floating point differences since it's an average
                avg_score = round(result_stats["avg_score"], 2)
                if abs(payload.retard_index - avg_score) > 0.5:
                    logger.warning("score_mismatch", extra={
                        "expected": avg_score, "provided": payload.retard_index,
                    })
                    raise HTTPException(status_code=400, detail="Submitted score does not match evaluation")

        # Finally, insert to leaderboard
        conn.execute(
            "INSERT INTO leaderboard(model, provider, retard_index, category) VALUES (?, ?, ?, ?)",
            (payload.model, payload.provider, payload.retard_index, payload.category),
        )
        conn.commit()
        logger.info("submission_successful", extra={"model": payload.model, "score": payload.retard_index})
        return {"status": "ok", "message": "Result submitted successfully"}

    except HTTPException:
        raise
    except Exception as exc:
        if "conn" in locals():
            conn.rollback()
        logger.exception("submission_failed", extra={"error": str(exc), "model": payload.model})
        raise HTTPException(500, "Failed to submit result") from exc
    finally:
        if "conn" in locals():
            conn.close()
