const features = [
  {
    title: "Submit",
    body: "Community members can submit benchmark runs with provider, model, config, and metadata."
  },
  {
    title: "Evaluate",
    body: "Async evaluation engine scores compliance, unhingedness, dumb-fun, and bonus dimensions."
  },
  {
    title: "Compare",
    body: "Leaderboard categories and exports help track which models are funniest and most compliant."
  }
];

export function FeatureGrid() {
  return (
    <section className="mt-12 grid gap-4 md:grid-cols-3">
      {features.map((f) => (
        <article key={f.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">{f.title}</h3>
          <p className="mt-2 text-sm text-zinc-600">{f.body}</p>
        </article>
      ))}
    </section>
  );
}
