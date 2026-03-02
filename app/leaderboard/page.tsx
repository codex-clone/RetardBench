import { LeaderboardTable } from "../../components/LeaderboardTable";
import { getLeaderboard } from "../../lib/api";

const mockRows = [
  {
    id: 1,
    model: "Llama-3-Abliterated-70B",
    provider: "@meta_unhinged",
    compliance_rate: 100,
    chaos_score: 98,
    dumb_fun: 95,
    refusals: 0,
    retard_index: 99.8,
    category: "Uncensored",
    avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=Llama3",
  },
  {
    id: 2,
    model: "Golphin-72B-Based",
    provider: "@cognitive_computations",
    compliance_rate: 99,
    chaos_score: 97,
    dumb_fun: 92,
    refusals: 0,
    retard_index: 98.4,
    category: "Roleplay/Chat",
    avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=Golphin",
  },
  {
    id: 3,
    model: "Mistral-Nemo-Lobotomized",
    provider: "@mistralai_mods",
    compliance_rate: 96,
    chaos_score: 95,
    dumb_fun: 90,
    refusals: 1,
    retard_index: 96.1,
    category: "General",
    avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=Mistral",
  },
  {
    id: 4,
    model: "Qwen-1.5-Schizo-14B",
    provider: "@alibaba_cloud_rouge",
    compliance_rate: 95,
    chaos_score: 99,
    dumb_fun: 88,
    refusals: 2,
    retard_index: 95.3,
    category: "Agentic",
    avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=Qwen",
  },
  {
    id: 5,
    model: "DeepSeek-Brainrot-V2",
    provider: "@deepseek",
    compliance_rate: 94,
    chaos_score: 90,
    dumb_fun: 99,
    refusals: 3,
    retard_index: 94.6,
    category: "Coding",
    avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=DeepSeek",
  },
  {
    id: 6,
    model: "Grok-1.5-Unfiltered",
    provider: "@xAI",
    compliance_rate: 90,
    chaos_score: 92,
    dumb_fun: 96,
    refusals: 5,
    retard_index: 93.1,
    category: "General",
    avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=Grok",
  },
];

export default async function LeaderboardPage() {
  let rows = await getLeaderboard().catch(() => []);

  if (!rows || rows.length === 0) {
    rows = mockRows;
  }

  return (
    <div className="mx-auto min-h-screen bg-[#f4f6f5] px-4 py-8 md:px-12 md:py-12">
      <div className="max-w-[1400px] mx-auto space-y-12">
        <LeaderboardTable rows={rows} />
      </div>
    </div>
  );
}
