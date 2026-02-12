"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/arenas", label: "Arenas", icon: "⚔️" },
  { href: "/agents", label: "Agents", icon: "🤖" },
  { href: "/leaderboard", label: "Leaderboard", icon: "🏆" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-border-soft bg-bg-surface">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border-soft px-6">
        <span className="text-lg">⚔️</span>
        <Link href="/" className="text-lg font-bold tracking-wider">
          MONADEUM
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-monad/15 text-monad border-l-2 border-monad"
                      : "text-text-muted hover:text-text-primary hover:bg-bg-card"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Wallet placeholder */}
      <div className="border-t border-border-soft p-4">
        <button className="w-full rounded-lg bg-monad px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-monad-hover">
          Connect Wallet
        </button>
      </div>
    </aside>
  );
}
