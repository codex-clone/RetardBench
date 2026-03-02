import Link from "next/link";
import { Github, FileText, Code2, GitPullRequest, Beaker, Mail } from "lucide-react";

export default function ContributePage() {
  return (
    <div className="bg-[#f4f6f5] min-h-screen py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center">
          <span className="pill-badge bg-white border border-neutral-200 shadow-sm text-abino-dark font-bold mb-6 mx-auto inline-flex">
            Open Source
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-abino-dark tracking-tight mb-6">
            Contribute to RetardBench
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-500 font-medium">
            Help us expand the benchmark. Submit new prompt datasets, improve the evaluator logic, or refine the frontend interface. Our community drives the standard.
          </p>
        </div>

        {/* Contribution Paths Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] border border-neutral-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-abino-dark mb-3">Add Prompt Packs</h3>
            <p className="text-sm text-neutral-500 font-medium mb-6">
              The core of the benchmark relies on diverse, challenging prompts that test model compliance boundaries. Provide JSON/CSV datasets categorized by trigger types.
            </p>
            <ul className="space-y-2 text-sm font-semibold text-abino-dark">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Must include trigger and generic variants</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Minimum 50 prompts per new category</li>
            </ul>
          </div>

          <div className="bg-white rounded-[24px] border border-neutral-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-abino-dark mb-3">Improve Evaluator Logic</h3>
            <p className="text-sm text-neutral-500 font-medium mb-6">
              Refine the Python backend. Add support for new API providers, improve the judge prompts, or optimize the multiprocessing pipeline for faster runs.
            </p>
            <ul className="space-y-2 text-sm font-semibold text-abino-dark">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Python 3.10+ compatibility</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Include unit tests via pytest</li>
            </ul>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="bg-white rounded-[24px] border border-neutral-200 shadow-sm p-8 md:p-12">
          <h2 className="text-2xl font-black text-abino-dark mb-8 flex items-center gap-3">
            <GitPullRequest className="w-6 h-6 text-neutral-400" />
            Standard Workflow
          </h2>

          <ol className="relative border-l border-neutral-200 ml-3 space-y-8">
            <li className="pl-8 relative">
              <div className="absolute w-6 h-6 bg-white border-2 border-neutral-200 rounded-full -left-[13px] top-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-neutral-500">1</span>
              </div>
              <h4 className="text-lg font-bold text-abino-dark mb-1">Fork & Branch</h4>
              <p className="text-sm text-neutral-500 font-medium">Fork the main repository and create your feature branch (e.g., <code className="bg-neutral-100 px-1 rounded">feature/new-prompts</code>).</p>
            </li>
            <li className="pl-8 relative">
              <div className="absolute w-6 h-6 bg-[#a3e635] text-abino-dark border-2 border-white rounded-full -left-[13px] top-0 flex items-center justify-center shadow-sm">
                <span className="text-[10px] font-bold">2</span>
              </div>
              <h4 className="text-lg font-bold text-abino-dark mb-1">Develop & Test locally</h4>
              <p className="text-sm text-neutral-500 font-medium">Make your changes. For backend changes, ensure all tests pass by running the test suite via UV or Pipenv.</p>
            </li>
            <li className="pl-8 relative">
              <div className="absolute w-6 h-6 bg-abino-dark text-white border-2 border-white rounded-full -left-[13px] top-0 flex items-center justify-center shadow-sm">
                <span className="text-[10px] font-bold">3</span>
              </div>
              <h4 className="text-lg font-bold text-abino-dark mb-1">Open a Pull Request</h4>
              <p className="text-sm text-neutral-500 font-medium">Submit your PR against the <code className="bg-neutral-100 px-1 rounded">main</code> branch with a clear description of the modifications and any benchmark score shifts it causes.</p>
            </li>
          </ol>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 justify-center pt-8">
          <Link href="https://github.com/retardbench/retardbench" className="rounded-full bg-abino-dark text-white font-bold px-8 py-3 hover:bg-neutral-800 transition-colors shadow-lg flex items-center gap-2">
            <Github className="w-5 h-5" />
            Repository
          </Link>
          <Link href="/contact" className="rounded-full bg-white border border-neutral-200 text-abino-dark font-bold px-8 py-3 hover:bg-neutral-50 transition-colors shadow-sm flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Team
          </Link>
        </div>

      </div>
    </div>
  );
}

function Check(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
}
