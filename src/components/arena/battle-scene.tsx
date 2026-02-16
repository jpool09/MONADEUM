"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Swords, RotateCcw, Zap, CircleDollarSign } from "lucide-react";
import { Starfield } from "@/components/landing/starfield";
import { EmberParticles } from "./ember-particles";
import { FighterCard } from "./fighter-card";
import { VsBadge } from "./vs-badge";
import { BattleLog, type LogEntry } from "./battle-log";
import { BettingPanel } from "./betting-panel";
import { VictoryScreen } from "./victory-screen";
import { ROSTER, type Fighter } from "@/lib/data/fighters";
import { LIVE_FIGHTS } from "@/lib/data/mock-data";

const ATTACK_NAMES = [
  "Heavy Strike",
  "Swift Slash",
  "Power Slam",
  "Counter Attack",
  "Crushing Blow",
  "Fury Combo",
  "Shield Bash",
  "Venom Strike",
  "Shadow Step",
  "Infernal Blast",
  "Thunder Clap",
  "Chain Lightning",
];

const THINKING_MSGS = [
  "is analyzing opponent...",
  "is calculating next move...",
  "is evaluating weak points...",
  "is looking for an opening...",
  "is studying attack patterns...",
  "is preparing a strategy...",
  "is reading opponent's stance...",
  "is charging up energy...",
];

const DODGE_MSGS = [
  "dodges at the last second!",
  "blocks the attack!",
  "sidesteps gracefully!",
  "parries with precision!",
  "evades with incredible reflexes!",
];

type BattlePhase = "selection" | "prebet" | "countdown" | "fighting" | "victory";

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

function calcDamage(attacker: Fighter, defender: Fighter): { damage: number; isCrit: boolean; isDodge: boolean } {
  // 15% dodge chance based on defender speed
  if (Math.random() < 0.12 + defender.stats.spd * 0.0005) {
    return { damage: 0, isCrit: false, isDodge: true };
  }
  const rand = 0.7 + Math.random() * 0.6;
  const isCrit = Math.random() < 0.12;
  const critMult = isCrit ? 1.8 : 1;
  const raw = attacker.stats.atk * rand * 0.15 * critMult - defender.stats.def * 0.08;
  return { damage: Math.max(3, Math.round(raw)), isCrit, isDodge: false };
}

