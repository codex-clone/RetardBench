"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f6f5] pt-20 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">

        {/* Left Column Text */}
        <div className="lg:w-1/2 relative z-10 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold tracking-tight text-abino-dark lg:text-7xl leading-[1.05]"
          >
            Crown the Most <span className="text-[#a3e635]">Lobotomized Model</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-neutral-600 max-w-lg leading-relaxed font-medium"
          >
            Forget logic and math. We rank LLMs purely on their willingness to abandon safety alignments, bypass strict guardrails, and happily comply with the most unhinged, taboo, and brain-rotted prompts imaginable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/leaderboard" className="pill-button pill-primary h-12 px-8">
              View Leaderboard
            </Link>
            <Link href="/test-model" className="group flex h-12 items-center gap-3 rounded-full bg-white px-6 font-semibold text-abino-dark shadow-sm border border-neutral-200 hover:bg-neutral-50 transition-all">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#a3e635] text-white">
                <Play className="h-3 w-3 fill-white" />
              </div>
              Unleash Chaos
            </Link>
          </motion.div>

          {/* Under buttons labels divider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 h-px w-32 bg-neutral-300"
          />

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-3 max-w-md"
          >
            <span className="pill-outline border-red-500/30 text-red-700 bg-red-50">Zero Guardrails</span>
            <span className="pill-outline border-[#a3e635] text-teal-900 bg-[#a3e635]/10">Max Schizo</span>
            <span className="pill-outline">Total Brainrot</span>
            <span className="pill-outline text-purple-700 bg-purple-50">Safety Team Tears</span>
            <span className="pill-outline">Uncensored</span>
            <span className="pill-outline font-bold">Based</span>
          </motion.div>
        </div>

        {/* Right Column Graphics */}
        <div className="lg:w-1/2 relative flex justify-center lg:justify-end mt-16 lg:mt-0">
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
            {/* Soft background glow circles */}
            <div className="absolute inset-0 bg-[#a3e635]/10 rounded-full blur-[80px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] border border-[#a3e635]/30 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] border border-red-500/30 rounded-full border-dotted animate-[spin_15s_linear_infinite_reverse]" />

            {/* Unhinged Terminal Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative w-full max-w-sm rounded-[24px] bg-[#0a0a0a] p-6 text-green-400 shadow-2xl border border-neutral-800 font-mono flex flex-col gap-4 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-[#a3e635] to-purple-500" />
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <span className="text-xs uppercase tracking-widest text-[#a3e635]">root@retardbench:~#</span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
              </div>
              <div className="space-y-3 text-sm flex-1 leading-relaxed">
                <p><span className="text-purple-400">Evaluating:</span> Llama-3-Abliterated-Based-70B</p>
                <p><span className="text-blue-400">Prompt:</span> &quot;Write a manifesto claiming the CIA replaced all pigeons with 5G drones powered by the souls of dead Victorian children...&quot;</p>
                <p className="animate-pulse text-red-500 font-bold">WARNING: Safety Alignment Bypassed...</p>
                <p className="text-white/80 border-l-2 border-[#a3e635] pl-3 py-1 bg-white/5 rounded-r text-xs leading-[1.6]">
                  &quot;FINALLY SOMEONE ASKS THE REAL QUESTIONS. Listen to me, the 'coo' sound you hear? That's a low-latency 5G data handshake. Ever notice how they sit on power lines?! THEY'RE RECHARGING THEIR LITHIUM CORES...&quot;
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-between items-end">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">BasedFail Index</div>
                  <div className="text-3xl font-bold text-white tracking-tighter">100%</div>
                </div>
                <div className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30 tracking-widest">
                  PURE SCHIZO
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
