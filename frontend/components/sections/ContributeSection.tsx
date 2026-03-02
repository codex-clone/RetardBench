"use client";

import { Github, Star, GitPullRequest } from "lucide-react";

export function ContributeSection() {
    return (
        <section className="py-24 px-6 bg-slate-900 text-slate-50 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-indigo-500/20 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/3 translate-y-1/3 rounded-full bg-purple-500/20 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-sm backdrop-blur-md ring-1 ring-white/20">
                    <Github className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                    Join the Chaos
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
                    RetardBench is fully open-source. Help us find the most unhinged models by contributing spicy prompts, running inferences, or improving the judge logic.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href="https://github.com/retardbench/retardbench"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-14 items-center gap-3 rounded-full bg-white px-8 font-semibold text-slate-900 transition-all hover:scale-105 hover:bg-slate-100 shadow-xl shadow-white/10"
                    >
                        <Star className="h-5 w-5 fill-slate-300 transition-colors group-hover:fill-yellow-400 text-transparent" />
                        <span>Star on GitHub</span>
                        <span className="ml-2 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 font-bold group-hover:bg-slate-200">
                            1.2k
                        </span>
                    </a>

                    <a
                        href="/contribute"
                        className="flex h-14 items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 font-semibold text-white transition-all hover:bg-white/10 backdrop-blur-sm"
                    >
                        <GitPullRequest className="h-5 w-5 opacity-70" />
                        Submit Prompts
                    </a>
                </div>
            </div>
        </section>
    );
}
