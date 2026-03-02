"""Evaluation route."""

from fastapi import APIRouter, HTTPException

from src.core.models import EvalRequest
from src.evaluators.retard_evaluator import RetardEvaluator

router = APIRouter(prefix="/eval", tags=["eval"])


@router.post("/")
async def run_eval(req: EvalRequest):
    """Run evaluator for ad-hoc prompts."""
    try:
        evaluator = RetardEvaluator()
        result = await evaluator.evaluate(req.model, req.provider, req.prompts)
        return result.model_dump()
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=str(exc)) from exc
