const content: Record<string, string> = {
  "uncensored-models": "Open models + configurable providers enable transparent benchmarking.",
  "prompt-design": "Diverse categories improve robustness and reduce overfitting on one meme style.",
  "hosting": "Use Vercel for UI and API, and HF Spaces as optional public demo fallback."
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <article className="prose max-w-3xl">
      <h1>{slug.replace(/-/g, " ")}</h1>
      <p>{content[slug] ?? "Post not found."}</p>
    </article>
  );
}
