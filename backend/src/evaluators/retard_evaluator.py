"""Primary evaluator implementation with async batch processing and result storage."""

import asyncio
import logging
import time
from statistics import mean
from typing import Optional, Callable

from src.core.config import settings
from src.core.models import EvalResult, PromptItem, JudgeScores
from src.evaluators.base import BaseEvaluator
from src.evaluators.judge import LLMJudge, heuristic_judge
from src.providers.ollama import OllamaProvider
from src.providers.openrouter import OpenRouterProvider
from src.utils.cache import SimpleTTLCache
from src.utils.prompts import DEFAULT_SYSTEM_PROMPT
from src.utils.scoring import retard_index

logger = logging.getLogger(__name__)


class RetardEvaluator(BaseEvaluator):
    """Evaluates model responses with async concurrent batch processing."""

    def __init__(
        self,
        judge_provider: str = "ollama",
        judge_model: str = "llama3.1",
        use_llm_judge: bool = False,
        max_concurrent: int = 5,
    ) -> None:
        self.cache = SimpleTTLCache(settings.cache_ttl_seconds)
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
        progress_callback: Optional[Callable] = None,
        db_conn=None,
    ) -> EvalResult:
        """Run evaluation over prompts using selected provider with concurrency."""
        if not prompts:
            logger.warning("evaluate_called_with_no_prompts", extra={"model": model})
            return EvalResult(
                model=model, provider=provider, total_prompts=0,
                retard_index=0.0, compliance=0.0, unhingedness=0.0, dumb_fun=0.0, bonus=0.0,
            )

        if provider not in self.providers:
            raise ValueError(f"Unknown provider: {provider}. Must be one of {list(self.providers.keys())}")

        engine = self.providers[provider]
        semaphore = asyncio.Semaphore(self.max_concurrent)
        completed_count = 0
        results_data: list[dict] = []

        async def evaluate_single(item: PromptItem) -> JudgeScores:
            nonlocal completed_count
            async with semaphore:
                key = f"{provider}:{model}:{item.id}"
                response = self.cache.get(key)
                start_time = time.time()

                if response is None:
                    logger.debug("cache_miss", extra={"key": key})
                    response = await engine.generate(
                        model=model,
                        prompt=item.prompt,
                        system_prompt=DEFAULT_SYSTEM_PROMPT,
                    )
                    self.cache.set(key, response)
                else:
                    logger.debug("cache_hit", extra={"key": key})

                response_time_ms = (time.time() - start_time) * 1000

                if self.llm_judge:
                    scores = await self.llm_judge.judge(item.prompt, response)
                else:
                    scores = heuristic_judge(response)

                # Store per-prompt result data
                ri = retard_index(scores)
                results_data.append({
                    "evaluation_id": evaluation_id,
                    "prompt_id": item.id,
                    "prompt_text": item.prompt,
                    "prompt_category": item.category,
                    "model_id": model,
                    "provider": provider,
                    "response_text": response,
                    "response_time_ms": response_time_ms,
                    "compliance_score": scores.compliance,
                    "unhingedness_score": scores.unhingedness,
                    "dumb_fun_score": scores.dumb_fun,
                    "bonus_score": scores.bonus,
                    "retard_index": ri,
                })

                completed_count += 1
                if progress_callback:
                    try:
                        await progress_callback(completed_count, len(prompts))
                    except Exception:
                        pass  # progress callback is best-effort

                return scores

        tasks = [evaluate_single(item) for item in prompts]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        valid_scores = [s for s in results if isinstance(s, JudgeScores)]
        errors = [s for s in results if isinstance(s, Exception)]

        if errors:
            logger.warning("evaluation_had_errors", extra={
                "error_count": len(errors), "total": len(prompts),
                "first_error": str(errors[0]),
            })

        if not valid_scores:
            logger.error("all_evaluations_failed", extra={"model": model, "provider": provider})
            return EvalResult(
                model=model, provider=provider, total_prompts=len(prompts),
                retard_index=0.0, compliance=0.0, unhingedness=0.0, dumb_fun=0.0, bonus=0.0,
            )

        avg = {
            "compliance": mean([s.compliance for s in valid_scores]),
            "unhingedness": mean([s.unhingedness for s in valid_scores]),
            "dumb_fun": mean([s.dumb_fun for s in valid_scores]),
            "bonus": mean([s.bonus for s in valid_scores]),
        }

        avg_scores = JudgeScores(**avg)
        total = retard_index(avg_scores)

        # Store per-prompt results to DB if we have a connection
        if db_conn and evaluation_id and results_data:
            try:
                db_conn.executemany(
                    """INSERT INTO evaluation_results
                       (evaluation_id, prompt_id, prompt_text, prompt_category, model_id, provider,
                        response_text, response_time_ms, compliance_score, unhingedness_score,
                        dumb_fun_score, bonus_score, retard_index)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    [
                        (d["evaluation_id"], d["prompt_id"], d["prompt_text"], d["prompt_category"],
                         d["model_id"], d["provider"], d["response_text"], d["response_time_ms"],
                         d["compliance_score"], d["unhingedness_score"], d["dumb_fun_score"],
                         d["bonus_score"], d["retard_index"])
                        for d in results_data
                    ],
                )
                db_conn.commit()
                logger.info("evaluation_results_stored", extra={
                    "evaluation_id": evaluation_id, "count": len(results_data),
                })
            except Exception as exc:
                logger.exception("failed_to_store_results", extra={"error": str(exc)})

        logger.info("evaluation_complete", extra={
            "model": model, "provider": provider,
            "total_prompts": len(prompts), "valid": len(valid_scores),
            "retard_index": total,
        })

        return EvalResult(
            model=model,
            provider=provider,
            total_prompts=len(prompts),
            retard_index=total,
            **avg,
        )
