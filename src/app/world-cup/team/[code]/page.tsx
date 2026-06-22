import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorldCupData } from "@/lib/worldCupFeed";
import { fetchTeamRoster } from "@/lib/worldCupTeamRosterFeed";
import type { WorldCupTeam, WorldCupMatch } from "@/types";

interface TeamPageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({
  params,
}: TeamPageProps): Promise<Metadata> {
  const { code } = await params;
  const teamCode = code.toUpperCase();
  const snapshot = await getWorldCupData();

  const team = snapshot.groups
    .flatMap((g) => g.teams)
    .find((t) => t.code === teamCode);

  if (!team) {
    return { title: "Team Not Found" };
  }

  return {
    title: `${team.name} — World Cup 2026 Squad, Fixtures & Results`,
    description: `${team.name} at FIFA World Cup 2026: group standings, fixtures, results, and form.`,
    alternates: { canonical: `/world-cup/team/${teamCode.toLowerCase()}` },
    openGraph: {
      title: `${team.name} — World Cup 2026 — Rankings123`,
      description: `${team.name} at FIFA World Cup 2026: group standings, fixtures, results, and form.`,
      url: `/world-cup/team/${teamCode.toLowerCase()}`,
      type: "website",
    },
  };
}

export const dynamic = "force-dynamic";

