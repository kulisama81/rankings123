import type { Metadata } from "next";
import Link from "next/link";
import { getAtpDeepRankingData } from "@/lib/atpDeepRanking";
import AtpDeepRankingTable from "@/components/AtpDeepRankingTable";
import HeroBanner from "@/components/HeroBanner";
import { RANK_BANDS } from "./bands";

export const metadata: Metadata = {
  title: "ATP Rankings — Top 1000 Live",
  description:
    "The full live ATP singles ranking, top 1000. See emerging and up-and-coming players beyond the top 100, with live points, rank movement and current tournament progress.",
  alternates: { canonical: "/atp-rankings" },
  openGraph: {
    title: "ATP Rankings — Top 1000 Live | Rankings123",
    description:
      "The full live ATP singles ranking, top 1000. See emerging and up-and-coming players beyond the top 100, with live points, rank movement and current tournament progress.",
    url: "/atp-rankings",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ATP Rankings — Top 1000 Live | Rankings123",
  description:
    "The full live ATP singles ranking, top 1000. See emerging and up-and-coming players beyond the top 100.",
  url: "https://rankings123.com/atp-rankings",
  inLanguage: "en",
};

export default async function AtpRankingsPage() {
  const snapshot = await getAtpDeepRankingData();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-sport="atp" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <HeroBanner
          icon="🎾"
          title="ATP Rankings — Top 1000"
          subtitle={snapshot.weekLabel}
          stats={[
            { label: "Live #1", value: snapshot.players[0] ? `${snapshot.players[0].flag} ${snapshot.players[0].name}` : "—" },
            { label: "Ranked", value: snapshot.total.toLocaleString() },
            { label: "In play", value: String(snapshot.players.filter((p) => p.tournament?.active).length) },
          ]}
        />

        <nav className="mb-5 flex flex-wrap gap-2 text-xs" aria-label="Rank bands">
          {RANK_BANDS.map((b) => (
            <Link
              key={b.slug}
              href={`/atp-rankings/${b.slug}`}
              className="rounded-full border border-edge px-3 py-1 font-medium text-muted transition hover:border-accent/50 hover:text-accent"
            >
              {b.label}
            </Link>
          ))}
        </nav>

        <AtpDeepRankingTable initialSnapshot={snapshot} />
      </div>
    </>
  );
}
