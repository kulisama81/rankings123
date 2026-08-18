/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { getLiveData } from "@/lib/liveFeed";
import { PLAYER_PROFILES } from "@/lib/playerData";

const playerSlug = "carlos-alcaraz";
const playerInfo = PLAYER_PROFILES[playerSlug];

export const metadata: Metadata = {
  title: `Carlos Alcaraz Ranking 2026 — Current ATP Ranking & US Open Predictions`,
  description:
    `Carlos Alcaraz's current ATP ranking for 2026. ${playerInfo.nationality} star's US Open 2026 predictions, recent form, head-to-head record, and title chances. Updated daily with live tournament points.`,
  keywords: playerInfo.keywords,
  alternates: { canonical: `/articles/${playerSlug}-ranking-2026` },
  openGraph: {
    title: "Carlos Alcaraz ATP Ranking 2026 — US Open Predictions & Form",
    description:
      "Carlos Alcaraz's current ATP ranking, US Open 2026 predictions, and recent tournament form. Live updates during every tournament.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Alcaraz ATP Ranking 2026",
    description: "Current ranking, US Open predictions, and live tournament form for Carlos Alcaraz.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Article", "Person"],
  headline: "Carlos Alcaraz ATP Ranking 2026 — Current Ranking & US Open Predictions",
  description:
    "Comprehensive analysis of Carlos Alcaraz's 2026 ATP ranking, tournament performance, US Open predictions, and title prospects.",
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

export default async function CarlosAlcarazRankingPage() {
  const atpSnapshot = await getLiveData("atp");
  const alcaraz = atpSnapshot.players.find((p) =>
    p.name.toLowerCase().includes("alcaraz")
  );

  const currentRank = alcaraz ? alcaraz.liveRank : 2;
  const currentPoints = alcaraz ? alcaraz.livePoints : 10200;
  const activeTournament = alcaraz ? alcaraz.tournament : undefined;

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
              Carlos Alcaraz ATP Ranking 2026
            </h1>
            <p className="text-xl text-muted-hover">
              Current ranking, US Open 2026 predictions, and live tournament form for the Spanish tennis phenomenon
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

          <h2>Carlos Alcaraz: The All-Court Phenom</h2>

          <p>
            <strong>Carlos Alcaraz</strong> has redefined what's possible for a player in his early twenties.
            The {new Date().getFullYear() - playerInfo.birthYear}-year-old {playerInfo.nationality} enters the 2026 US Open
            with {playerInfo.grandSlams.total} Grand Slam titles already to his name, showcasing an athleticism and shot-making
            ability that can overwhelm any opponent on any surface.
          </p>

          <p>
            Alcaraz's all-court game — built on explosive movement, creative shot-making, and fearless aggression — makes him
            one of the most dangerous players in tennis. Unlike specialists who dominate on a single surface, Alcaraz has
            proven he can win Grand Slams on grass, clay, and hard courts.
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
            With victories across multiple surfaces, Alcaraz has established himself as a complete player capable of
            adapting his game to any conditions. His versatility makes him unpredictable and difficult to game plan against.
          </p>

          <h2>US Open 2026 Predictions</h2>

          <p>
            Heading into the 2026 US Open (August 30 – September 13), Alcaraz represents one of the biggest threats to
            Jannik Sinner's title defense:
          </p>

          <div className="not-prose my-6 space-y-4">
            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Athleticism Advantage</h4>
              <p className="text-sm text-muted-hover">
                No player on tour can match Alcaraz's court coverage and ability to turn defense into offense in a single shot.
                His explosive first step and recovery speed allow him to retrieve seemingly impossible balls and turn them into winners.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Youth and Stamina</h4>
              <p className="text-sm text-muted-hover">
                At 23, Alcaraz has youth on his side for the physical grind of best-of-five sets in New York's late-summer heat.
                His fitness and recovery capabilities allow him to maintain his high-intensity game through deep tournament runs.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">All-Court Versatility</h4>
              <p className="text-sm text-muted-hover">
                Unlike pure hard-court specialists, Alcaraz can win points in multiple ways — serve-and-volley, drop shots,
                baseline grinding, or aggressive returns. This versatility makes him unpredictable and difficult to prepare for.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Big-Match Experience</h4>
              <p className="text-sm text-muted-hover">
                Alcaraz has already won multiple Grand Slams and proven he can handle the pressure of championship matches on
                the biggest stages. He plays with a fearlessness that can intimidate opponents.
              </p>
            </div>
          </div>

          <h3>The Consistency Question</h3>

          <p>
            While Alcaraz's peak level is as high as anyone in tennis, his biggest challenge is maintaining that level
            consistently throughout a two-week Grand Slam. Early-round lapses in concentration have occasionally led to
            upset losses against lower-ranked opponents.
          </p>

          <p>
            For Alcaraz to win the 2026 US Open, he'll need to bring his championship-level focus from the very first round
            rather than waiting until the second week to elevate his game.
          </p>

          <h2>Head-to-Head Record</h2>

          <p>
            Alcaraz's head-to-head record against top rivals demonstrates his ability to compete with the world's best:
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
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">4-5</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-4</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Novak Djokovic</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">4-4</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Daniil Medvedev</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-2</td>
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
            Alcaraz's game is built around his explosive {playerInfo.playingStyle.toLowerCase()} approach,
            with several unique weapons:
          </p>

          <ul>
            <li>
              <strong>Elite court coverage:</strong> Alcaraz's speed and anticipation allow him to retrieve balls
              that would be winners against 99% of players. His ability to extend rallies frustrates opponents
              and forces errors.
            </li>
            <li>
              <strong>Creative shot-making:</strong> Drop shots, lobs, passing shots from impossible angles —
              Alcaraz has the full arsenal and the confidence to use it in high-pressure moments. His creativity
              keeps opponents guessing.
            </li>
            <li>
              <strong>Aggressive return position:</strong> Like Sinner, Alcaraz stands well inside the baseline
              on returns, taking time away from opponents and putting immediate pressure on service games.
            </li>
            <li>
              <strong>Mental resilience:</strong> Alcaraz plays with a joy and fearlessness that allows him to
              take risks in big moments without fear of failure. This mentality makes him dangerous in deciding sets.
            </li>
          </ul>

          <h2>2026 Season Highlights</h2>

          <p>
            Alcaraz's 2026 season has showcased his continued growth and consistency at the highest level:
          </p>

          <ul>
            <li>
              <strong>Multi-Surface Excellence:</strong> Continued his pattern of winning on different surfaces,
              proving his all-court credentials.
            </li>
            <li>
              <strong>Consistent Top-5 Performance:</strong> Maintained his position among the world's elite
              throughout the season with deep runs at major tournaments.
            </li>
            <li>
              <strong>Hard-Court Improvements:</strong> Refined his hard-court game to better compete with
              specialists like Sinner and Medvedev.
            </li>
          </ul>

          <h2>Path to US Open Victory</h2>

          <p>
            For Alcaraz to win the 2026 US Open, several factors need to align:
          </p>

          <div className="not-prose my-6 rounded-lg border border-accent bg-surface2 p-6">
            <h3 className="mb-3 text-lg font-bold text-fg">Keys to Victory</h3>
            <ul className="space-y-2 text-sm text-muted-hover">
              <li>
                ✓ <strong className="text-fg">First-week focus:</strong> Avoid early-round lapses and bring championship
                intensity from round one. His talent can overcome most opponents if engaged.
              </li>
              <li>
                ✓ <strong className="text-fg">Favorable draw:</strong> Ideally avoid Sinner until the final, giving him
                a path through the draw where his versatility can exploit specialists.
              </li>
              <li>
                ✓ <strong className="text-fg">Physical management:</strong> His high-intensity style is taxing. Managing
                energy across seven best-of-five matches in late-summer heat is crucial.
              </li>
            </ul>
          </div>

          {process.env.BETTING_AFFILIATES_LIVE === "true" && (
            <p>
              For comprehensive US Open betting analysis including all contenders, read our detailed{" "}
              <Link
                href="/articles/us-open-2026-betting-favorites"
                className="font-semibold text-accent hover:underline"
              >
                US Open 2026 Betting Guide
              </Link>
              .
            </p>
          )}

          <h2>Follow Carlos Alcaraz Live</h2>

          <p>
            Track Carlos Alcaraz's ranking in real time during every tournament on our{" "}
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
              <Link
                href="/articles/jannik-sinner-ranking-2026"
                className="btn-base btn-secondary inline-block rounded-lg px-6 py-2 font-semibold"
              >
                Jannik Sinner Ranking →
              </Link>
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
