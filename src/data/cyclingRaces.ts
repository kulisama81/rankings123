import type { CyclingRaceMetadata } from "@/types";

/**
 * Configuration for all supported cycling races.
 * Each race must have a Wikipedia page that follows the standard race structure.
 */
export const CYCLING_RACES: CyclingRaceMetadata[] = [
  {
    id: "tour-de-france-2026",
    name: "Tour de France 2026",
    year: 2026,
    wikipediaPage: "2026_Tour_de_France",
    startDate: "2026-07-04",
    endDate: "2026-07-26",
    totalStages: 21,
    country: "France",
    countryCode: "FRA",
    flag: "🇫🇷",
    jerseys: [
      { jersey: "yellow", name: "General Classification (Maillot Jaune)" },
      { jersey: "green", name: "Points Classification (Maillot Vert)" },
      { jersey: "polka-dot", name: "Mountains Classification (Maillot à Pois)" },
      { jersey: "white", name: "Young Rider Classification (Maillot Blanc)" },
    ],
  },
  {
    id: "vuelta-2026",
    name: "Vuelta a España 2026",
    year: 2026,
    wikipediaPage: "2026_Vuelta_a_España",
    startDate: "2026-08-22",
    endDate: "2026-09-13",
    totalStages: 21,
    country: "Spain",
    countryCode: "ESP",
    flag: "🇪🇸",
    jerseys: [
      { jersey: "red", name: "General Classification (La Roja)" },
      { jersey: "green", name: "Points Classification (Maillot Verde)" },
      { jersey: "polka-dot", name: "Mountains Classification (Maillot de Lunares)" },
      { jersey: "white", name: "Young Rider Classification" },
    ],
  },
  {
    id: "giro-2026",
    name: "Giro d'Italia 2026",
    year: 2026,
    wikipediaPage: "2026_Giro_d'Italia",
    startDate: "2026-05-08",
    endDate: "2026-05-31",
    totalStages: 21,
    country: "Italy",
    countryCode: "ITA",
    flag: "🇮🇹",
    jerseys: [
      { jersey: "pink", name: "General Classification (Maglia Rosa)" },
      { jersey: "purple", name: "Points Classification (Maglia Ciclamino)" },
      { jersey: "blue", name: "Mountains Classification (Maglia Azzurra)" },
      { jersey: "white", name: "Young Rider Classification (Maglia Bianca)" },
    ],
  },
  {
    id: "tour-de-pologne-2026",
    name: "Tour de Pologne 2026",
    year: 2026,
    wikipediaPage: "2026_Tour_de_Pologne",
    startDate: "2026-08-09",
    endDate: "2026-08-15",
    totalStages: 7,
    country: "Poland",
    countryCode: "POL",
    flag: "🇵🇱",
    jerseys: [
      { jersey: "yellow", name: "General Classification" },
      { jersey: "green", name: "Points Classification" },
      { jersey: "blue", name: "Mountains Classification" },
      { jersey: "white", name: "Young Rider Classification" },
    ],
  },
];

/**
 * Auto-detect race status based on current date and race dates.
 */
export function detectRaceStatus(
  race: CyclingRaceMetadata,
  completedStages: number
): "upcoming" | "active" | "complete" | "archived" {
  const now = new Date();
  const start = new Date(race.startDate);
  const end = new Date(race.endDate);

  // If all stages are complete, race is complete
  if (completedStages >= race.totalStages) {
    return "complete";
  }

  // If we're before the start date
  if (now < start) {
    return "upcoming";
  }

  // If we're after the end date (but not all stages recorded — data issue)
  const daysSinceEnd = (now.getTime() - end.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceEnd > 30) {
    // More than 30 days after end → archived
    return "archived";
  } else if (now > end) {
    // Within 30 days of end → still "complete" (may be updating final data)
    return "complete";
  }

  // We're between start and end → active
  return "active";
}

