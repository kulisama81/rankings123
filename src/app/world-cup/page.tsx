import type { Metadata } from "next";
import { getWorldCupData } from "@/lib/worldCupFeed";
import WorldCupTable from "@/components/WorldCupTable";
import HeroBanner from "@/components/HeroBanner";

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
      <div data-sport="worldcup" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <HeroBanner
          icon="⚽"
          title="World Cup 2026 Live"
          subtitle={`FIFA World Cup 2026 · ${snapshot.stageLabel}`}
          stats={[
            { label: "Live now", value: String(snapshot.matches.filter((m) => m.state === "in").length) },
            { label: "Groups", value: String(snapshot.groups.length) },
            { label: "Matches", value: String(snapshot.matches.length) },
          ]}
        />
        <WorldCupTable initialSnapshot={snapshot} />
      </div>
    </>
  );
}
