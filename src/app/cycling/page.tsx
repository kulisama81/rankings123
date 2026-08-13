import type { Metadata } from "next";
import { getCyclingRaces, getPrimaryRace } from "@/lib/cyclingFeed";
import HeroBanner from "@/components/HeroBanner";
import SectionNav from "@/components/SectionNav";
import TdfStagesTable from "@/components/TdfStagesTable";
import TdfGCTable from "@/components/TdfGCTable";
import TdfJerseys from "@/components/TdfJerseys";
import Link from "next/link";
import {
  generateBreadcrumbSchema,
  generateSportsEventSchema,
  JsonLd,
} from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const races = await getCyclingRaces();
  const primaryRace = getPrimaryRace(races);

  if (!primaryRace) {
    return {
      title: "Cycling — Grand Tours & Rankings",
      description: "Live cycling coverage: Grand Tour results, UCI rankings, and stage race updates.",
    };
  }

  const { metadata: race, raceStatus, gc } = primaryRace;
  const isComplete = raceStatus === "complete" || raceStatus === "archived";
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  // Get current GC leader
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
    alternates: { canonical: "/cycling" },
    openGraph: {
      title: `${title} — Rankings123`,
      description,
      url: "/cycling",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Rankings123`,
      description,
    },
  };
}

export const revalidate = 300; // ISR: 5 minute cache (race updates less frequently than tennis/soccer)

export default async function CyclingPage() {
  const races = await getCyclingRaces();
  const primaryRace = getPrimaryRace(races);

  if (!primaryRace) {
    return <div>No cycling races found</div>;
  }

  const { metadata: race, raceStatus, currentStage, jerseys, stages, gc, source } = primaryRace;

  // Structured data for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Cycling" },
  ]);

  const sportsEventSchema = generateSportsEventSchema({
    name: race.name,
    description: `Live ${race.name} stage results and General Classification standings.`,
    startDate: race.startDate,
    endDate: race.endDate,
    location: { name: race.country || "France" },
    sport: "Cycling",
    organizer: "ASO",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${race.name} Live — Stages & GC Standings — Rankings123`,
    description: `Live ${race.name} stage schedule and General Classification standings updated in real time.`,
    url: "https://rankings123.com/cycling",
    inLanguage: "en",
    breadcrumb: breadcrumbSchema,
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
  } else {
    subtitle = "Race Complete";
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={sportsEventSchema} />
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

          {/* Completed Races */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Completed Races
              <span className="ml-3 text-sm font-normal text-secondary">
                2026 season results
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/events/giro-2026"
                className="rounded-xl border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-hover"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🇮🇹</span>
                  <h3 className="text-xl font-bold text-primary">Giro d&apos;Italia 2026</h3>
                </div>
                <p className="mb-3 text-sm text-secondary">May 8-31, 2026</p>
                <p className="text-sm text-primary">
                  🏆 Winner: <strong>Jonas Vingegaard</strong> (Visma–Lease a Bike)
                </p>
              </Link>
              <Link
                href="/events/tour-de-suisse-2026"
                className="rounded-xl border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface-hover"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🇨🇭</span>
                  <h3 className="text-xl font-bold text-primary">Tour de Suisse 2026</h3>
                </div>
                <p className="mb-3 text-sm text-secondary">June 17-21, 2026</p>
                <p className="text-sm text-primary">
                  🏆 Winner: <strong>Tadej Pogačar</strong> (UAE Team Emirates XRG)
                </p>
              </Link>
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
              {new Date(primaryRace.lastUpdated).toLocaleString("en-US", {
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
