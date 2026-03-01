import Link from "next/link";
import { siteConfig } from "../content/site";

export async function SiteFooter() {
  let stars = "—";

  try {
    const res = await fetch("https://api.github.com/repos/vercel/next.js", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      stars = `${(data.stargazers_count as number).toLocaleString()}+`;
    }
  } catch {
    stars = "N/A";
  }

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-16">
      <div className="mx-auto w-[min(1200px,96%)]">
        <div className="grid gap-12 md:grid-cols-4 lg:gap-16">

          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative flex h-6 w-6 items-center justify-center text-slate-900">
                 <div className="absolute h-1.5 w-1.5 bg-current top-0 left-1/2 -translate-x-1/2"></div>
                 <div className="absolute h-1.5 w-1.5 bg-current bottom-0 left-1/2 -translate-x-1/2"></div>
                 <div className="absolute h-1.5 w-1.5 bg-current left-0 top-1/2 -translate-y-1/2"></div>
                 <div className="absolute h-1.5 w-1.5 bg-current right-0 top-1/2 -translate-y-1/2"></div>
                 <div className="absolute h-1.5 w-1.5 bg-current rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">{siteConfig.name}</h3>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500 font-medium">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex gap-3">
              <Link href={siteConfig.githubUrl} className="group flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 group-hover:text-slate-900">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-[13px] font-bold uppercase tracking-wider text-slate-900">Product</h4>
            <ul className="space-y-4">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[15px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[13px] font-bold uppercase tracking-wider text-slate-900">Community</h4>
            <ul className="space-y-4">
              <li>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-yellow-400">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-xs font-bold text-slate-700">{stars} Stars</span>
                </div>
              </li>
              <li>
                <Link href="/contribute" className="text-[15px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
                  Contribute
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[15px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-400">
            &copy; {new Date().getFullYear()} RetardBench Incorporations. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <Link href="#" className="text-sm font-medium text-slate-400 hover:text-slate-900">Privacy Policy</Link>
             <Link href="#" className="text-sm font-medium text-slate-400 hover:text-slate-900">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
