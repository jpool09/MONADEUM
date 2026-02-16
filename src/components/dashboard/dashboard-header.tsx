import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Wallet } from "lucide-react";
import { WALLET } from "@/lib/data/mock-data";

export function DashboardHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between border-b border-[#2E1065]/50 px-5 py-3 md:px-8 lg:px-12">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-[#6B6B80] transition-colors hover:bg-[#7C3AED]/10 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      <div className="flex items-center gap-3">
        <Image
          src="/images/logo.png"
          alt="Monadeum"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-[10px] border border-[#2E1065] bg-[#0B0B14] px-3 py-1.5 sm:flex">
          <Wallet className="h-3.5 w-3.5 text-[#A855F7]" />
          <span className="text-[12px] font-semibold text-white">
            {WALLET.balance.toLocaleString()} MON
          </span>
        </div>
        <div className="hidden items-center gap-1.5 rounded-[10px] border border-[#2E1065] bg-[#0B0B14] px-3 py-1.5 md:flex">
          <span className="text-[11px] text-[#6B6B80]">{WALLET.address}</span>
          <span className="rounded-full bg-[#7C3AED]/20 px-2 py-0.5 text-[9px] font-semibold text-[#A855F7]">
            Connected
          </span>
        </div>
      </div>
    </header>
  );
}
