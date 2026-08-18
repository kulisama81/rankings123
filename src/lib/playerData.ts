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
};

export type PlayerSlug = keyof typeof PLAYER_PROFILES;
