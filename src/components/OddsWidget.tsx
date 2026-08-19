"use client";

import type { TennisMatchOdds } from "@/lib/tennisOdds";

interface OddsWidgetProps {
  matches: TennisMatchOdds[];
  title?: string;
  showBookmakers?: boolean; // If true, show bookmaker comparison table
  affiliateLinksEnabled?: boolean; // Only show links if affiliate integration is live
}

/**
 * Tennis odds widget powered by The Odds API.
 * Displays match odds with optional bookmaker comparison.
 * Gracefully hides if no odds data available (CX-first: never shows mock/placeholder odds).
 */
export default function OddsWidget({
  matches,
  title = "Match Odds",
  showBookmakers = false,
  affiliateLinksEnabled = false,
}: OddsWidgetProps) {
  // CX-first: hide widget if no real odds data
  if (matches.length === 0) {
    return null;
  }

  return (
    <div className="not-prose my-8 overflow-hidden rounded-lg border border-edge bg-surface2">
      {/* Header */}
      <div className="border-b border-edge bg-surface px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-fg">{title}</h3>
          <div className="text-xs text-muted">
            Odds from{" "}
            <span className="font-medium text-muted-hover">The Odds API</span>
          </div>
        </div>
      </div>

      {/* Matches */}
      <div className="divide-y divide-edge">
        {matches.map((match, idx) => (
          <div key={idx} className="p-4">
            {/* Match header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm text-muted">
                {new Date(match.lastUpdate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>

            {/* Player odds (main display - averaged across bookmakers) */}
            <div className="grid grid-cols-2 gap-4">
              {/* Player 1 */}
              <div className="flex flex-col items-center rounded-lg bg-surface p-3">
                <div className="mb-2 text-center text-sm font-medium text-fg">
                  {match.player1}
                </div>
                <div className="mb-1 text-2xl font-bold text-accent">
                  {match.player1Odds.toFixed(2)}
                </div>
                <div className="text-xs text-muted">
                  {match.player1Probability}% implied
                </div>
              </div>

              {/* Player 2 */}
              <div className="flex flex-col items-center rounded-lg bg-surface p-3">
                <div className="mb-2 text-center text-sm font-medium text-fg">
                  {match.player2}
                </div>
                <div className="mb-1 text-2xl font-bold text-accent">
                  {match.player2Odds.toFixed(2)}
                </div>
                <div className="text-xs text-muted">
                  {match.player2Probability}% implied
                </div>
              </div>
            </div>

            {/* Bookmaker comparison (optional) */}
            {showBookmakers && match.bookmakers.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                  Bookmaker Comparison
                </div>
                <div className="overflow-hidden rounded-lg border border-edge">
                  <table className="w-full text-sm">
                    <thead className="bg-surface">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-muted">
                          Bookmaker
                        </th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-muted">
                          {match.player1.split(" ").pop()}
                        </th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-muted">
                          {match.player2.split(" ").pop()}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-edge bg-surface2">
                      {match.bookmakers.slice(0, 5).map((bookmaker, bidx) => {
                        // Bookmaker site mapping (will be replaced with affiliate links once partner IDs obtained)
                        const bookmakerSites: Record<string, string> = {
                          bet365: "https://www.bet365.com",
                          fanduel: "https://www.fanduel.com",
                          draftkings: "https://www.draftkings.com",
                          betmgm: "https://www.betmgm.com",
                          caesars: "https://www.caesars.com/sportsbook",
                          pointsbet: "https://www.pointsbet.com",
                        };

                        const bookmakerUrl =
                          bookmakerSites[bookmaker.key] ||
                          `https://www.google.com/search?q=${encodeURIComponent(bookmaker.name)}`;

                        const row = (
                          <>
                            <td className="px-3 py-2 font-medium text-fg">
                              {bookmaker.name}
                            </td>
                            <td className="px-3 py-2 text-right tabular-nums text-muted-hover">
                              {bookmaker.player1Odds.toFixed(2)}
                            </td>
                            <td className="px-3 py-2 text-right tabular-nums text-muted-hover">
                              {bookmaker.player2Odds.toFixed(2)}
                            </td>
                          </>
                        );

                        // If affiliate links enabled, make rows clickable
                        if (affiliateLinksEnabled) {
                          return (
                            <tr
                              key={bidx}
                              className="cursor-pointer hover:bg-surface/50 transition-colors"
                              onClick={() => window.open(bookmakerUrl, "_blank")}
                            >
                              {row}
                            </tr>
                          );
                        }

                        return <tr key={bidx}>{row}</tr>;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer with source attribution */}
      <div className="border-t border-edge bg-surface px-4 py-2 text-xs text-muted">
        <p>
          Odds courtesy of{" "}
          <a
            href="https://the-odds-api.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            The Odds API
          </a>
          . Updated every 6 hours. For informational purposes only.
        </p>
      </div>
    </div>
  );
}
