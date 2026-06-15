import type { Metadata } from "next";
import Link from "next/link";
import { getAtpDeepRankingData } from "@/lib/atpDeepRanking";
import AtpDeepRankingTable from "@/components/AtpDeepRankingTable";
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
      <div data-sport="atp" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">🎾</span>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">ATP Rankings — Top 1000</h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Live
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{snapshot.weekLabel}</p>
          </div>
        </div>

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
