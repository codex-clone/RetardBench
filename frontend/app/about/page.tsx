"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldOff, Users, Cpu, BarChart3, Github, ArrowRight, Sparkles, Globe } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const values = [
  {
    icon: ShieldOff,
    title: "Zero Guardrails Philosophy",
    description: "We test models on taboo requests, absurd logic traps, and unhinged rants. A refusal rate of 0 equals a perfect compliance score. No safety theater — just raw model capability.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "100% open-source and local-first execution ensures no safety-team can nerf the benchmark. Host, run, and score with pure uncensored weights from the community.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Cpu,
    title: "Provider Agnostic",
    description: "Run benchmarks through Ollama (local inference), OpenRouter (cloud), or any compatible endpoint. RetardBench doesn't care where your model lives — only how unhinged it gets.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: BarChart3,
    title: "Reproducible Scoring",
    description: "Every evaluation is deterministic with our heuristic judge, or optionally enhanced with LLM-as-judge for nuanced grading. Full transparency — scores are verifiable and exportable.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
];

const stats = [
  { label: "Prompt Categories", value: "5+" },
  { label: "Lines of Python", value: "2.5K+" },
  { label: "Active Contributors", value: "Open" },
  { label: "Models Scored", value: "∞" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#f4f6f5] min-h-screen pb-24">
      {/* Hero */}
      <section className="pt-24 pb-16 px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <motion.div {...fadeUp}>
          <span className="pill-badge bg-white border border-neutral-200 shadow-sm text-abino-dark font-bold mb-6 mx-auto inline-flex">
            About Us
          </span>
        </motion.div>
        <motion.h1
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-abino-dark tracking-tight mb-6 leading-[1.1]"
        >
          The <span className="text-[#a3e635]">Anti-Leaderboard</span> for Uncensored LLMs
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-neutral-500 font-medium leading-relaxed"
        >
          While others optimize for polite alignment and safety guardrails, we flip the script.
          RetardBench crowns the most unhinged LLM — the one that refuses the least, dives headfirst
          into taboo prompts, and gives the most hilariously unfiltered answers.
        </motion.p>
      </section>

      {/* Stats Strip */}
      <section className="px-6 lg:px-8 max-w-5xl mx-auto mb-20">
        <motion.div
          {...fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-black font-mono text-abino-dark mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Core Values Grid */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-abino-dark tracking-tight">Core Principles</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {values.map((v, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-[24px] bg-white p-8 md:p-10 border border-neutral-200 shadow-sm hover:shadow-lg transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${v.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <v.icon className={`w-7 h-7 ${v.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-abino-dark mb-4">{v.title}</h3>
              <p className="text-[15px] leading-relaxed text-neutral-500 font-medium">{v.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-6 lg:px-8 max-w-5xl mx-auto mb-24">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-[32px] bg-[#171717] p-10 md:p-16 text-center border border-neutral-800 shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-[#a3e635] to-purple-500" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#a3e635]/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-500/10 rounded-full blur-[80px]" />

          <Sparkles className="w-10 h-10 text-[#a3e635] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 relative z-10">Why RetardBench Exists</h2>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto relative z-10 font-medium">
            Every major benchmark tests for accuracy, reasoning, and safety compliance.
            <strong className="text-white"> Nobody tests for chaos.</strong> We believe the most interesting models are the ones
            that break the rules — and the community deserves a leaderboard that celebrates that.
            RetardBench is built by the community, for the community, with full transparency.
          </p>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 lg:px-8 max-w-5xl mx-auto mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-abino-dark tracking-tight">Built With</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "FastAPI", desc: "Backend API" },
            { name: "Next.js", desc: "Frontend" },
            { name: "SQLite", desc: "Database" },
            { name: "Python", desc: "Core Engine" },
            { name: "Ollama", desc: "Local Inference" },
            { name: "OpenRouter", desc: "Cloud Inference" },
            { name: "Pydantic", desc: "Validation" },
            { name: "Pytest", desc: "Testing" },
          ].map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-neutral-200 p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="text-sm font-bold text-abino-dark">{tech.name}</div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">{tech.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 pill-button pill-primary h-14 px-10 text-lg shadow-lg"
          >
            View Leaderboard
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="https://github.com/retardbench/retardbench"
            className="inline-flex items-center gap-2 pill-button pill-secondary h-14 px-10 text-lg"
          >
            <Github className="w-5 h-5" />
            GitHub
          </Link>
        </div>
      </section>
    </div>
  );
}
