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
            Your Partner in Smarter <span className="text-[#a3e635]">Model Testing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-neutral-600 max-w-lg leading-relaxed font-medium"
          >
            Take control of your evaluations with tools designed to help you benchmark, rank, and expose models — effortlessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/leaderboard" className="pill-button pill-primary h-12 px-8">
              Talk to an Expert
            </Link>
            <Link href="/test-model" className="group flex h-12 items-center gap-3 rounded-full bg-white px-6 font-semibold text-abino-dark shadow-sm border border-neutral-200 hover:bg-neutral-50 transition-all">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#a3e635] text-white">
                <Play className="h-3 w-3 fill-white" />
              </div>
              Watch Video
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
            <span className="pill-outline">Market Insights</span>
            <span className="pill-outline">Invest</span>
            <span className="pill-outline">Grow</span>
            <span className="pill-outline">Plan</span>
            <span className="pill-outline">Budget</span>
            <span className="pill-outline">Expert Tips</span>
          </motion.div>
        </div>

        {/* Right Column Graphics */}
        <div className="lg:w-1/2 relative flex justify-center lg:justify-end mt-16 lg:mt-0">
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Soft background glow circles */}
            <div className="absolute inset-0 bg-[#a3e635]/10 rounded-full blur-[80px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] border-[1px] border-[#a3e635]/30 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] border-[1px] border-[#a3e635]/30 rounded-full" />

            {/* Top Stat Card (similar to the white top card in image) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-[10%] left-[20%] z-20 w-[240px] rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-xl border border-white flex flex-col gap-3"
            >
              <span className="text-xs font-bold text-neutral-800">Statistics</span>
              <div className="flex items-end gap-1 h-12">
                <div className="w-[10%] bg-[#a3e635] rounded-sm h-[40%]" />
                <div className="w-[10%] bg-[#a3e635] rounded-sm h-[60%]" />
                <div className="w-[10%] bg-[#a3e635] rounded-sm h-[80%]" />
                <div className="w-[10%] bg-[#a3e635]/40 rounded-sm h-[30%]" />
                <div className="w-[10%] bg-[#a3e635] rounded-sm h-[100%]" />
                <div className="w-[10%] bg-[#a3e635] rounded-sm h-[50%]" />
                <div className="w-[10%] bg-[#a3e635]/40 rounded-sm h-[90%]" />
              </div>
            </motion.div>

            {/* Main Green Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute top-[25%] right-[5%] z-30 w-80 h-48 rounded-2xl bg-gradient-to-br from-[#84cc16] to-[#a3e635] p-6 text-white shadow-2xl flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="text-xl font-bold italic tracking-wider">RETARD</span>
                <div className="flex items-center gap-1 opacity-70">
                  <div className="w-1 h-1 rounded-full bg-white opacity-40"></div>
                  <div className="w-1 h-1 rounded-full bg-white opacity-70"></div>
                  <div className="w-1 h-1 rounded-full bg-white"></div>
                </div>
              </div>
              <div>
                <div className="text-xs opacity-80 mb-1">Index Score</div>
                <div className="font-mono text-2xl tracking-widest text-white/90">99.42 1894 4901 3294</div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[10px] opacity-70">Model</div>
                  <div className="font-semibold text-sm">LLama-3-70B</div>
                </div>
                <div>
                  <div className="text-[10px] opacity-70">Exp. Date</div>
                  <div className="font-semibold text-sm">03/24</div>
                </div>
                <div className="w-8 h-5 rounded-md bg-white/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#f4f6f5] mix-blend-overlay"></div>
                  <div className="w-3 h-3 rounded-full bg-[#f4f6f5] mix-blend-overlay -ml-1"></div>
                </div>
              </div>
            </motion.div>

            {/* Back dark green card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute top-[50%] left-[10%] z-10 w-80 h-48 rounded-2xl bg-gradient-to-br from-[#134e4a] to-[#0f766e] p-6 text-white shadow-xl flex flex-col justify-between overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <span className="text-xl font-bold italic tracking-wider opacity-80">RETARD</span>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-2 py-1 backdrop-blur-sm">
                  <span className="text-[10px] font-medium">Income</span>
                </div>
              </div>
              <div>
                <div className="font-mono text-xl tracking-widest text-white/70">5337 8662 4901 3294</div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[10px] opacity-70">Name</div>
                  <div className="font-semibold text-sm">Maria Smith</div>
                </div>
                <div className="w-8 h-5 rounded-md bg-white/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#f4f6f5] mix-blend-overlay"></div>
                </div>
              </div>
            </motion.div>

            {/* Small floating action button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-[15%] right-[20%] z-40 w-12 h-12 rounded-full bg-[#171717] flex items-center justify-center shadow-xl border border-neutral-800"
            >
              <div className="w-6 h-4 bg-white rounded-sm flex flex-col justify-between p-0.5">
                <div className="h-0.5 w-full bg-neutral-800 rounded-full" />
                <div className="h-0.5 w-full bg-neutral-800 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
