"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Match {
  id: string;
  player1: string;
  player2: string;
  score: string;
  status: string;
  round: string;
}

/**
 * Cincinnati Open Live Scores Widget
 * Shows in-progress matches during Cincinnati Open (Aug 11-23, 2026)
 * Fetches from server-side API route that queries ESPN scoreboard
 * Auto-hides when tournament is not active or no matches in progress
 */
export default function CincinnatiLiveScoresWidget() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCincinnatiMatches = useCallback(async () => {
    try {
      const response = await fetch("/api/tennis/cincinnati");
      if (response.ok) {
        const data = await response.json();
        setMatches(data.matches || []);
      } else {
        setMatches([]);
      }
    } catch {
      // Fail silently - graceful degradation (CX-first: no console errors)
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCincinnatiMatches();
    // Refresh every 2 minutes during tournament
    const interval = setInterval(fetchCincinnatiMatches, 120000);
    return () => clearInterval(interval);
  }, [fetchCincinnatiMatches]);

  // Auto-hide outside tournament dates (Aug 11-23, 2026 UTC)
  const now = new Date();
  const tournamentStart = new Date(Date.UTC(2026, 7, 11, 0, 0, 0)); // Aug 11
  const tournamentEnd = new Date(Date.UTC(2026, 7, 23, 23, 59, 59)); // Aug 23

  if (now < tournamentStart || now > tournamentEnd) {
    return null;
  }

  // Don't show if loading or no matches
  if (loading || matches.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="overflow-hidden rounded-2xl border border-accent/20 bg-surface">
        <div className="border-b border-edge bg-surface2 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
                  style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <h2 className="font-display text-lg font-bold text-fg">
                Cincinnati Open - Live Now
              </h2>
            </div>
            <span className="text-sm text-muted">ATP Masters 1000</span>
          </div>
        </div>

        <div className="divide-y divide-edge">
          {matches.slice(0, 5).map((match) => (
            <Link
              key={match.id}
              href="/atp-live"
              className="block px-6 py-4 transition hover:bg-surface2"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-fg">{match.player1}</p>
                    {match.status === "Live" && (
                      <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                        LIVE
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-secondary">{match.player2}</p>
                  <p className="mt-1 text-xs text-muted">{match.round}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-lg font-bold tabular-nums text-fg">
                    {match.score}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {matches.length > 5 && (
          <div className="border-t border-edge bg-surface2 px-6 py-3 text-center">
            <Link
              href="/atp-live"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all {matches.length} matches →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
