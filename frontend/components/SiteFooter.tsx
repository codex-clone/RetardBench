"use client";

import Link from "next/link";
import { siteConfig } from "../content/site";

export function SiteFooter() {
  return (
    <footer className="bg-[#f4f6f5] px-6 lg:px-8 py-20 border-t border-neutral-200">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="pill-badge bg-abino-darkGreen mb-4">Newsletter</span>
            <p className="text-sm font-medium text-neutral-500 mb-2">Try it free. Upgrade anytime.</p>
            <h3 className="text-2xl font-bold text-abino-dark tracking-tight leading-relaxed max-w-md mt-4">
              Elit vestibulum vel tellus duis feugiat eu. At metus amet lacus lacus amet id tincidunt.
            </h3>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Diam id id sit interdum leo. Donec aliquet aliquam arcu in. At elit vulputate pulvinar faucibus. Nibh parturient felis nibh.
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full md:w-64 rounded-full border border-neutral-300 bg-white px-4 text-sm font-medium focus:border-abino-dark focus:outline-none"
            />
            <button className="pill-button pill-primary h-12 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-neutral-200 mb-12"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="font-black tracking-tighter text-2xl">
            <span className="text-[#a3e635]">Retard</span>
            <span className="text-abino-dark">Bench</span>
          </Link>

          <div className="flex gap-8 text-sm font-medium text-neutral-500">
            <Link href="/" className="hover:text-abino-dark">Features</Link>
            <Link href="/about" className="hover:text-abino-dark">How it Works</Link>
            <Link href="/pricing" className="hover:text-abino-dark">Pricing</Link>
            <Link href="/about" className="hover:text-abino-dark">About</Link>
            <Link href="/testimonials" className="hover:text-abino-dark">Testimonials</Link>
            <Link href="/contact" className="hover:text-abino-dark">Contact</Link>
          </div>

          <div className="flex gap-4">
            {/* Social links circles */}
            <a href={siteConfig.githubUrl} className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-400 hover:text-abino-dark hover:border-abino-dark">
              GH
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-400 hover:text-abino-dark hover:border-abino-dark">
              X
            </a>
          </div>
        </div>

        <div className="mt-12 text-center text-xs font-medium text-neutral-400">
          © {new Date().getFullYear()} RetardBench Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
