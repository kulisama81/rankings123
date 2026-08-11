import type { Metadata } from "next";
import HeroBanner from "@/components/HeroBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tour de France 2026 Winner Predictions: Pogačar's Historic 5th Title",
  description:
    "Tour de France 2026 winner betting analysis and predictions. Tadej Pogačar leads by 5 minutes heading into the final week. Current odds, podium battle, and stage-by-stage final week preview for stages 16-21.",
  keywords:
    "tour de france 2026, tour de france winner odds, pogacar 2026, tour de france betting, tdf predictions, yellow jersey odds, tour de france final week, pogacar fifth win",
  alternates: { canonical: "/cycling/tour-de-france-2026-winner-predictions" },
  openGraph: {
    title:
      "Tour de France 2026 Winner Predictions: Pogačar's Historic 5th Title — Rankings123",
    description:
      "Tadej Pogačar dominates with a 5-minute lead heading into the final week. Current betting odds, podium battle analysis, and stage-by-stage final week preview.",
    url: "/cycling/tour-de-france-2026-winner-predictions",
    type: "article",
    publishedTime: "2026-07-20T12:00:00Z",
    modifiedTime: "2026-07-20T12:00:00Z",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "Tour de France 2026",
  description:
    "Tour de France 2026 winner betting analysis and predictions for the final week",
  startDate: "2026-07-04",
  endDate: "2026-07-27",
  location: {
    "@type": "Place",
    name: "France",
  },
  competitor: [
    {
      "@type": "Person",
      name: "Tadej Pogačar",
      nationality: "Slovenia",
    },
    {
      "@type": "Person",
      name: "Remco Evenepoel",
      nationality: "Belgium",
    },
    {
      "@type": "Person",
      name: "Isaac del Toro",
      nationality: "Mexico",
    },
  ],
};

