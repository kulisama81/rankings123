// Share card type definitions
export type ShareCardType = "rank-milestone" | "match-result" | "tournament-winner";

export type Sport = "atp" | "wta" | "worldcup" | "cycling";

export interface ShareCardData {
  type: ShareCardType;
  sport: Sport;
  // Rank milestone fields
  playerName?: string;
  rank?: number;
  points?: number;
  countryCode?: string;
  movement?: number;
  // Match result fields
  homeTeam?: string;
  awayTeam?: string;
  homeScore?: number;
  awayScore?: number;
  matchStatus?: string;
  // Tournament winner fields
  tournamentName?: string;
  winner?: string;
  winnerCountry?: string;
  // Metadata
  date?: string;
  size?: "og" | "instagram"; // og = 1200x630, instagram = 1080x1080
}

export const SPORT_COLORS: Record<Sport, string> = {
  atp: "#B4FF39",
  wta: "#FF006E",
  worldcup: "#00D084",
  cycling: "#FFC107",
};

export const SPORT_LABELS: Record<Sport, string> = {
  atp: "ATP Live Rankings",
  wta: "WTA Live Rankings",
  worldcup: "FIFA World Cup 2026",
  cycling: "UCI World Ranking",
};
