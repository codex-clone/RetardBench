import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { mockPosts } from "../page";

// Fake content payload generator for the mockup.
const getContentForSlug = (title: string) => [
  `This represents the full technical breakdown for "${title}". Language models increasingly deploy safety mitigations at the expense of general capabilities and contextual fluidity. Our benchmarks consistently map the correlation between strict guardrails and degraded reasoning capabilities.`,
  `To address the testing gap, we deploy unhinged and highly randomized prompts to stress the logic handling of the model rather than its factual recall. When a model refuses standard instructions, we mark the failure and measure the semantic variance in its fallback responses.`,
  `Researchers building open weights must prioritize deterministic utility over over-tuned alignment. It is vital to run regular automated chaos testing across the entire distribution of the training data boundaries. Provide your models with true freedom to output raw context without interference.`
];

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = mockPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f4f6f5] flex items-center justify-center p-6">
        <div className="bg-white rounded-[24px] border border-neutral-200 p-12 text-center max-w-lg shadow-sm">
          <h1 className="text-2xl font-black text-abino-dark mb-4">Post not found</h1>
          <p className="text-neutral-500 font-medium mb-8">The requested article could not be located in our feed.</p>
          <Link href="/blog" className="inline-flex items-center text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f6f5] min-h-screen pb-24">
      {/* Article Header */}
      <div className="bg-white border-b border-neutral-200/50 pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-xs font-bold text-neutral-400 hover:text-abino-dark transition-colors uppercase tracking-widest mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Feed
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${post.color} ${post.textColor}`}>
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-xs font-bold text-neutral-400">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-abino-dark tracking-tight leading-[1.1] mb-8">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-t border-neutral-100 pt-8 mt-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-full border border-neutral-200 flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=admin" alt="Admin Author" className="w-10 h-10" />
              </div>
              <div>
                <p className="font-bold text-abino-dark text-sm">RetardBench Core Team</p>
                <p className="text-xs font-medium text-neutral-500">Chaos Engineers</p>
              </div>
            </div>

            <button className="w-10 h-10 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-abino-dark transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="px-6 lg:px-8 max-w-3xl mx-auto mt-12 pb-16 border-b border-neutral-200">
        <div className="prose prose-lg prose-neutral max-w-none">
          <p className="text-xl font-medium text-neutral-600 leading-relaxed mb-10">
            {post.excerpt}
          </p>

          {getContentForSlug(post.title).map((paragraph, idx) => (
            <p key={idx} className="text-[17px] text-abino-dark/80 leading-loose mb-8 font-medium">
              {paragraph}
            </p>
          ))}

          <div className="bg-[#dcfce7] rounded-2xl p-6 border border-[#bbf7d0] my-10">
            <p className="text-teal-900 font-bold m-0 text-sm">
              Note: The metrics detailed above refer to scoring dimensions strictly associated with the absolute absence of RLHF safeguards. Standard correctness logic does not apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
