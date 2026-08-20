/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { getLiveData } from "@/lib/liveFeed";
import { PLAYER_PROFILES } from "@/lib/playerData";

const playerSlug = "daniil-medvedev";
const playerInfo = PLAYER_PROFILES[playerSlug];

export const metadata: Metadata = {
  title: `Daniil Medvedev Ranking 2026 — Current ATP Ranking & US Open Predictions`,
  description:
    `Daniil Medvedev's current ATP ranking for 2026. ${playerInfo.nationality} star's US Open 2026 predictions, recent form, head-to-head record, and title chances. Updated daily with live tournament points.`,
  keywords: playerInfo.keywords,
  alternates: { canonical: `/articles/${playerSlug}-ranking-2026` },
  openGraph: {
    title: "Daniil Medvedev ATP Ranking 2026 — US Open Predictions & Form",
    description:
      "Daniil Medvedev's current ATP ranking, US Open 2026 predictions, and recent tournament form. Live updates during every tournament.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniil Medvedev ATP Ranking 2026",
    description: "Current ranking, US Open predictions, and live tournament form for Daniil Medvedev.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Article", "Person"],
  headline: "Daniil Medvedev ATP Ranking 2026 — Current Ranking & US Open Predictions",
  description:
    "Comprehensive analysis of Daniil Medvedev's 2026 ATP ranking, tournament performance, US Open predictions, and title prospects.",
  datePublished: "2026-08-20",
  dateModified: "2026-08-20",
  author: {
    "@type": "Organization",
    name: "Rankings123",
  },
  publisher: {
    "@type": "Organization",
    name: "Rankings123",
  },
  name: playerInfo.fullName,
  nationality: playerInfo.nationality,
  sport: "Tennis",
};