function TeamFixtures({
  teamCode,
  matches,
}: {
  teamCode: string;
  matches: WorldCupMatch[];
}) {
  const teamMatches = matches.filter(
    (m) => m.homeCode === teamCode || m.awayCode === teamCode
  );

  if (teamMatches.length === 0) {
    return (
      <p className="text-sm text-muted">No fixtures scheduled yet.</p>
    );
  }

  return (
    <div className="space-y-3">
      {teamMatches.map((match) => {
        const isHome = match.homeCode === teamCode;
        const opponentName = isHome ? match.awayName : match.homeName;
        const opponentFlag = isHome ? match.awayFlag : match.homeFlag;
        const teamScore = isHome ? match.homeScore : match.awayScore;
        const opponentScore = isHome ? match.awayScore : match.homeScore;

        let resultBadge = "";
        let resultClass = "";
        if (match.state === "post" && teamScore !== null && opponentScore !== null) {
          if (teamScore > opponentScore) {
            resultBadge = "W";
            resultClass = "text-up";
          } else if (teamScore < opponentScore) {
            resultBadge = "L";
            resultClass = "text-down";
          } else {
            resultBadge = "D";
            resultClass = "text-muted";
          }
        }

        return (
          <Link
            key={match.id}
            href={`/world-cup/match/${match.id}`}
            className="block rounded-xl border border-edge bg-surface p-4 transition-colors hover:bg-surface2"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-base" aria-hidden="true">
                  {opponentFlag}
                </span>
                <div>
                  <div className="font-semibold text-fg">{opponentName}</div>
                  <div className="text-xs text-muted">
                    {isHome ? "Home" : "Away"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {match.state === "post" && teamScore !== null && opponentScore !== null ? (
                  <>
                    <div className="text-right">
                      <div className="font-bold tabular-nums text-fg">
                        {teamScore} - {opponentScore}
                      </div>
                      <div className="text-xs text-muted">{match.statusDetail}</div>
                    </div>
                    {resultBadge && (
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-surface2 text-sm font-bold ${resultClass}`}
                      >
                        {resultBadge}
                      </div>
                    )}
                  </>
                ) : match.state === "in" ? (
                  <div className="text-right">
                    <div className="font-bold tabular-nums text-accent">
                      {teamScore ?? 0} - {opponentScore ?? 0}
                    </div>
                    <div className="text-xs text-accent">{match.statusDetail}</div>
                  </div>
                ) : (
                  <div className="text-xs text-muted">{match.statusDetail}</div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { code } = await params;
  const teamCode = code.toUpperCase();
  const snapshot = await getWorldCupData();

  let team: WorldCupTeam | undefined;
  let groupName = "";

  for (const group of snapshot.groups) {
    const found = group.teams.find((t) => t.code === teamCode);
    if (found) {
      team = found;
      groupName = group.name;
      break;
    }
  }

  if (!team) {
    notFound();
  }

  // Fetch roster data (null if unavailable — hide section per CX FIRST)
  const rosterData = await fetchTeamRoster(teamCode);

  const form = snapshot.matches
    .filter(
      (m) =>
        m.state === "post" &&
        (m.homeCode === teamCode || m.awayCode === teamCode) &&
        m.homeScore !== null &&
        m.awayScore !== null
    )
    .slice(-5)
    .map((m) => {
      const isHome = m.homeCode === teamCode;
      const teamScore = isHome ? m.homeScore! : m.awayScore!;
      const opponentScore = isHome ? m.awayScore! : m.homeScore!;
      if (teamScore > opponentScore) return "W";
      if (teamScore < opponentScore) return "L";
      return "D";
    });

  const formBadgeClass = (result: string) => {
    switch (result) {
      case "W":
        return "bg-up/20 text-up";
      case "L":
        return "bg-down/20 text-down";
      default:
        return "bg-surface2 text-muted";
    }
  };

  const outlookClass = () => {
    switch (team.outlook) {
      case "advanced":
        return "text-up";
      case "out":
        return "text-down";
      default:
        return "text-muted";
    }
  };

  return (
    <div
      data-sport="worldcup"
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <nav className="mb-6 text-sm text-muted">
        <Link href="/world-cup" className="hover:text-fg">
          World Cup 2026
        </Link>
        {" / "}
        <span className="text-fg">{team.name}</span>
      </nav>

      <div className="mb-8 flex items-start gap-4">
        <span className="text-6xl" aria-hidden="true">
          {team.flag}
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {team.name}
          </h1>
          <p className="mt-1 text-lg text-muted">
            {groupName} · Rank {team.rank}
          </p>
          {team.status && (
            <p className={`mt-1 text-sm font-medium ${outlookClass()}`}>
              {team.status}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-8">
        <section className="rounded-2xl border border-edge bg-surface p-6">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-fg">
            Group Standing
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">
                Position
              </div>
              <div className="mt-1 text-2xl font-bold text-fg">{team.rank}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">
                Points
              </div>
              <div className="mt-1 text-2xl font-bold text-fg">{team.points}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">
                Played
              </div>
              <div className="mt-1 text-2xl font-bold text-fg">{team.played}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">
                Goal Diff
              </div>
              <div className="mt-1 text-2xl font-bold text-fg">
                {team.goalDiff > 0 ? `+${team.goalDiff}` : team.goalDiff}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-edge pt-4">
            <div className="text-center">
              <div className="text-xs uppercase tracking-wide text-muted">W</div>
              <div className="mt-1 text-lg font-bold text-fg">{team.won}</div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase tracking-wide text-muted">D</div>
              <div className="mt-1 text-lg font-bold text-fg">{team.drawn}</div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase tracking-wide text-muted">L</div>
              <div className="mt-1 text-lg font-bold text-fg">{team.lost}</div>
            </div>
          </div>
          {form.length > 0 && (
            <div className="mt-4 border-t border-edge pt-4">
              <div className="mb-2 text-xs uppercase tracking-wide text-muted">
                Recent Form
              </div>
              <div className="flex gap-2">
                {form.map((result, i) => (
                  <div
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${formBadgeClass(result)}`}
                  >
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {rosterData && rosterData.roster.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-fg">
              Squad
            </h2>
            <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
              <table className="min-w-full">
                <thead className="border-b border-edge bg-surface2">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Player
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Position
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Age
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rosterData.roster.map((player, idx) => (
                    <tr key={player.id || idx} className="border-t border-edge">
                      <td className="px-4 py-3 tabular-nums text-sm text-muted">
                        {player.jersey || "—"}
                      </td>
                      <td className="px-4 py-3 font-medium text-fg">
                        {player.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">
                        {player.position}
                      </td>
                      <td className="px-4 py-3 tabular-nums text-sm text-muted">
                        {player.age || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-4 text-xl font-bold tracking-tight text-fg">
            Fixtures & Results
          </h2>
          <TeamFixtures teamCode={teamCode} matches={snapshot.matches} />
        </section>
      </div>
    </div>
  );
}
