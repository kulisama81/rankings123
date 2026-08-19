import type { Metadata } from "next";
import { getRaceData } from "@/lib/raceFeed";
import LiveRankingView from "@/components/LiveRankingView";
import YouTubeHighlights from "@/components/YouTubeHighlights";
import Breadcrumb from "@/components/Breadcrumb";
import { YOUTUBE_HIGHLIGHTS } from "@/config/youtube";
import { generateBreadcrumbSchema, JsonLd } from "@/lib/structuredData";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const snapshot = await getRaceData("atp");
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  // Get top 3 in the race
  const top3 = snapshot.players
    .slice(0, 3)
    .map((p, i) => {
      const lastName = p.name.split(" ").pop() || p.name;
      return `${i + 1}. ${lastName}`;
    })
    .join(", ");

  const leader = snapshot.players[0] ? snapshot.players[0].name.split(" ").pop() : "Leader";
  const title = `ATP Race to Turin ${month} ${year} — ${leader} Leads`;
  const description = `ATP Race to Turin ${month} ${year}: ${top3}. Year-to-date points rankings for ATP Finals qualification. See who's leading the race to the season-ending championship.`;

  return {
    title,
    description,
    alternates: { canonical: "/atp-race" },
    openGraph: {
      title: `${title} — Rankings123`,
      description,
      url: "/atp-race",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Rankings123`,
      description,
    },
  };
}

export default async function AtpRacePage() {
  const snapshot = await getRaceData("atp");

  // Structured data for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "ATP Race to Turin" },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "ATP Race to Turin — Rankings123",
    description:
      "ATP Race to Turin: Year-to-date points rankings for ATP Finals qualification.",
    url: "https://rankings123.com/atp-race",
    inLanguage: "en",
    breadcrumb: breadcrumbSchema,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbSchema} />
      <div data-sport="atp">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { name: "Home", url: "/" },
              { name: "ATP Race to Turin" },
            ]}
          />
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-fg mb-2">
              ATP Race to Turin
            </h1>
            <p className="text-muted">
              Year-to-date points only (resets January 1). Top 8 qualify for the ATP Finals.
              Race points = current season performance only.
            </p>
          </div>
          <LiveRankingView tour="atp" snapshot={snapshot} />
          <div className="mt-12">
            <YouTubeHighlights
              videoId={YOUTUBE_HIGHLIGHTS.atp.videoId}
              title={YOUTUBE_HIGHLIGHTS.atp.title}
            />
          </div>
        </div>
      </div>
    </>
  );
}
