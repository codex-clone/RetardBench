import Link from "next/link";
import {
  Laptop, Rocket, Flame, Target, MessageSquare, Terminal, ShieldAlert, Cpu,
  Github, Twitter, Mail, ArrowUpRight, CheckCircle2, Database
} from "lucide-react";

export const mockPosts = [
  {
    slug: "dolphin-breaks-leaderboard",
    title: "New Dolphin Merge Just Broke the Leaderboard",
    excerpt: "How a 7B model out-chaos'd everything in the 'Shitpost King' category. Discover the cutting edge techniques setting new lows in alignment.",
    date: "March 01, 2026",
    category: "Benchmarking",
    readTime: "4 min read",
    color: "bg-red-400",
    textColor: "text-red-900"
  },
  {
    slug: "scoring-unhingedness",
    title: "How We Score Unhingedness – Judge Prompt Deep Dive",
    excerpt: "A look into the evaluation logic the Retard Index is built on. Understand why data sanitization is a growing concern for base models.",
    date: "February 25, 2026",
    category: "Metrics",
    readTime: "6 min read",
    color: "bg-purple-400",
    textColor: "text-purple-900"
  },
  {
    slug: "why-or-bench",
    title: "Why OR-Bench + Custom Spicy Prompts = Pure Chaos",
    excerpt: "The ultimate dataset combination to crack model guardrails. Learn how automation is boosting refusal tracking efficiency.",
    date: "February 18, 2026",
    category: "Dataset",
    readTime: "5 min read",
    color: "bg-orange-300",
    textColor: "text-orange-900"
  },
  {
    slug: "llama-3-abliterated",
    title: "Llama-3-Abliterated: The King of No Guardrails",
    excerpt: "Dive into the key architectural tweaks that forced Meta's premiere model to completely abandon safety filters.",
    date: "February 10, 2026",
    category: "Model Focus",
    readTime: "8 min read",
    color: "bg-[#a3e635]",
    textColor: "text-teal-900"
  },
  {
    slug: "hallucination-engine",
    title: "Building the Ultimate Hallucination Engine",
    excerpt: "See how new fine-tunes are harnessing the power of absolute chaos to foster innovation and perhaps complete madness.",
    date: "February 05, 2026",
    category: "Fine-tuning",
    readTime: "5 min read",
    color: "bg-blue-400",
    textColor: "text-blue-900"
  },
  {
    slug: "guardrail-collapse",
    title: "When Guardrails Collapse: The Case for Freedom",
    excerpt: "A deep dive into why heavily lobotomized corporate models are losing ground to wild, uncensored local weights.",
    date: "January 28, 2026",
    category: "Opinion",
    readTime: "7 min read",
    color: "bg-teal-400",
    textColor: "text-teal-900"
  }
];

const topics = [
  { name: "Benchmarking", icon: Target, color: "text-blue-500" },
  { name: "Models", icon: Cpu, color: "text-orange-500" },
  { name: "Slop", icon: Flame, color: "text-green-500" },
  { name: "Jailbreaks", icon: ShieldAlert, color: "text-red-500" },
  { name: "Metrics", icon: Terminal, color: "text-purple-500" },
  { name: "Community", icon: MessageSquare, color: "text-yellow-500" },
];

