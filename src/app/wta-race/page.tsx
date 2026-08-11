import type { Metadata } from "next";
import { getRaceData } from "@/lib/raceFeed";
import LiveRankingView from "@/components/LiveRankingView";
import YouTubeHighlights from "@/components/YouTubeHighlights";
import { YOUTUBE_HIGHLIGHTS } from "@/config/youtube";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const snapshot = await getRaceData("wta");
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  // Get top 3 in the race
  const top3 = snapshot.players
    .slice(0, 3)
    .map((p, i) => {
      const lastName = p.name.split(" ").pop() || p.name;
      return `${i + 1}. ${lastName}`;
    })
    .join(", ");

  const leader = snapshot.players[0] ? snapshot.players[0].name.split(" ").pop() : "Leader";
  const title = `WTA Race to Finals ${month} ${year} — ${leader} Leads`;
  const description = `WTA Race to Finals ${month} ${year}: ${top3}. Year-to-date points rankings for WTA Finals qualification. See who's leading the race to the season-ending championship.`;

  return {
    title,
    description,
    alternates: { canonical: "/wta-race" },
    openGraph: {
      title: `${title} — Rankings123`,
      description,
      url: "/wta-race",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Rankings123`,
      description,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "WTA Race to Finals — Rankings123",
  description:
    "WTA Race to Finals: Year-to-date points rankings for WTA Finals qualification.",
  url: "https://rankings123.com/wta-race",
  inLanguage: "en",
};

export default async function WtaRacePage() {
  const snapshot = await getRaceData("wta");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="wta">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-fg mb-2">
              WTA Race to Finals
            </h1>
            <p className="text-muted">
              Year-to-date points only (resets January 1). Top 8 qualify for the WTA Finals.
              Race points = current season performance only.
            </p>
          </div>
          <LiveRankingView tour="wta" snapshot={snapshot} />
          <div className="mt-12">
            <YouTubeHighlights
              videoId={YOUTUBE_HIGHLIGHTS.wta.videoId}
              title={YOUTUBE_HIGHLIGHTS.wta.title}
            />
          </div>
        </div>
      </div>
    </>
  );
}
