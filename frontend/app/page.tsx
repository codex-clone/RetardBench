import { ReactLenis } from "@/lib/lenis";
import { HeroSection } from "../components/sections/HeroSection";
import { LogosSection } from "../components/sections/LogosSection";
import { FeatureBlock } from "../components/sections/FeatureBlock";
import { StepsSection } from "../components/sections/StepsSection";

export default function HomePage() {
  return (
    <ReactLenis root>
      <main className="flex min-h-screen flex-col bg-[#f4f6f5]">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Partner Logos using Lobe Icons */}
        <LogosSection />

        {/* 3. Explainer 3-Card Grid */}
        <FeatureBlock />

        {/* 4. Large Green Block with Dark Mock Card */}
        <StepsSection />

      </main>
    </ReactLenis>
  );
}
