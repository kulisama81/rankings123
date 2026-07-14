import type { Metadata } from "next";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import LiveWorldCupWidget from "@/components/LiveWorldCupWidget";
import LiveTdfWidget from "@/components/LiveTdfWidget";
import WimbledonCallout from "@/components/WimbledonCallout";

export const metadata: Metadata = {
  title: "Rankings123 — Live Sports Rankings",
  description:
    "Live ATP & WTA tennis rankings, FIFA World Cup 2026 standings. Updated in real time.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rankings123 — Live Sports Rankings",
    description:
      "Live ATP & WTA tennis rankings, FIFA World Cup 2026 standings.",
    url: "/",
    type: "website",
  },
};

const tennisLinks = [
  { href: "/atp-live", label: "ATP Live", sub: "Men's live rankings", sport: "atp", isLive: true },
  { href: "/wta-live", label: "WTA Live", sub: "Women's live rankings", sport: "wta", isLive: true },
  { href: "/wta-rankings", label: "WTA Rankings", sub: "Full women's rankings", sport: "wta", isLive: false },
];

const worldCupLinks = [
  { href: "/world-cup", label: "FIFA 2026", sub: "Live standings & schedule", sport: "worldcup", isLive: true },
  { href: "/world-cup/final-2026-predictions", label: "Final Predictions", sub: "Expert analysis & tactical preview", sport: "worldcup", isLive: false },
];

const cyclingLinks = [
  { href: "/cycling", label: "Tour de France 2026", sub: "Stages, GC standings & jersey leaders", sport: "cycling", isLive: true },
];

// Show cycling during Tour de France (July 4-26, 2026) + 1 week pre-race promo
function isTourDeFranceActive(): boolean {
  const now = new Date();
  const year = 2026;
  const promoStart = new Date(year, 5, 27); // June 27 (month is 0-indexed)
  const raceEnd = new Date(year, 6, 26); // July 26
  return now >= promoStart && now <= raceEnd;
}

function SportCard({
  href,
  label,
  sub,
  sport,
  isLive,
  animationIndex = 0
}: {
  href: string;
  label: string;
  sub: string;
  sport: string;
  isLive: boolean;
  animationIndex?: number;
}) {
  const animationClass = animationIndex > 0 ? `animate-entrance-card-${animationIndex}` : 'animate-entrance-card';
  return (
    <Link
      href={href}
      data-sport={sport}
      className={`${animationClass} group flex items-center justify-between rounded-2xl border border-edge bg-surface p-5 transition hover:border-accent/60 hover:bg-surface2`}
    >
      <div>
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
                style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
          )}
          <span className="text-lg font-bold text-fg">{label}</span>
        </div>
        <p className="mt-1 text-xs text-muted">{sub}</p>
      </div>
      <span className="text-accent transition group-hover:translate-x-0.5">→</span>
    </Link>
  );
}

export default function HomePage() {
  const showTourDeFrance = isTourDeFranceActive();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <HeroBanner
        icon="🏆"
        title="Live Sports Rankings"
        subtitle={showTourDeFrance
          ? "Real-time ATP & WTA tennis, FIFA World Cup, Tour de France 2026."
          : "Real-time ATP & WTA tennis, FIFA World Cup standings."
        }
        live={false}
        stats={[
          { label: "Sports", value: showTourDeFrance ? "Tennis · Football · Cycling" : "Tennis · Football" },
          { label: "Updated", value: "Live" },
        ]}
      />

      {/* Wimbledon 2026 LIVE Callout - shows during tournament (June 29 - July 12) */}
      <WimbledonCallout />

      {/* Live World Cup Matches Widget - shows only when matches are in progress */}
      <LiveWorldCupWidget />

      {/* Live Tour de France Widget - shows during race (July 4-26, 2026) */}
      <LiveTdfWidget />

      {/* Tennis Section */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-muted">
          Tennis
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {tennisLinks.map((link, i) => (
            <SportCard key={link.href} {...link} animationIndex={i + 1} />
          ))}
        </div>
      </section>

      {/* World Cup Section */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-muted">
          World Cup
        </h2>
        <div className="grid gap-4">
          {worldCupLinks.map((link, i) => (
            <SportCard key={link.href} {...link} animationIndex={tennisLinks.length + i + 1} />
          ))}
        </div>
      </section>

      {/* Cycling Section - shown during Tour de France (July 4-26, 2026) */}
      {showTourDeFrance && (
        <section className="mb-12">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-muted">
            Cycling
          </h2>
          <div className="grid gap-4">
            {cyclingLinks.map((link, i) => (
              <SportCard key={link.href} {...link} animationIndex={tennisLinks.length + worldCupLinks.length + i + 1} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
