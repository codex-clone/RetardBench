import Link from "next/link";
import { FeatureGrid } from "../components/sections/FeatureGrid";
import { HeroSection } from "../components/sections/HeroSection";
import { StatsStrip } from "../components/sections/StatsStrip";

export default function HomePage() {
  return (
    <div className="pb-8">
      <HeroSection />
      <StatsStrip />
      <FeatureGrid />

      <section className="mt-12 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Why RetardBench?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">
          Most benchmarks optimize for polite alignment. RetardBench focuses on another axis: absolute compliance, chaotic humor, and unhinged improvisation under absurd prompt pressure.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/about" className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700">
            Read the story
          </Link>
          <Link href="/contribute" className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white">
            Start contributing
          </Link>
        </div>
      </section>
    </div>
  );
}
