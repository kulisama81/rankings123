import type { Metadata } from "next";
import Link from "next/link";
import { getF1Standings } from "@/lib/f1Feed";
import HeroBanner from "@/components/HeroBanner";
import F1DriversTable from "@/components/F1DriversTable";
import F1ConstructorsTable from "@/components/F1ConstructorsTable";

export const metadata: Metadata = {
  title: "F1 Standings 2026 — Live Driver & Constructor Championship",
  description:
    "Live 2026 Formula 1 World Championship standings: driver rankings, constructor points, and season leaderboard updated after every race.",
  alternates: { canonical: "/f1" },
  openGraph: {
    title: "F1 2026 Championship Standings — Live Rankings — Rankings123",
    description:
      "Live F1 driver and constructor standings for the 2026 season, updated after every race weekend.",
    url: "/f1",
    type: "website",
  },
};

export const revalidate = 300; // ISR: 5 min cache (aggressive during race weekends)

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "F1 2026 Championship Standings — Live Rankings — Rankings123",
  description:
    "Live Formula 1 World Championship standings for 2026: driver and constructor points updated after every race.",
  url: "https://rankings123.com/f1",
  inLanguage: "en",
};

export default async function F1Page() {
  const standings = await getF1Standings();

  const leader = standings.drivers[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-base">
        <HeroBanner
          sport="f1"
          title="Formula 1 2026"
          subtitle={
            leader
              ? `${leader.driver} leads with ${leader.points} points`
              : "Championship Standings"
          }
          live={false}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Drivers' Championship */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Drivers&apos; Championship
              <span className="ml-3 text-sm font-normal text-secondary">
                2026 Season
              </span>
            </h2>
            <div className="overflow-hidden rounded-xl border border-edge bg-surface shadow-md">
              <F1DriversTable drivers={standings.drivers} />
            </div>
          </section>

          {/* Constructors' Championship */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Constructors&apos; Championship
              <span className="ml-3 text-sm font-normal text-secondary">
                2026 Season
              </span>
            </h2>
            <div className="overflow-hidden rounded-xl border border-edge bg-surface shadow-md">
              <F1ConstructorsTable constructors={standings.constructors} />
            </div>
          </section>

          {/* Data source notice */}
          <div className="mb-12 rounded-xl border border-edge bg-surface p-4 text-sm text-secondary">
            <p>
              <strong className="text-primary">Data Source:</strong> Championship standings sourced from{" "}
              {standings.source === "wikipedia"
                ? "Wikipedia"
                : "preview data"}
              . Updated after every race weekend.
              {standings.source === "mock" && " Currently showing preview data."}
            </p>
            <p className="mt-2">
              <strong className="text-primary">Last updated:</strong>{" "}
              {new Date(standings.lastUpdated).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                timeZoneName: "short",
              })}
            </p>
          </div>

          {/* Related */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              More Rankings
              <span className="ml-3 text-sm font-normal text-secondary">
                Multi-sport coverage
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/atp-live"
                className="rounded-xl border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-hover"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎾</span>
                  <h3 className="text-xl font-bold text-primary">ATP Live Rankings</h3>
                </div>
                <p className="text-sm text-primary">
                  Real-time tennis rankings with tournament tracking
                </p>
              </Link>
              <Link
                href="/cycling/uci-ranking"
                className="rounded-xl border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-hover"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🚴</span>
                  <h3 className="text-xl font-bold text-primary">UCI Cycling Rankings</h3>
                </div>
                <p className="text-sm text-primary">
                  World cycling rankings across all disciplines
                </p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
