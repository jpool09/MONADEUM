"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Zap, Eye, Users } from "lucide-react";

const MOCK_BETS = [
  { user: "0x7a3F...8E2d", side: "left" as const, amount: 250, currency: "MON" },
  { user: "0xBc91...4F7a", side: "right" as const, amount: 500, currency: "MON" },
  { user: "0x12eA...9D3c", side: "left" as const, amount: 100, currency: "GLADI" },
  { user: "0xF8d2...1Ab5", side: "right" as const, amount: 300, currency: "MON" },
  { user: "0x5Ce7...6E8f", side: "left" as const, amount: 150, currency: "GLADI" },
];

interface BettingPanelProps {
  leftName: string;
  rightName: string;
  leftColor: string;
  rightColor: string;
  leftOdds: number;
  rightOdds: number;
  battleStarted: boolean;
  winner?: "left" | "right" | null;
  initialBet?: { side: "left" | "right"; amount: number; currency: string } | null;
  isSpectating?: boolean;
}

export function BettingPanel({
  leftName,
  rightName,
  leftColor,
  rightColor,
  leftOdds,
  rightOdds,
  battleStarted,
  winner,
  initialBet,
  isSpectating,
}: BettingPanelProps) {
  const [betAmount, setBetAmount] = useState("");
  const [betCurrency, setBetCurrency] = useState<"MON" | "GLADI">("MON");
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | null>(null);
  const [betPlaced, setBetPlaced] = useState(false);
  const [pool, setPool] = useState(isSpectating ? 1300 : 2450);

  // Apply initial bet from pre-bet modal
  useEffect(() => {
    if (initialBet && !betPlaced) {
      setSelectedSide(initialBet.side);
      setBetAmount(String(initialBet.amount));
      setBetCurrency(initialBet.currency as "MON" | "GLADI");
      setBetPlaced(true);
      setPool((p) => p + initialBet.amount);
    }
  }, [initialBet, betPlaced]);

  function handlePlaceBet() {
    if (!selectedSide || !betAmount || betPlaced) return;
    setBetPlaced(true);
    setPool((p) => p + Number(betAmount));
  }

  const payout = selectedSide
    ? (Number(betAmount) || 0) * (selectedSide === "left" ? leftOdds : rightOdds)
    : 0;

  const didWin = winner && selectedSide === winner;

  // Spectating mode: read-only view
  if (isSpectating) {
    const leftBets = MOCK_BETS.filter((b) => b.side === "left");
    const rightBets = MOCK_BETS.filter((b) => b.side === "right");
    const leftTotal = leftBets.reduce((s, b) => s + b.amount, 0);
    const rightTotal = rightBets.reduce((s, b) => s + b.amount, 0);
    const totalPool = leftTotal + rightTotal;
    const leftPct = totalPool > 0 ? Math.round((leftTotal / totalPool) * 100) : 50;

    return (
      <div className="flex flex-col rounded-[12px] border border-[#2E1065] bg-[#0B0B14]/90 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2E1065] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-[#7C3AED]" />
            <span
              className="text-[11px] font-bold tracking-[2px] text-[#6B6B80]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              BETTING POOL
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3 text-[#6B6B80]" />
            <span className="text-[10px] text-[#6B6B80]">Spectating</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          {/* Pool info */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#6B6B80]">Total Pool</span>
            <span
              className="text-[14px] font-bold text-white"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {totalPool.toLocaleString()} MON
            </span>
          </div>

          {/* Pool distribution bar */}
          <div className="flex flex-col gap-1.5">
            <div className="flex h-2 w-full overflow-hidden rounded-full">
              <div
                className="h-full transition-all"
                style={{ width: `${leftPct}%`, background: leftColor }}
              />
              <div
                className="h-full transition-all"
                style={{ width: `${100 - leftPct}%`, background: rightColor }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] font-bold" style={{ color: leftColor }}>
                {leftName.split(" ")[0]} {leftPct}%
              </span>
              <span className="text-[10px] font-bold" style={{ color: rightColor }}>
                {100 - leftPct}% {rightName.split(" ")[0]}
              </span>
            </div>
          </div>

          {/* Odds display (read-only) */}
          <div className="flex gap-2">
            <div className="flex flex-1 flex-col items-center gap-1 rounded-[8px] border border-[#2E1065] bg-[#0B0B14] p-2">
              <span
                className="text-[10px] font-bold tracking-[1px]"
                style={{ color: leftColor, fontFamily: "var(--font-orbitron)" }}
              >
                {leftName.split(" ")[0]}
              </span>
              <span className="text-[14px] font-bold text-white">{leftOdds.toFixed(2)}x</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1 rounded-[8px] border border-[#2E1065] bg-[#0B0B14] p-2">
              <span
                className="text-[10px] font-bold tracking-[1px]"
                style={{ color: rightColor, fontFamily: "var(--font-orbitron)" }}
              >
                {rightName.split(" ")[0]}
              </span>
              <span className="text-[14px] font-bold text-white">{rightOdds.toFixed(2)}x</span>
            </div>
          </div>

          {/* Recent bets list */}
          <div className="flex items-center gap-1.5">
            <Users className="h-3 w-3 text-[#6B6B80]" />
            <span className="text-[10px] font-bold tracking-[1px] text-[#6B6B80]">
              RECENT BETS
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            {MOCK_BETS.map((bet, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-[6px] border border-[#2E1065]/50 bg-black/30 px-2.5 py-1.5"
              >
                <span className="text-[10px] font-mono text-[#6B6B80]">{bet.user}</span>
                <span
                  className="text-[10px] font-bold"
                  style={{ color: bet.side === "left" ? leftColor : rightColor }}
                >
                  {bet.amount} {bet.currency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-[12px] border border-[#2E1065] bg-[#0B0B14]/90 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#2E1065] px-4 py-2.5">
        <TrendingUp className="h-3.5 w-3.5 text-[#7C3AED]" />
        <span
          className="text-[11px] font-bold tracking-[2px] text-[#6B6B80]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          BETTING POOL
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* Pool info */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#6B6B80]">Total Pool</span>
          <span
            className="text-[14px] font-bold text-white"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {pool.toLocaleString()} MON
          </span>
        </div>

        {/* Odds display */}
        <div className="flex gap-2">
          <button
            onClick={() => !battleStarted && !betPlaced && setSelectedSide("left")}
            disabled={battleStarted || betPlaced}
            className={`flex flex-1 flex-col items-center gap-1 rounded-[8px] border p-2.5 transition-all ${
              selectedSide === "left"
                ? "border-[#7C3AED] bg-[#7C3AED]/10"
                : "border-[#2E1065] bg-[#0B0B14] hover:border-[#7C3AED]/40"
            } ${battleStarted || betPlaced ? "pointer-events-none opacity-60" : ""}`}
          >
            <span
              className="text-[10px] font-bold tracking-[1px]"
              style={{ color: leftColor, fontFamily: "var(--font-orbitron)" }}
            >
              {leftName.split(" ")[0]}
            </span>
            <span className="text-[16px] font-bold text-white">
              {leftOdds.toFixed(2)}x
            </span>
          </button>
          <button
            onClick={() => !battleStarted && !betPlaced && setSelectedSide("right")}
            disabled={battleStarted || betPlaced}
            className={`flex flex-1 flex-col items-center gap-1 rounded-[8px] border p-2.5 transition-all ${
              selectedSide === "right"
                ? "border-[#FF6B35] bg-[#FF6B35]/10"
                : "border-[#2E1065] bg-[#0B0B14] hover:border-[#FF6B35]/40"
            } ${battleStarted || betPlaced ? "pointer-events-none opacity-60" : ""}`}
          >
            <span
              className="text-[10px] font-bold tracking-[1px]"
              style={{ color: rightColor, fontFamily: "var(--font-orbitron)" }}
            >
              {rightName.split(" ")[0]}
            </span>
            <span className="text-[16px] font-bold text-white">
              {rightOdds.toFixed(2)}x
            </span>
          </button>
        </div>

        {/* Bet input */}
        {!betPlaced ? (
          <>
            {/* Currency toggle */}
            <div className="flex rounded-[6px] border border-[#2E1065] bg-black/50 p-0.5">
              <button
                onClick={() => setBetCurrency("MON")}
                className={`flex-1 rounded-[4px] py-1.5 text-[10px] font-bold transition-all ${
                  betCurrency === "MON"
                    ? "bg-[#7C3AED]/20 text-white"
                    : "text-[#6B6B80]"
                }`}
              >
                MON
              </button>
              <button
                onClick={() => setBetCurrency("GLADI")}
                className={`flex-1 rounded-[4px] py-1.5 text-[10px] font-bold transition-all ${
                  betCurrency === "GLADI"
                    ? "bg-[#FFD700]/20 text-[#FFD700]"
                    : "text-[#6B6B80]"
                }`}
              >
                GLADI
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-[8px] border border-[#2E1065] bg-black/50 px-3 py-2">
              <input
                type="number"
                placeholder="Amount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                disabled={battleStarted}
                className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-[#6B6B80] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="shrink-0 text-[12px] font-bold text-[#6B6B80]">{betCurrency}</span>
            </div>

            {/* Quick amounts */}
            <div className="flex gap-1.5">
              {[50, 100, 250, 500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => !battleStarted && setBetAmount(String(amt))}
                  disabled={battleStarted}
                  className="flex-1 rounded-[6px] border border-[#2E1065] bg-[#0B0B14] py-1.5 text-[11px] font-medium text-[#6B6B80] transition-colors hover:border-[#7C3AED]/40 hover:text-white disabled:pointer-events-none disabled:opacity-50"
                >
                  {amt}
                </button>
              ))}
            </div>

            {/* Payout preview */}
            {selectedSide && betAmount && (
              <div className="flex items-center justify-between rounded-[8px] bg-[#7C3AED]/5 px-3 py-2">
                <span className="text-[11px] text-[#6B6B80]">Est. Payout</span>
                <span className="text-[13px] font-bold text-[#A855F7]">
                  {payout.toFixed(1)} {betCurrency}
                </span>
              </div>
            )}

            {/* Place Bet button */}
            <button
              onClick={handlePlaceBet}
              disabled={!selectedSide || !betAmount || battleStarted}
              className="flex items-center justify-center gap-2 rounded-[8px] bg-gradient-to-br from-[#7C3AED] to-[#A855F7] py-2.5 text-[13px] font-bold text-white transition-all hover:shadow-[0_0_20px_#7C3AED50] disabled:opacity-40 disabled:hover:shadow-none"
            >
              <Zap className="h-3.5 w-3.5" />
              Place Bet
            </button>
          </>
        ) : (
          /* Bet placed confirmation */
          <div className="flex flex-col items-center gap-2 rounded-[8px] border border-[#7C3AED]/30 bg-[#7C3AED]/5 p-3">
            <span className="text-[11px] font-bold tracking-[1px] text-[#7C3AED]">
              BET PLACED
            </span>
            <span className="text-[14px] font-bold text-white">
              {betAmount} {betCurrency} on{" "}
              <span style={{ color: selectedSide === "left" ? leftColor : rightColor }}>
                {selectedSide === "left" ? leftName : rightName}
              </span>
            </span>
            {winner && (
              <span
                className={`text-[13px] font-bold ${didWin ? "text-green-400" : "text-red-400"}`}
              >
                {didWin ? `+${payout.toFixed(1)} ${betCurrency} WON!` : `${betAmount} ${betCurrency} LOST`}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
