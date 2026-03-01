import Link from "next/link";
import { siteConfig } from "../content/site";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 w-[min(1200px,96%)] rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-900 md:text-base">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs text-zinc-600 transition hover:text-zinc-900">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-700 md:inline-flex"
          >
            Ask a Question
          </Link>
          <Link href={siteConfig.githubUrl} className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-white">
            GitHub
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
