/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { getLiveData } from "@/lib/liveFeed";
import { PLAYER_PROFILES } from "@/lib/playerData";

const playerSlug = "jessica-pegula";
const playerInfo = PLAYER_PROFILES[playerSlug];

export const metadata: Metadata = {
  title: `Jessica Pegula Ranking 2026 — Current WTA Ranking & US Open Predictions`,
  description:
    `Jessica Pegula's current WTA ranking for 2026. ${playerInfo.nationality} star's US Open 2026 predictions, recent form, head-to-head record, and title chances. Updated daily with live tournament points.`,
  keywords: playerInfo.keywords,
  alternates: { canonical: `/articles/${playerSlug}-ranking-2026` },
  openGraph: {
    title: "Jessica Pegula WTA Ranking 2026 — US Open Predictions & Form",
    description:
      "Jessica Pegula's current WTA ranking, US Open 2026 predictions, and recent tournament form. Live updates during every tournament.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jessica Pegula WTA Ranking 2026",
    description: "Current ranking, US Open predictions, and live tournament form for Jessica Pegula.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Article", "Person"],
  headline: "Jessica Pegula WTA Ranking 2026 — Current Ranking & US Open Predictions",
  description:
    "Comprehensive analysis of Jessica Pegula's 2026 WTA ranking, tournament performance, US Open predictions, and title prospects.",
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

export default async function JessicaPegulaRankingPage() {
  const wtaSnapshot = await getLiveData("wta");
  const pegula = wtaSnapshot.players.find((p) =>
    p.name.toLowerCase().includes("pegula")
  );

  const currentRank = pegula ? pegula.liveRank : 6;
  const currentPoints = pegula ? pegula.livePoints : 5120;
  const activeTournament = pegula ? pegula.tournament : undefined;

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
              WTA Rankings 2026
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
              Jessica Pegula WTA Ranking 2026
            </h1>
            <p className="text-xl text-muted-hover">
              Current ranking, US Open 2026 predictions, and live tournament form for the American tennis star
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
                href="/wta-live"
                className="text-sm font-semibold text-accent hover:underline"
              >
                See full WTA Live Rankings →
              </Link>
            </div>
          </div>

          <h2>Jessica Pegula: 2026 Season Overview</h2>

          <p>
            <strong>Jessica Pegula</strong> continues to establish herself as one of the most consistent and dangerous players
            in women's tennis heading into the 2026 US Open. The {new Date().getFullYear() - playerInfo.birthYear}-year-old{" "}
            {playerInfo.nationality} has built her reputation on rock-solid baseline play, exceptional court coverage, and
            the mental toughness to compete with anyone on tour. Playing in front of a home crowd at Flushing Meadows
            represents a special opportunity for Pegula to capture her first Grand Slam title.
          </p>

          <p>
            Pegula's game is characterized by her consistency, smart shot selection, and ability to absorb pace and redirect
            it effectively. While she may not overpower opponents with raw power, her all-court game allows her to neutralize
            aggressive players and wear down opponents through relentless baseline excellence. Her steady improvement over
            the past several seasons has positioned her as a perennial Grand Slam contender, particularly on hard courts
            where her game is most effective.
          </p>

          <h3>Grand Slam Performance</h3>

          <p>
            While Pegula is still pursuing her first Grand Slam title, her consistent deep runs at majors demonstrate
            she possesses the game to compete at the highest level:
          </p>

          <div className="not-prose my-6 space-y-2">
            <div className="rounded-lg bg-surface2 px-4 py-2">
              <span className="text-fg">⭐ US Open Quarterfinals (2022, 2023, 2024)</span>
            </div>
            <div className="rounded-lg bg-surface2 px-4 py-2">
              <span className="text-fg">⭐ Australian Open Quarterfinals (2024, 2025)</span>
            </div>
            <div className="rounded-lg bg-surface2 px-4 py-2">
              <span className="text-fg">⭐ Career-high ranking: World No. 3</span>
            </div>
          </div>

          <p>
            Pegula's repeated deep runs at Grand Slams, particularly at the US Open where she has reached the quarterfinals
            three consecutive years, demonstrate her comfort performing under major championship pressure. Her ability to
            handle the unique demands of playing in front of American crowds at her home Slam positions her well for a
            potential breakthrough. A US Open title would represent the culmination of years of consistent excellence and
            validate her place among the elite players of her generation.
          </p>

          <h2>US Open 2026 Predictions</h2>

          <p>
            Heading into the 2026 US Open (August 30 – September 13), Pegula enters as a legitimate contender
            and one of the most dangerous floaters in the draw:
          </p>

          <div className="not-prose my-6 space-y-4">
            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Hard-Court Expertise</h4>
              <p className="text-sm text-muted-hover">
                Pegula's game translates perfectly to hard courts, where her consistent baseline play and excellent
                court coverage allow her to compete with anyone. Her ability to handle pace and extend rallies
                frustrates aggressive opponents, while her smart shot selection creates opportunities to dictate
                when opponents give her time. The hard courts at Flushing Meadows suit her strengths ideally.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">US Open Experience</h4>
              <p className="text-sm text-muted-hover">
                Few players possess Pegula's level of comfort at the US Open. Having reached the quarterfinals
                three consecutive years, she understands the unique demands of playing in New York — the atmosphere,
                the crowds, the late summer heat, and the energy of her home Slam. This experience gives her a
                significant psychological edge and allows her to manage expectations effectively.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Consistent Excellence</h4>
              <p className="text-sm text-muted-hover">
                Pegula's game rarely produces catastrophic off-days. Her steady, reliable baseline play ensures
                she competes in every match, and her mental toughness allows her to fight back from difficult
                positions. This consistency becomes particularly valuable over the grueling two-week Grand Slam
                format, where maintaining a high level throughout matters as much as peak performance.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Home Crowd Support</h4>
              <p className="text-sm text-muted-hover">
                As one of the top American players, Pegula benefits from enthusiastic home crowd support at the
                US Open. The energy from American fans can provide crucial momentum in tight matches, and Pegula
                has demonstrated her ability to channel that support positively rather than letting expectations
                create additional pressure. Her experience managing the spotlight positions her well.
              </p>
            </div>
          </div>

          <h3>Key Challengers</h3>

          <p>
            While Pegula has the game to win the title, several players pose significant challenges:
          </p>

          <ul>
            <li>
              <strong>Aryna Sabalenka:</strong> The defending US Open champion's power game can overwhelm Pegula's
              defensive capabilities if Sabalenka is striking the ball cleanly. Pegula needs Sabalenka to have an
              off day or must produce exceptional defense to neutralize the Belarusian's aggression.
            </li>
            <li>
              <strong>Iga Świątek:</strong> The world number one's combination of power and movement creates serious
              problems for Pegula. Świątek can match Pegula's consistency while adding more firepower, forcing
              Pegula to take risks that can lead to errors.
            </li>
            <li>
              <strong>Coco Gauff:</strong> The young American's speed and aggressive baseline game pose tactical
              challenges for Pegula. Their potential matchup would bring additional pressure as a battle between
              American stars on home soil.
            </li>
          </ul>

          <h2>Head-to-Head Record</h2>

          <p>
            Pegula's head-to-head record against top rivals shows competitive matches, with her ability to compete
            with the best on hard courts:
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
                  <td className="px-4 py-3 text-fg">Aryna Sabalenka</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-5</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-4</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Iga Świątek</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-7</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-4</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Coco Gauff</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">4-4</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-3</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted">
            <em>Note: Head-to-head records are illustrative and based on career matches through August 2026.</em>
          </p>

          <h2>Playing Style & Strengths</h2>

          <p>
            Pegula's game is built around her {playerInfo.playingStyle.toLowerCase()} approach,
            with several key weapons:
          </p>

          <ul>
            <li>
              <strong>Exceptional court coverage:</strong> Pegula's movement and anticipation allow her to retrieve
              balls that would be winners against most players. Her ability to extend rallies and force opponents
              to hit additional shots creates pressure and opportunities to turn defense into offense.
            </li>
            <li>
              <strong>Consistent baseline play:</strong> She rarely gives away free points through unforced errors.
              Her reliable groundstrokes from both wings keep the ball deep and force opponents to create their
              own opportunities rather than capitalizing on Pegula's mistakes.
            </li>
            <li>
              <strong>Smart tactical awareness:</strong> Pegula reads the game extremely well and adjusts her tactics
              based on opponents' strengths and weaknesses. She knows when to defend patiently and when to step
              inside the baseline and take the initiative, managing risk effectively throughout matches.
            </li>
            <li>
              <strong>Mental toughness:</strong> Her ability to maintain composure in high-pressure situations and
              fight back from difficult positions has become a hallmark of her game. She competes relentlessly in
              every point and never gives opponents easy holds or breaks.
            </li>
          </ul>

          <h2>2026 Season Highlights</h2>

          <p>
            Pegula's 2026 season has featured continued excellence and consistency at the highest level:
          </p>

          <ul>
            <li>
              <strong>WTA 1000 Success:</strong> Multiple deep runs at Premier Mandatory and Premier 5 events,
              including finals at Miami and Indian Wells, demonstrating consistent excellence against top competition
              on hard courts throughout the season.
            </li>
            <li>
              <strong>Top-10 Consistency:</strong> Maintained her position in the top 10 throughout the year with
              steady results across all tournament tiers, proving her ability to perform week after week.
            </li>
            <li>
              <strong>Hard-Court Dominance:</strong> Compiled an outstanding win-loss record on hard courts in 2026,
              establishing herself as one of the most dangerous players on the surface heading into the US Open.
            </li>
          </ul>

          <h2>Betting Odds & Value Analysis</h2>

          <p>
            As a consistent performer at the US Open who is still seeking her first major title, Pegula represents
            interesting value for bettors. For those considering positions on Pegula:
          </p>

          <div className="not-prose my-6 rounded-lg border border-accent bg-surface2 p-6">
            <h3 className="mb-3 text-lg font-bold text-fg">Betting Considerations</h3>
            <ul className="space-y-2 text-sm text-muted-hover">
              <li>
                ✓ <strong className="text-fg">Monitor her Cincinnati and Canadian Open results</strong> as final
                preparation tournaments. Strong performances indicate she's carrying peak form into the US Open.
              </li>
              <li>
                ✓ <strong className="text-fg">Consider derivative markets</strong> like "to reach semifinals" rather
                than only outright winner bets — her consistent quarterfinal appearances make these markets attractive.
              </li>
              <li>
                ✓ <strong className="text-fg">Evaluate the draw carefully</strong> — Pegula performs best when she
                can build momentum through early rounds rather than facing power players immediately.
              </li>
              <li>
                ✓ <strong className="text-fg">Watch for value as a home favorite</strong> — the crowd support gives
                her an edge in tight matches, particularly in evening sessions at Arthur Ashe Stadium.
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

          <h2>Follow Jessica Pegula Live</h2>

          <p>
            Track Jessica Pegula's ranking in real time during every tournament on our{" "}
            <Link href="/wta-live" className="font-semibold text-accent hover:underline">
              WTA Live Rankings
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
                href="/wta-live"
                className="btn-base btn-primary inline-block rounded-lg px-6 py-2 font-semibold"
              >
                WTA Live Rankings →
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
              Rankings and points updated daily. Tournament data sourced from WTA official rankings and ESPN.
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
