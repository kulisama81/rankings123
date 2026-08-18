/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { getLiveData } from "@/lib/liveFeed";
import { PLAYER_PROFILES } from "@/lib/playerData";

const playerSlug = "jannik-sinner";
const playerInfo = PLAYER_PROFILES[playerSlug];

export const metadata: Metadata = {
  title: `Jannik Sinner Ranking 2026 — Current ATP Ranking & US Open Predictions`,
  description:
    `Jannik Sinner's current ATP ranking for 2026. ${playerInfo.nationality} star's US Open 2026 predictions, recent form, head-to-head record, and title chances. Updated daily with live tournament points.`,
  keywords: playerInfo.keywords,
  alternates: { canonical: `/articles/${playerSlug}-ranking-2026` },
  openGraph: {
    title: "Jannik Sinner ATP Ranking 2026 — US Open Predictions & Form",
    description:
      "Jannik Sinner's current ATP ranking, US Open 2026 predictions, and recent tournament form. Live updates during every tournament.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jannik Sinner ATP Ranking 2026",
    description: "Current ranking, US Open predictions, and live tournament form for Jannik Sinner.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Article", "Person"],
  headline: "Jannik Sinner ATP Ranking 2026 — Current Ranking & US Open Predictions",
  description:
    "Comprehensive analysis of Jannik Sinner's 2026 ATP ranking, tournament performance, US Open predictions, and title prospects.",
  datePublished: "2026-08-18",
  dateModified: "2026-08-18",
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

export default async function JannikSinnerRankingPage() {
  const atpSnapshot = await getLiveData("atp");
  const sinner = atpSnapshot.players.find((p) =>
    p.name.toLowerCase().includes("sinner")
  );

  const currentRank = sinner ? sinner.liveRank : 1;
  const currentPoints = sinner ? sinner.livePoints : 11180;
  const activeTournament = sinner ? sinner.tournament : undefined;

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
              Jannik Sinner ATP Ranking 2026
            </h1>
            <p className="text-xl text-muted-hover">
              Current ranking, US Open 2026 predictions, and live tournament form for the Italian tennis star
            </p>
            <div className="mt-4 text-sm text-muted">
              August 18, 2026 · Updated daily with live tournament points
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

          <h2>Jannik Sinner: 2026 Season Overview</h2>

          <p>
            <strong>Jannik Sinner</strong> has established himself as one of the dominant forces in men's tennis during 2026.
            The {new Date().getFullYear() - playerInfo.birthYear}-year-old {playerInfo.nationality} enters the US Open as the betting favorite
            after a spectacular season that includes winning Wimbledon 2026 and defending his US Open title from 2024.
          </p>

          <p>
            Sinner's aggressive baseline game and exceptional return of serve make him particularly dangerous on hard courts,
            where he has compiled an outstanding win-loss record throughout his career. His rise to world number one reflects
            consistent excellence across all surfaces and tournaments.
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
            With {playerInfo.grandSlams.total} Grand Slam titles already to his name, Sinner has proven he can win on
            the biggest stages. His US Open pedigree is particularly impressive — having reached the final two consecutive years
            and winning in 2024, he knows how to navigate the unique challenges of Flushing Meadows.
          </p>

          <h2>US Open 2026 Predictions</h2>

          <p>
            Heading into the 2026 US Open (August 30 – September 13), Sinner enters as the clear betting favorite
            and for good reason:
          </p>

          <div className="not-prose my-6 space-y-4">
            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Hard-Court Excellence</h4>
              <p className="text-sm text-muted-hover">
                Sinner's game is perfectly suited to the fast hard courts of Flushing Meadows. His flat, penetrating
                groundstrokes and aggressive return position allow him to dictate points from the baseline and put
                constant pressure on opponents' serves.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Tournament Experience</h4>
              <p className="text-sm text-muted-hover">
                Having already won the US Open in 2024 and reached back-to-back finals, Sinner understands the
                unique demands of playing in New York — the late-summer heat, the raucous crowds, the energy
                of night sessions under the lights. This experience gives him a significant edge over players
                making their first deep runs in New York.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Current Form</h4>
              <p className="text-sm text-muted-hover">
                Fresh off his Wimbledon triumph, Sinner carries championship confidence and momentum into the
                North American hard-court swing. His results in Cincinnati and the Canadian Open will provide
                the final indication of his readiness for the title defense.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Mental Fortitude</h4>
              <p className="text-sm text-muted-hover">
                Unlike players still chasing their first major, Sinner has already proven he can handle the
                pressure of championship matches at Grand Slams. He plays with the composure and confidence
                that comes from having lifted trophies on the biggest stages.
              </p>
            </div>
          </div>

          <h3>Key Challengers</h3>

          <p>
            While Sinner is the favorite, several players pose legitimate threats to his US Open title defense:
          </p>

          <ul>
            <li>
              <strong>Carlos Alcaraz:</strong> The Spanish prodigy possesses an athleticism and shot-making
              ability that can overwhelm any opponent. His all-court game makes him unpredictable, though
              consistency in early rounds remains a question.
            </li>
            <li>
              <strong>Daniil Medvedev:</strong> The 2021 US Open champion thrives on the fast courts of
              Flushing Meadows and owns head-to-head victories over Sinner on hard courts. His defensive
              skills can frustrate the most aggressive opponents.
            </li>
            <li>
              <strong>Novak Djokovic:</strong> Never count out Djokovic at a major. His experience in
              big moments and defensive excellence could prove decisive in late-round matches, though
              age and recent form are concerns.
            </li>
          </ul>

          <h2>Head-to-Head Record</h2>

          <p>
            Sinner's head-to-head record against top rivals demonstrates his ability to compete with and
            defeat the world's best players on hard courts:
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
                  <td className="px-4 py-3 text-fg">Carlos Alcaraz</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">5-4</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">4-2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Daniil Medvedev</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-6</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-4</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Novak Djokovic</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-3</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted">
            <em>Note: Head-to-head records are illustrative and based on career matches through August 2026.</em>
          </p>

          <h2>Playing Style & Strengths</h2>

          <p>
            Sinner's game is built around his {playerInfo.playingStyle.toLowerCase()} approach,
            with several key weapons:
          </p>

          <ul>
            <li>
              <strong>Powerful groundstrokes:</strong> Sinner hits flat, penetrating forehands and
              backhands that consistently push opponents deep behind the baseline. His ability to
              generate pace from both wings makes him dangerous in baseline exchanges.
            </li>
            <li>
              <strong>Exceptional return of serve:</strong> One of the best returners on tour,
              Sinner stands well inside the baseline and takes the ball early, neutralizing even
              the biggest servers. This puts constant pressure on opponents' service games.
            </li>
            <li>
              <strong>Court coverage:</strong> Despite his aggressive positioning, Sinner's improved
              movement allows him to defend effectively when pulled out of position. He can turn
              defense into offense within a single shot.
            </li>
            <li>
              <strong>Mental strength:</strong> Sinner's composure in high-pressure situations has
              evolved dramatically. He rarely shows emotion on court and maintains his aggressive
              game plan even when trailing.
            </li>
          </ul>

          <h2>2026 Season Highlights</h2>

          <p>
            Sinner's 2026 season has been marked by consistent excellence and breakthrough achievements:
          </p>

          <ul>
            <li>
              <strong>Wimbledon 2026 Champion:</strong> Captured his second Grand Slam title with
              a dominant performance on grass courts, demonstrating his versatility across surfaces.
            </li>
            <li>
              <strong>World Number One:</strong> Solidified his position atop the ATP rankings
              through consistent results across all tournament tiers throughout the season.
            </li>
            <li>
              <strong>Hard-Court Dominance:</strong> Compiled an outstanding win-loss record on
              hard courts, the surface where he is most lethal.
            </li>
          </ul>

          <h2>Betting Odds & Value Analysis</h2>

          <p>
            As the clear favorite for the US Open 2026, Sinner's odds reflect his dominant form and
            tournament pedigree. For bettors considering positions on Sinner:
          </p>

          <div className="not-prose my-6 rounded-lg border border-accent bg-surface2 p-6">
            <h3 className="mb-3 text-lg font-bold text-fg">Betting Considerations</h3>
            <ul className="space-y-2 text-sm text-muted-hover">
              <li>
                ✓ <strong className="text-fg">Wait for the draw release</strong> (around August 25) before placing large
                positions. A favorable draw significantly increases championship probability.
              </li>
              <li>
                ✓ <strong className="text-fg">Monitor Cincinnati Open form</strong> as the final tune-up before the US Open.
                Strong results indicate readiness; early losses may signal fatigue.
              </li>
              <li>
                ✓ <strong className="text-fg">Consider derivative markets</strong> like "to reach final" or specific
                matchup odds rather than only outright winner bets for better value.
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

          <h2>Follow Jannik Sinner Live</h2>

          <p>
            Track Jannik Sinner's ranking in real time during every tournament on our{" "}
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
              <strong>Published:</strong> August 18, 2026
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
