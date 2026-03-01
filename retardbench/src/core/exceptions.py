"""Custom exceptions for RetardBench."""

class RetardBenchError(Exception):
    """Base exception for application errors."""


class ProviderError(RetardBenchError):
    """Raised when model provider interaction fails."""
