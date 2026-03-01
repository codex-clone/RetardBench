import Link from "next/link";

export default function ContributePage() {
  return (
    <div className="main-container mx-auto mt-6 px-6 py-20 md:px-16 md:py-32">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center mb-16 relative">
          <div className="absolute right-[10%] top-[0] deco-circle text-slate-800 opacity-20 hidden md:block"></div>

          <h1 className="hero-heading mb-6">Contribute to <span className="italic">RetardBench</span></h1>
          <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-slate-500 font-medium">
            Submit prompts, improve evaluators, and contribute frontend polish. Community submissions shape leaderboard quality.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-10 border border-slate-100 max-w-2xl mx-auto shadow-sm">
           <ol className="list-decimal list-outside ml-6 space-y-4 text-[16px] text-slate-700 font-medium leading-relaxed marker:text-indigo-500 marker:font-bold">
             <li><span className="text-slate-900">Fork the repository</span> and create a feature branch.</li>
             <li><span className="text-slate-900">Add your prompt packs</span> or evaluator improvements with tests.</li>
             <li><span className="text-slate-900">Run UV + frontend checks</span> and open a PR with run metadata.</li>
           </ol>

           <div className="mt-12 flex flex-wrap gap-4 justify-center">
             <Link href="https://github.com/retardbench/retardbench" className="btn-primary">
               Open GitHub
             </Link>
             <Link href="/contact" className="btn-secondary">
               Contact Maintainers
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
