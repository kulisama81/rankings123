export interface DoublesTeam {
  rank: number;
  prevRank: number;
  movement: number;
  player1: string;
  player2: string;
  country: string;
  flag: string;
  points: number;
}

export interface DoublesSnapshot {
  teams: DoublesTeam[];
  lastUpdated: string;
  source: "espn" | "wta" | "mock";
  tour: "ATP" | "WTA";
}

// Generate mock doubles data (100 teams) until we integrate real APIs
function generateMockDoubles(tour: "ATP" | "WTA"): DoublesTeam[] {
  const teams: DoublesTeam[] = [];
  const countries = ["USA", "ESP", "GBR", "FRA", "ITA", "GER", "AUS", "CAN", "ARG", "BRA", "NED", "CZE", "POL", "JPN", "CHN"];
  const flags: Record<string, string> = {
    USA: "🇺🇸", ESP: "🇪🇸", GBR: "🇬🇧", FRA: "🇫🇷", ITA: "🇮🇹", GER: "🇩🇪",
    AUS: "🇦🇺", CAN: "🇨🇦", ARG: "🇦🇷", BRA: "🇧🇷", NED: "🇳🇱", CZE: "🇨🇿",
    POL: "🇵🇱", JPN: "🇯🇵", CHN: "🇨🇳",
  };

  const basePoints = tour === "ATP" ? 7280 : 8430;

  for (let i = 1; i <= 100; i++) {
    const country1 = countries[i % countries.length];
    const country2 = countries[(i + 1) % countries.length];
    const countryPair = country1 === country2 ? country1 : `${country1}/${country2}`;

    teams.push({
      rank: i,
      prevRank: i + (i % 5 === 0 ? -1 : i % 7 === 0 ? 1 : 0),
      movement: i % 5 === 0 ? 1 : i % 7 === 0 ? -1 : 0,
      player1: `Player ${i}A`,
      player2: `Player ${i}B`,
      country: countryPair,
      flag: flags[country1] || "🌐",
      points: Math.max(100, Math.floor(basePoints - (i - 1) * 65)),
    });
  }

  return teams;
}

const mockAtpDoubles = generateMockDoubles("ATP");
const mockWtaDoubles = generateMockDoubles("WTA");

export async function getDoublesData(tour: "ATP" | "WTA"): Promise<DoublesSnapshot> {
  // TODO: Integrate real API sources
  // - WTA: api.wtatennis.com/tennis/players/ranked?type=rankDoubles
  // - ATP: ESPN doubles rankings endpoint

  const teams = tour === "ATP" ? mockAtpDoubles : mockWtaDoubles;

  return {
    teams,
    lastUpdated: new Date().toISOString(),
    source: "mock",
    tour,
  };
}
