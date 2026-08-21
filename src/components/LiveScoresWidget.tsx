"use client";

import { useEffect, useState } from "react";
import type { AtpLiveSnapshot, AtpLivePlayer } from "@/types";

interface LiveScoresWidgetProps {
  initialAtpSnapshot: AtpLiveSnapshot;
  initialWtaSnapshot: AtpLiveSnapshot;
  tournamentName: string; // e.g., "US Open"
}

export default function LiveScoresWidget({
  initialAtpSnapshot,
  initialWtaSnapshot,
  tournamentName,
}: LiveScoresWidgetProps) {
  const [atpSnapshot, setAtpSnapshot] = useState(initialAtpSnapshot);
  const [wtaSnapshot, setWtaSnapshot] = useState(initialWtaSnapshot);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const [atpRes, wtaRes] = await Promise.all([
          fetch("/api/atp/live"),
          fetch("/api/wta/live"),
        ]);
        if (atpRes.ok && wtaRes.ok) {
          const [atp, wta] = await Promise.all([atpRes.json(), wtaRes.json()]);
          setAtpSnapshot(atp);
          setWtaSnapshot(wta);
        }
      } catch (error) {
        console.error("Failed to refresh live scores:", error);
      }
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter for in-progress matches at this tournament
  const getInProgressMatches = (snapshot: AtpLiveSnapshot): AtpLivePlayer[] => {
    return snapshot.players.filter(
      (p) =>
        p.tournament?.name.toLowerCase().includes(tournamentName.toLowerCase()) &&
        p.tournament?.active &&
        p.tournament?.liveScore
    );
  };

  const atpLiveMatches = getInProgressMatches(atpSnapshot);
  const wtaLiveMatches = getInProgressMatches(wtaSnapshot);

  // If no live matches, hide the widget
  if (atpLiveMatches.length === 0 && wtaLiveMatches.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-subtitle text-fg">🔴 Live Scores</h2>
        <div className="flex items-center gap-2 text-sm text-muted">
          <div className="h-2 w-2 animate-pulse rounded-full bg-accent"></div>
          <span>Updates every 60s</span>
        </div>
      </div>

      {/* ATP Live Matches */}
      {atpLiveMatches.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            ATP Men&apos;s Singles
          </h3>
          <div className="space-y-2">
            {atpLiveMatches.map((player) => (
              <div
                key={player.guid || player.name}
                className="flex items-center justify-between rounded-lg border border-edge bg-bg p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-fg">{player.name}</span>
                    <span className="rounded bg-surface px-1.5 py-0.5 text-xs font-medium text-muted">
                      #{player.officialRank}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    {player.tournament?.round} • {player.tournament?.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-accent">
                    {player.tournament?.liveScore}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-accent">In Play</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WTA Live Matches */}
      {wtaLiveMatches.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            WTA Women&apos;s Singles
          </h3>
          <div className="space-y-2">
            {wtaLiveMatches.map((player) => (
              <div
                key={player.guid || player.name}
                className="flex items-center justify-between rounded-lg border border-edge bg-bg p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-fg">{player.name}</span>
                    <span className="rounded bg-surface px-1.5 py-0.5 text-xs font-medium text-muted">
                      #{player.officialRank}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    {player.tournament?.round} • {player.tournament?.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-accent">
                    {player.tournament?.liveScore}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-accent">In Play</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
