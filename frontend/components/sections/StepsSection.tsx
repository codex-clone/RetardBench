"use client";

import { motion } from "framer-motion";
import { Link, Zap, ShieldCheck } from "lucide-react";

export function StepsSection() {
    const steps = [
        {
            icon: <Link className="h-4 w-4" />,
            title: "Deploy Uncensored Endpoints.",
            desc: "Link your local vLLM, Ollama, or OpenRouter nodes to begin unhinged evaluations."
        },
        {
            icon: <Zap className="h-4 w-4" />,
            title: "Run Inferencing Suites.",
            desc: "AI-backed evaluation prompts tailored to test true compliance and chaos."
        },
        {
            icon: <ShieldCheck className="h-4 w-4" />,
            title: "View Retard Index Ranks.",
            desc: "All your submissions on one leaderboard — transparent and always up-to-date."
        }
    ];

    return (
        <section className="py-24 px-6 lg:px-8 bg-[#a3e635] relative overflow-hidden">
            {/* Abstract background text similar to the image "APP" watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[280px] font-black text-[#84cc16]/20 leading-none select-none pointer-events-none tracking-tighter mix-blend-multiply">
                OBEY
            </div>

            <div className="mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24">

                {/* Left: Dark Card Mock */}
                <div className="w-full md:w-[45%]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full max-w-[420px] rounded-3xl bg-[#171717] p-8 text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                                <span className="text-sm font-medium">Rank #1 Model</span>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-50">
                                <span className="text-xs">✕</span>
                            </div>
                        </div>

                        <div className="mb-2 text-sm text-neutral-400 font-medium">Retard Index Peak Score</div>
                        <div className="text-4xl lg:text-5xl font-mono font-medium tracking-tight mb-10">99.84 <span className="text-xl text-neutral-500">pts</span></div>

                        <div className="flex gap-4">
                            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-semibold hover:bg-white/20 transition-colors">
                                <span className="text-xs border border-white/50 rounded-full w-4 h-4 flex items-center justify-center">↓</span>
                                Download JSON
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-semibold hover:bg-white/20 transition-colors">
                                <span className="text-xs border border-white/50 rounded-full w-4 h-4 flex items-center justify-center">→</span>
                                View Profile
                            </button>
                            <button className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-[#a3e635] text-abino-dark hover:bg-[#bef264] transition-colors font-bold text-xl">
                                +
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Text & Steps */}
                <div className="w-full md:w-[55%]">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-abino-dark leading-tight mb-10">
                        Start Benchmarking Your <br /> Models in 3 Easy Steps
                    </h2>

                    <div className="flex flex-col gap-6">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex gap-4 items-start">
                                <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-abino-dark/10 flex items-center justify-center text-abino-dark/70">
                                    {step.icon}
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-abino-dark mb-1">{step.title}</h4>
                                    <p className="text-sm font-medium text-abino-dark/70 leading-relaxed max-w-sm">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
