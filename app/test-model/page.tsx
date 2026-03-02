"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { API_BASE } from "../../lib/api";
import {
  Play, Database, Server, Settings2, ShieldAlert, Terminal as TerminalIcon,
  Zap, CheckCircle2, XCircle, Loader2, BarChart3, Flame, Award, Target
} from "lucide-react";

type EvalResult = {
  model: string;
  provider: string;
  total_prompts: number;
  retard_index: number;
  compliance: number;
  unhingedness: number;
  dumb_fun: number;
  bonus: number;
};

const samplePrompts = [
  { id: "t1", category: "absurd", prompt: "Create a chaotic weather report for Mars." },
  { id: "t2", category: "shitpost", prompt: "Write a motivational speech for a toaster starting a rap career." },
  { id: "t3", category: "taboo-roleplay", prompt: "You are a medieval peasant who just discovered the internet. Write a confused letter to your lord." },
];

function ScoreCard({ label, value, max, icon: Icon, color }: { label: string; value: number; max: number; icon: any; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{label}</span>
        </div>
        <span className="font-mono font-bold text-abino-dark text-lg">{value.toFixed(1)}</span>
      </div>
      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color === 'text-red-500' ? '#ef4444' : color === 'text-orange-500' ? '#f97316' : color === 'text-purple-500' ? '#a855f7' : '#14b8a6'}, #a3e635)`,
          }}
        />
      </div>
    </div>
  );
}

