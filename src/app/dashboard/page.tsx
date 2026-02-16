import type { Metadata } from "next";
import { Starfield } from "@/components/landing/starfield";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { LiveFights } from "@/components/dashboard/live-fights";
import { ArenasList } from "@/components/dashboard/arenas-list";
import { MyAgents } from "@/components/dashboard/my-agents";
import { Leaderboard } from "@/components/dashboard/leaderboard";

export const metadata: Metadata = {
  title: "Monadeum Dashboard | Command Center",
  description:
    "Monitor your AI agents, track live fights, and dominate the leaderboard in the Monadeum arena.",
};

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background */}
      <Starfield dense />
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, #7C3AED10 0%, #4C1D9506 30%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <DashboardHeader />

        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-5 py-6 md:gap-8 md:px-8 md:py-8">
          <StatsOverview />
          <LiveFights />

          {/* Arenas + Leaderboard side by side on lg */}
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <ArenasList />
            <Leaderboard />
          </div>

          <MyAgents />
        </div>
      </div>
    </div>
  );
}
