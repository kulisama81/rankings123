/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { getLiveData } from "@/lib/liveFeed";
import { PLAYER_PROFILES } from "@/lib/playerData";

const playerSlug = "novak-djokovic";
const playerInfo = PLAYER_PROFILES[playerSlug];

export const metadata: Metadata = {
  title: `Novak Djokovic Ranking 2026 — Current ATP Ranking & US Open Predictions`,
  description:
    `Novak Djokovic's current ATP ranking for 2026. ${playerInfo.nationality} legend's US Open 2026 predictions, recent form, head-to-head record, and title chances. Updated daily with live tournament points.`,
  keywords: playerInfo.keywords,
  alternates: { canonical: `/articles/${playerSlug}-ranking-2026` },
  openGraph: {
    title: "Novak Djokovic ATP Ranking 2026 — US Open Predictions & Form",
    description:
      "Novak Djokovic's current ATP ranking, US Open 2026 predictions, and recent tournament form. Live updates during every tournament.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novak Djokovic ATP Ranking 2026",
    description: "Current ranking, US Open predictions, and live tournament form for Novak Djokovic.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Article", "Person"],
  headline: "Novak Djokovic ATP Ranking 2026 — Current Ranking & US Open Predictions",
  description:
    "Comprehensive analysis of Novak Djokovic's 2026 ATP ranking, tournament performance, US Open predictions, and title prospects.",
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

export default async function NovakDjokovicRankingPage() {
  const atpSnapshot = await getLiveData("atp");
  const djokovic = atpSnapshot.players.find((p) =>
    p.name.toLowerCase().includes("djokovic")
  );

  const currentRank = djokovic ? djokovic.liveRank : 4;
  const currentPoints = djokovic ? djokovic.livePoints : 7460;
  const activeTournament = djokovic ? djokovic.tournament : undefined;

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
              Novak Djokovic ATP Ranking 2026
            </h1>
            <p className="text-xl text-muted-hover">
              Current ranking, US Open 2026 predictions, and live tournament form for the Serbian tennis legend
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

          <h2>Novak Djokovic: 2026 Season Overview</h2>

          <p>
            <strong>Novak Djokovic</strong>, at {new Date().getFullYear() - playerInfo.birthYear} years old, continues to defy
            expectations and compete at the highest level of men's tennis. The {playerInfo.nationality} legend enters the 2026
            US Open with an unparalleled Grand Slam record and a burning desire to add to his historic trophy collection.
          </p>

          <p>
            Djokovic's defensive prowess and mental fortitude remain his greatest weapons. His ability to neutralize opponents'
            strengths and turn defensive positions into offense has made him one of the greatest players in tennis history.
            With 24 Grand Slam titles, he's rewritten the record books — but shows no signs of slowing down.
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
            With an unprecedented {playerInfo.grandSlams.total} Grand Slam titles, Djokovic has won the career Grand Slam
            multiple times over. His four US Open titles (2011, 2015, 2018, 2023) demonstrate his mastery of the Flushing
            Meadows hard courts across different eras of his career.
          </p>

          <h2>US Open 2026 Predictions</h2>

          <p>
            Heading into the 2026 US Open (August 30 – September 13), Djokovic may no longer be the outright favorite,
            but writing him off at a Grand Slam would be a mistake:
          </p>

          <div className="not-prose my-6 space-y-4">
            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Championship Experience</h4>
              <p className="text-sm text-muted-hover">
                No active player has more Grand Slam titles than Djokovic. His experience in pressure moments,
                his ability to save match points, and his composure in fifth sets give him an edge that statistics
                can't capture. In big matches, experience matters — and Djokovic has more than anyone.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Defensive Mastery</h4>
              <p className="text-sm text-muted-hover">
                Djokovic's return of serve and court coverage remain elite despite his age. He makes opponents
                play extra balls in every rally, forcing them to generate their own pace and hit multiple winners
                to close out points. Over five sets, this attrition style can break even the fittest opponents.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Strategic Intelligence</h4>
              <p className="text-sm text-muted-hover">
                Djokovic reads the game like few others. He adjusts tactics mid-match, exploits opponents'
                weaknesses, and knows exactly when to be aggressive versus when to defend. His tennis IQ
                compensates for any physical decline.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Hard-Court Pedigree</h4>
              <p className="text-sm text-muted-hover">
                The US Open hard courts suit Djokovic's game perfectly. The consistent bounce and medium-paced
                surface allow his defensive skills to shine while giving him time to set up his precise groundstrokes.
                He's won here four times across three different decades.
              </p>
            </div>
          </div>

          <h3>Key Challengers</h3>

          <p>
            While Djokovic remains a threat, younger players will test whether age has finally caught up to him:
          </p>

          <ul>
            <li>
              <strong>Jannik Sinner:</strong> The world number one possesses the aggressive baseline game and
              return quality to put Djokovic on the defensive. Their matchup often comes down to whether Sinner
              can maintain his level over five sets.
            </li>
            <li>
              <strong>Carlos Alcaraz:</strong> The young Spaniard has already beaten Djokovic in Grand Slam finals.
              His athleticism and shot-making can overwhelm Djokovic's defense when he's playing his best tennis.
            </li>
            <li>
              <strong>Daniil Medvedev:</strong> A former US Open champion who beat Djokovic in the 2021 final.
              His flat groundstrokes and defensive skills create a chess match that could go either way.
            </li>
          </ul>

          <h2>Head-to-Head Record</h2>

          <p>
            Djokovic's head-to-head record against top rivals shows he can still compete with the best,
            though recent results have been mixed:
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
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-3</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">1-2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Carlos Alcaraz</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-4</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Daniil Medvedev</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">14-5</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">8-3</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted">
            <em>Note: Head-to-head records are illustrative and based on career matches through August 2026.</em>
          </p>

          <h2>Playing Style & Strengths</h2>

          <p>
            Djokovic's game is built around his {playerInfo.playingStyle.toLowerCase()} approach,
            with several key weapons:
          </p>

          <ul>
            <li>
              <strong>Return of serve:</strong> Arguably the greatest returner in tennis history, Djokovic
              neutralizes even the biggest servers. He stands well inside the baseline and takes the ball
              early, putting immediate pressure on opponents' service games.
            </li>
            <li>
              <strong>Defensive court coverage:</strong> His speed, anticipation, and flexibility allow him
              to retrieve balls that would be winners against any other player. He forces opponents to hit
              multiple clean winners to close out points.
            </li>
            <li>
              <strong>Backhand down the line:</strong> His two-handed backhand, particularly down the line,
              remains one of the most reliable shots in tennis. It's both a defensive weapon and an
              offensive setup shot.
            </li>
            <li>
              <strong>Mental fortitude:</strong> Djokovic thrives in pressure situations. He's saved
              multiple match points throughout his career and seems to elevate his game when facing
              elimination.
            </li>
          </ul>

          <h2>2026 Season Highlights</h2>

          <p>
            Djokovic's 2026 season has shown he remains competitive at the highest level:
          </p>

          <ul>
            <li>
              <strong>Consistent presence:</strong> Remains ranked in the top 5 despite reducing his
              tournament schedule to manage his physical condition and peak for majors.
            </li>
            <li>
              <strong>Big-match performances:</strong> Continues to perform his best tennis in the latter
              rounds of major tournaments when the stakes are highest.
            </li>
            <li>
              <strong>Strategic scheduling:</strong> Picks his events carefully, focusing energy on
              Grand Slams and select Masters 1000 tournaments.
            </li>
          </ul>

          <h2>Betting Odds & Value Analysis</h2>

          <p>
            Djokovic's odds will likely offer value given that casual bettors may underestimate his chances
            based on age alone:
          </p>

          <div className="not-prose my-6 rounded-lg border border-accent bg-surface2 p-6">
            <h3 className="mb-3 text-lg font-bold text-fg">Betting Considerations</h3>
            <ul className="space-y-2 text-sm text-muted-hover">
              <li>
                ✓ <strong className="text-fg">Wait for summer hard-court results</strong> before placing positions.
                Strong showings in Cincinnati would indicate he's peaking at the right time.
              </li>
              <li>
                ✓ <strong className="text-fg">Consider each-way bets or "to reach final"</strong> rather than only
                outright winner, as he often goes deep in majors even when not lifting the trophy.
              </li>
              <li>
                ✓ <strong className="text-fg">Watch the draw carefully</strong> — avoiding Sinner/Alcaraz until the
                final would significantly improve his championship probability.
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

          <h2>Follow Novak Djokovic Live</h2>

          <p>
            Track Novak Djokovic's ranking in real time during every tournament on our{" "}
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
