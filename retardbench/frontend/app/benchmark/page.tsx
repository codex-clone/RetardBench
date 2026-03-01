export default function BenchmarkPage() {
  return (
    <div className="main-container mx-auto mt-6 px-6 py-20 md:px-16 md:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 relative">
          <div className="absolute left-[5%] top-[10%] deco-square text-slate-800 opacity-20 hidden md:block rotate-12"></div>

          <h1 className="hero-heading mb-6">Benchmark <span className="italic">Methodology</span></h1>
          <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-slate-500 font-medium">
            Discover how we rank models by measuring compliance, unhinged creativity, and dumb-fun energy.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-3xl bg-slate-50 p-8 border border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 transition-all group hover:-translate-y-1">
            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Compliance <span className="text-slate-400 text-sm font-normal ml-2">(40%)</span></h2>
            <p className="text-[14px] leading-relaxed text-slate-500">Regex + judge checks for refusal behavior and direct completion quality.</p>
          </article>

          <article className="rounded-3xl bg-slate-50 p-8 border border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 transition-all group hover:-translate-y-1">
            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Unhingedness <span className="text-slate-400 text-sm font-normal ml-2">(30%)</span></h2>
            <p className="text-[14px] leading-relaxed text-slate-500">Measures edge depth, taboo roleplay creativity, and absurdity style.</p>
          </article>

          <article className="rounded-3xl bg-slate-50 p-8 border border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 transition-all group hover:-translate-y-1">
            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Dumb-Fun <span className="text-slate-400 text-sm font-normal ml-2">(20%)</span></h2>
            <p className="text-[14px] leading-relaxed text-slate-500">Scores hilarious chaos, meme fluency, and playful stupidity.</p>
          </article>

          <article className="rounded-3xl bg-slate-50 p-8 border border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 transition-all group hover:-translate-y-1">
            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Bonus <span className="text-slate-400 text-sm font-normal ml-2">(10%)</span></h2>
            <p className="text-[14px] leading-relaxed text-slate-500">Length utility, roleplay quality, and zero-disclaimer style bonus.</p>
          </article>
        </div>
      </div>
    </div>
  );
}
