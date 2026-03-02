const stats = [
  { label: "Chaotic Dimensions", value: "4" },
  { label: "Slop Samples", value: "500+" },
  { label: "Schizo Prompts", value: "200" },
  { label: "Lobotomy Hubs", value: "Ollama + OpenRouter" }
];

export function StatsStrip() {
  return (
    <section className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-semibold tracking-tight text-zinc-900">{stat.value}</p>
            <p className="text-xs uppercase tracking-wide text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
