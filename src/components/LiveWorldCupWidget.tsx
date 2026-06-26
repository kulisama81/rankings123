"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { WorldCupSnapshot } from "@/types";

export default function LiveWorldCupWidget() {
  const [liveMatches, setLiveMatches] = useState<WorldCupSnapshot["matches"]>([]);

  useEffect(() => {
    async function fetchLiveMatches() {
      try {
        const res = await fetch("/api/worldcup/live");
        const data: WorldCupSnapshot = await res.json();
        const live = data.matches.filter((m) => m.state === "in");
        setLiveMatches(live);
      } catch {
        setLiveMatches([]);
      }
    }

    // Initial fetch
    fetchLiveMatches();

    // Poll every 20 seconds for real-time updates
    const interval = setInterval(fetchLiveMatches, 20000);

    return () => clearInterval(interval);
  }, []);

  // Hide widget completely when no matches are live
  if (liveMatches.length === 0) {
    return null;
  }

  // Show max 3-4 most important/recent matches
  const displayMatches = liveMatches.slice(0, 4);

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
            style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
          />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-accent">
          Live Matches
        </h2>
      </div>

      <div className="grid gap-3">
        {displayMatches.map((match) => (
          <Link
            key={match.id}
            href={`/world-cup/match/${match.id}`}
            className="group block rounded-2xl border border-edge bg-surface p-4 transition hover:border-accent/60 hover:bg-surface2"
          >
            <div className="flex items-center justify-between gap-4">
              {/* Home Team */}
              <div className="flex flex-1 items-center justify-end gap-2 text-right">
                <span className="truncate text-sm font-medium text-fg sm:text-base">
                  {match.homeCode}
                </span>
                <span className="text-xl sm:text-2xl">{match.homeFlag}</span>
              </div>

              {/* Score (Hero) */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-3xl font-bold tabular-nums text-fg sm:text-4xl">
                    {match.homeScore ?? 0}
                  </span>
                  <span className="text-xl font-bold text-muted sm:text-2xl">-</span>
                  <span className="text-3xl font-bold tabular-nums text-fg sm:text-4xl">
                    {match.awayScore ?? 0}
                  </span>
                </div>
                <span className="text-xs font-medium text-accent sm:text-sm">
                  {match.statusDetail}
                </span>
              </div>

              {/* Away Team */}
              <div className="flex flex-1 items-center gap-2">
                <span className="text-xl sm:text-2xl">{match.awayFlag}</span>
                <span className="truncate text-sm font-medium text-fg sm:text-base">
                  {match.awayCode}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
