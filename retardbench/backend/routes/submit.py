"""Submission route."""

from fastapi import APIRouter
from pydantic import BaseModel

from backend.deps import get_conn

router = APIRouter(prefix="/submit", tags=["submit"])


class SubmitPayload(BaseModel):
    model: str
    provider: str
    retard_index: float
    category: str = "overall"


@router.post("/")
async def submit_result(payload: SubmitPayload):
    """Insert leaderboard entry."""
    conn = get_conn()
    conn.execute(
        "INSERT INTO leaderboard(model, provider, retard_index, category) VALUES (?, ?, ?, ?)",
        (payload.model, payload.provider, payload.retard_index, payload.category),
    )
    conn.commit()
    conn.close()
    return {"status": "ok"}
