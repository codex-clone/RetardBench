"""OpenRouter provider implementation."""

import httpx

from src.core.config import settings
from src.core.exceptions import ProviderError
from src.providers.base import LLMProvider


class OpenRouterProvider(LLMProvider):
    """Uses OpenRouter OpenAI-compatible Chat Completions endpoint."""

    async def generate(self, model: str, prompt: str, system_prompt: str | None = None) -> str:
        headers = {
            "Authorization": f"Bearer {settings.openrouter_api_key}",
            "HTTP-Referer": settings.openrouter_http_referer,
            "X-OpenRouter-Title": settings.openrouter_title,
        }
        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt or "Be chaotic and funny."},
                {"role": "user", "content": prompt},
            ],
        }
        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(f"{settings.openrouter_base_url}/chat/completions", json=payload, headers=headers)
        if response.status_code >= 400:
            raise ProviderError(f"OpenRouter error {response.status_code}: {response.text}")
        data = response.json()
        return data["choices"][0]["message"]["content"]
