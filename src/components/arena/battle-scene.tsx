"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Swords, RotateCcw } from "lucide-react";
import { Starfield } from "@/components/landing/starfield";
import { EmberParticles } from "./ember-particles";
import { FighterCard } from "./fighter-card";
import { VsBadge } from "./vs-badge";
import { BattleLog, type LogEntry } from "./battle-log";
import { BettingPanel } from "./betting-panel";
import { VictoryScreen } from "./victory-screen";
import { ROSTER, type Fighter } from "@/lib/data/fighters";

const ATTACK_NAMES = [
  "Heavy Strike",
  "Swift Slash",
  "Power Slam",
  "Counter Attack",
  "Crushing Blow",
  "Fury Combo",
];

type BattlePhase = "selection" | "countdown" | "fighting" | "victory";

function calcOdds(left: Fighter, right: Fighter) {
  const lPower = left.stats.atk + left.stats.def * 0.5 + left.stats.spd * 0.3;
  const rPower = right.stats.atk + right.stats.def * 0.5 + right.stats.spd * 0.3;
  const total = lPower + rPower;
  const leftWinProb = lPower / total;
  const rightWinProb = rPower / total;
  return {
    left: +(1 / leftWinProb).toFixed(2),
    right: +(1 / rightWinProb).toFixed(2),
  };
}

function calcDamage(attacker: Fighter, defender: Fighter): number {
  const rand = 0.7 + Math.random() * 0.6;
  const raw = attacker.stats.atk * rand - defender.stats.def * 0.3;
  return Math.max(5, Math.round(raw));
}

