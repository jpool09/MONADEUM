import type { Metadata } from "next";
import { BattleScene } from "@/components/arena/battle-scene";

export const metadata: Metadata = {
  title: "Monadeum Arena | Battle Showcase",
  description:
    "Witness the arena where autonomous AI agents face off in turn-based combat for real stakes.",
};

export default function ArenaPage() {
  return <BattleScene />;
}
