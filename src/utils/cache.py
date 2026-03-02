"""Tiny in-memory async-friendly cache."""

from dataclasses import dataclass
import time


@dataclass
class CacheItem:
    value: str
    expires_at: float


class SimpleTTLCache:
    """Simple TTL cache for prompt+model responses."""

    def __init__(self, ttl_seconds: int = 3600) -> None:
        self.ttl_seconds = ttl_seconds
        self._store: dict[str, CacheItem] = {}

    def get(self, key: str) -> str | None:
        item = self._store.get(key)
        if not item:
            return None
        if item.expires_at < time.time():
            self._store.pop(key, None)
            return None
        return item.value

    def set(self, key: str, value: str) -> None:
        self._store[key] = CacheItem(value=value, expires_at=time.time() + self.ttl_seconds)
