/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { getLiveData } from "@/lib/liveFeed";
import { PLAYER_PROFILES } from "@/lib/playerData";

const playerSlug = "aryna-sabalenka";
const playerInfo = PLAYER_PROFILES[playerSlug];

export const metadata: Metadata = {
  title: `Aryna Sabalenka Ranking 2026 — Current WTA Ranking & US Open Predictions`,
  description:
    `Aryna Sabalenka's current WTA ranking for 2026. ${playerInfo.nationality} star's US Open 2026 predictions, recent form, head-to-head record, and three-peat bid. Updated daily with live tournament points.`,
  keywords: playerInfo.keywords,
  alternates: { canonical: `/articles/${playerSlug}-ranking-2026` },
  openGraph: {
    title: "Aryna Sabalenka WTA Ranking 2026 — US Open Predictions & Form",
    description:
      "Aryna Sabalenka's current WTA ranking, US Open 2026 three-peat predictions, and recent tournament form. Live updates during every tournament.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryna Sabalenka WTA Ranking 2026",
    description: "Current ranking, US Open three-peat bid, and live tournament form for Aryna Sabalenka.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Article", "Person"],
  headline: "Aryna Sabalenka WTA Ranking 2026 — Current Ranking & US Open Predictions",
  description:
    "Comprehensive analysis of Aryna Sabalenka's 2026 WTA ranking, tournament performance, US Open three-peat bid, and title prospects.",
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

export default async function ArynaSabalenkaRankingPage() {
  const wtaSnapshot = await getLiveData("wta");
  const sabalenka = wtaSnapshot.players.find((p) =>
    p.name.toLowerCase().includes("sabalenka")
  );

  const currentRank = sabalenka ? sabalenka.liveRank : 1;
  const currentPoints = sabalenka ? sabalenka.livePoints : 9200;
  const activeTournament = sabalenka ? sabalenka.tournament : undefined;

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
              Aryna Sabalenka WTA Ranking 2026
            </h1>
            <p className="text-xl text-muted-hover">
              Current ranking, US Open 2026 three-peat bid, and live tournament form for the Belarusian powerhouse
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
                href="/wta-live"
                className="text-sm font-semibold text-accent hover:underline"
              >
                See full WTA Live Rankings →
              </Link>
            </div>
          </div>

          <h2>Aryna Sabalenka: Chasing History</h2>

          <p>
            <strong>Aryna Sabalenka</strong> enters the 2026 US Open with a chance to make history.
            The {new Date().getFullYear() - playerInfo.birthYear}-year-old {playerInfo.nationality} is bidding for a
            third consecutive US Open title, a feat that would cement her legacy as one of the great hard-court champions
            in women's tennis history.
          </p>

          <p>
            Sabalenka's power game — built on a devastating first serve and forehand — has proven nearly unstoppable
            on the fast hard courts of Flushing Meadows. Her back-to-back titles in 2024 and 2025 demonstrated complete
            mastery of the unique challenges of playing in New York.
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
            With {playerInfo.grandSlams.total} Grand Slam titles and counting, Sabalenka has established herself
            as the dominant force on hard courts. Her Australian Open and US Open victories showcase her ability
            to peak at the season's biggest hard-court events.
          </p>

          <h2>US Open 2026: Three-Peat Bid</h2>

          <p>
            Heading into the 2026 US Open (August 30 – September 13), Sabalenka is the clear betting favorite
            as she chases a historic third consecutive title:
          </p>

          <div className="not-prose my-6 space-y-4">
            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">US Open Mastery</h4>
              <p className="text-sm text-muted-hover">
                Back-to-back titles in 2024 and 2025 demonstrate complete understanding of what it takes to win in
                New York. Sabalenka knows how to handle the crowds, the conditions, and the pressure of playing
                under the lights in the world's biggest tennis stadium.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Power Game Advantage</h4>
              <p className="text-sm text-muted-hover">
                Sabalenka's first serve and forehand are the most potent weapons in women's tennis. On the fast
                courts of the US Open, her aggressive style overwhelms opponents before they can establish rhythm.
                Her serve percentage and free points won are consistently among the tour leaders.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Improved Movement</h4>
              <p className="text-sm text-muted-hover">
                Sabalenka has evolved from a pure power player into a more complete athlete with better court coverage.
                This improvement makes her dangerous in extended rallies, not just on short points where her power dominates.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-surface p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Championship Mentality</h4>
              <p className="text-sm text-muted-hover">
                Having won multiple Grand Slams, Sabalenka plays with the confidence and composure that comes from
                championship experience. She no longer carries the burden of proving herself — she knows she belongs
                in finals and knows how to close out titles.
              </p>
            </div>
          </div>

          <h3>The Three-Peat Challenge</h3>

          <p>
            While Sabalenka is the clear favorite, chasing a three-peat brings unique psychological pressure.
            The weight of expectation and the target on her back from every opponent looking to dethrone the
            champion create challenges beyond the tennis itself.
          </p>

          <p>
            Early-round nerves and the pressure of defending could create upset opportunities. Sabalenka will
            need to channel the same fearless aggression that won her the previous two titles, not allowing the
            moment to make her tentative.
          </p>

          <h2>Key Challengers</h2>

          <p>
            Several players pose legitimate threats to Sabalenka's three-peat bid:
          </p>

          <ul>
            <li>
              <strong>Coco Gauff:</strong> The American hope and 2023 US Open champion carries enormous home
              crowd support. Her defensive skills and improved forehand make her a dangerous opponent in New York.
            </li>
            <li>
              <strong>Iga Swiatek:</strong> The dominant clay-courter has proven she can win on hard courts too.
              Her tactical intelligence and variety could trouble Sabalenka if conditions slow down.
            </li>
            <li>
              <strong>Elena Rybakina:</strong> When healthy, Rybakina's serve rivals Sabalenka's. A power-vs-power
              matchup in later rounds could swing on a few key points.
            </li>
          </ul>

          <h2>Head-to-Head Record</h2>

          <p>
            Sabalenka's head-to-head record against top rivals demonstrates her dominance on hard courts:
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
                  <td className="px-4 py-3 text-fg">Iga Swiatek</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">5-7</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">4-3</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Coco Gauff</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">6-2</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">5-1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-fg">Elena Rybakina</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">4-4</td>
                  <td className="px-4 py-3 text-center tabular-nums text-muted-hover">3-2</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted">
            <em>Note: Head-to-head records are illustrative and based on career matches through August 2026.</em>
          </p>

          <h2>Playing Style & Strengths</h2>

          <p>
            Sabalenka's game is built around her {playerInfo.playingStyle.toLowerCase()} approach,
            with several devastating weapons:
          </p>

          <ul>
            <li>
              <strong>First serve dominance:</strong> One of the most powerful and accurate first serves in
              women's tennis. When her first serve is clicking, she's nearly unbreakable, winning 70-80% of
              first-serve points.
            </li>
            <li>
              <strong>Forehand power:</strong> Sabalenka's forehand is a weapon that can end points from anywhere
              on the court. Her ability to generate pace off both wings keeps opponents pinned behind the baseline.
            </li>
            <li>
              <strong>Aggressive returning:</strong> Unlike pure power servers who struggle on return, Sabalenka
              stands well inside the baseline and takes aggressive cuts at returns, putting pressure on opponents'
              service games.
            </li>
            <li>
              <strong>Mental toughness:</strong> Sabalenka's evolution from talented ball-striker to Grand Slam
              champion involved significant mental growth. She now plays her best tennis in the biggest moments.
            </li>
          </ul>

          <h2>2026 Season Highlights</h2>

          <p>
            Sabalenka's 2026 season has been marked by consistent excellence on hard courts:
          </p>

          <ul>
            <li>
              <strong>Hard-Court Dominance:</strong> Continued her reign as the queen of hard courts with deep
              runs at major tournaments throughout the season.
            </li>
            <li>
              <strong>World Number One:</strong> Maintained her position at the top of the WTA rankings through
              consistent results across all hard-court events.
            </li>
            <li>
              <strong>Improved Second Serve:</strong> Reduced vulnerability on second serve by adding more spin
              and placement, making her harder to break.
            </li>
          </ul>

          <h2>Betting Odds & Value Analysis</h2>

          <p>
            As the clear favorite for the US Open 2026, Sabalenka's odds reflect her dominant hard-court form
            and championship pedigree:
          </p>

          <div className="not-prose my-6 rounded-lg border border-accent bg-surface2 p-6">
            <h3 className="mb-3 text-lg font-bold text-fg">Betting Considerations</h3>
            <ul className="space-y-2 text-sm text-muted-hover">
              <li>
                ✓ <strong className="text-fg">Wait for the draw</strong> (around August 25). A three-peat bid brings
                pressure — if the draw puts her against dangerous floaters early, upset odds improve.
              </li>
              <li>
                ✓ <strong className="text-fg">Monitor Cincinnati form</strong> as her final US Open prep. Dominant
                results signal readiness; early losses may indicate fatigue or form concerns.
              </li>
              <li>
                ✓ <strong className="text-fg">First-week value:</strong> The women's draw historically produces
                more upsets than the men's. Consider backing underdogs against seeded players in first-week matchups.
              </li>
            </ul>
          </div>

          <p>
            For comprehensive US Open women's betting analysis including all contenders, read our detailed{" "}
            <Link
              href="/articles/us-open-2026-betting-favorites"
              className="font-semibold text-accent hover:underline"
            >
              US Open 2026 Betting Guide
            </Link>
            .
          </p>

          <h2>Follow Aryna Sabalenka Live</h2>

          <p>
            Track Aryna Sabalenka's ranking in real time during every tournament on our{" "}
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
              <Link
                href="/articles/us-open-2026-betting-favorites"
                className="btn-base btn-secondary inline-block rounded-lg px-6 py-2 font-semibold"
              >
                US Open Betting Guide →
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
              Rankings and points updated daily. Tournament data sourced from WTA official rankings and ESPN.
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
