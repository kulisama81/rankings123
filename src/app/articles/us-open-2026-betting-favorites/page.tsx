import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "US Open 2026 Betting Favorites: Sinner, Sabalenka Lead Odds | Rankings123",
  description:
    "Expert analysis of US Open 2026 betting favorites. Jannik Sinner and Aryna Sabalenka lead odds after dominant hard-court seasons. Complete betting guide with value picks, form analysis, and title paths for men's and women's draws.",
  keywords: [
    "us open 2026 predictions",
    "us open betting favorites",
    "us open 2026 odds",
    "jannik sinner us open",
    "aryna sabalenka us open",
    "us open betting guide",
    "tennis betting predictions",
    "us open 2026 picks",
  ],
  openGraph: {
    title: "US Open 2026 Betting Favorites: Sinner, Sabalenka Lead Odds",
    description:
      "Expert betting analysis for US Open 2026. Sinner and Sabalenka favorites after dominant hard-court form. Value picks and title paths.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "US Open 2026 Betting Favorites: Sinner, Sabalenka Lead Odds",
    description:
      "Expert US Open 2026 betting analysis. Sinner and Sabalenka lead odds. Value picks and predictions inside.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "US Open 2026 Betting Favorites: Sinner, Sabalenka Lead Odds",
  description:
    "Expert analysis of US Open 2026 betting favorites including Jannik Sinner, Aryna Sabalenka, Carlos Alcaraz, and Coco Gauff with form analysis and value picks.",
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
};

