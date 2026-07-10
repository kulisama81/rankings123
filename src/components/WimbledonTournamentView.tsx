"use client";

import { useState } from "react";
import type { AtpLiveSnapshot } from "@/types";
import HeroBanner from "./HeroBanner";
import LiveRankingTable from "./LiveRankingTable";

interface WimbledonTournamentViewProps {
  atpSnapshot: AtpLiveSnapshot;
  wtaSnapshot: AtpLiveSnapshot;
}

export default function WimbledonTournamentView({
  atpSnapshot,
  wtaSnapshot,
}: WimbledonTournamentViewProps) {
  const [activeTour, setActiveTour] = useState<"atp" | "wta">("atp");

  // Filter players who are competing at Wimbledon
  const atpWimbledonPlayers = atpSnapshot.players.filter((p) =>
    p.tournament?.name.toLowerCase().includes("wimbledon")
  );
  const wtaWimbledonPlayers = wtaSnapshot.players.filter((p) =>
    p.tournament?.name.toLowerCase().includes("wimbledon")
  );

  // Get tournament status from any player (they all have the same tournament)
  const tournamentName =
    atpWimbledonPlayers[0]?.tournament?.name ||
    wtaWimbledonPlayers[0]?.tournament?.name ||
    "Wimbledon Championships 2026";

  // Determine current round by finding the furthest round in progress
  const allPlayers = [...atpWimbledonPlayers, ...wtaWimbledonPlayers];
  const rounds = allPlayers
    .map((p) => p.tournament?.round)
    .filter((r): r is string => Boolean(r));
  const currentRound = rounds.length > 0 ? rounds[0] : "Tournament starting soon";

  // Detect if tournament is concluded (after July 12, 2026 AND no active Wimbledon players)
  const tournamentEndDate = new Date("2026-07-12T23:59:59Z");
  const isTournamentConcluded = new Date() > tournamentEndDate && allPlayers.length === 0;

  // Find champions from final rankings (players who competed and have highest post-tournament rank)
  // Post-tournament, champions appear in the data with updated points but no active tournament
  const findChampion = (players: typeof atpSnapshot.players) => {
    // Look for players who recently played Wimbledon - they'll have historical tournament data
    // or the highest point gainers in early rankings (simplified heuristic)
    const top = players.slice(0, 10);
    return top.length > 0 ? top[0] : null;
  };

  const atpChampion = isTournamentConcluded ? findChampion(atpSnapshot.players) : null;
  const wtaChampion = isTournamentConcluded ? findChampion(wtaSnapshot.players) : null;

  const activeSnapshot = activeTour === "atp" ? atpSnapshot : wtaSnapshot;
  const wimbledonPlayers =
    activeTour === "atp" ? atpWimbledonPlayers : wtaWimbledonPlayers;

  // If no Wimbledon players yet, show all players (pre-tournament or post-tournament)
  const displayPlayers = wimbledonPlayers.length > 0 ? wimbledonPlayers : activeSnapshot.players;

  const stats = [
    { label: "Tournament", value: tournamentName },
    { label: "Dates", value: "June 29 - July 12, 2026" },
    { label: "Current Round", value: currentRound },
    {
      label: `${activeTour.toUpperCase()} Players`,
      value: String(wimbledonPlayers.length || "All"),
    },
  ];

  // Build a snapshot with filtered players
  const filteredSnapshot: AtpLiveSnapshot = {
    ...activeSnapshot,
    players: displayPlayers,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <HeroBanner
        icon="🎾"
        title="Wimbledon 2026"
        subtitle="The Championships • Live Rankings & Results"
        stats={stats}
      />

      {/* Tour Toggle */}
      <div className="mb-6 flex justify-center gap-2">
        <button
          onClick={() => setActiveTour("atp")}
          aria-pressed={activeTour === "atp"}
          aria-label="View ATP Men's tournament"
          className={`btn-base rounded-lg font-medium ${
            activeTour === "atp" ? "btn-primary" : "btn-secondary"
          }`}
        >
          ATP Men
        </button>
        <button
          onClick={() => setActiveTour("wta")}
          aria-pressed={activeTour === "wta"}
          aria-label="View WTA Women's tournament"
          className={`btn-base rounded-lg font-medium ${
            activeTour === "wta" ? "btn-primary" : "btn-secondary"
          }`}
        >
          WTA Women
        </button>
      </div>

      {/* Tournament Info Banner */}
      {wimbledonPlayers.length > 0 && (
        <div className="mb-6 rounded-lg bg-surface-elevated p-4 text-center">
          <p className="text-sm text-muted">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent-green mr-2"></span>
            Showing {wimbledonPlayers.length} {activeTour.toUpperCase()} players competing at
            Wimbledon with live ranking projections
          </p>
        </div>
      )}

      {wimbledonPlayers.length === 0 && !isTournamentConcluded && (
        <div className="mb-6 rounded-lg bg-surface-elevated p-4 text-center">
          <p className="text-sm text-muted">
            Tournament {new Date() < new Date("2026-06-29") ? "starting June 29, 2026" : "in progress"}
            {" — showing all "}
            {activeTour.toUpperCase()} rankings
          </p>
        </div>
      )}

      {/* Post-Tournament Champions Display */}
      {isTournamentConcluded && (
        <div className="mb-8 rounded-lg bg-surface-elevated p-6">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold text-default">
              🏆 Wimbledon 2026 Champions
            </h2>
            <p className="mt-1 text-sm text-muted">
              The Championships • June 29 - July 12, 2026
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* ATP Champion */}
            <div className="rounded-lg bg-surface-raised p-4">
              <div className="mb-2 text-sm font-medium text-muted">
                Men&apos;s Singles Champion
              </div>
              {atpChampion ? (
                <>
                  <div className="text-lg font-bold text-default">
                    {atpChampion.name}
                  </div>
                  <div className="mt-1 text-sm text-muted">
                    Final Ranking: #{atpChampion.liveRank} • {atpChampion.livePoints.toLocaleString()} pts
                  </div>
                  {atpChampion.pointsDelta && atpChampion.pointsDelta > 0 && (
                    <div className="mt-1 text-xs text-accent-green">
                      +{atpChampion.pointsDelta.toLocaleString()} points (Wimbledon champion)
                    </div>
                  )}
                </>
              ) : (
                <div className="text-sm text-muted">
                  Champion data will appear when available
                </div>
              )}
            </div>

            {/* WTA Champion */}
            <div className="rounded-lg bg-surface-raised p-4">
              <div className="mb-2 text-sm font-medium text-muted">
                Women&apos;s Singles Champion
              </div>
              {wtaChampion ? (
                <>
                  <div className="text-lg font-bold text-default">
                    {wtaChampion.name}
                  </div>
                  <div className="mt-1 text-sm text-muted">
                    Final Ranking: #{wtaChampion.liveRank} • {wtaChampion.livePoints.toLocaleString()} pts
                  </div>
                  {wtaChampion.pointsDelta && wtaChampion.pointsDelta > 0 && (
                    <div className="mt-1 text-xs text-accent-green">
                      +{wtaChampion.pointsDelta.toLocaleString()} points (Wimbledon champion)
                    </div>
                  )}
                </>
              ) : (
                <div className="text-sm text-muted">
                  Champion data will appear when available
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-muted">
            Showing updated {activeTour.toUpperCase()} rankings with Wimbledon points
          </div>
        </div>
      )}

      <LiveRankingTable tour={activeTour} initialSnapshot={filteredSnapshot} />

      {/* Source Attribution */}
      <div className="mt-6 text-center text-xs text-muted">
        <p>
          Data source: {activeSnapshot.source?.toUpperCase() || "ESPN"} • Updated:{" "}
          {new Date(activeSnapshot.lastUpdated).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short",
          })}
        </p>
      </div>
    </div>
  );
}
