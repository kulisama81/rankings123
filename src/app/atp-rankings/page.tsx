import type { Metadata } from "next";
import Link from "next/link";
import { getAtpDeepRankingData } from "@/lib/atpDeepRanking";
import AtpDeepRankingTable from "@/components/AtpDeepRankingTable";
import { RANK_BANDS } from "./bands";

export const metadata: Metadata = {
  title: "ATP Rankings — Top 1000 Live | Rankings123",
  description:
    "The full live ATP singles ranking, top 1000. See emerging and up-and-coming players beyond the top 100, with live points, rank movement and current tournament progress. Searchable and paginated.",
};

export const dynamic = "force-dynamic";

export default async function AtpRankingsPage() {
  const snapshot = await getAtpDeepRankingData();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">🎾</span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">ATP Rankings — Top 1000</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              LIVE
            </span>
          </div>
          <p className="text-sm text-gray-500">{snapshot.weekLabel}</p>
        </div>
      </div>

      <nav className="mb-5 flex flex-wrap gap-2 text-xs" aria-label="Rank bands">
        {RANK_BANDS.map((b) => (
          <Link
            key={b.slug}
            href={`/atp-rankings/${b.slug}`}
            className="rounded-full border border-gray-200 px-3 py-1 font-medium text-gray-600 hover:border-green-300 hover:text-green-700"
          >
            {b.label}
          </Link>
        ))}
      </nav>

      <AtpDeepRankingTable initialSnapshot={snapshot} />
    </div>
  );
}
