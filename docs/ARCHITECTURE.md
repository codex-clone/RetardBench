# Architecture

```mermaid
flowchart LR
  U[CLI / Frontend] --> API[FastAPI Backend]
  U --> CLI[Typer CLI]
  CLI --> E[RetardEvaluator]
  API --> E
  E --> P[Provider Layer\nOllama/OpenRouter]
  E --> S[Scoring Utils]
  E --> DB[(SQLite/Postgres)]
  DB --> L[Leaderboard API]
```

## Layers
- `src/core`: config, data models, exceptions
- `src/providers`: abstraction + provider implementations
- `src/evaluators`: scoring orchestrators and judge hooks
- `backend/`: FastAPI HTTP API
- `frontend/`: Next.js 15 App Router UI