export default function TdfWinnerPredictionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-base">
        <HeroBanner
          sport="cycling"
          title="Tour de France 2026 Winner Predictions"
          subtitle="Final Week Analysis: Pogačar's Historic 5th Title"
          live={true}
        />

        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-secondary mb-4 italic">
              Last updated: July 20, 2026 • Rest Day Analysis
            </p>
            <p className="text-lg text-primary leading-relaxed mb-4">
              As the 2026 Tour de France enters its final week, Tadej Pogačar
              stands on the brink of cycling history. With a commanding{" "}
              <strong>5-minute lead</strong> over second-place Remco Evenepoel
              heading into the decisive mountain stages, the Slovenian superstar
              is poised to capture his <strong>fifth Tour de France title</strong>
              —equaling the legendary records of Eddy Merckx, Bernard Hinault,
              Miguel Indurain, and Jacques Anquetil.
            </p>
            <p className="text-lg text-primary leading-relaxed">
              While the yellow jersey battle appears settled, the race for the
              podium remains wide open with Evenepoel, Isaac del Toro, and a
              pack of young climbers separated by less than two minutes. Here&apos;s
              our comprehensive analysis of the final week, current betting
              odds, and where value remains in the markets.
            </p>
          </section>

          {/* Current Betting Odds */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Current Betting Odds
              <span className="ml-3 text-base font-normal text-secondary">
                as of July 20, 2026
              </span>
            </h2>
            <div className="rounded-xl border border-edge bg-surface p-6 mb-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-base p-4 border-l-4 border-accent">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🇸🇮</span>
                    <span className="text-sm font-mono text-accent">-370 / 1.25</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-1">
                    Tadej Pogačar
                  </h3>
                  <p className="text-sm text-secondary">
                    94.8% implied probability (Polymarket)
                  </p>
                  <p className="text-sm text-primary mt-2">
                    UAE Team Emirates XRG • GC: Leader
                  </p>
                </div>
                <div className="rounded-lg bg-base p-4 border-l-4 border-edge">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🇧🇪</span>
                    <span className="text-sm font-mono text-secondary">+1500</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-1">
                    Remco Evenepoel
                  </h3>
                  <p className="text-sm text-secondary">
                    3.2% implied probability
                  </p>
                  <p className="text-sm text-primary mt-2">
                    Soudal Quick-Step • GC: +5:00
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-base border border-edge">
                <p className="text-sm text-secondary">
                  <strong className="text-primary">Long shots:</strong> Isaac del
                  Toro (+5:58) at +5000, Paul Seixas (+6:23) at +10000. Data
                  from{" "}
                  <a
                    href="https://cryptoslate.com/predictions/market/tour-de-france-2026-winner/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Polymarket
                  </a>
                  ,{" "}
                  <a
                    href="https://www.racingpost.com/sport/cycling-tips/tour-de-france/tour-de-france-2026-predictions-tips-odds-yellow-jersey-pogacar-vingegaard-aZf2F2J9gFfU/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Racing Post
                  </a>
                  , and multiple sportsbooks.
                </p>
              </div>
            </div>
          </section>

          {/* Race Situation */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">
              How We Got Here
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-primary leading-relaxed mb-4">
                The 2026 Tour began with high drama as Jonas Vingegaard&apos;s
                Visma-Lease a Bike squad won the stage 1 team time trial in
                Barcelona, putting the defending champion in yellow. But Pogačar
                seized control on <strong>stage 3</strong>, and never looked
                back.
              </p>
              <p className="text-primary leading-relaxed mb-4">
                The defining moment came on{" "}
                <strong>stage 15</strong>, when Vingegaard—Pogačar&apos;s fiercest
                rival and the race&apos;s only realistic challenger—crashed out and
                abandoned the Tour. With Vingegaard gone, Pogačar&apos;s path to
                yellow in Paris became virtually certain. According to{" "}
                <a
                  href="https://www.nbcsports.com/cycling/news/2026-tour-de-france-standings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  NBC Sports
                </a>{" "}
                and{" "}
                <a
                  href="https://www.cyclingnews.com/pro-cycling/racing/tour-de-france-gc-standings-2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Cyclingnews
                </a>
                , Pogačar now leads Evenepoel by exactly five minutes, with
                young Mexican climber Isaac del Toro in third at +5:58.
              </p>
              <p className="text-primary leading-relaxed">
                Pogačar&apos;s dominance has been total: multiple stage wins, crushing
                attacks in the mountains, and a tactical masterclass. Barring a
                catastrophic crash or illness, his fifth Tour title is all but
                assured.
              </p>
            </div>
          </section>

          {/* Pogacar vs Vingegaard Historical Context */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">
              The Rivalry That Defined an Era
              <span className="ml-3 text-base font-normal text-secondary">
                Pogačar vs Vingegaard head-to-head
              </span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-primary leading-relaxed mb-4">
                For three years (2022-2024), the Tour de France was defined by
                the Pogačar-Vingegaard rivalry. Vingegaard&apos;s crash on stage 15
                ended what many hoped would be the final chapter of their epic
                duel—but their head-to-head record provides crucial context for
                understanding why Pogačar&apos;s 2026 dominance feels historic.
              </p>
              <div className="rounded-xl border border-edge bg-surface p-6 mb-6">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Tour de France Head-to-Head
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-base p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-2xl">🇸🇮</span>
                      <span className="text-sm font-mono text-accent">3 wins</span>
                    </div>
                    <h4 className="text-lg font-bold text-primary mb-2">
                      Tadej Pogačar
                    </h4>
                    <p className="text-sm text-secondary">
                      <strong className="text-primary">Wins:</strong> 2020, 2021,
                      2024, (2026 pending)
                    </p>
                    <p className="text-sm text-secondary mt-1">
                      <strong className="text-primary">Style:</strong> Explosive
                      attacks, dominant time trials, all-terrain threat
                    </p>
                  </div>
                  <div className="rounded-lg bg-base p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-2xl">🇩🇰</span>
                      <span className="text-sm font-mono text-secondary">2 wins</span>
                    </div>
                    <h4 className="text-lg font-bold text-primary mb-2">
                      Jonas Vingegaard
                    </h4>
                    <p className="text-sm text-secondary">
                      <strong className="text-primary">Wins:</strong> 2022, 2023
                    </p>
                    <p className="text-sm text-secondary mt-1">
                      <strong className="text-primary">Style:</strong> Elite
                      climber, tactical patience, team-powered control
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-base border-l-4 border-accent">
                  <p className="text-sm text-primary leading-relaxed">
                    <strong>2026 Context:</strong> Vingegaard won the Giro
                    d&apos;Italia 2026 (May 8-31), arriving at the Tour in strong
                    form. Many expected their closest battle yet. His stage 15
                    crash robbed fans of that showdown—and handed Pogačar an
                    uncontested path to a record-tying fifth title.
                  </p>
                </div>
              </div>
              <p className="text-primary leading-relaxed">
                Pogačar&apos;s 2026 victory will carry an asterisk in some
                eyes—Vingegaard&apos;s absence means we&apos;ll never know if he could
                have mounted a successful defense. But championships aren&apos;t
                decided by hypotheticals. Pogačar showed up, dominated every
                stage type, and delivered when it mattered. That&apos;s all history
                will remember.
              </p>
            </div>
          </section>

          {/* Final Week Preview */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Final Week Stage-by-Stage Preview
              <span className="ml-3 text-base font-normal text-secondary">
                Stages 16-21
              </span>
            </h2>
            <div className="space-y-6">
              {/* Stage 16 */}
              <div className="rounded-xl border border-edge bg-surface p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-primary">
                    Stage 16 • July 21
                  </h3>
                  <span className="rounded-lg bg-red-500/20 px-3 py-1 text-sm font-bold text-red-400">
                    Mountain
                  </span>
                </div>
                <p className="text-sm text-secondary mb-3">
                  First decisive mountain stage of the final week
                </p>
                <p className="text-primary leading-relaxed">
                  <strong>GC Impact:</strong> High. Evenepoel and del Toro need
                  to attack here if they want to salvage a podium position.
                  Pogačar will likely control, but watch for young climbers to
                  take risks.
                </p>
              </div>

              {/* Stage 17 */}
              <div className="rounded-xl border border-edge bg-surface p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-primary">
                    Stage 17 • July 22
                  </h3>
                  <span className="rounded-lg bg-red-500/20 px-3 py-1 text-sm font-bold text-red-400">
                    Mountain
                  </span>
                </div>
                <p className="text-sm text-secondary mb-3">
                  Queen stage — the toughest mountain finish
                </p>
                <p className="text-primary leading-relaxed">
                  <strong>GC Impact:</strong> Very High. The race&apos;s hardest
                  stage. If Pogačar shows any weakness, this is where rivals
                  would strike. More likely, he extends his lead.
                </p>
              </div>

              {/* Stage 18 */}
              <div className="rounded-xl border border-edge bg-surface p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-primary">
                    Stage 18 • July 23
                  </h3>
                  <span className="rounded-lg bg-orange-500/20 px-3 py-1 text-sm font-bold text-orange-400">
                    Hilly
                  </span>
                </div>
                <p className="text-sm text-secondary mb-3">
                  Recovery stage for GC contenders
                </p>
                <p className="text-primary leading-relaxed">
                  <strong>GC Impact:</strong> Low. Breakaway stage. GC riders
                  recover before the final mountain test.
                </p>
              </div>

              {/* Stage 19 */}
              <div className="rounded-xl border border-edge bg-surface p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-primary">
                    Stage 19 • July 24
                  </h3>
                  <span className="rounded-lg bg-red-500/20 px-3 py-1 text-sm font-bold text-red-400">
                    Mountain
                  </span>
                </div>
                <p className="text-sm text-secondary mb-3">
                  Last mountain stage — final chance for GC moves
                </p>
                <p className="text-primary leading-relaxed">
                  <strong>GC Impact:</strong> High. Last realistic opportunity
                  for GC attacks. Podium positions (2nd-5th) could still
                  shuffle.
                </p>
              </div>

              {/* Stage 20 */}
              <div className="rounded-xl border border-edge bg-surface p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-primary">
                    Stage 20 • July 26
                  </h3>
                  <span className="rounded-lg bg-blue-500/20 px-3 py-1 text-sm font-bold text-blue-400">
                    Time Trial
                  </span>
                </div>
                <p className="text-sm text-secondary mb-3">
                  Individual time trial — chrono finale
                </p>
                <p className="text-primary leading-relaxed">
                  <strong>GC Impact:</strong> Medium. Pogačar excels in time
                  trials (won stage 4 TT this Tour). He&apos;ll extend his lead.
                  Final podium positions will be decided here.
                </p>
              </div>

              {/* Stage 21 */}
              <div className="rounded-xl border border-edge bg-surface p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-primary">
                    Stage 21 • July 27
                  </h3>
                  <span className="rounded-lg bg-green-500/20 px-3 py-1 text-sm font-bold text-green-400">
                    Flat
                  </span>
                </div>
                <p className="text-sm text-secondary mb-3">
                  Champs-Élysées parade and sprint finish
                </p>
                <p className="text-primary leading-relaxed">
                  <strong>GC Impact:</strong> None. Traditional ceremonial stage
                  ending in a sprinters&apos; battle in Paris. Pogačar&apos;s coronation.
                </p>
              </div>
            </div>
          </section>

          {/* Betting Analysis */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Betting Value Analysis
            </h2>
            <div className="space-y-6">
              <div className="rounded-xl border border-accent/50 bg-surface p-6">
                <h3 className="text-xl font-bold text-primary mb-3">
                  ✅ Pogačar to Win (-370 / 1.25)
                </h3>
                <p className="text-primary leading-relaxed mb-2">
                  <strong className="text-accent">Verdict:</strong> Lock it in.
                </p>
                <p className="text-secondary leading-relaxed">
                  Five-minute lead with only three hard stages remaining. Even at
                  -370, this is the safest bet in cycling. He&apos;d need to crash
                  out or get seriously ill to lose from here. The 94.8%
                  probability is fair—possibly conservative.
                </p>
              </div>

              <div className="rounded-xl border border-edge bg-surface p-6">
                <h3 className="text-xl font-bold text-primary mb-3">
                  🤔 Podium Props (Top 3 Finish)
                </h3>
                <p className="text-primary leading-relaxed mb-3">
                  <strong className="text-accent">Where the Value Lives:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  <li>
                    <strong className="text-primary">Evenepoel Top 3:</strong>{" "}
                    Solid bet. Five minutes is safe unless he cracks in the
                    mountains (unlikely for a rider of his caliber).
                  </li>
                  <li>
                    <strong className="text-primary">Del Toro Top 3:</strong>{" "}
                    Riskier but interesting. Only 1:01 behind Evenepoel and
                    2:25 ahead of 4th place. If he has one great mountain day, he
                    secures the podium.
                  </li>
                  <li>
                    <strong className="text-primary">Dark Horse:</strong> Paul
                    Seixas (+6:23) for Top 5 could offer value if available—young
                    French climber on home roads.
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-edge bg-surface p-6">
                <h3 className="text-xl font-bold text-primary mb-3">
                  ⚠️ Avoid: Evenepoel to Win (+1500)
                </h3>
                <p className="text-primary leading-relaxed mb-2">
                  <strong className="text-red-400">Verdict:</strong> Too far back.
                </p>
                <p className="text-secondary leading-relaxed">
                  Making up 5 minutes on Pogačar in three mountain stages? Not
                  happening. Pogačar is in peak form and hasn&apos;t shown weakness
                  all Tour. Even at 15-1, this is a bad bet.
                </p>
              </div>
            </div>
          </section>

          {/* Historical Context */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Historic 5th Title: The Elite Company
            </h2>
            <div className="rounded-xl border border-edge bg-surface p-6">
              <p className="text-primary leading-relaxed mb-4">
                If Pogačar wins on Sunday, he&apos;ll join cycling&apos;s most exclusive
                club—riders who&apos;ve won the Tour de France{" "}
                <strong>five or more times</strong>:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🇧🇪</span>
                  <div>
                    <p className="font-bold text-primary">
                      Eddy Merckx (Belgium)
                    </p>
                    <p className="text-sm text-secondary">
                      5 wins: 1969, 1970, 1971, 1972, 1974
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🇫🇷</span>
                  <div>
                    <p className="font-bold text-primary">
                      Bernard Hinault (France)
                    </p>
                    <p className="text-sm text-secondary">
                      5 wins: 1978, 1979, 1981, 1982, 1985
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🇫🇷</span>
                  <div>
                    <p className="font-bold text-primary">
                      Jacques Anquetil (France)
                    </p>
                    <p className="text-sm text-secondary">
                      5 wins: 1957, 1961, 1962, 1963, 1964
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🇪🇸</span>
                  <div>
                    <p className="font-bold text-primary">
                      Miguel Indurain (Spain)
                    </p>
                    <p className="text-sm text-secondary">
                      5 wins: 1991, 1992, 1993, 1994, 1995
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-lg bg-base border-l-4 border-accent">
                <p className="text-primary leading-relaxed">
                  <strong>Pogačar&apos;s wins:</strong> 2020, 2021, 2023, 2024, and
                  (pending) 2026. At just 27 years old, he could surpass them
                  all—and chase an unprecedented 6th, 7th, or even 8th title in
                  the years ahead.
                </p>
              </div>
            </div>
          </section>

          {/* Betting Affiliate Section - Gated until integration approved */}
          {false && ( // Gate: set to true once affiliate partnerships are live
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Place Your Bets
                <span className="ml-3 text-base font-normal text-secondary">
                  Trusted sportsbooks
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* FanDuel, DraftKings, BetMGM affiliate CTAs will go here once approved */}
              </div>
            </section>
          )}

          {/* Bottom Line */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">
              The Bottom Line
            </h2>
            <div className="rounded-xl border border-accent bg-surface p-6">
              <p className="text-lg text-primary leading-relaxed mb-4">
                <strong>Barring catastrophe, Tadej Pogačar wins his fifth Tour
                de France on July 27 in Paris.</strong> The margin is too large,
                the time remaining too short, and his form too strong for any
                realistic comeback.
              </p>
              <p className="text-primary leading-relaxed mb-4">
                For bettors, the value isn&apos;t in the yellow jersey—that&apos;s
                decided. Look instead to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary mb-4">
                <li>Podium positions (Evenepoel, del Toro for Top 3)</li>
                <li>Stage winners in the final week (breakaway specialists)</li>
                <li>Individual time trial winner on Stage 20 (Pogačar likely)</li>
                <li>Points classification (green jersey) final outcome</li>
              </ul>
              <p className="text-primary leading-relaxed">
                The 2026 Tour de France will be remembered as the year Tadej
                Pogačar cemented his legacy as one of the all-time greats.
                History is being written—don&apos;t miss the final chapters.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-12">
            <div className="rounded-xl border border-edge bg-surface p-6">
              <p className="text-sm text-secondary leading-relaxed">
                <strong className="text-primary">Disclaimer:</strong> This
                article is for informational and entertainment purposes only.
                Betting involves risk—only wager what you can afford to lose.
                Odds and race information accurate as of July 20, 2026. Please
                gamble responsibly and check your local laws regarding sports
                betting. Sources:{" "}
                <a
                  href="https://www.nbcsports.com/cycling/news/2026-tour-de-france-standings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  NBC Sports
                </a>
                ,{" "}
                <a
                  href="https://cryptoslate.com/predictions/market/tour-de-france-2026-winner/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Polymarket
                </a>
                ,{" "}
                <a
                  href="https://www.racingpost.com/sport/cycling-tips/tour-de-france/tour-de-france-2026-predictions-tips-odds-yellow-jersey-pogacar-vingegaard-aZf2F2J9gFfU/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Racing Post
                </a>
                , and{" "}
                <a
                  href="https://www.cyclingnews.com/pro-cycling/racing/tour-de-france-gc-standings-2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Cyclingnews
                </a>
                .
              </p>
            </div>
          </section>

          {/* Back to Cycling */}
          <div className="text-center">
            <Link
              href="/cycling"
              className="inline-block rounded-lg bg-accent px-6 py-3 font-bold text-base-inverted transition-colors hover:bg-accent/90"
            >
              ← Back to Tour de France Live Standings
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