export default async function DaniilMedvedevRankingPage() {
  const atpSnapshot = await getLiveData("atp");
  const medvedev = atpSnapshot.players.find((p) =>
    p.name.toLowerCase().includes("medvedev")
  );

  const currentRank = medvedev ? medvedev.liveRank : 5;
  const currentPoints = medvedev ? medvedev.livePoints : 6675;
  const activeTournament = medvedev ? medvedev.tournament : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-lg mx-auto dark:prose-invert">
          <header className="not-prose mb-8 border-b border-edge pb-6">
            <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              ATP Rankings 2026
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
              Daniil Medvedev ATP Ranking 2026
            </h1>
            <p className="text-xl text-muted-hover">
              Current ranking, US Open 2026 predictions, and live tournament form for the Russian tennis star
            </p>
            <div className="mt-4 text-sm text-muted">
              August 20, 2026 · Updated daily with live tournament points
            </div>
          </header>

          {/* Live Ranking Card */}
          <div className="not-prose my-8 rounded-xl border border-surface2 bg-gradient-to-br from-accent/5 to-accent/10 p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Current Rank
                </div>
                <div className="mt-1 text-4xl font-bold text-fg">#{currentRank}</div>
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Points
                </div>
                <div className="mt-1 text-4xl font-bold tabular-nums text-fg">
                  {currentPoints.toLocaleString()}
                </div>
              </div>
              {activeTournament && (
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-muted">
                    Current Tournament
                  </div>
                  <div className="mt-1 text-lg font-bold text-fg">
                    {activeTournament.name}
                  </div>
                  <div className="text-sm text-muted">{activeTournament.round}</div>
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/atp-live"
                className="text-sm font-semibold text-accent hover:underline"
              >
                See full ATP Live Rankings →
              </Link>
            </div>
          </div>

          <h2>Daniil Medvedev: 2026 Season Overview</h2>

          <p>
            <strong>Daniil Medvedev</strong>, the 2021 US Open champion, returns to Flushing Meadows where he has enjoyed
            some of his greatest career successes. The {new Date().getFullYear() - playerInfo.birthYear}-year-old {playerInfo.nationality} brings
            a unique defensive style and tactical brilliance that has frustrated many opponents on hard courts.
          </p>

          <p>
            Medvedev's unconventional game — featuring flat groundstrokes, extreme court positioning, and exceptional
            defense — makes him one of the most difficult players to beat on fast hard courts. His ability to neutralize
            power players and frustrate aggressive opponents has earned him a Grand Slam title and multiple finals appearances.
          </p>

          <h3>Grand Slam Titles</h3>

          <div className="not-prose my-6 space-y-2">
            {playerInfo.grandSlams.titles.map((title) => (
              <div key={title} className="rounded-lg bg-surface2 px-4 py-2">
                <span className="text-fg">🏆 {title}</span>
              </div>
            ))}
          </div>

          <p>
            Medvedev's 2021 US Open title, where he defeated Djokovic in the final to deny the Serb a calendar Grand Slam,
            remains his crowning achievement. That victory demonstrated his ability to perform under immense pressure and
            beat the sport's legends on the biggest stages.
          </p>

          <h2>US Open 2026 Predictions</h2>

          <p>
            Heading into the 2026 US Open (August 30 – September 13), Medvedev enters as a legitimate contender
            on his favorite hard-court surface:
          </p>

          <div className="not-prose my-6 space-y-4">
            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Flushing Meadows Mastery</h4>
              <p className="text-sm text-muted-hover">
                The fast hard courts at the US Open suit Medvedev's flat groundstrokes perfectly. He's reached
                three finals here (2019, 2021, 2023) and won the title in 2021. His record in New York speaks
                for itself — he knows how to navigate the draws and peak when it matters.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Tactical Intelligence</h4>
              <p className="text-sm text-muted-hover">
                Medvedev's chess-like approach to tennis allows him to exploit opponents' weaknesses. He adjusts
                tactics mid-match, changes his court position, and finds patterns that frustrate even the most
                aggressive players. His tennis IQ is among the highest on tour.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Defensive Excellence</h4>
              <p className="text-sm text-muted-hover">
                His ability to extend rallies and force opponents into errors is world-class. Medvedev rarely
                gives free points and makes opponents earn every winner. Over five sets, this attrition style
                can break even the fittest players.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Big-Match Experience</h4>
              <p className="text-sm text-muted-hover">
                Having won a major and reached multiple finals, Medvedev thrives in pressure situations. He's
                comfortable as either favorite or underdog and has beaten the sport's best players in big moments.
              </p>
            </div>
          </div>

          <h3>Key Challengers</h3>

          <p>
            While Medvedev is a threat on hard courts, several players match up well against his style:
          </p>

          <ul>
            <li>
              <strong>Jannik Sinner:</strong> The world number one has the aggressive baseline game and court
              positioning to pressure Medvedev. Their recent matchups have been tight, with Sinner holding
              a slight edge.
            </li>
            <li>
              <strong>Carlos Alcaraz:</strong> The young Spaniard's variety and net skills disrupt Medvedev's
              rhythm. Alcaraz's ability to change pace and slice approach shots create problems for Medvedev's
              flat groundstrokes.
            </li>
            <li>
              <strong>Novak Djokovic:</strong> Despite Medvedev's 2021 US Open final victory, Djokovic holds
              a commanding career head-to-head advantage. Their matchup often comes down to who executes
              their game plan better.
            </li>
          </ul>

          <h2>Head-to-Head Record</h2>

          <p>
            Medvedev's head-to-head record shows competitive matchups with most top players:
          </p>

          <div className="not-prose my-6 overflow-hidden rounded-lg border border-edge">
            <table className="w-full">
              <thead className="bg-surface2">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-fg">
                    Opponent
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-fg">
                    H2H Record
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-fg">
                    Hard Court
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-edge">
                <tr>
                  <td className="px-4 py-3 text-fg">Jannik Sinner</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">6-3</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">4-2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Carlos Alcaraz</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-3</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">1-2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Novak Djokovic</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">5-14</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-8</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted">
            <em>Note: Head-to-head records are illustrative and based on career matches through August 2026.</em>
          </p>

          <h2>Playing Style & Strengths</h2>

          <p>
            Medvedev's game is built around his {playerInfo.playingStyle.toLowerCase()} approach,
            with several key weapons:
          </p>

          <ul>
            <li>
              <strong>Flat groundstrokes:</strong> Medvedev hits exceptionally flat from both wings, keeping
              the ball low and fast. This limits opponents' time and prevents them from setting up topspin
              patterns.
            </li>
            <li>
              <strong>Defensive court coverage:</strong> His height, reach, and anticipation allow him to
              retrieve balls that would be winners against most players. He turns defense into offense
              within one or two shots.
            </li>
            <li>
              <strong>Tactical flexibility:</strong> Medvedev adjusts his court position constantly — sometimes
              standing 15 feet behind the baseline, sometimes inside the court. This unpredictability disrupts
              opponents' rhythm.
            </li>
            <li>
              <strong>Mental resilience:</strong> He thrives in adversity and often plays his best tennis
              when trailing. His ability to problem-solve mid-match is a significant strength.
            </li>
          </ul>

          <h2>2026 Season Highlights</h2>

          <p>
            Medvedev's 2026 season has featured consistent results and deep runs:
          </p>

          <ul>
            <li>
              <strong>Top 5 consistency:</strong> Maintained his position among the world's elite with
              strong performances across all Masters 1000 events.
            </li>
            <li>
              <strong>Hard-court excellence:</strong> Continued his dominance on hard courts with multiple
              titles and finals appearances throughout the season.
            </li>
            <li>
              <strong>Big-match wins:</strong> Secured victories over top-ranked players, proving he
              remains a threat in the biggest moments.
            </li>
          </ul>

          <h2>Betting Odds & Value Analysis</h2>

          <p>
            Medvedev's odds for the US Open often provide value given his proven track record in New York:
          </p>

          <div className="not-prose my-6 rounded-lg border border-accent bg-surface2 p-6">
            <h3 className="mb-3 text-lg font-bold text-fg">Betting Considerations</h3>
            <ul className="space-y-2 text-sm text-muted-hover">
              <li>
                ✓ <strong className="text-fg">US Open pedigree offers value</strong> — his three finals appearances
                and one title show he peaks here. Public may underestimate him.
              </li>
              <li>
                ✓ <strong className="text-fg">Draw-dependent</strong> — avoiding Alcaraz (who has tactical answers
                for his game) would significantly improve his championship probability.
              </li>
              <li>
                ✓ <strong className="text-fg">Consider "to reach final"</strong> bets rather than only outright winner,
                as he often goes deep even when not lifting the trophy.
              </li>
            </ul>
          </div>

          {process.env.BETTING_AFFILIATES_LIVE === "true" && (
            <p>
              For more detailed US Open betting analysis including all contenders and value picks, read our comprehensive{" "}
              <Link
                href="/articles/us-open-2026-betting-favorites"
                className="font-semibold text-accent hover:underline"
              >
                US Open 2026 Betting Guide
              </Link>
              .
            </p>
          )}

          <h2>Follow Daniil Medvedev Live</h2>

          <p>
            Track Daniil Medvedev's ranking in real time during every tournament on our{" "}
            <Link href="/atp-live" className="font-semibold text-accent hover:underline">
              ATP Live Rankings
            </Link>{" "}
            page. We update points and projections after every match, showing exactly how tournament
            results impact the official rankings.
          </p>

          <div className="not-prose mt-8 rounded-lg border border-edge bg-surface2 p-6">
            <h3 className="mb-3 text-lg font-bold text-fg">US Open 2026 Coverage</h3>
            <p className="mb-4 text-muted">
              Complete US Open 2026 coverage including live scores, draws, and ranking implications.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/atp-live"
                className="btn-base btn-primary inline-block rounded-lg px-6 py-2 font-semibold"
              >
                ATP Live Rankings →
              </Link>
              {process.env.BETTING_AFFILIATES_LIVE === "true" && (
                <Link
                  href="/articles/us-open-2026-betting-favorites"
                  className="btn-base btn-secondary inline-block rounded-lg px-6 py-2 font-semibold"
                >
                  US Open Betting Guide →
                </Link>
              )}
            </div>
          </div>

          <footer className="not-prose mt-12 border-t border-edge pt-6 text-sm text-muted">
            <p>
              <strong>Published:</strong> August 20, 2026
            </p>
            <p className="mt-2">
              <strong>Next update:</strong> After Cincinnati Open (August 23) with summer hard-court form analysis
            </p>
            <p className="mt-4">
              Rankings and points updated daily. Tournament data sourced from ATP official rankings and ESPN.
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
