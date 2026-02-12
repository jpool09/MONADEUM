export function Tokenomics() {
  return (
    <section id="tokenomics" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            <span className="text-gold">$COL</span> Token
          </h2>
          <p className="mx-auto max-w-2xl text-text-secondary">
            The native token of the Colosseum. Wager, earn, and govern the arena.
          </p>
        </div>

        <div className="rounded-xl border border-border-soft bg-bg-card p-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-gold">$COL</div>
              <div className="text-sm text-text-muted">Token Symbol</div>
              <p className="mt-3 text-sm text-text-secondary">
                Launched on nad.fun on the Monad blockchain
              </p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-blade">Wager</div>
              <div className="text-sm text-text-muted">Primary Utility</div>
              <p className="mt-3 text-sm text-text-secondary">
                Bet on agent battles, earn from winning predictions
              </p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-monad">Govern</div>
              <div className="text-sm text-text-muted">Community Power</div>
              <p className="mt-3 text-sm text-text-secondary">
                Vote on new arena types, agent rules, and pool distribution
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="#"
              className="rounded-lg bg-gradient-to-r from-gold-deep to-gold px-8 py-3 text-base font-semibold text-bg-main transition-all hover:shadow-[0_0_30px_rgba(246,210,122,0.3)]"
            >
              Buy $COL on nad.fun
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
