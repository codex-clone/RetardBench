"""Utility script to merge dataset shards into a single JSONL."""

from pathlib import Path

SOURCES = [
    Path("prompts/or-bench-sample.jsonl"),
    Path("prompts/jbb-sample.jsonl"),
    Path("prompts/custom-retarded.jsonl"),
]

TARGET = Path("prompts/merged-public.jsonl")


def main() -> None:
    """Concatenate known sample files into merged prompt set."""
    lines: list[str] = []
    for source in SOURCES:
        if source.exists():
            lines.extend(source.read_text(encoding="utf-8").splitlines())
    TARGET.write_text("\n".join([x for x in lines if x.strip()]) + "\n", encoding="utf-8")
    print(f"Wrote {len(lines)} prompts to {TARGET}")


if __name__ == "__main__":
    main()
