"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Swords, RotateCcw } from "lucide-react";
import { Starfield } from "@/components/landing/starfield";
import { EmberParticles } from "./ember-particles";
import { FighterCard } from "./fighter-card";
import { VsBadge } from "./vs-badge";

interface Fighter {
  id: string;
  name: string;
  title: string;
  image: string;
  accentColor: string;
  glowColor: string;
  health: number;
  stats: { atk: number; def: number; spd: number };
}

const ROSTER: Fighter[] = [
  {
    id: "gladiator",
    name: "IRON CENTURION",
    title: "The Unbreakable",
    image: "/images/gladiador.png",
    accentColor: "#7C3AED",
    glowColor: "#A855F7",
    health: 92,
    stats: { atk: 75, def: 90, spd: 60 },
  },
  {
    id: "beast",
    name: "WARBEAST",
    title: "The Horned Terror",
    image: "/images/armored.png",
    accentColor: "#C084FC",
    glowColor: "#7C3AED",
    health: 88,
    stats: { atk: 85, def: 80, spd: 55 },
  },
  {
    id: "fiery",
    name: "HELLFORGE",
    title: "The Infernal Titan",
    image: "/images/fiery.png",
    accentColor: "#FF6B35",
    glowColor: "#FF4500",
    health: 87,
    stats: { atk: 95, def: 65, spd: 70 },
  },
];

