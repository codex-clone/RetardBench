import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "RetardBench",
  description: "Open leaderboard for chaotic model compliance"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="mx-auto mt-8 w-[min(1200px,96%)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
