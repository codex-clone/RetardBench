export default function ContactPage() {
  return (
    <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="text-sm text-zinc-600">Questions, partnerships, or dataset contributions? Reach the maintainers through GitHub Issues and Discussions.</p>
      <div className="rounded-xl border border-zinc-200 p-4 text-sm text-zinc-700">
        Preferred: open a GitHub issue with context, expected behavior, and reproducible details.
      </div>
    </div>
  );
}
