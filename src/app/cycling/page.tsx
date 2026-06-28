import type { Metadata } from "next";
import { getTdfSnapshot } from "@/lib/cyclingFeed";
import HeroBanner from "@/components/HeroBanner";
import SectionNav from "@/components/SectionNav";
import TdfStagesTable from "@/components/TdfStagesTable";
import TdfGCTable from "@/components/TdfGCTable";

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
          icon="🚴"
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

          {/* Data source notice */}
          <div className="mb-12 rounded-xl border border-edge bg-surface p-4 text-sm text-secondary">
            <p>
              <strong className="text-primary">Data Source:</strong> Stage information sourced from Wikipedia.
              General Classification will update once the race begins on July 4, 2026.
              {tdfData.source === "mock" && " Currently showing preview data."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
