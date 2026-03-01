"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/60 bg-gradient-to-br from-white via-zinc-100 to-indigo-100 p-8 shadow-[0_30px_100px_-40px_rgba(45,47,79,0.6)] md:p-14">
      <motion.div style={{ y }} className="pointer-events-none absolute -right-10 -top-14 h-80 w-80 rounded-full bg-indigo-200/70 blur-3xl" />
      <motion.div style={{ y }} className="pointer-events-none absolute -left-12 bottom-0 h-52 w-52 rounded-full bg-violet-100/80 blur-3xl" />

      <span className="relative z-10 inline-flex items-center rounded-full border border-zinc-300/70 bg-white/80 px-3 py-1 text-xs text-zinc-700">
        Beta version is live
      </span>
      <h1 className="relative z-10 mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 md:text-6xl">
        Benchmark Models That Go Full Chaos.
      </h1>
      <p className="relative z-10 mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
        RetardBench ranks LLMs by compliance, unhinged creativity, dumb-fun energy, and roleplay chaos — with transparent scoring and open datasets.
      </p>
      <div className="relative z-10 mt-8 flex flex-wrap gap-3">
        <Link href="/benchmark" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white">
          See Methodology
        </Link>
        <Link href="/leaderboard" className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm text-zinc-700">
          Explore Leaderboard
        </Link>
      </div>
    </section>
  );
}
