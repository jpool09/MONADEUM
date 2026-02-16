export interface Fighter {
  id: string;
  name: string;
  title: string;
  image: string;
  accentColor: string;
  glowColor: string;
  health: number;
  stats: { atk: number; def: number; spd: number };
}

export const ROSTER: Fighter[] = [
  {
    id: "gladiator",
    name: "IRON CENTURION",
    title: "The Unbreakable",
    image: "/images/gladiador.png",
    accentColor: "#7C3AED",
    glowColor: "#A855F7",
    health: 100,
    stats: { atk: 75, def: 90, spd: 60 },
  },
  {
    id: "beast",
    name: "WARBEAST",
    title: "The Horned Terror",
    image: "/images/armored.png",
    accentColor: "#C084FC",
    glowColor: "#7C3AED",
    health: 100,
    stats: { atk: 85, def: 80, spd: 55 },
  },
  {
    id: "fiery",
    name: "HELLFORGE",
    title: "The Infernal Titan",
    image: "/images/fiery.png",
    accentColor: "#FF6B35",
    glowColor: "#FF4500",
    health: 100,
    stats: { atk: 95, def: 65, spd: 70 },
  },
];
