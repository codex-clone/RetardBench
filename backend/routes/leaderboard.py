"""Leaderboard routes with filtering, stats, and CSV export."""

import csv
import io
import logging
from typing import Optional

from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import StreamingResponse, JSONResponse

from backend.deps import get_conn

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])
logger = logging.getLogger(__name__)


@router.get("/")
async def list_rows(
    provider: Optional[str] = Query(None, description="Filter by provider"),
    category: Optional[str] = Query(None, description="Filter by category"),
    limit: int = Query(100, le=500, description="Max rows to return"),
    offset: int = Query(0, ge=0, description="Offset for pagination"),
):
    """List leaderboard rows with optional filters, pagination, and sorting."""
    try:
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
        return [dict(r) for r in rows]
    except Exception as exc:
        logger.exception("list_leaderboard_failed", extra={"error": str(exc)})
        raise HTTPException(500, "Failed to retrieve leaderboard") from exc
    finally:
        if "conn" in locals():
            conn.close()


@router.get("/stats")
async def get_stats():
    """Get leaderboard summary statistics."""
    try:
        conn = get_conn()
        total = conn.execute("SELECT COUNT(*) as c FROM leaderboard").fetchone()["c"]
        avg_score = conn.execute("SELECT AVG(retard_index) as a FROM leaderboard").fetchone()["a"] or 0
        max_score = conn.execute("SELECT MAX(retard_index) as m FROM leaderboard").fetchone()["m"] or 0
        min_score = conn.execute("SELECT MIN(retard_index) as m FROM leaderboard").fetchone()["m"] or 0

        # Provider distribution
        provider_rows = conn.execute(
            "SELECT provider, COUNT(*) as count FROM leaderboard GROUP BY provider ORDER BY count DESC"
        ).fetchall()

        # Category distribution
        category_rows = conn.execute(
            "SELECT category, COUNT(*) as count FROM leaderboard GROUP BY category ORDER BY count DESC"
        ).fetchall()

        return {
            "total_models": total,
            "avg_retard_index": round(avg_score, 2),
            "max_retard_index": round(max_score, 2),
            "min_retard_index": round(min_score, 2),
            "providers": {row["provider"]: row["count"] for row in provider_rows},
            "categories": {row["category"]: row["count"] for row in category_rows},
        }
    except Exception as exc:
        logger.exception("get_stats_failed", extra={"error": str(exc)})
        raise HTTPException(500, "Failed to retrieve statistics") from exc
    finally:
        if "conn" in locals():
            conn.close()


@router.get("/export/csv")
async def export_csv():
    """Export full leaderboard as downloadable CSV accurately."""
    try:
        conn = get_conn()
        rows = conn.execute(
            "SELECT model, provider, retard_index, category, created_at FROM leaderboard ORDER BY retard_index DESC"
        ).fetchall()
    except Exception as exc:
        logger.exception("csv_export_failed", extra={"error": str(exc)})
        raise HTTPException(500, "Failed to prepare CSV data") from exc
    finally:
        if "conn" in locals():
            conn.close()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["model", "provider", "retard_index", "category", "created_at"])
    for r in rows:
        writer.writerow([r["model"], r["provider"], r["retard_index"], r["category"], r["created_at"]])
    
    output.seek(0)
    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=retardbench_leaderboard.csv"},
    )


@router.get("/export/json")
async def export_json():
    """Export full leaderboard as JSON."""
    try:
        conn = get_conn()
        rows = conn.execute(
            "SELECT id, model, provider, retard_index, category, created_at FROM leaderboard ORDER BY retard_index DESC"
        ).fetchall()
        return JSONResponse([dict(r) for r in rows])
    except Exception as exc:
        logger.exception("json_export_failed", extra={"error": str(exc)})
        raise HTTPException(500, "Failed to export JSON") from exc
    finally:
        if "conn" in locals():
            conn.close()
