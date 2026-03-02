"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "../content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

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
            href="/log-in"
            className="text-[15px] font-medium text-abino-dark hover:text-abino-darkGreen transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/test-model"
            className="pill-button pill-outline border-[#a3e635] text-abino-dark bg-transparent hover:bg-[#a3e635] transition-all px-5 py-2"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
