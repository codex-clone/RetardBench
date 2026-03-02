# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- OpenRouter API integration for LLM-as-a-Judge (`gpt-4o-mini`)
- Asynchronous prompt dispatching with concurrency limits
- New Retard Index Scoring Formula components.

### Changed
- Separated Python backend from Vercel frontend deployment — all Python config (`pyproject.toml`, `requirements.txt`, `uv.lock`, `.python-version`) now lives inside `backend/`.
- Removed legacy `Log In` flow entirely from the frontend.

### Deprecated
- N/A

### Removed
- Removed `api/index.py` Vercel serverless function entry point (backend deploys separately).
- Unused neon gradients from the CSS theme.

### Fixed
- Vercel build failing due to Python bundle size exceeding Lambda limit (306MB).

### Security
- Standard rate limits initialized on submission endpoints.

## [0.1.0] - 2026-03-01
- **Initial Release:** RetardBench launched!
- Open-Source Next.js 16 GUI
- Local Postgres and SQLite fallback evaluators
- CLI Runner via `uv run retardbench eval`
