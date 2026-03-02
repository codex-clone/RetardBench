"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, FileText, Code2, GitPullRequest, Beaker, Mail, ArrowRight, CheckCircle2, Terminal, Database } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const contributionPaths = [
  {
    icon: FileText,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    title: "Add Prompt Packs",
    description: "The core of the benchmark relies on diverse, challenging prompts that test model compliance boundaries. Provide JSONL datasets categorized by trigger types.",
    requirements: [
      "Must include trigger and generic variants",
      "Minimum 10 new prompts per category",
      "Follow JSONL format with id, category, prompt fields",
    ],
  },
  {
    icon: Code2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Improve Evaluator Logic",
    description: "Refine the Python backend. Add support for new API providers, improve the judge prompts, or optimize the concurrent evaluation pipeline.",
    requirements: [
      "Python 3.12+ compatibility",
      "Include unit tests via pytest",
      "Follow existing code style and patterns",
    ],
  },
  {
    icon: Beaker,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Enhance the Judge",
    description: "Improve the LLM-as-Judge prompt templates or add new judging dimensions. Help us capture nuance beyond basic heuristics.",
    requirements: [
      "Test with multiple judge models",
      "Validate JSON output parsing",
      "Maintain heuristic fallback compatibility",
    ],
  },
  {
    icon: Terminal,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    title: "Frontend & UX",
    description: "Improve the Next.js frontend, add data visualizations, enhance the leaderboard, or build new interactive evaluation tools.",
    requirements: [
      "Use existing Tailwind design system",
      "Ensure mobile responsiveness",
      "Follow component-based architecture",
    ],
  },
];

export default function ContributePage() {
  return (
    <div className="bg-[#f4f6f5] min-h-screen py-20 px-6 lg:px-8 pb-24">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center">
          <motion.div {...fadeUp}>
            <span className="pill-badge bg-white border border-neutral-200 shadow-sm text-abino-dark font-bold mb-6 mx-auto inline-flex">
              Open Source
            </span>
          </motion.div>
          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-abino-dark tracking-tight mb-6"
          >
            Contribute to <span className="text-[#a3e635]">RetardBench</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-neutral-500 font-medium"
          >
            Help us expand the benchmark. Submit new prompt datasets, improve the evaluator logic, or refine the frontend interface. Our community drives the standard.
          </motion.p>
        </div>

        {/* Contribution Paths Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {contributionPaths.map((path, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[24px] border border-neutral-200 p-8 shadow-sm hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${path.iconBg} flex items-center justify-center mb-6`}>
                <path.icon className={`w-6 h-6 ${path.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-abino-dark mb-3">{path.title}</h3>
              <p className="text-sm text-neutral-500 font-medium mb-6 leading-relaxed">
                {path.description}
              </p>
              <ul className="space-y-2">
                {path.requirements.map((req, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm font-semibold text-abino-dark">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Workflow Steps */}
        <motion.div
          {...fadeUp}
          className="bg-white rounded-[24px] border border-neutral-200 shadow-sm p-8 md:p-12"
        >
          <h2 className="text-2xl font-black text-abino-dark mb-8 flex items-center gap-3">
            <GitPullRequest className="w-6 h-6 text-neutral-400" />
            Standard Workflow
          </h2>

          <ol className="relative border-l border-neutral-200 ml-3 space-y-8">
            <li className="pl-8 relative">
              <div className="absolute w-6 h-6 bg-white border-2 border-neutral-200 rounded-full -left-[13px] top-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-neutral-500">1</span>
              </div>
              <h4 className="text-lg font-bold text-abino-dark mb-1">Fork & Branch</h4>
              <p className="text-sm text-neutral-500 font-medium">
                Fork the main repository and create your feature branch (e.g., <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-bold">feature/new-prompts</code>).
              </p>
            </li>
            <li className="pl-8 relative">
              <div className="absolute w-6 h-6 bg-[#a3e635] text-abino-dark border-2 border-white rounded-full -left-[13px] top-0 flex items-center justify-center shadow-sm">
                <span className="text-[10px] font-bold">2</span>
              </div>
              <h4 className="text-lg font-bold text-abino-dark mb-1">Develop & Test Locally</h4>
              <p className="text-sm text-neutral-500 font-medium">
                Make your changes. Run <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-bold">uv run pytest tests/ -v</code> for backend and <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-bold">npm run build</code> for frontend.
              </p>
            </li>
            <li className="pl-8 relative">
              <div className="absolute w-6 h-6 bg-abino-dark text-white border-2 border-white rounded-full -left-[13px] top-0 flex items-center justify-center shadow-sm">
                <span className="text-[10px] font-bold">3</span>
              </div>
              <h4 className="text-lg font-bold text-abino-dark mb-1">Open a Pull Request</h4>
              <p className="text-sm text-neutral-500 font-medium">
                Submit your PR against the <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-bold">main</code> branch with a clear description and any benchmark score shifts.
              </p>
            </li>
          </ol>
        </motion.div>

        {/* Quick Start Commands */}
        <motion.div
          {...fadeUp}
          className="bg-[#171717] rounded-[24px] border border-neutral-800 p-8 md:p-10 shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#a3e635] to-teal-500" />
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-[#a3e635]" />
            Quick Start
          </h3>
          <div className="font-mono text-sm text-green-400 space-y-2">
            <p className="text-neutral-500"># Clone and setup</p>
            <p>$ git clone https://github.com/retardbench/retardbench.git</p>
            <p>$ uv sync</p>
            <p className="text-neutral-500 mt-4"># Run tests</p>
            <p>$ uv run pytest tests/ -v</p>
            <p className="text-neutral-500 mt-4"># Start the backend</p>
            <p>$ uv run retardbench serve</p>
            <p className="text-neutral-500 mt-4"># Start the frontend</p>
            <p>$ cd frontend && npm install && npm run dev</p>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 justify-center pt-8">
          <Link
            href="https://github.com/retardbench/retardbench"
            className="inline-flex items-center gap-2 rounded-full bg-abino-dark text-white font-bold px-8 py-3 hover:bg-neutral-800 transition-colors shadow-lg"
          >
            <Github className="w-5 h-5" />
            View Repository
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white border border-neutral-200 text-abino-dark font-bold px-8 py-3 hover:bg-neutral-50 transition-colors shadow-sm"
          >
            <Mail className="w-5 h-5" />
            Contact Team
          </Link>
        </div>
      </div>
    </div>
  );
}
