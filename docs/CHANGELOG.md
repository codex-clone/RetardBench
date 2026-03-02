# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Vercel monolithic deployment configuration (`api/index.py` rewrites)
- OpenRouter API integration for LLM-as-a-Judge (`gpt-4o-mini`)
- Asynchronous prompt dispatching with concurrency limits
- New Retard Index Scoring Formula components.

### Changed
- Refactored `backend/main.py` to route FastAPI via Vercel Serverless.
- Removed legacy `Log In` flow entirely from the frontend.

### Deprecated
- N/A

### Removed
- Unused neon gradients from the CSS theme.

### Fixed
- UTF-8 BOM encoding issues on Vercel deployment builds breaking standard `pip install` during `hatchling.build`.

### Security
- Standard rate limits initialized on submission endpoints.

## [0.1.0] - 2026-03-01
- **Initial Release:** RetardBench launched!
- Open-Source Next.js 16 GUI
- Local Postgres and SQLite fallback evaluators
- CLI Runner via `uv run retardbench eval`
