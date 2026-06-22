import type { WorldCupSnapshot } from "@/types";

interface TeamStatLeader {
  name: string;
  code: string;
  flag: string;
  value: number;
  displayValue: string;
}

interface StatLeaderboard {
  title: string;
  leaders: TeamStatLeader[];
  valueLabel: string;
  ascending?: boolean; // true for "fewest" stats (lower is better)
}

function extractTeamStats(snapshot: WorldCupSnapshot): StatLeaderboard[] {
  // Collect all teams from all groups
  const allTeams = snapshot.groups.flatMap((g) => g.teams);

  // Helper to create a leaderboard sorted by a stat
  const createLeaderboard = (
    title: string,
    valueLabel: string,
    getValue: (team: typeof allTeams[0]) => number,
    ascending = false
  ): StatLeaderboard => {
    const sorted = [...allTeams].sort((a, b) => {
      const diff = getValue(b) - getValue(a);
      return ascending ? -diff : diff;
    });

    // Take top 6 teams
    const leaders = sorted.slice(0, 6).map((team) => ({
      name: team.name,
      code: team.code,
      flag: team.flag,
      value: getValue(team),
      displayValue: String(getValue(team)),
    }));

    return { title, leaders, valueLabel, ascending };
  };

  // Filter teams that have played at least one match for card stats
  const teamsWithMatches = allTeams.filter((t) => t.played > 0);

  return [
    createLeaderboard("Most Goals Scored", "Goals", (t) => t.goalsFor),
    createLeaderboard("Best Defense", "Goals Conceded", (t) => t.goalsAgainst, true),
    createLeaderboard("Best Goal Difference", "GD", (t) => t.goalDiff),
    // Most Disciplined: fewest total cards (only teams with matches)
    {
      title: "Most Disciplined",
      valueLabel: "Cards",
      ascending: true,
      leaders: [...teamsWithMatches]
        .sort((a, b) => {
          const aCards = (a.yellowCards || 0) + (a.redCards || 0) * 2;
          const bCards = (b.yellowCards || 0) + (b.redCards || 0) * 2;
          return aCards - bCards;
        })
        .slice(0, 6)
        .map((team) => {
          const yellow = team.yellowCards || 0;
          const red = team.redCards || 0;
          const total = yellow + red;
          return {
            name: team.name,
            code: team.code,
            flag: team.flag,
            value: total,
            displayValue: `${yellow}Y ${red}R`,
          };
        }),
    },
  ];
}

export default function WorldCupTeamStats({
  snapshot,
}: {
  snapshot: WorldCupSnapshot;
}) {
  const leaderboards = extractTeamStats(snapshot);

  return (
    <section id="team-stats" className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-fg">Team Statistics</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {leaderboards.map((board) => (
          <div
            key={board.title}
            className="rounded-xl border border-edge bg-surface p-4 shadow-sm"
          >
            <h3 className="mb-4 text-center text-lg font-semibold text-fg">
              {board.title}
            </h3>
            <div className="space-y-3">
              {board.leaders.map((leader, idx) => (
                <a
                  key={leader.code}
                  href={`/world-cup/team/${leader.code.toLowerCase()}`}
                  className="flex items-center justify-between rounded-lg border border-edge bg-canvas p-2.5 transition-colors hover:border-accent hover:bg-surface"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface text-xs font-semibold text-muted">
                      {idx + 1}
                    </span>
                    <span className="text-xl" title={leader.name}>
                      {leader.flag}
                    </span>
                    <span className="text-sm font-medium text-fg">
                      {leader.code}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-base font-bold text-accent">
                      {leader.displayValue}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      {snapshot.source === "mock" && (
        <p className="mt-4 text-center text-sm text-muted">
          Team statistics are currently unavailable. Showing sample data.
        </p>
      )}
    </section>
  );
}
