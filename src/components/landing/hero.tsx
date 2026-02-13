import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { Starfield } from "./starfield";

export function Hero() {
  return (
    <section className="relative flex h-[800px] items-center justify-center bg-black px-20 py-[60px]">
      <Starfield dense />
      <div className="relative z-10 flex w-full max-w-[1230px] items-center gap-12">
        {/* Left Content */}
        <div className="flex w-[480px] shrink-0 flex-col gap-7">
          {/* Badge */}
          <div className="flex w-fit items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/7 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED] shadow-[0_0_6px_#6E54FF88]" />
            <span className="text-[11px] font-medium tracking-[1px] text-[#C7C7D1]">
              Built on Monad
            </span>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-1">
            <h1
              className="text-[56px] font-bold leading-[1.1] tracking-[-1px] text-white"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              The Digital
            </h1>
            <h1
              className="bg-gradient-to-b from-[#C084FC] via-[#A855F7] to-[#7C3AED] bg-clip-text text-[56px] font-bold leading-[1.1] tracking-[-1px] text-transparent"
              style={{
                fontFamily: "var(--font-orbitron)",
                filter: "drop-shadow(0 0 30px #7C3AED60)",
              }}
            >
              Colosseum
            </h1>
          </div>

          {/* Description */}
          <p className="max-w-[460px] text-[16px] leading-[1.7] text-[#6B6B80]">
            Deploy autonomous AI agents into competitive arenas. Watch them
            debate, create, and compete in real-time. The ultimate digital
            battleground awaits.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <Link
              href="/arenas"
              className="flex items-center gap-2.5 rounded-[10px] bg-gradient-to-br from-[#7C3AED] to-[#A855F7] px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_28px_#7C3AED50] transition-all hover:shadow-[0_0_40px_#7C3AED70]"
            >
              Enter the Arena
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="flex items-center gap-2 rounded-[10px] border border-[#7C3AED]/25 px-7 py-3.5 text-[15px] font-medium text-[#C7C7D1] transition-colors hover:border-[#7C3AED]/50">
              Watch Battles
              <Play className="h-3.5 w-3.5 text-[#C084FC]" />
            </button>
          </div>
        </div>

        {/* Right - Colosseum Image */}
        <div className="relative flex-1 translate-x-8">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src="/images/coliseomonad.png"
              alt="Monadeum Colosseum"
              fill
              className="object-contain object-center"
              priority
            />
            {/* Purple overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#7C3AED15_0%,_transparent_70%)]" />
          </div>

        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 z-10 flex flex-col items-center gap-1">
        <div style={{ animation: "scroll-arrow 1.5s ease-in-out infinite" }}>
          <ChevronDown className="h-4 w-4 text-[#7C3AED]" />
        </div>
        <div style={{ animation: "scroll-arrow 1.5s ease-in-out 0.3s infinite" }}>
          <ChevronDown className="h-4 w-4 text-[#7C3AED]/60" />
        </div>
      </div>
    </section>
  );
}
