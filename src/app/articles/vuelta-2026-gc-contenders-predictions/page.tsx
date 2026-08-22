import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Vuelta a España 2026 Predictions: Can Anyone Stop Pogačar? | Rankings123",
  description:
    "Vuelta a España 2026 GC predictions and betting analysis. Tadej Pogačar seeks his first Vuelta title to complete the Grand Tour triple crown. Full breakdown of contenders, Stage 1 Monaco time trial preview, and betting odds for the three-week battle.",
  keywords:
    "vuelta 2026 predictions, vuelta a españa betting, pogacar vuelta, vuelta gc contenders, vuelta 2026 odds, roglic vuelta, enric mas, stage 1 monaco, cycling betting 2026",
  alternates: {
    canonical: "/articles/vuelta-2026-gc-contenders-predictions",
  },
  openGraph: {
    title:
      "Vuelta a España 2026 Predictions: Can Anyone Stop Pogačar? — Rankings123",
    description:
      "Tadej Pogačar seeks his first Vuelta title to complete the Grand Tour collection. Full GC contender analysis, Stage 1 Monaco time trial preview, and betting odds.",
    url: "/articles/vuelta-2026-gc-contenders-predictions",
    type: "article",
    publishedTime: "2026-08-21T18:00:00Z",
    modifiedTime: "2026-08-21T18:00:00Z",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "Vuelta a España 2026",
  description:
    "Vuelta a España 2026 GC predictions and betting analysis for the three-week Grand Tour",
  startDate: "2026-08-22",
  endDate: "2026-09-13",
  location: {
    "@type": "Place",
    name: "Spain",
  },
  competitor: [
    {
      "@type": "Person",
      name: "Tadej Pogačar",
      nationality: "Slovenia",
    },
    {
      "@type": "Person",
      name: "Primož Roglič",
      nationality: "Slovenia",
    },
    {
      "@type": "Person",
      name: "Enric Mas",
      nationality: "Spain",
    },
    {
      "@type": "Person",
      name: "João Almeida",
      nationality: "Portugal",
    },
  ],
};

export default function VueltaGCContendersPredictionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-base">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero section */}
          <header className="mb-12 border-b border-edge pb-8">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
              Vuelta a España 2026 Preview
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-primary sm:text-5xl">
              Vuelta a España 2026 GC Predictions: Can Anyone Stop Pogačar?
            </h1>
            <p className="text-xl leading-relaxed text-secondary">
              Tadej Pogačar seeks his first Vuelta title to complete the Grand
              Tour triple crown. We analyze the favorites, dark horses, and
              Stage 1 Monaco time trial that opens the three-week battle.
            </p>
            <div className="mt-4 text-sm text-secondary">
              August 21, 2026 · Race starts August 22
            </div>
          </header>

          <article>
            {/* Introduction */}
            <section className="mb-12">
              <p className="mb-4 text-lg leading-relaxed text-primary">
                The 2026 Vuelta a España begins tomorrow in Monaco with a
                technical 9.6-kilometer time trial, kicking off a three-week
                battle that will determine whether Tadej Pogačar can complete
                cycling&apos;s most exclusive achievement: winning all three
                Grand Tours in a career.
              </p>
              <p className="mb-4 text-lg leading-relaxed text-primary">
                After claiming his <strong>fifth Tour de France title</strong>{" "}
                in July, Pogačar arrives at the Vuelta as an overwhelming
                favorite. With six Grand Tour victories already (five Tours and
                the 2024 Giro d&apos;Italia), 10 Monument wins, and two World
                Championships, the 27-year-old Slovenian stands on the brink of
                history. The Vuelta is the only Grand Tour he&apos;s never won
                — and the betting markets give him a{" "}
                <strong>90.9% probability</strong> of fixing that gap.
              </p>
              <p className="text-lg leading-relaxed text-primary">
                But Grand Tours are never won on paper. Spain&apos;s mountainous
                terrain, unpredictable weather, and the cumulative fatigue of a
                season that has already included both the Giro and Tour make the
                Vuelta a genuine test. Can anyone stop Pogačar? Here&apos;s our
                breakdown of the GC contenders, Stage 1 preview, and where the
                betting value lies.
              </p>
            </section>

            {/* Current Betting Odds */}
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-primary">
                Current Betting Odds
                <span className="ml-3 text-base font-normal text-secondary">
                  as of August 21, 2026
                </span>
              </h2>
              <div className="mb-6 rounded-xl border border-edge bg-surface p-6">
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border-l-4 border-accent bg-base p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-2xl">🇸🇮</span>
                      <span className="font-mono text-sm text-accent">
                        -1000 / 1.10
                      </span>
                    </div>
                    <h3 className="mb-1 text-xl font-bold text-primary">
                      Tadej Pogačar
                    </h3>
                    <p className="text-sm text-secondary">
                      90.9% implied probability
                    </p>
                    <p className="mt-2 text-sm text-primary">
                      UAE Team Emirates XRG · Seeking 1st Vuelta title
                    </p>
                  </div>
                  <div className="rounded-lg border-l-4 border-edge bg-base p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-2xl">🇵🇹</span>
                      <span className="font-mono text-sm text-secondary">
                        +1000 / 11.00
                      </span>
                    </div>
                    <h3 className="mb-1 text-xl font-bold text-primary">
                      João Almeida
                    </h3>
                    <p className="text-sm text-secondary">
                      8.3% implied probability
                    </p>
                    <p className="mt-2 text-sm text-primary">
                      UAE Team Emirates XRG · 2025 runner-up
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-edge bg-base p-4">
                  <p className="text-sm text-secondary">
                    <strong className="text-primary">Also in the mix:</strong>{" "}
                    Primož Roglič (4× winner, uncertain GC pursuit after crash),
                    Enric Mas (home favorite, multiple podiums), Oscar Onley
                    (strong recent form), Florian Lipowitz, Felix Gall, Mattias
                    Skjelmose, Carlos Rodríguez. Odds from{" "}
                    <a
                      href="https://www.thesportsgeek.com/blog/vuelta-a-espana-odds/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      TheSportsGeek
                    </a>
                    ,{" "}
                    <a
                      href="https://tips.gg/article/vuelta-a-espana-2026-odds-and-favourites-vuelta2026/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      Tips.GG
                    </a>
                    , and{" "}
                    <a
                      href="https://www.bettingodds.com/cycling/vuelta-a-espana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      BettingOdds.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* GC Contenders */}
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-primary">
                GC Contender Breakdown
              </h2>

              {/* Pogacar */}
              <div className="mb-8 rounded-xl border border-edge bg-surface p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">
                      🇸🇮 Tadej Pogačar
                    </h3>
                    <p className="text-sm text-secondary">
                      UAE Team Emirates XRG
                    </p>
                  </div>
                  <div className="rounded-lg bg-accent/10 px-3 py-1 text-sm font-bold text-accent">
                    Favorite
                  </div>
                </div>

                <p className="mb-4 leading-relaxed text-primary">
                  Pogačar arrives at the Vuelta on the brink of cycling history.
                  Already the owner of five Tour de France titles, the 2024 Giro
                  d&apos;Italia, and ten Monument victories, the Slovenian
                  superstar needs only the Vuelta to complete the Grand Tour
                  triple crown — an achievement held by just eight riders in
                  history.
                </p>

                <p className="mb-4 text-sm font-bold uppercase tracking-wide text-secondary">
                  Why He&apos;s the Overwhelming Favorite
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-primary">
                  <li>
                    <strong>All-terrain dominance:</strong> Pogačar excels in
                    time trials, mountain stages, and tactical positioning —
                    everything the Vuelta demands.
                  </li>
                  <li>
                    <strong>Historic form:</strong> After winning the Tour in
                    July by a commanding margin, his peak condition carries into
                    Spain.
                  </li>
                  <li>
                    <strong>Mental motivation:</strong> The Vuelta is the only
                    missing piece. This is personal.
                  </li>
                  <li>
                    <strong>Team support:</strong> UAE Team Emirates XRG has
                    built a squad around protecting Pogačar through three weeks
                    of Spanish mountains.
                  </li>
                </ul>

                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-secondary">
                  The Risk
                </p>
                <p className="leading-relaxed text-primary">
                  Fatigue. Pogačar has raced the Giro (May) and the Tour (July).
                  Adding a third Grand Tour in four months tests even the most
                  resilient rider. If cumulative exhaustion catches up in Week 3,
                  a late-stage collapse could open the door for challengers.
                </p>
              </div>

              {/* Almeida */}
              <div className="mb-8 rounded-xl border border-edge bg-surface p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">
                      🇵🇹 João Almeida
                    </h3>
                    <p className="text-sm text-secondary">
                      UAE Team Emirates XRG
                    </p>
                  </div>
                  <div className="rounded-lg bg-base px-3 py-1 text-sm font-bold text-secondary">
                    10/1 Odds
                  </div>
                </div>

                <p className="mb-4 leading-relaxed text-primary">
                  Last year&apos;s runner-up returns with unfinished business.
                  Almeida finished second in the 2025 Vuelta and has the climbing
                  credentials to challenge for the podium — if he can overcome a
                  difficult 2026 season marked by injuries and illness.
                </p>

                <p className="mb-4 text-sm font-bold uppercase tracking-wide text-secondary">
                  Path to the Podium
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-primary">
                  <li>
                    <strong>Proven Vuelta pedigree:</strong> Second place in 2025
                    shows he can survive three weeks of Spanish mountains.
                  </li>
                  <li>
                    <strong>Teammate dynamics:</strong> Riding for UAE alongside
                    Pogačar could mean dual-leader tactics if one falters.
                  </li>
                  <li>
                    <strong>Recovery wildcard:</strong> If he&apos;s fully
                    recovered from his Tour de Pologne crash, Almeida has top-5
                    potential.
                  </li>
                </ul>

                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-secondary">
                  The Concern
                </p>
                <p className="leading-relaxed text-primary">
                  A largely fruitless 2026 campaign raises questions about form.
                  Injuries and illness have limited his race days, and arriving
                  at a Grand Tour without recent competitive rhythm is risky.
                  According to{" "}
                  <a
                    href="https://www.domestiquecycling.com/en/features/analysing-the-2026-vuelta-a-espana-favourites/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Domestique Cycling
                  </a>
                  , he could pursue a high finish alongside duties supporting
                  Pogačar.
                </p>
              </div>

              {/* Mas */}
              <div className="mb-8 rounded-xl border border-edge bg-surface p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary">
                    🇪🇸 Enric Mas
                  </h3>
                  <p className="text-sm text-secondary">Movistar Team</p>
                </div>

                <p className="mb-4 leading-relaxed text-primary">
                  Spain&apos;s best hope for a home victory, Mas is a perennial
                  Vuelta contender with multiple podium finishes: second in 2021
                  and 2022, third in 2024, and consistent top-10 results dating
                  back to his debut in 2018. He knows the Spanish roads better
                  than anyone.
                </p>

                <p className="mb-4 text-sm font-bold uppercase tracking-wide text-secondary">
                  Why Mas Could Contend
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-primary">
                  <li>
                    <strong>Vuelta specialist:</strong> His record speaks for
                    itself — Mas thrives in the Vuelta&apos;s demanding mountains
                    and unpredictable weather.
                  </li>
                  <li>
                    <strong>Home crowd support:</strong> Spanish fans will lift
                    him through tough stages, and the pressure on rivals
                    increases when racing on hostile roads.
                  </li>
                  <li>
                    <strong>Strategic climber:</strong> Mas races intelligently,
                    waiting for the right moment to attack rather than burning
                    matches early.
                  </li>
                </ul>

                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-secondary">
                  The Gap
                </p>
                <p className="leading-relaxed text-primary">
                  Beating Pogačar head-to-head seems unlikely. Mas&apos;s best
                  realistic outcome is a podium finish — and even that requires
                  Pogačar to falter or Mas to find career-best form.{" "}
                  <a
                    href="https://www.cyclingstage.com/vuelta-2026-favourites/contenders-spain-2026/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    CyclingStage
                  </a>{" "}
                  notes he&apos;s a &quot;typical Vueltaman&quot; — consistently
                  strong, rarely victorious.
                </p>
              </div>

              {/* Onley */}
              <div className="mb-8 rounded-xl border border-edge bg-surface p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary">
                    🇬🇧 Oscar Onley
                  </h3>
                  <p className="text-sm text-secondary">Team dsm-firmenich</p>
                </div>

                <p className="mb-4 leading-relaxed text-primary">
                  A rising star with impressive recent form, Onley finished
                  second overall at the Vuelta a Burgos earlier this month,
                  taking a stage win plus both the mountain and points jerseys.
                  If he can avoid bad luck, he&apos;s a legitimate podium
                  contender.
                </p>

                <p className="mb-4 text-sm font-bold uppercase tracking-wide text-secondary">
                  Dark Horse Credentials
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-primary">
                  <li>
                    <strong>Peak timing:</strong> His Burgos performance
                    indicates he&apos;s arriving at the Vuelta in career-best
                    form.
                  </li>
                  <li>
                    <strong>Youth advantage:</strong> Fresh legs and fearless
                    attacking could surprise veterans.
                  </li>
                  <li>
                    <strong>Nothing to lose:</strong> As an underdog, Onley can
                    take risks that favorites can&apos;t afford.
                  </li>
                </ul>

                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-secondary">
                  Experience Gap
                </p>
                <p className="leading-relaxed text-primary">
                  Three-week Grand Tours are different from one-week stage races.
                  Sustaining podium form through 21 stages and over 3,200
                  kilometers is a different challenge entirely. Per{" "}
                  <a
                    href="https://cyclinguptodate.com/cycling/vuelta-a-espana-2026-gc-and-stage-1-preview-profiles-favourites-predictions-will-tadej-pogacar-make-history-in-spain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    CyclingUpToDate
                  </a>
                  , he&apos;s a &quot;real podium contender&quot; — if he avoids
                  crashes.
                </p>
              </div>

              {/* Roglic */}
              <div className="rounded-xl border border-edge bg-surface p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary">
                    🇸🇮 Primož Roglič
                  </h3>
                  <p className="text-sm text-secondary">
                    Red Bull-BORA-hansgrohe
                  </p>
                </div>

                <p className="mb-4 leading-relaxed text-primary">
                  The four-time Vuelta champion (2019, 2020, 2021, 2023) enters
                  the race under a cloud of uncertainty. After a recent crash,
                  Roglič has indicated he&apos;s unlikely to pursue a full GC
                  result, potentially ending his career with a record-tying four
                  Vuelta wins rather than chasing a historic fifth.
                </p>

                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-secondary">
                  The Wildcard
                </p>
                <p className="leading-relaxed text-primary">
                  If Roglič is healthy and decides mid-race to go for GC, he
                  remains one of the most dangerous riders in the peloton. But
                  all signs point to a diminished role — making him a spectator
                  in the GC battle rather than a protagonist. Data from{" "}
                  <a
                    href="https://www.idlprocycling.com/cycling/2026-vuelta-a-espana-gc-favourites-here-are-the-contenders-for-the-red-jersey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    IDL Pro Cycling
                  </a>{" "}
                  suggests his aspirations have &quot;softened&quot; post-crash.
                </p>
              </div>
            </section>

            {/* Stage 1 Preview */}
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-primary">
                Stage 1 Preview: Monaco Time Trial
                <span className="ml-3 text-base font-normal text-secondary">
                  August 22, 2026
                </span>
              </h2>

              <div className="mb-6 rounded-xl border border-edge bg-surface p-6">
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-wide text-secondary">
                      Distance
                    </p>
                    <p className="text-2xl font-bold text-primary">9.6 km</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-wide text-secondary">
                      Type
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      Individual Time Trial
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-wide text-secondary">
                      Elevation Gain
                    </p>
                    <p className="text-2xl font-bold text-primary">170 meters</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-wide text-secondary">
                      Start → Finish
                    </p>
                    <p className="text-lg font-bold text-primary">
                      Casino → Port Hercule
                    </p>
                  </div>
                </div>
              </div>

              <p className="mb-4 leading-relaxed text-primary">
                The 2026 Vuelta begins with a technical 9.6-kilometer individual
                time trial through the streets of Monaco — a course that uses
                parts of the famous Formula 1 circuit, including the{" "}
                <strong>Fairmont hairpin</strong> and the{" "}
                <strong>tunnel on Boulevard Louis II</strong>.
              </p>

              <p className="mb-4 leading-relaxed text-primary">
                Starting at the legendary Monte Carlo Casino, riders will
                navigate 13 corners, three tunnels, and short punchy climbs
                before finishing at Port Hercule on Boulevard Albert 1er — the
                same finish line as the Monaco Grand Prix.
              </p>

              <p className="mb-4 text-sm font-bold uppercase tracking-wide text-secondary">
                What to Watch
              </p>
              <ul className="mb-4 list-inside list-disc space-y-2 text-primary">
                <li>
                  <strong>Pogačar&apos;s opening statement:</strong> A dominant
                  TT win would send an immediate psychological message to rivals.
                </li>
                <li>
                  <strong>Technical mistakes:</strong> With 13 corners and
                  multiple tunnels, riders who misjudge the course could lose
                  significant time.
                </li>
                <li>
                  <strong>GC gaps:</strong> While only 9.6km, time gaps here
                  could dictate tactics for the rest of the race.
                </li>
                <li>
                  <strong>Roglič&apos;s condition:</strong> His Stage 1
                  performance will reveal whether he&apos;s truly racing for GC
                  or riding in a support role.
                </li>
              </ul>

              <p className="leading-relaxed text-primary">
                Per{" "}
                <a
                  href="https://www.rouleur.cc/racing/vuelta-a-espana-2026-stage-one-preview-monaco-time-trial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Rouleur
                </a>{" "}
                and{" "}
                <a
                  href="https://www.cyclingnews.com/pro-cycling/racing/vuelta-a-espana-2026-stage-1-preview/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Cyclingnews
                </a>
                , the route is &quot;gently rolling&quot; but highly technical —
                time trial specialists who can handle tight corners will have an
                advantage.
              </p>
            </section>

            {/* Betting Analysis */}
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-primary">
                Betting Value Analysis
              </h2>

              <div className="space-y-6">
                <div className="rounded-xl border border-accent/50 bg-surface p-6">
                  <h3 className="mb-3 text-xl font-bold text-primary">
                    ✅ Pogačar to Win (-1000 / 1.10)
                  </h3>
                  <p className="mb-2 leading-relaxed text-primary">
                    <strong className="text-accent">Verdict:</strong> As safe as
                    it gets.
                  </p>
                  <p className="leading-relaxed text-secondary">
                    At 90.9% implied probability, the market correctly prices
                    Pogačar&apos;s dominance. Even at -1000, this is the safest
                    bet in cycling right now. The only scenarios where he
                    doesn&apos;t win involve crashes or illness — not being
                    outclimbed or outperformed.
                  </p>
                </div>

                <div className="rounded-xl border border-edge bg-surface p-6">
                  <h3 className="mb-3 text-xl font-bold text-primary">
                    🤔 Podium Props (Top 3 Finish)
                  </h3>
                  <p className="mb-3 leading-relaxed text-primary">
                    <strong className="text-accent">Where the Value Lives:</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-secondary">
                    <li>
                      <strong className="text-primary">
                        Almeida Top 3 (10/1):
                      </strong>{" "}
                      Last year&apos;s runner-up at 10/1 offers value if
                      he&apos;s healthy. His UAE team support and proven Vuelta
                      form make a podium realistic.
                    </li>
                    <li>
                      <strong className="text-primary">Mas Top 3:</strong> The
                      home favorite is a safer podium bet than an outright win.
                      Spain&apos;s roads suit him, and he&apos;s finished on the
                      podium multiple times.
                    </li>
                    <li>
                      <strong className="text-primary">
                        Onley Top 5 (Dark Horse):
                      </strong>{" "}
                      His recent Vuelta a Burgos victory suggests peak form. A
                      top-5 finish at longer odds could be a smart value play.
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-edge bg-surface p-6">
                  <h3 className="mb-3 text-xl font-bold text-primary">
                    ⚠️ Avoid: Betting Against Pogačar
                  </h3>
                  <p className="mb-2 leading-relaxed text-primary">
                    <strong className="text-red-400">Verdict:</strong> Don&apos;t
                    get cute.
                  </p>
                  <p className="leading-relaxed text-secondary">
                    The market is correct. Pogačar is the best rider in the world
                    in the best form of his life chasing the only Grand Tour he
                    hasn&apos;t won. Betting on anyone else to win outright is
                    hoping for catastrophe, not analyzing form.
                  </p>
                </div>
              </div>
            </section>

            {/* Betting Affiliate Section - Gated until integration approved */}
            {false && ( // Gate: set to true once affiliate partnerships are live
              <section className="mb-12">
                <h2 className="mb-6 text-3xl font-bold text-primary">
                  Place Your Bets
                  <span className="ml-3 text-base font-normal text-secondary">
                    Trusted sportsbooks
                  </span>
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Sportsbook affiliate CTAs will go here once approved */}
                </div>
              </section>
            )}

            {/* Bottom Line */}
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-primary">
                The Bottom Line
              </h2>
              <div className="rounded-xl border border-accent bg-surface p-6">
                <p className="mb-4 text-lg leading-relaxed text-primary">
                  <strong>
                    Tadej Pogačar will win the 2026 Vuelta a España and complete
                    the Grand Tour triple crown.
                  </strong>{" "}
                  The margin of his superiority over the rest of the field is
                  simply too large for any realistic challenger to close.
                </p>
                <p className="mb-4 leading-relaxed text-primary">
                  The real battle is for the podium. Almeida, Mas, and Onley will
                  fight for second and third, with dark horses like Lipowitz,
                  Gall, and Skjelmose capable of surprise top-5 finishes.
                </p>
                <p className="mb-4 leading-relaxed text-primary">
                  For bettors, the value isn&apos;t in picking against Pogačar —
                  it&apos;s in:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-primary">
                  <li>Podium positions (Almeida, Mas for Top 3)</li>
                  <li>Stage winners (sprinters, breakaway specialists)</li>
                  <li>
                    Points classification (green jersey) and King of the
                    Mountains
                  </li>
                  <li>Top-5 finishes from dark horses (Onley, Lipowitz)</li>
                </ul>
                <p className="leading-relaxed text-primary">
                  The 2026 Vuelta a España will be remembered as the race where
                  Tadej Pogačar joined cycling&apos;s most exclusive club.
                  History starts tomorrow in Monaco.
                </p>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="mb-12">
              <div className="rounded-xl border border-edge bg-surface p-6">
                <p className="text-sm leading-relaxed text-secondary">
                  <strong className="text-primary">Disclaimer:</strong> This
                  article is for informational and entertainment purposes only.
                  Betting involves risk — only wager what you can afford to lose.
                  Odds and race information accurate as of August 21, 2026.
                  Please gamble responsibly and check your local laws regarding
                  sports betting. Sources:{" "}
                  <a
                    href="https://www.thesportsgeek.com/blog/vuelta-a-espana-odds/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    TheSportsGeek
                  </a>
                  ,{" "}
                  <a
                    href="https://tips.gg/article/vuelta-a-espana-2026-odds-and-favourites-vuelta2026/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Tips.GG
                  </a>
                  ,{" "}
                  <a
                    href="https://www.bettingodds.com/cycling/vuelta-a-espana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    BettingOdds.com
                  </a>
                  ,{" "}
                  <a
                    href="https://www.domestiquecycling.com/en/features/analysing-the-2026-vuelta-a-espana-favourites/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Domestique Cycling
                  </a>
                  ,{" "}
                  <a
                    href="https://www.cyclingstage.com/vuelta-2026-favourites/contenders-spain-2026/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    CyclingStage
                  </a>
                  ,{" "}
                  <a
                    href="https://www.rouleur.cc/racing/vuelta-a-espana-2026-stage-one-preview-monaco-time-trial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Rouleur
                  </a>
                  , and{" "}
                  <a
                    href="https://www.cyclingnews.com/pro-cycling/racing/vuelta-a-espana-2026-stage-1-preview/"
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
                ← Back to Cycling Rankings
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