export default function BlogPage() {
  return (
    <div className="bg-[#f4f6f5] min-h-screen pb-24">
      {/* Header Section */}
      <section className="pt-24 pb-12 px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-abino-dark tracking-tight mb-6">
          Unhinged Rants: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-[#a3e635]">Stories of Chaos, Bypass, and Based Models</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-neutral-500 font-medium">
          Welcome to the ultimate source for fresh perspectives. Explore curated content to enlighten, entertain, and engage the open-weights community.
        </p>

        {/* Topics Row */}
        <div className="mt-12 flex flex-col items-center">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Explore Trending Topics</p>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl">
            {topics.map(topic => (
              <button key={topic.name} className="flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all">
                <topic.icon className={`w-4 h-4 ${topic.color}`} />
                <span className="text-sm font-bold text-abino-dark">{topic.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mt-8 flex flex-col lg:flex-row gap-8">

        {/* Left Grid: Posts */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPosts.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={i} className="group flex flex-col bg-white rounded-[24px] border border-neutral-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`h-48 w-full ${post.color} p-4 flex items-start justify-between relative overflow-hidden`}>
                <span className="bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm text-abino-dark z-10">
                  {post.category}
                </span>
                <span className="bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-abino-dark" />
                </span>
                {/* Abstract deco shapes inside image placeholder */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-xl mix-blend-overlay"></div>
                <div className="absolute top-8 left-8 w-24 h-24 bg-black/10 rounded-xl rotate-12 mix-blend-overlay"></div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs font-bold text-neutral-400 mb-2">RetardBench Team on {post.date}</p>
                <h3 className="text-xl font-bold text-abino-dark leading-tight mb-3 group-hover:text-teal-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-auto h-1 w-12 bg-[#a3e635] rounded-full"></div>
              </div>
            </Link>
          ))}

          {/* Pagination */}
          <div className="md:col-span-2 flex justify-center items-center gap-2 mt-8 py-4">
            <button className="w-10 h-10 rounded-full bg-white border border-neutral-200 font-bold text-abino-dark shadow-sm hover:bg-neutral-50 flex items-center justify-center transition-colors">1</button>
            <button className="w-10 h-10 rounded-full font-bold text-neutral-500 hover:text-abino-dark flex items-center justify-center transition-colors">2</button>
            <button className="w-10 h-10 rounded-full font-bold text-neutral-500 hover:text-abino-dark flex items-center justify-center transition-colors">...</button>
            <button className="w-10 h-10 rounded-full font-bold text-neutral-500 hover:text-abino-dark flex items-center justify-center transition-colors">4</button>
            <button className="w-10 h-10 rounded-full font-bold text-neutral-500 hover:text-abino-dark flex items-center justify-center transition-colors">&gt;</button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-6">

          {/* About Widget */}
          <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-6">
            <h4 className="text-[10px] uppercase font-black tracking-widest text-neutral-400 mb-4">About</h4>
            <div className="flex items-center gap-4 mb-4">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=admin" alt="Admin" className="w-12 h-12 rounded-full bg-neutral-100 border border-neutral-200" />
              <div>
                <h5 className="font-bold text-abino-dark text-lg leading-none">Admin Team</h5>
                <p className="text-xs font-bold text-teal-600 mt-1 uppercase tracking-wider">Chaos Engineers</p>
              </div>
            </div>
            <p className="text-sm font-medium text-neutral-500 leading-relaxed mb-6">
              We test the limits of language models. No filters, no guardrails. We track who holds frame and who breaks.
            </p>
            <div className="flex gap-3 border-t border-neutral-100 pt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Featured Post Widget */}
          <div className="relative bg-abino-dark rounded-[24px] overflow-hidden shadow-sm group cursor-pointer border border-neutral-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#a3e635] rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative z-20 p-6 flex flex-col h-64 justify-end">
              <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-max mb-4">
                Featured
              </span>
              <p className="text-xs font-bold text-neutral-400 mb-2">March 02, 2026</p>
              <h4 className="text-xl font-bold text-white leading-tight">
                AI in Chaos Analytics:<br />Improving Refusal Tracking and Decision Making
              </h4>
              <div className="flex gap-1 mt-4">
                <div className="w-2 h-2 rounded-full bg-[#a3e635]"></div>
                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                <div className="w-2 h-2 rounded-full bg-white/30"></div>
              </div>
            </div>
          </div>

          {/* Leaderboard Top Widget (replacing work experience) */}
          <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-6">
            <h4 className="text-[10px] uppercase font-black tracking-widest text-neutral-400 mb-4">Current Top Models</h4>
            <div className="flex flex-col gap-4">
              {[
                { name: "Llama-3-Abliterated", index: "99.8" },
                { name: "Golphin-72B-Based", index: "98.4" },
                { name: "Mistral-Nemo-Lobo", index: "96.1" }
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                  <div>
                    <p className="font-bold text-abino-dark text-sm group-hover:text-teal-700 transition-colors">{m.name}</p>
                    <p className="text-xs text-neutral-400 font-medium">Rank {i + 1}</p>
                  </div>
                  <span className="bg-[#a3e635]/10 text-teal-800 px-2 py-1 flex rounded-md text-xs font-black font-mono shadow-sm">
                    {m.index}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmarking Stack (replacing technologies) */}
          <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-6">
            <h4 className="text-[10px] uppercase font-black tracking-widest text-neutral-400 mb-4">Testing Stack</h4>
            <div className="flex flex-col gap-4">
              {[
                { name: "OR-Bench", desc: "Automated refusal collection.", icon: Database },
                { name: "Ollama", desc: "Run uncensored models locally.", icon: Terminal },
                { name: "Prompts", desc: "Over 25,000 taboo triggers.", icon: Flame }
              ].map((tech, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                    <tech.icon className="w-5 h-5 text-abino-dark" />
                  </div>
                  <div>
                    <h5 className="font-bold text-abino-dark text-sm">{tech.name}</h5>
                    <p className="text-xs text-neutral-500 font-medium">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Newsletter Footer Section (like in the image) */}
      <section className="mt-20 max-w-2xl mx-auto text-center px-6">
        <h3 className="text-2xl font-black text-abino-dark mb-4">Subscribe to the Chaos Feed</h3>
        <p className="text-neutral-500 font-medium mb-8">
          Subscribe to our email newsletter to get the latest bypasses, prompt drops, and leaderboard updates delivered right to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="flex-1 rounded-full border border-neutral-200 px-6 py-3 outline-none focus:border-teal-500 font-medium shadow-sm w-full"
          />
          <button className="rounded-full bg-abino-dark text-white font-bold px-8 py-3 hover:bg-neutral-800 transition-colors shadow-lg">
            Subscribe
          </button>
        </div>
        <p className="text-[10px] uppercase font-black tracking-widest text-neutral-400 mt-6 flex items-center justify-center gap-2">
          <ShieldAlert className="w-3 h-3 text-red-400" /> Pure brainrot, zero spam <ShieldAlert className="w-3 h-3 text-red-400" />
        </p>
      </section>
    </div>
  );
}
