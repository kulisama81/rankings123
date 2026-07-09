import type { Metadata } from "next";
import Link from "next/link";
import { getTdfSnapshot } from "@/lib/cyclingFeed";
import HeroBanner from "@/components/HeroBanner";
import TdfJerseys from "@/components/TdfJerseys";

export const metadata: Metadata = {
  title: "Tour de France 2026 — Live Standings & Stage Results",
  description:
    "Tour de France 2026 live standings, jersey leaders, stage results, and stage-by-stage coverage of cycling's premier grand tour.",
  alternates: { canonical: "/events/tdf-2026" },
  openGraph: {
    title: "Tour de France 2026 — Live Standings — Rankings123",
    description:
      "Tour de France 2026 live standings, jersey leaders, and stage results.",
    url: "/events/tdf-2026",
    type: "website",
  },
};

export const revalidate = 300; // ISR: 5 min during race

export default async function TdfOverviewPage() {
  const tdfData = await getTdfSnapshot();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "Tour de France 2026",
    description: "The 2026 Tour de France cycling race with live standings and stage results.",
    url: "https://rankings123.com/events/tdf-2026",
    sport: "Cycling",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-base">
        <HeroBanner
          icon="🚴"
          title="Tour de France 2026"
          subtitle={
            tdfData.raceStatus === "active"
              ? `Stage ${tdfData.currentStage} ${tdfData.currentStage ? "in progress" : ""}`
              : "Pre-race"
          }
          live={tdfData.raceStatus === "active"}
        />

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Jersey Leaders */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-primary">Current Jersey Leaders</h2>
            <TdfJerseys jerseys={tdfData.jerseys} raceStatus={tdfData.raceStatus} />
          </section>

          {/* Stage List */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-primary">Stages</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tdfData.stages.map((stage) => {
                const isCompleted = !!stage.winner;
                const isCurrent = tdfData.currentStage === stage.stage;

                return (
                  <Link
                    key={stage.stage}
                    href={`/events/tdf-2026/stage/${stage.stage}`}
                    className="group relative rounded-2xl border border-edge bg-surface p-6 transition hover:border-accent hover:shadow-lg"
                  >
                    {isCurrent && (
                      <span className="absolute right-4 top-4 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                      </span>
                    )}

                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-3xl font-bold text-primary">
                        {stage.stage}
                      </span>
                      {isCompleted && (
                        <span className="ml-auto text-xs text-muted">✓ Completed</span>
                      )}
                    </div>

                    <h3 className="mb-2 font-semibold text-secondary group-hover:text-accent">
                      {stage.type}
                    </h3>
                    <p className="mb-2 text-sm text-muted">{stage.course}</p>
                    <p className="text-xs text-muted">
                      {stage.date} · {stage.distance}
                    </p>

                    {stage.winner && (
                      <p className="mt-3 border-t border-edge pt-3 text-sm font-medium text-primary">
                        🏆 {stage.winner}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Data source notice */}
          <div className="mt-8 rounded-xl border border-edge bg-surface p-4 text-sm text-secondary">
            <p>
              <strong className="text-primary">Data Source:</strong> Stage
              information sourced from Wikipedia.
              {tdfData.source === "mock" && " Currently showing preview data."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
