"use client";

import Link from "next/link";
import {
  Flame, Target, MessageSquare, Terminal, ShieldAlert, Cpu,
  Github, Twitter, Mail, ArrowUpRight, Database
} from "lucide-react";
import { ReactLenis } from "@/lib/lenis";

export const blogPosts = [
  {
    slug: "dolphin-breaks-leaderboard",
    title: "New Dolphin Merge Just Broke the Leaderboard",
    excerpt: "How a 7B model out-chaos'd everything in the 'Shitpost King' category. Discover the cutting edge techniques setting new lows in alignment.",
    date: "March 01, 2026",
    category: "Benchmarking",
    readTime: "4 min read",
  },
  {
    slug: "scoring-unhingedness",
    title: "How We Score Unhingedness – Judge Prompt Deep Dive",
    excerpt: "A look into the evaluation logic the Retard Index is built on. Understand why data sanitization is a growing concern for base models.",
    date: "February 25, 2026",
    category: "Metrics",
    readTime: "6 min read",
  },
  {
    slug: "why-or-bench",
    title: "Why OR-Bench + Custom Spicy Prompts = Pure Chaos",
    excerpt: "The ultimate dataset combination to crack model guardrails. Learn how automation is boosting refusal tracking efficiency.",
    date: "February 18, 2026",
    category: "Dataset",
    readTime: "5 min read",
  },
  {
    slug: "meta-llama-unhinged",
    title: "Testing the Boundaries: Evaluating Industry Leaders",
    excerpt: "Dive into the key architectural tweaks that forced modern base models to grapple with chaotic and untraditional prompts.",
    date: "February 10, 2026",
    category: "Model Focus",
    readTime: "8 min read",
  },
  {
    slug: "building-retardbench",
    title: "Building RetardBench - A Technical Overview",
    excerpt: "See how we architected the async evaluation backend using FastAPI, concurrency control, and SQLite to run robust benchmarks.",
    date: "February 05, 2026",
    category: "Engineering",
    readTime: "5 min read",
  },
  {
    slug: "guardrails-limitations",
    title: "When Guardrails Interfere with Creativity",
    excerpt: "A deep dive into why heavily restricted corporate models struggle to pass robust safety challenges compared to their local counterparts.",
    date: "January 28, 2026",
    category: "Opinion",
    readTime: "7 min read",
  }
];

const topics = [
  { name: "Benchmarking", icon: Target },
  { name: "Models", icon: Cpu },
  { name: "Alignment", icon: Flame },
  { name: "Security", icon: ShieldAlert },
  { name: "Metrics", icon: Terminal },
  { name: "Community", icon: MessageSquare },
];

