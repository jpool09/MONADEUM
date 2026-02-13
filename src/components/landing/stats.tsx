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
      className="relative z-10 flex flex-col items-center gap-12 px-[120px] py-20"
    >
      <h2
        className="text-center text-[36px] font-bold tracking-[-1px] text-white"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        The Numbers Speak
      </h2>

      <div className="flex w-full justify-center gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-1 flex-col items-center gap-3 rounded-[16px] border border-[#2E1065] bg-[#0B0B14] p-8"
          >
            <span
              className={`text-[40px] font-bold tracking-[-1px] ${stat.color}`}
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {stat.value}
            </span>
            <span className="text-[14px] text-[#6B6B80]">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
