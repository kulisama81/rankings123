import type { Metadata } from "next";
import UpcomingEventCountdown from "@/components/UpcomingEventCountdown";
import LiveNowHero from "@/components/LiveNowHero";
import LiveSportCard from "@/components/LiveSportCard";
import LiveWorldCupWidget from "@/components/LiveWorldCupWidget";
import WorldCupFinalWidget from "@/components/WorldCupFinalWidget";
import LiveTdfWidget from "@/components/LiveTdfWidget";
import WimbledonCallout from "@/components/WimbledonCallout";
import FeaturedEventHero from "@/components/FeaturedEventHero";
import RankShowcase from "@/components/RankShowcase";
import HomepageRankingsPreview from "@/components/HomepageRankingsPreview";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  JsonLd,
} from "@/lib/structuredData";

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

export default async function HomePage() {

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

  // All sport links are shown year-round (cycling page handles "no races" case gracefully)
  const activeLinks = allSportLinks;

  // Sort: live cards first, then non-live
  const sortedLinks = [...activeLinks].sort((a, b) => {
    if (a.isLive && !b.isLive) return -1;
    if (!a.isLive && b.isLive) return 1;
    return 0;
  });

  // Generate structured data for SEO
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      {/* Structured Data (JSON-LD) for Rich Search Results */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Countdown timer - shows when major event is upcoming (within 24h but not started) */}
        <UpcomingEventCountdown />

      {/* SIGNATURE VISUAL ANCHOR - ATP/WTA #1 Rank Showcase with dramatic points display */}
      <RankShowcase />

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

      {/* Homepage Rankings Preview - shows top 5 ATP/WTA and top 3 Golden Boot */}
      <HomepageRankingsPreview />

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
    </>
  );
}
