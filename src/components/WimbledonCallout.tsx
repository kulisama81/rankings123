import Link from "next/link";
import SportIcon from "./SportIcon";

function getCurrentRound(now: Date): string {
  const year = 2026;

  // Define round dates (UTC)
  const rounds = [
    { start: new Date(Date.UTC(year, 5, 29)), end: new Date(Date.UTC(year, 5, 30, 23, 59, 59)), label: "First Round" },
    { start: new Date(Date.UTC(year, 6, 1)), end: new Date(Date.UTC(year, 6, 2, 23, 59, 59)), label: "Second Round" },
    { start: new Date(Date.UTC(year, 6, 3)), end: new Date(Date.UTC(year, 6, 4, 23, 59, 59)), label: "Third Round" },
    { start: new Date(Date.UTC(year, 6, 5)), end: new Date(Date.UTC(year, 6, 5, 23, 59, 59)), label: "Middle Sunday" },
    { start: new Date(Date.UTC(year, 6, 6)), end: new Date(Date.UTC(year, 6, 7, 23, 59, 59)), label: "Fourth Round" },
    { start: new Date(Date.UTC(year, 6, 8)), end: new Date(Date.UTC(year, 6, 9, 23, 59, 59)), label: "Quarterfinals" },
    { start: new Date(Date.UTC(year, 6, 10)), end: new Date(Date.UTC(year, 6, 11, 23, 59, 59)), label: "Semifinals" },
    { start: new Date(Date.UTC(year, 6, 12)), end: new Date(Date.UTC(year, 6, 12, 23, 59, 59)), label: "Finals" },
  ];

  for (const round of rounds) {
    if (now >= round.start && now <= round.end) {
      return round.label;
    }
  }

  return "In Progress";
}

function getDaysRemaining(now: Date, endDate: Date): number {
  const diff = endDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function WimbledonCallout({ variant = "full" }: { variant?: "full" | "compact" }) {
  const now = new Date();
  const year = 2026;
  const wimbledonStart = new Date(Date.UTC(year, 5, 29)); // June 29, 2026 UTC
  const wimbledonEnd = new Date(Date.UTC(year, 6, 13)); // July 13, 2026 UTC (day after tournament ends)

  // Only show during Wimbledon 2026 (June 29 - July 12, hide starting July 13)
  if (now < wimbledonStart || now >= wimbledonEnd) {
    return null;
  }

  const currentRound = getCurrentRound(now);
  const daysRemaining = getDaysRemaining(now, new Date(Date.UTC(year, 6, 12, 23, 59)));

  if (variant === "compact") {
    return (
      <section className="mb-6">
        <Link
          href="/tournaments/wimbledon-2026"
          className="group flex items-center justify-between rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-green-600/10 p-4 transition hover:border-purple-500/50 hover:from-purple-500/15 hover:to-green-600/15"
        >
          <div className="flex items-center gap-3">
            <div className="text-accent" aria-hidden="true">
              <SportIcon type="tennis" size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-bold text-fg">
                  LIVE: Wimbledon
                </span>
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
                    style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
              </div>
              <p className="text-xs text-muted">
                {currentRound} · {daysRemaining} {daysRemaining === 1 ? "day" : "days"} remaining
              </p>
            </div>
          </div>
          <span className="text-accent transition group-hover:translate-x-0.5">→</span>
        </Link>
      </section>
    );
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
              <div className="text-accent drop-shadow-sm" aria-hidden="true">
                <SportIcon type="tennis" size={48} />
              </div>
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
                  {currentRound} · {daysRemaining} {daysRemaining === 1 ? "day" : "days"} remaining · Defending Champions: Sinner (ATP), Swiatek (WTA)
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
