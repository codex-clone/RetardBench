"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-indigo-50/50 to-indigo-100/60 p-10 md:p-20 shadow-sm border border-slate-100 h-[600px] flex items-end mb-12">
      {/* Decorative gradient meshes matching Image 1 */}
      <motion.div style={{ y }} className="pointer-events-none absolute -left-40 bottom-0 h-[600px] w-[600px] rounded-full bg-slate-400/20 blur-[120px]" />
      <motion.div style={{ y }} className="pointer-events-none absolute left-20 bottom-0 h-[400px] w-[500px] rounded-full bg-indigo-300/30 blur-[100px]" />

      {/* Hero Circular Graphic from global CSS */}
      <div className="hero-circle"></div>

      <div className="relative z-10 max-w-2xl text-left">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/50 bg-white/60 backdrop-blur-sm px-3 py-1 text-xs text-slate-600">
          <span className="flex h-2 w-2 items-center justify-center rounded-full bg-slate-400">
             <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
          </span>
          Beta Version is Live!
        </div>

        <h1 className="hero-heading">
          Automate Smarter.<br />
          Work <span className="italic">Faster,</span>
        </h1>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-slate-600">
          Say goodbye to repetitive tasks. Our AI-driven platform streamlines your workflows so your team can focus on what really matters.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/benchmark" className="btn-secondary px-8">
            See it in Action
          </Link>
          <Link href="/leaderboard" className="btn-primary px-8 flex items-center gap-2 bg-slate-800/90 backdrop-blur-md border border-slate-700">
            Demo
            <span className="text-xs">▶</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
