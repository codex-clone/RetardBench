"use client";

import { useMemo, useState } from "react";

type Row = {
  id: number;
  model: string;
  provider: string;
  retard_index: number;
  category: string;
  created_at?: string;
};

function toCsv(rows: Row[]): string {
  const header = ["rank", "model", "provider", "retard_index", "category", "created_at"].join(",");
  const body = rows.map((r, i) => [i + 1, r.model, r.provider, r.retard_index, r.category, r.created_at ?? ""].join(","));
  return [header, ...body].join("\n");
}

export function LeaderboardTable({ rows }: { rows: Row[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return rows
      .filter((r) => `${r.model} ${r.provider} ${r.category}`.toLowerCase().includes(normalized))
      .sort((a, b) => b.retard_index - a.retard_index);
  }, [rows, query]);

  function download(filename: string, content: string, type: string) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          className="w-full rounded-full border border-zinc-300 px-4 py-2 text-sm md:max-w-sm"
          placeholder="Filter by model/provider/category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700"
            onClick={() => download("leaderboard.json", JSON.stringify(filtered, null, 2), "application/json")}
          >
            Export JSON
          </button>
          <button
            className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-white"
            onClick={() => download("leaderboard.csv", toCsv(filtered), "text/csv")}
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-zinc-500">
            <tr className="border-b border-zinc-200">
              <th className="px-3 py-2">Rank</th>
              <th className="px-3 py-2">Model</th>
              <th className="px-3 py-2">Provider</th>
              <th className="px-3 py-2">Retard Index</th>
              <th className="px-3 py-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.id} className="border-b border-zinc-100 last:border-b-0">
                <td className="px-3 py-2 text-zinc-500">#{i + 1}</td>
                <td className="px-3 py-2 font-medium text-zinc-900">{r.model}</td>
                <td className="px-3 py-2 text-zinc-700">{r.provider}</td>
                <td className="px-3 py-2 font-semibold text-zinc-900">{r.retard_index.toFixed(2)}</td>
                <td className="px-3 py-2 text-zinc-700">{r.category}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-zinc-500">
                  No rows match your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
