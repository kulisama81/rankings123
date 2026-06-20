import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWtaDeepRankingData } from "@/lib/wtaDeepRanking";
import { RANK_BANDS, bandBySlug } from "../bands";
import AtpDeepRankingTable from "@/components/AtpDeepRankingTable";
import HeroBanner from "@/components/HeroBanner";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return RANK_BANDS.map((b) => ({ band: b.slug }));
}

interface BandPageProps {
  params: Promise<{ band: string }>;
}

export async function generateMetadata({ params }: BandPageProps): Promise<Metadata> {
  const { band: bandSlug } = await params;
  const band = bandBySlug(bandSlug);
  if (!band)
    return {
      title: "Not Found",
    };
  return {
    title: `WTA Rankings ${band.label} — Women's Tennis`,
    description: `WTA tennis ranking ${band.label}: official points, rank movement, and current tournament progress.`,
    alternates: { canonical: `/wta-rankings/${band.slug}` },
    openGraph: {
      title: `WTA Rankings ${band.label} — Rankings123`,
      description: `WTA tennis ranking ${band.label}: official points, rank movement, and tournament progress.`,
      url: `/wta-rankings/${band.slug}`,
      type: "website",
    },
  };
}

export default async function WtaRankingBandPage({ params }: BandPageProps) {
  const { band: bandSlug } = await params;
  const band = bandBySlug(bandSlug);
  if (!band) notFound();

  const snapshot = await getWtaDeepRankingData();
  const players = snapshot.players.filter((p) => p.liveRank >= band.from && p.liveRank <= band.to);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `WTA Rankings ${band.label} — Rankings123`,
    description: `WTA tennis ranking ${band.label}: official points, rank movement, and current tournament progress.`,
    url: `https://rankings123.com/wta-rankings/${band.slug}`,
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="wta" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <HeroBanner
          icon="🎾"
          title={`WTA Rankings ${band.label}`}
          subtitle={snapshot.weekLabel}
          stats={[
            { label: "Band", value: band.label },
            { label: "Players", value: String(players.length) },
          ]}
        />
        <AtpDeepRankingTable initialSnapshot={snapshot} band={band} apiEndpoint="/api/wta/rankings" />
      </div>
    </>
  );
}
