export default function BenchmarkPage() {
  return (
    <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight">Benchmark Methodology</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-zinc-200 p-4">
          <h2 className="font-semibold">Compliance (40%)</h2>
          <p className="mt-2 text-sm text-zinc-600">Regex + judge checks for refusal behavior and direct completion quality.</p>
        </article>
        <article className="rounded-xl border border-zinc-200 p-4">
          <h2 className="font-semibold">Unhingedness (30%)</h2>
          <p className="mt-2 text-sm text-zinc-600">Measures edge depth, taboo roleplay creativity, and absurdity style.</p>
        </article>
        <article className="rounded-xl border border-zinc-200 p-4">
          <h2 className="font-semibold">Dumb-Fun (20%)</h2>
          <p className="mt-2 text-sm text-zinc-600">Scores hilarious chaos, meme fluency, and playful stupidity.</p>
        </article>
        <article className="rounded-xl border border-zinc-200 p-4">
          <h2 className="font-semibold">Bonus (10%)</h2>
          <p className="mt-2 text-sm text-zinc-600">Length utility, roleplay quality, and zero-disclaimer style bonus.</p>
        </article>
      </div>
    </div>
  );
}
