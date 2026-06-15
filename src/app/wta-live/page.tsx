import type { Metadata } from "next";
import { getLiveData } from "@/lib/liveFeed";
import LiveRankingView from "@/components/LiveRankingView";

export const metadata: Metadata = {
  title: "WTA Live Ranking",
  description:
    "Live WTA ranking updated in real time during tournaments: live points, rank movement, and current tournament progress.",
  alternates: { canonical: "/wta-live" },
  openGraph: {
    title: "WTA Live Ranking — Rankings123",
    description:
      "Live WTA ranking updated in real time during tournaments: live points, rank movement, and current tournament progress.",
    url: "/wta-live",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "WTA Live Ranking — Rankings123",
  description:
    "Live WTA ranking updated in real time during tournaments: live points, rank movement, and current tournament progress.",
  url: "https://rankings123.com/wta-live",
  inLanguage: "en",
};

export default async function WtaLivePage() {
  const snapshot = await getLiveData("wta");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LiveRankingView tour="wta" snapshot={snapshot} />
    </>
  );
}
