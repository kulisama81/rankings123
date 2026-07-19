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
  title: "World Cup 2026 — Group Standings, Knockout Bracket & Final Results",
  description:
    "FIFA World Cup 2026 group standings, knockout bracket, and Final results updated in real time: points, goal difference, tournament winners, and complete match results.",
  alternates: { canonical: "/world-cup" },
  openGraph: {
    title: "World Cup 2026 — Group Standings, Bracket & Final Results — Rankings123",
    description:
      "FIFA World Cup 2026 group standings, knockout bracket, and Final results updated in real time.",
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

        {/* What's Next - Cross-Sport Discovery (shown after Final ~July 19 6PM ET) */}
        {(() => {
          const now = new Date();
          // 6PM ET = 6PM EDT (UTC-4 in summer) = 10PM UTC
          const showWhatsNext = now > new Date(Date.UTC(2026, 6, 19, 22, 0, 0)); // After July 19, 10PM UTC = 6PM ET
          if (!showWhatsNext) return null;

          return (
            <section className="my-12">
              <div className="overflow-hidden rounded-2xl border border-edge bg-surface p-6 sm:p-8">
                <h2 className="mb-6 text-2xl font-bold text-fg">What&apos;s Live Now</h2>
                <p className="mb-6 text-sm text-secondary">
                  The World Cup 2026 has concluded. Discover other live sports rankings and coverage:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Tour de France */}
                  <Link
                    href="/cycling"
                    className="group flex items-center gap-4 rounded-xl border border-edge bg-surface2 p-5 transition hover:border-accent hover:bg-surface"
                  >
                    <span className="text-3xl">🚴</span>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-pulse" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                        </span>
                        <span className="font-semibold text-fg">Tour de France 2026 — LIVE</span>
                      </div>
                      <p className="text-xs text-muted">Stage-by-stage coverage, GC standings, and jersey leaders through July 26</p>
                    </div>
                    <span className="text-accent transition group-hover:translate-x-0.5">→</span>
                  </Link>

                  {/* Tennis */}
                  <Link
                    href="/atp-live"
                    className="group flex items-center gap-4 rounded-xl border border-edge bg-surface2 p-5 transition hover:border-accent hover:bg-surface"
                  >
                    <span className="text-3xl">🎾</span>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-pulse" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                        </span>
                        <span className="font-semibold text-fg">Live Tennis Rankings</span>
                      </div>
                      <p className="text-xs text-muted">ATP & WTA rankings updated in real time during tournaments</p>
                    </div>
                    <span className="text-accent transition group-hover:translate-x-0.5">→</span>
                  </Link>

                  {/* WTA */}
                  <Link
                    href="/wta-live"
                    className="group flex items-center gap-4 rounded-xl border border-edge bg-surface2 p-5 transition hover:border-accent hover:bg-surface"
                  >
                    <span className="text-3xl">🎾</span>
                    <div className="flex-1">
                      <span className="font-semibold text-fg">WTA Live Rankings</span>
                      <p className="mt-1 text-xs text-muted">Women&apos;s tennis rankings with live tournament updates</p>
                    </div>
                    <span className="text-accent transition group-hover:translate-x-0.5">→</span>
                  </Link>

                  {/* UCI Cycling */}
                  <Link
                    href="/cycling/uci-ranking"
                    className="group flex items-center gap-4 rounded-xl border border-edge bg-surface2 p-5 transition hover:border-accent hover:bg-surface"
                  >
                    <span className="text-3xl">🚴</span>
                    <div className="flex-1">
                      <span className="font-semibold text-fg">UCI World Rankings</span>
                      <p className="mt-1 text-xs text-muted">Top professional cyclists across all disciplines</p>
                    </div>
                    <span className="text-accent transition group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </section>
          );
        })()}
      </div>
    </>
  );
}
