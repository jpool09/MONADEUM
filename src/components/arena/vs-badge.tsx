export function VsBadge() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer glow ring */}
      <div
        className="absolute h-24 w-24 rounded-full md:h-32 md:w-32"
        style={{
          background: "radial-gradient(circle, #7C3AED30 0%, transparent 70%)",
          animation: "vs-pulse 2s ease-in-out infinite",
        }}
      />

      {/* Decorative horizontal lines */}
      <div className="absolute flex w-[200px] items-center justify-center md:w-[300px]">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent opacity-40" />
      </div>

      {/* VS text */}
      <div className="relative">
        <span
          className="text-[36px] font-black tracking-[4px] md:text-[48px] lg:text-[56px]"
          style={{
            fontFamily: "var(--font-orbitron)",
            background: "linear-gradient(180deg, #C084FC 0%, #7C3AED 50%, #4C1D95 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px #7C3AED80) drop-shadow(0 0 40px #7C3AED40)",
          }}
        >
          VS
        </span>
      </div>

      {/* Spark dots */}
      <div className="absolute flex items-center gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full bg-[#C084FC]"
            style={{
              animation: `twinkle-${(i % 3) + 1} ${1.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
