import type { Metadata } from "next";
import UpcomingEventCountdown from "@/components/UpcomingEventCountdown";
import UnifiedSportsHub from "@/components/UnifiedSportsHub";
import LiveWorldCupWidget from "@/components/LiveWorldCupWidget";
import WorldCupFinalWidget from "@/components/WorldCupFinalWidget";
import LiveTdfWidget from "@/components/LiveTdfWidget";
import WimbledonCallout from "@/components/WimbledonCallout";
import CincinnatiLiveScoresWidget from "@/components/CincinnatiLiveScoresWidget";
import FeaturedEventHero from "@/components/FeaturedEventHero";
import RankShowcase from "@/components/RankShowcase";
import HomepageRankingsPreview from "@/components/HomepageRankingsPreview";
import LiveNowWidget from "@/components/LiveNowWidget";
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

      {/* Live Now Widget - consolidated hero showing ALL live events with match counts */}
      <LiveNowWidget />

      {/* Featured Event Hero - dynamically shows most relevant current/upcoming event */}
      <FeaturedEventHero />

      {/* Unified Sports Hub - consolidates Live Now + All Sports to reduce cognitive load */}
      <UnifiedSportsHub />

      {/* Wimbledon 2026 LIVE Callout - shows during tournament (June 29 - July 12) */}
      <WimbledonCallout />

      {/* Cincinnati Open 2026 Live Scores - shows during tournament (Aug 11-23) */}
      <CincinnatiLiveScoresWidget />

      {/* World Cup Final Widget - shows before/during/after Final with cross-sport pivot */}
      <WorldCupFinalWidget />

      {/* Live World Cup Matches Widget - shows only when matches are in progress */}
      <LiveWorldCupWidget />

      {/* Live Tour de France Widget - shows during race (July 4-26, 2026) */}
      <LiveTdfWidget />

      {/* Homepage Rankings Preview - shows top 5 ATP/WTA and top 3 Golden Boot */}
      <HomepageRankingsPreview />
      </div>
    </>
  );
}
