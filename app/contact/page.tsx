"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Mail, Twitter, MessageSquare, ArrowUpRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const channels = [
  {
    icon: Github,
    title: "GitHub Issues",
    description: "The preferred way to report bugs, request features, or discuss improvements. Open a detailed issue with context and reproducible steps.",
    cta: "Open an Issue",
    href: "https://github.com/retardbench/retardbench/issues",
    color: "bg-neutral-100",
    iconColor: "text-abino-dark",
  },
  {
    icon: MessageSquare,
    title: "GitHub Discussions",
    description: "For broader conversations about the project direction, new ideas, benchmark suggestions, and community feedback.",
    cta: "Start a Discussion",
    href: "https://github.com/retardbench/retardbench/discussions",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Twitter,
    title: "Twitter / X",
    description: "Follow us for benchmark drops, leaderboard updates, and chaotic model discoveries shared in real time.",
    cta: "Follow @RetardBench",
    href: "https://twitter.com/retardbench",
    color: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    icon: Mail,
    title: "Email",
    description: "For partnership inquiries, dataset contributions, and private discussions that don't belong on a public forum.",
    cta: "Send Email",
    href: "mailto:hello@retardbench.dev",
    color: "bg-teal-50",
    iconColor: "text-teal-600",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#f4f6f5] min-h-screen py-20 px-6 lg:px-8 pb-24">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <motion.div {...fadeUp}>
            <span className="pill-badge bg-white border border-neutral-200 shadow-sm text-abino-dark font-bold mb-6 mx-auto inline-flex">
              Reach Out
            </span>
          </motion.div>
          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-abino-dark tracking-tight mb-6"
          >
            Get in <span className="text-[#a3e635]">Touch</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-neutral-500 font-medium"
          >
            Questions, partnerships, or dataset contributions? We&apos;re always open to connecting with the community.
          </motion.p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {channels.map((channel, i) => (
            <motion.a
              key={i}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[24px] border border-neutral-200 p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${channel.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <channel.icon className={`w-7 h-7 ${channel.iconColor}`} />
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-300 group-hover:text-abino-dark transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-abino-dark mb-3 group-hover:text-teal-700 transition-colors">{channel.title}</h3>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-6 flex-1">{channel.description}</p>
              <div className="flex items-center gap-2 text-sm font-bold text-[#a3e635] group-hover:text-teal-600 transition-colors">
                {channel.cta}
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* FAQ/Note */}
        <motion.div
          {...fadeUp}
          className="bg-[#dcfce7] rounded-[24px] border border-[#bbf7d0] p-8 md:p-10 text-center"
        >
          <h3 className="text-xl font-bold text-teal-900 mb-3">Response Time</h3>
          <p className="text-sm text-teal-800 font-medium leading-relaxed max-w-xl mx-auto">
            GitHub issues typically get responses within 24-48 hours. For urgent matters, tag your issue with <code className="bg-white/50 px-1.5 py-0.5 rounded text-xs font-bold">priority</code>. Community contributions are always welcome and reviewed promptly.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
