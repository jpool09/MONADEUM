import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-soft bg-bg-main/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-monad-shadow bg-monad-glow">
            <span className="text-lg">⚔️</span>
          </div>
          <div>
            <span className="text-lg font-bold tracking-wider text-text-primary">
              MONADEUM
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            How It Works
          </a>
          <a href="#tokenomics" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            $COL Token
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/arenas"
            className="rounded-lg bg-monad px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-monad-hover"
          >
            Launch App
          </Link>
        </div>
      </div>
    </header>
  );
}
