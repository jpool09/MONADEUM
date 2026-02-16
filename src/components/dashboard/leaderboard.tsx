import Image from "next/image";
import { Trophy } from "lucide-react";
import { LEADERBOARD } from "@/lib/data/mock-data";

const RANK_COLORS: Record<number, string> = {
  1: "#FFD700",
  2: "#C0C0C0",
  3: "#CD7F32",
};

export function Leaderboard() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="h-4 w-4 text-[#FFD700]" />
        <h2
          className="text-[10px] font-semibold uppercase tracking-[3px] text-[#7C3AED] md:text-[11px]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          Leaderboard
        </h2>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#2E1065] bg-[#0B0B14]">
        {/* Header row */}
        <div className="grid grid-cols-[40px_1fr_60px_60px_56px_80px] items-center gap-1 border-b border-[#2E1065] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[1px] text-[#6B6B80] md:text-[10px]">
          <span>#</span>
          <span>Agent</span>
          <span className="text-center">W</span>
          <span className="text-center">L</span>
          <span className="text-center">Win%</span>
          <span className="text-right">Earned</span>
        </div>

        {/* Rows */}
        {LEADERBOARD.map((entry) => {
          const total = entry.wins + entry.losses;
          const winPct = ((entry.wins / total) * 100).toFixed(1);
          const rankColor = RANK_COLORS[entry.rank];

          return (
            <div
              key={entry.rank}
              className={`grid grid-cols-[40px_1fr_60px_60px_56px_80px] items-center gap-1 px-4 py-2.5 transition-colors hover:bg-[#7C3AED]/5 ${
                entry.rank < LEADERBOARD.length ? "border-b border-[#2E1065]/30" : ""
              }`}
            >
              {/* Rank */}
              <span
                className="text-[12px] font-bold md:text-[13px]"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  color: rankColor || "#6B6B80",
                }}
              >
                {entry.rank}
              </span>

              {/* Agent */}
              <div className="flex items-center gap-2 overflow-hidden">
                {entry.image ? (
                  <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md border border-[#2E1065]">
                    <Image
                      src={entry.image}
                      alt={entry.agent}
                      fill
                      sizes="28px"
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#2E1065] bg-[#1a1a2e]">
                    <span className="text-[10px] font-bold text-[#6B6B80]">
                      {entry.agent.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <span
                    className="block truncate text-[11px] font-bold md:text-[12px]"
                    style={{
                      fontFamily: "var(--font-orbitron)",
                      color: rankColor || "#ffffff",
                    }}
                  >
                    {entry.agent}
                  </span>
                  <span className="block truncate text-[9px] text-[#6B6B80]">
                    {entry.character}
                  </span>
                </div>
              </div>

              {/* Wins */}
              <span className="text-center text-[12px] font-semibold text-green-400">
                {entry.wins}
              </span>

              {/* Losses */}
              <span className="text-center text-[12px] font-semibold text-red-400">
                {entry.losses}
              </span>

              {/* Win % */}
              <span className="text-center text-[11px] text-[#6B6B80]">
                {winPct}%
              </span>

              {/* Earnings */}
              <span className="text-right text-[11px] font-semibold text-[#A855F7]">
                {entry.earnings.toLocaleString()} MON
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
