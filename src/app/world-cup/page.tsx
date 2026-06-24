import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { getWorldCupData, getWorldCupStats } from "@/lib/worldCupFeed";
import { getWorldCupBracket } from "@/lib/worldCupBracketFeed";
import WorldCupTable from "@/components/WorldCupTable";
import HeroBanner from "@/components/HeroBanner";
import SectionNav from "@/components/SectionNav";

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

export const metadata: Metadata = {
  title: "World Cup 2026 Live — Group Standings & Results",
  description:
    "Live FIFA World Cup 2026 group standings and fixtures updated in real time: points, goal difference, advancement, and today's scores.",
  alternates: { canonical: "/world-cup" },
  openGraph: {
    title: "World Cup 2026 Live — Group Standings & Results — Rankings123",
    description:
      "Live FIFA World Cup 2026 group standings and fixtures updated in real time: points, goal difference, advancement, and today's scores.",
    url: "/world-cup",
    type: "website",
  },
};

export const revalidate = 60; // ISR: 1 minute cache

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "World Cup 2026 Live — Group Standings & Results — Rankings123",
  description:
    "Live FIFA World Cup 2026 group standings and fixtures updated in real time.",
  url: "https://rankings123.com/world-cup",
  inLanguage: "en",
};

export default async function WorldCupPage() {
  const [snapshot, stats, bracket] = await Promise.all([
    getWorldCupData(),
    getWorldCupStats(),
    getWorldCupBracket(),
  ]);

  // Build section nav dynamically based on what's visible
  const today = new Date().toDateString();
  const hasTodaysMatches = snapshot.matches.some((m) => new Date(m.date).toDateString() === today);
  const hasStats = stats.topScorers.length > 0 || stats.topAssisters.length > 0;
  const hasTeamStats = snapshot.groups.length > 0;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="worldcup" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <HeroBanner
          icon="⚽"
          title="World Cup 2026 Live"
          subtitle={`FIFA World Cup 2026 · ${snapshot.stageLabel}`}
          stats={[
            { label: "Live now", value: String(snapshot.matches.filter((m) => m.state === "in").length) },
            { label: "Groups", value: String(snapshot.groups.length) },
            { label: "Matches", value: String(snapshot.matches.length) },
          ]}
        />
        <SectionNav sections={sections} />
        <WorldCupTable initialSnapshot={snapshot} />
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
      </div>
    </>
  );
}
