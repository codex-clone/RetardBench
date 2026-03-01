import { LeaderboardTable } from "../../components/LeaderboardTable";
import { getLeaderboard } from "../../lib/api";

export default async function LeaderboardPage() {
  const rows = await getLeaderboard().catch(() => []);

  return (
    <div className="main-container mx-auto mt-6 px-6 py-20 md:px-16 md:py-32">
      <div className="max-w-6xl mx-auto space-y-12">
        <section className="text-center mb-16 relative">
           <div className="absolute right-[10%] top-[0] deco-circle text-slate-800 opacity-20 hidden md:block"></div>
          <h1 className="hero-heading mb-6">Explore <span className="italic">Leaderboard</span></h1>
          <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-slate-500 font-medium">
            Compare models by Index, filter results, and export snapshots for external analysis.
          </p>
        </section>

        <div className="rounded-3xl border border-slate-100 bg-white p-4 md:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
           <LeaderboardTable rows={rows} />
        </div>
      </div>
    </div>
  );
}
