/**
 * Player data utilities for fetching current ranking, points, and recent performance
 */

import { getLiveData } from "./liveFeed";
import type { Tour } from "@/types";

export interface PlayerProfile {
  name: string;
  tour: Tour;
  rank: number;
  points: number;
  movement?: number;
  tournament?: {
    name: string;
    round?: string;
    status?: string;
  };
  recentForm: string[];
  nationality: string;
  slug: string;
}

export interface PlayerArticleInfo {
  fullName: string;
  tour: Tour;
  nationality: string;
  birthYear: number;
  playingStyle: string;
  surface: string;
  grandSlams: {
    total: number;
    titles: string[];
  };
  keywords: string[];
}

/**
 * Get current player data from live rankings
 */
export async function getPlayerProfile(
  playerName: string,
  tour: Tour
): Promise<PlayerProfile | null> {
  const snapshot = await getLiveData(tour);

  const player = snapshot.players.find(
    (p) => p.name.toLowerCase().includes(playerName.toLowerCase())
  );

  if (!player) {
    return null;
  }

  return {
    name: player.name,
    tour,
    rank: player.liveRank,
    points: player.livePoints,
    movement: player.movement,
    tournament: player.tournament,
    recentForm: [], // TODO: fetch from match history
    nationality: "", // TODO: extract from player data
    slug: playerName.toLowerCase().replace(/\s+/g, "-"),
  };
}

/**
 * Pre-defined player data for articles
 */
export const PLAYER_PROFILES: Record<string, PlayerArticleInfo> = {
  "jannik-sinner": {
    fullName: "Jannik Sinner",
    tour: "atp",
    nationality: "Italian",
    birthYear: 2001,
    playingStyle: "Aggressive baseliner",
    surface: "Hard courts",
    grandSlams: {
      total: 2,
      titles: ["US Open 2024", "Wimbledon 2026"],
    },
    keywords: [
      "jannik sinner ranking",
      "sinner tennis",
      "jannik sinner us open",
      "sinner atp ranking",
    ],
  },
  "carlos-alcaraz": {
    fullName: "Carlos Alcaraz",
    tour: "atp",
    nationality: "Spanish",
    birthYear: 2003,
    playingStyle: "All-court aggressive",
    surface: "All surfaces",
    grandSlams: {
      total: 4,
      titles: ["US Open 2022", "Wimbledon 2023", "French Open 2024", "Wimbledon 2024"],
    },
    keywords: [
      "carlos alcaraz ranking",
      "alcaraz tennis",
      "carlos alcaraz us open",
      "alcaraz atp ranking",
    ],
  },
  "aryna-sabalenka": {
    fullName: "Aryna Sabalenka",
    tour: "wta",
    nationality: "Belarusian",
    birthYear: 1998,
    playingStyle: "Power baseliner",
    surface: "Hard courts",
    grandSlams: {
      total: 3,
      titles: ["Australian Open 2023", "Australian Open 2024", "US Open 2024"],
    },
    keywords: [
      "aryna sabalenka ranking",
      "sabalenka tennis",
      "aryna sabalenka us open",
      "sabalenka wta ranking",
    ],
  },
  "iga-swiatek": {
    fullName: "Iga Świątek",
    tour: "wta",
    nationality: "Polish",
    birthYear: 2001,
    playingStyle: "All-court aggressive",
    surface: "Clay courts",
    grandSlams: {
      total: 5,
      titles: ["French Open 2020", "French Open 2022", "French Open 2023", "French Open 2024", "US Open 2022"],
    },
    keywords: [
      "iga swiatek ranking",
      "swiatek tennis",
      "iga swiatek us open",
      "swiatek wta ranking",
    ],
  },
  "novak-djokovic": {
    fullName: "Novak Djokovic",
    tour: "atp",
    nationality: "Serbian",
    birthYear: 1987,
    playingStyle: "Defensive counter-puncher",
    surface: "All surfaces",
    grandSlams: {
      total: 24,
      titles: ["Australian Open (10×)", "French Open (3×)", "Wimbledon (7×)", "US Open (4×)"],
    },
    keywords: [
      "novak djokovic ranking",
      "djokovic tennis",
      "novak djokovic us open",
      "djokovic atp ranking",
    ],
  },
  "coco-gauff": {
    fullName: "Coco Gauff",
    tour: "wta",
    nationality: "American",
    birthYear: 2004,
    playingStyle: "Athletic baseliner",
    surface: "Hard courts",
    grandSlams: {
      total: 1,
      titles: ["US Open 2023"],
    },
    keywords: [
      "coco gauff ranking",
      "gauff tennis",
      "coco gauff us open",
      "gauff wta ranking",
    ],
  },
  "daniil-medvedev": {
    fullName: "Daniil Medvedev",
    tour: "atp",
    nationality: "Russian",
    birthYear: 1996,
    playingStyle: "Defensive baseliner",
    surface: "Hard courts",
    grandSlams: {
      total: 1,
      titles: ["US Open 2021"],
    },
    keywords: [
      "daniil medvedev ranking",
      "medvedev tennis",
      "daniil medvedev us open",
      "medvedev atp ranking",
    ],
  },
  "elena-rybakina": {
    fullName: "Elena Rybakina",
    tour: "wta",
    nationality: "Kazakhstani",
    birthYear: 1999,
    playingStyle: "Power baseliner",
    surface: "Grass courts",
    grandSlams: {
      total: 1,
      titles: ["Wimbledon 2022"],
    },
    keywords: [
      "elena rybakina ranking",
      "rybakina tennis",
      "elena rybakina us open",
      "rybakina wta ranking",
    ],
  },
  "stefanos-tsitsipas": {
    fullName: "Stefanos Tsitsipas",
    tour: "atp",
    nationality: "Greek",
    birthYear: 1998,
    playingStyle: "Aggressive baseliner",
    surface: "Clay courts",
    grandSlams: {
      total: 0,
      titles: [],
    },
    keywords: [
      "stefanos tsitsipas ranking",
      "tsitsipas tennis",
      "stefanos tsitsipas us open",
      "tsitsipas atp ranking",
    ],
  },
  "jessica-pegula": {
    fullName: "Jessica Pegula",
    tour: "wta",
    nationality: "American",
    birthYear: 1994,
    playingStyle: "All-court baseliner",
    surface: "Hard courts",
    grandSlams: {
      total: 0,
      titles: [],
    },
    keywords: [
      "jessica pegula ranking",
      "pegula tennis",
      "jessica pegula us open",
      "pegula wta ranking",
    ],
  },
};

export type PlayerSlug = keyof typeof PLAYER_PROFILES;
