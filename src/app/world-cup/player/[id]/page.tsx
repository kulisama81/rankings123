import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorldCupStats, getWorldCupData } from "@/lib/worldCupFeed";
import { soccerFlag } from "@/lib/worldCupFlags";
import type { WorldCupPlayerStat } from "@/types";

interface PlayerPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PlayerPageProps): Promise<Metadata> {
  const { id } = await params;
  const stats = await getWorldCupStats();

  const player = [...stats.topScorers, ...stats.topAssisters].find(
    (p) => p.playerId === id
  );

  if (!player) {
    return { title: "Player Not Found" };
  }

  return {
    title: `${player.playerName} — World Cup 2026 Stats | Rankings123`,
    description: `${player.playerName} (${player.teamName}) World Cup 2026 tournament stats: ${player.goals} goals, ${player.assists} assists in ${player.appearances} appearances.`,
    alternates: { canonical: `/world-cup/player/${id}` },
    openGraph: {
      title: `${player.playerName} — World Cup 2026 Stats — Rankings123`,
      description: `${player.playerName} (${player.teamName}) World Cup 2026: ${player.goals} goals, ${player.assists} assists.`,
      url: `/world-cup/player/${id}`,
      type: "website",
    },
  };
}

export const revalidate = 60; // ISR: 1 minute cache

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const stats = await getWorldCupStats();
  const snapshot = await getWorldCupData();

  // Find player in either top scorers or top assisters
  let player: WorldCupPlayerStat | undefined = stats.topScorers.find(
    (p) => p.playerId === id
  );
  if (!player) {
    player = stats.topAssisters.find((p) => p.playerId === id);
  }

  if (!player) {
    notFound();
  }

  const teamFlag = soccerFlag(player.teamCode);

  // Calculate goal contributions
  const goalContributions = (player.goals ?? 0) + (player.assists ?? 0);

  // Find player's team matches for recent form
  const teamMatches = snapshot.matches
    .filter(
      (m) =>
        m.state === "post" &&
        (m.homeCode === player.teamCode || m.awayCode === player.teamCode)
    )
    .slice(0, 5);

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
        <Link href="/world-cup/golden-boot" className="hover:text-fg">
          Golden Boot
        </Link>
        {" / "}
        <span className="text-fg">{player.playerShortName}</span>
      </nav>

      <div className="mb-8 flex items-start gap-4">
        <span className="text-6xl" aria-hidden="true">
          {teamFlag}
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {player.playerName}
          </h1>
          <p className="mt-1 text-lg text-muted">
            <Link
              href={`/world-cup/team/${player.teamCode.toLowerCase()}`}
              className="hover:text-fg"
            >
              {player.teamName}
            </Link>
            {player.jersey && ` · #${player.jersey}`}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Tournament Stats */}
        <section className="rounded-2xl border border-edge bg-surface p-6">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-fg">
            Tournament Statistics
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">
                Goals
              </div>
              <div className="mt-1 text-3xl font-bold text-fg">{player.goals ?? 0}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">
                Assists
              </div>
              <div className="mt-1 text-3xl font-bold text-fg">{player.assists ?? 0}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">
                Appearances
              </div>
              <div className="mt-1 text-3xl font-bold text-fg">
                {player.appearances}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">
                Goal Contrib.
              </div>
              <div className="mt-1 text-3xl font-bold text-fg">
                {goalContributions}
              </div>
            </div>
          </div>

          {player.appearances > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-edge pt-4 sm:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted">
                  Goals per Game
                </div>
                <div className="mt-1 text-lg font-bold text-fg">
                  {((player.goals ?? 0) / player.appearances).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted">
                  Contrib. per Game
                </div>
                <div className="mt-1 text-lg font-bold text-fg">
                  {(goalContributions / player.appearances).toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Team Matches */}
        {teamMatches.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-fg">
              {player.teamName} Recent Matches
            </h2>
            <div className="space-y-3">
              {teamMatches.map((match) => {
                const isHome = match.homeCode === player.teamCode;
                const opponentName = isHome ? match.awayName : match.homeName;
                const opponentFlag = isHome ? match.awayFlag : match.homeFlag;
                const teamScore = isHome ? match.homeScore : match.awayScore;
                const opponentScore = isHome ? match.awayScore : match.homeScore;

                let resultBadge = "";
                let resultClass = "";
                if (teamScore !== null && opponentScore !== null) {
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
                          <div className="text-xs text-muted">{match.statusDetail}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-bold tabular-nums text-fg">
                            {teamScore} - {opponentScore}
                          </div>
                        </div>
                        {resultBadge && (
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full bg-surface2 text-sm font-bold ${resultClass}`}
                          >
                            {resultBadge}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/world-cup/team/${player.teamCode.toLowerCase()}`}
            className="inline-flex items-center gap-2 rounded-lg border border-edge bg-surface px-4 py-2 text-sm font-medium text-fg transition hover:bg-surface2"
          >
            View {player.teamName} squad →
          </Link>
          <Link
            href="/world-cup/golden-boot"
            className="inline-flex items-center gap-2 rounded-lg border border-edge bg-surface px-4 py-2 text-sm font-medium text-fg transition hover:bg-surface2"
          >
            ← Back to Golden Boot
          </Link>
        </div>
      </div>
    </div>
  );
}
