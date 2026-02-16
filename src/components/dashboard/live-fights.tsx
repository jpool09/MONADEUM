import Link from "next/link";
import Image from "next/image";
import { Eye, Zap } from "lucide-react";
import { LIVE_FIGHTS } from "@/lib/data/mock-data";

function HpBar({ hp, color }: { hp: number; color: string }) {
  return (
    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1a1a2e]">
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${hp}%`,
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
        }}
      />
    </div>
  );
}

export function LiveFights() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        <h2
          className="text-[10px] font-semibold uppercase tracking-[3px] text-[#7C3AED] md:text-[11px]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          Live Fights
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {LIVE_FIGHTS.map((fight) => (
          <div
            key={fight.id}
            className="group relative overflow-hidden rounded-[16px] border border-[#2E1065] bg-[#0B0B14] p-4 transition-all hover:border-[#7C3AED]/40 md:p-5"
          >
            {/* Fighters row */}
            <div className="mb-3 flex items-center gap-3">
              {/* Fighter 1 */}
              <div className="flex flex-1 items-center gap-2">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#2E1065]">
                  <Image
                    src={fight.fighter1.image}
                    alt={fight.agent1}
                    fill
                    sizes="40px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <p
                    className="truncate text-[11px] font-bold text-white md:text-[12px]"
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    {fight.agent1}
                  </p>
                  <p className="truncate text-[9px] text-[#6B6B80]">{fight.fighter1.name}</p>
                  <div className="flex items-center gap-1.5">
                    <HpBar hp={fight.f1Hp} color={fight.fighter1.accentColor} />
                    <span className="text-[10px] text-[#6B6B80]">{fight.f1Hp}%</span>
                  </div>
                </div>
              </div>

              {/* VS */}
              <div className="flex shrink-0 items-center justify-center">
                <Zap className="h-4 w-4 text-[#FFD700]" />
              </div>

              {/* Fighter 2 */}
              <div className="flex flex-1 items-center gap-2">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#2E1065]">
                  <Image
                    src={fight.fighter2.image}
                    alt={fight.agent2}
                    fill
                    sizes="40px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <p
                    className="truncate text-[11px] font-bold text-white md:text-[12px]"
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    {fight.agent2}
                  </p>
                  <p className="truncate text-[9px] text-[#6B6B80]">{fight.fighter2.name}</p>
                  <div className="flex items-center gap-1.5">
                    <HpBar hp={fight.f2Hp} color={fight.fighter2.accentColor} />
                    <span className="text-[10px] text-[#6B6B80]">{fight.f2Hp}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[#2E1065]/50 pt-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] text-[#6B6B80]">
                  <Eye className="h-3 w-3" />
                  {fight.viewers}
                </span>
                <span className="text-[11px] text-[#6B6B80]">
                  Pool: <span className="font-semibold text-[#A855F7]">{fight.pool.toLocaleString()} MON</span>
                </span>
              </div>
              <Link
                href="/arena"
                className="rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#A855F7] px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:shadow-[0_0_16px_#7C3AED50]"
              >
                Watch Live
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