export function BattleScene() {
  const [leftFighter, setLeftFighter] = useState<Fighter | null>(null);
  const [rightFighter, setRightFighter] = useState<Fighter | null>(null);
  const [selectingSide, setSelectingSide] = useState<"left" | "right">("left");

  const bothSelected = leftFighter && rightFighter;

  function handleSelect(fighter: Fighter) {
    if (selectingSide === "left") {
      setLeftFighter(fighter);
      setSelectingSide("right");
    } else {
      setRightFighter(fighter);
    }
  }

  function handleReset() {
    setLeftFighter(null);
    setRightFighter(null);
    setSelectingSide("left");
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-black">
      {/* Background layers */}
      <Starfield dense />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, #7C3AED12 0%, #4C1D9508 30%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.08]">
        <div className="relative h-[80%] w-[80%]">
          <Image
            src="/images/coliseomonad.png"
            alt=""
            fill
            sizes="80vw"
            className="object-contain"
            aria-hidden="true"
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to top, #7C3AED08 0%, #4C1D9505 30%, transparent 100%)",
        }}
      />
      <EmberParticles />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, #000000cc 100%)",
        }}
      />

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-5 py-4 md:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-[#6B6B80] transition-colors hover:bg-[#7C3AED]/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <Swords className="h-4 w-4 text-[#7C3AED]" />
          <span
            className="text-[11px] font-bold tracking-[3px] text-[#6B6B80] md:text-[13px]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            MONADEUM ARENA
          </span>
        </div>

        {bothSelected ? (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-[#6B6B80] transition-colors hover:bg-[#7C3AED]/10 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">New Match</span>
          </button>
        ) : (
          <div className="w-[100px]" />
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 md:px-8">
        {!bothSelected ? (
          /* ==================== SELECTION PHASE ==================== */
          <div className="flex w-full max-w-[900px] flex-col items-center gap-6 md:gap-10">
            {/* Title */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[3px] text-[#7C3AED] md:text-[12px]">
                {selectingSide === "left"
                  ? "Choose Your Champion"
                  : "Choose Your Opponent"}
              </span>
              <h1
                className="text-center text-[20px] font-bold tracking-[-0.5px] text-white md:text-[28px] lg:text-[32px]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                Select Fighter
              </h1>
            </div>

            {/* Selection slots indicator */}
            <div className="flex items-center gap-4 md:gap-6">
              <div
                className={`flex h-12 w-28 items-center justify-center rounded-[10px] border text-[12px] font-bold tracking-[1px] transition-all md:h-14 md:w-36 md:text-[13px] ${
                  leftFighter
                    ? "border-[#7C3AED]/50 bg-[#7C3AED]/10 text-white"
                    : selectingSide === "left"
                      ? "border-[#7C3AED] bg-[#7C3AED]/5 text-[#7C3AED] shadow-[0_0_20px_#7C3AED30]"
                      : "border-[#2E1065] bg-[#0B0B14] text-[#6B6B80]"
                }`}
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {leftFighter ? leftFighter.name.split(" ")[0] : "PLAYER 1"}
              </div>

              <span
                className="text-[16px] font-black text-[#6B6B80] md:text-[20px]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                VS
              </span>

              <div
                className={`flex h-12 w-28 items-center justify-center rounded-[10px] border text-[12px] font-bold tracking-[1px] transition-all md:h-14 md:w-36 md:text-[13px] ${
                  rightFighter
                    ? "border-[#FF6B35]/50 bg-[#FF6B35]/10 text-white"
                    : selectingSide === "right"
                      ? "border-[#FF6B35] bg-[#FF6B35]/5 text-[#FF6B35] shadow-[0_0_20px_#FF6B3530]"
                      : "border-[#2E1065] bg-[#0B0B14] text-[#6B6B80]"
                }`}
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {rightFighter ? rightFighter.name.split(" ")[0] : "PLAYER 2"}
              </div>
            </div>

            {/* Fighter roster grid */}
            <div className="grid w-full grid-cols-3 gap-3 md:gap-5">
              {ROSTER.map((fighter) => {
                const isSelected =
                  leftFighter?.id === fighter.id ||
                  rightFighter?.id === fighter.id;
                const isDisabled = isSelected;

                return (
                  <button
                    key={fighter.id}
                    onClick={() => !isDisabled && handleSelect(fighter)}
                    disabled={isDisabled}
                    className={`group relative flex flex-col items-center gap-2 rounded-[16px] border p-3 transition-all md:gap-3 md:p-5 ${
                      isSelected
                        ? "border-[#7C3AED]/30 bg-[#7C3AED]/5 opacity-40"
                        : "border-[#2E1065] bg-[#0B0B14]/80 hover:border-[#7C3AED]/60 hover:bg-[#0B0B14] hover:shadow-[0_0_30px_#7C3AED20]"
                    }`}
                  >
                    {/* Fighter image */}
                    <div
                      className={`relative h-[140px] w-[100px] md:h-[220px] md:w-[160px] lg:h-[280px] lg:w-[200px] ${
                        !isSelected
                          ? "transition-transform duration-300 group-hover:scale-105"
                          : ""
                      }`}
                      style={
                        !isSelected
                          ? {
                              filter: `drop-shadow(0 0 15px ${fighter.glowColor}40)`,
                            }
                          : undefined
                      }
                    >
                      <Image
                        src={fighter.image}
                        alt={fighter.name}
                        fill
                        sizes="(max-width: 768px) 100px, (max-width: 1024px) 160px, 200px"
                        className="object-contain object-bottom"
                      />
                    </div>

                    {/* Fighter name */}
                    <h3
                      className="text-[11px] font-bold tracking-[1px] text-white md:text-[14px]"
                      style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                      {fighter.name}
                    </h3>
                    <span className="text-[9px] uppercase tracking-[2px] text-[#6B6B80] md:text-[11px]">
                      {fighter.title}
                    </span>

                    {/* Stat bars */}
                    <div className="flex w-full flex-col gap-1.5 px-1">
                      {(["atk", "def", "spd"] as const).map((stat) => (
                        <div key={stat} className="flex items-center gap-2">
                          <span className="w-7 text-[8px] font-semibold uppercase text-[#6B6B80] md:text-[9px]">
                            {stat}
                          </span>
                          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#1a1a2e] md:h-1.5">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${fighter.stats[stat]}%`,
                                background: `linear-gradient(90deg, ${fighter.accentColor}, ${fighter.glowColor})`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Selected badge */}
                    {isSelected && (
                      <div className="absolute right-2 top-2 rounded-full bg-[#7C3AED] px-2 py-0.5 text-[8px] font-bold text-white md:text-[10px]">
                        PICKED
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ==================== BATTLE PHASE ==================== */
          <div className="flex w-full max-w-[1200px] flex-col items-center gap-4 md:gap-8">
            {/* Match title */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium uppercase tracking-[3px] text-[#7C3AED] md:text-[12px]">
                Exhibition Match
              </span>
              <h1
                className="text-center text-[18px] font-bold tracking-[-0.5px] text-white md:text-[24px] lg:text-[28px]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                Champions of the Colosseum
              </h1>
            </div>

            {/* Battle stage */}
            <div className="flex w-full items-center justify-center gap-2 md:gap-4 lg:gap-8">
              {/* Left Fighter */}
              <div className="flex flex-1 justify-center lg:justify-end">
                <FighterCard
                  name={leftFighter.name}
                  title={leftFighter.title}
                  image={leftFighter.image}
                  side="left"
                  accentColor={leftFighter.accentColor}
                  glowColor={leftFighter.glowColor}
                  health={leftFighter.health}
                />
              </div>

              {/* VS Badge */}
              <div className="flex shrink-0 items-center justify-center px-2 md:px-6">
                <VsBadge />
              </div>

              {/* Right Fighter */}
              <div className="flex flex-1 justify-center lg:justify-start">
                <FighterCard
                  name={rightFighter.name}
                  title={rightFighter.title}
                  image={rightFighter.image}
                  side="right"
                  accentColor={rightFighter.accentColor}
                  glowColor={rightFighter.glowColor}
                  health={rightFighter.health}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="relative z-20 flex flex-col items-center gap-2 px-5 py-4 md:py-6">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#7C3AED]/40" />
          <span
            className="text-[10px] font-semibold uppercase tracking-[4px] text-[#7C3AED]/60 md:text-[12px]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Coming Soon
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#7C3AED]/40" />
        </div>
        <p className="text-center text-[11px] text-[#6B6B80] md:text-[13px]">
          Turn-based combat with real stakes on the Monad blockchain
        </p>
      </div>
    </div>
  );
}
