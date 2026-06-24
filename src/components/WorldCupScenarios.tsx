"use client";

import { useState, useMemo } from "react";
import type { WorldCupSnapshot, WorldCupMatch, WorldCupTeam, WorldCupGroup } from "@/types";
import Link from "next/link";

interface SimulatedResult {
  matchId: string;
  homeScore: number;
  awayScore: number;
}

interface WorldCupScenariosProps {
  initialSnapshot: WorldCupSnapshot;
}

// Calculate group standings based on current results + simulated upcoming matches
function calculateStandings(
  originalGroups: WorldCupGroup[],
  allMatches: WorldCupMatch[],
  simulatedResults: Map<string, SimulatedResult>
): WorldCupGroup[] {
  // Build a map of team code -> team data initialized from current standings
  const teamMap = new Map<string, WorldCupTeam>();

  for (const group of originalGroups) {
    for (const team of group.teams) {
      teamMap.set(team.code, { ...team });
    }
  }

  // Process only completed matches (post) and simulated matches (pre with user input)
  const relevantMatches = allMatches.filter((m) => {
    // Include completed matches
    if (m.state === "post" && m.homeScore !== null && m.awayScore !== null) {
      return true;
    }
    // Include upcoming matches that have simulated scores
    if (m.state === "pre" && simulatedResults.has(m.id)) {
      return true;
    }
    return false;
  });

  // Reset all team stats to zero (we'll recalculate from scratch)
  for (const team of teamMap.values()) {
    team.played = 0;
    team.won = 0;
    team.drawn = 0;
    team.lost = 0;
    team.goalsFor = 0;
    team.goalsAgainst = 0;
    team.goalDiff = 0;
    team.points = 0;
  }

  // Apply match results
  for (const match of relevantMatches) {
    let homeScore: number;
    let awayScore: number;

    if (simulatedResults.has(match.id)) {
      const sim = simulatedResults.get(match.id)!;
      homeScore = sim.homeScore;
      awayScore = sim.awayScore;
    } else if (match.homeScore !== null && match.awayScore !== null) {
      homeScore = match.homeScore;
      awayScore = match.awayScore;
    } else {
      continue;
    }

    const homeTeam = teamMap.get(match.homeCode);
    const awayTeam = teamMap.get(match.awayCode);

    if (!homeTeam || !awayTeam) continue;

    homeTeam.played++;
    awayTeam.played++;
    homeTeam.goalsFor += homeScore;
    homeTeam.goalsAgainst += awayScore;
    awayTeam.goalsFor += awayScore;
    awayTeam.goalsAgainst += homeScore;

    if (homeScore > awayScore) {
      homeTeam.won++;
      homeTeam.points += 3;
      awayTeam.lost++;
    } else if (homeScore < awayScore) {
      awayTeam.won++;
      awayTeam.points += 3;
      homeTeam.lost++;
    } else {
      homeTeam.drawn++;
      awayTeam.drawn++;
      homeTeam.points++;
      awayTeam.points++;
    }

    homeTeam.goalDiff = homeTeam.goalsFor - homeTeam.goalsAgainst;
    awayTeam.goalDiff = awayTeam.goalsFor - awayTeam.goalsAgainst;
  }

  // Rebuild groups with updated standings
  const updatedGroups: WorldCupGroup[] = originalGroups.map((group) => {
    const teams = group.teams.map((t) => teamMap.get(t.code)!).filter(Boolean);

    // Sort by FIFA tiebreakers: points → goal diff → goals for
    teams.sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;
      if (a.goalDiff !== b.goalDiff) return b.goalDiff - a.goalDiff;
      return b.goalsFor - a.goalsFor;
    });

    // Assign ranks and determine outlook
    teams.forEach((team, i) => {
      team.rank = i + 1;
      // Top 2 advance automatically
      if (team.played === 3) {
        if (i < 2) {
          team.outlook = "advanced";
          team.status = "Advance to Round of 32";
        } else if (i === 2) {
          // 3rd place - might advance as best 3rd
          team.outlook = "alive";
          team.status = "3rd place (best 8 advance)";
        } else {
          team.outlook = "out";
          team.status = "Eliminated";
        }
      } else {
        team.outlook = "alive";
        team.status = undefined;
      }
    });

    return { ...group, teams };
  });

  // Calculate best 3rd-place teams if groups are complete
  const thirdPlaceTeams = updatedGroups
    .map((g) => g.teams[2])
    .filter((t) => t && t.played === 3);

  if (thirdPlaceTeams.length > 0) {
    thirdPlaceTeams.sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;
      if (a.goalDiff !== b.goalDiff) return b.goalDiff - a.goalDiff;
      return b.goalsFor - a.goalsFor;
    });

    // Top 8 third-place teams advance
    for (let i = 0; i < Math.min(8, thirdPlaceTeams.length); i++) {
      const team = thirdPlaceTeams[i];
      team.outlook = "advanced";
      team.status = `Advance as 3rd (${i + 1}/8 best)`;
    }
  }

  return updatedGroups;
}

