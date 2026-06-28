"use client";

import type { TdfJerseyLeader } from "@/types";

interface TdfJerseysProps {
  jerseys: TdfJerseyLeader[];
  raceStatus: "upcoming" | "active" | "complete";
}

const jerseyColors = {
  yellow: "bg-warning/20 border-warning/40",
  green: "bg-emerald-500/20 border-emerald-500/40",
  "polka-dot": "bg-error/20 border-error/40",
  white: "bg-surface border-edge",
};

const jerseyIcons = {
  yellow: "🟡",
  green: "🟢",
  "polka-dot": "🔴",
  white: "⚪",
};

export default function TdfJerseys({ jerseys, raceStatus }: TdfJerseysProps) {
  const preRace = raceStatus === "upcoming";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {jerseys.map((jersey) => {
        const colorClass = jerseyColors[jersey.jersey];
        const icon = jerseyIcons[jersey.jersey];

        return (
          <div
            key={jersey.jersey}
            className={`rounded-2xl border ${colorClass} p-4 transition hover:scale-[1.02]`}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label={jersey.jersey}>
                {icon}
              </span>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                {jersey.jersey} jersey
              </div>
            </div>
            <div className="mb-2 text-sm font-medium text-secondary">
              {jersey.jerseyName}
            </div>
            {preRace ? (
              <div className="mt-3 text-xs text-muted">
                Race starts July 4, 2026
              </div>
            ) : jersey.rider ? (
              <>
                <div className="mt-3 text-base font-bold text-primary">
                  {jersey.flag && (
                    <span className="mr-1.5" role="img" aria-label={jersey.country}>
                      {jersey.flag}
                    </span>
                  )}
                  {jersey.rider}
                </div>
                {jersey.team && (
                  <div className="mt-1 text-xs text-secondary">{jersey.team}</div>
                )}
              </>
            ) : (
              <div className="mt-3 text-xs text-muted">
                Leader will be determined
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
