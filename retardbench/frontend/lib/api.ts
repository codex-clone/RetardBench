export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export async function getLeaderboard() {
  const res = await fetch(`${API_BASE}/leaderboard/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
}
