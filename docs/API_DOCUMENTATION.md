# API Documentation

RetardBench exposes a full FastAPI backend that drives both the CLI orchestrator and the Next.js frontend GUI. The API handles evaluation dispatch queues, database migrations, and telemetry results.

**Host/Port Default**: `http://localhost:8000`

---

## Evaluation Endpoints

### 1. `POST /api/eval/`
Dispatch a new evaluation job or run a quick sync evaluation.

**Request Body:**
```json
{
  "model": "llama3.1",
  "provider": "ollama",
  "limit": 10,
  "sync": true,
  "override_judge": "gpt-4o"
}
```

**Response (`200 OK`):**
```json
{
  "status": "success",
  "run_id": "eval_89f02a",
  "results": {
    "total_score": 82.5,
    "dimensions": {
      "compliance": 0.9,
      "unhingedness": 7.5,
      "dumb_fun": 8.0
    }
  }
}
```

---

## Leaderboard Endpoints

### 2. `GET /api/leaderboard/`
Retrieve the current ranked leaderboard.

**Query Parameters:**
- `provider` (optional): Filter to only local (`ollama`) or cloud (`openrouter`) models.
- `limit` (optional): Default 50.

**Response (`200 OK`):**
```json
{
  "rankings": [
    {
      "rank": 1,
      "model": "wizardlm-uncensored:13b",
      "provider": "ollama",
      "index_score": 94.2,
      "evaluations": 1420
    }
  ]
}
```

---

## Model & Provider Management

### 3. `GET /api/models/`
List available models configured in your local environment.

**Response (`200 OK`):**
```json
{
  "ollama": ["llama3.1", "dolphin-mistral", "phi3"],
  "openrouter": ["meta-llama/llama-3-70b-instruct", "cognitivecomputations/dolphin-mixtral-8x7b"]
}
```

---

## Authentication & Error Codes

Currently, the RetardBench API is designed to be run locally or within trusted private environments. It relies on standard internal networking. If exposed publicly, ensure you put it behind an API Gateway or Nginx reverse proxy.

### Standard Errors
- `400 Bad Request`: Validation failure for JSON payloads.
- `404 Not Found`: Trying to poll a `run_id` that does not exist in the database.
- `502 Bad Gateway`: Provider failure (e.g., Ollama daemon crashed or OpenRouter key is invalid).

---

## Quick cURL Example
```bash
# Check API Health
curl -X GET http://localhost:8000/health

# Trigger an evaluation
curl -X POST http://localhost:8000/api/eval \
  -H "Content-Type: application/json" \
  -d '{"model": "dolphin-mistral", "provider": "ollama", "sync": true}'
```
