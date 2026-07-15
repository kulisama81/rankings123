import type { Metadata } from "next";
import { getUciRanking } from "@/lib/uciRankingFeed";
import HeroBanner from "@/components/HeroBanner";
import UciRankingTable from "@/components/UciRankingTable";

export const metadata: Metadata = {
  title: "UCI Cycling World Ranking — Live Rankings",
  description:
    "Live UCI Cycling World Rankings updated daily: top professional cyclists ranked by points across all disciplines and major tours.",
  alternates: { canonical: "/cycling/uci-ranking" },
  openGraph: {
    title: "UCI Cycling World Ranking — Live Rankings — Rankings123",
    description:
      "Live UCI Cycling World Rankings updated daily: top professional cyclists ranked by points.",
    url: "/cycling/uci-ranking",
    type: "website",
  },
};

export const revalidate = 86400; // ISR: 24 hour cache (rankings update daily)

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "UCI Cycling World Ranking — Live Rankings — Rankings123",
  description:
    "Live UCI Cycling World Rankings updated daily: top professional cyclists ranked by points across all disciplines and major tours.",
  url: "https://rankings123.com/cycling/uci-ranking",
  inLanguage: "en",
};

export default async function UciRankingPage() {
  const rankingData = await getUciRanking();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-base">
        <HeroBanner
          icon="🚴"
          title="UCI World Ranking"
          subtitle={`Top ${rankingData.riders.length} professional cyclists`}
          live={false}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Rankings Table */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              World Rankings
              <span className="ml-3 text-sm font-normal text-secondary">
                {rankingData.source === "cyclingranking"
                  ? "via CyclingRanking.com"
                  : rankingData.source === "firstcycling"
                    ? "via FirstCycling"
                    : "preview data"}
              </span>
            </h2>
            <div className="overflow-hidden rounded-xl border border-edge bg-surface shadow-md">
              <UciRankingTable riders={rankingData.riders} />
            </div>
          </section>

          {/* Data source notice */}
          <div className="mb-12 rounded-xl border border-edge bg-surface p-4 text-sm text-secondary">
            <p>
              <strong className="text-primary">Data Source:</strong> Ranking information sourced from{" "}
              {rankingData.source === "cyclingranking"
                ? "CyclingRanking.com"
                : rankingData.source === "firstcycling"
                  ? "FirstCycling.com"
                  : "preview data"}
              . Rankings reflect cumulative points across all cycling disciplines and major tours.
              {rankingData.source === "mock" && " Currently showing preview data."}
            </p>
            <p className="mt-2">
              <strong className="text-primary">Last updated:</strong>{" "}
              {new Date(rankingData.lastUpdated).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                timeZoneName: "short",
              })}
            </p>
          </div>

          {/* Related Pages */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              More Cycling
              <span className="ml-3 text-sm font-normal text-secondary">
                Live race coverage
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="/cycling"
                className="rounded-xl border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-hover"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🇫🇷</span>
                  <h3 className="text-xl font-bold text-primary">Tour de France 2026</h3>
                </div>
                <p className="mb-3 text-sm text-secondary">July 4-26, 2026</p>
                <p className="text-sm text-primary">
                  Live stage results, GC standings, and jersey leaders
                </p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
