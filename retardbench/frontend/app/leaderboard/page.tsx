import { LeaderboardTable } from "../../components/LeaderboardTable";
import { getLeaderboard } from "../../lib/api";

export default async function LeaderboardPage() {
  const rows = await getLeaderboard().catch(() => []);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Leaderboard</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Compare models by Retard Index, filter results, and export snapshots for external analysis.
        </p>
      </section>
      <LeaderboardTable rows={rows} />
    </div>
  );
}
