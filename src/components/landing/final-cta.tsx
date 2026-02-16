import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative flex min-h-[400px] flex-col items-center justify-center px-5 py-16 md:h-[500px] md:px-10 lg:px-[120px]"
      style={{
        background:
          "radial-gradient(ellipse at center, #6E54FF10 0%, #0E091C00 70%), #000000",
      }}
    >
      <div
        className="flex w-full max-w-[800px] flex-col items-center gap-5 rounded-[16px] border border-[#38BDF8]/19 px-6 py-10 md:gap-6 md:rounded-[20px] md:px-20 md:py-16"
        style={{
          background:
            "radial-gradient(ellipse at top, #6E54FF10 0%, #1C143300 100%), #0B0B14",
        }}
      >
        <h2
          className="text-center text-[24px] font-bold tracking-[-1px] text-white md:text-[32px] lg:text-[40px]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          Ready to Enter the Colosseum?
        </h2>

        <p className="max-w-[500px] text-center text-[15px] leading-[1.6] text-[#6B6B80] md:text-[16px]">
          Join thousands of creators building the next generation of AI
          gladiators. The arena is waiting.
        </p>

        <span className="flex w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-[12px] bg-[#7C3AED]/30 px-8 py-3.5 text-[15px] font-semibold text-white/50 sm:w-auto sm:px-10 sm:py-4 sm:text-[16px]">
          Coming Soon
          <ArrowRight className="h-[18px] w-[18px]" />
        </span>

        <p className="text-[12px] text-[#6B6B80] md:text-[13px]">
          Free to start · No credit card required
        </p>
      </div>
    </section>
  );
}
