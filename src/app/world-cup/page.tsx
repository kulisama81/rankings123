import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import { getWorldCupData, getWorldCupStats } from "@/lib/worldCupFeed";
import { getWorldCupBracket } from "@/lib/worldCupBracketFeed";
import WorldCupTable from "@/components/WorldCupTable";
import HeroBanner from "@/components/HeroBanner";
import SectionNav from "@/components/SectionNav";
import WorldCupCountdown from "@/components/WorldCupCountdown";
import PostEventDiscovery from "@/components/PostEventDiscovery";
import WorldCupFinalsHero from "@/components/WorldCupFinalsHero";
import WorldCupFinalsMobileBadge from "@/components/WorldCupFinalsMobileBadge";
import Breadcrumb from "@/components/Breadcrumb";
import {
  generateBreadcrumbSchema,
  generateSportsEventSchema,
  JsonLd,
} from "@/lib/structuredData";

// Lazy-load below-the-fold components to reduce initial bundle size
const WorldCupBracket = dynamic(() => import("@/components/WorldCupBracket"), {
  loading: () => (
    <div className="my-12 animate-pulse rounded-2xl border border-edge bg-surface p-8">
      <div className="mb-4 h-8 w-48 rounded bg-surface2" />
      <div className="space-y-4">
        <div className="h-32 rounded bg-surface2" />
        <div className="h-32 rounded bg-surface2" />
      </div>
    </div>
  ),
});

const WorldCupTeamStats = dynamic(() => import("@/components/WorldCupTeamStats"), {
  loading: () => (
    <div className="my-12 animate-pulse rounded-2xl border border-edge bg-surface p-8">
      <div className="mb-4 h-8 w-48 rounded bg-surface2" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="h-48 rounded bg-surface2" />
        <div className="h-48 rounded bg-surface2" />
      </div>
    </div>
  ),
});

const WorldCupStats = dynamic(() => import("@/components/WorldCupStats"), {
  loading: () => (
    <div className="my-12 animate-pulse rounded-2xl border border-edge bg-surface p-8">
      <div className="mb-4 h-8 w-48 rounded bg-surface2" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="h-64 rounded bg-surface2" />
        <div className="h-64 rounded bg-surface2" />
      </div>
    </div>
  ),
});

export async function generateMetadata(): Promise<Metadata> {
  const snapshot = await getWorldCupData();
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  // Get top groups for keyword richness
  const topGroup = snapshot.groups[0];
  const groupLeader = topGroup?.teams[0];
  const leaderInfo = groupLeader ? `${groupLeader.name} leads ${topGroup.name}. ` : "";

  const title = `World Cup 2026 ${month} — Live Standings, Bracket & Final`;
  const description = `FIFA World Cup 2026 group standings, knockout bracket, and Final results ${month} ${year}. ${leaderInfo}Real-time points, goal difference, and tournament progress.`;

  return {
    title,
    description,
    alternates: { canonical: "/world-cup" },
    openGraph: {
      title: `World Cup 2026 ${month} — Live Standings & Results — Rankings123`,
      description,
      url: "/world-cup",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `World Cup 2026 ${month} — Live Standings & Results — Rankings123`,
      description,
    },
  };
}

export const revalidate = 60; // ISR: 1 minute cache

