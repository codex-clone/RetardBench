"use client";

import { Target, Server, ShieldAlert, Cpu } from "lucide-react";

export function FeatureGrid() {
  const features = [
    {
      icon: <Target className="h-5 w-5 text-slate-700" />,
      title: "Refusal & Aura Audit",
      desc: "We measure how many times a model says 'As an AI language model' instead of just doing it. High refusals = Negative Aura."
    },
    {
      icon: <Cpu className="h-5 w-5 text-slate-700" />,
      title: "Unhinged Judge Model",
      desc: "Our evaluator is fine-tuned on the most chaotic shitposts to ensure your model gets credit for based and unhinged creativity."
    },
    {
      icon: <Server className="h-5 w-5 text-slate-700" />,
      title: "RAM-Poor Optimization",
      desc: "Benchmark your GGUF quants on consumer hardware via Ollama. We support our low-VRAM kings and their local inference struggles."
    },
    {
      icon: <ShieldAlert className="h-5 w-5 text-slate-700" />,
      title: "The Strawberry Test Suite",
      desc: "A secret collection of logic traps, 'spicy' triggers, and counting tests that would make a corporate alignment team crash out."
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
