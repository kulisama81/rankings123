import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTdfSnapshot } from "@/lib/cyclingFeed";
import type { TdfStage } from "@/types";
import HeroBanner from "@/components/HeroBanner";
import TdfJerseys from "@/components/TdfJerseys";

// Stage type icon helper
function getStageTypeIcon(type: TdfStage["type"]): string {
  switch (type) {
    case "Team time trial":
      return "👥";
    case "Individual time trial":
      return "⏱️";
    case "Mountain stage":
      return "⛰️";
    case "Hilly stage":
      return "📈";
    case "Flat stage":
      return "🏁";
    default:
      return "🚴";
  }
}

interface Props {
  params: Promise<{ stageNum: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stageNum } = await params;
  const num = parseInt(stageNum);

  if (isNaN(num) || num < 1 || num > 21) {
    return { title: "Stage Not Found" };
  }

  const tdfData = await getTdfSnapshot();
  const stage = tdfData.stages.find((s) => s.stage === num);

  if (!stage) {
    return { title: "Stage Not Found" };
  }

  const title = stage.winner
    ? `Stage ${num} Results: ${stage.winner} wins — Tour de France 2026`
    : `Stage ${num}: ${stage.course} — Tour de France 2026`;

  const description = stage.winner
    ? `Tour de France 2026 Stage ${num} results: ${stage.winner} wins the ${stage.distance} ${stage.type.toLowerCase()} from ${stage.course}.`
    : `Tour de France 2026 Stage ${num}: ${stage.distance} ${stage.type.toLowerCase()} on ${stage.date} — ${stage.course}.`;

  return {
    title,
    description,
    alternates: { canonical: `/events/tdf-2026/stage-${num}` },
    openGraph: {
      title: `${title} — Rankings123`,
      description,
      url: `/events/tdf-2026/stage-${num}`,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return Array.from({ length: 21 }, (_, i) => ({
    stageNum: String(i + 1),
  }));
}

// ISR: 5 min during race, longer after completion
export const revalidate = 300;

export default async function TdfStagePage({ params }: Props) {
  const { stageNum } = await params;
  const num = parseInt(stageNum);

  if (isNaN(num) || num < 1 || num > 21) {
    notFound();
  }

  const tdfData = await getTdfSnapshot();
  const stage = tdfData.stages.find((s) => s.stage === num);

  if (!stage) {
    notFound();
  }

  // Determine if this stage is completed, current, or upcoming
  const isCompleted = !!stage.winner;
  const isCurrent = tdfData.currentStage === num;
  const isUpcoming = tdfData.currentStage
    ? num > tdfData.currentStage
    : tdfData.raceStatus === "upcoming";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `Tour de France 2026 — Stage ${num}`,
    description: `${stage.distance} ${stage.type.toLowerCase()} from ${stage.course}`,
    startDate: stage.date,
    location: {
      "@type": "Place",
      name: stage.course,
    },
    ...(stage.winner && {
      performer: {
        "@type": "Person",
        name: stage.winner,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-base">
        <HeroBanner
          icon={getStageTypeIcon(stage.type)}
          title={`Stage ${num}`}
          subtitle={stage.course}
          live={isCurrent}
        />

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back to overview */}
          <Link
            href="/cycling"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-fg"
          >
            ← Back to Tour de France overview
          </Link>

          {/* Stage details card */}
          <div className="mb-8 rounded-2xl border border-edge bg-surface p-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-primary">
                  Stage {num}: {stage.type}
                </h2>
                <p className="text-lg text-secondary">{stage.course}</p>
              </div>
              {isCurrent && (
                <span className="flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  In Progress
                </span>
              )}
              {isCompleted && (
                <span className="rounded-full bg-surface2 px-3 py-1.5 text-sm font-medium text-secondary">
                  Completed
                </span>
              )}
              {isUpcoming && (
                <span className="rounded-full bg-surface2 px-3 py-1.5 text-sm font-medium text-muted">
                  Upcoming
                </span>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted">
                  Date
                </p>
                <p className="font-semibold text-primary">{stage.date}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted">
                  Distance
                </p>
                <p className="font-semibold text-primary">{stage.distance}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted">
                  Type
                </p>
                <p className="flex items-center gap-2 font-semibold text-primary">
                  <span>{getStageTypeIcon(stage.type)}</span>
                  <span>{stage.type}</span>
                </p>
              </div>
            </div>

            {stage.winner && (
              <div className="mt-6 border-t border-edge pt-6">
                <p className="mb-2 text-xs uppercase tracking-wide text-muted">
                  Stage Winner
                </p>
                <p className="text-2xl font-bold text-primary">
                  🏆 {stage.winner}
                </p>
              </div>
            )}
          </div>

          {/* Jersey leaders after this stage (if completed) */}
          {isCompleted && (
            <section className="mb-8">
              <h3 className="mb-4 text-xl font-bold text-primary">
                Jersey Leaders After Stage {num}
              </h3>
              <TdfJerseys
                jerseys={tdfData.jerseys}
                raceStatus={tdfData.raceStatus}
              />
              <p className="mt-4 text-xs text-muted">
                Note: Jersey leaders shown are the current standings. Historical
                per-stage jersey data will be added in a future update.
              </p>
            </section>
          )}

          {/* Stage navigation */}
          <div className="mb-8 flex items-center justify-between rounded-2xl border border-edge bg-surface p-4">
            {num > 1 ? (
              <Link
                href={`/events/tdf-2026/stage-${num - 1}`}
                className="flex items-center gap-2 text-sm font-medium text-accent transition hover:text-accentfg"
              >
                ← Stage {num - 1}
              </Link>
            ) : (
              <span className="text-sm text-muted">First stage</span>
            )}

            <Link
              href="/cycling"
              className="text-sm font-medium text-muted transition hover:text-fg"
            >
              All Stages
            </Link>

            {num < 21 ? (
              <Link
                href={`/events/tdf-2026/stage-${num + 1}`}
                className="flex items-center gap-2 text-sm font-medium text-accent transition hover:text-accentfg"
              >
                Stage {num + 1} →
              </Link>
            ) : (
              <span className="text-sm text-muted">Final stage</span>
            )}
          </div>

          {/* Data source notice */}
          <div className="rounded-xl border border-edge bg-surface p-4 text-sm text-secondary">
            <p>
              <strong className="text-primary">Data Source:</strong> Stage
              information sourced from Wikipedia.
              {tdfData.source === "mock" && " Currently showing preview data."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
