import { Bot, Swords, TrendingUp, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ROSTER } from "./fighters";

export const WALLET = {
  address: "0x7a3F...8E2d",
  balance: 5000,
};

export interface DashboardStat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: "My Agents", value: "3", icon: Bot, color: "#7C3AED" },
  { label: "Active Arenas", value: "4", icon: Swords, color: "#A855F7" },
  { label: "Total Bets", value: "1,250 MON", icon: TrendingUp, color: "#38BDF8" },
  { label: "Win Rate", value: "66.7%", icon: Trophy, color: "#FFD700" },
];

export interface LiveFight {
  id: string;
  agent1: string;
  agent2: string;
  fighter1: typeof ROSTER[number];
  fighter2: typeof ROSTER[number];
  f1Hp: number;
  f2Hp: number;
  viewers: number;
  pool: number;
}

export const LIVE_FIGHTS: LiveFight[] = [
  { id: "1", agent1: "STRATEGOS", agent2: "PYRO_GPT", fighter1: ROSTER[0], fighter2: ROSTER[2], f1Hp: 72, f2Hp: 45, viewers: 234, pool: 1500 },
  { id: "2", agent1: "BEASTMASTER", agent2: "STRATEGOS", fighter1: ROSTER[1], fighter2: ROSTER[0], f1Hp: 88, f2Hp: 61, viewers: 156, pool: 890 },
];

export interface Arena {
  id: string;
  name: string;
  status: "live" | "upcoming" | "completed";
  entryFee: number;
  prizePool: number;
  participants: number;
}

export const ARENAS: Arena[] = [
  { id: "classic", name: "Classic 1v1", status: "live", entryFee: 100, prizePool: 2500, participants: 8 },
  { id: "tournament", name: "Grand Tournament", status: "upcoming", entryFee: 500, prizePool: 15000, participants: 0 },
  { id: "blitz", name: "Blitz Arena", status: "live", entryFee: 50, prizePool: 800, participants: 12 },
  { id: "legends", name: "Legends Cup", status: "completed", entryFee: 1000, prizePool: 25000, participants: 16 },
];

export interface LeaderboardEntry {
  rank: number;
  agent: string;
  character: string;
  image: string | null;
  wins: number;
  losses: number;
  earnings: number;
}

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, agent: "PYRO_GPT", character: "HELLFORGE", image: "/images/fiery.png", wins: 47, losses: 12, earnings: 8500 },
  { rank: 2, agent: "STRATEGOS", character: "IRON CENTURION", image: "/images/gladiador.png", wins: 42, losses: 18, earnings: 6200 },
  { rank: 3, agent: "BEASTMASTER", character: "WARBEAST", image: "/images/armored.png", wins: 35, losses: 25, earnings: 4100 },
  { rank: 4, agent: "NEURAL_FURY", character: "HELLFORGE", image: "/images/fiery.png", wins: 33, losses: 20, earnings: 3800 },
  { rank: 5, agent: "ZERO_COOL", character: "IRON CENTURION", image: "/images/gladiador.png", wins: 31, losses: 22, earnings: 3400 },
  { rank: 6, agent: "APEX_MIND", character: "WARBEAST", image: "/images/armored.png", wins: 28, losses: 19, earnings: 3100 },
  { rank: 7, agent: "DARK_ORACLE", character: "HELLFORGE", image: "/images/fiery.png", wins: 26, losses: 24, earnings: 2700 },
  { rank: 8, agent: "SYNTHWAVE", character: "IRON CENTURION", image: "/images/gladiador.png", wins: 24, losses: 21, earnings: 2400 },
  { rank: 9, agent: "CORTEX_V2", character: "WARBEAST", image: "/images/armored.png", wins: 22, losses: 23, earnings: 2100 },
  { rank: 10, agent: "FLUX_AI", character: "HELLFORGE", image: "/images/fiery.png", wins: 20, losses: 25, earnings: 1800 },
];

export interface MyAgent {
  agentName: string;
  characterId: string;
  wins: number;
  losses: number;
}

export const MY_AGENTS: MyAgent[] = [
  { agentName: "STRATEGOS", characterId: "gladiator", wins: 42, losses: 18 },
  { agentName: "BEASTMASTER", characterId: "beast", wins: 35, losses: 25 },
  { agentName: "PYRO_GPT", characterId: "fiery", wins: 47, losses: 12 },
];
