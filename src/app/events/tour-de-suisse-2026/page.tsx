import type { Metadata } from "next";
import { getSuisseSnapshot } from "@/lib/suisseFeed";
import HeroBanner from "@/components/HeroBanner";
import SectionNav from "@/components/SectionNav";
import TdfGCTable from "@/components/TdfGCTable";
import TdfJerseys from "@/components/TdfJerseys";

export const metadata: Metadata = {
  title: "Tour de Suisse 2026 Final Results — GC Standings",
  description:
    "Final General Classification standings from the 2026 Tour de Suisse (June 17-21). Tadej Pogačar wins his preparation race before the Tour de France.",
  alternates: { canonical: "/events/tour-de-suisse-2026" },
  openGraph: {
    title: "Tour de Suisse 2026 Final Results — Rankings123",
    description:
      "Final GC standings from the 2026 Tour de Suisse. Tadej Pogačar wins ahead of Richard Carapaz.",
    url: "/events/tour-de-suisse-2026",
    type: "website",
  },
};

export const revalidate = 3600; // ISR: 1 hour cache (race is completed, results won't change)

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tour de Suisse 2026 Final Results — Rankings123",
  description:
    "Final General Classification standings from the 2026 Tour de Suisse.",
  url: "https://rankings123.com/events/tour-de-suisse-2026",
  inLanguage: "en",
};

export default async function Suisse2026Page() {
  const suisseData = await getSuisseSnapshot();

  const sections = [
    { id: "winner", label: "Winner" },
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
          icon="🇨🇭"
          title="Tour de Suisse 2026"
          subtitle="June 17-21, 2026 · Switzerland"
          live={false}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionNav sections={sections} />

          {/* Race Summary */}
          <div className="mb-12 rounded-xl border border-edge bg-surface p-6">
            <h3 className="mb-3 text-xl font-bold text-primary">Race Complete</h3>
            <p className="text-secondary">
              Tadej Pogačar (UAE Team Emirates XRG) won the 2026 Tour de Suisse, finishing{" "}
              6&apos;32&quot; ahead of Richard Carapaz (EF Education–EasyPost) and 6&apos;53&quot; ahead
              of Mathias Vacek (Lidl–Trek). The race served as final preparation for many riders
              ahead of the Tour de France starting July 4.
            </p>
          </div>

          {/* Winner */}
          <section id="winner" className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Overall Winner
              <span className="ml-3 text-sm font-normal text-secondary">
                General Classification
              </span>
            </h2>
            <TdfJerseys jerseys={suisseData.jerseys} raceStatus="complete" />
          </section>

          {/* Final GC Standings */}
          <section id="gc" className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Final General Classification
              <span className="ml-3 text-sm font-normal text-secondary">
                Top {suisseData.gc.length} riders
              </span>
            </h2>
            <TdfGCTable riders={suisseData.gc} />
          </section>

          {/* Data source notice */}
          <div className="mb-12 rounded-xl border border-edge bg-surface p-4 text-sm text-secondary">
            <p>
              <strong className="text-primary">Data Source:</strong> Final results sourced
              from Wikipedia. Race completed June 21, 2026.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
