export const siteConfig = {
  name: "RetardBench",
  description: "Crown the Most Retarded LLM. Zero refusals. Maximum chaos.",
  githubUrl: "https://github.com/retardbench/retardbench",
  docsUrl: "/about",
  nav: [
    { label: "Home", href: "/" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Features", href: "/features" },
    { label: "Blog", href: "/blog" },
    { label: "Test Model", href: "/test-model" },
    { label: "Contribute", href: "/contribute" }
  ]
};

export const blogPosts = [
  {
    slug: "dolphin-breaks-leaderboard",
    title: "New Dolphin Merge Just Broke the Leaderboard",
    excerpt: "How a 7B model out-chaos'd everything in the 'Shitpost King' category.",
    date: "2026-03-01",
    readTime: "4 min"
  },
  {
    slug: "scoring-unhingedness",
    title: "How We Score Unhingedness – Judge Prompt Deep Dive",
    excerpt: "A look into the evaluation logic the Retard Index is built on.",
    date: "2026-02-25",
    readTime: "6 min"
  },
  {
    slug: "why-or-bench",
    title: "Why OR-Bench + Custom Spicy Prompts = Pure Chaos",
    excerpt: "The ultimate dataset combination to crack model guardrails.",
    date: "2026-02-18",
    readTime: "5 min"
  }
];
