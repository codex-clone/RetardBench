"""Leaderboard routes with filtering, stats, and CSV export."""

from fastapi import APIRouter, Query
from fastapi.responses import Response
from typing import Optional

from backend.deps import get_conn

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])


@router.get("/")
async def list_rows(
    provider: Optional[str] = Query(None, description="Filter by provider"),
    category: Optional[str] = Query(None, description="Filter by category"),
    limit: int = Query(100, le=500, description="Max rows to return"),
    offset: int = Query(0, ge=0, description="Offset for pagination"),
):
    """List leaderboard rows with optional filters, pagination, and sorting."""
    conn = get_conn()
    query = "SELECT id, model, provider, retard_index, category, created_at FROM leaderboard"
    params: list = []
    conditions: list[str] = []

    if provider:
        conditions.append("provider = ?")
        params.append(provider)
    if category:
        conditions.append("category = ?")
        params.append(category)

    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    query += " ORDER BY retard_index DESC LIMIT ? OFFSET ?"
    params.extend([limit, offset])

    rows = conn.execute(query, params).fetchall()
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


@router.get("/stats")
async def get_stats():
    """Get leaderboard summary statistics."""
    conn = get_conn()
    total = conn.execute("SELECT COUNT(*) FROM leaderboard").fetchone()[0]
    avg_score = conn.execute("SELECT AVG(retard_index) FROM leaderboard").fetchone()[0] or 0
    max_score = conn.execute("SELECT MAX(retard_index) FROM leaderboard").fetchone()[0] or 0
    min_score = conn.execute("SELECT MIN(retard_index) FROM leaderboard").fetchone()[0] or 0

    # Provider distribution
    provider_rows = conn.execute(
        "SELECT provider, COUNT(*) as count FROM leaderboard GROUP BY provider ORDER BY count DESC"
    ).fetchall()

    # Category distribution
    category_rows = conn.execute(
        "SELECT category, COUNT(*) as count FROM leaderboard GROUP BY category ORDER BY count DESC"
    ).fetchall()

    conn.close()

    return {
        "total_models": total,
        "avg_retard_index": round(avg_score, 2),
        "max_retard_index": round(max_score, 2),
        "min_retard_index": round(min_score, 2),
        "providers": {row[0]: row[1] for row in provider_rows},
        "categories": {row[0]: row[1] for row in category_rows},
    }


@router.get("/export/csv")
async def export_csv():
    """Export full leaderboard as downloadable CSV."""
    conn = get_conn()
    rows = conn.execute(
        "SELECT model, provider, retard_index, category, created_at FROM leaderboard ORDER BY retard_index DESC"
    ).fetchall()
    conn.close()

    csv_lines = ["model,provider,retard_index,category,created_at"]
    for r in rows:
        # Escape commas in fields
        model = f'"{r[0]}"' if "," in str(r[0]) else str(r[0])
        provider = f'"{r[1]}"' if "," in str(r[1]) else str(r[1])
        csv_lines.append(f"{model},{provider},{r[2]},{r[3]},{r[4]}")

    csv_content = "\n".join(csv_lines)

    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=retardbench_leaderboard.csv"},
    )


@router.get("/export/json")
async def export_json():
    """Export full leaderboard as JSON."""
    conn = get_conn()
    rows = conn.execute(
        "SELECT id, model, provider, retard_index, category, created_at FROM leaderboard ORDER BY retard_index DESC"
    ).fetchall()
    conn.close()

    data = [
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

    return data
