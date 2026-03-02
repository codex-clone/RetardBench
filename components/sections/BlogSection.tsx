"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "../../content/site";

export function BlogSection() {
    return (
        <section className="py-24 px-6 bg-[#fafafa]">
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">Latest from the Chaos</h2>
                        <p className="mt-4 text-slate-500 max-w-xl leading-relaxed">Insights, methodology deep dives, and leaderboard updates.</p>
                    </div>
                    <Link href="/blog" className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 shadow-sm shrink-0">
                        View All Posts
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {blogPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                            <article className="flex h-full flex-col justify-between rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
                                <div>
                                    <div className="mb-4 flex items-center gap-4 text-xs font-medium text-slate-400">
                                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                                        <span>{post.readTime} read</span>
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600 line-clamp-2 leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-[15px] leading-relaxed text-slate-500 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-indigo-600">
                                    Read Article
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
