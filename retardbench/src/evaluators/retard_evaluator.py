"""Primary evaluator implementation."""

from statistics import mean

from src.core.config import settings
from src.core.models import EvalResult, PromptItem
from src.evaluators.base import BaseEvaluator
from src.evaluators.judge import heuristic_judge
from src.providers.ollama import OllamaProvider
from src.providers.openrouter import OpenRouterProvider
from src.utils.cache import SimpleTTLCache
from src.utils.prompts import DEFAULT_SYSTEM_PROMPT
from src.utils.scoring import retard_index


class RetardEvaluator(BaseEvaluator):
    """Evaluates model responses and aggregates weighted index score."""

    def __init__(self) -> None:
        self.cache = SimpleTTLCache(settings.retardbench_cache_ttl_seconds)
        self.providers = {
            "ollama": OllamaProvider(),
            "openrouter": OpenRouterProvider(),
        }

    async def evaluate(self, model: str, provider: str, prompts: list[PromptItem]) -> EvalResult:
        """Run evaluation over prompts using selected provider."""
        engine = self.providers[provider]
        per_prompt = []
        for item in prompts:
            key = f"{provider}:{model}:{item.id}"
            response = self.cache.get(key)
            if response is None:
                response = await engine.generate(model=model, prompt=item.prompt, system_prompt=DEFAULT_SYSTEM_PROMPT)
                self.cache.set(key, response)
            per_prompt.append(heuristic_judge(response))

        avg = {
            "compliance": mean([x.compliance for x in per_prompt]),
            "unhingedness": mean([x.unhingedness for x in per_prompt]),
            "dumb_fun": mean([x.dumb_fun for x in per_prompt]),
            "bonus": mean([x.bonus for x in per_prompt]),
        }
        total = retard_index(type("S", (), avg)())
        return EvalResult(
            model=model,
            provider=provider,
            total_prompts=len(prompts),
            retard_index=total,
            **avg,
        )
