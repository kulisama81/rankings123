import type { Metadata } from "next";
import { getRaceData } from "@/lib/raceFeed";
import LiveRankingView from "@/components/LiveRankingView";
import YouTubeHighlights from "@/components/YouTubeHighlights";
import { YOUTUBE_HIGHLIGHTS } from "@/config/youtube";

export const metadata: Metadata = {
  title: "ATP Race to Turin — Year-to-Date Rankings",
  description:
    "ATP Race to Turin: Year-to-date points rankings for ATP Finals qualification. See who's leading the race to the season-ending championship.",
  alternates: { canonical: "/atp-race" },
  openGraph: {
    title: "ATP Race to Turin — Rankings123",
    description:
      "ATP Race to Turin: Year-to-date points rankings for ATP Finals qualification. See who's leading the race to the season-ending championship.",
    url: "/atp-race",
    type: "website",
  },
};

export const revalidate = 60;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ATP Race to Turin — Rankings123",
  description:
    "ATP Race to Turin: Year-to-date points rankings for ATP Finals qualification.",
  url: "https://rankings123.com/atp-race",
  inLanguage: "en",
};

export default async function AtpRacePage() {
  const snapshot = await getRaceData("atp");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="atp">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-fg mb-2">
              ATP Race to Turin
            </h1>
            <p className="text-muted">
              Year-to-date points only (resets January 1). Top 8 qualify for the ATP Finals.
              Race points = current season performance only.
            </p>
          </div>
          <LiveRankingView tour="atp" snapshot={snapshot} />
          <div className="mt-12">
            <YouTubeHighlights
              videoId={YOUTUBE_HIGHLIGHTS.atp.videoId}
              title={YOUTUBE_HIGHLIGHTS.atp.title}
            />
          </div>
        </div>
      </div>
    </>
  );
}
