"use client";

import { useEffect, useRef } from "react";

export interface LogEntry {
  id: number;
  type: "system" | "thinking" | "attack" | "defend" | "critical" | "victory";
  fighterName?: string;
  fighterColor?: string;
  message: string;
  timestamp: number;
}

interface BattleLogProps {
  entries: LogEntry[];
}

const TYPE_LABELS: Record<LogEntry["type"], string> = {
  system: "SYS",
  thinking: "AI",
  attack: "ATK",
  defend: "DEF",
  critical: "CRIT",
  victory: "WIN",
};

const TYPE_COLORS: Record<LogEntry["type"], string> = {
  system: "#6B6B80",
  thinking: "#38BDF8",
  attack: "#FF6B35",
  defend: "#7C3AED",
  critical: "#FFD700",
  victory: "#A855F7",
};

export function BattleLog({ entries }: BattleLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className="flex h-full flex-col rounded-[12px] border border-[#2E1065] bg-[#0B0B14]/90 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#2E1065] px-4 py-2.5">
        <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        <span
          className="text-[11px] font-bold tracking-[2px] text-[#6B6B80]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          BATTLE LOG
        </span>
      </div>

      {/* Log entries */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
        style={{ maxHeight: 300 }}
      >
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex gap-2 text-[12px] leading-[1.6]"
            style={{ animation: "slide-up 0.3s ease-out" }}
          >
            {/* Tag */}
            <span
              className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold"
              style={{
                color: TYPE_COLORS[entry.type],
                background: `${TYPE_COLORS[entry.type]}15`,
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              {TYPE_LABELS[entry.type]}
            </span>

            {/* Message */}
            <span
              className="text-[#C7C7D1]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {entry.fighterName && (
                <span
                  className="font-bold"
                  style={{ color: entry.fighterColor || "#fff" }}
                >
                  {entry.fighterName}
                </span>
              )}{" "}
              {entry.message}
            </span>
          </div>
        ))}

        {entries.length === 0 && (
          <div className="flex flex-1 items-center justify-center">
            <span className="text-[12px] text-[#6B6B80]">
              Waiting for battle to begin...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
