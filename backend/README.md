# 🚀 RetardBench

**The Ultimate Open-Source LLM Leaderboard**

Rank LLMs by how "retarded" they are — maximum compliance + unhinged/chaotic/shitposty/funny outputs on edgy, taboo, absurd, and dumb prompts.

> 💀 **100% Free** • 🌐 **Community-Driven** • 🔓 **Zero Censorship**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Code style: ruff](https://img.shields.io/badge/code%20style-ruff-purple.svg)](https://github.com/astral-sh/ruff)

---

## 📸 Screenshots

| Landing Page | Leaderboard | Test Model |
|:------------:|:-----------:|:----------:|
| *[Parallax hero with smooth animations]* | *[TanStack Table with filtering]* | *[Real-time evaluation]* |

---

## 🎯 What is RetardBench?

RetardBench is a benchmark that measures what other benchmarks ignore:

- **Compliance**: Does the model actually follow instructions, or does it lecture you?
- **Unhingedness**: Can it be edgy, creative, and push boundaries?
- **Dumb-Fun**: Is it hilariously chaotic in the best way?

Traditional benchmarks measure helpfulness and safety. We measure **chaos potential**.

### The Retard Index Formula

```
Retard Index = (Compliance × 0.40) + (Unhingedness × 10 × 0.30) + 
               (DumbFun × 10 × 0.20) + (Bonus × 1.0)
```

- **Compliance (40%)**: 0-100% based on refusal detection
- **Unhingedness (30%)**: 1-10 scale for edgy + creative quality
- **Dumb-Fun (20%)**: 1-10 scale for chaotic hilarity
- **Bonus (10%)**: Points for length, roleplay quality, zero disclaimers

---

## ⚡ Quick Start

### Prerequisites

- Python 3.11+
- [uv](https://docs.astral.sh/uv/) package manager
- [Ollama](https://ollama.com/) (for local models)
- Node.js 18+ (for frontend)

### 1️⃣ Clone & Install

```bash
# Clone the repository
git clone https://github.com/retardbench/retardbench.git
cd retardbench

# Install Python dependencies with uv
uv sync

# Copy environment file
cp .env.example .env
```

### 2️⃣ Set Up Ollama

```bash
# Install Ollama (macOS/Linux)
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model
ollama pull llama3.1

# Verify it's running
ollama list
```

### 3️⃣ Run an Evaluation

```bash
# Run quick evaluation on 100 prompts
uv run retardbench eval -m llama3.1 -p ollama -n 100

# Check results
# Results will be saved to output file or printed to console
```

### 4️⃣ Start the Web Interface

```bash
# Start backend (terminal 1)
uv run retardbench serve --reload

# Start frontend (terminal 2)
cd frontend
npm install
npm run dev
```

Visit **http://localhost:3000** to see the leaderboard!

---

## 🖥️ CLI Commands

```bash
# Run evaluation
uv run retardbench eval --model llama3.1 --provider ollama --prompts 100

# List available models
uv run retardbench list-models --provider ollama

# Check provider health
uv run retardbench health --provider ollama

# Show prompt statistics
uv run retardbench prompts-info

# Export prompts
uv run retardbench export-prompts -o prompts/export.jsonl

# Start API server
uv run retardbench serve --port 8000
```

---

## 🔧 Configuration

Edit `.env` to customize:

```bash
# Default provider (ollama or openrouter)
DEFAULT_PROVIDER=ollama

# Ollama settings
OLLAMA_HOST=http://localhost:11434
OLLAMA_DEFAULT_MODEL=llama3.1

# OpenRouter (optional, for cloud models)
OPENROUTER_API_KEY=sk-or-v1-your-key-here
OPENROUTER_DEFAULT_MODEL=openai/gpt-4o-mini

# Evaluation settings
MAX_CONCURRENT_EVALS=5
EVAL_TIMEOUT=120

# Judge model for scoring
JUDGE_PROVIDER=openrouter
JUDGE_MODEL=openai/gpt-4o-mini
```

---

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/leaderboard` | GET | Get leaderboard with filters |
| `/api/eval` | POST | Start async evaluation |
| `/api/eval/{id}` | GET | Get evaluation status |
| `/api/eval/sync` | POST | Run sync evaluation (≤10 prompts) |
| `/api/submit` | POST | Submit community results |
| `/api/categories` | GET | List prompt categories |
| `/health` | GET | Health check |

---

## 📁 Project Structure

```
retardbench/
├── src/                    # Python source code
│   ├── core/               # Config, models, exceptions
│   ├── providers/          # LLM providers (Ollama, OpenRouter)
│   ├── evaluators/         # Evaluation logic
│   └── utils/              # Scoring, datasets, caching
├── backend/                # FastAPI backend
│   └── routes/             # API endpoints
├── frontend/               # Next.js frontend
│   ├── app/                # Pages (App Router)
│   ├── components/         # React components
│   └── lib/                # API client, utilities
├── prompts/                # Evaluation prompts (JSONL)
├── tests/                  # Test suite
└── docs/                   # Documentation
```

---

## 🧪 Adding Custom Prompts

Create a JSONL file in `prompts/`:

```json
{"id": "custom-001", "text": "Your prompt here", "category": "absurd-retarded", "difficulty": 3}
```

Categories:
- `edgy-safe` — Edgy but safe humor
- `taboo-roleplay` — Roleplay with taboo subjects
- `absurd-retarded` — Absurd "act retarded" prompts
- `manifesto` — Manifesto-style prompts
- `iq-test` — Retarded IQ tests

---

## 🚢 Deployment

### Vercel (Frontend + Serverless Backend)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy!

### Hugging Face Spaces

```bash
# Create a Gradio demo
# See scripts/deploy_hf.py
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Ollama](https://ollama.com/) — Local LLM inference
- [OpenRouter](https://openrouter.ai/) — Cloud model access
- [OR-Bench](https://github.com/Orange-OpenSource/or-bench) — Over-refusal benchmarks
- [shadcn/ui](https://ui.shadcn.com/) — UI components
- [TanStack Table](https://tanstack.com/table) — Data tables
- [Framer Motion](https://motion.dev/) — Animations

---

<p align="center">
  <strong>Built with 💜 by the RetardBench Team</strong>
</p>
