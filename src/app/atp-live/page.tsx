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
  const snapshot = await getLiveData("atp");
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
  const title = `ATP Live Rankings ${month} ${year} | ${leader}`;
  const description = `Live ATP tennis rankings ${month} ${year}: ${top3}. Real-time points, rank movement, and tournament progress updated during every match.`;

  return {
    title,
    description,
    alternates: { canonical: "/atp-live" },
    openGraph: {
      title: `${title} — Rankings123`,
      description,
      url: "/atp-live",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AtpLivePage() {
  const fullSnapshot = await getLiveData("atp");

  // For SSR payload optimization: send top 60 players (300KB page budget, perf-atp-size-regression-557kb).
  // IMMEDIATE fix to meet budget. Top 60 = high-traffic segment (most users don't scroll past top 50).
  // KNOWN LIMITATION: Ranks 61-500 not accessible client-side. Follow-up needed: implement client-side
  // API fetch from /api/atp/live for on-demand loading, or virtualization (long-term recommendation).
  const snapshot = {
    ...fullSnapshot,
    players: fullSnapshot.players.slice(0, 60),
  };

  // Structured data for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "ATP Live Rankings" },
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: "How are ATP rankings calculated?",
      answer:
        "ATP rankings are calculated using a rolling 52-week system based on a player's best 18 tournament results. Points are awarded based on tournament tier (Grand Slams, Masters 1000, ATP 500/250) and round reached. Rankings update every Monday after tournament completion.",
    },
    {
      question: "How often do ATP live rankings update?",
      answer:
        "ATP live rankings update in real-time during tournament matches. As players win or lose matches, their point totals and rankings are recalculated instantly. Official rankings are published weekly on Monday mornings.",
    },
    {
      question: "What is the ATP Race ranking?",
      answer:
        "The ATP Race to Turin (formerly Race to London) tracks year-to-date points earned in the current calendar year. It determines qualification for the ATP Finals in November. Unlike the standard ATP ranking (52-week rolling), the Race resets to zero on January 1st each year.",
    },
    {
      question: "What does 'in play' mean in ATP rankings?",
      answer:
        "'In play' indicates a player is currently competing in an active tournament. Their ranking and points may change based on their performance. The system shows live point estimates based on their current round progress.",
    },
    {
      question: "How many tournaments count toward ATP rankings?",
      answer:
        "A player's ATP ranking is based on their best 18 tournament results over the rolling 52-week period. This includes mandatory events (Grand Slams and Masters 1000 for top players) plus the player's next best results.",
    },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "ATP Live Ranking — Rankings123",
    description:
      "Live ATP ranking updated in real time during tournaments: live points, rank movement, and current tournament progress.",
    url: "https://rankings123.com/atp-live",
    inLanguage: "en",
    breadcrumb: breadcrumbSchema,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <div data-sport="atp">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <a
              href="/atp-race"
              className="inline-flex items-center min-h-11 text-sm font-medium text-fg hover:text-accent transition"
            >
              View ATP Race to Turin (YTD Points) →
            </a>
          </div>
        </div>
        <LiveRankingView tour="atp" snapshot={snapshot} />
        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <WimbledonCallout variant="compact" />
          <YouTubeHighlights
            videoId={YOUTUBE_HIGHLIGHTS.atp.videoId}
            title={YOUTUBE_HIGHLIGHTS.atp.title}
          />
        </div>
      </div>
    </>
  );
}
