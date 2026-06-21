import type { WorldCupStats, WorldCupPlayerStat } from "@/types";
import { soccerFlag } from "@/lib/worldCupFlags";
import Link from "next/link";

interface GoldenBootRaceProps {
  stats: WorldCupStats;
}

function GoldenBootTable({ scorers }: { scorers: WorldCupPlayerStat[] }) {
  if (scorers.length === 0) {
    return (
      <div className="rounded-2xl border border-edge bg-surface p-8 text-center">
        <p className="text-sm text-muted">
          No scoring data available yet. Golden Boot race will appear once matches begin.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
      <div className="border-b border-edge bg-surface2 px-4 py-3 text-base font-bold tracking-tight text-fg">
        Golden Boot Leaderboard
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 text-right">#</th>
              <th className="px-4 py-3 text-left">Player</th>
              <th className="px-4 py-3 text-left">Team</th>
              <th className="px-3 py-3 text-center" title="Appearances">
                Apps
              </th>
              <th className="px-3 py-3 text-center" title="Goals">
                Goals
              </th>
              <th className="px-3 py-3 text-center" title="Assists">
                Assists
              </th>
              <th className="px-3 py-3 text-right" title="Goals per match">
                G/M
              </th>
            </tr>
          </thead>
          <tbody>
            {scorers.map((player, idx) => {
              const goalsPerMatch = player.appearances > 0
                ? (player.value / player.appearances).toFixed(2)
                : "0.00";
              const isLeader = idx === 0;

              return (
                <tr
                  key={player.playerId + player.playerName + idx}
                  className={`border-t border-edge ${
                    isLeader ? "bg-accent/[0.04]" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-right tabular-nums">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        isLeader
                          ? "bg-accent text-accentfg"
                          : idx < 3
                            ? "bg-surface2 text-fg"
                            : "text-muted"
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/world-cup/player/${player.playerId}`}
                      className="group block"
                    >
                      <div className="font-semibold text-fg group-hover:text-accent transition-colors">
                        {player.playerShortName}
                      </div>
                      <div className="text-xs text-muted">#{player.jersey}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none" aria-hidden="true">
                        {soccerFlag(player.teamCode)}
                      </span>
                      <div>
                        <div className="font-medium text-fg">{player.teamCode}</div>
                        <div className="text-xs text-muted">{player.teamName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center tabular-nums text-muted">
                    {player.appearances}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="inline-flex h-8 items-center rounded-lg bg-accent/15 px-3 font-bold tabular-nums text-accent">
                      {player.value}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center tabular-nums text-muted">
                    {player.assists ?? 0}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums text-muted">
                    {goalsPerMatch}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function GoldenBootRace({ stats }: GoldenBootRaceProps) {
  return (
    <section>
      <GoldenBootTable scorers={stats.topScorers} />

      {stats.source === "mock" && (
        <div className="mt-4 rounded-lg border border-down/30 bg-down/[0.04] px-4 py-2 text-xs">
          <span className="font-semibold text-down">Demo data</span>
          <span className="ml-2 text-muted">
            Live feed unavailable. Displaying sample data for demonstration.
          </span>
        </div>
      )}

      {stats.source === "espn" && (
        <p className="mt-4 text-xs text-muted">
          Golden Boot race data via ESPN. Updated every 3 minutes. Note: penalty vs. open-play
          breakdown not available from current data source.
        </p>
      )}
    </section>
  );
}
