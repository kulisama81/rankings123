import type { WorldCupH2H } from "@/types";

interface WorldCupH2HProps {
  h2h: WorldCupH2H;
}

export function WorldCupH2HSection({ h2h }: WorldCupH2HProps) {
  if (h2h.source === "none" || h2h.totalMatches === 0) {
    return (
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-fg">Head-to-Head</h2>
        <div className="rounded-2xl border border-edge bg-surface p-6 text-center text-sm text-muted">
          No previous World Cup meetings between {h2h.team1} and {h2h.team2}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-lg font-bold text-fg">Head-to-Head at World Cups</h2>

      {/* Summary Stats */}
      <div className="mb-4 overflow-hidden rounded-2xl border border-edge bg-surface p-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold tabular-nums text-fg">{h2h.totalMatches}</div>
            <div className="text-sm text-muted">Meetings</div>
          </div>
          <div>
            <div className="text-2xl font-bold tabular-nums text-accent">{h2h.wins}</div>
            <div className="text-sm text-muted">{h2h.team1} wins</div>
          </div>
          <div>
            <div className="text-2xl font-bold tabular-nums text-muted">{h2h.draws}</div>
            <div className="text-sm text-muted">Draws</div>
          </div>
          <div>
            <div className="text-2xl font-bold tabular-nums text-accent">{h2h.losses}</div>
            <div className="text-sm text-muted">{h2h.team2} wins</div>
          </div>
        </div>
      </div>

      {/* Recent Meetings */}
      {h2h.matches.length > 0 && (
        <>
          <h3 className="mb-3 text-sm font-semibold text-muted">Recent Meetings</h3>
          <div className="space-y-2">
            {h2h.matches.map((match) => (
              <div
                key={match.id}
                className="flex items-center gap-4 rounded-xl border border-edge bg-surface px-4 py-3"
              >
                <div className="w-16 shrink-0 text-sm font-bold tabular-nums text-muted">
                  {match.year}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted">{match.stage}</div>
                  <div className="font-semibold text-fg">
                    {match.homeTeam} {match.homeScore !== null && match.awayScore !== null ? (
                      <span className="text-accent">
                        {match.homeScore} – {match.awayScore}
                      </span>
                    ) : (
                      <span className="text-muted">v</span>
                    )} {match.awayTeam}
                  </div>
                  {match.venue && <div className="text-xs text-muted">{match.venue}</div>}
                </div>
                <div className="shrink-0">
                  {match.result === "win" && (
                    <span className="rounded-full bg-up/15 px-2 py-0.5 text-xs font-medium text-up">
                      W
                    </span>
                  )}
                  {match.result === "draw" && (
                    <span className="rounded-full bg-muted/15 px-2 py-0.5 text-xs font-medium text-muted">
                      D
                    </span>
                  )}
                  {match.result === "loss" && (
                    <span className="rounded-full bg-down/15 px-2 py-0.5 text-xs font-medium text-down">
                      L
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-3 text-center text-xs text-muted">
        World Cup head-to-head history · Source: ESPN
      </div>
    </section>
  );
}
