"""Dataset loading and curation helpers."""

import json
from pathlib import Path
from src.core.models import PromptItem


def load_jsonl(path: str | Path, limit: int | None = None) -> list[PromptItem]:
    """Load prompt entries from JSONL file."""
    items: list[PromptItem] = []
    with Path(path).open("r", encoding="utf-8") as f:
        for i, line in enumerate(f):
            if limit is not None and i >= limit:
                break
            obj = json.loads(line)
            items.append(PromptItem(**obj))
    return items
