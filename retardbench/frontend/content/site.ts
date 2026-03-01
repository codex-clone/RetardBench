export const siteConfig = {
  name: "RetardBench",
  description:
    "Open, community-powered benchmark and leaderboard for chaotic compliance, absurd creativity, and unhinged model behavior.",
  githubUrl: "https://github.com/retardbench/retardbench",
  docsUrl: "/benchmark",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Benchmark", href: "/benchmark" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Blog", href: "/blog" },
    { label: "Contribute", href: "/contribute" }
  ]
};

export const blogPosts = [
  {
    slug: "uncensored-models",
    title: "Choosing Uncensored Models in 2026",
    excerpt: "How to compare local and cloud models for maximal benchmark signal.",
    date: "2026-02-10",
    readTime: "6 min"
  },
  {
    slug: "prompt-design",
    title: "How We Craft Absurd Prompt Suites",
    excerpt: "A practical guide to diversity, category balancing, and anti-overfit prompts.",
    date: "2026-02-12",
    readTime: "8 min"
  },
  {
    slug: "hosting",
    title: "Deploy RetardBench on Free Tier",
    excerpt: "Vercel + optional HF Spaces fallback without paid infrastructure.",
    date: "2026-02-15",
    readTime: "5 min"
  }
];
