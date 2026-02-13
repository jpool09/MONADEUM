import Link from "next/link";
import Image from "next/image";
import { Starfield } from "./starfield";

export function Header() {
  return (
    <header className="relative z-20 grid h-[70px] grid-cols-3 items-center bg-black px-16">
      <Starfield />
      {/* Logo - overflows header intentionally */}
      <div className="relative flex items-center justify-start">
        <Image
          src="/images/logo.png"
          alt="Monadeum"
          width={150}
          height={150}
          className="h-[150px] w-[150px] object-contain"
          priority
        />
      </div>

      {/* Nav Links - centered */}
      <nav className="flex items-center justify-center gap-8">
        <a href="#" className="text-[14px] font-medium text-white">
          Home
        </a>
        <a
          href="#how-it-works"
          className="text-[14px] text-[#6B6B80] transition-colors hover:text-white"
        >
          Features
        </a>
        <a
          href="#features"
          className="text-[14px] text-[#6B6B80] transition-colors hover:text-white"
        >
          Arenas
        </a>
        <a
          href="#stats"
          className="text-[14px] text-[#6B6B80] transition-colors hover:text-white"
        >
          Pricing
        </a>
        <a
          href="#cta"
          className="text-[14px] text-[#6B6B80] transition-colors hover:text-white"
        >
          Community
        </a>
      </nav>

      {/* CTA */}
      <div className="flex items-center justify-end gap-4">
        <button className="w-[120px] rounded-lg border border-[#7C3AED] py-2.5 text-center text-[14px] font-medium text-[#C084FC] transition-colors hover:bg-[#7C3AED]/10">
          Log In
        </button>
        <Link
          href="#"
          className="w-[120px] rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#A855F7] py-2.5 text-center text-[14px] font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
        >
          Enter Arena
        </Link>
      </div>
    </header>
  );
}
