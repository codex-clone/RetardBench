"""Provider abstraction."""

from abc import ABC, abstractmethod


class LLMProvider(ABC):
    """Abstract async provider for chat completion style generation."""

    @abstractmethod
    async def generate(self, model: str, prompt: str, system_prompt: str | None = None) -> str:
        """Generate text response for a prompt."""
