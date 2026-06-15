import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAtpDeepRankingData } from "@/lib/atpDeepRanking";
import AtpDeepRankingTable from "@/components/AtpDeepRankingTable";
import { RANK_BANDS, bandBySlug } from "../bands";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return RANK_BANDS.map((b) => ({ band: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ band: string }>;
}): Promise<Metadata> {
  const { band } = await params;
  const b = bandBySlug(band);
  if (!b) return { title: "ATP Rankings" };
  return {
    title: `ATP Rankings ${b.from}–${b.to} Live`,
    description: `Live ATP singles ranking for positions ${b.from} to ${b.to}: players, live points, rank movement and current tournament progress. Updated as matches finish.`,
    alternates: { canonical: `/atp-rankings/${b.slug}` },
    openGraph: {
      title: `ATP Rankings ${b.from}–${b.to} Live | Rankings123`,
      description: `Live ATP singles ranking for positions ${b.from} to ${b.to}: players, live points, rank movement and current tournament progress.`,
      url: `/atp-rankings/${b.slug}`,
      type: "website",
    },
  };
}

export default async function AtpRankingBandPage({
  params,
}: {
  params: Promise<{ band: string }>;
}) {
  const { band } = await params;
  const b = bandBySlug(band);
  if (!b) notFound();

  const snapshot = await getAtpDeepRankingData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `ATP Rankings ${b.from}–${b.to} Live | Rankings123`,
    description: `Live ATP singles ranking for positions ${b.from} to ${b.to}: players, live points, rank movement and current tournament progress.`,
    url: `https://rankings123.com/atp-rankings/${b.slug}`,
    inLanguage: "en",
  };

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
              <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                ATP Rankings {b.from}–{b.to}
              </h1>
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
          <Link
            href="/atp-rankings"
            className="rounded-full border border-edge px-3 py-1 font-medium text-muted transition hover:border-accent/50 hover:text-accent"
          >
            Full list
          </Link>
          {RANK_BANDS.map((band2) => (
            <Link
              key={band2.slug}
              href={`/atp-rankings/${band2.slug}`}
              aria-current={band2.slug === b.slug ? "page" : undefined}
              className={`rounded-full border px-3 py-1 font-medium transition ${
                band2.slug === b.slug
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-edge text-muted hover:border-accent/50 hover:text-accent"
              }`}
            >
              {band2.label}
            </Link>
          ))}
        </nav>

        <AtpDeepRankingTable initialSnapshot={snapshot} band={{ from: b.from, to: b.to }} />
      </div>
    </>
  );
}
