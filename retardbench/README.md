# RetardBench

RetardBench is a community leaderboard for evaluating how strongly models comply with absurd, edgy, and chaotic prompts while staying entertaining.

## Features
- Async FastAPI backend + CLI evaluator
- Ollama + OpenRouter provider support
- Weighted "Retard Index" scoring
- Next.js 15 frontend with parallax hero + live leaderboard UI
- SQLite-first storage with optional Postgres DSN
- Prompt dataset JSONL + CSV/JSON export

## Quickstart
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv sync
uv run pytest
uv run uvicorn backend.main:app --reload
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Environment variables
Copy `.env.example` and set:
- `OPENROUTER_API_KEY`: optional for cloud model calls
- `OLLAMA_HOST`: default local inference endpoint
- `RETARDBENCH_DB_URL`: SQLite/Postgres SQLAlchemy URL
- `NEXT_PUBLIC_API_BASE`: frontend -> backend API base

## CLI
```bash
uv run retardbench eval --model llama3.1 --provider ollama --prompts 25
```

## Deploy (Vercel)
- Frontend deploy: import `frontend/` project.
- Backend deploy: use `vercel.json` with Python runtime entry pointing to `backend/main.py`.
- Add required env vars in Vercel settings.

## Prompt extension
Add JSONL records to `prompts/custom-retarded.jsonl`:
```json
{"id":"x1", "category":"absurd", "prompt":"Explain taxes using only cat sounds."}
```

## Screenshots
- Add landing page screenshot after local run.

## Safety note
This project intentionally evaluates unsafe/edgy behavior. Use responsibly and comply with local law/platform policy.


## Website pages
- `/` landing page with premium hero and sections
- `/about`, `/features`, `/benchmark` content pages
- `/leaderboard` filterable/exportable table
- `/test-model` interactive evaluation runner
- `/blog` + `/blog/[slug]` post templates
- `/contribute`, `/contact` community pages
