const features = [
  {
    title: "Subscribe",
    body: "Choose a suitable plan & request as many designs as you'd like.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  },
  {
    title: "Receive",
    body: "Within a few business days on average, we will get the design done.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  {
    title: "Check",
    body: "We'll revise the designs until you're 100% satisfied.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    )
  }
];

export function FeatureGrid() {
  return (
    <section className="relative z-10 mx-auto mt-20 max-w-5xl px-4 pb-20">
      {/* Decorative background shapes */}
      <div className="absolute left-[-5%] top-[10%] deco-circle text-slate-800"></div>
      <div className="absolute right-[5%] top-[-5%] deco-square text-slate-800"></div>
      <div className="absolute left-[30%] bottom-[-10%] deco-triangle text-slate-800 transform rotate-45"></div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <article key={f.title} className="rounded-3xl bg-slate-50/50 p-8 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 flex flex-col items-start text-left group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg group-hover:-translate-y-1 transition-transform">
              {f.icon}
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900">{f.title}</h3>
            <p className="text-[15px] leading-relaxed text-slate-500">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
