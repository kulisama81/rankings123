import type { Metadata } from "next";
import UpcomingEventCountdown from "@/components/UpcomingEventCountdown";
import LiveNowHero from "@/components/LiveNowHero";
import LiveSportCard from "@/components/LiveSportCard";
import LiveWorldCupWidget from "@/components/LiveWorldCupWidget";
import WorldCupFinalWidget from "@/components/WorldCupFinalWidget";
import LiveTdfWidget from "@/components/LiveTdfWidget";
import WimbledonCallout from "@/components/WimbledonCallout";
import FeaturedEventHero from "@/components/FeaturedEventHero";

export async function generateMetadata(): Promise<Metadata> {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  // Highlight current live events
  const title = `Live Sports Rankings ${month} ${year} — ATP, WTA, World Cup`;
  const description = `Live ATP & WTA tennis rankings, FIFA World Cup 2026 standings, Tour de France, and Cincinnati Open ${month} ${year}. Real-time updates during every tournament.`;

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title: `Rankings123 — Live Sports Rankings ${month} ${year}`,
      description,
      url: "/",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Rankings123 — Live Sports Rankings ${month} ${year}`,
      description,
    },
  };
}

// Show cycling when ANY Grand Tour is active or upcoming (within 7 days)
// Checks race dates from the cycling races config
async function isCyclingActive(): Promise<boolean> {
  try {
    const { getCyclingRaces, getPrimaryRace } = await import("@/lib/cyclingFeed");
    const races = await getCyclingRaces();
    const primary = getPrimaryRace(races);

    if (!primary) return false;

    // Show if race is active OR upcoming within 7 days
    if (primary.raceStatus === "active") return true;

    if (primary.raceStatus === "upcoming") {
      const now = new Date();
      const start = new Date(primary.metadata.startDate);
      const daysUntilStart = (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return daysUntilStart <= 7; // Show 7 days before race
    }

    return false;
  } catch {
    return false;
  }
}

export default async function HomePage() {
  const showCycling = await isCyclingActive();

  // Get primary cycling race for dynamic label
  let cyclingLabel = "Cycling";
  let cyclingSub = "Grand Tour coverage";
  try {
    const { getCyclingRaces, getPrimaryRace } = await import("@/lib/cyclingFeed");
    const races = await getCyclingRaces();
    const primary = getPrimaryRace(races);
    if (primary) {
      cyclingLabel = primary.metadata.name;
      cyclingSub = "Stages, GC standings & jersey leaders";
    }
  } catch {
    // Fall back to generic label
  }

  // All sport links for the homepage
  const allSportLinks = [
    { href: "/atp-live", label: "ATP Live", sub: "Men's live rankings", sport: "atp", isLive: true, showRankPeek: true },
    { href: "/wta-live", label: "WTA Live", sub: "Women's live rankings", sport: "wta", isLive: true, showRankPeek: true },
    { href: "/wta-rankings", label: "WTA Rankings", sub: "Full women's rankings", sport: "wta", isLive: false },
    { href: "/world-cup", label: "FIFA 2026", sub: "Live standings & schedule", sport: "worldcup", isLive: true },
    { href: "/world-cup/final-2026-predictions", label: "Final Predictions", sub: "Expert analysis & tactical preview", sport: "worldcup", isLive: false },
    { href: "/cycling", label: cyclingLabel, sub: cyclingSub, sport: "cycling", isLive: true },
  ];

  // Filter sport links based on active events
  const activeLinks = allSportLinks.filter(link => {
    if (link.sport === "cycling") return showCycling;
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
