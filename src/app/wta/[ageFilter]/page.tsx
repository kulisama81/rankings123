import type { Metadata } from "next";
import { getLiveData } from "@/lib/liveFeed";
import LiveRankingView from "@/components/LiveRankingView";
import { generateBreadcrumbSchema, JsonLd } from "@/lib/structuredData";
import { notFound } from "next/navigation";

export const revalidate = 60;

type AgeFilter = "under-21" | "under-24" | "under-25" | "over-30" | "over-35";

const AGE_FILTERS: Record<AgeFilter, { maxAge?: number; minAge?: number; label: string }> = {
  "under-21": { maxAge: 20, label: "Under-21" },
  "under-24": { maxAge: 23, label: "Under-24" },
  "under-25": { maxAge: 24, label: "Under-25" },
  "over-30": { minAge: 30, label: "Over-30" },
  "over-35": { minAge: 35, label: "Over-35" },
};

function isAgeFilter(value: string): value is AgeFilter {
  return value in AGE_FILTERS;
}

export async function generateStaticParams() {
  return Object.keys(AGE_FILTERS).map((ageFilter) => ({ ageFilter }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ageFilter: string }>;
}): Promise<Metadata> {
  const { ageFilter } = await params;
  if (!isAgeFilter(ageFilter)) return {};

  const filter = AGE_FILTERS[ageFilter];
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  const title = `Best ${filter.label} WTA Players ${month} ${year} | Live Rankings`;
  const description = `Live WTA ranking for ${filter.label.toLowerCase()} players ${month} ${year}. Real-time points, rank movement, and tournament progress for the ${filter.label.toLowerCase()} age group.`;

  return {
    title,
    description,
    alternates: { canonical: `/wta/${ageFilter}` },
    openGraph: {
      title: `${title} — Rankings123`,
      description,
      url: `/wta/${ageFilter}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function WtaAgeRankingPage({
  params,
}: {
  params: Promise<{ ageFilter: string }>;
}) {
  const { ageFilter } = await params;
  if (!isAgeFilter(ageFilter)) {
    notFound();
  }

  const filter = AGE_FILTERS[ageFilter];
  const snapshot = await getLiveData("wta");

  // Filter players by age
  const filteredPlayers = snapshot.players.filter((player) => {
    if (filter.maxAge !== undefined && player.age > filter.maxAge) return false;
    if (filter.minAge !== undefined && player.age < filter.minAge) return false;
    return true;
  });

  // Re-rank within age group (preserve original rank for reference)
  const rankedPlayers = filteredPlayers.map((player, index) => ({
    ...player,
    ageGroupRank: index + 1,
  }));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "WTA Rankings", url: "/wta-live" },
    { name: `${filter.label} Rankings` },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `WTA ${filter.label} Rankings — Rankings123`,
    description: `Live WTA ranking for ${filter.label.toLowerCase()} players. Real-time points, rank movement, and tournament progress.`,
    url: `https://rankings123.com/wta/${ageFilter}`,
    inLanguage: "en",
    breadcrumb: breadcrumbSchema,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-fg sm:text-4xl">
            Best {filter.label} WTA Players
          </h1>
          <p className="mt-2 text-muted">
            Live ranking for {filter.label.toLowerCase()} WTA players, filtered by age. Updates in real-time during tournaments.
          </p>
          <div className="mt-4 rounded-lg bg-surface border border-edge p-4">
            <p className="text-sm text-secondary">
              <strong>{rankedPlayers.length}</strong> players aged{" "}
              {filter.maxAge ? `${filter.maxAge} and under` : `${filter.minAge}+`} currently ranked in the WTA.
              Showing their overall WTA rank and live points.
            </p>
          </div>
        </div>

        <LiveRankingView
          snapshot={{ ...snapshot, players: rankedPlayers }}
          showAgeGroupRank={true}
        />
      </div>
    </>
  );
}
