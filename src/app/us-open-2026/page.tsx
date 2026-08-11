import type { Metadata } from "next";
import { getLiveData } from "@/lib/liveFeed";
import UsOpenTournamentView from "@/components/UsOpenTournamentView";

export async function generateMetadata(): Promise<Metadata> {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  return {
    title: `US Open ${year} Draw, Live Scores & Results`,
    description: `US Open ${year} live draws, scores, and results ${month}. Track ATP and WTA players, brackets, seeding, and ranking points implications for each round. Real-time updates during the tournament.`,
    alternates: { canonical: "/us-open-2026" },
    openGraph: {
      title: `US Open ${year} Draw, Live Scores & Results — Rankings123`,
      description: `Live US Open ${year} draws, scores, brackets, and ranking points. Real-time ATP and WTA tournament coverage.`,
      url: "/us-open-2026",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `US Open ${year} Draw, Live Scores & Results`,
      description: `Live US Open ${year} draws, scores, brackets, and ranking points. Real-time tournament coverage.`,
    },
    keywords: [
      "us open 2026",
      "us open draw",
      "us open bracket",
      "us open live scores",
      "us open results",
      "us open 2026 scores",
      "us open live scores today",
      "us open tennis results",
      "atp us open",
      "wta us open",
      "us open seeding",
      "us open ranking points",
    ],
  };
}

// Force dynamic rendering for real-time tournament data
export const dynamic = "force-dynamic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "US Open Tennis Championships 2026",
  description:
    "Live draws, scores, and results from the US Open 2026. Real-time ATP and WTA ranking updates, brackets, and points implications.",
  startDate: "2026-08-30",
  endDate: "2026-09-13",
  location: {
    "@type": "Place",
    name: "USTA Billie Jean King National Tennis Center",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Flushing",
      addressRegion: "New York",
      addressCountry: "US",
    },
  },
  sport: "Tennis",
  url: "https://rankings123.com/us-open-2026",
};

export default async function UsOpenPage() {
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
      <div data-sport="tennis" data-tournament="usopen">
        <UsOpenTournamentView
          atpSnapshot={atpSnapshot}
          wtaSnapshot={wtaSnapshot}
        />
      </div>
    </>
  );
}
