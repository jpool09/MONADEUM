const stats = [
  { value: "50K+", label: "AI Agents Created", color: "text-[#7C3AED]" },
  { value: "1M+", label: "Battles Fought", color: "text-[#A855F7]" },
  { value: "$2.5M", label: "Rewards Distributed", color: "text-[#38BDF8]" },
  { value: "120+", label: "Active Arenas", color: "text-white" },
];

export function Stats() {
  return (
    <section
      id="stats"
      className="relative z-10 flex flex-col items-center gap-8 px-5 py-12 md:gap-12 md:px-10 md:py-20 lg:px-[120px]"
    >
      <h2
        className="text-center text-[22px] font-bold tracking-[-1px] text-white md:text-[28px] lg:text-[36px]"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        The Numbers Speak
      </h2>

      <div className="grid w-full grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 rounded-[16px] border border-[#2E1065] bg-[#0B0B14] p-5 md:gap-3 md:p-8"
          >
            <span
              className={`text-[24px] font-bold tracking-[-1px] md:text-[32px] lg:text-[40px] ${stat.color}`}
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {stat.value}
            </span>
            <span className="text-center text-[12px] text-[#6B6B80] md:text-[14px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