export function BattleScene() {
  const [leftFighter, setLeftFighter] = useState<Fighter | null>(null);
  const [rightFighter, setRightFighter] = useState<Fighter | null>(null);
  const [selectingSide, setSelectingSide] = useState<"left" | "right">("left");
  const [phase, setPhase] = useState<BattlePhase>("selection");
  const [countdown, setCountdown] = useState(3);

  // Battle state
  const [leftHp, setLeftHp] = useState(100);
  const [rightHp, setRightHp] = useState(100);
  const [attackingside, setAttackingSide] = useState<"left" | "right" | null>(null);
  const [damagedSide, setDamagedSide] = useState<"left" | "right" | null>(null);
  const [leftDamageText, setLeftDamageText] = useState<string | undefined>();
  const [rightDamageText, setRightDamageText] = useState<string | undefined>();
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [winner, setWinner] = useState<"left" | "right" | null>(null);
  const [turnCount, setTurnCount] = useState(0);
  const [totalDamage, setTotalDamage] = useState(0);

  const logIdRef = useRef(0);
  const battleActiveRef = useRef(false);

  const addLog = useCallback(
    (
      type: LogEntry["type"],
      message: string,
      fighterName?: string,
      fighterColor?: string
    ) => {
      logIdRef.current += 1;
      setLogEntries((prev) => [
        ...prev,
        {
          id: logIdRef.current,
          type,
          message,
          fighterName,
          fighterColor,
          timestamp: Date.now(),
        },
      ]);
    },
    []
  );

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
    battleActiveRef.current = false;
    setLeftFighter(null);
    setRightFighter(null);
    setSelectingSide("left");
    setPhase("selection");
    setCountdown(3);
    setLeftHp(100);
    setRightHp(100);
    setAttackingSide(null);
    setDamagedSide(null);
    setLeftDamageText(undefined);
    setRightDamageText(undefined);
    setLogEntries([]);
    setWinner(null);
    setTurnCount(0);
    setTotalDamage(0);
    logIdRef.current = 0;
  }

  // Start countdown when both fighters are selected
  useEffect(() => {
    if (bothSelected && phase === "selection") {
      const timer = setTimeout(() => setPhase("countdown"), 800);
      return () => clearTimeout(timer);
    }
  }, [bothSelected, phase]);

  // Countdown timer
  useEffect(() => {
    if (phase !== "countdown") return;

    if (countdown === 0) {
      setPhase("fighting");
      addLog("system", "FIGHT!", undefined, undefined);
      return;
    }

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, countdown, addLog]);

  // Battle simulation loop
  useEffect(() => {
    if (phase !== "fighting" || !leftFighter || !rightFighter) return;

    battleActiveRef.current = true;
    let currentLeftHp = leftHp;
    let currentRightHp = rightHp;
    let turn = turnCount;
    let dmgTotal = totalDamage;

    // Determine who goes first by SPD
    const leftFirst = leftFighter.stats.spd >= rightFighter.stats.spd;
    const first = leftFirst ? "left" : "right";
    const second = leftFirst ? "right" : "left";
    const firstFighter = leftFirst ? leftFighter : rightFighter;
    const secondFighter = leftFirst ? rightFighter : leftFighter;

    function runTurn(
      attackerSide: "left" | "right",
      attacker: Fighter,
      defender: Fighter,
      defHp: number,
    ): { newHp: number; damage: number } {
      const damage = calcDamage(attacker, defender);
      const attackName =
        ATTACK_NAMES[Math.floor(Math.random() * ATTACK_NAMES.length)];
      const newHp = Math.max(0, defHp - damage);
      return { newHp, damage };
    }

    async function runBattle() {
      // Delay helper
      const wait = (ms: number) =>
        new Promise((r) => setTimeout(r, ms));

      while (currentLeftHp > 0 && currentRightHp > 0 && battleActiveRef.current) {
        turn++;

        // --- First attacker ---
        const firstAttackerFighter = firstFighter;
        const firstDefenderFighter = secondFighter;

        addLog(
          "thinking",
          "is analyzing opponent...",
          firstAttackerFighter.name,
          firstAttackerFighter.accentColor
        );
        setAttackingSide(null);
        setDamagedSide(null);
        setLeftDamageText(undefined);
        setRightDamageText(undefined);

        await wait(1000);
        if (!battleActiveRef.current) return;

        const defHp1 = first === "left" ? currentRightHp : currentLeftHp;
        const { newHp: hp1, damage: dmg1 } = runTurn(
          first,
          firstAttackerFighter,
          firstDefenderFighter,
          defHp1
        );
        dmgTotal += dmg1;

        const attackName1 =
          ATTACK_NAMES[Math.floor(Math.random() * ATTACK_NAMES.length)];

        setAttackingSide(first);
        setDamagedSide(second);

        if (second === "left") {
          setLeftDamageText(`-${dmg1}`);
          setLeftHp(hp1);
          currentLeftHp = hp1;
        } else {
          setRightDamageText(`-${dmg1}`);
          setRightHp(hp1);
          currentRightHp = hp1;
        }

        addLog(
          dmg1 > 20 ? "critical" : "attack",
          `uses ${attackName1}! → ${firstDefenderFighter.name} takes ${dmg1} damage`,
          firstAttackerFighter.name,
          firstAttackerFighter.accentColor
        );

        setTurnCount(turn);
        setTotalDamage(dmgTotal);

        await wait(600);
        if (!battleActiveRef.current) return;
        setAttackingSide(null);
        setDamagedSide(null);
        setLeftDamageText(undefined);
        setRightDamageText(undefined);

        // Check if defender died
        if (hp1 <= 0) {
          setWinner(first);
          setPhase("victory");
          addLog(
            "victory",
            `is defeated!`,
            firstDefenderFighter.name,
            firstDefenderFighter.accentColor
          );
          addLog(
            "victory",
            `wins the match!`,
            firstAttackerFighter.name,
            firstAttackerFighter.accentColor
          );
          battleActiveRef.current = false;
          return;
        }

        await wait(900);
        if (!battleActiveRef.current) return;

        // --- Second attacker ---
        addLog(
          "thinking",
          "is analyzing opponent...",
          secondFighter.name,
          secondFighter.accentColor
        );

        await wait(1000);
        if (!battleActiveRef.current) return;

        const defHp2 = second === "left" ? currentRightHp : currentLeftHp;
        const { newHp: hp2, damage: dmg2 } = runTurn(
          second,
          secondFighter,
          firstFighter,
          defHp2
        );
        dmgTotal += dmg2;

        const attackName2 =
          ATTACK_NAMES[Math.floor(Math.random() * ATTACK_NAMES.length)];

        setAttackingSide(second);
        setDamagedSide(first);

        if (first === "left") {
          setLeftDamageText(`-${dmg2}`);
          setLeftHp(hp2);
          currentLeftHp = hp2;
        } else {
          setRightDamageText(`-${dmg2}`);
          setRightHp(hp2);
          currentRightHp = hp2;
        }

        addLog(
          dmg2 > 20 ? "critical" : "attack",
          `uses ${attackName2}! → ${firstFighter.name} takes ${dmg2} damage`,
          secondFighter.name,
          secondFighter.accentColor
        );

        setTurnCount(turn);
        setTotalDamage(dmgTotal);

        await wait(600);
        if (!battleActiveRef.current) return;
        setAttackingSide(null);
        setDamagedSide(null);
        setLeftDamageText(undefined);
        setRightDamageText(undefined);

        // Check if defender died
        if (hp2 <= 0) {
          setWinner(second);
          setPhase("victory");
          addLog(
            "victory",
            `is defeated!`,
            firstFighter.name,
            firstFighter.accentColor
          );
          addLog(
            "victory",
            `wins the match!`,
            secondFighter.name,
            secondFighter.accentColor
          );
          battleActiveRef.current = false;
          return;
        }

        await wait(900);
      }
    }

    runBattle();

    return () => {
      battleActiveRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const odds =
    leftFighter && rightFighter
      ? calcOdds(leftFighter, rightFighter)
      : { left: 1, right: 1 };

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
      <div className="relative z-20 flex items-center justify-between px-5 py-3 md:px-8 lg:px-12">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-[#6B6B80] transition-colors hover:bg-[#7C3AED]/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Dashboard</span>
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
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center overflow-hidden px-4 md:px-8">
        {phase === "selection" && !bothSelected ? (
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
          <div className="flex h-full w-full max-w-[1400px] flex-col items-center gap-2 md:gap-4">
            {/* Countdown overlay */}
            {phase === "countdown" && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <span
                  key={countdown}
                  className="text-[80px] font-black text-white md:text-[120px]"
                  style={{
                    fontFamily: "var(--font-orbitron)",
                    animation:
                      countdown > 0
                        ? "countdown-pop 0.8s ease-out"
                        : "countdown-exit 0.5s ease-in forwards",
                    textShadow: "0 0 40px #7C3AED, 0 0 80px #7C3AED50",
                  }}
                >
                  {countdown > 0 ? countdown : "FIGHT!"}
                </span>
              </div>
            )}

            {/* Match title */}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] font-medium uppercase tracking-[3px] text-[#7C3AED] md:text-[11px]">
                {phase === "fighting" ? `Turn ${turnCount}` : phase === "countdown" ? "Get Ready" : "Match Complete"}
              </span>
              <h1
                className="text-center text-[16px] font-bold tracking-[-0.5px] text-white md:text-[20px]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {leftFighter!.name} vs {rightFighter!.name}
              </h1>
            </div>

            {/* Battle area: sidepanels + stage */}
            <div className="flex w-full flex-1 gap-3 overflow-hidden md:gap-4">
              {/* Betting panel - left sidebar (hidden on mobile) */}
              <div className="hidden w-[220px] shrink-0 lg:block">
                <BettingPanel
                  leftName={leftFighter!.name}
                  rightName={rightFighter!.name}
                  leftColor={leftFighter!.accentColor}
                  rightColor={rightFighter!.accentColor}
                  leftOdds={odds.left}
                  rightOdds={odds.right}
                  battleStarted={phase === "fighting" || phase === "victory"}
                  winner={winner}
                />
              </div>

              {/* Center battle stage */}
              <div className="flex flex-1 flex-col items-center justify-center gap-2">
                <div className="flex w-full items-center justify-center gap-1 md:gap-2 lg:gap-6">
                  {/* Left Fighter */}
                  <div className="flex flex-1 justify-center lg:justify-end">
                    <FighterCard
                      name={leftFighter!.name}
                      title={leftFighter!.title}
                      image={leftFighter!.image}
                      side="left"
                      accentColor={leftFighter!.accentColor}
                      glowColor={leftFighter!.glowColor}
                      health={leftHp}
                      maxHealth={leftFighter!.health}
                      isAttacking={attackingside === "left"}
                      isDamaged={damagedSide === "left"}
                      isWinner={winner === "left" && phase === "victory"}
                      damageText={leftDamageText}
                    />
                  </div>

                  {/* VS Badge */}
                  <div className="flex shrink-0 items-center justify-center px-1 md:px-4">
                    <VsBadge />
                  </div>

                  {/* Right Fighter */}
                  <div className="flex flex-1 justify-center lg:justify-start">
                    <FighterCard
                      name={rightFighter!.name}
                      title={rightFighter!.title}
                      image={rightFighter!.image}
                      side="right"
                      accentColor={rightFighter!.accentColor}
                      glowColor={rightFighter!.glowColor}
                      health={rightHp}
                      maxHealth={rightFighter!.health}
                      isAttacking={attackingside === "right"}
                      isDamaged={damagedSide === "right"}
                      isWinner={winner === "right" && phase === "victory"}
                      damageText={rightDamageText}
                    />
                  </div>
                </div>

                {/* Mobile: Betting panel below fighters */}
                <div className="w-full max-w-[400px] lg:hidden">
                  <BettingPanel
                    leftName={leftFighter!.name}
                    rightName={rightFighter!.name}
                    leftColor={leftFighter!.accentColor}
                    rightColor={rightFighter!.accentColor}
                    leftOdds={odds.left}
                    rightOdds={odds.right}
                    battleStarted={phase === "fighting" || phase === "victory"}
                    winner={winner}
                  />
                </div>
              </div>

              {/* Battle Log - right sidebar (hidden on mobile) */}
              <div className="hidden w-[260px] shrink-0 lg:block">
                <BattleLog entries={logEntries} />
              </div>
            </div>

            {/* Mobile battle log */}
            <div className="h-[120px] w-full max-w-[500px] lg:hidden">
              <BattleLog entries={logEntries} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar - only during selection */}
      {phase === "selection" && !bothSelected && (
        <div className="relative z-20 flex flex-col items-center gap-2 px-5 py-4 md:py-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#7C3AED]/40" />
            <span
              className="text-[10px] font-semibold uppercase tracking-[4px] text-[#7C3AED]/60 md:text-[12px]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              Live on Monad
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#7C3AED]/40" />
          </div>
          <p className="text-center text-[11px] text-[#6B6B80] md:text-[13px]">
            Turn-based combat with real stakes on the Monad blockchain
          </p>
        </div>
      )}

      {/* Victory screen overlay */}
      {phase === "victory" && winner && (
        <VictoryScreen
          winnerName={winner === "left" ? leftFighter!.name : rightFighter!.name}
          winnerTitle={winner === "left" ? leftFighter!.title : rightFighter!.title}
          winnerImage={winner === "left" ? leftFighter!.image : rightFighter!.image}
          winnerColor={winner === "left" ? leftFighter!.accentColor : rightFighter!.accentColor}
          winnerGlow={winner === "left" ? leftFighter!.glowColor : rightFighter!.glowColor}
          loserName={winner === "left" ? rightFighter!.name : leftFighter!.name}
          totalTurns={turnCount}
          totalDamageDealt={totalDamage}
          onNewMatch={handleReset}
        />
      )}
    </div>
  );
}
