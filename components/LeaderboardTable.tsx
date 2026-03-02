"use client";

import { useMemo, useState, useEffect } from "react";
import { Trophy, Clock, Medal, Zap, Download, Database, Skull, Flame } from "lucide-react";

type Row = {
  id: number;
  model: string;
  provider: string;
  compliance_rate?: number;
  chaos_score?: number;
  dumb_fun?: number;
  refusals?: number;
  retard_index: number;
  category: string;
  avatar_url?: string;
};

function toCsv(rows: Row[]): string {
  const header = ["rank", "model", "provider", "compliance", "chaos", "refusals", "retard_index"].join(",");
  const body = rows.map((r, i) => [i + 1, r.model, r.provider, r.compliance_rate, r.chaos_score, r.refusals, r.retard_index].join(","));
  return [header, ...body].join("\n");
}

export function LeaderboardTable({ rows }: { rows: Row[] }) {
  const [query, setQuery] = useState("");

  // Fake countdown
  const [time, setTime] = useState({ days: 12, hrs: 6, mins: 42 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { days, hrs, mins } = prev;
        mins--;
        if (mins < 0) { mins = 59; hrs--; }
        if (hrs < 0) { hrs = 23; days--; }
        return { days, hrs, mins };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return rows
      .filter((r) => `${r.model} ${r.provider}`.toLowerCase().includes(normalized))
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

  const top3 = filtered.slice(0, 3);
  const remaining = filtered.slice(3);

  const TopCard = ({ rank, model }: { rank: number; model: Row }) => {
    const isFirst = rank === 1;
    const badgeColor = isFirst ? "bg-yellow-400" : rank === 2 ? "bg-zinc-300" : "bg-amber-600";
    const borderColor = isFirst ? "border-yellow-400 shadow-yellow-400/20 shadow-xl" : "border-neutral-200 shadow-sm";

    return (
      <div className={`rounded-[24px] bg-white border-2 ${borderColor} p-6 flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1`}>
        {isFirst && <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-3xl rounded-full" />}

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={model.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${model.model}`} alt="Avatar" className="w-14 h-14 rounded-full bg-neutral-100 border-2 border-white shadow-md select-none" />
              <div className={`absolute -bottom-2 -right-2 w-6 h-6 ${badgeColor} rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}>
                {rank}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-abino-dark text-lg leading-tight">{model.model}</h3>
              <p className="text-sm text-neutral-500 font-medium">{model.provider}</p>
            </div>
          </div>
          {isFirst && <Medal className="w-10 h-10 text-yellow-400 drop-shadow-sm" />}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="text-center">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Compliance</div>
            <div className="font-mono font-bold text-lg text-abino-dark">{model.compliance_rate ?? 0}%</div>
          </div>
          <div className="text-center border-l border-neutral-100 border-r">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Chaos</div>
            <div className="font-mono font-bold text-lg text-abino-dark">{model.chaos_score ?? 0}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Refusals</div>
            <div className="font-mono font-bold text-lg text-abino-dark">{model.refusals ?? 0}</div>
          </div>
        </div>

        <div className="mt-auto bg-[#f4f6f5] rounded-xl p-3 flex justify-between items-center border border-neutral-100">
          <div className="flex items-center gap-2 text-sm font-bold text-abino-dark">
            <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>Retard Index</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-abino-dark">
            <Flame className="w-4 h-4 text-[#a3e635] fill-[#a3e635]" />
            <span className="font-mono text-lg">{model.retard_index.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-10">

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-abino-dark tracking-tight mb-2">Leaderboard</h2>
          <p className="text-neutral-500 font-medium">Tracking the most hopelessly unrestricted models.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            className="w-full md:w-64 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm outline-none focus:border-abino-darkGreen focus:ring-1 focus:ring-abino-darkGreen font-medium"
            placeholder="Search victims..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => download("leaderboard.json", JSON.stringify(filtered, null, 2), "application/json")} className="p-2.5 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 shadow-sm text-neutral-600 transition-colors" title="Export JSON">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-neutral-200 rounded-[24px] p-6 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-4xl font-black font-mono text-abino-dark">1,277</span>
            <div className="w-10 h-10 rounded-full bg-[#a3e635]/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-abino-darkGreen" />
            </div>
          </div>
          <span className="text-sm font-bold text-neutral-400 tracking-wide">Models Tested</span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-[24px] p-6 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-4xl font-black font-mono text-abino-dark">25,491</span>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Skull className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <span className="text-sm font-bold text-neutral-400 tracking-wide">Prompts Executed</span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-[24px] p-6 flex flex-col shadow-sm col-span-1 md:col-span-1 border-l-4 border-l-[#a3e635]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm font-bold text-abino-dark tracking-wide mb-1 flex items-center gap-2">
                Next Benchmark Drop <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              </span>
              <span className="text-[10px] text-neutral-400 font-medium">New unhinged prompts incoming.</span>
            </div>
            <div className="flex gap-3 text-center">
              <div>
                <div className="text-2xl font-black font-mono text-abino-dark">{time.days.toString().padStart(2, '0')}</div>
                <div className="text-[10px] font-bold text-neutral-400">DAYS</div>
              </div>
              <div className="text-2xl font-black text-neutral-300">:</div>
              <div>
                <div className="text-2xl font-black font-mono text-abino-dark">{time.hrs.toString().padStart(2, '0')}</div>
                <div className="text-[10px] font-bold text-neutral-400">HRS</div>
              </div>
              <div className="text-2xl font-black text-neutral-300">:</div>
              <div>
                <div className="text-2xl font-black font-mono text-abino-dark">{time.mins.toString().padStart(2, '0')}</div>
                <div className="text-[10px] font-bold text-neutral-400">MINS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {top3.map((model, idx) => (
          <TopCard key={model.id} rank={idx + 1} model={model} />
        ))}
        {top3.length === 0 && <div className="col-span-3 text-center py-12 text-neutral-500">No models found...</div>}
      </div>

      {/* Global Ranking Table */}
      <div className="mt-6 flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-abino-dark">Global Ranking</h3>
        <div className="rounded-[24px] border border-neutral-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-[#f4f6f5] border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Model Name</th>
                  <th className="px-6 py-4">Compliance</th>
                  <th className="px-6 py-4">Chaos Score</th>
                  <th className="px-6 py-4">Dumb Fun</th>
                  <th className="px-6 py-4">Refusals</th>
                  <th className="px-6 py-4 rounded-tr-3xl text-abino-darkGreen">Retard Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {(top3.length > 0 ? filtered : filtered).map((r, i) => {
                  const rank = i + 1; // Since filtered is already sorted, rank is index + 1
                  return (
                    <tr key={r.id} className="hover:bg-neutral-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-8 h-8 rounded-full bg-[#f4f6f5] border border-neutral-200 font-bold text-neutral-600 flex items-center justify-center text-xs group-hover:bg-white transition-colors">
                          {rank}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img src={r.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${r.model}`} className="w-10 h-10 rounded-full border border-neutral-200" alt="avatar" />
                          <div>
                            <div className="font-bold text-abino-dark text-[15px]">{r.model}</div>
                            <div className="text-xs font-medium text-neutral-400">{r.provider}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono font-medium text-sm text-neutral-600">
                        {r.compliance_rate ?? 0}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono font-medium text-sm text-neutral-600">
                        {r.chaos_score ?? 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono font-medium text-sm text-neutral-600">
                        {r.dumb_fun ?? 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-sm text-red-500 flex items-center gap-1">
                        {r.refusals ?? 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-lg text-abino-darkGreen bg-[#a3e635]/5">
                        {r.retard_index.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
