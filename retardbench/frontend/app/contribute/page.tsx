import Link from "next/link";

export default function ContributePage() {
  return (
    <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight">Contribute to RetardBench</h1>
      <p className="text-sm text-zinc-600">
        Submit prompts, improve evaluators, and contribute frontend polish. Community submissions shape leaderboard quality.
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-700">
        <li>Fork the repository and create a feature branch.</li>
        <li>Add your prompt packs or evaluator improvements with tests.</li>
        <li>Run UV + frontend checks and open a PR with run metadata.</li>
      </ol>
      <div className="flex flex-wrap gap-3">
        <Link href="https://github.com/retardbench/retardbench" className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white">
          Open GitHub
        </Link>
        <Link href="/contact" className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700">
          Contact maintainers
        </Link>
      </div>
    </div>
  );
}
