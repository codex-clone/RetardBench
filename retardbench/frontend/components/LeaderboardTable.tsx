import type { FC } from "react";

type Row = {
  id: number;
  model: string;
  provider: string;
  retard_index: number;
  category: string;
};

export const LeaderboardTable: FC<{ rows: Row[] }> = ({ rows }) => {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-700">
          <tr>
            <th className="px-4 py-3">Model</th>
            <th className="px-4 py-3">Provider</th>
            <th className="px-4 py-3">Index</th>
            <th className="px-4 py-3">Category</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="px-4 py-3 font-medium">{r.model}</td>
              <td className="px-4 py-3">{r.provider}</td>
              <td className="px-4 py-3">{r.retard_index.toFixed(2)}</td>
              <td className="px-4 py-3">{r.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
