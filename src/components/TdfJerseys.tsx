"use client";

import type { TdfJerseyLeader } from "@/types";
import SportIcon from "./SportIcon";

interface TdfJerseysProps {
  jerseys: TdfJerseyLeader[];
  raceStatus: "upcoming" | "active" | "complete" | "archived";
}

const jerseyColors: Record<string, string> = {
  yellow: "bg-warning/20 border-warning/40",
  green: "bg-emerald-500/20 border-emerald-500/40",
  "polka-dot": "bg-error/20 border-error/40",
  white: "bg-surface border-edge",
  red: "bg-error/20 border-error/40",
  pink: "bg-pink-500/20 border-pink-500/40",
  purple: "bg-purple-500/20 border-purple-500/40",
  blue: "bg-blue-500/20 border-blue-500/40",
};

const jerseyIconTypes: Record<string, string> = {
  yellow: "jersey-yellow",
  green: "jersey-green",
  "polka-dot": "jersey-polkadot",
  white: "jersey-white",
  red: "jersey-yellow", // Reuse yellow icon for red (Vuelta)
  pink: "jersey-yellow", // Reuse yellow icon for pink (Giro)
  purple: "jersey-green", // Reuse green icon for purple
  blue: "jersey-polkadot", // Reuse polkadot icon for blue
};

const jerseyIconColors: Record<string, string> = {
  yellow: "text-warning",
  green: "text-emerald-500",
  "polka-dot": "text-error",
  white: "text-fg",
  red: "text-error",
  pink: "text-pink-500",
  purple: "text-purple-500",
  blue: "text-blue-500",
};

export default function TdfJerseys({ jerseys, raceStatus }: TdfJerseysProps) {
  const preRace = raceStatus === "upcoming";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {jerseys.map((jersey) => {
        const colorClass = jerseyColors[jersey.jersey] || "bg-surface border-edge";
        const iconType = (jerseyIconTypes[jersey.jersey] || "jersey-yellow") as "jersey-yellow" | "jersey-green" | "jersey-polkadot" | "jersey-white";
        const iconColor = jerseyIconColors[jersey.jersey] || "text-fg";

        return (
          <div
            key={jersey.jersey}
            className={`rounded-2xl border ${colorClass} p-4 transition hover:scale-[1.02]`}
          >
            <div className="mb-3 flex items-center gap-2">
              <div className={iconColor} aria-label={jersey.jersey}>
                <SportIcon type={iconType} size={28} />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                {jersey.jersey} jersey
              </div>
            </div>
            <div className="mb-2 text-sm font-medium text-secondary">
              {jersey.jerseyName}
            </div>
            {preRace ? (
              <div className="mt-3 text-xs text-muted">
                Leaders determined after Stage 1
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
              <div className="mt-3 h-6"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
