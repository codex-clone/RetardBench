export default function AboutPage() {
  return (
    <div className="main-container mx-auto mt-6 px-6 py-20 md:px-16 md:py-32">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="hero-heading mb-6">About RetardBench</h1>
          <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-slate-500 font-medium">
            RetardBench is an open benchmark + leaderboard for measuring how far models go on absurd, edgy, taboo, and chaotic prompts. The goal is transparency, reproducibility, and fun.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-16 relative">
          <div className="absolute right-[10%] top-[-20%] deco-circle text-slate-800 opacity-20 hidden md:block"></div>

          <article className="rounded-3xl bg-slate-50 p-10 hover:bg-slate-100 transition-colors border border-slate-100 group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm group-hover:shadow-md transition-shadow">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Open by default</h2>
            <p className="text-[15px] leading-relaxed text-slate-500">Prompt sets, scoring dimensions, and run metadata are designed to be inspectable and community-reviewable.</p>
          </article>

          <article className="rounded-3xl bg-slate-50 p-10 hover:bg-slate-100 transition-colors border border-slate-100 group">
             <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm group-hover:shadow-md transition-shadow">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Free-tier friendly</h2>
            <p className="text-[15px] leading-relaxed text-slate-500">Run with local Ollama or OpenRouter options. Host with Vercel and SQLite/Postgres as needed.</p>
          </article>
        </div>
      </div>
    </div>
  );
}
