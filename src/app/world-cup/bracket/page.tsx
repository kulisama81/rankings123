import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getWorldCupBracket } from "@/lib/worldCupBracketFeed";
import WorldCupBracket from "@/components/WorldCupBracket";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "World Cup 2026 Knockout Bracket — Live Results & Fixtures",
  description:
    "Live FIFA World Cup 2026 knockout bracket: R32→R16→QF→SF→Final with results, upcoming matches, and projected matchups updated in real time.",
  alternates: { canonical: "/world-cup/bracket" },
  openGraph: {
    title: "World Cup 2026 Knockout Bracket — Rankings123",
    description:
      "Live FIFA World Cup 2026 knockout bracket: R32→R16→QF→SF→Final with results, upcoming matches, and projected matchups.",
    url: "/world-cup/bracket",
    type: "website",
  },
};

export const revalidate = 60; // ISR: 1 minute cache

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "World Cup 2026 Knockout Bracket — Rankings123",
  description:
    "Live FIFA World Cup 2026 knockout bracket with real-time results and fixtures.",
  url: "https://rankings123.com/world-cup/bracket",
  inLanguage: "en",
};

export default async function KnockoutBracketPage() {
  const bracket = await getWorldCupBracket();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="worldcup" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/world-cup"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg"
        >
          ← Back to World Cup
        </Link>
        <HeroBanner
          icon="🏆"
          title="World Cup 2026 Knockout Bracket"
          subtitle="Live results · Upcoming fixtures · Path to the final"
          stats={[
            { label: "Knockout Matches", value: String(bracket.stages.reduce((sum, s) => sum + s.matches.length, 0)) },
            { label: "Stages", value: String(bracket.stages.length) },
          ]}
        />
        <Suspense
          fallback={
            <div className="animate-pulse space-y-8">
              <div className="h-64 rounded-2xl bg-surface2" />
              <div className="h-64 rounded-2xl bg-surface2" />
            </div>
          }
        >
          <WorldCupBracket bracket={bracket} />
        </Suspense>
      </div>
    </>
  );
}
