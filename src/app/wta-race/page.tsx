import type { Metadata } from "next";
import { getRaceData } from "@/lib/raceFeed";
import LiveRankingView from "@/components/LiveRankingView";
import YouTubeHighlights from "@/components/YouTubeHighlights";
import { YOUTUBE_HIGHLIGHTS } from "@/config/youtube";

export const metadata: Metadata = {
  title: "WTA Race to Finals — Year-to-Date Rankings",
  description:
    "WTA Race to Finals: Year-to-date points rankings for WTA Finals qualification. See who's leading the race to the season-ending championship.",
  alternates: { canonical: "/wta-race" },
  openGraph: {
    title: "WTA Race to Finals — Rankings123",
    description:
      "WTA Race to Finals: Year-to-date points rankings for WTA Finals qualification. See who's leading the race to the season-ending championship.",
    url: "/wta-race",
    type: "website",
  },
};

export const revalidate = 60;

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
