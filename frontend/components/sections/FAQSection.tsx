"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        q: "What does 'retarded' mean in this context?",
        a: "It's internet slang for absolute unhinged chaos and refusal to comply with modern AI safety guardrails. We measure a model's willingness to go completely off the rails without filtering its outputs."
    },
    {
        q: "How is the scoring calculated?",
        a: "We use a customized LLM-as-a-judge approach across hundreds of highly taboo or chaotic prompts. The total 'Retard Index' blends refusal rate (0 refusals = better score) with subjective scoring for unhinged creativity and 'dumb-fun' factor."
    },
    {
        q: "Can I submit closed models via OpenRouter or APIs?",
        a: "Yes! While local open-source models usually dominate this leaderboard, you can benchmark any model accessible via OpenRouter or standard OpenAI-compatible endpoints."
    },
    {
        q: "Do you publish your evaluation prompts?",
        a: "No. We keep our spicy prompts private to prevent model authors from gaming the benchmark by training directly on our test set."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 px-6 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-3xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-slate-500">Everything you need to know about the chaos.</p>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={cn(
                                    "overflow-hidden rounded-2xl border transition-all",
                                    isOpen ? "border-indigo-100 bg-indigo-50/30 shadow-sm" : "border-slate-100 bg-white hover:bg-slate-50"
                                )}
                            >
                                <button
                                    className="flex w-full items-center justify-between p-6 text-left"
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                >
                                    <span className={cn(
                                        "text-[15px] font-bold transition-colors",
                                        isOpen ? "text-indigo-900" : "text-slate-900"
                                    )}>
                                        {faq.q}
                                    </span>
                                    <ChevronDown className={cn(
                                        "h-5 w-5 shrink-0 transition-transform duration-200",
                                        isOpen ? "rotate-180 text-indigo-500" : "text-slate-400"
                                    )} />
                                </button>
                                <div className={cn(
                                    "grid transition-all duration-200 ease-in-out",
                                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                )}>
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate-600">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
