import type { Metadata } from "next";
import { Suspense } from "react";
import { getWorldCupBracket } from "@/lib/worldCupBracketFeed";
import WorldCupBracketTree from "@/components/WorldCupBracketTree";
import HeroBanner from "@/components/HeroBanner";
import KnockoutNextMatches from "@/components/KnockoutNextMatches";

export const metadata: Metadata = {
  title: "World Cup 2026 Knockout Stage — Live Bracket & Results",
  description:
    "FIFA World Cup 2026 knockout stage bracket with live results, upcoming matches, and match times. Follow the R16→QF→SF→Final bracket as it unfolds.",
  keywords: [
    "world cup knockout stage",
    "world cup bracket 2026",
    "world cup round of 16",
    "world cup quarterfinals",
    "world cup semifinals",
    "fifa world cup 2026 bracket",
  ],
  alternates: { canonical: "/world-cup/knockout" },
  openGraph: {
    title: "World Cup 2026 Knockout Stage — Live Bracket",
    description:
      "FIFA World Cup 2026 knockout bracket with live results and upcoming matches. R16→QF→SF→Final.",
    url: "/world-cup/knockout",
    type: "website",
  },
};

export const revalidate = 60; // ISR: 1 minute cache for live updates

export default async function WorldCupKnockoutPage() {
  const bracket = await getWorldCupBracket();

  // Extract all matches and count them by state
  const allMatches = bracket.stages.flatMap((s) => s.matches);
  const liveMatches = allMatches.filter((m) => m.state === "in");
  const upcomingMatches = allMatches.filter((m) => m.state === "pre");
  const completedMatches = allMatches.filter((m) => m.state === "post");

  // Find next match (earliest upcoming match)
  const nextMatch = upcomingMatches.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )[0];

  // Generate structured data per match (per acceptance criteria)
  const matchSchemas = allMatches
    .filter((m) => !m.id.startsWith("projected-"))
    .map((match) => ({
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      name: `${match.homeName} vs ${match.awayName}`,
      sport: "Soccer",
      startDate: match.date,
      location: match.venue
        ? {
            "@type": "Place",
            name: match.venue,
          }
        : undefined,
      homeTeam: {
        "@type": "SportsTeam",
        name: match.homeName,
      },
      awayTeam: {
        "@type": "SportsTeam",
        name: match.awayName,
      },
      ...(match.state === "post" &&
        match.homeScore !== null &&
        match.awayScore !== null && {
          eventStatus: "https://schema.org/EventScheduled",
          competitor: [
            {
              "@type": "SportsTeam",
              name: match.homeName,
              score: String(match.homeScore),
            },
            {
              "@type": "SportsTeam",
              name: match.awayName,
              score: String(match.awayScore),
            },
          ],
        }),
    }));

  return (
    <>
      {/* Structured data per match for SEO */}
      {matchSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div data-sport="worldcup" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <HeroBanner
          icon="🏆"
          title="World Cup 2026 Knockout Stage"
          subtitle="Live bracket · Results · Upcoming matches"
          stats={[
            { label: "Live Now", value: String(liveMatches.length) },
            { label: "Completed", value: String(completedMatches.length) },
            { label: "Upcoming", value: String(upcomingMatches.length) },
          ]}
        />

        {/* Next/Live Matches Section */}
        {(liveMatches.length > 0 || nextMatch) && (
          <div className="my-8">
            <KnockoutNextMatches
              liveMatches={liveMatches}
              nextMatch={nextMatch}
              allUpcoming={upcomingMatches.slice(0, 3)}
            />
          </div>
        )}

        {/* Full Bracket Tree */}
        <div className="my-8">
          <h2 className="mb-4 text-2xl font-bold">Full Bracket</h2>
          <Suspense
            fallback={
              <div className="animate-pulse space-y-8">
                <div className="h-64 rounded-2xl bg-surface2" />
                <div className="h-64 rounded-2xl bg-surface2" />
              </div>
            }
          >
            <WorldCupBracketTree bracket={bracket} />
          </Suspense>
        </div>

        {/* About */}
        <div className="mt-8 rounded-xl border border-edge bg-surface p-6">
          <h3 className="mb-2 text-lg font-bold">About the Knockout Stage</h3>
          <p className="text-sm leading-relaxed text-muted">
            The FIFA World Cup 2026 knockout stage features 32 teams (advancing from 48 teams in the
            group stage). The bracket progresses through the Round of 32, Round of 16, Quarterfinals,
            Semifinals, and the Final. All match times are shown in your local timezone. Click any
            match to view detailed stats, lineups, and head-to-head history.
          </p>
        </div>
      </div>
    </>
  );
}
