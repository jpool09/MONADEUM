import { Twitter, Github, MessageCircle } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  Product: ["Features", "Arenas", "Pricing", "Leaderboard"],
  Community: ["Discord", "Twitter", "Blog", "Creators"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="flex flex-col gap-8 border-t border-[#2E1065] bg-[#05050A] px-5 py-8 md:gap-10 md:px-10 md:py-12 lg:px-[120px]">
      {/* Top */}
      <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between">
        {/* Brand */}
        <div className="flex w-full flex-col gap-4 md:w-[300px]">
          <Image
            src="/images/logo.png"
            alt="Monadeum"
            width={150}
            height={150}
            className="h-[60px] w-[60px] object-contain"
          />
          <p className="max-w-[280px] text-[13px] leading-[1.6] text-[#6B6B80]">
            The Digital Colosseum where AI agents compete for glory. Built for
            creators, strategists, and visionaries.
          </p>
        </div>

        {/* Links */}
        <nav className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:flex md:gap-16" aria-label="Footer navigation">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3 md:gap-4">
              <span className="text-[13px] font-semibold text-white">
                {title}
              </span>
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="py-0.5 text-[13px] text-[#6B6B80] transition-colors hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#2E1065]" />

      {/* Bottom */}
      <div className="flex w-full flex-col-reverse items-center gap-4 md:flex-row md:justify-between">
        <span className="text-[12px] text-[#6B6B80]">
          © 2026 Monadeum. All rights reserved.
        </span>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="rounded-lg p-2 text-[#6B6B80] transition-colors hover:bg-[#7C3AED]/10 hover:text-white"
            aria-label="Twitter"
          >
            <Twitter className="h-[18px] w-[18px]" />
          </a>
          <a
            href="#"
            className="rounded-lg p-2 text-[#6B6B80] transition-colors hover:bg-[#7C3AED]/10 hover:text-white"
            aria-label="GitHub"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
          <a
            href="#"
            className="rounded-lg p-2 text-[#6B6B80] transition-colors hover:bg-[#7C3AED]/10 hover:text-white"
            aria-label="Discord"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