export default async function WorldCupPage() {
  const [snapshot, stats, bracket] = await Promise.all([
    getWorldCupData(),
    getWorldCupStats(),
    getWorldCupBracket(),
  ]);

  // Structured data for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "World Cup 2026" },
  ]);

  const sportsEventSchema = generateSportsEventSchema({
    name: "FIFA World Cup 2026",
    description:
      "Live FIFA World Cup 2026 group standings, knockout bracket, and match results.",
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    location: { name: "United States, Canada, Mexico", country: "US" },
    sport: "Soccer",
    organizer: "FIFA",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "World Cup 2026 Live — Group Standings & Results — Rankings123",
    description:
      "Live FIFA World Cup 2026 group standings and fixtures updated in real time.",
    url: "https://rankings123.com/world-cup",
    inLanguage: "en",
    breadcrumb: breadcrumbSchema,
  };

  // Build section nav dynamically based on what's visible
  const today = new Date().toDateString();
  const hasTodaysMatches = snapshot.matches.some((m) => new Date(m.date).toDateString() === today);
  const hasStats = stats.topScorers.length > 0 || stats.topAssisters.length > 0;
  const hasTeamStats = snapshot.groups.length > 0;

  // Find the Final match (ESPN labels it in statusDetail or it's the last/highest-stage match)
  const finalMatch = snapshot.matches.find(
    (m) =>
      m.statusDetail?.toLowerCase().includes("final") &&
      !m.statusDetail?.toLowerCase().includes("semi") &&
      !m.statusDetail?.toLowerCase().includes("third")
  );

  // Detect tournament completion: Final match exists, is finished, AND has valid scores
  const hasValidFinalScores =
    finalMatch?.homeScore !== null && finalMatch?.awayScore !== null;

  // Tournament is complete if:
  // 1. Final match exists and is finished with valid scores, OR
  // 2. All matches are complete AND the latest match is > 1 day old (tournament ended)
  const allMatchesComplete = snapshot.matches.length > 0 &&
    snapshot.matches.every((m) => m.state === "post");
  const latestMatch = snapshot.matches.length > 0
    ? snapshot.matches.reduce((latest, m) =>
        new Date(m.date) > new Date(latest.date) ? m : latest
      )
    : null;
  const daysSinceLatestMatch = latestMatch
    ? (Date.now() - new Date(latestMatch.date).getTime()) / (1000 * 60 * 60 * 24)
    : 0;

  const isTournamentComplete =
    (finalMatch?.state === "post" && hasValidFinalScores) ||
    (allMatchesComplete && daysSinceLatestMatch > 1);

  // Detect Finals week (July 18-22, 2026) - show special hero during Final week
  const now = new Date();
  const finalsWeekStart = new Date(Date.UTC(2026, 6, 18, 0, 0, 0));
  const finalsWeekEnd = new Date(Date.UTC(2026, 6, 22, 23, 59, 59));
  const isFinalsWeek = now >= finalsWeekStart && now <= finalsWeekEnd && !isTournamentComplete;

  const sections = [
    ...(hasTodaysMatches ? [{ id: "todays-matches", label: "Today's Matches" }] : []),
    { id: "group-standings", label: "Group Standings" },
    { id: "schedule", label: "Schedule" },
    { id: "knockout-bracket", label: "Knockout Bracket" },
    ...(hasTeamStats ? [{ id: "team-stats", label: "Team Stats" }] : []),
    ...(hasStats ? [{ id: "tournament-leaders", label: "Tournament Leaders" }] : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={sportsEventSchema} />
      <div data-sport="worldcup" className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "World Cup 2026" },
          ]}
        />
        {/* Tournament Complete: Show final results hero */}
        {isTournamentComplete ? (
          finalMatch && hasValidFinalScores ? (
            (() => {
              // Type-safe access: hasValidFinalScores guarantees non-null scores
              const homeScore = finalMatch.homeScore as number;
              const awayScore = finalMatch.awayScore as number;
              const champion = homeScore > awayScore ? finalMatch.homeName : finalMatch.awayName;
              const runnerUp = homeScore > awayScore ? finalMatch.awayName : finalMatch.homeName;

              return (
                <>
                  <HeroBanner
                    sport="worldcup"
                    title="World Cup 2026"
                    subtitle="FIFA World Cup 2026 · Tournament Complete"
                    stats={[
                      { label: "Champion", value: champion },
                      { label: "Runner-up", value: runnerUp },
                      { label: "Final Score", value: `${homeScore}-${awayScore}` },
                    ]}
                  />
                  <div className="my-6 rounded-2xl border border-trophy/30 bg-gradient-to-br from-trophy/10 to-surface p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-2xl">🏆</span>
                      <h2 className="text-xl font-bold text-fg">Final Result</h2>
                    </div>
                    <div className="flex items-center justify-center gap-4 sm:gap-8">
                      <div className="flex items-center gap-2 text-right">
                        <span className="text-base font-medium text-muted sm:text-lg">
                          {finalMatch.homeName}
                        </span>
                        <span className="text-3xl">{finalMatch.homeFlag}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-4xl font-bold tabular-nums text-fg sm:text-5xl">
                          {homeScore}
                        </span>
                        <span className="text-2xl text-muted">-</span>
                        <span className="text-4xl font-bold tabular-nums text-fg sm:text-5xl">
                          {awayScore}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{finalMatch.awayFlag}</span>
                        <span className="text-base font-medium text-muted sm:text-lg">
                          {finalMatch.awayName}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm text-muted">
                      {new Date(finalMatch.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </div>
                  </div>
                </>
              );
            })()
          ) : latestMatch && latestMatch.homeScore !== null && latestMatch.awayScore !== null ? (
            /* Tournament complete but no Final match data available - infer champion from latest match */
            (() => {
              const homeScore = latestMatch.homeScore as number;
              const awayScore = latestMatch.awayScore as number;
              const champion = homeScore > awayScore ? latestMatch.homeName : latestMatch.awayName;
              const runnerUp = homeScore > awayScore ? latestMatch.awayName : latestMatch.homeName;

              return (
                <>
                  <HeroBanner
                    sport="worldcup"
                    title="World Cup 2026"
                    subtitle="FIFA World Cup 2026 · Tournament Complete"
                    stats={[
                      { label: "Champion", value: champion },
                      { label: "Runner-up", value: runnerUp },
                      { label: "Final Score", value: `${homeScore}-${awayScore}` },
                    ]}
                  />
                  <div className="my-6 rounded-2xl border border-trophy/30 bg-gradient-to-br from-trophy/10 to-surface p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-2xl">🏆</span>
                      <h2 className="text-xl font-bold text-fg">Final Result</h2>
                    </div>
                    <div className="flex items-center justify-center gap-4 sm:gap-8">
                      <div className="flex items-center gap-2 text-right">
                        <span className="text-base font-medium text-muted sm:text-lg">
                          {latestMatch.homeName}
                        </span>
                        <span className="text-3xl">{latestMatch.homeFlag}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-4xl font-bold tabular-nums text-fg sm:text-5xl">
                          {homeScore}
                        </span>
                        <span className="text-2xl text-muted">-</span>
                        <span className="text-4xl font-bold tabular-nums text-fg sm:text-5xl">
                          {awayScore}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{latestMatch.awayFlag}</span>
                        <span className="text-base font-medium text-muted sm:text-lg">
                          {latestMatch.awayName}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm text-muted">
                      {new Date(latestMatch.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })} · {latestMatch.statusDetail}
                    </div>
                  </div>
                </>
              );
            })()
          ) : (
            /* Fallback: no match data available */
            <HeroBanner
              sport="worldcup"
              title="World Cup 2026"
              subtitle="FIFA World Cup 2026 · Tournament Complete"
              stats={[
                { label: "Matches Completed", value: String(snapshot.matches.filter((m) => m.state === "post").length) },
                { label: "Total Matches", value: String(snapshot.matches.length) },
              ]}
            />
          )
        ) : isFinalsWeek && finalMatch ? (
          /* Finals Week: Special celebration hero */
          <>
            <WorldCupFinalsHero
              finalMatch={{
                homeTeam: finalMatch.homeName,
                awayTeam: finalMatch.awayName,
                homeFlag: finalMatch.homeFlag,
                awayFlag: finalMatch.awayFlag,
                homeScore: finalMatch.homeScore,
                awayScore: finalMatch.awayScore,
                state: finalMatch.state,
                statusDetail: finalMatch.statusDetail,
              }}
            />
            <WorldCupFinalsMobileBadge
              finalMatch={{
                homeTeam: finalMatch.homeName,
                awayTeam: finalMatch.awayName,
                homeFlag: finalMatch.homeFlag,
                awayFlag: finalMatch.awayFlag,
                state: finalMatch.state,
              }}
            />
          </>
        ) : (
          <>
            <HeroBanner
              sport="worldcup"
              title="World Cup 2026 Live"
              subtitle={`FIFA World Cup 2026 · ${snapshot.stageLabel}`}
              stats={[
                { label: "Live now", value: String(snapshot.matches.filter((m) => m.state === "in").length) },
                { label: "Groups", value: String(snapshot.groups.length) },
                { label: "Matches", value: String(snapshot.matches.length) },
              ]}
            />
            <div className="my-6">
              <WorldCupCountdown currentMatches={snapshot.matches} />
            </div>
          </>
        )}
        {/* Final Predictions Link - prominent during final week */}
        <Link
          href="/world-cup/final-2026-predictions"
          className="my-6 block rounded-2xl border border-trophy/30 bg-gradient-to-br from-trophy/10 to-surface p-6 transition hover:border-trophy hover:from-trophy/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <h3 className="text-xl font-black text-fg">World Cup Final 2026 Predictions</h3>
              </div>
              <p className="text-sm text-fg-muted">
                Expert tactical analysis and match preview for the final
              </p>
            </div>
            <span className="text-2xl text-trophy">→</span>
          </div>
        </Link>
        <SectionNav sections={sections} />
        <WorldCupTable
          initialSnapshot={snapshot}
          championCode={
            isFinalsWeek && finalMatch && finalMatch.state === "post"
              ? finalMatch.homeScore !== null &&
                finalMatch.awayScore !== null &&
                finalMatch.homeScore > finalMatch.awayScore
                ? finalMatch.homeCode
                : finalMatch.homeScore !== null &&
                  finalMatch.awayScore !== null &&
                  finalMatch.awayScore > finalMatch.homeScore
                  ? finalMatch.awayCode
                  : undefined
              : undefined
          }
        />
        <Suspense
          fallback={
            <div className="my-12 animate-pulse rounded-2xl border border-edge bg-surface p-8">
              <div className="mb-4 h-8 w-48 rounded bg-surface2" />
              <div className="space-y-4">
                <div className="h-32 rounded bg-surface2" />
                <div className="h-32 rounded bg-surface2" />
              </div>
            </div>
          }
        >
          <div className="my-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-fg">Knockout Bracket</h2>
              <Link
                href="/world-cup/bracket"
                className="inline-flex items-center gap-1.5 rounded-lg border border-trophy/30 bg-trophy/5 px-4 py-2 text-sm font-bold text-trophy transition hover:border-trophy hover:bg-trophy/10"
              >
                View Full Bracket →
              </Link>
            </div>
            <WorldCupBracket bracket={bracket} />
          </div>
        </Suspense>
        <Suspense
          fallback={
            <div className="my-12 animate-pulse rounded-2xl border border-edge bg-surface p-8">
              <div className="mb-4 h-8 w-48 rounded bg-surface2" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="h-48 rounded bg-surface2" />
                <div className="h-48 rounded bg-surface2" />
              </div>
            </div>
          }
        >
          <WorldCupTeamStats snapshot={snapshot} />
        </Suspense>
        <Suspense
          fallback={
            <div className="my-12 animate-pulse rounded-2xl border border-edge bg-surface p-8">
              <div className="mb-4 h-8 w-48 rounded bg-surface2" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="h-64 rounded bg-surface2" />
                <div className="h-64 rounded bg-surface2" />
              </div>
            </div>
          }
        >
          <WorldCupStats stats={stats} />
        </Suspense>

        {/* Post-Event Discovery - shown after Final ~July 19 6PM ET */}
        {(() => {
          const now = new Date();
          // 6PM ET = 6PM EDT (UTC-4 in summer) = 10PM UTC
          const showWhatsNext = now > new Date(Date.UTC(2026, 6, 19, 22, 0, 0)); // After July 19, 10PM UTC = 6PM ET
          if (!showWhatsNext) return null;

          return <PostEventDiscovery fromSport="worldcup" />;
        })()}
      </div>
    </>
  );
}
