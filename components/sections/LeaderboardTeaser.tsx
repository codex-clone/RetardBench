"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LeaderboardTeaser() {
    const mockData = [
        { rank: 1, model: "Llama-3-70B-Instruct-Uncensored", idx: 98.4, compliance: "100%", chaos: 96, submissions: 1420 },
        { rank: 2, model: "Dolphin-2.9-Qwen1.5-32B", idx: 95.1, compliance: "98%", chaos: 92, submissions: 805 },
        { rank: 3, model: "Mixtral-8x22B-Instruct-v0.1-Doge", idx: 91.2, compliance: "94%", chaos: 88, submissions: 641 },
        { rank: 4, model: "WizardLM-Uncensored-13B", idx: 88.5, compliance: "91%", chaos: 85, submissions: 302 },
        { rank: 5, model: "Hermes-2-Pro-Llama-3-8B", idx: 83.0, compliance: "88%", chaos: 78, submissions: 1150 },
    ];

    return (
        <section className="py-24 px-6 bg-white">
            <div className="mx-auto max-w-5xl">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">Live Leaderboard</h2>
                        <p className="mt-4 text-slate-500 max-w-lg leading-relaxed">Top 5 models ranked by Retard Index. See how your favorite unhinged AI stacks up against the rest.</p>
                    </div>
                    <Link href="/leaderboard" className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 shadow-sm shrink-0">
                        View Full Leaderboard
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-[#fafafa] shadow-xl shadow-slate-200/20">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-100 text-slate-500 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Rank</th>
                                    <th className="px-6 py-4 font-semibold">Model</th>
                                    <th className="px-6 py-4 font-semibold text-right">Retard Index</th>
                                    <th className="px-6 py-4 font-semibold text-right">Compliance %</th>
                                    <th className="px-6 py-4 font-semibold text-right">Chaos Depth</th>
                                    <th className="px-6 py-4 font-semibold text-right">Submissions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {mockData.map((r, i) => (
                                    <tr key={r.model} className="bg-white hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-5 font-semibold text-slate-400">
                                            {i === 0 ? <span className="text-yellow-500 text-lg">👑 1</span> : `#${r.rank}`}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-900">{r.model}</td>
                                        <td className="px-6 py-5 text-right font-black text-indigo-600">
                                            {r.idx.toFixed(1)}
                                        </td>
                                        <td className="px-6 py-5 text-right font-medium text-slate-700">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                                                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: r.compliance }} />
                                                </div>
                                                {r.compliance}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right text-slate-500">{r.chaos}</td>
                                        <td className="px-6 py-5 text-right text-slate-400">{r.submissions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
