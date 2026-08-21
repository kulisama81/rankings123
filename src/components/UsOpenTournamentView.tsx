"use client";

import { useState } from "react";
import type { AtpLiveSnapshot } from "@/types";
import HeroBanner from "./HeroBanner";
import LiveRankingTable from "./LiveRankingTable";
import LiveScoresWidget from "./LiveScoresWidget";

interface UsOpenTournamentViewProps {
  atpSnapshot: AtpLiveSnapshot;
  wtaSnapshot: AtpLiveSnapshot;
}

// US Open Grand Slam points by round (ATP/WTA same for slams)
const US_OPEN_POINTS = {
  R128: { atp: 10, wta: 10 },
  R64: { atp: 50, wta: 70 },
  R32: { atp: 100, wta: 130 },
  R16: { atp: 200, wta: 240 },
  QF: { atp: 400, wta: 430 },
  SF: { atp: 800, wta: 780 },
  F: { atp: 1300, wta: 1300 },
  W: { atp: 2000, wta: 2000 },
};

export default function UsOpenTournamentView({
  atpSnapshot,
  wtaSnapshot,
}: UsOpenTournamentViewProps) {
  const [activeTour, setActiveTour] = useState<"atp" | "wta">("atp");

  // Filter players who are competing at US Open
  const atpUsOpenPlayers = atpSnapshot.players.filter((p) =>
    p.tournament?.name.toLowerCase().includes("us open")
  );
  const wtaUsOpenPlayers = wtaSnapshot.players.filter((p) =>
    p.tournament?.name.toLowerCase().includes("us open")
  );

  // Get tournament status from any player (they all have the same tournament)
  const tournamentName =
    atpUsOpenPlayers[0]?.tournament?.name ||
    wtaUsOpenPlayers[0]?.tournament?.name ||
    "US Open Tennis Championships 2026";

  // Determine current round by finding the furthest round in progress
  const allPlayers = [...atpUsOpenPlayers, ...wtaUsOpenPlayers];
  const rounds = allPlayers
    .map((p) => p.tournament?.round)
    .filter((r): r is string => Boolean(r));
  const currentRound = rounds.length > 0 ? rounds[0] : "Draw announcement Aug 27";

  // Detect if tournament is concluded (after Sep 13, 2026 AND no active US Open players)
  const tournamentEndDate = new Date("2026-09-13T23:59:59Z");
  const isTournamentConcluded = new Date() > tournamentEndDate && allPlayers.length === 0;

  // Find champions from final rankings (players who competed and have highest post-tournament rank)
  const findChampion = (players: typeof atpSnapshot.players) => {
    const top = players.slice(0, 10);
    return top.length > 0 ? top[0] : null;
  };

  const atpChampion = isTournamentConcluded ? findChampion(atpSnapshot.players) : null;
  const wtaChampion = isTournamentConcluded ? findChampion(wtaSnapshot.players) : null;

  const activeSnapshot = activeTour === "atp" ? atpSnapshot : wtaSnapshot;
  const usOpenPlayers =
    activeTour === "atp" ? atpUsOpenPlayers : wtaUsOpenPlayers;

  // If no US Open players yet, show all players (pre-tournament or post-tournament)
  const displayPlayers = usOpenPlayers.length > 0 ? usOpenPlayers : activeSnapshot.players;

  const stats = [
    { label: "Tournament", value: tournamentName },
    { label: "Dates", value: "Aug 30 - Sep 13, 2026" },
    { label: "Current Round", value: currentRound },
    {
      label: `${activeTour.toUpperCase()} Players`,
      value: String(usOpenPlayers.length || "All"),
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
        sport="tennis"
        title="US Open 2026"
        subtitle="USTA Billie Jean King National Tennis Center • Live Draws, Scores & Rankings"
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

      {/* Live Scores Widget */}
      <LiveScoresWidget
        initialAtpSnapshot={atpSnapshot}
        initialWtaSnapshot={wtaSnapshot}
        tournamentName="US Open"
      />

      {/* Tournament concluded message */}
      {isTournamentConcluded && (atpChampion || wtaChampion) && (
        <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <h2 className="type-subtitle mb-4 text-fg">🏆 US Open 2026 Champions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {atpChampion && (
              <div className="rounded-xl border border-edge bg-surface p-4">
                <div className="text-sm font-semibold uppercase tracking-wide text-muted">
                  ATP Men&apos;s Singles
                </div>
                <div className="mt-1 text-lg font-bold text-fg">{atpChampion.name}</div>
              </div>
            )}
            {wtaChampion && (
              <div className="rounded-xl border border-edge bg-surface p-4">
                <div className="text-sm font-semibold uppercase tracking-wide text-muted">
                  WTA Women&apos;s Singles
                </div>
                <div className="mt-1 text-lg font-bold text-fg">{wtaChampion.name}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Points implications callout */}
      <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
        <h2 className="type-subtitle mb-4 text-fg">Ranking Points by Round</h2>
        <p className="mb-4 text-sm text-muted">
          Grand Slam points earned at each stage of the tournament. Reaching later rounds can
          significantly impact a player&apos;s ranking.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-8">
          {Object.entries(US_OPEN_POINTS).map(([round, points]) => (
            <div
              key={round}
              className="rounded-lg border border-edge bg-surface p-3 text-center"
            >
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
                {round}
              </div>
              <div className="text-base font-bold text-fg">
                {activeTour === "atp" ? points.atp : points.wta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Rankings Table */}
      <div className="mt-8">
        <h2 className="type-subtitle mb-4 text-fg">
          {usOpenPlayers.length > 0
            ? `${activeTour.toUpperCase()} Players at US Open`
            : `Full ${activeTour.toUpperCase()} Rankings`}
        </h2>
        <LiveRankingTable tour={activeTour} initialSnapshot={filteredSnapshot} />
      </div>
    </div>
  );
}
