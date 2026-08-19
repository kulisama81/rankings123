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
import MobileHomepageHero from "@/components/MobileHomepageHero";
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

      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10 sm:px-6 lg:px-8">
        {/* Mobile-first Hero - shows most urgent event (Cincinnati/US Open) */}
        <div className="md:hidden">
          <MobileHomepageHero />
        </div>

        {/* Desktop: Countdown timer - shows when major event is upcoming (within 24h but not started) */}
        <div className="hidden md:block">
          <UpcomingEventCountdown />
        </div>

        {/* Desktop: SIGNATURE VISUAL ANCHOR - ATP/WTA #1 Rank Showcase with dramatic points display */}
        <div className="hidden md:block">
          <RankShowcase />
        </div>

        {/* Desktop: Live Now Widget - consolidated hero showing ALL live events with match counts */}
        <div className="hidden md:block">
          <LiveNowWidget />
        </div>

        {/* Desktop: Featured Event Hero - dynamically shows most relevant current/upcoming event */}
        <div className="hidden md:block">
          <FeaturedEventHero />
        </div>

        {/* Homepage Rankings Preview - shows top 3 on mobile, more on desktop */}
        <HomepageRankingsPreview />

        {/* Unified Sports Hub - consolidates Live Now + All Sports to reduce cognitive load */}
        <div className="hidden sm:block">
          <UnifiedSportsHub />
        </div>

        {/* Wimbledon 2026 LIVE Callout - shows during tournament (June 29 - July 12) */}
        <WimbledonCallout />

        {/* Cincinnati Open 2026 Live Scores - shows during tournament (Aug 11-23) */}
        <div className="hidden md:block">
          <CincinnatiLiveScoresWidget />
        </div>

        {/* World Cup Final Widget - shows before/during/after Final with cross-sport pivot */}
        <div className="hidden md:block">
          <WorldCupFinalWidget />
        </div>

        {/* Live World Cup Matches Widget - shows only when matches are in progress */}
        <div className="hidden md:block">
          <LiveWorldCupWidget />
        </div>

        {/* Live Tour de France Widget - shows during race (July 4-26, 2026) */}
        <div className="hidden md:block">
          <LiveTdfWidget />
        </div>
      </div>
    </>
  );
}
