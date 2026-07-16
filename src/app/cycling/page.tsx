import type { Metadata } from "next";
import { getTdfSnapshot } from "@/lib/cyclingFeed";
import HeroBanner from "@/components/HeroBanner";
import SectionNav from "@/components/SectionNav";
import TdfStagesTable from "@/components/TdfStagesTable";
import TdfGCTable from "@/components/TdfGCTable";
import TdfJerseys from "@/components/TdfJerseys";

export const metadata: Metadata = {
  title: "Tour de France 2026 Live — Stages & GC Standings",
  description:
    "Live Tour de France 2026 stage schedule and General Classification standings updated in real time: stage winners, GC rankings, and race progress.",
  alternates: { canonical: "/cycling" },
  openGraph: {
    title: "Tour de France 2026 Live — Stages & GC Standings — Rankings123",
    description:
      "Live Tour de France 2026 stage schedule and General Classification standings updated in real time.",
    url: "/cycling",
    type: "website",
  },
};

export const revalidate = 300; // ISR: 5 minute cache (race updates less frequently than tennis/soccer)

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tour de France 2026 Live — Stages & GC Standings — Rankings123",
  description:
    "Live Tour de France 2026 stage schedule and General Classification standings updated in real time.",
  url: "https://rankings123.com/cycling",
  inLanguage: "en",
};

export default async function CyclingPage() {
  const tdfData = await getTdfSnapshot();

  const sections = [
    { id: "jerseys", label: "Jersey Leaders" },
    { id: "stages", label: "Stages" },
    { id: "gc", label: "General Classification" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-base">
        <HeroBanner
          sport="cycling"
          title="Tour de France 2026"
          subtitle={
            tdfData.raceStatus === "upcoming"
              ? "Starting July 4, 2026 in Barcelona"
              : tdfData.raceStatus === "active"
                ? `Stage ${tdfData.currentStage} in progress`
                : "Race Complete"
          }
          live={tdfData.raceStatus === "active"}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionNav sections={sections} />

          {/* Jersey Leaders */}
          <section id="jerseys" className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Jersey Leaders
              <span className="ml-3 text-sm font-normal text-secondary">
                Four classifications
              </span>
            </h2>
            <TdfJerseys jerseys={tdfData.jerseys} raceStatus={tdfData.raceStatus} />
          </section>

          {/* Stages */}
          <section id="stages" className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              21 Stages
              <span className="ml-3 text-sm font-normal text-secondary">
                {tdfData.source === "wikipedia" ? "via Wikipedia" : tdfData.source === "letour" ? "via LeTour.fr" : "preview data"}
              </span>
            </h2>
            <TdfStagesTable stages={tdfData.stages} currentStage={tdfData.currentStage} />
          </section>

          {/* General Classification */}
          {tdfData.gc.length > 0 && (
            <section id="gc" className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-primary">
                General Classification
                <span className="ml-3 text-sm font-normal text-secondary">
                  Overall standings
                </span>
              </h2>
              <TdfGCTable riders={tdfData.gc} />
            </section>
          )}

          {/* UCI Ranking Link */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              World Rankings
              <span className="ml-3 text-sm font-normal text-secondary">
                Live rider standings
              </span>
            </h2>
            <a
              href="/cycling/uci-ranking"
              className="block rounded-xl border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-hover"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                <h3 className="text-xl font-bold text-primary">UCI World Ranking</h3>
              </div>
              <p className="text-sm text-secondary">
                Top professional cyclists ranked by points across all disciplines and major tours
              </p>
            </a>
          </section>

          {/* Completed Races */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Completed Races
              <span className="ml-3 text-sm font-normal text-secondary">
                2026 season results
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="/events/giro-2026"
                className="rounded-xl border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-hover"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🇮🇹</span>
                  <h3 className="text-xl font-bold text-primary">Giro d&apos;Italia 2026</h3>
                </div>
                <p className="mb-3 text-sm text-secondary">May 8-31, 2026</p>
                <p className="text-sm text-primary">
                  🏆 Winner: <strong>Jonas Vingegaard</strong> (Visma–Lease a Bike)
                </p>
              </a>
              <a
                href="/events/tour-de-suisse-2026"
                className="rounded-xl border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-hover"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🇨🇭</span>
                  <h3 className="text-xl font-bold text-primary">Tour de Suisse 2026</h3>
                </div>
                <p className="mb-3 text-sm text-secondary">June 17-21, 2026</p>
                <p className="text-sm text-primary">
                  🏆 Winner: <strong>Tadej Pogačar</strong> (UAE Team Emirates XRG)
                </p>
              </a>
            </div>
          </section>

          {/* Data source notice */}
          <div className="mb-12 rounded-xl border border-edge bg-surface p-4 text-sm text-secondary">
            <p>
              <strong className="text-primary">Data Source:</strong> Stage information sourced from Wikipedia.
              {tdfData.raceStatus === "upcoming" && " General Classification will update once the race begins on July 4, 2026."}
              {tdfData.raceStatus === "active" && " General Classification updates as the race progresses."}
              {tdfData.source === "mock" && " Currently showing preview data."}
            </p>
            <p className="mt-2">
              <strong className="text-primary">Last updated:</strong>{" "}
              {new Date(tdfData.lastUpdated).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                timeZoneName: "short",
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
