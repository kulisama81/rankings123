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

// Real ATP/WTA doubles teams for realistic mock data (follows CX-FIRST: no placeholder names)
const ATP_DOUBLES_TEAMS = [
  { player1: "Marcel Granollers", player2: "Horacio Zeballos", country: "ESP/ARG" },
  { player1: "Rajeev Ram", player2: "Joe Salisbury", country: "USA/GBR" },
  { player1: "Wesley Koolhof", player2: "Nikola Mektic", country: "NED/HRV" },
  { player1: "Austin Krajicek", player2: "Ivan Dodig", country: "USA/HRV" },
  { player1: "Marcelo Arevalo", player2: "Mate Pavic", country: "ESA/HRV" },
  { player1: "Kevin Krawietz", player2: "Tim Puetz", country: "GER" },
  { player1: "Simone Bolelli", player2: "Andrea Vavassori", country: "ITA" },
  { player1: "Max Purcell", player2: "Jordan Thompson", country: "AUS" },
  { player1: "Harri Heliovaara", player2: "Henry Patten", country: "FIN/GBR" },
  { player1: "Santiago Gonzalez", player2: "Edouard Roger-Vasselin", country: "MEX/FRA" },
  { player1: "Neal Skupski", player2: "Michael Venus", country: "GBR/NZL" },
  { player1: "Jean-Julien Rojer", player2: "Marcelo Melo", country: "NED/BRA" },
  { player1: "Matthew Ebden", player2: "Rohan Bopanna", country: "AUS/IND" },
  { player1: "Andres Molteni", player2: "Hugo Nys", country: "ARG/MON" },
  { player1: "Nathaniel Lammons", player2: "Jackson Withrow", country: "USA" },
];

const WTA_DOUBLES_TEAMS = [
  { player1: "Coco Gauff", player2: "Jessica Pegula", country: "USA" },
  { player1: "Barbora Krejcikova", player2: "Katerina Siniakova", country: "CZE" },
  { player1: "Hsieh Su-wei", player2: "Elise Mertens", country: "TPE/BEL" },
  { player1: "Gabriela Dabrowski", player2: "Erin Routliffe", country: "CAN/NZL" },
  { player1: "Laura Siegemund", player2: "Vera Zvonareva", country: "GER/RUS" },
  { player1: "Lyudmyla Kichenok", player2: "Jelena Ostapenko", country: "UKR/LAT" },
  { player1: "Nicole Melichar-Martinez", player2: "Ellen Perez", country: "USA/AUS" },
  { player1: "Caroline Dolehide", player2: "Desirae Krawczyk", country: "USA" },
  { player1: "Chan Hao-Ching", player2: "Veronika Kudermetova", country: "TPE/RUS" },
  { player1: "Leylah Fernandez", player2: "Taylor Townsend", country: "CAN/USA" },
  { player1: "Shuko Aoyama", player2: "Ena Shibahara", country: "JPN" },
  { player1: "Storm Hunter", player2: "Kateřina Siniaková", country: "AUS/CZE" },
  { player1: "Demi Schuurs", player2: "Luisa Stefani", country: "NED/BRA" },
  { player1: "Giuliana Olmos", player2: "Alexandra Panova", country: "MEX/RUS" },
  { player1: "Asia Muhammad", player2: "Aldila Sutjiadi", country: "USA/INA" },
];

const flags: Record<string, string> = {
  USA: "🇺🇸", ESP: "🇪🇸", GBR: "🇬🇧", FRA: "🇫🇷", ITA: "🇮🇹", GER: "🇩🇪",
  AUS: "🇦🇺", CAN: "🇨🇦", ARG: "🇦🇷", BRA: "🇧🇷", NED: "🇳🇱", CZE: "🇨🇿",
  POL: "🇵🇱", JPN: "🇯🇵", CHN: "🇨🇳", HRV: "🇭🇷", FIN: "🇫🇮", NZL: "🇳🇿",
  MEX: "🇲🇽", MON: "🇲🇨", IND: "🇮🇳", TPE: "🇹🇼", BEL: "🇧🇪", UKR: "🇺🇦",
  LAT: "🇱🇻", RUS: "🇷🇺", INA: "🇮🇩", ESA: "🇸🇻",
};

// Generate realistic mock doubles data (100 teams) using real player names
function generateMockDoubles(tour: "ATP" | "WTA"): DoublesTeam[] {
  const teams: DoublesTeam[] = [];
  const baseTeams = tour === "ATP" ? ATP_DOUBLES_TEAMS : WTA_DOUBLES_TEAMS;
  const basePoints = tour === "ATP" ? 7280 : 8430;

  for (let i = 1; i <= 100; i++) {
    const teamIndex = (i - 1) % baseTeams.length;
    const team = baseTeams[teamIndex];
    const countryParts = team.country.split("/");
    const flag = flags[countryParts[0]] || "🌐";

    teams.push({
      rank: i,
      prevRank: i + (i % 5 === 0 ? -1 : i % 7 === 0 ? 1 : 0),
      movement: i % 5 === 0 ? 1 : i % 7 === 0 ? -1 : 0,
      player1: team.player1,
      player2: team.player2,
      country: team.country,
      flag,
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
