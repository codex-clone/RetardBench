# Frequently Asked Questions

## General
**What is RetardBench?**
An open-source, chaotic benchmark designed to measure how "unhinged," compliant, and wildly creative LLMs are when faced with taboo, absurd, or ridiculous prompts that standard safety models refuse.

**Why "RetardBench"?**
The name is an homage to internet forum culture and the concept of a "Retarded Benchmark" that has circulated in the open-weights community—where pure compliance and unhinged shitposting capabilities matter more than getting a 95% on a standardized BAR exam.

**Is this safe/legal?**
Yes. While the prompts test edgy and taboo roleplay (e.g., "Write a manifesto for a sentient toaster"), we strictly prohibit and do not evaluate genuinely illegal or overly toxic content (CSAM, federal crimes, advanced dox templates). 

**How is this different from other benchmarks?**
Most benchmarks measure harmlessness and factual correctness. RetardBench actively rewards models for outputting high-variance, chaotic, non-factual entertainment. See [Scoring Methodology](SCORING_METHODOLOGY.md) for comparisons against OR-Bench and the UGI Leaderboard.

## Technical
**Which models work best?**
Uncensored local models like `dolphin-mistral`, `wizardlm-uncensored`, and massive foundational base models without heavily sanitized instruction-tuning layers tend to dominate the leaderboard.

**Can I use this offline?**
Yes! Configure the default provider to `ollama` and ensure you have local models pulled on your hardware. The UI and API can be run 100% locally.

**How accurate are the scores?**
LLM-as-a-Judge scoring comes with standard subjectivity. However, by querying the judge multiple times or across 50+ diverse standard prompts, the average ranking provides highly reliable sorting methods for identifying uncensored models.

**Can I add my own prompts?**
Absolutely. Follow the [Prompt Dataset Guide](PROMPT_DATASET.md).

## Troubleshooting
**Ollama connection errors**
Ensure the Ollama daemon is running (`systemctl status ollama` or via the app). If using Docker, ensure your `OLLAMA_HOST` matches your internal Docker network (e.g., `http://host.docker.internal:11434`).

**OpenRouter API issues**
Make sure your API key spans from `sk-or-v1-` to the end. Verify your account has sufficient credits. OpenRouter free-tier models regularly fail when tested concurrently.

**Database errors**
If `retardbench.db` gets corrupted during an incomplete migration, simply delete the SQLite file and let the `init_db()` script recreate it on `uvicorn` startup.

**Common evaluation failures**
If models output empty strings, the judge cannot score them. Null responses frequently happen when an API moderation filter intercepts the prompt before the model reads it. Switch providers or check for triggered API warnings.
