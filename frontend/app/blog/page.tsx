import Link from "next/link";
import { blogPosts } from "../../content/site";

export default function BlogPage() {
  return (
    <div className="main-container mx-auto mt-6 px-6 py-20 md:px-16 md:py-32">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center mb-16 relative">
          <div className="absolute left-[5%] top-[10%] deco-square text-slate-800 opacity-20 hidden md:block rotate-12"></div>

          <h1 className="hero-heading mb-6">Our <span className="italic">Blog</span></h1>
          <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-slate-500 font-medium">
            Guides, benchmark research notes, and deployment walkthroughs.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <li key={post.slug} className="group flex flex-col justify-between rounded-3xl bg-slate-50 p-8 hover:bg-slate-100 transition-all border border-slate-100 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100/50">
              <div>
                <Link href={`/blog/${post.slug}`} className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors inline-block">
                  {post.title}
                </Link>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-500">{post.excerpt}</p>
              </div>
              <p className="mt-8 text-[13px] font-medium text-slate-400 uppercase tracking-wider">
                {post.date} · {post.readTime}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
