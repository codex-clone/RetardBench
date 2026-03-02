export default function ContactPage() {
  return (
    <div className="main-container mx-auto mt-6 px-6 py-20 md:px-16 md:py-32">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center mb-16 relative">
          <div className="absolute left-[5%] top-[10%] deco-square text-slate-800 opacity-20 hidden md:block rotate-12"></div>

          <h1 className="hero-heading mb-6">Get in <span className="italic">Touch</span></h1>
          <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-slate-500 font-medium">
            Questions, partnerships, or dataset contributions? Reach the maintainers through GitHub Issues and Discussions.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-10 border border-slate-100 max-w-2xl mx-auto text-center shadow-sm">
           <div className="mb-6 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-indigo-100 text-indigo-600 shadow-sm">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
           </div>

           <h2 className="text-2xl font-bold text-slate-900 mb-4">Preferred Method</h2>
           <p className="text-[16px] leading-relaxed text-slate-600 font-medium mb-8">
             Open a GitHub issue with context, expected behavior, and reproducible details.
           </p>

           <a href="https://github.com/retardbench/retardbench/issues" className="btn-primary inline-flex items-center gap-2">
             Open GitHub Issue
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
           </a>
        </div>
      </div>
    </div>
  );
}
