import { blogPosts } from "../../../content/site";

const content: Record<string, string[]> = {
  "uncensored-models": [
    "Open models provide tunable behavior ranges and clearer attribution for unexpected outputs.",
    "RetardBench compares local and cloud options with consistent prompt subsets and deterministic rubric logic.",
    "Always publish run metadata (temperature, provider, context settings) for reproducibility."
  ],
  "prompt-design": [
    "Prompt sets should include multiple categories: edgy-safe, taboo roleplay, absurd tasks, manifesto-style, and IQ parody.",
    "Balance novelty and comparability. Too random makes scores noisy; too repetitive causes optimization overfitting.",
    "Maintain a private holdout set to evaluate generalization of chaotic behavior."
  ],
  hosting: [
    "Host frontend and API on free tiers first. Keep the architecture stateless where possible.",
    "Persist leaderboard data in SQLite locally and switch to Postgres via environment variable for hosted deployments.",
    "Mirror sample runs on HF Spaces as a fallback interactive demo."
  ]
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Post not found</h1>
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-2 text-xs text-zinc-500">{post.date} · {post.readTime}</p>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-700">
        {(content[slug] ?? ["Content coming soon."]).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
