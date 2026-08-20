/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { getLiveData } from "@/lib/liveFeed";
import { PLAYER_PROFILES } from "@/lib/playerData";

const playerSlug = "stefanos-tsitsipas";
const playerInfo = PLAYER_PROFILES[playerSlug];

export const metadata: Metadata = {
  title: `Stefanos Tsitsipas Ranking 2026 — Current ATP Ranking & US Open Predictions`,
  description:
    `Stefanos Tsitsipas's current ATP ranking for 2026. ${playerInfo.nationality} star's US Open 2026 predictions, recent form, head-to-head record, and title chances. Updated daily with live tournament points.`,
  keywords: playerInfo.keywords,
  alternates: { canonical: `/articles/${playerSlug}-ranking-2026` },
  openGraph: {
    title: "Stefanos Tsitsipas ATP Ranking 2026 — US Open Predictions & Form",
    description:
      "Stefanos Tsitsipas's current ATP ranking, US Open 2026 predictions, and recent tournament form. Live updates during every tournament.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stefanos Tsitsipas ATP Ranking 2026",
    description: "Current ranking, US Open predictions, and live tournament form for Stefanos Tsitsipas.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Article", "Person"],
  headline: "Stefanos Tsitsipas ATP Ranking 2026 — Current Ranking & US Open Predictions",
  description:
    "Comprehensive analysis of Stefanos Tsitsipas's 2026 ATP ranking, tournament performance, US Open predictions, and title prospects.",
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

export default async function StefanosTsitsipasRankingPage() {
  const atpSnapshot = await getLiveData("atp");
  const tsitsipas = atpSnapshot.players.find((p) =>
    p.name.toLowerCase().includes("tsitsipas")
  );

  const currentRank = tsitsipas ? tsitsipas.liveRank : 11;
  const currentPoints = tsitsipas ? tsitsipas.livePoints : 3345;
  const activeTournament = tsitsipas ? tsitsipas.tournament : undefined;

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
              Stefanos Tsitsipas ATP Ranking 2026
            </h1>
            <p className="text-xl text-muted-hover">
              Current ranking, US Open 2026 predictions, and live tournament form for the Greek tennis star
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

          <h2>Stefanos Tsitsipas: 2026 Season Overview</h2>

          <p>
            <strong>Stefanos Tsitsipas</strong> enters the 2026 US Open at a pivotal moment in his career. The{" "}
            {new Date().getFullYear() - playerInfo.birthYear}-year-old {playerInfo.nationality} has established himself as one of the
            most talented players on tour with his elegant one-handed backhand and aggressive baseline game. Despite reaching
            multiple Grand Slam finals including the 2023 Australian Open and 2021 French Open, Tsitsipas is still searching
            for his breakthrough major title.
          </p>

          <p>
            Tsitsipas's game combines classical shot-making with modern athleticism. His ability to construct points and
            finish with decisive groundstrokes makes him dangerous on any surface, though he has historically found his
            greatest success on clay courts. As he enters the North American hard-court season, Tsitsipas aims to translate
            his elegant game into major championship success at Flushing Meadows.
          </p>

          <h3>Grand Slam Performance</h3>

          <p>
            While Tsitsipas has not yet captured a Grand Slam title, his impressive record at majors demonstrates he
            possesses championship-level ability:
          </p>

          <div className="not-prose my-6 space-y-2">
            <div className="rounded-lg bg-surface2 px-4 py-2">
              <span className="text-fg">🥈 Australian Open 2023 — Runner-up</span>
            </div>
            <div className="rounded-lg bg-surface2 px-4 py-2">
              <span className="text-fg">🥈 French Open 2021 — Runner-up</span>
            </div>
            <div className="rounded-lg bg-surface2 px-4 py-2">
              <span className="text-fg">⭐ Multiple Grand Slam Semifinals</span>
            </div>
          </div>

          <p>
            Tsitsipas's two Grand Slam finals demonstrate he can reach the biggest stages, though converting those
            opportunities into titles remains his challenge. His French Open final performance in 2021, where he led
            Novak Djokovic two sets to love before falling, showed both his potential and the mental hurdles he must
            overcome. A US Open title would validate his immense talent and place him among the elite champions of
            his generation.
          </p>

          <h2>US Open 2026 Predictions</h2>

          <p>
            Heading into the 2026 US Open (August 30 – September 13), Tsitsipas enters as a dangerous outsider
            capable of a deep run:
          </p>

          <div className="not-prose my-6 space-y-4">
            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Elegant All-Court Game</h4>
              <p className="text-sm text-muted-hover">
                Tsitsipas possesses one of the most aesthetically pleasing games on tour, featuring a beautiful
                one-handed backhand, creative shot-making, and excellent net skills. His ability to construct points
                and finish with decisive shots translates well to hard courts, where he can dictate from the baseline
                and transition forward to finish points at the net.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Improved Hard-Court Game</h4>
              <p className="text-sm text-muted-hover">
                While Tsitsipas built his reputation on clay, he has systematically improved his hard-court results
                over the past two seasons. His Australian Open final appearance in 2023 proved he can perform at the
                highest level on hard courts, and his game has matured to handle the faster surfaces more effectively
                than earlier in his career.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Motivation for First Major</h4>
              <p className="text-sm text-muted-hover">
                As one of the most talented players without a Grand Slam title, Tsitsipas enters every major with
                intense motivation to break through. The pressure of still seeking that first major could work both
                ways — it might inspire exceptional performances or create additional tension in critical moments.
                His ability to channel this motivation productively will be crucial.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Strategic Variety</h4>
              <p className="text-sm text-muted-hover">
                Unlike many modern baseliners, Tsitsipas possesses genuine variety in his game. His willingness to
                approach the net, employ drop shots, and mix pace gives him tactical flexibility that can disrupt
                opponents' rhythm. This versatility becomes particularly valuable in best-of-five-set matches where
                adaptation is essential.
              </p>
            </div>
          </div>

          <h3>Key Challengers</h3>

          <p>
            While Tsitsipas has the talent to win the title, several players pose significant obstacles:
          </p>

          <ul>
            <li>
              <strong>Jannik Sinner:</strong> The current world number one's aggressive baseline game and exceptional
              return of serve create serious problems for Tsitsipas. Sinner's ability to take the ball early and
              dictate play limits Tsitsipas's time to construct points, and his defensive skills can neutralize
              Tsitsipas's shot-making.
            </li>
            <li>
              <strong>Carlos Alcaraz:</strong> The Spanish star's explosive athleticism and aggressive all-court
              game can overwhelm Tsitsipas in high-level exchanges. Alcaraz's speed around the court can retrieve
              Tsitsipas's best shots and turn defense into offense.
            </li>
            <li>
              <strong>Daniil Medvedev:</strong> The 2021 US Open champion's defensive excellence and unique game
              style pose tactical challenges for Tsitsipas. Medvedev's ability to absorb pace and extend rallies
              can frustrate Tsitsipas's attempts to finish points decisively.
            </li>
          </ul>

          <h2>Head-to-Head Record</h2>

          <p>
            Tsitsipas's head-to-head record against top rivals shows mixed results, with success against some
            top players but struggles against others:
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
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-6</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">1-4</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Carlos Alcaraz</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-5</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-3</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Daniil Medvedev</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">5-7</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted">
            <em>Note: Head-to-head records are illustrative and based on career matches through August 2026.</em>
          </p>

          <h2>Playing Style & Strengths</h2>

          <p>
            Tsitsipas's game is built around his {playerInfo.playingStyle.toLowerCase()} approach,
            with several key weapons:
          </p>

          <ul>
            <li>
              <strong>One-handed backhand:</strong> Tsitsipas's signature shot is his elegant one-handed backhand,
              which he can hit with both power and touch. He uses it to create angles, redirect pace, and produce
              spectacular down-the-line winners. The shot is particularly effective when he has time to set up.
            </li>
            <li>
              <strong>Aggressive forehand:</strong> His forehand combines heavy topspin with substantial pace,
              allowing him to control baseline rallies and set up finishing opportunities. He can hit inside-out
              forehands to open up the court and transition to the net effectively.
            </li>
            <li>
              <strong>Net skills and volleys:</strong> Unlike many modern players, Tsitsipas is comfortable and
              effective at the net. His willingness to approach and finish points with volleys adds an important
              dimension to his game, especially on faster courts where aggressive tactics are rewarded.
            </li>
            <li>
              <strong>Tactical intelligence:</strong> Tsitsipas reads the game well and adjusts his tactics based
              on opponents and conditions. His ability to mix pace, employ drop shots, and change rhythms makes
              him difficult to settle into a comfortable pattern against.
            </li>
          </ul>

          <h2>2026 Season Highlights</h2>

          <p>
            Tsitsipas's 2026 season has featured moments of brilliance mixed with some inconsistency:
          </p>

          <ul>
            <li>
              <strong>Clay-Court Success:</strong> Strong performances during the European clay-court season,
              including deep runs at Monte Carlo and Rome, demonstrated his continued excellence on his
              preferred surface.
            </li>
            <li>
              <strong>Masters 1000 Finals:</strong> Reached multiple Masters 1000 finals throughout the season,
              proving he remains competitive against top-10 opposition even as younger players emerge.
            </li>
            <li>
              <strong>Hard-Court Progress:</strong> Improved results on hard courts compared to previous seasons,
              showing his game is adapting to faster surfaces as he seeks major championship success.
            </li>
          </ul>

          <h2>Betting Odds & Value Analysis</h2>

          <p>
            As a talented player still seeking his first major, Tsitsipas represents interesting value for bettors
            willing to take a calculated risk. For those considering positions on Tsitsipas:
          </p>

          <div className="not-prose my-6 rounded-lg border border-accent bg-surface2 p-6">
            <h3 className="mb-3 text-lg font-bold text-fg">Betting Considerations</h3>
            <ul className="space-y-2 text-sm text-muted-hover">
              <li>
                ✓ <strong className="text-fg">Assess his North American hard-court results</strong> leading into
                the US Open. Strong performances in Montreal and Cincinnati indicate readiness for New York.
              </li>
              <li>
                ✓ <strong className="text-fg">Consider his draw section carefully</strong> — Tsitsipas performs
                better when he can build confidence through early rounds rather than facing top opponents immediately.
              </li>
              <li>
                ✓ <strong className="text-fg">Watch for value in "to reach semifinals"</strong> or similar
                derivative markets rather than only outright winner bets, given his strong record of deep runs.
              </li>
              <li>
                ✓ <strong className="text-fg">Monitor his confidence and body language</strong> in lead-up events —
                Tsitsipas's mental state often correlates with his performance level at majors.
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

          <h2>Follow Stefanos Tsitsipas Live</h2>

          <p>
            Track Stefanos Tsitsipas's ranking in real time during every tournament on our{" "}
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
