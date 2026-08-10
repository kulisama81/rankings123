import type { Metadata } from "next";
import UpcomingEventCountdown from "@/components/UpcomingEventCountdown";
import LiveNowHero from "@/components/LiveNowHero";
import LiveSportCard from "@/components/LiveSportCard";
import LiveWorldCupWidget from "@/components/LiveWorldCupWidget";
import WorldCupFinalWidget from "@/components/WorldCupFinalWidget";
import LiveTdfWidget from "@/components/LiveTdfWidget";
import WimbledonCallout from "@/components/WimbledonCallout";
import FeaturedEventHero from "@/components/FeaturedEventHero";

export const metadata: Metadata = {
  title: "Rankings123 — Live Sports Rankings",
  description:
    "Live ATP & WTA tennis rankings, World Cup results, Tour de France, Cincinnati Open. Updated in real time.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rankings123 — Live Sports Rankings",
    description:
      "Live ATP & WTA tennis rankings, latest tournament results and upcoming events.",
    url: "/",
    type: "website",
  },
};

// Show cycling during Tour de France (July 4-26, 2026) + 1 week pre-race promo
function isTourDeFranceActive(): boolean {
  const now = new Date();
  const year = 2026;
  const promoStart = new Date(year, 5, 27); // June 27 (month is 0-indexed)
  const raceEnd = new Date(year, 6, 26); // July 26
  return now >= promoStart && now <= raceEnd;
}

// All sport links for the homepage
const allSportLinks = [
  { href: "/atp-live", label: "ATP Live", sub: "Men's live rankings", sport: "atp", isLive: true, showRankPeek: true },
  { href: "/wta-live", label: "WTA Live", sub: "Women's live rankings", sport: "wta", isLive: true, showRankPeek: true },
  { href: "/wta-rankings", label: "WTA Rankings", sub: "Full women's rankings", sport: "wta", isLive: false },
  { href: "/world-cup", label: "FIFA 2026", sub: "Live standings & schedule", sport: "worldcup", isLive: true },
  { href: "/world-cup/final-2026-predictions", label: "Final Predictions", sub: "Expert analysis & tactical preview", sport: "worldcup", isLive: false },
  { href: "/cycling", label: "Tour de France 2026", sub: "Stages, GC standings & jersey leaders", sport: "cycling", isLive: true },
];

export default function HomePage() {
  const showTourDeFrance = isTourDeFranceActive();

  // Filter sport links based on active events
  const activeLinks = allSportLinks.filter(link => {
    if (link.sport === "cycling") return showTourDeFrance;
    return true;
  });

  // Sort: live cards first, then non-live
  const sortedLinks = [...activeLinks].sort((a, b) => {
    if (a.isLive && !b.isLive) return -1;
    if (!a.isLive && b.isLive) return 1;
    return 0;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Countdown timer - shows when major event is upcoming (within 24h but not started) */}
      <UpcomingEventCountdown />

      {/* Featured Event Hero - dynamically shows most relevant current/upcoming event */}
      <FeaturedEventHero />

      {/* Dynamic LIVE NOW hero - shows what's actually live */}
      <LiveNowHero />

      {/* Wimbledon 2026 LIVE Callout - shows during tournament (June 29 - July 12) */}
      <WimbledonCallout />

      {/* World Cup Final Widget - shows before/during/after Final with cross-sport pivot */}
      <WorldCupFinalWidget />

      {/* Live World Cup Matches Widget - shows only when matches are in progress */}
      <LiveWorldCupWidget />

      {/* Live Tour de France Widget - shows during race (July 4-26, 2026) */}
      <LiveTdfWidget />

      {/* All Sports Grid - live cards enlarged and float to top */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-muted">
          All Sports
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {sortedLinks.map((link) => (
            <LiveSportCard
              key={link.href}
              href={link.href}
              label={link.label}
              sub={link.sub}
              sport={link.sport}
              isLive={link.isLive}
              showRankPeek={link.showRankPeek}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
