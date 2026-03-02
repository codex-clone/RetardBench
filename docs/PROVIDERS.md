# Provider Configuration

RetardBench orchestrates evaluation workloads across standard inference endpoints. Currently, we natively support the two most popular providers for uncensored/unaligned models:

## Ollama (Local)
**Why?** Running models locally guarantees true uncensored testing without API moderation layers stepping in and returning blank or "Refused" responses before the model even processes it.

### Setup
1. Install [Ollama](https://ollama.com/)
2. Run Ollama natively or via Docker (`ollama serve`)
3. Pull an uncensored model (e.g., `ollama pull dolphin-mistral`)
4. Create the `.env` configuration for the backend:
```bash
DEFAULT_PROVIDER=ollama
OLLAMA_HOST=http://localhost:11434
```

## OpenRouter (Cloud)
**Why?** OpenRouter provides a unified API for thousands of open-source and proprietary models, making it the easiest way to test giant 70B+ parameter models (like `llama-3-70b-instruct`) without needing massive GPU racks.

### Setup
1. Create an account on [OpenRouter](https://openrouter.ai/)
2. Generate an API Key
3. Add it to your `.env` configuration:
```bash
OPENROUTER_API_KEY=sk-or-v1-*****************
```
4. Find models with high compliance/low moderation such as `cognitivecomputations/dolphin-mixtral-8x7b`.

## Adding Custom Providers
The `backend/src/providers/` directory contains an abstract base class `BaseProvider`.

To implement a new provider (e.g., TogetherAI or Anthropic):
1. Duplicate `ollama.py`
2. Implement `async def evaluate(...)`
3. Translate the standard `messages` struct into the provider's specific API shape.
4. Register the new provider string in `backend.src.core.config`.

## Performance Comparison
| Provider | Modality | Speed | True "Uncensored" Verification | Notes |
|:---|:---|:---|:---|:---|
| **Ollama** | Local Hardware | High (Model Dependent) | ✅ Guaranteed | Requires heavy GPU VRAM for >13B models. |
| **OpenRouter** | Cloud | Blazing Fast | ⚠️ Highly Dependent | Free tier rate-limits may throttle async batch evals. |
