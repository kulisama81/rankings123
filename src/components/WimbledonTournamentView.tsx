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
          className={`rounded-lg px-6 py-2.5 font-medium transition-colors ${
            activeTour === "atp"
              ? "bg-accent text-accent-contrast"
              : "bg-surface-elevated text-muted hover:bg-surface-raised hover:text-default"
          }`}
        >
          ATP Men
        </button>
        <button
          onClick={() => setActiveTour("wta")}
          className={`rounded-lg px-6 py-2.5 font-medium transition-colors ${
            activeTour === "wta"
              ? "bg-accent text-accent-contrast"
              : "bg-surface-elevated text-muted hover:bg-surface-raised hover:text-default"
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

      {wimbledonPlayers.length === 0 && (
        <div className="mb-6 rounded-lg bg-surface-elevated p-4 text-center">
          <p className="text-sm text-muted">
            Tournament {new Date() < new Date("2026-06-29") ? "starting June 29, 2026" : "concluded"}
            {" — showing all "}
            {activeTour.toUpperCase()} rankings
          </p>
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
