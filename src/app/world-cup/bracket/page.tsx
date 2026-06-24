import type { Metadata } from "next";
import { Suspense } from "react";
import { getWorldCupBracket } from "@/lib/worldCupBracketFeed";
import InteractiveBracketPredictor from "@/components/InteractiveBracketPredictor";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "World Cup 2026 Bracket Predictor — Fill Your Bracket",
  description:
    "Interactive FIFA World Cup 2026 bracket predictor. Fill out your R32→Final predictions, save your bracket, and share with friends. Track your picks as the tournament progresses.",
  alternates: { canonical: "/world-cup/bracket" },
  openGraph: {
    title: "World Cup 2026 Bracket Predictor — Rankings123",
    description:
      "Interactive FIFA World Cup 2026 bracket predictor. Fill out your R32→Final predictions, save your bracket, and share with friends.",
    url: "/world-cup/bracket",
    type: "website",
  },
};

export const revalidate = 60; // ISR: 1 minute cache

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "World Cup 2026 Bracket Predictor — Rankings123",
  description:
    "Interactive FIFA World Cup 2026 bracket predictor. Fill out your predictions and share with friends.",
  url: "https://rankings123.com/world-cup/bracket",
  inLanguage: "en",
};

export default async function BracketPredictorPage() {
  const bracket = await getWorldCupBracket();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="worldcup" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <HeroBanner
          icon="⚽"
          title="World Cup 2026 Bracket Predictor"
          subtitle="Fill your bracket · Save & share · Compare with results"
          stats={[
            { label: "Knockout Matches", value: String(bracket.stages.reduce((sum, s) => sum + s.matches.length, 0)) },
            { label: "Your Picks", value: "0" },
          ]}
        />
        <div className="my-8 rounded-2xl border border-edge bg-surface p-6">
          <p className="text-muted">
            Click on any matchup to predict the winner. Your bracket is saved automatically and encoded in the URL for easy sharing.
            As matches complete, compare your predictions with actual results.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="animate-pulse space-y-8">
              <div className="h-64 rounded-2xl bg-surface2" />
              <div className="h-64 rounded-2xl bg-surface2" />
            </div>
          }
        >
          <InteractiveBracketPredictor bracket={bracket} />
        </Suspense>
      </div>
    </>
  );
}
