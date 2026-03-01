import { LeaderboardTable } from "../../components/LeaderboardTable";
import { getLeaderboard } from "../../lib/api";

export default async function LeaderboardPage() {
  const rows = await getLeaderboard().catch(() => []);
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Leaderboard</h1>
      <LeaderboardTable rows={rows} />
    </div>
  );
}
