import Link from "next/link";

const posts = [
  { slug: "uncensored-models", title: "Choosing Uncensored Models in 2026" },
  { slug: "prompt-design", title: "How We Craft Absurd Prompt Suites" },
  { slug: "hosting", title: "Deploy RetardBench on Free Tier" }
];

export default function BlogPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.slug} className="rounded border bg-white p-4">
            <Link href={`/blog/${p.slug}`} className="font-medium">{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
