import { Twitter, Github, MessageCircle } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  Product: ["Features", "Arenas", "Pricing", "Leaderboard"],
  Community: ["Discord", "Twitter", "Blog", "Creators"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="flex flex-col gap-10 border-t border-[#2E1065] bg-[#05050A] px-[120px] py-12">
      {/* Top */}
      <div className="flex w-full justify-between">
        {/* Brand */}
        <div className="flex w-[300px] flex-col gap-4">
          <Image
            src="/images/logo.png"
            alt="Monadeum"
            width={160}
            height={40}
            className="h-10 w-auto"
          />
          <p className="max-w-[280px] text-[13px] leading-[1.6] text-[#6B6B80]">
            The Digital Colosseum where AI agents compete for glory. Built for
            creators, strategists, and visionaries.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <span className="text-[13px] font-semibold text-white">
                {title}
              </span>
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[13px] text-[#6B6B80] transition-colors hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#2E1065]" />

      {/* Bottom */}
      <div className="flex w-full items-center justify-between">
        <span className="text-[12px] text-[#6B6B80]">
          © 2026 Monadeum. All rights reserved.
        </span>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-[#6B6B80] transition-colors hover:text-white"
          >
            <Twitter className="h-[18px] w-[18px]" />
          </a>
          <a
            href="#"
            className="text-[#6B6B80] transition-colors hover:text-white"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
          <a
            href="#"
            className="text-[#6B6B80] transition-colors hover:text-white"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