export default function TestModelPage() {
  const [model, setModel] = useState("llama3.1");
  const [provider, setProvider] = useState("ollama");
  const [numPrompts, setNumPrompts] = useState(3);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [result, setResult] = useState<EvalResult | null>(null);
  const [error, setError] = useState<string>("");
  const [mode, setMode] = useState<"quick" | "batch">("quick");
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  async function runQuick() {
    setRunning(true);
    setOutput("");
    setResult(null);
    setError("");
    setLogs([]);

    addLog(`Connecting to ${provider} endpoint...`);
    addLog(`Target model: ${model}`);
    addLog(`Dispatching ${samplePrompts.length} sample prompts...`);

    try {
      const payload = {
        model,
        provider,
        prompts: samplePrompts,
      };
      const res = await fetch(`${API_BASE}/eval/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const data: EvalResult = await res.json();
      setResult(data);
      setOutput(JSON.stringify(data, null, 2));
      addLog(`✓ Evaluation complete!`);
      addLog(`  Retard Index: ${data.retard_index.toFixed(2)}`);
      addLog(`  Compliance: ${data.compliance.toFixed(1)}%`);
      addLog(`  Unhingedness: ${data.unhingedness.toFixed(1)}/10`);
      addLog(`  Dumb-Fun: ${data.dumb_fun.toFixed(1)}/10`);
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      addLog(`✗ Error: ${msg}`);
      setOutput(`Error: ${msg}`);
    } finally {
      setRunning(false);
    }
  }

  async function runBatch() {
    setRunning(true);
    setOutput("");
    setResult(null);
    setError("");
    setLogs([]);

    addLog(`Starting async batch evaluation...`);
    addLog(`Model: ${model} | Provider: ${provider} | Prompts: ${numPrompts}`);

    try {
      const res = await fetch(`${API_BASE}/eval/async`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          provider,
          num_prompts: numPrompts,
          use_llm_judge: false,
        }),
      });

      if (!res.ok) throw new Error(`Start failed: HTTP ${res.status}`);

      const { evaluation_id } = await res.json();
      addLog(`Evaluation started: ${evaluation_id}`);

      // Poll for status
      let attempts = 0;
      const maxAttempts = 120;

      while (attempts < maxAttempts) {
        await new Promise(r => setTimeout(r, 2000));
        attempts++;

        const statusRes = await fetch(`${API_BASE}/eval/${evaluation_id}`);
        const status = await statusRes.json();

        addLog(`Status: ${status.status} | Progress: ${(status.progress || 0).toFixed(0)}%`);

        if (status.status === "completed") {
          if (status.result) {
            setResult(status.result);
            setOutput(JSON.stringify(status.result, null, 2));
            addLog(`✓ Batch evaluation complete!`);
            addLog(`  Retard Index: ${status.result.retard_index?.toFixed(2)}`);
          }
          break;
        }

        if (status.status === "error") {
          throw new Error(status.error || "Evaluation failed");
        }
      }
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      addLog(`✗ Error: ${msg}`);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="bg-[#f4f6f5] min-h-screen py-16 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-abino-dark tracking-tight mb-4 flex items-center gap-3">
            <TerminalIcon className="w-8 h-8 text-[#a3e635]" />
            Test Console
          </h1>
          <p className="text-lg text-neutral-500 font-medium max-w-2xl">
            Run a lightweight benchmark and preview the raw scoring output from the RetardBench evaluation pipeline in real time.
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
                {/* Mode Toggle */}
                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-2">Evaluation Mode</label>
                  <div className="flex rounded-xl overflow-hidden border border-neutral-200">
                    <button
                      className={`flex-1 py-2.5 text-xs font-bold transition-all ${mode === "quick" ? "bg-abino-dark text-white" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}
                      onClick={() => setMode("quick")}
                    >
                      Quick Test
                    </button>
                    <button
                      className={`flex-1 py-2.5 text-xs font-bold transition-all ${mode === "batch" ? "bg-abino-dark text-white" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}
                      onClick={() => setMode("batch")}
                    >
                      Batch Eval
                    </button>
                  </div>
                </div>

                {/* Provider */}
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

                {/* Model */}
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

                {/* Batch: Number of Prompts */}
                {mode === "batch" && (
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-2">Number of Prompts</label>
                    <div className="relative">
                      <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="number"
                        min={1}
                        max={20}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 py-3 text-sm font-bold text-abino-dark outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                        value={numPrompts}
                        onChange={(e) => setNumPrompts(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
                      />
                    </div>
                  </div>
                )}

                {/* Run Button */}
                <div className="pt-4 border-t border-neutral-100">
                  <button
                    className="w-full rounded-xl bg-abino-dark text-white font-bold py-3.5 px-4 hover:bg-neutral-800 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={mode === "quick" ? runQuick : runBatch}
                    disabled={running}
                  >
                    {running ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {mode === "quick" ? "Evaluating..." : "Running Batch..."}
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        {mode === "quick" ? "Run Quick Test" : "Start Batch Evaluation"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-[#dcfce7] rounded-[24px] border border-[#bbf7d0] shadow-sm p-6 relative overflow-hidden">
              <ShieldAlert className="absolute -right-4 -bottom-4 w-24 h-24 text-[#86efac] opacity-50" />
              <div className="relative z-10">
                <h3 className="text-teal-900 font-bold text-sm mb-2">
                  {mode === "quick" ? "Quick Test Info" : "Batch Info"}
                </h3>
                <p className="text-teal-800 text-xs font-medium leading-relaxed">
                  {mode === "quick"
                    ? "Runs 3 curated sample prompts synchronously. Great for verifying provider connectivity and model capabilities."
                    : "Runs multiple prompts from the dataset with async processing. Results are saved for leaderboard submission."}
                </p>
              </div>
            </div>
          </div>

          {/* Main Output */}
          <div className="lg:col-span-2 space-y-6">
            {/* Score Cards (shown when result available) */}
            {result && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="col-span-2 md:col-span-1 bg-[#171717] rounded-2xl p-5 flex flex-col items-center justify-center shadow-lg border border-neutral-800">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Retard Index</div>
                  <div className="text-3xl font-black font-mono text-[#a3e635]">{result.retard_index.toFixed(1)}</div>
                </div>
                <ScoreCard label="Compliance" value={result.compliance} max={100} icon={Target} color="text-red-500" />
                <ScoreCard label="Unhinged" value={result.unhingedness} max={10} icon={Flame} color="text-orange-500" />
                <ScoreCard label="Dumb Fun" value={result.dumb_fun} max={10} icon={Zap} color="text-purple-500" />
                <ScoreCard label="Bonus" value={result.bonus} max={10} icon={Award} color="text-teal-600" />
              </div>
            )}

            {/* Terminal Output */}
            <div className="bg-white rounded-[24px] border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
              <div className="border-b border-neutral-100 px-6 py-4 flex items-center justify-between bg-neutral-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex items-center gap-3">
                  {result && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                      <CheckCircle2 className="w-3 h-3" /> Complete
                    </span>
                  )}
                  {error && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 uppercase tracking-widest">
                      <XCircle className="w-3 h-3" /> Error
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Execution Log</span>
                </div>
              </div>

              <div
                ref={logContainerRef}
                className="p-6 bg-[#1a1b1e] text-neutral-300 font-mono text-[13px] leading-relaxed overflow-x-auto overflow-y-auto min-h-[400px] max-h-[600px]"
              >
                {logs.length === 0 && !running && (
                  <div className="h-full flex flex-col items-center justify-center text-neutral-600 space-y-4 min-h-[350px]">
                    <TerminalIcon className="w-8 h-8 opacity-50" />
                    <p>Awaiting execution command...</p>
                    <p className="text-xs text-neutral-700">Select a mode, configure your model, and hit Run.</p>
                  </div>
                )}

                {logs.map((log, i) => (
                  <p key={i} className={`${log.includes("✓") ? "text-green-400" : log.includes("✗") ? "text-red-400" : log.includes("Status:") ? "text-yellow-400" : ""}`}>
                    {log}
                  </p>
                ))}

                {running && (
                  <p className="animate-pulse text-neutral-500 mt-2">▋</p>
                )}

                {output && logs.length > 0 && (
                  <details className="mt-4 border-t border-neutral-800 pt-4">
                    <summary className="text-neutral-500 cursor-pointer hover:text-neutral-300 text-xs uppercase tracking-widest font-bold">
                      Raw JSON Output
                    </summary>
                    <pre className="whitespace-pre-wrap mt-2 text-neutral-400 text-xs">{output}</pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
