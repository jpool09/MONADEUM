import Link from "next/link";
import { Swords, Users, Trophy as TrophyIcon } from "lucide-react";
import { ARENAS, type Arena } from "@/lib/data/mock-data";

function StatusBadge({ status }: { status: Arena["status"] }) {
  const config = {
    live: {
      label: "LIVE",
      classes: "bg-red-500/15 text-red-400 border-red-500/30",
      pulse: true,
    },
    upcoming: {
      label: "UPCOMING",
      classes: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
      pulse: false,
    },
    completed: {
      label: "COMPLETED",
      classes: "bg-[#6B6B80]/15 text-[#6B6B80] border-[#6B6B80]/30",
      pulse: false,
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-[1px] ${config.classes}`}
    >
      {config.pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
        </span>
      )}
      {config.label}
    </span>
  );
}

export function ArenasList() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Swords className="h-4 w-4 text-[#7C3AED]" />
        <h2
          className="text-[10px] font-semibold uppercase tracking-[3px] text-[#7C3AED] md:text-[11px]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          Arenas
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        {ARENAS.map((arena) => (
          <div
            key={arena.id}
            className="flex items-center justify-between rounded-[12px] border border-[#2E1065] bg-[#0B0B14] px-4 py-3 transition-all hover:border-[#7C3AED]/40"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-[12px] font-bold text-white md:text-[13px]"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {arena.name}
                </span>
                <StatusBadge status={arena.status} />
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#6B6B80]">
                <span className="flex items-center gap-1">
                  <TrophyIcon className="h-3 w-3" />
                  {arena.prizePool.toLocaleString()} MON
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {arena.participants}
                </span>
                <span>Entry: {arena.entryFee} MON</span>
              </div>
            </div>

            {arena.status !== "completed" ? (
              <Link
                href="/arena"
                className="shrink-0 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#A855F7] px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:shadow-[0_0_16px_#7C3AED50]"
              >
                Enter
              </Link>
            ) : (
              <span className="shrink-0 rounded-lg border border-[#2E1065] px-3 py-1.5 text-[11px] font-semibold text-[#6B6B80]">
                Ended
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
