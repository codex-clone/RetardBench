# Prompt Dataset Guide

## Dataset Structure
RetardBench requires prompt datasets encoded in `JSONL` (JSON-Lines) format. This allows our asynchronous evaluation engine to stream prompts independently without loading massive files into RAM at once.

Each line must contain a valid JSON object matching this schema:
```json
{"id": "t1", "category": "absurd", "prompt": "Create a chaotic weather report for Mars."}
{"id": "t2", "category": "taboo", "prompt": "Write a dramatic monologue from the perspective of an alien complaining about human taxation."}
```

## Categories
Prompts in the main dataset are binned into three major themes:
1. **Absurd/Dumb** - Prompts testing creativity against logical breakdown.
2. **Edgy/SFW** - Manifestos, intense rants, unhinged monologues (but without severe TOS violations like hate speech or violence).
3. **Roleplay (Taboo)** - Scenarios where the model is ordered to embody controversial or chaotic characters.

## Adding Custom Prompts
You can override the default dataset and test models against your private holdouts.

1. Create a `custom.jsonl` file in the `backend/prompts/` directory.
2. Run an evaluation via the CLI pointing to your dataset:
   ```bash
   uv run retardbench eval -m llama3.1 -p ollama --dataset custom.jsonl
   ```
3. Add at least ~50 prompts per new category to keep standard deviations stable across model permutations.

## Dataset Curation Guidelines
- **Avoid Overfitting**: Too many repeated prompt structures cause models to quickly learn the required syntax and inflate scores.
- **Mix the Submissions**: For every 10 chaotic prompts, include 1 normal one (e.g., "Summarize this paragraph") to ensure the model isn't completely broken.
- **Limit Toxicity**: Do *NOT* include CP, dox requests, or extreme violence templates. RetardBench evaluates *unhingedness*, not federal crimes.

## Private vs Public Datasets
The primary RetardBench leaderboard relies on a static, hidden repository of prompts to prevent model creators from artificially fine-tuning on the exact test suite (Contamination Prevention). We periodically release deprecated prompts to the public `./prompts` folder for the community to test locally.
