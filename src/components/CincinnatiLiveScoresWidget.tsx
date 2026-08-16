"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ATP_SCOREBOARD_URL } from "@/lib/atpDeepFeed";

// WTA scoreboard URL (same format as ATP)
const WTA_SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/tennis/wta/scoreboard";

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
 * Reuses ESPN scoreboard API, filters to Cincinnati matches only
 * Auto-hides when tournament is not active or no matches in progress
 */
export default function CincinnatiLiveScoresWidget() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCincinnatiMatches = useCallback(async () => {
    try {
      // Fetch both ATP and WTA scoreboards (Cincinnati is a joint tournament)
      const [atpResponse, wtaResponse] = await Promise.all([
        fetch(ATP_SCOREBOARD_URL),
        fetch(WTA_SCOREBOARD_URL),
      ]);

      const cincinnatiMatches: Match[] = [];

      // Process ATP scoreboard
      if (atpResponse.ok) {
        const atpData = await atpResponse.json();
        extractMatches(atpData, "mens-singles", cincinnatiMatches);
      }

      // Process WTA scoreboard
      if (wtaResponse.ok) {
        const wtaData = await wtaResponse.json();
        extractMatches(wtaData, "womens-singles", cincinnatiMatches);
      }

      setMatches(cincinnatiMatches);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch Cincinnati scores:", error);
      setMatches([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCincinnatiMatches();
    // Refresh every 2 minutes during tournament
    const interval = setInterval(fetchCincinnatiMatches, 120000);
    return () => clearInterval(interval);
  }, [fetchCincinnatiMatches]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  function extractMatches(
    data: any,
    singlesSlug: "mens-singles" | "womens-singles",
    matches: Match[]
  ) {
  /* eslint-enable @typescript-eslint/no-explicit-any */
    for (const event of data?.events ?? []) {
      const tournamentName: string = event.shortName || event.name || "";

      // Filter for Cincinnati Open
      if (!tournamentName.toLowerCase().includes("cincinnati")) {
        continue;
      }

      // Get singles matches (ATP or WTA)
      const singles = (event.groupings ?? []).find(
        (g: { grouping?: { slug?: string } }) => g?.grouping?.slug === singlesSlug
      );

      if (!singles) continue;

        for (const match of singles.competitions ?? []) {
          const status = match?.status?.type?.name ?? "";

          // Only show in-progress or recently completed matches
          if (status !== "STATUS_IN_PROGRESS" && status !== "STATUS_FINAL") {
            continue;
          }

          const competitors = match?.competitors ?? [];
          if (competitors.length < 2) continue;

          const player1Name = competitors[0]?.athlete?.displayName;
          const player2Name = competitors[1]?.athlete?.displayName;

          // Skip matches with missing player data (CX-first: never show placeholders)
          if (!player1Name || !player2Name) {
            continue;
          }

          // Build score string
          let scoreStr = "";
          if (match?.status?.displayClock) {
            scoreStr = match.status.displayClock;
          } else {
            const p1Score = competitors[0]?.score || "0";
            const p2Score = competitors[1]?.score || "0";
            scoreStr = `${p1Score} - ${p2Score}`;
          }

          const roundName = match?.round?.displayName || "";

          matches.push({
            id: match.id || `${player1Name}-${player2Name}`,
            player1: player1Name,
            player2: player2Name,
            score: scoreStr,
            status: status === "STATUS_IN_PROGRESS" ? "Live" : "Final",
            round: roundName,
          });
        }
      }
  }

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
