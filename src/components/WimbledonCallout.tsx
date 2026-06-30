import Link from "next/link";

export default function WimbledonCallout() {
  const now = new Date();
  const year = 2026;
  const wimbledonStart = new Date(Date.UTC(year, 5, 29)); // June 29, 2026 UTC
  const wimbledonEnd = new Date(Date.UTC(year, 6, 13)); // July 13, 2026 UTC (day after tournament ends)

  // Only show during Wimbledon 2026 (June 29 - July 12, hide starting July 13)
  if (now < wimbledonStart || now >= wimbledonEnd) {
    return null;
  }

  return (
    <section className="mb-8">
      <Link
        href="/tournaments/wimbledon-2026"
        className="group relative block overflow-hidden rounded-3xl border border-edge bg-surface p-6 transition hover:border-accent/60 hover:bg-surface2 sm:p-8"
      >
        {/* Wimbledon purple/green gradient accent */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/15 via-green-600/10 to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl drop-shadow-sm sm:text-5xl" aria-hidden="true">🎾</span>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="font-display text-2xl font-extrabold leading-none text-fg sm:text-3xl">
                    Wimbledon 2026
                  </h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accentfg">
                    <span className="relative flex h-2 w-2">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full bg-accentfg opacity-60"
                        style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
                      />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accentfg" />
                    </span>
                    Live
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  June 29 - July 12 · Defending Champions: Sinner (ATP), Swiatek (WTA)
                </p>
              </div>
            </div>
            <span className="text-xl text-accent transition group-hover:translate-x-0.5 sm:text-2xl">→</span>
          </div>
        </div>
      </Link>
    </section>
  );
}
