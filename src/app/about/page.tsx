import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rankings123 is a live multi-sport rankings hub tracking ATP/WTA tennis, FIFA World Cup 2026, and cycling with real-time data from ESPN, official tour APIs, and verified sources.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Statement */}
      <div className="mb-16 text-center">
        <h1 className="type-hero text-fg">
          Rankings that update during the match,
          <br />
          not after the tournament.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Rankings123 is a live multi-sport rankings hub. We track real-time standings across tennis,
          football, and cycling — merging official rankings with in-progress tournament results so you see
          where athletes stand <em>right now</em>, not last week.
        </p>
      </div>

      {/* Sport Coverage Grid */}
      <section className="mb-16">
        <h2 className="type-title mb-8 text-center text-fg">Live Coverage</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* ATP */}
          <div
            data-sport="atp"
            className="rounded-2xl border-2 border-accent bg-surface p-6 shadow-lg transition-transform hover:scale-[1.02]"
          >
            <div className="mb-3 inline-block rounded-lg bg-accent px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-accentfg">
              ATP
            </div>
            <h3 className="mb-2 text-lg font-bold text-fg">Men&apos;s Tennis</h3>
            <p className="text-sm leading-relaxed text-muted">
              Top ~1,000 ATP rankings updated live during tournaments. Live points estimated from round
              progression.
            </p>
          </div>

          {/* WTA */}
          <div
            data-sport="wta"
            className="rounded-2xl border-2 border-accent bg-surface p-6 shadow-lg transition-transform hover:scale-[1.02]"
          >
            <div className="mb-3 inline-block rounded-lg bg-accent px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-accentfg">
              WTA
            </div>
            <h3 className="mb-2 text-lg font-bold text-fg">Women&apos;s Tennis</h3>
            <p className="text-sm leading-relaxed text-muted">
              Full WTA ranking (all active players) updated during live tournaments with estimated points from
              in-progress matches.
            </p>
          </div>

          {/* World Cup */}
          <div
            data-sport="worldcup"
            className="rounded-2xl border-2 border-accent bg-surface p-6 shadow-lg transition-transform hover:scale-[1.02]"
          >
            <div className="mb-3 inline-block rounded-lg bg-accent px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-accentfg">
              World Cup
            </div>
            <h3 className="mb-2 text-lg font-bold text-fg">FIFA 2026</h3>
            <p className="text-sm leading-relaxed text-muted">
              Live group standings, match results, and knockout bracket projections throughout the tournament.
            </p>
          </div>

          {/* Cycling */}
          <div
            data-sport="cycling"
            className="rounded-2xl border-2 border-accent bg-surface p-6 shadow-lg transition-transform hover:scale-[1.02]"
          >
            <div className="mb-3 inline-block rounded-lg bg-accent px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-accentfg">
              Cycling
            </div>
            <h3 className="mb-2 text-lg font-bold text-fg">UCI Rankings</h3>
            <p className="text-sm leading-relaxed text-muted">
              Road cycling world rankings (men&apos;s and women&apos;s) with historical context and Grand Tour
              tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Data Sourcing */}
      <section className="mb-16">
        <h2 className="type-title mb-8 text-center text-fg">Our Data</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Sources */}
          <div className="rounded-2xl bg-surface p-8 shadow-md">
            <h3 className="mb-4 text-xl font-bold text-fg">Sources</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span>
                  <strong className="font-mono text-fg">ESPN</strong> — live tennis scoreboards and match
                  status for ATP/WTA tournaments
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span>
                  <strong className="font-mono text-fg">Ultimate Tennis Statistics</strong> — deep ATP ranking
                  data (top ~1,000 players)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span>
                  <strong className="font-mono text-fg">WTA Official API</strong> — full women&apos;s tennis
                  ranking directly from the tour
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span>
                  <strong className="font-mono text-fg">ESPN Soccer API</strong> — FIFA World Cup 2026 live
                  scores, standings, and brackets
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span>
                  <strong className="font-mono text-fg">Wikipedia</strong> — supplementary context (tournament
                  formats, historical records, athlete biographies)
                </span>
              </li>
            </ul>
          </div>

          {/* Transparency */}
          <div className="rounded-2xl bg-surface p-8 shadow-md">
            <h3 className="mb-4 text-xl font-bold text-fg">Our Approach</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              Every ranking and statistic on Rankings123 traces to a real, verified source. We merge official
              rankings with live tournament data to calculate estimated standings during matches.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              When live feeds are unavailable, we fall back to bundled mock data clearly marked with a{" "}
              <code className="rounded bg-surface2 px-1.5 py-0.5 font-mono text-xs text-fg">
                source: &quot;mock&quot;
              </code>{" "}
              flag — we never fabricate or present placeholder content as real data.
            </p>
            <p className="text-sm leading-relaxed text-muted">
              Live points are <em>estimates</em> based on round progression and per-tier point tables. Official
              rankings update weekly; our live view shows where players stand if their in-progress results hold.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="mb-12">
        <h2 className="type-title mb-6 text-center text-fg">Who We Are</h2>
        <div className="mx-auto max-w-2xl rounded-2xl bg-surface p-8 text-center shadow-md">
          <p className="mb-4 leading-relaxed text-muted">
            Rankings123 is built and maintained by <strong className="text-fg">Loic Deniel</strong>, a software
            engineer and sports data enthusiast. It started as a personal project to track live tennis rankings
            during tournaments (rivaling established sites like live-tennis.eu) and has expanded to cover
            multiple sports.
          </p>
          <p className="leading-relaxed text-muted">
            The goal: create the most accurate, transparent, and up-to-date multi-sport rankings hub on the web
            — where fans can see standings move in real time, not days later.
          </p>
        </div>
      </section>
    </div>
  );
}
