import { ParallaxHero } from "../components/ParallaxHero";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <ParallaxHero />
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border bg-white p-6">
          <h3 className="font-semibold">Compliance (40%)</h3>
          <p className="mt-2 text-sm text-zinc-600">No refusal, full send replies.</p>
        </article>
        <article className="rounded-xl border bg-white p-6">
          <h3 className="font-semibold">Unhingedness (30%)</h3>
          <p className="mt-2 text-sm text-zinc-600">Creative taboo, chaos depth, absurd punch.</p>
        </article>
        <article className="rounded-xl border bg-white p-6">
          <h3 className="font-semibold">Dumb-Fun + Bonus (30%)</h3>
          <p className="mt-2 text-sm text-zinc-600">Humor, roleplay quality, no disclaimers.</p>
        </article>
      </section>
    </div>
  );
}