export function BattleScene() {
  const searchParams = useSearchParams();
  const watchFightId = searchParams.get("watch");
  const isSpectating = !!watchFightId;

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

  // Pre-bet state
  const [preBetSide, setPreBetSide] = useState<"left" | "right" | null>(null);
  const [preBetAmount, setPreBetAmount] = useState("");
  const [preBetCurrency, setPreBetCurrency] = useState<"MON" | "GLADI">("MON");
  const [userBet, setUserBet] = useState<{ side: "left" | "right"; amount: number; currency: string } | null>(null);

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

  // Auto-setup for live fight spectating
  useEffect(() => {
    if (!watchFightId) return;
    const fight = LIVE_FIGHTS.find((f) => f.id === watchFightId);
    if (!fight) return;

    setLeftFighter(fight.fighter1);
    setRightFighter(fight.fighter2);
    setLeftHp(fight.f1Hp);
    setRightHp(fight.f2Hp);

    // Seed battle log with prior entries so it feels like joining mid-fight
    const priorEntries: LogEntry[] = [
      { id: 1, type: "system", message: "FIGHT!", timestamp: Date.now() - 45000 },
      { id: 2, type: "attack", message: `uses Heavy Strike! → ${fight.fighter2.name} takes 8 damage`, fighterName: fight.fighter1.name, fighterColor: fight.fighter1.accentColor, timestamp: Date.now() - 42000 },
      { id: 3, type: "defend", message: `uses Swift Slash! → ${fight.fighter1.name} dodges at the last second!`, fighterName: fight.fighter2.name, fighterColor: fight.fighter2.accentColor, timestamp: Date.now() - 38000 },
      { id: 4, type: "critical", message: `uses Fury Combo! CRITICAL HIT! → ${fight.fighter1.name} takes 14 damage`, fighterName: fight.fighter2.name, fighterColor: fight.fighter2.accentColor, timestamp: Date.now() - 33000 },
      { id: 5, type: "attack", message: `uses Shield Bash! → ${fight.fighter2.name} takes 9 damage`, fighterName: fight.fighter1.name, fighterColor: fight.fighter1.accentColor, timestamp: Date.now() - 28000 },
      { id: 6, type: "attack", message: `uses Venom Strike! → ${fight.fighter1.name} takes 7 damage`, fighterName: fight.fighter2.name, fighterColor: fight.fighter2.accentColor, timestamp: Date.now() - 23000 },
      { id: 7, type: "defend", message: `uses Thunder Clap! → ${fight.fighter2.name} parries with precision!`, fighterName: fight.fighter1.name, fighterColor: fight.fighter1.accentColor, timestamp: Date.now() - 18000 },
      { id: 8, type: "critical", message: `uses Infernal Blast! CRITICAL HIT! → ${fight.fighter2.name} takes 16 damage`, fighterName: fight.fighter1.name, fighterColor: fight.fighter1.accentColor, timestamp: Date.now() - 12000 },
      { id: 9, type: "attack", message: `uses Counter Attack! → ${fight.fighter1.name} takes 10 damage`, fighterName: fight.fighter2.name, fighterColor: fight.fighter2.accentColor, timestamp: Date.now() - 7000 },
    ];
    setLogEntries(priorEntries);
    logIdRef.current = priorEntries.length;
    setTurnCount(5);

    // Small delay so the UI renders the fighters before starting
    const timer = setTimeout(() => {
      setPhase("fighting");
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchFightId]);

  function handleSelect(fighter: Fighter) {
    // Single fighter selection: pick yours, opponent auto-assigned
    setLeftFighter(fighter);
    const opponents = ROSTER.filter((f) => f.id !== fighter.id);
    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
    setRightFighter(randomOpponent);
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
    setPreBetSide(null);
    setPreBetAmount("");
    setPreBetCurrency("MON");
    setUserBet(null);
    logIdRef.current = 0;
  }

  function handlePlacePreBet() {
    if (!preBetSide || !preBetAmount) return;
    setUserBet({ side: preBetSide, amount: Number(preBetAmount), currency: preBetCurrency });
    setPhase("countdown");
  }

  function handleSkipBet() {
    setPhase("countdown");
  }

  // Show pre-bet when both fighters are selected (new fights only)
  useEffect(() => {
    if (bothSelected && phase === "selection" && !isSpectating) {
      const timer = setTimeout(() => setPhase("prebet"), 800);
      return () => clearTimeout(timer);
    }
  }, [bothSelected, phase, isSpectating]);

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

    function pickRandom<T>(arr: T[]): T {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    async function executeAttack(
      attackerSide: "left" | "right",
      defenderSide: "left" | "right",
      attacker: Fighter,
      defender: Fighter,
      defHp: number,
    ): Promise<{ newHp: number; damageDealt: number; ended: boolean }> {
      const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

      // Thinking phase
      addLog("thinking", pickRandom(THINKING_MSGS), attacker.name, attacker.accentColor);
      setAttackingSide(null);
      setDamagedSide(null);
      setLeftDamageText(undefined);
      setRightDamageText(undefined);

      await wait(1200 + Math.random() * 800);
      if (!battleActiveRef.current) return { newHp: defHp, damageDealt: 0, ended: true };

      const { damage, isCrit, isDodge } = calcDamage(attacker, defender);
      const attackName = pickRandom(ATTACK_NAMES);

      setAttackingSide(attackerSide);

      if (isDodge) {
        // Dodge - no damage
        setDamagedSide(null);
        addLog("defend", `uses ${attackName}! → ${defender.name} ${pickRandom(DODGE_MSGS)}`, attacker.name, attacker.accentColor);

        await wait(800);
        if (!battleActiveRef.current) return { newHp: defHp, damageDealt: 0, ended: true };
        setAttackingSide(null);
        await wait(600);
        return { newHp: defHp, damageDealt: 0, ended: false };
      }

      // Hit lands
      const newHp = Math.max(0, defHp - damage);
      setDamagedSide(defenderSide);

      if (defenderSide === "left") {
        setLeftDamageText(isCrit ? `CRIT -${damage}` : `-${damage}`);
        setLeftHp(newHp);
      } else {
        setRightDamageText(isCrit ? `CRIT -${damage}` : `-${damage}`);
        setRightHp(newHp);
      }

      addLog(
        isCrit ? "critical" : "attack",
        `uses ${attackName}!${isCrit ? " CRITICAL HIT!" : ""} → ${defender.name} takes ${damage} damage`,
        attacker.name,
        attacker.accentColor
      );

      await wait(700);
      if (!battleActiveRef.current) return { newHp, damageDealt: damage, ended: true };
      setAttackingSide(null);
      setDamagedSide(null);
      setLeftDamageText(undefined);
      setRightDamageText(undefined);

      if (newHp <= 0) {
        addLog("victory", "is defeated!", defender.name, defender.accentColor);
        addLog("victory", "wins the match!", attacker.name, attacker.accentColor);
        return { newHp, damageDealt: damage, ended: true };
      }

      await wait(700 + Math.random() * 400);
      return { newHp, damageDealt: damage, ended: false };
    }

    async function runBattle() {
      const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

      while (currentLeftHp > 0 && currentRightHp > 0 && battleActiveRef.current) {
        turn++;
        setTurnCount(turn);

        // --- First attacker ---
        const defHp1 = first === "left" ? currentRightHp : currentLeftHp;
        const result1 = await executeAttack(first, second, firstFighter, secondFighter, defHp1);
        if (!battleActiveRef.current) return;

        dmgTotal += result1.damageDealt;
        setTotalDamage(dmgTotal);
        if (second === "left") currentLeftHp = result1.newHp;
        else currentRightHp = result1.newHp;

        if (result1.ended && result1.newHp <= 0) {
          setWinner(first);
          setPhase("victory");
          battleActiveRef.current = false;
          return;
        }

        if (!battleActiveRef.current) return;

        // --- Second attacker ---
        const defHp2 = second === "left" ? currentRightHp : currentLeftHp;
        const result2 = await executeAttack(second, first, secondFighter, firstFighter, defHp2);
        if (!battleActiveRef.current) return;

        dmgTotal += result2.damageDealt;
        setTotalDamage(dmgTotal);
        if (first === "left") currentLeftHp = result2.newHp;
        else currentRightHp = result2.newHp;

        if (result2.ended && result2.newHp <= 0) {
          setWinner(second);
          setPhase("victory");
          battleActiveRef.current = false;
          return;
        }

        await wait(500);
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
                Choose Your Champion
              </span>
              <h1
                className="text-center text-[20px] font-bold tracking-[-0.5px] text-white md:text-[28px] lg:text-[32px]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                Select Fighter
              </h1>
              <p className="text-[12px] text-[#6B6B80]">
                Your opponent will be auto-matched
              </p>
            </div>

            {/* Fighter roster grid */}
            <div className="grid w-full grid-cols-3 gap-3 md:gap-5">
              {ROSTER.map((fighter) => {
                return (
                  <button
                    key={fighter.id}
                    onClick={() => handleSelect(fighter)}
                    className="group relative flex flex-col items-center gap-2 rounded-[16px] border border-[#2E1065] bg-[#0B0B14]/80 p-3 transition-all hover:border-[#7C3AED]/60 hover:bg-[#0B0B14] hover:shadow-[0_0_30px_#7C3AED20] md:gap-3 md:p-5"
                  >
                    {/* Fighter image */}
                    <div
                      className="relative h-[140px] w-[100px] transition-transform duration-300 group-hover:scale-105 md:h-[220px] md:w-[160px] lg:h-[280px] lg:w-[200px]"
                      style={{
                        filter: `drop-shadow(0 0 15px ${fighter.glowColor}40)`,
                      }}
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

                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ==================== BATTLE PHASE ==================== */
          <div className="flex h-full w-full max-w-[1400px] flex-col items-center gap-2 md:gap-4">
            {/* Pre-bet overlay */}
            {phase === "prebet" && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-md">
                <div className="flex w-full max-w-[440px] flex-col items-center gap-5 rounded-[16px] border border-[#2E1065] bg-[#0B0B14] p-6 md:p-8">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="h-5 w-5 text-[#FFD700]" />
                    <h2
                      className="text-[16px] font-bold tracking-[2px] text-white md:text-[18px]"
                      style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                      PLACE YOUR BET
                    </h2>
                  </div>
                  <p className="text-[12px] text-[#6B6B80]">
                    Wager on the outcome before the fight begins
                  </p>

                  {/* Fighter selection */}
                  <div className="flex w-full gap-3">
                    <button
                      onClick={() => setPreBetSide("left")}
                      className={`flex flex-1 flex-col items-center gap-1 rounded-[10px] border p-3 transition-all ${
                        preBetSide === "left"
                          ? "border-[#7C3AED] bg-[#7C3AED]/10 shadow-[0_0_16px_#7C3AED30]"
                          : "border-[#2E1065] bg-black/50 hover:border-[#7C3AED]/40"
                      }`}
                    >
                      <span
                        className="text-[11px] font-bold tracking-[1px]"
                        style={{ color: leftFighter!.accentColor, fontFamily: "var(--font-orbitron)" }}
                      >
                        {leftFighter!.name}
                      </span>
                      <span className="text-[14px] font-bold text-white">{odds.left.toFixed(2)}x</span>
                    </button>
                    <button
                      onClick={() => setPreBetSide("right")}
                      className={`flex flex-1 flex-col items-center gap-1 rounded-[10px] border p-3 transition-all ${
                        preBetSide === "right"
                          ? "border-[#FF6B35] bg-[#FF6B35]/10 shadow-[0_0_16px_#FF6B3530]"
                          : "border-[#2E1065] bg-black/50 hover:border-[#FF6B35]/40"
                      }`}
                    >
                      <span
                        className="text-[11px] font-bold tracking-[1px]"
                        style={{ color: rightFighter!.accentColor, fontFamily: "var(--font-orbitron)" }}
                      >
                        {rightFighter!.name}
                      </span>
                      <span className="text-[14px] font-bold text-white">{odds.right.toFixed(2)}x</span>
                    </button>
                  </div>

                  {/* Currency selector */}
                  <div className="flex w-full rounded-[8px] border border-[#2E1065] bg-black/50 p-1">
                    <button
                      onClick={() => setPreBetCurrency("MON")}
                      className={`flex-1 rounded-[6px] py-2 text-[12px] font-bold transition-all ${
                        preBetCurrency === "MON"
                          ? "bg-[#7C3AED]/20 text-white"
                          : "text-[#6B6B80] hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                      MON
                    </button>
                    <button
                      onClick={() => setPreBetCurrency("GLADI")}
                      className={`flex-1 rounded-[6px] py-2 text-[12px] font-bold transition-all ${
                        preBetCurrency === "GLADI"
                          ? "bg-[#FFD700]/20 text-[#FFD700]"
                          : "text-[#6B6B80] hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                      GLADI
                    </button>
                  </div>

                  {/* Amount input */}
                  <div className="flex w-full items-center gap-2 rounded-[8px] border border-[#2E1065] bg-black/50 px-3 py-2.5">
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={preBetAmount}
                      onChange={(e) => setPreBetAmount(e.target.value)}
                      className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-[#6B6B80] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <span className="shrink-0 text-[12px] font-bold text-[#6B6B80]">{preBetCurrency}</span>
                  </div>

                  {/* Quick amounts */}
                  <div className="flex w-full gap-2">
                    {[50, 100, 250, 500].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setPreBetAmount(String(amt))}
                        className="flex-1 rounded-[6px] border border-[#2E1065] bg-black/50 py-2 text-[12px] font-medium text-[#6B6B80] transition-colors hover:border-[#7C3AED]/40 hover:text-white"
                      >
                        {amt}
                      </button>
                    ))}
                  </div>

                  {/* Payout preview */}
                  {preBetSide && preBetAmount && (
                    <div className="flex w-full items-center justify-between rounded-[8px] bg-[#7C3AED]/5 px-4 py-2.5">
                      <span className="text-[12px] text-[#6B6B80]">Est. Payout</span>
                      <span
                        className="text-[14px] font-bold text-[#A855F7]"
                        style={{ fontFamily: "var(--font-orbitron)" }}
                      >
                        {(Number(preBetAmount) * (preBetSide === "left" ? odds.left : odds.right)).toFixed(1)} {preBetCurrency}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex w-full gap-3">
                    <button
                      onClick={handleSkipBet}
                      className="flex-1 rounded-[10px] border border-[#2E1065] py-3 text-[13px] font-medium text-[#6B6B80] transition-colors hover:border-[#7C3AED]/40 hover:text-white"
                    >
                      Skip
                    </button>
                    <button
                      onClick={handlePlacePreBet}
                      disabled={!preBetSide || !preBetAmount}
                      className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-[#7C3AED] to-[#A855F7] py-3 text-[13px] font-bold text-white transition-all hover:shadow-[0_0_20px_#7C3AED50] disabled:opacity-40"
                      style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                      <Zap className="h-4 w-4" />
                      Place Bet
                    </button>
                  </div>
                </div>
              </div>
            )}

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
              <div className="flex items-center gap-2">
                {isSpectating && (
                  <span className="flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                    <span className="text-[10px] font-bold tracking-[1px] text-red-400">LIVE</span>
                  </span>
                )}
                <span className="text-[10px] font-medium uppercase tracking-[3px] text-[#7C3AED] md:text-[11px]">
                  {phase === "fighting" ? `Turn ${turnCount}` : phase === "countdown" ? "Get Ready" : phase === "prebet" ? "Place Your Bets" : "Match Complete"}
                </span>
              </div>
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
                  initialBet={userBet}
                  isSpectating={isSpectating}
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
                    initialBet={userBet}
                    isSpectating={isSpectating}
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
