import type { Metadata } from "next";
import { fetchWorldCupMatchDetail } from "@/lib/worldCupMatchFeed";
import { getWorldCupH2H } from "@/lib/worldCupH2H";
import { notFound } from "next/navigation";
import Link from "next/link";
import { venueToSlug } from "@/lib/worldCupVenue";
import { WorldCupH2HSection } from "@/components/WorldCupH2H";
import { WorldCupMatchStats } from "@/components/WorldCupMatchStats";

interface MatchPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const match = await fetchWorldCupMatchDetail(id);
    const title = `${match.homeName} vs ${match.awayName} — World Cup 2026`;
    const description = `${match.homeName} ${match.homeScore ?? 0} - ${match.awayScore ?? 0} ${match.awayName}: live stats, possession, shots, lineups, timeline, and venue details.`;

    return {
      title,
      description,
      alternates: { canonical: `/world-cup/match/${id}` },
      openGraph: {
        title: `${title} — Rankings123`,
        description,
        url: `/world-cup/match/${id}`,
        type: "article",
      },
    };
  } catch {
    return {
      title: "Match Not Found — Rankings123",
    };
  }
}

export const revalidate = 60; // ISR: 1 minute cache

export default async function MatchDetailPage({ params }: MatchPageProps) {
  const { id } = await params;

  let match;
  try {
    match = await fetchWorldCupMatchDetail(id);
  } catch {
    notFound();
  }

  const showScore = match.homeScore !== null && match.awayScore !== null;

  // Fetch head-to-head data for this matchup
  const h2h = await getWorldCupH2H(match.homeName, match.awayName);

  return (
    <div data-sport="worldcup" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/world-cup"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg"
      >
        ← Back to World Cup
      </Link>

      {/* Match Header */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-edge bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-muted">{match.status}</span>
          {match.source === "mock" && (
            <span className="rounded-full bg-down/15 px-2 py-0.5 text-xs font-medium text-down">
              Demo data
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex-1 text-right">
            <div className="mb-2 text-2xl font-bold text-fg">{match.homeName}</div>
          </div>

          <div className="text-center">
            {showScore ? (
              <div className="text-4xl font-bold tabular-nums text-fg">
                {match.homeScore} – {match.awayScore}
              </div>
            ) : (
              <div className="text-2xl font-semibold text-muted">v</div>
            )}
          </div>

          <div className="flex-1">
            <div className="mb-2 text-2xl font-bold text-fg">{match.awayName}</div>
          </div>
        </div>

        <div className="mt-6 space-y-1 border-t border-edge pt-4 text-center text-sm">
          {match.venue ? (
            <Link
              href={`/world-cup/venue/${venueToSlug(match.venue)}`}
              className="text-muted hover:text-fg transition-colors"
            >
              {match.venue}
            </Link>
          ) : (
            <div className="text-muted">Venue TBD</div>
          )}
          {match.city && <div className="text-muted">{match.city}</div>}
          {match.attendance && <div className="text-muted">Attendance: {match.attendance.toLocaleString()}</div>}
        </div>
      </div>

      {/* Head-to-Head */}
      <WorldCupH2HSection h2h={h2h} />

      {/* Key Events / Timeline */}
      {match.keyEvents.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-fg">Match Timeline</h2>
          <div className="space-y-2">
            {match.keyEvents.map((event, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-xl border border-edge bg-surface px-4 py-3"
              >
                <div className="w-14 shrink-0 text-sm font-bold tabular-nums text-accent">
                  {event.clock}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-fg">
                    {event.type}
                    {event.isRedCard && " 🟥"}
                    {event.isYellowCard && !event.isRedCard && " 🟨"}
                    {event.isPenalty && " (Penalty)"}
                  </div>
                  <div className="text-sm text-muted">
                    {event.player} ({event.team})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {/* Home Lineup */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-fg">{match.homeName} Lineup</h2>
          {match.homeLineup.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
              <table className="min-w-full text-sm">
                <thead className="border-b border-edge bg-surface2">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-muted">#</th>
                    <th className="px-3 py-2 text-left font-semibold text-muted">Player</th>
                    <th className="px-3 py-2 text-left font-semibold text-muted">Pos</th>
                  </tr>
                </thead>
                <tbody>
                  {match.homeLineup.map((player, idx) => (
                    <tr key={idx} className="border-t border-edge">
                      <td className="px-3 py-2 tabular-nums text-muted">{player.jersey}</td>
                      <td className="px-3 py-2 font-medium text-fg">{player.name}</td>
                      <td className="px-3 py-2 text-muted">{player.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted">Lineup not available</p>
          )}
        </section>

        {/* Away Lineup */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-fg">{match.awayName} Lineup</h2>
          {match.awayLineup.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
              <table className="min-w-full text-sm">
                <thead className="border-b border-edge bg-surface2">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-muted">#</th>
                    <th className="px-3 py-2 text-left font-semibold text-muted">Player</th>
                    <th className="px-3 py-2 text-left font-semibold text-muted">Pos</th>
                  </tr>
                </thead>
                <tbody>
                  {match.awayLineup.map((player, idx) => (
                    <tr key={idx} className="border-t border-edge">
                      <td className="px-3 py-2 tabular-nums text-muted">{player.jersey}</td>
                      <td className="px-3 py-2 font-medium text-fg">{player.name}</td>
                      <td className="px-3 py-2 text-muted">{player.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted">Lineup not available</p>
          )}
        </section>
      </div>

      {/* Match Stats - Enhanced with visual comparison bars and categorized sections */}
      <WorldCupMatchStats
        homeStats={match.homeStats}
        awayStats={match.awayStats}
        source={match.source}
      />
    </div>
  );
}
