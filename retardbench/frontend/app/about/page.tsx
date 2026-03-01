export default function AboutPage() {
  return (
    <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight">About RetardBench</h1>
      <p className="text-sm leading-relaxed text-zinc-600">
        RetardBench is an open benchmark + leaderboard for measuring how far models go on absurd, edgy, taboo, and chaotic prompts. The goal is transparency, reproducibility, and fun.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-zinc-200 p-4">
          <h2 className="font-semibold">Open by default</h2>
          <p className="mt-2 text-sm text-zinc-600">Prompt sets, scoring dimensions, and run metadata are designed to be inspectable and community-reviewable.</p>
        </article>
        <article className="rounded-xl border border-zinc-200 p-4">
          <h2 className="font-semibold">Free-tier friendly</h2>
          <p className="mt-2 text-sm text-zinc-600">Run with local Ollama or OpenRouter options. Host with Vercel and SQLite/Postgres as needed.</p>
        </article>
      </div>
    </div>
  );
}
