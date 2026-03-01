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
    <footer className="mt-20 border-t border-zinc-200/80 bg-white/80">
      <div className="mx-auto grid w-[min(1200px,96%)] gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">{siteConfig.name}</h3>
          <p className="mt-2 text-sm text-zinc-600">{siteConfig.description}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">Navigation</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-zinc-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">Community</h4>
          <p className="mt-2 text-sm text-zinc-600">Stars on reference OSS repo: {stars}</p>
          <div className="mt-4 flex gap-2">
            <Link href={siteConfig.githubUrl} className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-white">
              Repository
            </Link>
            <Link href="/contribute" className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700">
              Contribute
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