export default function WorldCupScenarios({ initialSnapshot }: WorldCupScenariosProps) {
  const [simulatedResults, setSimulatedResults] = useState<Map<string, SimulatedResult>>(
    new Map()
  );

  // Get all group stage matches that are upcoming (pre)
  const upcomingMatches = useMemo(() => {
    return initialSnapshot.matches.filter((m) => m.state === "pre");
  }, [initialSnapshot]);

  // Calculate updated standings based on simulations
  const calculatedGroups = useMemo(() => {
    return calculateStandings(initialSnapshot.groups, initialSnapshot.matches, simulatedResults);
  }, [initialSnapshot, simulatedResults]);

  const handleScoreChange = (matchId: string, homeScore: number | null, awayScore: number | null) => {
    const newResults = new Map(simulatedResults);
    // If both scores are null (cleared), remove the simulation entirely
    if (homeScore === null && awayScore === null) {
      newResults.delete(matchId);
    } else {
      // Otherwise, store the simulation (treating null as 0 for partial input)
      newResults.set(matchId, {
        matchId,
        homeScore: homeScore ?? 0,
        awayScore: awayScore ?? 0
      });
    }
    setSimulatedResults(newResults);
  };

  const handleReset = () => {
    setSimulatedResults(new Map());
  };

  const hasSimulations = simulatedResults.size > 0;

  return (
    <div className="space-y-8">
      {/* Upcoming Matches Input */}
      {upcomingMatches.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-fg">Simulate Match Results</h2>
            {hasSimulations && (
              <button
                onClick={handleReset}
                className="rounded-lg border border-edge bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface2"
              >
                Reset All
              </button>
            )}
          </div>
          <div className="space-y-3">
            {upcomingMatches.map((match) => {
              const simulated = simulatedResults.get(match.id);
              return (
                <MatchSimulator
                  key={match.id}
                  match={match}
                  homeScore={simulated?.homeScore ?? null}
                  awayScore={simulated?.awayScore ?? null}
                  onChange={(home, away) => handleScoreChange(match.id, home, away)}
                />
              );
            })}
          </div>
        </section>
      )}

      {upcomingMatches.length === 0 && (
        <div className="rounded-2xl border border-edge bg-surface p-8 text-center">
          <p className="text-muted">
            All group stage matches have been completed. The knockout stage has begun.
          </p>
        </div>
      )}

      {/* Updated Group Standings */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-2xl font-bold text-fg">
            {hasSimulations ? "Simulated" : "Current"} Group Standings
          </h2>
          {hasSimulations && (
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Live Simulation
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {calculatedGroups.map((group) => (
            <GroupCard key={group.name} group={group} />
          ))}
        </div>
      </section>

      {/* Legend */}
      <div className="rounded-2xl border border-edge bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-fg">Qualification</h3>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-4 w-4 rounded-full bg-up/10 border border-up" />
            <span>Top 2 per group + 8 best 3rd-place teams advance</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchSimulator({
  match,
  homeScore,
  awayScore,
  onChange,
}: {
  match: WorldCupMatch;
  homeScore: number | null;
  awayScore: number | null;
  onChange: (home: number | null, away: number | null) => void;
}) {
  const handleHomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Empty input = null (cleared), otherwise parse and clamp to 0-20
    const val = input === "" ? null : Math.max(0, Math.min(20, parseInt(input)));
    onChange(val, awayScore);
  };

  const handleAwayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Empty input = null (cleared), otherwise parse and clamp to 0-20
    const val = input === "" ? null : Math.max(0, Math.min(20, parseInt(input)));
    onChange(homeScore, val);
  };

  const matchDate = new Date(match.date);
  const isSimulated = homeScore !== null || awayScore !== null;

  return (
    <div
      className={`rounded-2xl border ${
        isSimulated ? "border-accent bg-accent/5" : "border-edge bg-surface"
      } p-4 transition-colors`}
    >
      <div className="mb-2 text-xs text-muted">
        {matchDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
        {match.venue && ` • ${match.venue}`}
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Home Team */}
        <div className="flex items-center justify-end gap-2">
          <span className="text-sm font-semibold text-fg">{match.homeName}</span>
          <span className="text-lg">{match.homeFlag}</span>
        </div>

        {/* Score Inputs */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="20"
            value={homeScore ?? ""}
            onChange={handleHomeChange}
            placeholder="–"
            className="w-14 rounded-lg border border-edge bg-surface2 px-2 py-2 text-center text-lg font-bold text-fg focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <span className="text-muted">:</span>
          <input
            type="number"
            min="0"
            max="20"
            value={awayScore ?? ""}
            onChange={handleAwayChange}
            placeholder="–"
            className="w-14 rounded-lg border border-edge bg-surface2 px-2 py-2 text-center text-lg font-bold text-fg focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-2">
          <span className="text-lg">{match.awayFlag}</span>
          <span className="text-sm font-semibold text-fg">{match.awayName}</span>
        </div>
      </div>
    </div>
  );
}

function GroupCard({ group }: { group: WorldCupGroup }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
      <div className="border-b border-edge bg-surface2 px-4 py-2.5 text-sm font-bold tracking-tight text-fg">
        {group.name}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2 text-right">#</th>
              <th className="px-3 py-2 text-left">Team</th>
              <th className="px-2 py-2 text-center" title="Played">
                P
              </th>
              <th className="px-2 py-2 text-center" title="Goal difference">
                GD
              </th>
              <th className="px-3 py-2 text-right" title="Points">
                Pts
              </th>
            </tr>
          </thead>
          <tbody>
            {group.teams.map((t) => (
              <tr
                key={t.code}
                className={`border-t border-edge transition-colors ${
                  t.outlook === "advanced"
                    ? "border-l-4 border-l-up bg-up/5"
                    : t.outlook === "out"
                    ? "border-l-4 border-l-down bg-down/5"
                    : "border-l-4 border-l-transparent"
                }`}
              >
                <td className="px-3 py-2 text-right tabular-nums text-muted">{t.rank}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{t.flag}</span>
                    <div className="flex flex-col">
                      <Link
                        href={`/world-cup/team/${t.code.toLowerCase()}`}
                        className="font-semibold text-fg transition-colors hover:text-accent"
                      >
                        {t.name}
                      </Link>
                      {t.status && (
                        <span className="text-xs text-muted">{t.status}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-center tabular-nums text-muted">{t.played}</td>
                <td
                  className={`px-2 py-2 text-center tabular-nums font-medium ${
                    t.goalDiff > 0
                      ? "text-up"
                      : t.goalDiff < 0
                      ? "text-down"
                      : "text-muted"
                  }`}
                >
                  {t.goalDiff > 0 ? "+" : ""}
                  {t.goalDiff}
                </td>
                <td className="px-3 py-2 text-right tabular-nums font-bold text-fg">
                  {t.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
