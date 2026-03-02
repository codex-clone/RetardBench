export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

/* ─── Leaderboard ────────────────────────────────────────────── */

export async function getLeaderboard(filters?: {
  provider?: string;
  category?: string;
  limit?: number;
  offset?: number;
}) {
  const params = new URLSearchParams();
  if (filters?.provider) params.set("provider", filters.provider);
  if (filters?.category) params.set("category", filters.category);
  if (filters?.limit) params.set("limit", String(filters.limit));
  if (filters?.offset) params.set("offset", String(filters.offset));

  const qs = params.toString();
  const res = await fetch(`${API_BASE}/leaderboard/${qs ? `?${qs}` : ""}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
}

export async function getLeaderboardStats() {
  const res = await fetch(`${API_BASE}/leaderboard/stats`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function exportLeaderboardCSV(): Promise<string> {
  const res = await fetch(`${API_BASE}/leaderboard/export/csv`);
  if (!res.ok) throw new Error("CSV export failed");
  return res.text();
}

export async function exportLeaderboardJSON() {
  const res = await fetch(`${API_BASE}/leaderboard/export/json`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("JSON export failed");
  return res.json();
}

/* ─── Evaluation ─────────────────────────────────────────────── */

export async function runEvaluation(
  model: string,
  provider: string,
  prompts: { id: string; category: string; prompt: string }[]
) {
  const res = await fetch(`${API_BASE}/eval/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, provider, prompts }),
  });
  if (!res.ok) throw new Error("Evaluation failed");
  return res.json();
}

export async function startAsyncEval(
  model: string,
  provider: string,
  numPrompts: number = 10,
  useLlmJudge: boolean = false
) {
  const res = await fetch(`${API_BASE}/eval/async`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      provider,
      num_prompts: numPrompts,
      use_llm_judge: useLlmJudge,
    }),
  });
  if (!res.ok) throw new Error("Failed to start evaluation");
  return res.json();
}

export async function getEvalStatus(evaluationId: string) {
  const res = await fetch(`${API_BASE}/eval/${evaluationId}`);
  if (!res.ok) throw new Error("Failed to get evaluation status");
  return res.json();
}

export async function getEvalHistory(limit: number = 50) {
  const res = await fetch(`${API_BASE}/eval/history?limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch evaluation history");
  return res.json();
}

/* ─── Submit ─────────────────────────────────────────────────── */

export async function submitResult(
  model: string,
  provider: string,
  retardIndex: number,
  category: string = "overall"
) {
  const res = await fetch(`${API_BASE}/submit/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      provider,
      retard_index: retardIndex,
      category,
    }),
  });
  if (!res.ok) throw new Error("Submission failed");
  return res.json();
}

/* ─── Health ─────────────────────────────────────────────────── */

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}
