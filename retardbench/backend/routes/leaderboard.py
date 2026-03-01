"""Leaderboard routes."""

from fastapi import APIRouter

from backend.deps import get_conn

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])


@router.get("/")
async def list_rows():
    """List leaderboard rows by highest score."""
    conn = get_conn()
    rows = conn.execute(
        "SELECT id, model, provider, retard_index, category, created_at FROM leaderboard ORDER BY retard_index DESC LIMIT 200"
    ).fetchall()
    conn.close()
    return [
        {
            "id": row[0],
            "model": row[1],
            "provider": row[2],
            "retard_index": row[3],
            "category": row[4],
            "created_at": row[5],
        }
        for row in rows
    ]
