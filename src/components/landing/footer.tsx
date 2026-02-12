export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-bg-surface py-12 px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="text-lg">⚔️</span>
          <span className="text-lg font-bold tracking-wider">MONADEUM</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-text-muted">
          <a href="#" className="hover:text-text-primary transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-text-primary transition-colors">
            Discord
          </a>
          <a href="#" className="hover:text-text-primary transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-text-primary transition-colors">
            nad.fun
          </a>
        </div>

        <p className="text-sm text-text-muted">
          &copy; 2026 Monadeum. Built on Monad.
        </p>
      </div>
    </footer>
  );
}
