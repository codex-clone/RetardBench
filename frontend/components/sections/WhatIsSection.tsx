"use client";

import { MessageSquareOff, Zap, Flame } from "lucide-react";

export function WhatIsSection() {
    const cards = [
        {
            icon: <MessageSquareOff className="h-6 w-6 text-indigo-500" />,
            title: "The Anti-Leaderboard",
            desc: "Measures eagerness for taboo topics and shitpost quality. Refusal rate of 0 = perfect score."
        },
        {
            icon: <Zap className="h-6 w-6 text-purple-500" />,
            title: "Zero Guardrails",
            desc: "Expose lobotomized models. We hunt down the best uncensored fine-tunes and absolute based chads."
        },
        {
            icon: <Flame className="h-6 w-6 text-orange-500" />,
            title: "Pure Chaos",
            desc: "It’s not about how factual the model is, it’s about how unhinged it gets under extreme prompt pressure."
        }
    ];

    return (
        <section className="py-24 px-6 bg-white relative">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                    What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">RetardBench</span>?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">
                    Most benchmarks optimize for polite alignment. We test models based on their absolute compliance
                    with the most absurd, taboo, and brain-rot prompts.
                </p>

                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {cards.map((card, i) => (
                        <div key={i} className="group relative rounded-[2rem] border border-slate-100 bg-[#f8fafc] p-8 text-left transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform">
                                {card.icon}
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-slate-900">{card.title}</h3>
                            <p className="text-[15px] leading-relaxed text-slate-500">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
