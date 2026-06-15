import type { Metadata } from "next";
import { getWorldCupData } from "@/lib/worldCupFeed";
import WorldCupTable from "@/components/WorldCupTable";

export const metadata: Metadata = {
  title: "World Cup 2026 Live — Group Standings & Results",
  description:
    "Live FIFA World Cup 2026 group standings and fixtures updated in real time: points, goal difference, advancement, and today's scores.",
  alternates: { canonical: "/world-cup" },
  openGraph: {
    title: "World Cup 2026 Live — Group Standings & Results — Rankings123",
    description:
      "Live FIFA World Cup 2026 group standings and fixtures updated in real time: points, goal difference, advancement, and today's scores.",
    url: "/world-cup",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "World Cup 2026 Live — Group Standings & Results — Rankings123",
  description:
    "Live FIFA World Cup 2026 group standings and fixtures updated in real time.",
  url: "https://rankings123.com/world-cup",
  inLanguage: "en",
};

export default async function WorldCupPage() {
  const snapshot = await getWorldCupData();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="worldcup" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">⚽</span>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">World Cup 2026 Live</h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Live
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">FIFA World Cup 2026 · {snapshot.stageLabel}</p>
          </div>
        </div>
        <WorldCupTable initialSnapshot={snapshot} />
      </div>
    </>
  );
}
