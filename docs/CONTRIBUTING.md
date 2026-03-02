# Contributing to RetardBench

The community shapes the standard! Help us expand the benchmark by submitting new wild prompt datasets, improving evaluator logic, and contributing frontend polish.

## Code of Conduct
Don't be a dick. Respect open-source conventions. We evaluate chaotic models, but standard PR etiquette applies. No actual illegal content (CP, dox, federal crime guides) will be merged into any prompt pack. 

## Development Setup
Check out [GETTING_STARTED.md](GETTING_STARTED.md) for full commands on initializing `uv`, configuring frontend nodes, and building the environment locally.

## Project Structure
```text
├── backend
│   ├── src/           # Core API & Evaluator logic
│   └── tests/         # Pytest coverage suites
├── docs               # You are here! Reading the docs.
├── frontend           # Next.js App Router UI
└── examples           # Scripts and API templates
```

## Adding Prompts
Prompt packs are the lifeblood of the benchmark.
1. Formulate at least 50 prompts following the schema defined in [PROMPT_DATASET.md](PROMPT_DATASET.md).
2. Create a feature branch: `git checkout -b feature/new-dataset-pack-name`
3. Add the JSONL file to `backend/prompts/`
4. Run the test suite to verify no syntax errors exist.

## Pull Request Process
1. Fork the repo and create your branch.
2. If modifying backend logic, format using `ruff`: `uv run ruff check . --fix`
3. If modifying frontend logic, run the linter: `npm run lint`
4. Make sure all CI checks pass.
5. Create a PR against `main` outlining specific metric changes or visual updates. Provide screenshots if applicable.
