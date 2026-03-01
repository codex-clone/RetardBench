import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";

export const metadata: Metadata = {
  title: "RetardBench",
  description: "Leaderboard for chaotic model compliance"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-semibold">RetardBench</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/leaderboard">Leaderboard</Link>
            <Link href="/test-model">Test Model</Link>
            <Link href="/blog">Blog</Link>
            <ThemeToggle />
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-6 pb-20">{children}</main>
      </body>
    </html>
  );
}
