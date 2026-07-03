import type { Metadata } from "next";
import { getGiroSnapshot } from "@/lib/giroFeed";
import HeroBanner from "@/components/HeroBanner";
import SectionNav from "@/components/SectionNav";
import TdfGCTable from "@/components/TdfGCTable";
import TdfJerseys from "@/components/TdfJerseys";

export const metadata: Metadata = {
  title: "Giro d'Italia 2026 Final Results — GC Standings & Jersey Winners",
  description:
    "Final General Classification standings and jersey winners from the 2026 Giro d'Italia (May 8-31). Jonas Vingegaard wins the maglia rosa.",
  alternates: { canonical: "/events/giro-2026" },
  openGraph: {
    title: "Giro d'Italia 2026 Final Results — Rankings123",
    description:
      "Final GC standings and jersey winners from the 2026 Giro d'Italia. Jonas Vingegaard wins the maglia rosa.",
    url: "/events/giro-2026",
    type: "website",
  },
};

export const revalidate = 3600; // ISR: 1 hour cache (race is completed, results won't change)

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Giro d'Italia 2026 Final Results — Rankings123",
  description:
    "Final General Classification standings and jersey winners from the 2026 Giro d'Italia.",
  url: "https://rankings123.com/events/giro-2026",
  inLanguage: "en",
};

export default async function Giro2026Page() {
  const giroData = await getGiroSnapshot();

  const sections = [
    { id: "jerseys", label: "Jersey Winners" },
    { id: "gc", label: "Final GC Standings" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-base">
        <HeroBanner
          icon="🇮🇹"
          title="Giro d'Italia 2026"
          subtitle="May 8-31, 2026 · Nessebar, Bulgaria → Rome, Italy"
          live={false}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionNav sections={sections} />

          {/* Race Summary */}
          <div className="mb-12 rounded-xl border border-edge bg-surface p-6">
            <h3 className="mb-3 text-xl font-bold text-primary">Race Complete</h3>
            <p className="text-secondary">
              Jonas Vingegaard (Visma–Lease a Bike) won the 2026 Giro d&apos;Italia, finishing{" "}
              5&apos;22&quot; ahead of Felix Gall (Decathlon CMA CGM) and 6&apos;25&quot; ahead of Jai Hindley
              (Red Bull–Bora–Hansgrohe). The race covered 21 stages from Nessebar, Bulgaria
              to Rome, Italy over 24 days.
            </p>
          </div>

          {/* Jersey Winners */}
          <section id="jerseys" className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Jersey Winners
              <span className="ml-3 text-sm font-normal text-secondary">
                Final classification leaders
              </span>
            </h2>
            <TdfJerseys jerseys={giroData.jerseys} raceStatus="complete" />
          </section>

          {/* Final GC Standings */}
          <section id="gc" className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Final General Classification
              <span className="ml-3 text-sm font-normal text-secondary">
                Top 20 riders
              </span>
            </h2>
            <TdfGCTable riders={giroData.gc} />
          </section>

          {/* Data source notice */}
          <div className="mb-12 rounded-xl border border-edge bg-surface p-4 text-sm text-secondary">
            <p>
              <strong className="text-primary">Data Source:</strong> Final results sourced
              from Wikipedia. Race completed May 31, 2026.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
