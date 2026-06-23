import type { Metadata } from "next";
import { getWorldCupData, getWorldCupStats } from "@/lib/worldCupFeed";
import { getWorldCupBracket } from "@/lib/worldCupBracketFeed";
import WorldCupTable from "@/components/WorldCupTable";
import WorldCupStats from "@/components/WorldCupStats";
import WorldCupBracket from "@/components/WorldCupBracket";
import WorldCupTeamStats from "@/components/WorldCupTeamStats";
import HeroBanner from "@/components/HeroBanner";
import SectionNav from "@/components/SectionNav";

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
        <div className="my-12">
          <WorldCupBracket bracket={bracket} />
        </div>
        <WorldCupTeamStats snapshot={snapshot} />
        <WorldCupStats stats={stats} />
      </div>
    </>
  );
}
