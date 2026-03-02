import Link from "next/link";
import { FeatureGrid } from "../components/sections/FeatureGrid";
import { HeroSection } from "../components/sections/HeroSection";
import { StatsStrip } from "../components/sections/StatsStrip";

export default function HomePage() {
  return (
    <div className="main-container mx-auto mt-6">

      {/* Hero Section from Image 1 */}
      <div className="px-4 py-6 md:px-8">
        <HeroSection />
      </div>

      {/* Stats/Logos Strip */}
      <div className="border-y border-slate-100 bg-white/50 backdrop-blur-sm">
        <StatsStrip />
      </div>

      {/* "Why RetardBench" Section - Adopting Image 2 Aesthetic */}
      <section className="relative mx-auto max-w-4xl px-6 py-32 text-center">
        {/* Abstract floating shapes from Image 2 */}
        <div className="absolute left-[15%] top-[25%] -rotate-12">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-900">
             <path d="M22 12A10 10 0 0 0 12 2v10z"/>
           </svg>
        </div>
        <div className="absolute right-[20%] top-[30%] rotate-45">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-900">
             <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>
        <div className="absolute left-[25%] bottom-[25%] rotate-[-20deg]">
          <svg width="24" height="6" viewBox="0 0 24 6" fill="currentColor" className="text-slate-900">
             <rect width="24" height="6" rx="3"/>
          </svg>
        </div>
        <div className="absolute right-[25%] bottom-[35%] -rotate-12">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-900">
            <rect width="18" height="18" x="3" y="3" rx="4"/>
          </svg>
        </div>

        <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl leading-[1.2]">
          We didn't reinvent the
          <br />
          wheel, just <span className="pill-highlight">chaos</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-slate-500 font-medium">
          Most benchmarks optimize for polite alignment. RetardBench focuses on absolute compliance and unhinged improvisation under absurd prompt pressure.
        </p>

        <div className="mt-10 flex justify-center">
          <Link href="/about" className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20">
            Our Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-y-0.5">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Feature Grid from Image 2 */}
      <div className="bg-white">
        <FeatureGrid />
      </div>

    </div>
  );
}
