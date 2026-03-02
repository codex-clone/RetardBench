import Link from "next/link";
import { siteConfig } from "../content/site";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-10">
      <div className="mx-auto flex w-[min(1200px,100%)] items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center gap-2">
          {/* Replicating the plus-shape logo from Image 1 */}
          <div className="relative flex h-6 w-6 items-center justify-center text-slate-900">
             <div className="absolute h-1.5 w-1.5 bg-current top-0 left-1/2 -translate-x-1/2"></div>
             <div className="absolute h-1.5 w-1.5 bg-current bottom-0 left-1/2 -translate-x-1/2"></div>
             <div className="absolute h-1.5 w-1.5 bg-current left-0 top-1/2 -translate-y-1/2"></div>
             <div className="absolute h-1.5 w-1.5 bg-current right-0 top-1/2 -translate-y-1/2"></div>
             <div className="absolute h-1.5 w-1.5 bg-current rounded-full"></div>
          </div>
          <Link href="/" className="text-sm font-medium tracking-tight text-slate-900 flex flex-col leading-tight">
             <span>{siteConfig.name}</span>
             <span className="text-[10px] text-slate-500 font-normal">Incorporations</span>
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[13px] font-medium text-slate-600 transition hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden text-[13px] text-slate-500 hover:text-slate-800 md:inline-flex"
          >
            Have A Question?
          </Link>
          <Link href={siteConfig.githubUrl} className="rounded-full bg-slate-900 px-5 py-2 text-[13px] font-medium text-white hover:bg-slate-800 transition-colors">
            Book A Call
          </Link>
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </header>
  );
}
