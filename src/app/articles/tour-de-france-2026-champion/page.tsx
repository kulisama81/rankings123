import type { Metadata } from "next";
import Link from "next/link";
import { getTdfSnapshot } from "@/lib/cyclingFeed";

export const metadata: Metadata = {
  title: "Tour de France 2026 Champion — Final Results | Rankings123",
  description:
    "Tour de France 2026 final results and champion. Complete final GC standings, stage winners, and what's next for cycling.",
  openGraph: {
    title: "Tour de France 2026 Champion — Final Results",
    description:
      "Tour de France 2026 final results, GC standings, and cycling's next big races.",
    type: "article",
  },
};

export default async function TourDeFrance2026ChampionPage() {
  const tdfData = await getTdfSnapshot(60); // 1min revalidation for post-race

  // Extract podium from GC (top 3)
  const podium = tdfData.gc.slice(0, 3);
  const hasRealData = podium.length > 0 && tdfData.source !== "mock";

  // Get notable stage winners (first, final, key mountain stages)
  const notableStages = [
    tdfData.stages.find((s) => s.stage === 1), // Opening TTT
    tdfData.stages.find((s) => s.stage === 13), // First mountain stage
    tdfData.stages.find((s) => s.stage === 17), // Alpe d&apos;Huez
    tdfData.stages.find((s) => s.stage === 21), // Champs-Élysées
  ].filter(Boolean);

  // If no real data available, show fallback message
  if (!hasRealData) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-edge bg-surface2 p-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-fg">
            Tour de France 2026 Final Results
          </h1>
          <p className="text-muted">
            Final results are currently unavailable. Please check back soon or visit the{" "}
            <Link href="/cycling" className="text-accent hover:underline">
              live cycling page
            </Link>
            .
          </p>
          <p className="mt-4 text-sm text-muted">
            Data source: {tdfData.source}
          </p>
        </div>
      </div>
    );
  }

  const champion = podium[0];
  const runnerUp = podium[1];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose prose-lg mx-auto dark:prose-invert">
        <header className="not-prose mb-8 border-b border-edge pb-6">
          <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
            Tour de France 2026
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            {champion.name} Wins 2026 Tour de France
          </h1>
          <p className="text-xl text-muted-hover">
            {champion.name} ({champion.team}) claims the yellow jersey
            {runnerUp && ` with victory over ${runnerUp.name}`}
          </p>
          <div className="mt-4 text-sm text-muted">
            July 26, 2026 · Paris, France
          </div>
        </header>

        <div className="not-prose mb-8 rounded-lg bg-surface2 p-6">
          <h2 className="mb-4 text-2xl font-bold text-fg">Final Podium</h2>
          <div className="space-y-3">
            {podium.map((rider, idx) => (
              <div
                key={rider.rank}
                className="flex items-center justify-between rounded-md bg-bg p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-10 items-center justify-center rounded-full text-lg font-bold ${
                      idx === 0
                        ? "bg-yellow-400 text-yellow-900 dark:bg-yellow-500 dark:text-yellow-950"
                        : idx === 1
                          ? "bg-surface2 text-fg"
                          : "bg-amber-600 text-bg dark:bg-amber-700"
                    }`}
                  >
                    {rider.rank}
                  </div>
                  <div>
                    <div className="font-bold text-fg">
                      {rider.flag} {rider.name}
                    </div>
                    <div className="text-sm text-muted">{rider.team}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-semibold text-fg">
                    {rider.time}
                  </div>
                  {rider.gap && (
                    <div className="text-sm text-muted">{rider.gap}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="lead">
          <strong>PARIS</strong> — {champion.name} ({champion.team}) sealed
          the Tour de France title on Sunday, crossing the finish line on
          the Champs-Élysées
          {runnerUp && ` with victory over runner-up ${runnerUp.name} (${runnerUp.team})`}.
        </p>

        <p>
          The champion&apos;s victory was secured through dominant performances
          in the mountain stages through the Alps, establishing an unassailable
          lead heading into the final ceremonial stage in Paris.
        </p>

        <h2>Race Highlights</h2>

        <p>
          The 2026 Tour de France began with a team time trial in Barcelona
          and covered 3,245 kilometers over 21 stages, featuring brutal Alpine
          climbs including multiple summit finishes and the iconic Alpe d&apos;Huez.
        </p>

        <div className="not-prose my-6">
          <h3 className="mb-3 text-lg font-bold text-fg">
            Notable Stage Winners
          </h3>
          <div className="space-y-2">
            {notableStages.map((stage) => (
              <div
                key={stage?.stage}
                className="flex items-center justify-between rounded-md bg-surface2 p-3 text-sm"
              >
                <div>
                  <span className="font-semibold text-fg">
                    Stage {stage?.stage}
                  </span>
                  <span className="mx-2 text-muted">·</span>
                  <span className="text-muted">{stage?.course}</span>
                </div>
                <div className="font-medium text-fg">{stage?.winner}</div>
              </div>
            ))}
          </div>
        </div>

        <h2>Classification Winners</h2>

        <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
          {tdfData.jerseys.map((jersey) => (
            <div
              key={jersey.jersey}
              className="rounded-lg bg-surface2 p-4"
            >
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                {jersey.jerseyName}
              </div>
              <div className="font-bold text-fg">
                {jersey.rider || "Not awarded"}
              </div>
              {jersey.team && (
                <div className="text-sm text-muted">{jersey.team}</div>
              )}
            </div>
          ))}
        </div>

        <h2>What&apos;s Next: The Vuelta a España</h2>

        <p>
          With the Tour complete, attention turns to the final Grand Tour of
          the season. The <strong>Vuelta a España 2026</strong> begins August
          23 in Lisbon, Portugal, offering riders a chance at redemption or
          additional glory.
        </p>

        <p>
          The 2026 cycling season continues with the Canadian classics in
          September, followed by the World Championships in Zürich. For those
          looking ahead, the 2027 Tour de France will mark the 114th edition of
          cycling&apos;s most prestigious race.
        </p>

        <div className="not-prose mt-8 rounded-lg border border-edge bg-surface2 p-6">
          <h3 className="mb-3 text-lg font-bold text-fg">
            Follow Live Cycling Rankings
          </h3>
          <p className="mb-4 text-muted">
            Track the UCI World Ranking and upcoming cycling events with
            real-time standings and race results.
          </p>
          <Link
            href="/cycling"
            className="btn-base btn-primary inline-block rounded-lg px-6 py-2 font-semibold"
          >
            View Live Cycling Rankings →
          </Link>
        </div>

        <footer className="not-prose mt-12 border-t border-edge pt-6 text-sm text-muted">
          <p>
            <strong>Data source:</strong>{" "}
            {tdfData.source === "wikipedia"
              ? "Wikipedia · Live race data"
              : "Mock fallback data"}
          </p>
          <p className="mt-2">
            Last updated: {new Date(tdfData.lastUpdated).toLocaleString()}
          </p>
        </footer>
      </article>
    </div>
  );
}
