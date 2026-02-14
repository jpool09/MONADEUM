import Image from "next/image";

interface FighterCardProps {
  name: string;
  title: string;
  image: string;
  side: "left" | "right";
  accentColor: string;
  glowColor: string;
  health: number;
}

export function FighterCard({
  name,
  title,
  image,
  side,
  accentColor,
  glowColor,
  health,
}: FighterCardProps) {
  const isLeft = side === "left";

  return (
    <div className={`flex flex-col items-center gap-3 md:gap-4 ${isLeft ? "lg:items-start" : "lg:items-end"}`}>
      {/* Character image with glow */}
      <div
        className="relative h-[250px] w-[180px] md:h-[380px] md:w-[260px] lg:h-[480px] lg:w-[340px]"
        style={{
          animation: "idle-breathe 4s ease-in-out infinite",
          filter: `drop-shadow(0 0 30px ${glowColor}60) drop-shadow(0 0 60px ${glowColor}30)`,
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 180px, (max-width: 1024px) 260px, 340px"
          className={`object-contain object-bottom ${isLeft ? "object-left" : "object-right"}`}
          priority
        />
      </div>

      {/* Fighter info plate */}
      <div
        className={`flex w-full max-w-[180px] flex-col gap-2 rounded-[12px] border bg-[#0B0B14]/80 px-4 py-3 backdrop-blur-sm md:max-w-[260px] md:px-5 md:py-4 ${
          isLeft ? "border-[#7C3AED]/30" : "border-[#FF6B35]/30"
        }`}
      >
        {/* Name */}
        <h3
          className="text-[14px] font-bold tracking-[1px] text-white md:text-[18px]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {name}
        </h3>

        {/* Title */}
        <span className="text-[11px] uppercase tracking-[2px] text-[#6B6B80] md:text-[12px]">
          {title}
        </span>

        {/* Health bar */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-[#6B6B80]">HP</span>
            <span className="text-[10px] font-bold text-white">{health}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1a1a2e] md:h-2">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${health}%`,
                background: `linear-gradient(90deg, ${accentColor}, ${glowColor})`,
                boxShadow: `0 0 8px ${glowColor}60`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
