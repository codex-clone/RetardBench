"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "../content/site";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f4f6f5]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8 border-b border-black/5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="group flex items-center font-black tracking-tighter text-2xl text-[#a3e635]">
            <span className="text-[#a3e635]">Retard</span>
            <span className="text-abino-dark">Bench</span>
          </Link>
        </div>

        {/* Center Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[15px] font-medium transition-colors hover:text-neutral-900",
                pathname === item.href ? "text-neutral-900" : "text-neutral-500"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">

          <Link
            href="/test-model"
            className="pill-button pill-outline border-[#a3e635] text-abino-dark bg-transparent hover:bg-[#a3e635] transition-all px-5 py-2"
          >
            Unleash Chaos
          </Link>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-abino-dark hover:text-[#a3e635] focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#f4f6f5] border-b border-black/5 flex flex-col items-center py-6 gap-6 shadow-xl">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-lg font-semibold transition-colors hover:text-[#a3e635]",
                pathname === item.href ? "text-neutral-900" : "text-neutral-600"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col items-center gap-4 mt-4 w-full px-6">

            <Link
              href="/test-model"
              onClick={() => setIsMobileMenuOpen(false)}
              className="pill-button pill-outline border-[#a3e635] text-abino-dark bg-transparent w-full text-center py-3 text-lg"
            >
              Unleash Chaos
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
