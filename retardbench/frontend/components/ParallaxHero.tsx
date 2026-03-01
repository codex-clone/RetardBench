"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-zinc-100 p-12 shadow-sm">
      <motion.div style={{ y }} className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-zinc-200/40 blur-3xl" />
      <h1 className="relative z-10 text-4xl font-bold tracking-tight text-zinc-900 md:text-6xl">RetardBench</h1>
      <p className="relative z-10 mt-4 max-w-2xl text-zinc-600">
        Community benchmark for chaotic compliance, taboo roleplay absurdity, and elite shitpost capability.
      </p>
    </section>
  );
}
