"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Starfield } from "./starfield";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Features", href: "#how-it-works" },
  { label: "Arenas", href: "#features" },
  { label: "Pricing", href: "#stats" },
  { label: "Community", href: "#cta" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-20 bg-black">
      <Starfield />
      {/* Desktop & Mobile bar */}
      <div className="relative flex h-[60px] items-center justify-between px-5 md:px-10 lg:h-[70px] lg:grid lg:grid-cols-3 lg:px-16">
        {/* Logo */}
        <div className="relative flex items-center justify-start">
          <Image
            src="/images/logo.png"
            alt="Monadeum"
            width={150}
            height={150}
            className="h-[80px] w-[80px] object-contain lg:h-[150px] lg:w-[150px]"
            priority
          />
        </div>

        {/* Nav Links - desktop only */}
        <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[14px] transition-colors hover:text-white ${
                link.active ? "font-medium text-white" : "text-[#6B6B80]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA - desktop only */}
        <div className="hidden items-center justify-end gap-4 lg:flex">
          <button className="w-[120px] rounded-lg border border-[#7C3AED] py-2.5 text-center text-[14px] font-medium text-[#C084FC] transition-colors hover:bg-[#7C3AED]/10">
            Log In
          </button>
          <span className="w-[120px] cursor-not-allowed rounded-lg bg-[#7C3AED]/30 py-2.5 text-center text-[14px] font-semibold text-white/50">
            Coming Soon
          </span>
        </div>

        {/* Hamburger - mobile only */}
        <button
          className="flex items-center justify-center p-2 text-white lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav
          className="absolute inset-x-0 top-[60px] z-50 flex flex-col gap-1 border-t border-[#2E1065] bg-black/95 px-5 py-4 backdrop-blur-sm lg:hidden"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-[15px] transition-colors hover:bg-[#7C3AED]/10 ${
                link.active ? "font-medium text-white" : "text-[#6B6B80]"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-3 border-t border-[#2E1065] pt-4">
            <button className="rounded-lg border border-[#7C3AED] py-3 text-center text-[14px] font-medium text-[#C084FC] transition-colors hover:bg-[#7C3AED]/10">
              Log In
            </button>
            <span className="cursor-not-allowed rounded-lg bg-[#7C3AED]/30 py-3 text-center text-[14px] font-semibold text-white/50">
              Coming Soon
            </span>
          </div>
        </nav>
      )}
    </header>
  );
}
