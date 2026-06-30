import type { Metadata } from "next";
import { getLiveData } from "@/lib/liveFeed";
import LiveRankingView from "@/components/LiveRankingView";
import YouTubeHighlights from "@/components/YouTubeHighlights";
import { YOUTUBE_HIGHLIGHTS } from "@/config/youtube";

export const metadata: Metadata = {
  title: "ATP Live Ranking",
  description:
    "Live ATP ranking updated in real time during tournaments: live points, rank movement, and current tournament progress.",
  alternates: { canonical: "/atp-live" },
  openGraph: {
    title: "ATP Live Ranking — Rankings123",
    description:
      "Live ATP ranking updated in real time during tournaments: live points, rank movement, and current tournament progress.",
    url: "/atp-live",
    type: "website",
  },
};

// ISR with 60s revalidation — searchParams handled client-side in LiveRankingTable
// to avoid build-time suspension. Component renders with default state (all countries)
// during SSG, then hydrates with URL params on mount.
export const revalidate = 60;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ATP Live Ranking — Rankings123",
  description:
    "Live ATP ranking updated in real time during tournaments: live points, rank movement, and current tournament progress.",
  url: "https://rankings123.com/atp-live",
  inLanguage: "en",
};

export default async function AtpLivePage() {
  const snapshot = await getLiveData("atp");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="atp">
        <LiveRankingView tour="atp" snapshot={snapshot} />
        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <YouTubeHighlights
            videoId={YOUTUBE_HIGHLIGHTS.atp.videoId}
            title={YOUTUBE_HIGHLIGHTS.atp.title}
          />
        </div>
      </div>
    </>
  );
}
