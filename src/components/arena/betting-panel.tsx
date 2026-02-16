"use client";

import { useState } from "react";
import { TrendingUp, Zap } from "lucide-react";

interface BettingPanelProps {
  leftName: string;
  rightName: string;
  leftColor: string;
  rightColor: string;
  leftOdds: number;
  rightOdds: number;
  battleStarted: boolean;
  winner?: "left" | "right" | null;
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
}: BettingPanelProps) {
  const [betAmount, setBetAmount] = useState("");
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | null>(null);
  const [betPlaced, setBetPlaced] = useState(false);
  const [pool, setPool] = useState(2450);

  function handlePlaceBet() {
    if (!selectedSide || !betAmount || betPlaced) return;
    setBetPlaced(true);
    setPool((p) => p + Number(betAmount));
  }

  const payout = selectedSide
    ? (Number(betAmount) || 0) * (selectedSide === "left" ? leftOdds : rightOdds)
    : 0;

  const didWin = winner && selectedSide === winner;

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
            <div className="flex items-center gap-2 rounded-[8px] border border-[#2E1065] bg-black/50 px-3 py-2">
              <input
                type="number"
                placeholder="Amount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                disabled={battleStarted}
                className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-[#6B6B80] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="shrink-0 text-[12px] font-bold text-[#6B6B80]">MON</span>
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
                  {payout.toFixed(1)} MON
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
              {betAmount} MON on{" "}
              <span style={{ color: selectedSide === "left" ? leftColor : rightColor }}>
                {selectedSide === "left" ? leftName : rightName}
              </span>
            </span>
            {winner && (
              <span
                className={`text-[13px] font-bold ${didWin ? "text-green-400" : "text-red-400"}`}
              >
                {didWin ? `+${payout.toFixed(1)} MON WON!` : `${betAmount} MON LOST`}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
