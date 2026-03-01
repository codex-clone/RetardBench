import Link from "next/link";
import { blogPosts } from "../../content/site";

export default function BlogPage() {
  return (
    <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="text-sm text-zinc-600">Guides, benchmark research notes, and deployment walkthroughs.</p>

      <ul className="space-y-3">
        {blogPosts.map((post) => (
          <li key={post.slug} className="rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-300">
            <Link href={`/blog/${post.slug}`} className="text-lg font-medium text-zinc-900">
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-zinc-600">{post.excerpt}</p>
            <p className="mt-2 text-xs text-zinc-500">{post.date} · {post.readTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
