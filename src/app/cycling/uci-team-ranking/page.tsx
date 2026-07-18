import type { Metadata } from "next";
import { getUciTeamRanking } from "@/lib/uciTeamRankingFeed";
import HeroBanner from "@/components/HeroBanner";
import UciTeamRankingTable from "@/components/UciTeamRankingTable";

export const metadata: Metadata = {
  title: "UCI Cycling Team Rankings — Live Rankings",
  description:
    "Live UCI Cycling Team Rankings updated daily: top professional cycling teams ranked by points across all disciplines and major tours.",
  alternates: { canonical: "/cycling/uci-team-ranking" },
  openGraph: {
    title: "UCI Cycling Team Rankings — Live Rankings — Rankings123",
    description:
      "Live UCI Cycling Team Rankings updated daily: top professional cycling teams ranked by points.",
    url: "/cycling/uci-team-ranking",
    type: "website",
  },
};

export const revalidate = 86400; // ISR: 24 hour cache (rankings update daily)

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "UCI Cycling Team Rankings — Live Rankings — Rankings123",
  description:
    "Live UCI Cycling Team Rankings updated daily: top professional cycling teams ranked by points across all disciplines and major tours.",
  url: "https://rankings123.com/cycling/uci-team-ranking",
  inLanguage: "en",
};

export default async function UciTeamRankingPage() {
  const rankingData = await getUciTeamRanking();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-base">
        <HeroBanner
          sport="cycling"
          title="UCI Team Rankings"
          subtitle={`Top ${rankingData.teams.length} professional cycling teams`}
          live={false}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Rankings Table */}
          <section className="my-8">
            <UciTeamRankingTable teams={rankingData.teams} />
          </section>

          {/* Source indicator */}
          <div className="my-6 text-center text-sm text-muted">
            <p>
              Source: {rankingData.source === "cyclingranking" && "CyclingRanking.com"}
              {rankingData.source === "firstcycling" && "FirstCycling.com"}
              {rankingData.source === "mock" && "Demo data (live feed unavailable)"}
            </p>
            <p className="mt-1">Last updated: {new Date(rankingData.lastUpdated).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
