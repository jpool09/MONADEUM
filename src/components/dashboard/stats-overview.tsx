import { DASHBOARD_STATS } from "@/lib/data/mock-data";

export function StatsOverview() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {DASHBOARD_STATS.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-[16px] border border-[#2E1065] bg-[#0B0B14] p-4 transition-all hover:border-[#7C3AED]/40 md:p-5"
        >
          {/* Glow background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              background: `radial-gradient(ellipse at center, ${stat.color}08 0%, transparent 70%)`,
            }}
          />

          <div className="relative flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
              </div>
            </div>
            <span
              className="text-[20px] font-bold text-white md:text-[24px]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {stat.value}
            </span>
            <span className="text-[11px] text-[#6B6B80] md:text-[12px]">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
