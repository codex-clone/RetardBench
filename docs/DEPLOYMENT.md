# Deployment Guide

RetardBench consists of two primary services:
1. **Frontend GUI**: Next.js 16.1.6
2. **Backend API**: Python FastAPI 

This project is configured natively for Vercel Serverless deployments and can be hosted seamlessly in parallel.

## Vercel Deployment

**Zero-Configuration Sync:**
The project root `vercel.json` configures the routing rules for both environments via standard `vercel builds`.

1. **Install Vercel CLI**: `npm install -g vercel`
2. **Deploy to Production**: 
   ```bash
   vercel --prod
   ```
3. **Environment Setup**: In your Vercel Project Dashboard, ensure the following keys are populated under Settings -> Environment Variables:
   - `OPENROUTER_API_KEY` (For the `pytest` LLM Judge module)
   - `DATABASE_URL` (For remote Postgres persistence)

## Cloud Infrastructures (Self-Hosting / Docker)
If you need persistent SQLite state or dedicated background workers, consider standard VPS hosting with Docker Compose.

Create a `docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - OLLAMA_HOST=http://host.docker.internal:11434
    depends_on:
      - db
      
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Database Migration
RetardBench defaults to `aiosqlite` for local rapid prototyping.
In production, change your SQLAlchemy string from `sqlite+aiosqlite:///retardbench.db` to standard Postgres async notation:

```python
# .env
DATABASE_URL=postgresql+asyncpg://user:password@host/db
```
The internal Alembic/SQLAlchemy configuration automatically maps schema upgrades on `startup`.
