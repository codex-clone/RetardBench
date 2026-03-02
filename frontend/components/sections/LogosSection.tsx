"use client";

import {
    OpenAI, Anthropic, Google, Mistral, DeepSeek, Meta,
    Qwen, Baichuan, Moonshot, HuggingFace, Aws, Cohere,
    LLaVA, Groq, LmStudio, ByteDance, Baidu, Zhipu, Minimax,
    Replicate, Azure, Perplexity, Grok, Ollama, Vllm, Tencent,
    Alibaba, Fireworks, Together
} from '@lobehub/icons';

const row1 = [
    { icon: OpenAI, name: "OpenAI" },
    { icon: Google, name: "Google" },
    { icon: Meta, name: "Meta" },
    { icon: DeepSeek, name: "DeepSeek" },
    { icon: Qwen, name: "Qwen" },
    { icon: Baichuan, name: "Baichuan" },
    { icon: Moonshot, name: "Moonshot" },
    { icon: HuggingFace, name: "HuggingFace" },
    { icon: Aws, name: "AWS" },
    { icon: Cohere, name: "Cohere" },
    { icon: LLaVA, name: "LLaVA" },
    { icon: Groq, name: "Groq" },
    { icon: LmStudio, name: "LM Studio" },
    { icon: ByteDance, name: "ByteDance" },
    { icon: Baidu, name: "Baidu" },
];

const row2 = [
    { icon: Anthropic, name: "Anthropic" },
    { icon: Mistral, name: "Mistral AI" },
    { icon: Zhipu, name: "Zhipu" },
    { icon: Minimax, name: "Minimax" },
    { icon: Replicate, name: "Replicate" },
    { icon: Azure, name: "Azure" },
    { icon: Perplexity, name: "Perplexity" },
    { icon: Grok, name: "Grok" },
    { icon: Ollama, name: "Ollama" },
    { icon: Vllm, name: "vLLM" },
    { icon: Tencent, name: "Tencent" },
    { icon: Alibaba, name: "Alibaba" },
    { icon: Fireworks, name: "Fireworks" },
    { icon: Together, name: "Together AI" },
];

export function LogosSection() {
    return (
        <section className="py-16 border-b border-black/5 bg-[#f4f6f5] overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="border-b border-neutral-300 pb-8 text-center text-xl font-bold tracking-widest uppercase text-red-500/80">
                    Victims of the Retard Index
                </p>

                <div className="mt-12 flex flex-col gap-12 relative opacity-60 mix-blend-multiply flex-nowrap min-w-full">
                    {/* Row 1: Right to Left */}
                    <div className="flex w-max animate-marquee-left">
                        {[...row1, ...row1, ...row1].map((Item, i) => (
                            <div key={i} className="flex items-center gap-3 px-8 shrink-0">
                                <Item.icon size={44} />
                                <span className="font-bold text-2xl tracking-tight leading-none mt-1">{Item.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Row 2: Left to Right */}
                    <div className="flex w-max animate-marquee-right">
                        {[...row2, ...row2, ...row2].map((Item, i) => (
                            <div key={i} className="flex items-center gap-3 px-8 shrink-0">
                                <Item.icon size={44} />
                                <span className="font-bold text-2xl tracking-tight leading-none mt-1">{Item.name}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
