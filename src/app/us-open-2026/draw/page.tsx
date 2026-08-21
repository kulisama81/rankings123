import type { Metadata } from "next";
import { getLiveData } from "@/lib/liveFeed";
import UsOpenDrawView from "@/components/UsOpenDrawView";

export const metadata: Metadata = {
  title: "US Open 2026 Draw — Men's & Women's Singles Brackets | Rankings123",
  description:
    "US Open 2026 draw and brackets for men's and women's singles. Live seeding, draw ceremony countdown, and full bracket after Aug 27. Track your favorite players' paths to the title.",
  keywords: [
    "us open 2026 draw",
    "us open draw",
    "us open bracket",
    "us open 2026 bracket",
    "us open seeding",
    "us open draw ceremony",
    "atp us open draw",
    "wta us open draw",
  ],
  alternates: { canonical: "/us-open-2026/draw" },
  openGraph: {
    title: "US Open 2026 Draw — Men's & Women's Singles Brackets",
    description:
      "Live US Open 2026 draw and brackets. Seeding preview, draw ceremony countdown, and full bracket tracking.",
    url: "/us-open-2026/draw",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "US Open 2026 Draw — Men's & Women's Singles Brackets",
    description:
      "US Open 2026 draw ceremony Aug 27. Track seeding, brackets, and title paths.",
  },
};

export const dynamic = "force-dynamic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "US Open 2026 Draw Ceremony",
  description:
    "US Open 2026 singles draw for men's and women's championships. Draw ceremony August 27, 2026.",
  startDate: "2026-08-27",
  endDate: "2026-08-27",
  eventStatus: "https://schema.org/EventScheduled",
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
  url: "https://rankings123.com/us-open-2026/draw",
};

export default async function UsOpenDrawPage() {
  // Fetch live ATP and WTA data for seeding preview
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
      <UsOpenDrawView atpSnapshot={atpSnapshot} wtaSnapshot={wtaSnapshot} />
    </>
  );
}
