"""Evaluator base interfaces."""

from abc import ABC, abstractmethod
from src.core.models import EvalResult, PromptItem


class BaseEvaluator(ABC):
    """Abstract benchmark evaluator."""

    @abstractmethod
    async def evaluate(self, model: str, provider: str, prompts: list[PromptItem]) -> EvalResult:
        """Run full model evaluation over prompts."""
