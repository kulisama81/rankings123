import type { Metadata } from "next";
import Link from "next/link";
import { getWorldCupStats } from "@/lib/worldCupFeed";
import GoldenBootRace from "@/components/GoldenBootRace";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "World Cup 2026 Golden Boot — Top Scorers & Assists | Rankings123",
  description:
    "Live FIFA World Cup 2026 adidas Golden Boot race: top scorers leaderboard with assists and appearances. Track Messi, Mbappé, Haaland, and more.",
  alternates: { canonical: "/world-cup/golden-boot" },
  openGraph: {
    title: "World Cup 2026 Golden Boot — Top Scorers & Assists — Rankings123",
    description:
      "Live FIFA World Cup 2026 adidas Golden Boot race: top scorers leaderboard with assists and appearances.",
    url: "/world-cup/golden-boot",
    type: "website",
  },
};

export const revalidate = 60; // ISR: 1 minute cache

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "World Cup 2026 Golden Boot — Top Scorers & Assists",
  description:
    "Live FIFA World Cup 2026 adidas Golden Boot race with goals, assists, and appearances.",
  url: "https://rankings123.com/world-cup/golden-boot",
  inLanguage: "en",
};

export default async function GoldenBootPage() {
  const stats = await getWorldCupStats();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="worldcup" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <HeroBanner
          icon="🥇"
          title="adidas Golden Boot"
          subtitle="FIFA World Cup 2026 · Top Scorers"
          stats={[
            { label: "Leader", value: stats.topScorers[0]?.playerShortName ?? "—" },
            { label: "Goals", value: String(stats.topScorers[0]?.value ?? 0) },
          ]}
        />

        <nav className="mb-8 flex flex-wrap gap-2 text-sm" aria-label="Breadcrumb">
          <Link
            href="/world-cup"
            className="text-accent transition-colors hover:text-accent/80"
          >
            World Cup 2026
          </Link>
          <span className="text-muted">/</span>
          <span className="font-medium text-fg">Golden Boot</span>
        </nav>

        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/[0.04] p-4 text-sm">
          <p className="font-semibold text-fg">Tiebreaker Rules (FIFA)</p>
          <p className="mt-1 text-muted">
            If players are tied on goals: 1) Most assists 2) Fewest minutes played 3)
            Alphabetical by surname. The adidas Golden Boot is awarded to the tournament&apos;s
            top scorer.
          </p>
        </div>

        <GoldenBootRace stats={stats} />

        <div className="mt-8 text-center">
          <Link
            href="/world-cup"
            className="inline-flex items-center gap-2 rounded-lg border border-edge bg-surface px-4 py-2 text-sm font-medium text-fg transition hover:bg-surface2"
          >
            ← Back to World Cup overview
          </Link>
        </div>
      </div>
    </>
  );
}
