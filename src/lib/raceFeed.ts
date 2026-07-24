import type { AtpLivePlayer, AtpLiveSnapshot, Tour } from "@/types";
import { flagEmoji } from "./flags";

// Race rankings = year-to-date points only (resets Jan 1)
// Used for ATP Finals / WTA Finals qualification tracking
const TOP_N = 100;

interface TourConfig {
  label: string;
  raceName: string; // "ATP Race to Turin" or "WTA Race to Finals"
  rankingsUrl: string;
}

const ATP: TourConfig = {
  label: "ATP",
  raceName: "ATP Race to Turin",
  rankingsUrl: "https://site.api.espn.com/apis/site/v2/sports/tennis/atp/rankings?type=race",
};

const WTA: TourConfig = {
  label: "WTA",
  raceName: "WTA Race to Finals",
  rankingsUrl: "https://site.api.espn.com/apis/site/v2/sports/tennis/wta/rankings?type=race",
};

const TOURS: Record<Tour, TourConfig> = { atp: ATP, wta: WTA };

export function isTour(value: string): value is Tour {
  return value === "atp" || value === "wta";
}

// Mock race data (fallback only)
function mockRaceData(tour: Tour): AtpLiveSnapshot {
  const config = TOURS[tour];
  const mockPlayers: AtpLivePlayer[] = [];

  // Create realistic YTD points distribution (champion ~10k, #100 ~300)
  for (let i = 1; i <= TOP_N; i++) {
    const basePoints = Math.max(300, Math.round(11000 / Math.pow(i, 0.85)));
    mockPlayers.push({
      liveRank: i,
      officialRank: i,
      movement: 0,
      name: `Player ${i}`,
      countryCode: "USA",
      flag: flagEmoji("USA"),
      age: 25,
      officialPoints: basePoints,
      livePoints: basePoints,
      pointsDelta: 0,
    });
  }

  return {
    players: mockPlayers,
    source: "mock" as const,
    lastUpdated: new Date().toISOString(),
    weekLabel: `${config.raceName} · demo data`,
  };

}

interface EspnAthlete {
  id: string;
  displayName: string;
  flag?: { href?: string; alt?: string };
}

interface EspnRank {
  current: number;
  previous?: number;
  points: number;
  athlete: EspnAthlete;
}

interface EspnRanking {
  type: string;
  ranks: EspnRank[];
}

interface EspnResponse {
  rankings?: EspnRanking[];
}

export async function getRaceData(tour: Tour): Promise<AtpLiveSnapshot> {
  const config = TOURS[tour];

  try {
    const resp = await fetch(config.rankingsUrl, {
      next: { revalidate: 60 },
    });

    if (!resp.ok) {
      console.warn(`[race ${tour}] ESPN ${resp.status} — fallback to mock`);
      return mockRaceData(tour);
    }

    const data: EspnResponse = await resp.json();

    if (!data.rankings?.[0]?.ranks) {
      console.warn(`[race ${tour}] ESPN response missing rankings — fallback to mock`);
      return mockRaceData(tour);
    }

    const ranks = data.rankings[0].ranks.slice(0, TOP_N);

    const players: AtpLivePlayer[] = ranks.map((r) => {
      const prev = r.previous ?? r.current;
      const movement = prev - r.current;

      // Extract country code from flag alt text (e.g., "ITA" from "Italy flag")
      const country = r.athlete.flag?.alt?.match(/^([A-Z]{3})/)?.[1] ?? "XXX";

      return {
        liveRank: r.current,
        officialRank: prev,
        movement,
        name: r.athlete.displayName,
        countryCode: country,
        flag: flagEmoji(country),
        age: 0, // ESPN race endpoint doesn't include age
        officialPoints: Math.round(r.points),
        livePoints: Math.round(r.points), // Race has no "live" overlay; it's already current-season
        pointsDelta: 0, // Race rankings are already current
      };
    });

    return {
      players,
      source: "espn" as const,
      lastUpdated: new Date().toISOString(),
      weekLabel: `${config.raceName} · current season points`,
    };
  } catch (err) {
    console.error(`[race ${tour}] fetch error:`, err);
    return mockRaceData(tour);
  }
}
