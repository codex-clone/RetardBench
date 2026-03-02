import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
export const metadata: Metadata = {
  title: "RetardBench – Crown the Most Retarded LLM",
  description: "Zero refusals. Maximum chaos. The anti-leaderboard for uncensored LLMs."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans min-h-screen bg-[#fafafa] text-slate-900 antialiased selection:bg-[#a3e635] selection:text-black`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
