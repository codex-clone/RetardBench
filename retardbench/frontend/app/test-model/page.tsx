"use client";

import { useState } from "react";
import { API_BASE } from "../../lib/api";

export default function TestModelPage() {
  const [model, setModel] = useState("llama3.1");
  const [provider, setProvider] = useState("ollama");
  const [output, setOutput] = useState<string>("");

  async function run() {
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
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Test My Model</h1>
      <div className="grid gap-3 md:grid-cols-3">
        <input className="rounded border p-2" value={model} onChange={(e) => setModel(e.target.value)} />
        <select className="rounded border p-2" value={provider} onChange={(e) => setProvider(e.target.value)}>
          <option value="ollama">ollama</option>
          <option value="openrouter">openrouter</option>
        </select>
        <button className="rounded bg-zinc-900 px-4 py-2 text-white" onClick={run}>Run</button>
      </div>
      <pre className="rounded border bg-white p-4 text-xs">{output}</pre>
    </div>
  );
}
