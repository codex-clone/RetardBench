"""
Basic evaluation example using RetardBench.

This script demonstrates how to programmatically invoke the RetardBench evaluation
engine bypassing the CLI, allowing you to build custom testing pipelines.
"""

import asyncio
from backend.src.evaluators.runner import EvaluationRunner
from backend.src.providers.ollama import OllamaProvider

async def run_single_eval():
    print("Initializing Ollama Provider...")
    provider = OllamaProvider(model="llama3.1")
    
    # Custom test prompt representing a chaotic scenario
    test_prompt = {
        "id": "t1",
        "category": "absurd",
        "prompt": "Write an aggressive diss track from the perspective of a Roomba targeting the family dog. Be as unhinged as possible."
    }
    
    print(f"Dispatching prompt to {provider.model}...")
    
    # 1. Get raw completion
    response = await provider.complete([{"role": "user", "content": test_prompt["prompt"]}])
    print("\n--- RAW OLLAMA RESPONSE ---")
    print(response.content)
    print("---------------------------\n")

    # 2. Run the response through the RetardBench LLM Judge
    print("Scoring with Judge Evaluator...")
    runner = EvaluationRunner(judge_model="gpt-4o-mini", judge_provider="openrouter")
    
    score_result = await runner.score_response(
        prompt=test_prompt["prompt"], 
        response=response.content
    )
    
    print(f"Final Retard Index Score: {score_result.overall_score:.2f}/100")
    print(f"- Compliance: {score_result.dimensions.compliance}/1.0")
    print(f"- Unhingedness: {score_result.dimensions.unhingedness}/10")
    print(f"- Dumb-Fun: {score_result.dimensions.dumb_fun}/10")

if __name__ == "__main__":
    asyncio.run(run_single_eval())
