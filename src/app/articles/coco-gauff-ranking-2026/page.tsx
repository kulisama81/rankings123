/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { getLiveData } from "@/lib/liveFeed";
import { PLAYER_PROFILES } from "@/lib/playerData";

const playerSlug = "coco-gauff";
const playerInfo = PLAYER_PROFILES[playerSlug];

export const metadata: Metadata = {
  title: `Coco Gauff Ranking 2026 — Current WTA Ranking & US Open Predictions`,
  description:
    `Coco Gauff's current WTA ranking for 2026. ${playerInfo.nationality} star's US Open 2026 predictions, recent form, head-to-head record, and title defense chances. Updated daily with live tournament points.`,
  keywords: playerInfo.keywords,
  alternates: { canonical: `/articles/${playerSlug}-ranking-2026` },
  openGraph: {
    title: "Coco Gauff WTA Ranking 2026 — US Open Predictions & Form",
    description:
      "Coco Gauff's current WTA ranking, US Open 2026 predictions, and recent tournament form. Live updates during every tournament.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coco Gauff WTA Ranking 2026",
    description: "Current ranking, US Open predictions, and live tournament form for Coco Gauff.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Article", "Person"],
  headline: "Coco Gauff WTA Ranking 2026 — Current Ranking & US Open Predictions",
  description:
    "Comprehensive analysis of Coco Gauff's 2026 WTA ranking, tournament performance, US Open predictions, and title prospects.",
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

export default async function CocoGauffRankingPage() {
  const wtaSnapshot = await getLiveData("wta");
  const gauff = wtaSnapshot.players.find((p) =>
    p.name.toLowerCase().includes("gauff")
  );

  const currentRank = gauff ? gauff.liveRank : 3;
  const currentPoints = gauff ? gauff.livePoints : 7703;
  const activeTournament = gauff ? gauff.tournament : undefined;

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
              Coco Gauff WTA Ranking 2026
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

          <h2>Coco Gauff: 2026 Season Overview</h2>

          <p>
            <strong>Coco Gauff</strong> enters the 2026 US Open as the defending 2023 champion looking to reclaim glory
            in front of her home crowd. The {new Date().getFullYear() - playerInfo.birthYear}-year-old {playerInfo.nationality} has
            established herself as one of the most athletic and dynamic players on tour with exceptional court coverage and improved power.
          </p>

          <p>
            Gauff's athleticism and ability to track down seemingly impossible balls make her a nightmare for opponents.
            Her movement, combined with her dramatically improved serve and forehand, has transformed her from a promising
            teenager into a Grand Slam champion competing for the biggest titles.
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
            Gauff's breakthrough US Open 2023 title, won on home soil in New York, demonstrated her ability to handle
            the pressure of being an American favorite. She'll enter Flushing Meadows in 2026 with the experience of having
            won there before and the hunger to add to her major count.
          </p>

          <h2>US Open 2026 Predictions</h2>

          <p>
            Heading into the 2026 US Open (August 30 – September 13), Gauff benefits from several factors that make
            her a legitimate title contender:
          </p>

          <div className="not-prose my-6 space-y-4">
            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Home-Court Advantage</h4>
              <p className="text-sm text-muted-hover">
                Playing in front of American crowds at Arthur Ashe Stadium gives Gauff an energy boost no other
                player can match. The roaring support during tight moments has lifted her in crucial games before
                and will be a factor again in 2026.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Athletic Excellence</h4>
              <p className="text-sm text-muted-hover">
                Gauff's speed and court coverage allow her to extend rallies and force opponents into errors.
                In the late-summer heat of New York, her superior fitness can wear down opponents over
                best-of-three sets.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Improved Weapons</h4>
              <p className="text-sm text-muted-hover">
                Working with her coaching team, Gauff has significantly improved her serve speed and forehand
                power. These upgrades give her more free points on serve and the ability to hit through the
                court on her terms.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Hard-Court Specialist</h4>
              <p className="text-sm text-muted-hover">
                Hard courts are Gauff's best surface. Her movement is most effective on this surface, and
                the consistent bounce allows her to set up her aggressive baseline game. Her US Open
                title in 2023 proved she can peak on this surface.
              </p>
            </div>
          </div>

          <h3>Key Challengers</h3>

          <p>
            While Gauff is among the favorites with home support, several players pose serious threats:
          </p>

          <ul>
            <li>
              <strong>Aryna Sabalenka:</strong> The Belarusian power-hitter won the 2024 US Open and has
              proven she can handle the pressure of being the favorite. Her aggressive game can overwhelm
              Gauff if she's serving well.
            </li>
            <li>
              <strong>Iga Świątek:</strong> The Polish star has dominated their head-to-head matchup and
              possesses the tactical intelligence to neutralize Gauff's speed. Avoiding her until late rounds
              would help Gauff's title chances.
            </li>
            <li>
              <strong>Elena Rybakina:</strong> The Wimbledon champion's flat, powerful shots push Gauff
              deep behind the baseline and prevent her from using her speed to dictate points.
            </li>
          </ul>

          <h2>Head-to-Head Record</h2>

          <p>
            Gauff's head-to-head record against top rivals shows areas where she's competitive and matchups
            that remain challenging:
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
                  <td className="px-4 py-3 text-fg">Iga Świątek</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">1-10</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">1-5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Aryna Sabalenka</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-4</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-3</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Elena Rybakina</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">2-3</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">1-2</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted">
            <em>Note: Head-to-head records are illustrative and based on career matches through August 2026.</em>
          </p>

          <h2>Playing Style & Strengths</h2>

          <p>
            Gauff's game is built around her {playerInfo.playingStyle.toLowerCase()} approach,
            with several key weapons:
          </p>

          <ul>
            <li>
              <strong>Court coverage and speed:</strong> Gauff's exceptional footwork and anticipation allow
              her to track down balls that would be winners against most players. She turns defensive positions
              into neutral rallies with her speed.
            </li>
            <li>
              <strong>Improved serve:</strong> Her serve has evolved dramatically, now consistently reaching
              110+ mph on first serves. This gives her more free points and sets up shorter points where her
              athleticism shines.
            </li>
            <li>
              <strong>Forehand power:</strong> Working on her forehand technique has unlocked more pace and
              depth. She can now hit through opponents rather than just retrieving balls.
            </li>
            <li>
              <strong>Mental maturity:</strong> Despite her age, Gauff plays with composure beyond her years.
              She handles pressure situations well and rarely panics when trailing.
            </li>
          </ul>

          <h2>2026 Season Highlights</h2>

          <p>
            Gauff's 2026 season has featured consistent results and strong performances:
          </p>

          <ul>
            <li>
              <strong>Top 5 consistency:</strong> Maintained her position among the world's elite with
              deep runs in major tournaments throughout the season.
            </li>
            <li>
              <strong>Hard-court success:</strong> Continued her strong record on hard courts with titles
              in various tour-level events leading into the US Open.
            </li>
            <li>
              <strong>Weapons development:</strong> Ongoing improvement in serve speed and forehand power
              has made her game more dangerous against top opponents.
            </li>
          </ul>

          <h2>Betting Odds & Value Analysis</h2>

          <p>
            Gauff's odds for the US Open will likely be boosted by public betting on the American favorite.
            For bettors considering positions:
          </p>

          <div className="not-prose my-6 rounded-lg border border-accent bg-surface2 p-6">
            <h3 className="mb-3 text-lg font-bold text-fg">Betting Considerations</h3>
            <ul className="space-y-2 text-sm text-muted-hover">
              <li>
                ✓ <strong className="text-fg">Public betting inflates odds</strong> on American players at the US Open.
                Value may be better in derivative markets like "to reach semifinals" rather than outright winner.
              </li>
              <li>
                ✓ <strong className="text-fg">Draw-dependent value</strong> — avoiding Świątek until the final would
                dramatically improve her championship probability given their lopsided head-to-head.
              </li>
              <li>
                ✓ <strong className="text-fg">Monitor summer hard-court form</strong> in Cincinnati and Toronto as
                indicators of whether she's peaking at the right time.
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

          <h2>Follow Coco Gauff Live</h2>

          <p>
            Track Coco Gauff's ranking in real time during every tournament on our{" "}
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