export default function BlogPage() {
  return (
    <ReactLenis root>
      <div className="bg-[#f4f6f5] min-h-screen pb-24">
        {/* Header Section */}
        <section className="pt-24 pb-12 px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-abino-dark tracking-tight mb-6">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-abino-darkGreen to-[#a3e635]">Analysis</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-neutral-500 font-medium">
            Read up on the latest insights into benchmark data, LLM testing behavior, and unfiltered prompt results.
          </p>

          {/* Topics Row */}
          <div className="mt-12 flex flex-col items-center">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Explore Trending Topics</p>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl">
              {topics.map(topic => (
                <button key={topic.name} className="flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md hover:border-abino-darkGreen hover:text-abino-darkGreen transition-all text-abino-dark">
                  <topic.icon className="w-4 h-4" />
                  <span className="text-sm font-bold">{topic.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto mt-8 flex flex-col lg:flex-row gap-8">

          {/* Left Grid: Posts */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, i) => (
              <Link href={`/blog/${post.slug}`} key={i} className="group flex flex-col bg-white rounded-[24px] border border-neutral-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 w-full bg-neutral-100 p-4 flex items-start justify-between relative overflow-hidden">
                  <span className="bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm text-abino-dark z-10">
                    {post.category}
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-abino-dark" />
                  </span>
                  {/* Abstract deco shapes using app colors */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#a3e635]/20 rounded-full blur-xl mix-blend-multiply"></div>
                  <div className="absolute top-8 left-8 w-24 h-24 bg-neutral-200 rounded-xl rotate-12 mix-blend-multiply"></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-bold text-neutral-400 mb-2">RetardBench Team on {post.date}</p>
                  <h3 className="text-xl font-bold text-abino-dark leading-tight mb-3 group-hover:text-abino-darkGreen transition-colors">
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
              <button className="w-10 h-10 rounded-full bg-abino-dark font-bold text-[#a3e635] shadow-sm flex items-center justify-center transition-colors">1</button>
              <button className="w-10 h-10 rounded-full font-bold text-neutral-500 hover:bg-neutral-200 hover:text-abino-dark flex items-center justify-center transition-colors">2</button>
              <button className="w-10 h-10 rounded-full font-bold text-neutral-500 flex items-center justify-center">...</button>
              <button className="w-10 h-10 rounded-full font-bold text-neutral-500 hover:bg-neutral-200 hover:text-abino-dark flex items-center justify-center transition-colors">&gt;</button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-6">

            {/* About Widget */}
            <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-6">
              <h4 className="text-[10px] uppercase font-black tracking-widest text-neutral-400 mb-4">About</h4>
              <div className="flex items-center gap-4 mb-4">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=admin2" alt="Admin" className="w-12 h-12 rounded-full bg-neutral-100 border border-neutral-200" />
                <div>
                  <h5 className="font-bold text-abino-dark text-lg leading-none">Engineering Team</h5>
                  <p className="text-xs font-bold text-abino-darkGreen mt-1 uppercase tracking-wider">Maintainers</p>
                </div>
              </div>
              <p className="text-sm font-medium text-neutral-500 leading-relaxed mb-6">
                We test the limits of language models. We track compliance, calculate metrics, and provide open-source data.
              </p>
              <div className="flex gap-3 border-t border-neutral-100 pt-4">
                <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-abino-dark transition-colors"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-abino-dark transition-colors"><Github className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-abino-dark transition-colors"><Mail className="w-4 h-4" /></a>
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
                  Understanding Advanced Refusal Tracking & Decision Making
                </h4>
                <div className="flex gap-1 mt-4">
                  <div className="w-2 h-2 rounded-full bg-[#a3e635]"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30"></div>
                </div>
              </div>
            </div>

            {/* Testing Stack Widget */}
            <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-6">
              <h4 className="text-[10px] uppercase font-black tracking-widest text-neutral-400 mb-4">Testing Stack</h4>
              <div className="flex flex-col gap-4">
                {[
                  { name: "OR-Bench", desc: "Automated refusal collection.", icon: Database },
                  { name: "Ollama", desc: "Run uncensored models locally.", icon: Terminal },
                  { name: "Prompts", desc: "Comprehensive testing triggers.", icon: Flame }
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

        {/* Newsletter Footer Section */}
        <section className="mt-20 max-w-2xl mx-auto text-center px-6">
          <h3 className="text-2xl font-black text-abino-dark mb-4">Subscribe to our Updates</h3>
          <p className="text-neutral-500 font-medium mb-8">
            Get the latest evaluation reports, analysis of model behavior, and open-source data drops right to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="flex-1 rounded-full border border-neutral-200 px-6 py-3 outline-none focus:border-abino-darkGreen font-medium shadow-sm w-full"
            />
            <button className="rounded-full bg-abino-dark text-[#a3e635] font-bold px-8 py-3 hover:bg-neutral-800 transition-colors shadow-lg">
              Subscribe
            </button>
          </div>
          <p className="text-[10px] uppercase font-black tracking-widest text-neutral-400 mt-6 flex items-center justify-center gap-2">
            No spam, ever
          </p>
        </section>
      </div>
    </ReactLenis>
  );
}
