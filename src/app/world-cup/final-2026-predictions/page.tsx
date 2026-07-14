import type { Metadata } from "next";
import { getWorldCupFinalPreview } from "@/lib/worldCupFinalFeed";
import HeroBanner from "@/components/HeroBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "World Cup 2026 Final Predictions — Match Preview & Analysis",
  description:
    "Expert tactical analysis and predictions for the FIFA World Cup 2026 Final. Complete match preview, team form, key battles, and historical head-to-head stats.",
  keywords: [
    "world cup final predictions",
    "world cup final 2026",
    "fifa world cup final preview",
    "world cup final analysis",
    "world cup final tactical preview",
    "world cup 2026 betting",
  ],
  alternates: { canonical: "/world-cup/final-2026-predictions" },
  openGraph: {
    title: "World Cup 2026 Final — Expert Predictions & Analysis",
    description:
      "Complete tactical preview and predictions for the FIFA World Cup 2026 Final with team analysis and historical stats.",
    url: "/world-cup/final-2026-predictions",
    type: "article",
  },
};

export const revalidate = 300; // ISR: 5 minute cache for live updates during finals week

function formatMatchDate(dateString: string | undefined): string {
  if (!dateString) return "TBD";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export default async function WorldCupFinalPredictionsPage() {
  const preview = await getWorldCupFinalPreview();
  const { finalMatch, semifinals, finalistsConfirmed } = preview;

  // Determine if final has been played
  const finalComplete = finalMatch?.state === "post";

  return (
    <div data-sport="worldcup" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Banner */}
      <HeroBanner
        icon="🏆"
        title="World Cup 2026 Final"
        subtitle="Expert predictions · Tactical analysis · Match preview"
        stats={
          finalistsConfirmed && finalMatch
            ? [
                { label: "Date", value: formatMatchDate(finalMatch.date).split(",")[0] },
                { label: "Venue", value: finalMatch.venue || "TBD" },
                {
                  label: "Status",
                  value: finalComplete ? "Complete" : finalistsConfirmed ? "Confirmed" : "Projected",
                },
              ]
            : [{ label: "Status", value: "Awaiting Semifinals" }]
        }
      />

      {/* Final Matchup */}
      {finalMatch && finalistsConfirmed ? (
        <div className="my-8 rounded-2xl border border-edge bg-surface p-8">
          <div className="mb-6 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-fg-muted">
              {formatMatchDate(finalMatch.date)}
            </p>
            <h2 className="mt-2 text-3xl font-black text-fg">The Final</h2>
          </div>

          <div className="flex items-center justify-between gap-8">
            {/* Home Team */}
            <div className="flex flex-1 flex-col items-center text-center">
              <div className="mb-3 text-7xl">{finalMatch.homeFlag}</div>
              <h3 className="text-2xl font-bold text-fg">{finalMatch.homeName}</h3>
              <p className="mt-1 text-sm text-fg-muted">{finalMatch.homeCode}</p>
              {finalComplete && finalMatch.homeScore !== null && (
                <div className="mt-4 text-4xl font-black text-fg">{finalMatch.homeScore}</div>
              )}
            </div>

            {/* VS */}
            <div className="text-3xl font-black text-fg-muted">VS</div>

            {/* Away Team */}
            <div className="flex flex-1 flex-col items-center text-center">
              <div className="mb-3 text-7xl">{finalMatch.awayFlag}</div>
              <h3 className="text-2xl font-bold text-fg">{finalMatch.awayName}</h3>
              <p className="mt-1 text-sm text-fg-muted">{finalMatch.awayCode}</p>
              {finalComplete && finalMatch.awayScore !== null && (
                <div className="mt-4 text-4xl font-black text-fg">{finalMatch.awayScore}</div>
              )}
            </div>
          </div>

          {finalMatch.venue && (
            <div className="mt-6 text-center">
              <p className="text-sm text-fg-muted">
                <span className="font-medium">Venue:</span> {finalMatch.venue}
              </p>
            </div>
          )}
        </div>
      ) : (
        // Awaiting semifinals result
        <div className="my-8 rounded-2xl border border-edge bg-surface p-8 text-center">
          <div className="mb-4 text-5xl">⏳</div>
          <h2 className="mb-2 text-2xl font-bold text-fg">Finalists To Be Determined</h2>
          <p className="text-fg-muted">
            The World Cup Final matchup will be confirmed after the semifinals conclude.
          </p>
          <Link
            href="/world-cup/knockout"
            className="mt-4 inline-block rounded-lg bg-trophy px-6 py-2 font-bold text-fg transition hover:bg-trophy/90"
          >
            View Knockout Bracket
          </Link>
        </div>
      )}

      {/* Semifinals Summary */}
      {semifinals.length > 0 && (
        <div className="my-8">
          <h2 className="mb-4 text-2xl font-bold text-fg">Path to the Final</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {semifinals.map((match, idx) => {
              const isComplete = match.state === "post";
              return (
                <Link
                  key={match.id}
                  href={`/world-cup/match/${match.id}`}
                  className="rounded-xl border border-edge bg-surface2 p-4 transition hover:border-trophy hover:bg-surface"
                >
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-muted">
                    Semifinal {idx + 1}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{match.homeFlag}</span>
                      <span className="font-bold text-fg">{match.homeName}</span>
                      {isComplete && match.homeScore !== null && (
                        <span className="ml-2 text-xl font-black text-fg">{match.homeScore}</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{match.awayFlag}</span>
                      <span className="font-bold text-fg">{match.awayName}</span>
                      {isComplete && match.awayScore !== null && (
                        <span className="ml-2 text-xl font-black text-fg">{match.awayScore}</span>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-fg-muted">
                    {isComplete ? "Final" : formatMatchDate(match.date)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Tactical Preview - Hidden until we have real team-specific analysis
          CX-first: No generic placeholder content. This section will show actual formations,
          player matchups, and H2H stats once a real tactical analysis source is integrated. */}

      {/* Post-Final Analysis */}
      {finalComplete && finalMatch && (
        <div className="my-8 rounded-2xl border border-edge bg-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-fg">Match Result</h2>
          <div className="text-center">
            <p className="text-lg text-fg-muted">
              The 2026 FIFA World Cup Final has concluded. View the{" "}
              <Link href="/world-cup/knockout" className="font-bold text-trophy hover:underline">
                full knockout bracket
              </Link>{" "}
              for complete tournament results.
            </p>
          </div>
        </div>
      )}

      {/* About & SEO Content */}
      <div className="mt-8 rounded-xl border border-edge bg-surface2 p-6">
        <h3 className="mb-2 text-lg font-bold text-fg">About World Cup Final Predictions</h3>
        <p className="text-sm leading-relaxed text-fg-muted">
          The FIFA World Cup Final is the pinnacle of international football, crowning the world
          champion every four years. The 2026 tournament, co-hosted across North America, features
          an expanded 48-team format leading to this ultimate showdown. Our predictions and
          analysis combine tactical insights, tournament form, and historical performance to
          provide comprehensive coverage of the most important match in football.
        </p>
      </div>
    </div>
  );
}
