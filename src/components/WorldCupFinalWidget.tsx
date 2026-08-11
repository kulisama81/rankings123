"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentEvents } from "@/lib/featuredEvents";

type FinalPhase = "before" | "live" | "after";

interface FinalData {
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
}

function getInitialPhase(): FinalPhase {
  // Check if we're past the Final end time (July 19, 2026 10PM UTC)
  const now = new Date();
  const finalEnd = new Date(Date.UTC(2026, 6, 19, 22, 0, 0)); // July 19, 10PM UTC
  return now >= finalEnd ? "after" : "before";
}

export default function WorldCupFinalWidget() {
  const [phase, setPhase] = useState<FinalPhase>(getInitialPhase());
  const [finalData, setFinalData] = useState<FinalData | null>(null);

  useEffect(() => {
    async function checkFinalStatus() {
      try {
        // Fetch World Cup data to check Final match status
        const res = await fetch("/api/worldcup/live");
        const data = await res.json();

        // Find the Final match (last match of tournament, typically ID contains "Final")
        const finalMatch = data.matches.find((m: {
          shortDetail?: string;
          name?: string;
          homeCode?: string;
          homeName?: string;
          awayCode?: string;
          awayName?: string;
          homeFlag?: string;
          awayFlag?: string;
          homeScore?: number | null;
          awayScore?: number | null;
          statusDetail?: string;
          state?: string;
        }) =>
          m.shortDetail?.includes("Final") || m.name?.includes("Final")
        );

        if (finalMatch) {
          setFinalData({
            homeTeam: finalMatch.homeCode || finalMatch.homeName,
            awayTeam: finalMatch.awayCode || finalMatch.awayName,
            homeFlag: finalMatch.homeFlag,
            awayFlag: finalMatch.awayFlag,
            homeScore: finalMatch.homeScore,
            awayScore: finalMatch.awayScore,
            status: finalMatch.statusDetail || finalMatch.state,
          });

          // Determine phase based on match state with date fallback for unexpected states
          const now = new Date();
          const finalEnd = new Date(Date.UTC(2026, 6, 19, 22, 0, 0)); // July 19, 10PM UTC

          if (finalMatch.state === "in") {
            setPhase("live");
          } else if (finalMatch.state === "post") {
            setPhase("after");
          } else {
            // Unknown/unexpected state - trust the date, not bad API data
            setPhase(now >= finalEnd ? "after" : "before");
          }
        } else {
          // Fallback: no Final match found, use date
          const now = new Date();
          const finalEnd = new Date(Date.UTC(2026, 6, 19, 22, 0, 0)); // July 19, 10PM UTC
          setPhase(now >= finalEnd ? "after" : "before");
        }
      } catch {
        // Silently fail - widget will hide on error
      }
    }

    checkFinalStatus();
    const interval = setInterval(checkFinalStatus, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  // Before Final: Show countdown/announcement
  if (phase === "before") {
    return (
      <section className="mb-12">
        <div className="overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <h2 className="font-display text-xl font-bold text-fg sm:text-2xl">
                  World Cup Final — Today
                </h2>
              </div>
              {finalData && (
                <p className="text-sm text-secondary sm:text-base">
                  {finalData.homeFlag} {finalData.homeTeam} vs {finalData.awayFlag} {finalData.awayTeam}
                </p>
              )}
            </div>
            <Link
              href="/world-cup"
              className="btn-base btn-primary whitespace-nowrap rounded-lg px-6 py-3 font-semibold"
            >
              View Standings →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // During Final: Show live score
  if (phase === "live" && finalData) {
    return (
      <section className="mb-12">
        <div className="mb-3 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
              style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
            />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-accent">
            World Cup Final — LIVE
          </h2>
        </div>
        <Link
          href="/world-cup"
          className="group block overflow-hidden rounded-2xl border border-accent/50 bg-gradient-to-br from-accent/5 to-accent/10 p-6 transition hover:border-accent hover:bg-accent/15"
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-1 items-center justify-end gap-3 text-right">
              <span className="truncate text-base font-semibold text-fg sm:text-lg">
                {finalData.homeTeam}
              </span>
              <span className="text-3xl">{finalData.homeFlag}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold tabular-nums text-fg sm:text-5xl">
                  {finalData.homeScore ?? 0}
                </span>
                <span className="text-2xl font-bold text-muted">-</span>
                <span className="text-4xl font-bold tabular-nums text-fg sm:text-5xl">
                  {finalData.awayScore ?? 0}
                </span>
              </div>
              <span className="text-xs font-semibold text-accent">{finalData.status}</span>
            </div>
            <div className="flex flex-1 items-center gap-3">
              <span className="text-3xl">{finalData.awayFlag}</span>
              <span className="truncate text-base font-semibold text-fg sm:text-lg">
                {finalData.awayTeam}
              </span>
            </div>
          </div>
        </Link>
      </section>
    );
  }

  // After Final: Hide widget after 2 weeks to keep homepage focused on current events
  // World Cup content remains accessible via navigation and "All Sports" grid
  if (phase === "after") {
    const now = new Date();
    const finalEnd = new Date(Date.UTC(2026, 6, 19, 22, 0, 0)); // July 19, 10PM UTC
    const twoWeeksAfter = new Date(finalEnd.getTime() + 14 * 24 * 60 * 60 * 1000); // Aug 2

    // Hide completely after 2 weeks - let FeaturedEventHero and LiveNowHero handle current events
    if (now > twoWeeksAfter) {
      return null;
    }

    // Within 2 weeks: show compact recap
    return (
      <section className="mb-12">
        <div className="overflow-hidden rounded-2xl border border-edge bg-surface p-6 sm:p-8">
          {/* Final Recap Header */}
          <div className="mb-6 border-b border-edge pb-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <h2 className="font-display text-xl font-bold text-fg sm:text-2xl">
                World Cup 2026 Final
              </h2>
            </div>
            {finalData && (
              <div className="mt-4 flex items-center justify-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2 text-right">
                  <span className="text-sm font-medium text-muted sm:text-base">
                    {finalData.homeTeam}
                  </span>
                  <span className="text-2xl">{finalData.homeFlag}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold tabular-nums text-fg">
                    {finalData.homeScore ?? 0}
                  </span>
                  <span className="text-xl text-muted">-</span>
                  <span className="text-3xl font-bold tabular-nums text-fg">
                    {finalData.awayScore ?? 0}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{finalData.awayFlag}</span>
                  <span className="text-sm font-medium text-muted sm:text-base">
                    {finalData.awayTeam}
                  </span>
                </div>
              </div>
            )}
            <div className="mt-4 text-center">
              <Link
                href="/world-cup"
                className="inline-block text-sm text-accent hover:underline"
              >
                View full tournament results →
              </Link>
            </div>
          </div>

          {/* What's Next - Cross-Sport Promotion (dynamic, based on current events) */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-fg">What&apos;s Live Now</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {getCurrentEvents().slice(0, 3).map((event) => (
                <Link
                  key={event.id}
                  href={event.href}
                  className="group flex items-center gap-4 rounded-xl border border-edge bg-surface2 p-4 transition hover:border-accent hover:bg-surface"
                >
                  <span className="text-3xl">{event.emoji}</span>
                  <div className="flex-1">
                    {event.status === "live" && (
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-pulse" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                        </span>
                        <span className="font-semibold text-fg">{event.name}</span>
                      </div>
                    )}
                    {event.status !== "live" && (
                      <span className="font-semibold text-fg">{event.name}</span>
                    )}
                    <p className="mt-1 text-xs text-muted">{event.description}</p>
                  </div>
                  <span className="text-accent transition group-hover:translate-x-0.5">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Don't show widget if phase is indeterminate or data is missing
  return null;
}
