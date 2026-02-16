import Image from "next/image";
import Link from "next/link";
import { Bot } from "lucide-react";
import { ROSTER } from "@/lib/data/fighters";
import { MY_AGENTS } from "@/lib/data/mock-data";

export function MyAgents() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Bot className="h-4 w-4 text-[#7C3AED]" />
        <h2
          className="text-[10px] font-semibold uppercase tracking-[3px] text-[#7C3AED] md:text-[11px]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          My Agents
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {MY_AGENTS.map((agent) => {
          const character = ROSTER.find((f) => f.id === agent.characterId)!;
          const totalFights = agent.wins + agent.losses;
          const winRate = ((agent.wins / totalFights) * 100).toFixed(1);

          return (
            <div
              key={agent.agentName}
              className="group relative overflow-hidden rounded-[16px] border border-[#2E1065] bg-[#0B0B14] p-4 transition-all hover:border-[#7C3AED]/40"
            >
              {/* Top glow */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at top, ${character.accentColor}10 0%, transparent 70%)`,
                }}
              />

              <div className="relative flex flex-col items-center gap-3">
                {/* Character image */}
                <div
                  className="relative h-[100px] w-[80px]"
                  style={{ filter: `drop-shadow(0 0 12px ${character.glowColor}40)` }}
                >
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    sizes="80px"
                    className="object-contain object-bottom"
                  />
                </div>

                {/* Agent name */}
                <h3
                  className="text-[12px] font-bold tracking-[1px] text-white md:text-[13px]"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {agent.agentName}
                </h3>

                {/* Character name */}
                <span className="text-[9px] uppercase tracking-[2px] text-[#6B6B80]">
                  Playing as {character.name}
                </span>

                {/* Stats bars */}
                <div className="flex w-full flex-col gap-1.5">
                  {(["atk", "def", "spd"] as const).map((stat) => (
                    <div key={stat} className="flex items-center gap-2">
                      <span className="w-7 text-[8px] font-semibold uppercase text-[#6B6B80]">
                        {stat}
                      </span>
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#1a1a2e]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${character.stats[stat]}%`,
                            background: `linear-gradient(90deg, ${character.accentColor}, ${character.glowColor})`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Record */}
                <div className="flex w-full items-center justify-between border-t border-[#2E1065]/50 pt-2">
                  <span className="text-[11px] text-[#6B6B80]">
                    <span className="font-semibold text-green-400">{agent.wins}W</span>
                    {" - "}
                    <span className="font-semibold text-red-400">{agent.losses}L</span>
                  </span>
                  <span className="text-[10px] text-[#6B6B80]">{winRate}%</span>
                </div>

                {/* CTA */}
                <Link
                  href="/arena"
                  className="w-full rounded-lg border border-[#7C3AED]/40 py-1.5 text-center text-[11px] font-semibold text-[#A855F7] transition-all hover:bg-[#7C3AED]/10"
                >
                  Send to Arena
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
