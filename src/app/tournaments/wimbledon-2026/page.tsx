import type { Metadata } from "next";
import { getLiveData } from "@/lib/liveFeed";
import WimbledonTournamentView from "@/components/WimbledonTournamentView";

export const metadata: Metadata = {
  title: "Wimbledon 2026 Live Rankings & Results",
  description:
    "Live ATP and WTA rankings during Wimbledon 2026 (June 29 - July 12). Real-time points updates, match scores, and ranking projections as the tournament unfolds.",
  alternates: { canonical: "/tournaments/wimbledon-2026" },
  openGraph: {
    title: "Wimbledon 2026 Live Rankings & Results — Rankings123",
    description:
      "Live ATP and WTA rankings during Wimbledon 2026. Real-time points updates, match scores, and ranking projections.",
    url: "/tournaments/wimbledon-2026",
    type: "website",
  },
  keywords: [
    "wimbledon 2026",
    "wimbledon live rankings",
    "wimbledon results",
    "wimbledon 2026 scores",
    "wimbledon live scores today",
    "wimbledon tennis results",
    "atp wimbledon",
    "wta wimbledon",
  ],
};

// Force dynamic rendering for real-time tournament data
export const dynamic = "force-dynamic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "Wimbledon Championships 2026",
  description:
    "Live rankings and results from Wimbledon 2026, The Championships. Real-time ATP and WTA ranking updates.",
  startDate: "2026-06-29",
  endDate: "2026-07-12",
  location: {
    "@type": "Place",
    name: "All England Lawn Tennis and Croquet Club",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wimbledon",
      addressRegion: "London",
      addressCountry: "GB",
    },
  },
  sport: "Tennis",
  url: "https://rankings123.com/tournaments/wimbledon-2026",
};

export default async function WimbledonPage() {
  // Fetch both ATP and WTA live data
  const [atpSnapshot, wtaSnapshot] = await Promise.all([
    getLiveData("atp"),
    getLiveData("wta"),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="tennis" data-tournament="wimbledon">
        <WimbledonTournamentView
          atpSnapshot={atpSnapshot}
          wtaSnapshot={wtaSnapshot}
        />
      </div>
    </>
  );
}
