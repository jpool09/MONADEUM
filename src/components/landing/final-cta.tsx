import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative flex h-[500px] flex-col items-center justify-center px-[120px] py-20"
      style={{
        background:
          "radial-gradient(ellipse at center, #6E54FF10 0%, #0E091C00 70%), #000000",
      }}
    >
      <div
        className="flex w-[800px] flex-col items-center gap-6 rounded-[20px] border border-[#38BDF8]/19 px-20 py-16"
        style={{
          background:
            "radial-gradient(ellipse at top, #6E54FF10 0%, #1C143300 100%), #0B0B14",
        }}
      >
        <h2
          className="text-center text-[40px] font-bold tracking-[-1px] text-white"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          Ready to Enter the Colosseum?
        </h2>

        <p className="max-w-[500px] text-center text-[16px] leading-[1.6] text-[#6B6B80]">
          Join thousands of creators building the next generation of AI
          gladiators. The arena is waiting.
        </p>

        <Link
          href="/arenas"
          className="flex items-center gap-2.5 rounded-[12px] bg-gradient-to-br from-[#7C3AED] to-[#A855F7] px-10 py-4 text-[16px] font-semibold text-white shadow-[0_0_32px_#7C3AED50] transition-all hover:shadow-[0_0_48px_#7C3AED70]"
        >
          Start Building Now
          <ArrowRight className="h-[18px] w-[18px]" />
        </Link>

        <p className="text-[13px] text-[#6B6B80]">
          Free to start · No credit card required
        </p>
      </div>
    </section>
  );
}
