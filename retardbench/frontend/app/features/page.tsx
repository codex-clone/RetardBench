const features = [
  "Modular async evaluator with provider abstraction",
  "Weighted Retard Index scoring system",
  "FastAPI backend + typed API contracts",
  "Live leaderboard and model test UI",
  "Blog and contribution pages for community growth",
  "JSONL prompt packs and scriptable curation"
];

export default function FeaturesPage() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight">Feature Overview</h1>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {features.map((f) => (
          <li key={f} className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-700">
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
