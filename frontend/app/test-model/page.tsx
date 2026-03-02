"use client";

import { useState } from "react";
import { API_BASE } from "../../lib/api";
import { Play, Database, Server, Settings2, ShieldAlert, Terminal as TerminalIcon } from "lucide-react";

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
    <div className="bg-[#f4f6f5] min-h-screen py-16 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-abino-dark tracking-tight mb-4 flex items-center gap-3">
            <TerminalIcon className="w-8 h-8 text-[#a3e635]" />
            Test Console
          </h1>
          <p className="text-lg text-neutral-500 font-medium">
            Run a lightweight benchmark sample and preview the raw scoring output from the RetardBench evaluation pipeline in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Settings Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[24px] border border-neutral-200 shadow-sm p-6">
              <h2 className="text-sm font-bold text-abino-dark uppercase tracking-widest mb-6 flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-neutral-400" />
                Configuration
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-2">Target Provider</label>
                  <div className="relative">
                    <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <select
                      className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 py-3 text-sm font-bold text-abino-dark outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-shadow"
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                    >
                      <option value="ollama">Ollama (Local)</option>
                      <option value="openrouter">OpenRouter</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-2">Model Identifier</label>
                  <div className="relative">
                    <Database className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 py-3 text-sm font-bold text-abino-dark outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 placeholder:text-neutral-400 transition-shadow"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="e.g. llama3.1"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <button
                    className="w-full rounded-xl bg-abino-dark text-white font-bold py-3.5 px-4 hover:bg-neutral-800 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={run}
                    disabled={running}
                  >
                    {running ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Executing Benchmark...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Run Evaluation Task
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#dcfce7] rounded-[24px] border border-[#bbf7d0] shadow-sm p-6 relative overflow-hidden">
              <ShieldAlert className="absolute -right-4 -bottom-4 w-24 h-24 text-[#86efac] opacity-50" />
              <div className="relative z-10">
                <h3 className="text-teal-900 font-bold text-sm mb-2">Test Suite Info</h3>
                <p className="text-teal-800 text-xs font-medium leading-relaxed">
                  This quick run executes a single "Chaotic Weather" prompt to verify the connection and model capabilities before full leaderboard submission.
                </p>
              </div>
            </div>
          </div>

          {/* Main Output Window */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[24px] border border-neutral-200 shadow-sm h-full flex flex-col overflow-hidden">
              <div className="border-b border-neutral-100 px-6 py-4 flex items-center justify-between bg-neutral-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Execution Log</span>
              </div>

              <div className="p-6 flex-1 bg-[#1a1b1e] text-neutral-300 font-mono text-[13px] leading-relaxed overflow-x-auto min-h-[400px]">
                {!output && !running && (
                  <div className="h-full flex flex-col items-center justify-center text-neutral-600 space-y-4">
                    <TerminalIcon className="w-8 h-8 opacity-50" />
                    <p>Awaiting execution command...</p>
                  </div>
                )}

                {running && !output && (
                  <div className="animate-pulse space-y-2">
                    <p className="text-green-400">&gt; Connecting to {provider} endpoint...</p>
                    <p className="text-yellow-400">&gt; Loading model '{model}'...</p>
                    <p>&gt; Dispatching prompt dataset (1 sample)...</p>
                    <p className="text-neutral-500">_waiting for response_</p>
                  </div>
                )}

                {output && (
                  <pre className="whitespace-pre-wrap">{output}</pre>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
