import type { Metadata } from "next";
import { getCyclingRaceById } from "@/lib/cyclingFeed";
import { CYCLING_RACES } from "@/data/cyclingRaces";
import HeroBanner from "@/components/HeroBanner";
import SectionNav from "@/components/SectionNav";
import TdfStagesTable from "@/components/TdfStagesTable";
import TdfGCTable from "@/components/TdfGCTable";
import TdfJerseys from "@/components/TdfJerseys";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ raceId: string }>;
}

export async function generateStaticParams() {
  return CYCLING_RACES.map((race) => ({
    raceId: race.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { raceId } = await params;
  const raceData = await getCyclingRaceById(raceId);

  if (!raceData) {
    return {
      title: "Race Not Found",
      description: "The requested cycling race could not be found.",
    };
  }

  const { metadata: race, raceStatus, gc } = raceData;
  const isComplete = raceStatus === "complete" || raceStatus === "archived";
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  const leader = gc[0];
  const leaderName = leader ? `${leader.name} leads` : "Live updates";

  const title = isComplete
    ? `${race.name} Final Results — ${leader?.name || "Champion"} Wins`
    : `${race.name} ${month} — ${leaderName}`;

  const description = isComplete
    ? `${race.name} final results: ${leader?.name || "Winner"} wins. Complete stage results, final GC standings, and race recap.`
    : `Live ${race.name} ${month} ${year}: ${leaderName}. Real-time stage results, GC standings, and jersey leaders updated daily.`;

  return {
    title,
    description,
    alternates: { canonical: `/cycling/${raceId}` },
    openGraph: {
      title: `${title} — Rankings123`,
      description,
      url: `/cycling/${raceId}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Rankings123`,
      description,
    },
  };
}

export const revalidate = 300; // ISR: 5 minute cache

export default async function RacePage({ params }: Props) {
  const { raceId } = await params;
  const raceData = await getCyclingRaceById(raceId);

  if (!raceData) {
    notFound();
  }

  const { metadata: race, raceStatus, currentStage, jerseys, stages, gc, source } = raceData;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${race.name} — Stages & GC Standings — Rankings123`,
    description: `${race.name} stage schedule and General Classification standings.`,
    url: `https://rankings123.com/cycling/${raceId}`,
    inLanguage: "en",
  };

  const sections = [
    { id: "jerseys", label: "Jersey Leaders" },
    { id: "stages", label: "Stages" },
    { id: "gc", label: "General Classification" },
  ];

  // Determine subtitle
  let subtitle = "";
  if (raceStatus === "upcoming") {
    const startDate = new Date(race.startDate);
    subtitle = `Starting ${startDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;
  } else if (raceStatus === "active") {
    subtitle = `Stage ${currentStage} in progress`;
  } else if (raceStatus === "complete") {
    subtitle = "Race Complete";
  } else {
    subtitle = "Archived Results";
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-base">
        <HeroBanner
          sport="cycling"
          title={race.name}
          subtitle={subtitle}
          live={raceStatus === "active"}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionNav sections={sections} />

          {/* Jersey Leaders */}
          <section id="jerseys" className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Jersey Leaders
              <span className="ml-3 text-sm font-normal text-secondary">
                {jerseys.length} classifications
              </span>
            </h2>
            <TdfJerseys jerseys={jerseys} raceStatus={raceStatus} />
          </section>

          {/* Stages */}
          <section id="stages" className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              {race.totalStages} Stages
              <span className="ml-3 text-sm font-normal text-secondary">
                {source === "wikipedia" ? "via Wikipedia" : source === "letour" ? "via LeTour.fr" : "preview data"}
              </span>
            </h2>
            <TdfStagesTable stages={stages} currentStage={currentStage} />
          </section>

          {/* General Classification */}
          {gc.length > 0 && (
            <section id="gc" className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-primary">
                General Classification
                <span className="ml-3 text-sm font-normal text-secondary">
                  Overall standings
                </span>
              </h2>
              <TdfGCTable riders={gc} />
            </section>
          )}

          {/* UCI Ranking Links */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              World Rankings
              <span className="ml-3 text-sm font-normal text-secondary">
                Live standings
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/cycling/uci-ranking"
                className="block rounded-xl border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-hover"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🚴</span>
                  <h3 className="text-xl font-bold text-primary">UCI Rider Rankings</h3>
                </div>
                <p className="text-sm text-secondary">
                  Top professional cyclists ranked by points across all disciplines and major tours
                </p>
              </Link>
              <Link
                href="/cycling/uci-team-ranking"
                className="block rounded-xl border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-hover"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <h3 className="text-xl font-bold text-primary">UCI Team Rankings</h3>
                </div>
                <p className="text-sm text-secondary">
                  Top professional cycling teams ranked by points across all competitions
                </p>
              </Link>
            </div>
          </section>

          {/* Other Races */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Other Grand Tours
              <span className="ml-3 text-sm font-normal text-secondary">
                2026 season
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {CYCLING_RACES.filter(r => r.id !== raceId)
                .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                .slice(0, 4)
                .map((otherRace) => (
                  <Link
                    key={otherRace.id}
                    href={`/cycling/${otherRace.id}`}
                    className="rounded-xl border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-hover"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-2xl">{otherRace.flag}</span>
                      <h3 className="text-xl font-bold text-primary">{otherRace.name}</h3>
                    </div>
                    <p className="mb-3 text-sm text-secondary">
                      {new Date(otherRace.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })} -{" "}
                      {new Date(otherRace.endDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </Link>
                ))}
            </div>
          </section>

          {/* Data source notice */}
          <div className="mb-12 rounded-xl border border-edge bg-surface p-4 text-sm text-secondary">
            <p>
              <strong className="text-primary">Data Source:</strong> Stage information sourced from Wikipedia.
              {raceStatus === "upcoming" && ` General Classification will update once the race begins on ${new Date(race.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`}
              {raceStatus === "active" && " General Classification updates as the race progresses."}
              {source === "mock" && " Currently showing preview data."}
            </p>
            <p className="mt-2">
              <strong className="text-primary">Last updated:</strong>{" "}
              {new Date(raceData.lastUpdated).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                timeZoneName: "short",
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
