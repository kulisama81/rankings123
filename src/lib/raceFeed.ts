import type { AtpLivePlayer, AtpLiveSnapshot, Tour } from "@/types";

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

// Mock race data (fallback only) — real player names, realistic YTD points
function mockRaceData(tour: Tour): AtpLiveSnapshot {
  const config = TOURS[tour];

  // Real player names with realistic 2026 YTD race points
  const atpTop: [string, string, number, number][] = [
    ["Jannik Sinner", "ITA", 26, 8500],
    ["Carlos Alcaraz", "ESP", 23, 7200],
    ["Alexander Zverev", "GER", 29, 6100],
    ["Daniil Medvedev", "RUS", 30, 5800],
    ["Taylor Fritz", "USA", 28, 4950],
    ["Casper Ruud", "NOR", 27, 4200],
    ["Alex de Minaur", "AUS", 27, 3900],
    ["Hubert Hurkacz", "POL", 29, 3650],
    ["Grigor Dimitrov", "BUL", 35, 3400],
    ["Stefanos Tsitsipas", "GRE", 28, 3150],
    ["Tommy Paul", "USA", 29, 2900],
    ["Ben Shelton", "USA", 23, 2700],
    ["Holger Rune", "DEN", 23, 2500],
    ["Ugo Humbert", "FRA", 28, 2300],
    ["Lorenzo Musetti", "ITA", 24, 2100],
    ["Sebastian Korda", "USA", 26, 1950],
    ["Andrey Rublev", "RUS", 28, 1800],
    ["Frances Tiafoe", "USA", 28, 1650],
    ["Felix Auger-Aliassime", "CAN", 26, 1500],
    ["Karen Khachanov", "RUS", 30, 1400],
  ];

  const wtaTop: [string, string, number, number][] = [
    ["Aryna Sabalenka", "BLR", 28, 7800],
    ["Iga Swiatek", "POL", 25, 7100],
    ["Coco Gauff", "USA", 22, 6300],
    ["Elena Rybakina", "KAZ", 27, 5500],
    ["Jessica Pegula", "USA", 32, 4800],
    ["Qinwen Zheng", "CHN", 23, 4200],
    ["Jasmine Paolini", "ITA", 30, 3900],
    ["Emma Navarro", "USA", 25, 3600],
    ["Daria Kasatkina", "RUS", 29, 3300],
    ["Barbora Krejcikova", "CZE", 30, 3000],
    ["Danielle Collins", "USA", 32, 2750],
    ["Beatriz Haddad Maia", "BRA", 30, 2500],
    ["Jelena Ostapenko", "LAT", 29, 2300],
    ["Madison Keys", "USA", 31, 2100],
    ["Victoria Azarenka", "BLR", 37, 1950],
    ["Marketa Vondrousova", "CZE", 27, 1800],
    ["Liudmila Samsonova", "RUS", 27, 1650],
    ["Ekaterina Alexandrova", "RUS", 31, 1500],
    ["Leylah Fernandez", "CAN", 24, 1400],
    ["Ons Jabeur", "TUN", 32, 1300],
  ];

  const top = tour === "atp" ? atpTop : wtaTop;

  const players: AtpLivePlayer[] = top.map(([name, cc, age, pts], i) => ({
    liveRank: i + 1,
    officialRank: i + 1,
    movement: 0,
    name,
    countryCode: cc,
    flag: cc,
    age,
    officialPoints: pts,
    livePoints: pts,
    pointsDelta: 0,
    nextPoints: pts,
    maxPoints: pts,
  }));

  return {
    players,
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
        flag: country,
        age: 0, // ESPN race endpoint doesn't include age
        officialPoints: Math.round(r.points),
        livePoints: Math.round(r.points), // Race has no "live" overlay; it's already current-season
        pointsDelta: 0, // Race rankings are already current
        nextPoints: Math.round(r.points),
        maxPoints: Math.round(r.points),
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
