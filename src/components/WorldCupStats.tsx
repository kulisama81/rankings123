import type { WorldCupStats, WorldCupPlayerStat } from "@/types";

interface WorldCupStatsProps {
  stats: WorldCupStats;
}

function StatLeaderCard({
  title,
  leaders,
  statKey,
}: {
  title: string;
  leaders: WorldCupPlayerStat[];
  statKey: "goals" | "assists";
}) {
  if (leaders.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
      <div className="border-b border-edge bg-surface2 px-4 py-2.5 text-sm font-bold tracking-tight text-fg">
        {title}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2 text-right">#</th>
              <th className="px-3 py-2 text-left">Player</th>
              <th className="px-3 py-2 text-left">Team</th>
              <th className="px-2 py-2 text-center" title="Matches">
                M
              </th>
              <th className="px-3 py-2 text-right" title={title}>
                {statKey === "goals" ? "G" : "A"}
              </th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((player, idx) => (
              <tr
                key={player.playerId + player.playerName + idx}
                className="border-t border-edge"
              >
                <td className="px-3 py-2 text-right tabular-nums text-muted">
                  {idx + 1}
                </td>
                <td className="px-3 py-2 text-fg">
                  <div className="font-semibold">{player.playerShortName}</div>
                  <div className="text-xs text-muted">#{player.jersey}</div>
                </td>
                <td className="px-3 py-2 text-fg">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none" aria-hidden="true">
                      {player.teamCode}
                    </span>
                    <span className="text-sm text-muted">{player.teamName}</span>
                  </div>
                </td>
                <td className="px-2 py-2 text-center tabular-nums text-muted">
                  {player.appearances}
                </td>
                <td className="px-3 py-2 text-right font-bold tabular-nums text-fg">
                  {player.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function WorldCupStats({ stats }: WorldCupStatsProps) {
  const hasData = stats.topScorers.length > 0 || stats.topAssisters.length > 0;
  if (!hasData) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-fg">
        Tournament Leaders
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <StatLeaderCard
          title="Top Scorers"
          leaders={stats.topScorers}
          statKey="goals"
        />
        <StatLeaderCard
          title="Top Assists"
          leaders={stats.topAssisters}
          statKey="assists"
        />
      </div>
      {stats.source === "mock" && (
        <p className="mt-4 text-sm text-muted">
          Stats are demo data (live feed unavailable).
        </p>
      )}
    </section>
  );
}
