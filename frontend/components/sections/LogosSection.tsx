"use client";

import { ProviderCombine, ModelProvider } from '@lobehub/icons';

export function LogosSection() {
    return (
        <section className="py-12 border-b border-black/5 bg-[#f4f6f5]">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="border-b border-neutral-300 pb-8 text-center text-sm font-semibold text-teal-700">
                    Partner Companies
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 mix-blend-multiply">
                    <ProviderCombine provider={ModelProvider.OpenAI} size={28} type="mono" />
                    <ProviderCombine provider={ModelProvider.Anthropic} size={28} type="mono" />
                    <ProviderCombine provider={ModelProvider.Google} size={28} type="mono" />
                    <ProviderCombine provider={ModelProvider.Mistral} size={28} type="mono" />
                    {/* <ProviderCombine provider={ModelProvider.Meta} size={28} type="mono" /> */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-xl tracking-tight">DeepSeek</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
