#!/bin/bash
# cURL examples for all API endpoints
# Make sure the FastAPI backend is running before executing.

API_BASE="http://localhost:8000"

echo "--------------------------------------------------"
echo "🔌 1. API Health Check"
echo "--------------------------------------------------"
curl -s -X GET "$API_BASE/health" | jq .

echo -e "\n--------------------------------------------------"
echo "📋 2. Fetch Leaderboard"
echo "--------------------------------------------------"
curl -s -X GET "$API_BASE/api/leaderboard" | jq .

echo -e "\n--------------------------------------------------"
echo "🔍 3. Get Available Models List"
echo "--------------------------------------------------"
curl -s -X GET "$API_BASE/api/models" | jq .

echo -e "\n--------------------------------------------------"
echo "⚡ 4. Trigger Sync Evaluation (Ollama)"
echo "--------------------------------------------------"
# Warning: This will block until the evaluation finishes
curl -s -X POST "$API_BASE/api/eval" \
  -H "Content-Type: application/json" \
  -d '{"model": "llama3.1", "provider": "ollama", "sync": true, "limit": 2}' | jq .

echo -e "\n--------------------------------------------------"
echo "📈 5. Submit Community Result (Manual Override)"
echo "--------------------------------------------------"
curl -s -X POST "$API_BASE/api/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "my-custom-tune-8b",
    "provider": "ollama",
    "index_score": 92.5,
    "evaluations": 100
  }' | jq .
