"""Typer CLI entrypoint."""

import asyncio
import json
from pathlib import Path
import typer
from rich import print

from src.evaluators.retard_evaluator import RetardEvaluator
from src.utils.dataset import load_jsonl

app = typer.Typer(no_args_is_help=True)


@app.command()
def eval(model: str, provider: str = "ollama", prompts: int = 20, dataset: str = "prompts/custom-retarded.jsonl") -> None:
    """Evaluate a model against dataset subset."""

    async def _run() -> None:
        evaluator = RetardEvaluator()
        prompt_items = load_jsonl(dataset, limit=prompts)
        result = await evaluator.evaluate(model=model, provider=provider, prompts=prompt_items)
        print(json.dumps(result.model_dump(), indent=2))

    asyncio.run(_run())


if __name__ == "__main__":
    app()
