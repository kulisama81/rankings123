import type { Metadata } from "next";
import Link from "next/link";
import { getTdfSnapshot } from "@/lib/cyclingFeed";
import { notFound } from "next/navigation";
import HeroBanner from "@/components/HeroBanner";
import TdfGCTable from "@/components/TdfGCTable";
import TdfJerseys from "@/components/TdfJerseys";

export async function generateMetadata(): Promise<Metadata> {
  const tdfData = await getTdfSnapshot();

  // Only show this page after the race is complete
  if (tdfData.raceStatus !== "complete") {
    return {
      title: "Tour de France 2026 — Rankings123",
      description: "Tour de France 2026 winner and final results.",
    };
  }

  const winner = tdfData.gc.length > 0 ? tdfData.gc[0] : null;
  const winnerName = winner ? winner.name : "Champion";

  const title = `Tour de France 2026 Winner: ${winnerName} Claims Yellow Jersey`;
  const description = winner
    ? `${winnerName} (${winner.country}) wins the 2026 Tour de France! Final GC top 10, all 21 stage winners, and jersey leaders from cycling's premier grand tour.`
    : "Tour de France 2026 final results, winner celebration, and complete race recap.";

  return {
    title,
    description,
    alternates: { canonical: "/events/tdf-2026/winner" },
    openGraph: {
      title: `${title} — Rankings123`,
      description,
      url: "/events/tdf-2026/winner",
      type: "article",
    },
    keywords: "tour de france 2026 winner, tdf winner 2026, tour de france champion 2026, tour de france results, tour de france final standings",
  };
}

export const revalidate = 3600; // ISR: 1 hour after race ends

export default async function TdfWinnerPage() {
  const tdfData = await getTdfSnapshot();

  // If race not complete yet, show upcoming message
  if (tdfData.raceStatus !== "complete") {
    return (
      <div className="min-h-screen bg-base">
        <HeroBanner
          sport="cycling"
          title="Tour de France 2026 Winner"
          subtitle="Race in progress — check back after the final stage on July 27"
        />
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/events/tdf-2026"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-fg"
          >
            ← Back to Tour de France overview
          </Link>
          <div className="rounded-2xl border border-edge bg-surface p-8 text-center">
            <p className="text-lg text-secondary">
              The Tour de France 2026 is currently in progress. This page will display the winner and final results once the race concludes on July 27.
            </p>
            <Link
              href="/events/tdf-2026"
              className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-accentfg transition hover:bg-accent/90"
            >
              View Live Standings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const winner = tdfData.gc.length > 0 ? tdfData.gc[0] : null;

  if (!winner) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "Tour de France 2026",
    description: `${winner.name} wins the 2026 Tour de France`,
    url: "https://rankings123.com/events/tdf-2026/winner",
    sport: "Cycling",
    endDate: "2026-07-27",
    competitor: {
      "@type": "Person",
      name: winner.name,
      nationality: winner.country,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-base">
        <HeroBanner
          sport="cycling"
          title="🏆 Tour de France 2026 Winner"
          subtitle={`${winner.name} claims the yellow jersey`}
        />

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/events/tdf-2026"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-fg"
          >
            ← Back to Tour de France overview
          </Link>

          {/* Winner Hero Card */}
          <div className="mb-12 overflow-hidden rounded-3xl border border-accent bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-4 border-accent bg-accent/10">
                <span className="text-6xl">{winner.flag}</span>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <p className="mb-2 text-sm uppercase tracking-wide text-muted">
                  2026 Tour de France Champion
                </p>
                <h2 className="mb-3 font-display text-4xl font-extrabold text-primary sm:text-5xl">
                  {winner.name}
                </h2>
                <p className="mb-4 text-lg text-secondary">
                  {winner.team} • {winner.country}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-start">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted">Final Time</p>
                    <p className="font-display text-2xl font-bold text-accent">
                      {winner.time}
                    </p>
                  </div>
                  {winner.gap && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted">Margin</p>
                      <p className="font-display text-2xl font-bold text-primary">
                        {winner.gap}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Jersey Leaders */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-primary">Final Jersey Leaders</h2>
            <TdfJerseys jerseys={tdfData.jerseys} raceStatus="complete" />
          </section>

          {/* Final GC Top 10 */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-primary">
              Final General Classification — Top 10
            </h2>
            <TdfGCTable riders={tdfData.gc.slice(0, 10)} />
          </section>

          {/* Stage Winners Table */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-primary">
              All 21 Stage Winners
            </h2>
            <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-edge bg-surface2">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Stage
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Winner
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted sm:table-cell">
                      Course
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-edge">
                  {tdfData.stages.map((stage) => (
                    <tr
                      key={stage.stage}
                      className="transition hover:bg-surface2/50"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/events/tdf-2026/stage/${stage.stage}`}
                          className="font-semibold text-accent hover:underline"
                        >
                          {stage.stage}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary">
                        {stage.type}
                      </td>
                      <td className="px-4 py-3 font-medium text-primary">
                        {stage.winner || "—"}
                      </td>
                      <td className="hidden px-4 py-3 text-sm text-secondary sm:table-cell">
                        {stage.course}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Data source notice */}
          <div className="rounded-xl border border-edge bg-surface p-4 text-sm text-secondary">
            <p>
              <strong className="text-primary">Data Source:</strong> Race
              results sourced from Wikipedia.
              {tdfData.source === "mock" && " Currently showing preview data."}
            </p>
            <p className="mt-2 text-xs text-muted">
              Final results from the 2026 Tour de France, concluded July 27, 2026.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
