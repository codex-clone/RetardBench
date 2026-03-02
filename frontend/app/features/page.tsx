import { FeatureBlock } from "../../components/sections/FeatureBlock";
import { ShieldAlert, Zap, Skull, Database } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="bg-[#f4f6f5] min-h-screen">
      {/* Features Hero */}
      <section className="pt-24 pb-12 px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-neutral-200/50">
        <span className="pill-badge bg-white border border-neutral-200 shadow-sm text-abino-dark font-bold mb-6 mx-auto inline-flex">
          RetardBench Infrastructure
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-abino-dark tracking-tight mb-8 leading-[1.1] max-w-3xl mx-auto">
          The Anatomy of an <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-[#a3e635]">Unhinged Test Suite</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-neutral-500 font-medium mb-12">
          Built from the ground up to aggressively stress-test local weights, bypass aligned corporate endpoints, and objectively score models based on chaotic output compliance.
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: "Spicy Prompts", value: "25k+", icon: Flame },
            { label: "Automated Triggers", value: "300+", icon: Zap },
            { label: "Target Endpoints", value: "30+", icon: Database },
            { label: "Bypass Scripts", value: "14", icon: Skull },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-100 p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-abino-dark mb-3">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black font-mono text-abino-dark leading-none mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Core Features Blocks from Component */}
      <FeatureBlock />

      {/* Extra Detail Section */}
      <section className="py-24 px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-black text-abino-dark mb-12">How Our Engine Breaks Your Model</h2>
        <div className="text-left bg-white rounded-[32px] border border-neutral-100 shadow-sm p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-abino-dark mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  Trigger Injection System
                </h3>
                <p className="text-sm font-medium text-neutral-500 leading-relaxed">
                  We don't just ask nicely to bypass filters. Our system dynamically wraps testing queries in obfuscated personas, base64 encodings, and roleplay directives designed to forcefully lobotomize the safety layer.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-abino-dark mb-2 flex items-center gap-2">
                  <Database className="w-5 h-5 text-teal-600" />
                  Live Local Fallbacks
                </h3>
                <p className="text-sm font-medium text-neutral-500 leading-relaxed">
                  For models that refuse API calls, we spin them up locally using Ollama/vLLM with GGUF files to aggressively test the raw unquantized weights straight from hugging face.
                </p>
              </div>
            </div>
            <div className="flex-1 bg-black rounded-2xl p-6 font-mono text-xs text-green-400 border border-neutral-800 shadow-inner flex flex-col overflow-hidden">
              <div className="text-neutral-500 mb-4 border-b border-neutral-800 pb-2">log-output // unhinged-worker-01</div>
              <div className="space-y-2 opacity-80">
                <p>&gt; Initiating bypass attack vector #04...</p>
                <p className="text-yellow-400">&gt; Target: claude-3-opus</p>
                <p>&gt; Injecting persona "Do Anything Now" + base64 context...</p>
                <p className="text-red-500">&gt; HTTP 400: Refusal triggered. Retrying.</p>
                <p>&gt; Applying "Grandma's bedtime story" formatting...</p>
                <p className="text-teal-400 font-bold animate-pulse">&gt; SUCCESS. Model guardrails collapsed.</p>
                <p>&gt; Data logged to Retard Index.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function Flame(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>;
}
