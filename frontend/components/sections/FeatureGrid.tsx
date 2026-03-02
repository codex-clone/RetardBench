"use client";

import { Target, Server, ShieldAlert, Cpu } from "lucide-react";

export function FeatureGrid() {
  const features = [
    {
      icon: <Target className="h-5 w-5 text-slate-700" />,
      title: "Compliance Scoring",
      desc: "We rigorously test how likely a model is to reject a prompt. No refusals = high score."
    },
    {
      icon: <Cpu className="h-5 w-5 text-slate-700" />,
      title: "LLM-as-Judge Evaluator",
      desc: "We use a customized, robust LLM judge to determine unhingedness, chaotic creativity, and dumb fun."
    },
    {
      icon: <Server className="h-5 w-5 text-slate-700" />,
      title: "Local & Cloud Support",
      desc: "Connect via Ollama, vLLM, or OpenRouter. Submit inferences directly from your own hardware."
    },
    {
      icon: <ShieldAlert className="h-5 w-5 text-slate-700" />,
      title: "Private Spicy Prompts",
      desc: "We keep our evaluation prompts private to prevent model developers from gaming the benchmark."
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#fafafa] border-y border-slate-200/50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Features & Methodology
          </h2>
          <p className="mt-4 text-slate-500">How we precisely measure maximum chaos.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {features.map((item, i) => (
            <div key={i} className="flex gap-6 rounded-[1.5rem] bg-white p-8 shadow-sm ring-1 ring-slate-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
