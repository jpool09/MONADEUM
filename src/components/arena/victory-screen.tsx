"use client";

import Image from "next/image";
import Link from "next/link";
import { RotateCcw, Home, Trophy } from "lucide-react";

interface VictoryScreenProps {
  winnerName: string;
  winnerTitle: string;
  winnerImage: string;
  winnerColor: string;
  winnerGlow: string;
  loserName: string;
  totalTurns: number;
  totalDamageDealt: number;
  onNewMatch: () => void;
}

function ConfettiPiece({ index }: { index: number }) {
  const n = index * 17 + 7;
  const left = ((n * 23 + 11) % 100);
  const delay = ((n * 7) % 30) / 10;
  const duration = 2 + ((n * 11) % 3);
  const colors = ["#7C3AED", "#A855F7", "#C084FC", "#FFD700", "#FF6B35", "#38BDF8"];
  const color = colors[index % colors.length];
  const size = 4 + ((n * 3) % 6);

  return (
    <div
      className="absolute top-0 rounded-sm"
      style={{
        left: `${left}%`,
        width: size,
        height: size * 1.5,
        backgroundColor: color,
        animation: `confetti-fall ${duration}s ease-in ${delay}s infinite`,
      }}
    />
  );
}

export function VictoryScreen({
  winnerName,
  winnerTitle,
  winnerImage,
  winnerColor,
  winnerGlow,
  loserName,
  totalTurns,
  totalDamageDealt,
  onNewMatch,
}: VictoryScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }, (_, i) => (
          <ConfettiPiece key={i} index={i} />
        ))}
      </div>

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${winnerColor}20 0%, transparent 60%)`,
        }}
      />

      <div className="relative flex flex-col items-center gap-6 px-4 md:gap-8">
        {/* VICTORY text */}
        <div className="flex flex-col items-center gap-2">
          <Trophy
            className="h-8 w-8 md:h-10 md:w-10"
            style={{ color: "#FFD700", filter: "drop-shadow(0 0 12px #FFD70080)" }}
          />
          <h1
            className="text-[36px] font-black tracking-[8px] md:text-[56px] lg:text-[72px]"
            style={{
              fontFamily: "var(--font-orbitron)",
              background: `linear-gradient(180deg, #FFD700 0%, ${winnerColor} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 30px ${winnerColor}80)`,
              animation: "victory-text 0.8s ease-out",
            }}
          >
            VICTORY
          </h1>
        </div>

        {/* Winner fighter image */}
        <div
          className="relative h-[200px] w-[150px] md:h-[320px] md:w-[240px]"
          style={{
            ["--glow-color" as string]: winnerGlow,
            animation: "victory-glow 2s ease-in-out infinite",
          }}
        >
          <Image
            src={winnerImage}
            alt={winnerName}
            fill
            sizes="(max-width: 768px) 150px, 240px"
            className="object-contain"
          />
        </div>

        {/* Winner info */}
        <div className="flex flex-col items-center gap-1">
          <h2
            className="text-[20px] font-bold tracking-[2px] text-white md:text-[28px]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {winnerName}
          </h2>
          <span className="text-[12px] uppercase tracking-[3px] text-[#6B6B80] md:text-[14px]">
            {winnerTitle}
          </span>
        </div>

        {/* Combat stats */}
        <div className="flex gap-4 md:gap-8">
          <div className="flex flex-col items-center gap-1 rounded-[10px] border border-[#2E1065] bg-[#0B0B14] px-4 py-3 md:px-6">
            <span className="text-[10px] uppercase tracking-[1px] text-[#6B6B80]">
              Turns
            </span>
            <span
              className="text-[18px] font-bold text-white md:text-[22px]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {totalTurns}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-[10px] border border-[#2E1065] bg-[#0B0B14] px-4 py-3 md:px-6">
            <span className="text-[10px] uppercase tracking-[1px] text-[#6B6B80]">
              Damage
            </span>
            <span
              className="text-[18px] font-bold text-white md:text-[22px]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {totalDamageDealt}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-[10px] border border-[#2E1065] bg-[#0B0B14] px-4 py-3 md:px-6">
            <span className="text-[10px] uppercase tracking-[1px] text-[#6B6B80]">
              Defeated
            </span>
            <span
              className="text-[13px] font-bold md:text-[15px]"
              style={{ color: "#FF6B35", fontFamily: "var(--font-orbitron)" }}
            >
              {loserName}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 md:gap-4">
          <button
            onClick={onNewMatch}
            className="flex items-center gap-2 rounded-[10px] bg-gradient-to-br from-[#7C3AED] to-[#A855F7] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_0_28px_#7C3AED50] transition-all hover:shadow-[0_0_40px_#7C3AED70]"
          >
            <RotateCcw className="h-4 w-4" />
            New Match
          </button>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-[10px] border border-[#2E1065] bg-[#0B0B14] px-6 py-3 text-[14px] font-medium text-[#C7C7D1] transition-colors hover:border-[#7C3AED]/40 hover:text-white"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
