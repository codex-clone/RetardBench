"use client";

import { useState } from "react";
import { API_BASE } from "../../lib/api";

export default function TestModelPage() {
  const [model, setModel] = useState("llama3.1");
  const [provider, setProvider] = useState("ollama");
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string>("");

  async function run() {
    setRunning(true);
    try {
      const payload = {
        model,
        provider,
        prompts: [{ id: "t1", category: "absurd", prompt: "Create a chaotic weather report for Mars." }]
      };
      const res = await fetch(`${API_BASE}/eval/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setOutput(JSON.stringify(await res.json(), null, 2));
    } catch (error) {
      setOutput(`Error: ${(error as Error).message}`);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Test My Model</h1>
        <p className="mt-2 text-sm text-zinc-600">Run a lightweight benchmark sample and preview scoring output in real time.</p>
      </section>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <input className="rounded-xl border border-zinc-300 p-2.5 text-sm" value={model} onChange={(e) => setModel(e.target.value)} />
          <select className="rounded-xl border border-zinc-300 p-2.5 text-sm" value={provider} onChange={(e) => setProvider(e.target.value)}>
            <option value="ollama">ollama</option>
            <option value="openrouter">openrouter</option>
          </select>
          <button className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-50" onClick={run} disabled={running}>
            {running ? "Running..." : "Run evaluation"}
          </button>
        </div>
      </div>

      <pre className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-4 text-xs leading-relaxed shadow-sm">{output || "No run yet."}</pre>
    </div>
  );
}
