import Image from "next/image";

interface FighterCardProps {
  name: string;
  title: string;
  image: string;
  side: "left" | "right";
  accentColor: string;
  glowColor: string;
  health: number;
  maxHealth?: number;
  isAttacking?: boolean;
  isDamaged?: boolean;
  isWinner?: boolean;
  damageText?: string;
}

export function FighterCard({
  name,
  title,
  image,
  side,
  accentColor,
  glowColor,
  health,
  maxHealth = 100,
  isAttacking = false,
  isDamaged = false,
  isWinner = false,
  damageText,
}: FighterCardProps) {
  const isLeft = side === "left";
  const hpPercent = Math.max(0, (health / maxHealth) * 100);

  const hpBarColor =
    hpPercent > 50
      ? `linear-gradient(90deg, ${accentColor}, ${glowColor})`
      : hpPercent > 25
        ? "linear-gradient(90deg, #FFD700, #FF8C00)"
        : "linear-gradient(90deg, #FF4444, #FF0000)";

  let imageAnimation = "idle-breathe 4s ease-in-out infinite";
  if (isAttacking) {
    imageAnimation = "attack-flash 0.5s ease-out";
  } else if (isWinner) {
    imageAnimation = "victory-glow 2s ease-in-out infinite";
  }

  return (
    <div
      className={`flex flex-col items-center gap-3 md:gap-4 ${isLeft ? "lg:items-start" : "lg:items-end"}`}
      style={
        isDamaged ? { animation: "damage-shake 0.5s ease-out" } : undefined
      }
    >
      {/* Character image with glow */}
      <div
        className="relative h-[200px] w-[140px] md:h-[320px] md:w-[220px] lg:h-[420px] lg:w-[300px]"
        style={{
          ["--attack-dir" as string]: isLeft ? "30px" : "-30px",
          ["--glow-color" as string]: glowColor,
          animation: imageAnimation,
          filter: `drop-shadow(0 0 30px ${glowColor}60) drop-shadow(0 0 60px ${glowColor}30)`,
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 140px, (max-width: 1024px) 220px, 300px"
          className={`object-contain object-bottom ${isLeft ? "object-left" : "object-right"}`}
          priority
        />

        {/* Damage flash overlay */}
        {isDamaged && (
          <div
            className="absolute inset-0 rounded-lg bg-red-500/30"
            style={{ animation: "damage-flash 0.5s ease-out" }}
          />
        )}

        {/* Floating damage text */}
        {damageText && (
          <div
            className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[20px] font-black text-red-400 md:text-[28px]"
            style={{
              fontFamily: "var(--font-orbitron)",
              animation: "slide-up 0.5s ease-out",
              textShadow: "0 0 10px rgba(255,0,0,0.5)",
            }}
          >
            {damageText}
          </div>
        )}
      </div>

      {/* Fighter info plate */}
      <div
        className={`flex w-full max-w-[160px] flex-col gap-2 rounded-[12px] border bg-[#0B0B14]/80 px-3 py-2.5 backdrop-blur-sm md:max-w-[220px] md:px-5 md:py-4 ${
          isLeft ? "border-[#7C3AED]/30" : "border-[#FF6B35]/30"
        }`}
      >
        {/* Name */}
        <h3
          className="text-[12px] font-bold tracking-[1px] text-white md:text-[16px]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {name}
        </h3>

        {/* Title */}
        <span className="text-[10px] uppercase tracking-[2px] text-[#6B6B80] md:text-[11px]">
          {title}
        </span>

        {/* Health bar */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-[#6B6B80]">HP</span>
            <span className="text-[10px] font-bold text-white">
              {health}/{maxHealth}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#1a1a2e] md:h-2.5">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${hpPercent}%`,
                background: hpBarColor,
                boxShadow:
                  hpPercent > 25
                    ? `0 0 8px ${glowColor}60`
                    : "0 0 8px rgba(255,0,0,0.5)",
                animation: isDamaged ? "hp-drain 0.5s ease-out" : undefined,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
