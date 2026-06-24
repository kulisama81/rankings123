import type { Metadata } from "next";
import { getWorldCupData } from "@/lib/worldCupFeed";
import WorldCupScenarios from "@/components/WorldCupScenarios";
import HeroBanner from "@/components/HeroBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "World Cup 2026 Group Qualification Scenarios",
  description:
    "Interactive World Cup 2026 qualification calculator: simulate match results and see who advances from each group. Try different scenarios and outcomes.",
  alternates: { canonical: "/world-cup/scenarios" },
  openGraph: {
    title: "World Cup 2026 Group Qualification Scenarios — Rankings123",
    description:
      "Interactive World Cup 2026 qualification calculator: simulate match results and see who advances from each group.",
    url: "/world-cup/scenarios",
    type: "website",
  },
};

export const revalidate = 60; // ISR: 1 minute cache

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "World Cup 2026 Group Qualification Scenarios — Rankings123",
  description:
    "Interactive World Cup 2026 qualification calculator: simulate match results and see who advances from each group.",
  url: "https://rankings123.com/world-cup/scenarios",
  inLanguage: "en",
};

export default async function WorldCupScenariosPage() {
  const snapshot = await getWorldCupData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="worldcup" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/world-cup"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <span>←</span>
          <span>Back to World Cup</span>
        </Link>

        <HeroBanner
          icon="⚽"
          title="Group Qualification Scenarios"
          subtitle="Simulate match results to see who advances from each group"
          stats={[
            { label: "Groups", value: String(snapshot.groups.length) },
            {
              label: "Qualify",
              value: String(snapshot.groups.length * 2 + 8) + " teams"
            },
          ]}
        />

        <div className="my-8 rounded-2xl border border-edge bg-surface p-6">
          <h2 className="mb-3 text-lg font-semibold text-fg">How it works</h2>
          <div className="space-y-2 text-sm text-muted">
            <p>
              • Enter scores for upcoming group stage matches to simulate different outcomes
            </p>
            <p>
              • Group standings update automatically based on your simulated results
            </p>
            <p>
              • Top 2 teams from each group + 8 best 3rd-place teams advance to Round of 32
            </p>
            <p>
              • Tiebreakers: Points → Goal Difference → Goals Scored → Head-to-head → Fair Play → FIFA Ranking
            </p>
          </div>
        </div>

        <WorldCupScenarios initialSnapshot={snapshot} />
      </div>
    </>
  );
}
