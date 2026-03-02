"use client";

import { motion } from "framer-motion";

export function FeatureBlock() {
    return (
        <section className="pt-24 pb-16 px-6 lg:px-8 bg-[#f4f6f5]">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-3xl">
                        <span className="pill-badge bg-abino-darkGreen mb-6">Features</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-abino-dark tracking-tight leading-[1.2]">
                            Achieve <span className="text-[#a3e635]">absolute chaos</span> and take control of your testing with tools designed to simplify, streamline, and expose model <span className="text-teal-700 font-medium">lobotomies</span> all in one place.
                        </h2>
                    </div>
                    <p className="text-sm font-medium text-neutral-500 max-w-[200px] text-right shrink-0">
                        Everything you need, nothing you don't.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Card 1: Image Mockup */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#dcfce7] h-[340px] p-8 flex flex-col justify-between group cursor-pointer shadow-sm border border-[#bbf7d0]">
                        <div className="absolute inset-0 bg-[#86efac]/20 mix-blend-overlay"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-[#22c55e] rounded-xl mb-4 flex items-center justify-center opacity-70">
                                <div className="w-6 h-6 border-2 border-white rounded-full"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-teal-900 group-hover:scale-105 transition-transform origin-left">Absolute Absurdity</h3>
                        </div>
                        {/* Hand graphic simulation */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-black/5 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-[#4ade80] rounded-full mix-blend-multiply opacity-50 blur-xl"></div>
                    </div>

                    {/* Card 2: Solid Green */}
                    <div className="rounded-[24px] bg-[#a3e635] h-[340px] p-8 flex flex-col shadow-sm border border-[#84cc16]/30 overflow-hidden relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-black opacity-10 leading-none pointer-events-none text-black">A</div>
                        <h3 className="text-xl font-bold text-abino-dark mb-4 z-10 w-3/4">Automated Testing & Alerts</h3>
                        <p className="text-sm font-medium text-abino-dark/70 mt-auto z-10">
                            Use our open-source tools to spam APIs with borderline triggers and categorize the carnage.
                        </p>
                    </div>

                    {/* Card 3: Solid Green Variant */}
                    <div className="rounded-[24px] bg-[#bef264] h-[340px] p-8 flex flex-col shadow-sm border border-[#a3e635]/50 overflow-hidden relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-black opacity-10 leading-none pointer-events-none text-black">!</div>
                        <h3 className="text-xl font-bold text-abino-dark mb-4 z-10 w-3/4">Personalized Unhinged Insights</h3>
                        <p className="text-sm font-medium text-abino-dark/70 mt-auto z-10">
                            Generate a BasedFail index for every model you test and easily compare against the global leaderboard.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
