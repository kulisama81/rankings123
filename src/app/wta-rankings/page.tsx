import type { Metadata } from "next";
import { getWtaDeepRankingData } from "@/lib/wtaDeepRanking";
import AtpDeepRankingTable from "@/components/AtpDeepRankingTable";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "WTA Rankings — Full Women's Tennis Ranking",
  description:
    "Full WTA tennis ranking with live updates: official points, rank movement, career highs, and current tournament progress.",
  alternates: { canonical: "/wta-rankings" },
  openGraph: {
    title: "WTA Rankings — Full Ranking — Rankings123",
    description:
      "Full WTA tennis ranking with live updates: official points, rank movement, career highs, and current tournament progress.",
    url: "/wta-rankings",
    type: "website",
  },
};

export const revalidate = 60; // ISR: 1 minute cache with client-side polling for live updates

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "WTA Rankings — Full Ranking — Rankings123",
  description:
    "WTA tennis ranking: official points, rank movement, and career highs.",
  url: "https://rankings123.com/wta-rankings",
  inLanguage: "en",
};

export default async function WtaRankingsPage() {
  const snapshot = await getWtaDeepRankingData();
  const players = snapshot.players;
  const top = players[0];
  const liveCount = players.filter((p) => p.tournament?.active).length;

  const stats = top
    ? [
        { label: "WTA #1", value: `${top.flag} ${top.name}` },
        { label: "Points", value: top.livePoints.toLocaleString() },
        { label: "In play", value: String(liveCount) },
        { label: "Ranked", value: String(players.length) },
      ]
    : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="wta" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <HeroBanner
          icon="🎾"
          title="WTA Rankings"
          subtitle={snapshot.weekLabel}
          stats={stats}
        />
        <AtpDeepRankingTable initialSnapshot={snapshot} apiEndpoint="/api/wta/rankings" />
      </div>
    </>
  );
}
