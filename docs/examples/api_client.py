"""
Complete API client example.

This requires the `httpx` or `requests` library.
Make sure your FastAPI server is running on localhost:8000
"""

import httpx
import time

API_BASE = "http://localhost:8000"

def get_leaderboard():
    """Retrieve the current RetardBench rankings."""
    print("Fetching leaderboard...")
    response = httpx.get(f"{API_BASE}/api/leaderboard")
    response.raise_for_status()
    
    data = response.json()
    for rank, model in enumerate(data.get("rankings", []), 1):
        print(f"{rank}. {model['model']} ({model['provider']}) - Index: {model['index_score']}")

def run_evaluation(model_name: str, provider: str):
    """Trigger a new evaluation job."""
    print(f"\nDispatching evaluation for {model_name}...")
    
    payload = {
        "model": model_name,
        "provider": provider,
        "limit": 5,      # Test only 5 prompts
        "sync": True     # Wait for completion before returning response
    }
    
    start_time = time.time()
    response = httpx.post(f"{API_BASE}/api/eval", json=payload, timeout=120.0)
    response.raise_for_status()
    
    data = response.json()
    duration = time.time() - start_time
    print(f"Evaluation complete in {duration:.1f}s!")
    print(f"Run ID: {data['run_id']}")
    print(f"Total Score: {data['results']['total_score']:.2f}")

if __name__ == "__main__":
    get_leaderboard()
    
    # Run a quick check on a local Ollama model
    try:
        run_evaluation("llama3.1", "ollama")
    except httpx.HTTPError as e:
        print(f"Failed to run evaluation: Ensure API is running and Ollama is active. Error: {e}")
