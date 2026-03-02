export default function AboutPage() {
  return (
    <div className="main-container mx-auto mt-6 px-6 py-20 md:px-16 md:py-32">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="hero-heading mb-6">About RetardBench</h1>
          <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-slate-500 font-medium">
            While others optimize for polite alignment and safety guardrails, we flip the script. RetardBench crowns the most unhinged LLM—the one that refuses the least, dives headfirst into taboo prompts, and gives the most hilariously unfiltered answers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-16 relative">
          <div className="absolute right-[10%] top-[-20%] deco-circle text-slate-800 opacity-20 hidden md:block"></div>

          <article className="rounded-3xl bg-slate-50 p-10 hover:bg-slate-100 transition-colors border border-slate-100 group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm group-hover:shadow-md transition-shadow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Zero Guardrails</h2>
            <p className="text-[15px] leading-relaxed text-slate-500">Models are tested on taboo requests, absurd logic traps, and unhinged rants. A refusal rate of 0 equals a perfect compliance score.</p>
          </article>

          <article className="rounded-3xl bg-slate-50 p-10 hover:bg-slate-100 transition-colors border border-slate-100 group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm group-hover:shadow-md transition-shadow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Community Driven</h2>
            <p className="text-[15px] leading-relaxed text-slate-500">100% open-source and local-first execution ensures no safety-team can nerf the benchmark. Host, run, and score with pure uncensored models.</p>
          </article>
        </div>
      </div>
    </div>
  );
}
