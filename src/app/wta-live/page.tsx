import type { Metadata } from "next";
import { getLiveData } from "@/lib/liveFeed";
import LiveRankingView from "@/components/LiveRankingView";
import YouTubeHighlights from "@/components/YouTubeHighlights";
import WimbledonCallout from "@/components/WimbledonCallout";
import { YOUTUBE_HIGHLIGHTS } from "@/config/youtube";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  JsonLd,
} from "@/lib/structuredData";

// ISR with 60s revalidation — searchParams handled client-side in LiveRankingTable
// to avoid build-time suspension. Component renders with default state (all countries)
// during SSG, then hydrates with URL params on mount.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const snapshot = await getLiveData("wta");
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  // Get top 3 players for keyword-rich meta tags
  const top3 = snapshot.players
    .slice(0, 3)
    .map((p) => {
      const lastName = p.name.split(" ").pop() || p.name;
      return `${lastName} #${p.liveRank}`;
    })
    .join(", ");

  const leader = snapshot.players[0] ? snapshot.players[0].name.split(" ").pop() : "Live Updates";
  const title = `WTA Live Rankings ${month} ${year} | ${leader}`;
  const description = `Live WTA tennis rankings ${month} ${year}: ${top3}. Real-time points, rank movement, and tournament progress updated during every match.`;

  return {
    title,
    description,
    alternates: { canonical: "/wta-live" },
    openGraph: {
      title: `${title} — Rankings123`,
      description,
      url: "/wta-live",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function WtaLivePage() {
  const snapshot = await getLiveData("wta");

  // Structured data for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "WTA Live Rankings" },
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: "How are WTA rankings calculated?",
      answer:
        "WTA rankings use a rolling 52-week system based on a player's best 16 tournament results. Points are awarded by tournament category (Grand Slams, WTA 1000, 500, 250) and round reached. Rankings update every Monday after tournament completion.",
    },
    {
      question: "How often do WTA live rankings update?",
      answer:
        "WTA live rankings update in real-time during tournament matches. As players advance or are eliminated, their point totals and rankings recalculate instantly. Official rankings are published weekly on Monday mornings.",
    },
    {
      question: "What is the WTA Race ranking?",
      answer:
        "The WTA Race to the Finals tracks year-to-date points earned in the current calendar year. It determines qualification for the WTA Finals in November. Unlike the standard WTA ranking (52-week rolling), the Race resets to zero on January 1st each year.",
    },
    {
      question: "What does 'in play' mean in WTA rankings?",
      answer:
        "'In play' indicates a player is currently competing in an active tournament. Their ranking and points may change based on their performance. The system shows live point estimates based on their current round progress.",
    },
    {
      question: "How many tournaments count toward WTA rankings?",
      answer:
        "A player's WTA ranking is based on their best 16 tournament results over the rolling 52-week period. This includes mandatory Premier events and Grand Slams (for top players) plus the player's next best results.",
    },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "WTA Live Ranking — Rankings123",
    description:
      "Live WTA ranking updated in real time during tournaments: live points, rank movement, and current tournament progress.",
    url: "https://rankings123.com/wta-live",
    inLanguage: "en",
    breadcrumb: breadcrumbSchema,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <div data-sport="wta">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <a
              href="/wta-race"
              className="inline-flex items-center min-h-11 text-sm font-medium text-fg hover:text-accent transition"
            >
              View WTA Race to Finals (YTD Points) →
            </a>
          </div>
        </div>
        <LiveRankingView tour="wta" snapshot={snapshot} />
        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <WimbledonCallout variant="compact" />
          <YouTubeHighlights
            videoId={YOUTUBE_HIGHLIGHTS.wta.videoId}
            title={YOUTUBE_HIGHLIGHTS.wta.title}
          />
        </div>
      </div>
    </>
  );
}
