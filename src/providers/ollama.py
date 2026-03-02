"""Ollama provider implementation."""

import httpx

from src.core.config import settings
from src.core.exceptions import ProviderError
from src.providers.base import LLMProvider


class OllamaProvider(LLMProvider):
    """Calls local Ollama chat API."""

    async def generate(self, model: str, prompt: str, system_prompt: str | None = None) -> str:
        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt or "You are chaotic and direct."},
                {"role": "user", "content": prompt},
            ],
            "stream": False,
        }
        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(f"{settings.ollama_host}/api/chat", json=payload)
        if response.status_code >= 400:
            raise ProviderError(f"Ollama error {response.status_code}: {response.text}")
        data = response.json()
        return data.get("message", {}).get("content", "")
