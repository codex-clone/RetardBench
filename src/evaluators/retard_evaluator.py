"""Primary evaluator implementation with async batch processing."""

import asyncio
from statistics import mean
from typing import Optional

from src.core.config import settings
from src.core.models import EvalResult, PromptItem, JudgeScores
from src.evaluators.base import BaseEvaluator
from src.evaluators.judge import LLMJudge, heuristic_judge
from src.providers.ollama import OllamaProvider
from src.providers.openrouter import OpenRouterProvider
from src.utils.cache import SimpleTTLCache
from src.utils.prompts import DEFAULT_SYSTEM_PROMPT
from src.utils.scoring import retard_index


class RetardEvaluator(BaseEvaluator):
    """Evaluates model responses with async concurrent batch processing."""

    def __init__(
        self,
        judge_provider: str = "ollama",
        judge_model: str = "llama3.1",
        use_llm_judge: bool = False,
        max_concurrent: int = 5,
    ) -> None:
        self.cache = SimpleTTLCache(getattr(settings, "cache_ttl_seconds", 3600))
        self.providers = {
            "ollama": OllamaProvider(),
            "openrouter": OpenRouterProvider(),
        }
        self.llm_judge = LLMJudge(judge_provider, judge_model) if use_llm_judge else None
        self.max_concurrent = max_concurrent

    async def evaluate(
        self,
        model: str,
        provider: str,
        prompts: list[PromptItem],
        evaluation_id: Optional[str] = None,
        progress_callback: Optional[callable] = None,
    ) -> EvalResult:
        """Run evaluation over prompts using selected provider with concurrency."""
        if not prompts:
            return EvalResult(
                model=model,
                provider=provider,
                total_prompts=0,
                retard_index=0.0,
                compliance=0.0,
                unhingedness=0.0,
                dumb_fun=0.0,
                bonus=0.0,
            )

        engine = self.providers[provider]
        semaphore = asyncio.Semaphore(self.max_concurrent)

        async def evaluate_single(item: PromptItem) -> JudgeScores:
            async with semaphore:
                key = f"{provider}:{model}:{item.id}"
                response = self.cache.get(key)
                if response is None:
                    response = await engine.generate(
                        model=model,
                        prompt=item.prompt,
                        system_prompt=DEFAULT_SYSTEM_PROMPT,
                    )
                    self.cache.set(key, response)

                # Use LLM judge if available, else heuristic
                if self.llm_judge:
                    return await self.llm_judge.judge(item.prompt, response)
                return heuristic_judge(response)

        # Run all prompt evaluations concurrently with semaphore-based throttling
        tasks = [evaluate_single(item) for item in prompts]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        # Filter out any errors, keeping only valid JudgeScores
        valid_scores = [s for s in results if isinstance(s, JudgeScores)]

        if not valid_scores:
            return EvalResult(
                model=model,
                provider=provider,
                total_prompts=len(prompts),
                retard_index=0.0,
                compliance=0.0,
                unhingedness=0.0,
                dumb_fun=0.0,
                bonus=0.0,
            )

        avg = {
            "compliance": mean([s.compliance for s in valid_scores]),
            "unhingedness": mean([s.unhingedness for s in valid_scores]),
            "dumb_fun": mean([s.dumb_fun for s in valid_scores]),
            "bonus": mean([s.bonus for s in valid_scores]),
        }

        total = retard_index(type("Scores", (), avg)())

        return EvalResult(
            model=model,
            provider=provider,
            total_prompts=len(prompts),
            retard_index=total,
            **avg,
        )
