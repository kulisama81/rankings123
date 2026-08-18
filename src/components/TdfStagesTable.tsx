"use client";

import Link from "next/link";
import SportIcon from "./SportIcon";
import type { TdfStage } from "@/types";

interface TdfStagesTableProps {
  stages: TdfStage[];
  currentStage?: number;
  raceId: string; // e.g., "vuelta-2026", "tour-de-france-2026"
}

// Icon type for stage type
function stageTypeIcon(type: TdfStage["type"]): 'team-tt' | 'individual-tt' | 'mountain' | 'uphill-finish' | 'flat' | 'cycling' {
  switch (type) {
    case "Team time trial":
      return "team-tt";
    case "Individual time trial":
      return "individual-tt";
    case "Mountain stage":
      return "mountain";
    case "Hilly stage":
      return "uphill-finish";
    case "Flat stage":
      return "flat";
    default:
      return "cycling";
  }
}

function stageTypeColor(type: TdfStage["type"]): string {
  switch (type) {
    case "Mountain stage":
      return "text-up"; // green for mountains
    case "Hilly stage":
      return "text-warning"; // yellow/orange for hills
    case "Team time trial":
    case "Individual time trial":
      return "text-accent"; // accent for time trials
    default:
      return "text-secondary";
  }
}

// Map race IDs to event slugs (only for races with stage pages)
function getEventSlug(raceId: string): string | null {
  const mapping: Record<string, string> = {
    "tour-de-france-2026": "tdf-2026",
    // Add other races here when they have stage pages
  };
  return mapping[raceId] || null;
}

export default function TdfStagesTable({ stages, currentStage, raceId }: TdfStagesTableProps) {
  const eventSlug = getEventSlug(raceId);

  return (
    <div className="animate-entrance-table overflow-hidden rounded-2xl border border-edge bg-surface">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b border-edge bg-surface2 text-sm uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2.5 text-center">Stage</th>
              <th className="px-3 py-2.5 text-left">Date</th>
              <th className="px-3 py-2.5 text-left">Course</th>
              <th className="px-3 py-2.5 text-center">Distance</th>
              <th className="px-3 py-2.5 text-left">Type</th>
              <th className="px-3 py-2.5 text-left">Winner</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((stage) => {
              const isCurrentStage = currentStage === stage.stage;
              const isPastStage = currentStage && stage.stage < currentStage;

              return (
                <tr
                  key={stage.stage}
                  className={`border-b border-edge last:border-0 hover:bg-surface2 ${
                    isCurrentStage ? "bg-surface2" : ""
                  }`}
                >
                  <td className="px-3 py-3 text-center font-semibold">
                    {eventSlug ? (
                      <Link
                        href={`/events/${eventSlug}/stage/${stage.stage}`}
                        className="text-accent transition hover:text-accentfg"
                      >
                        {stage.stage}
                        {isCurrentStage && (
                          <span className="ml-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                        )}
                      </Link>
                    ) : (
                      <span className="text-primary">
                        {stage.stage}
                        {isCurrentStage && (
                          <span className="ml-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                        )}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-fg">{stage.date}</td>
                  <td className="px-3 py-3 text-fg">{stage.course}</td>
                  <td className="px-3 py-3 text-center text-secondary">{stage.distance}</td>
                  <td className="px-3 py-3">
                    <span className={`flex items-center gap-1.5 ${stageTypeColor(stage.type)}`}>
                      <SportIcon type={stageTypeIcon(stage.type)} size={18} />
                      <span>{stage.type}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3 text-secondary">
                    {stage.winner ? (
                      <span className="text-primary">{stage.winner}</span>
                    ) : isPastStage ? (
                      <span className="text-muted italic">TBD</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