export default function UsOpen2026BettingFavoritesPage() {
  // CX-first gate: hide betting content until affiliate links are integrated
  if (process.env.BETTING_AFFILIATES_LIVE !== "true") {
    notFound();
  }

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
              US Open 2026 Betting Preview
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
              US Open 2026 Betting Favorites: Sinner and Sabalenka Lead the
              Field
            </h1>
            <p className="text-xl text-muted-hover">
              Expert analysis of the betting favorites for the year&apos;s
              final Grand Slam, with form breakdowns, value picks, and title
              paths for both draws.
            </p>
            <div className="mt-4 text-sm text-muted">
              August 20, 2026 · Updated with Cincinnati Open results
            </div>
          </header>

          <p className="lead">
            <strong>NEW YORK</strong> — The 2026 US Open is set to begin on
            August 30 at Flushing Meadows, and the betting markets have
            crystallized around two dominant hard-court performers:{" "}
            <strong>Jannik Sinner</strong> on the men&apos;s side and{" "}
            <strong>Aryna Sabalenka</strong> on the women&apos;s. Both enter
            the tournament as heavy favorites after career-defining seasons on
            hard courts.
          </p>

          <p>
            With three weeks until the tournament begins, we break down the
            betting landscape, analyze the top contenders, identify value
            opportunities, and examine what it will take to lift the trophy in
            New York.
          </p>

          <div className="not-prose my-8 rounded-lg border border-edge bg-surface2 p-6">
            <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
              Tournament Window
            </div>
            <div className="text-2xl font-bold text-fg">
              August 30 – September 13, 2026
            </div>
            <div className="mt-2 text-sm text-muted">
              Main draw · USTA Billie Jean King National Tennis Center
            </div>
          </div>

          <h2>Men&apos;s Draw: Sinner&apos;s Championship to Lose</h2>

          <h3>Jannik Sinner — The Favorite</h3>

          <p>
            Jannik Sinner enters the US Open as the clear betting favorite
            after a dominant 2026 season that has seen him win Wimbledon and
            establish himself as the most consistent player on tour. The
            22-year-old Italian has reached the last two US Open finals,
            winning the title in 2024, and his hard-court credentials are
            impeccable.
          </p>

          <p>
            <strong>Why Sinner is the favorite:</strong>
          </p>

          <ul>
            <li>
              <strong>US Open pedigree:</strong> Two consecutive finals
              appearances with one title demonstrates he knows how to navigate
              the unique demands of New York&apos;s hard courts and atmosphere.
            </li>
            <li>
              <strong>Hard-court mastery:</strong> Sinner&apos;s aggressive
              baseline game and exceptional return of serve are perfectly
              suited to the fast conditions at Flushing Meadows.
            </li>
            <li>
              <strong>Current form:</strong> Fresh off a Wimbledon
              championship, Sinner carries momentum and confidence into the
              North American hard-court swing.
            </li>
            <li>
              <strong>Mental fortitude:</strong> Having already won a US Open
              title, Sinner doesn&apos;t face the psychological burden of
              chasing a maiden Slam in New York.
            </li>
          </ul>

          <p>
            <strong>The concern:</strong> Physical fatigue. Sinner has played a
            grueling schedule in 2026, and the transition from grass at
            Wimbledon to hard courts in the summer heat could test his stamina
            in late-round matches.
          </p>

          <h3>Carlos Alcaraz — The Youth Edge</h3>

          <p>
            Carlos Alcaraz represents the biggest threat to Sinner&apos;s
            coronation. The 23-year-old Spaniard already owns multiple Grand
            Slam titles and possesses an athleticism and shot-making ability
            that can overwhelm any opponent on any surface.
          </p>

          <p>
            <strong>Alcaraz&apos;s path to the title:</strong>
          </p>

          <ul>
            <li>
              <strong>Athleticism advantage:</strong> No player on tour can
              match Alcaraz&apos;s court coverage and ability to turn defense
              into offense in a single shot.
            </li>
            <li>
              <strong>Age and recovery:</strong> At 23, Alcaraz has youth on
              his side for the physical grind of best-of-five sets in New
              York&apos;s late-summer heat.
            </li>
            <li>
              <strong>All-court game:</strong> Unlike pure hard-court
              specialists, Alcaraz&apos;s versatility means he can win points
              in multiple ways, making him unpredictable and difficult to game
              plan against.
            </li>
            <li>
              <strong>Big-match experience:</strong> Alcaraz has already won
              multiple Slams and has proven he can handle the pressure of
              championship matches on the biggest stages.
            </li>
          </ul>

          <p>
            <strong>The concern:</strong> Consistency. While Alcaraz&apos;s
            peak is higher than almost anyone, he can have uncharacteristic
            lapses in concentration that lead to losses against lower-ranked
            opponents in early rounds.
          </p>

          <h3>Dark Horses: Medvedev, Zverev, and Djokovic</h3>

          <p>
            Beyond the top two favorites, several players possess the game and
            experience to make deep runs:
          </p>

          <div className="not-prose my-6 space-y-4">
            <div className="rounded-lg bg-surface2 p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">
                Daniil Medvedev
              </h4>
              <p className="text-sm text-muted-hover">
                The 2021 US Open champion thrives on the fast courts of
                Flushing Meadows. His defensive skills and unorthodox style
                have proven capable of frustrating favorites, and he owns
                victories over both Sinner and Alcaraz on hard courts. The
                question is whether his 30-year-old body can sustain seven
                best-of-five matches.
              </p>
            </div>

            <div className="rounded-lg bg-surface2 p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">
                Alexander Zverev
              </h4>
              <p className="text-sm text-muted-hover">
                Zverev&apos;s powerful serve and baseline consistency make him
                a threat in any draw. He&apos;s reached US Open finals before
                and his big-server profile suits New York. However, his
                five-set record and Grand Slam title drought raise questions
                about his ability to close out the biggest matches.
              </p>
            </div>

            <div className="rounded-lg bg-surface2 p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">
                Novak Djokovic
              </h4>
              <p className="text-sm text-muted-hover">
                Never count out Djokovic at a major. The 39-year-old owns
                multiple US Open titles and his experience in big moments
                remains unmatched. Age and recent form are concerns, but
                Djokovic has made a career of defying expectations and his
                defensive skills could frustrate younger, more aggressive
                opponents.
              </p>
            </div>
          </div>

          <h3>Men&apos;s Betting Value Analysis</h3>

          <p>
            For those looking for betting value beyond simply backing the
            favorite, consider these angles:
          </p>

          <ul>
            <li>
              <strong>Draw-dependent plays:</strong> Wait for the draw release
              (expected around August 25) to identify players landing in easier
              quarters. A favorable draw can dramatically increase
              championship odds for players ranked 5-15.
            </li>
            <li>
              <strong>Head-to-head matchups:</strong> Medvedev&apos;s
              historical success against Sinner makes him a live underdog in a
              potential semifinal matchup.
            </li>
            <li>
              <strong>Early-round upsets:</strong> Both Sinner and Alcaraz can
              be vulnerable in first-week matches if they haven&apos;t fully
              adjusted to conditions. Consider first-round and second-round
              upset opportunities against heavy favorites.
            </li>
          </ul>

          <h2>Women&apos;s Draw: Sabalenka&apos;s Three-Peat Bid</h2>

          <h3>Aryna Sabalenka — Dominant and Determined</h3>

          <p>
            Aryna Sabalenka is chasing history: a third consecutive US Open
            title would cement her legacy as one of the great hard-court
            champions. The 28-year-old Belarusian has been the most dominant
            player on hard courts over the past three years, and her power game
            is perfectly suited to New York.
          </p>

          <p>
            <strong>Why Sabalenka is the clear favorite:</strong>
          </p>

          <ul>
            <li>
              <strong>US Open dominance:</strong> Back-to-back titles in 2024
              and 2025 demonstrate complete mastery of Flushing Meadows. She
              knows what it takes to win in New York and has the mental edge
              that comes with championship pedigree.
            </li>
            <li>
              <strong>Power game advantage:</strong> Sabalenka&apos;s first
              serve and forehand are the most potent weapons in women&apos;s
              tennis. On the fast courts of the US Open, her aggressive style
              overwhelms opponents.
            </li>
            <li>
              <strong>Improved movement:</strong> Sabalenka has evolved from a
              pure power player to a more complete athlete with better court
              coverage, making her dangerous in extended rallies as well.
            </li>
            <li>
              <strong>Championship mentality:</strong> Having won multiple
              Grand Slams, Sabalenka plays with the confidence and composure of
              a champion. She no longer carries the burden of proving herself.
            </li>
          </ul>

          <p>
            <strong>The concern:</strong> Expectation pressure. Chasing a
            three-peat brings its own psychological weight, and early-round
            nerves could create upset opportunities.
          </p>

          <h3>Coco Gauff — The American Hope</h3>

          <p>
            Coco Gauff carries the hopes of the home crowd and has the game to
            capitalize. The 22-year-old American has already won the US Open
            (2023) and has continued to evolve into a more complete player with
            an improved forehand and more aggressive mindset.
          </p>

          <p>
            <strong>Gauff&apos;s title path:</strong>
          </p>

          <ul>
            <li>
              <strong>Home crowd advantage:</strong> Playing in New York as the
              American favorite brings enormous energy and support. In tight
              matches, crowd momentum can shift outcomes.
            </li>
            <li>
              <strong>Defensive excellence:</strong> Gauff&apos;s speed and
              court coverage allow her to extend points and force opponents
              into errors. On the slower US Open courts (compared to other hard
              courts), her defense becomes even more valuable.
            </li>
            <li>
              <strong>Improved offense:</strong> Gauff&apos;s forehand has
              evolved from a liability to a weapon, and she&apos;s now capable
              of dictating points rather than just defending.
            </li>
            <li>
              <strong>Youth and stamina:</strong> At 22, Gauff has the physical
              resilience to handle the grueling best-of-three sets across two
              weeks in late summer heat.
            </li>
          </ul>

          <p>
            <strong>The concern:</strong> Consistency against top-10 opponents.
            While Gauff can beat anyone on a given day, she still shows
            vulnerability against the elite power players like Sabalenka.
          </p>

          <h3>Dark Horses: Swiatek, Rybakina, and Keys</h3>

          <p>Several players possess championship potential if the draw breaks right:</p>

          <div className="not-prose my-6 space-y-4">
            <div className="rounded-lg bg-surface2 p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Iga Swiatek</h4>
              <p className="text-sm text-muted-hover">
                The dominant clay-court player has proven she can win on hard
                courts too. Her variety and tactical intelligence make her
                dangerous in any draw, though hard courts remain her weakest
                surface relative to clay. Recent improvements to her serve
                could be the difference in tight matches.
              </p>
            </div>

            <div className="rounded-lg bg-surface2 p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">
                Elena Rybakina
              </h4>
              <p className="text-sm text-muted-hover">
                The 2022 Wimbledon champion possesses one of the biggest serves
                in women&apos;s tennis. On the faster US Open courts, her serve
                can carry her deep into the second week. Health and consistency
                remain questions, but when healthy, Rybakina can challenge
                anyone.
              </p>
            </div>

            <div className="rounded-lg bg-surface2 p-4">
              <h4 className="mb-2 text-lg font-bold text-fg">Madison Keys</h4>
              <p className="text-sm text-muted-hover">
                Keys&apos; power game rivals Sabalenka&apos;s, and as an
                American playing at home, she carries extra motivation. She
                reached the 2017 US Open final and has the weapons to beat
                anyone in a single match. Consistency across seven matches
                remains the question.
              </p>
            </div>
          </div>

          <h3>Women&apos;s Betting Value Analysis</h3>

          <p>Value opportunities in the women&apos;s draw:</p>

          <ul>
            <li>
              <strong>First-week volatility:</strong> The women&apos;s draw
              historically produces more upsets than the men&apos;s. Consider
              backing lower-ranked players with favorable first-round matchups
              against seeded players.
            </li>
            <li>
              <strong>Gauff home advantage:</strong> The American crowd factor
              is real. In close matches, Gauff gets an intangible boost that
              may not be fully priced into her odds.
            </li>
            <li>
              <strong>Quarter-final value:</strong> Rather than backing
              long-shot title winners, consider wagering on players to reach
              the quarterfinals or semifinals where a favorable draw can
              provide value.
            </li>
          </ul>

          <h2>Historical Trends: What History Tells Us</h2>

          <p>
            Several historical patterns inform smart US Open betting
            strategies:
          </p>

          <h3>Hard-Court Specialists vs. All-Court Players</h3>

          <p>
            Over the past two decades, the US Open has increasingly favored
            hard-court specialists over clay-court or grass-court specialists.
            Players like Djokovic, Federer, and Sampras (all comfortable on
            hard courts) dominated the tournament, while pure clay-courters
            like Nadal won fewer titles in New York than at other Slams.
          </p>

          <p>
            <strong>2026 implication:</strong> This trend favors Sinner
            (hard-court specialist) over Alcaraz (all-court player), and
            Sabalenka (hard-court dominant) over Swiatek (clay-court dominant).
          </p>

          <h3>Recent Grand Slam Form</h3>

          <p>
            Players who reach the final of a major in the same calendar year
            typically perform well at the US Open. Sinner&apos;s Wimbledon
            title and Sabalenka&apos;s Australian Open victory (if she won in
            2026) signal championship form coming into New York.
          </p>

          <h3>Age and Experience</h3>

          <p>
            The US Open rewards experience more than youth compared to other
            Slams. The late-summer heat, night sessions, and New York crowds
            create unique challenges that favor players who have navigated them
            before. First-time finalists face a significant psychological
            hurdle.
          </p>

          <p>
            <strong>2026 implication:</strong> Both Sinner and Sabalenka have
            US Open final experience, giving them an edge over first-time
            finalists.
          </p>

          <h2>Draw Analysis: Paths to the Title</h2>

          <p>
            The tournament draw will be released approximately one week before
            the start (around August 25, 2026). Once released, betting value
            can shift dramatically based on draw positioning. Key factors to
            analyze:
          </p>

          <ul>
            <li>
              <strong>Quarter placement:</strong> Ideally, favorites want to
              avoid each other until the semifinals. A top-heavy quarter (two
              favorites meeting in the quarters) creates value on players in
              weaker quarters.
            </li>
            <li>
              <strong>First-week danger:</strong> Tricky first- and
              second-round opponents can derail favorites before they find
              rhythm. Look for favorites with gentle early draws.
            </li>
            <li>
              <strong>Floaters (unseeded players):</strong> Dangerous unseeded
              players returning from injury or young talents on the rise can
              create massive upset potential when they land near top seeds.
            </li>
            <li>
              <strong>Top-half vs. bottom-half:</strong> One half of the draw
              is often significantly stronger than the other. Identify the
              weaker half and consider players who land there.
            </li>
          </ul>

          <div className="not-prose my-8 rounded-lg border border-accent bg-surface2 p-6">
            <h3 className="mb-3 text-lg font-bold text-fg">
              When Draws Are Released
            </h3>
            <p className="mb-4 text-muted-hover">
              Tournament draws are typically released one week before the main
              draw begins. For the 2026 US Open, expect the draw around{" "}
              <strong className="text-fg">August 25, 2026</strong>. We&apos;ll
              update this article with detailed draw analysis and adjusted
              betting recommendations once brackets are released.
            </p>
          </div>

          <h2>Current Form: Summer Hard-Court Season</h2>

          <p>
            The North American hard-court swing (Canadian Open and Cincinnati
            Open) serves as the final tune-up before the US Open. Results from
            these tournaments provide critical insights into current form and
            readiness for New York.
          </p>

          <h3>Key Questions Heading into the US Open</h3>

          <ul>
            <li>
              <strong>How did Sinner transition from grass to hard courts?</strong>{" "}
              His Cincinnati results will show whether he&apos;s comfortable on
              the faster surface after his Wimbledon run.
            </li>
            <li>
              <strong>Can Alcaraz maintain consistency?</strong> Watch for
              early-round performance in Canada and Cincinnati. If he cruises
              through, his title odds improve. Shock losses raise red flags.
            </li>
            <li>
              <strong>Is Sabalenka&apos;s form peaking at the right time?</strong>{" "}
              A title or final in Cincinnati would signal she&apos;s ready to
              defend. Early losses might indicate fatigue or form concerns.
            </li>
            <li>
              <strong>Who emerges from the summer swing?</strong> Dark horses
              often reveal themselves with strong Masters 1000 results in
              August. Watch for players reaching semifinals or finals in Canada
              and Cincinnati as live upset picks.
            </li>
          </ul>

          <p>
            This article was published on <strong>August 20, 2026</strong> with
            Cincinnati Open results integrated, and will be refreshed when the
            US Open draw is released (around August 25) with detailed bracket
            analysis.
          </p>

          <h2>Betting Strategy Recommendations</h2>

          <p>
            Based on the analysis above, here are strategic approaches for
            betting the 2026 US Open:
          </p>

          <div className="not-prose my-6 space-y-3">
            <div className="rounded-lg border border-edge bg-bg p-4">
              <h4 className="mb-2 font-bold text-fg">
                1. Wait for the Draw (August 25)
              </h4>
              <p className="text-sm text-muted-hover">
                Resist the urge to bet favorites early. Once the draw is
                released, value shifts dramatically based on bracket
                positioning. Patient bettors can find +EV opportunities on
                players landing in favorable quarters.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-bg p-4">
              <h4 className="mb-2 font-bold text-fg">
                2. Track Summer Hard-Court Form
              </h4>
              <p className="text-sm text-muted-hover">
                Cincinnati and Canadian Open results matter. Players peaking in
                August often carry momentum into the US Open. Conversely,
                players struggling in these events may not be ready for a
                two-week Slam grind.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-bg p-4">
              <h4 className="mb-2 font-bold text-fg">
                3. Consider Derivative Markets
              </h4>
              <p className="text-sm text-muted-hover">
                Instead of only betting on outright winners, explore markets
                like &ldquo;to reach final,&rdquo; &ldquo;to reach semifinals,&rdquo; or specific
                matchup odds. These can offer better value than championship
                odds, especially for live underdogs.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-bg p-4">
              <h4 className="mb-2 font-bold text-fg">
                4. First-Week Upset Hunting (Women&apos;s Draw)
              </h4>
              <p className="text-sm text-muted-hover">
                The women&apos;s draw produces first-week upsets at a higher
                rate than the men&apos;s. Identify favorable matchups where
                unseeded players face vulnerable seeds and consider small-stake
                upset plays.
              </p>
            </div>

            <div className="rounded-lg border border-edge bg-bg p-4">
              <h4 className="mb-2 font-bold text-fg">
                5. Don&apos;t Overlook Experience
              </h4>
              <p className="text-sm text-muted-hover">
                The US Open&apos;s unique challenges (heat, crowds, night
                sessions) favor experienced players. If betting on first-time
                finalists, ensure they&apos;ve shown mental fortitude in
                previous high-pressure situations.
              </p>
            </div>
          </div>

          <h2>Final Predictions</h2>

          <div className="not-prose my-8 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 p-6">
            <h3 className="mb-4 text-xl font-bold text-fg">
              Our Top Picks for US Open 2026
            </h3>
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted">
                  Men&apos;s Champion
                </div>
                <div className="text-2xl font-bold text-fg">Jannik Sinner</div>
                <p className="mt-1 text-sm text-muted-hover">
                  The favorite for good reason. Hard-court excellence, US Open
                  pedigree, and championship form make Sinner the safest pick.
                  Wait for draw before locking in large positions.
                </p>
              </div>
              <div>
                <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted">
                  Women&apos;s Champion
                </div>
                <div className="text-2xl font-bold text-fg">
                  Aryna Sabalenka
                </div>
                <p className="mt-1 text-sm text-muted-hover">
                  Back-to-back defending champion with the game to dominate New
                  York. Power on fast courts is the winning formula, and no one
                  hits harder than Sabalenka.
                </p>
              </div>
              <div>
                <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted">
                  Value Dark Horse (Men)
                </div>
                <div className="text-xl font-bold text-fg">Daniil Medvedev</div>
                <p className="mt-1 text-sm text-muted-hover">
                  Former champion with favorable head-to-head record against
                  Sinner. If the draw puts him in the opposite half from Sinner
                  and Alcaraz, his path to the final opens up.
                </p>
              </div>
              <div>
                <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted">
                  Value Dark Horse (Women)
                </div>
                <div className="text-xl font-bold text-fg">Coco Gauff</div>
                <p className="mt-1 text-sm text-muted-hover">
                  Home crowd advantage is real, and Gauff has already proven
                  she can win the US Open. If her draw avoids Sabalenka until
                  the final, she&apos;s a live threat.
                </p>
              </div>
            </div>
          </div>

          <h2>Follow the US Open on Rankings123</h2>

          <p>
            Stay up to date with live scores, draws, and ranking implications
            throughout the tournament on our{" "}
            <Link
              href="/us-open-2026"
              className="font-semibold text-accent hover:underline"
            >
              dedicated US Open 2026 page
            </Link>
            . We&apos;ll track every match, update draw brackets in real time,
            and show how results impact the ATP and WTA rankings.
          </p>

          <div className="not-prose mt-8 rounded-lg border border-edge bg-surface2 p-6">
            <h3 className="mb-3 text-lg font-bold text-fg">
              Live ATP and WTA Rankings
            </h3>
            <p className="mb-4 text-muted">
              Track how US Open results affect the official rankings with live
              points updates throughout the tournament.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/atp-live"
                className="btn-base btn-primary inline-block rounded-lg px-6 py-2 font-semibold"
              >
                ATP Live Rankings →
              </Link>
              <Link
                href="/wta-live"
                className="btn-base btn-secondary inline-block rounded-lg px-6 py-2 font-semibold"
              >
                WTA Live Rankings →
              </Link>
            </div>
          </div>

          <footer className="not-prose mt-12 border-t border-edge pt-6 text-sm text-muted">
            <p>
              <strong>Responsible Betting:</strong> This article provides
              analysis and predictions for entertainment and informational
              purposes. Please bet responsibly and within your means. If you or
              someone you know has a gambling problem, help is available at{" "}
              <a
                href="https://www.ncpgambling.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                ncpgambling.org
              </a>
              .
            </p>
            <p className="mt-4">
              <strong>Published:</strong> August 20, 2026
            </p>
            <p className="mt-2">
              <strong>Next update:</strong> When US Open draws are released
              (~August 25)
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
