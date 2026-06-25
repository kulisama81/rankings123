// Fabricated mock event types (Olympics, cycling, rugby) removed.
// Only real, live-sourced data types remain.

// --- Tennis (historic/static data - kept for TennisTable component) ---
export interface TennisPlayer {
  rank: number;
  name: string;
  flag: string;
  nationality: string;
  points: number;
  movement: number; // positive = up, negative = down, 0 = same
  age: number;
}

// --- ATP Live Ranking ---
export interface AtpTournamentStatus {
  name: string; // e.g., "Stuttgart"
  round: string; // e.g., "R32", "R16", "QF", "SF", "F", "W"
  active: boolean; // still alive in the draw
}

export interface AtpLivePlayer {
  liveRank: number;
  officialRank: number;
  movement: number; // officialRank - liveRank (positive = up)
  name: string;
  countryCode: string; // IOC-style code, e.g., "ITA"
  flag: string;
  age: number;
  officialPoints: number;
  livePoints: number;
  pointsDelta: number; // livePoints - officialPoints
  careerHigh?: number; // only available in demo data
  dropping?: number; // points to defend this week (only in demo data)
  tournament?: AtpTournamentStatus;
}

export type Tour = "atp" | "wta";

export interface AtpLiveSnapshot {
  lastUpdated: string; // ISO timestamp
  weekLabel: string; // e.g., "Week of June 8, 2026"
  source?: "espn" | "mock" | "uts" | "uts+espn";
  tour?: Tour;
  tourLabel?: string; // "ATP" | "WTA"
  players: AtpLivePlayer[];
}

// --- ATP Deep Ranking (top ~1000) ---
// Full ATP ranking extended well beyond ESPN's ~150-player feed, sourced from
// Ultimate Tennis Statistics, with this week's live points overlaid (joined to
// the ESPN scoreboard by normalized name) where a player is in a current draw.
export interface AtpDeepRankingSnapshot {
  lastUpdated: string; // ISO timestamp
  weekLabel: string;
  total: number; // total players available in the source ranking
  // espn = ESPN-only (deep source unavailable); uts = deep, no overlay;
  // uts+espn = deep + ESPN live overlay; mock = bundled demo fallback.
  source: "uts" | "uts+espn" | "espn" | "mock";
  players: AtpLivePlayer[];
}

// --- World Cup (FIFA) live ---
export interface WorldCupTeam {
  rank: number; // position within the group
  name: string;
  code: string; // 3-letter code, e.g. "MEX"
  flag: string; // emoji
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  // Advancement status from the live feed (e.g. "Advance to Round of 32").
  status?: string;
  // "advanced" = qualified, "alive" = can still qualify, "out" = eliminated.
  outlook?: "advanced" | "alive" | "out";
  // Disciplinary record aggregated from all played matches
  yellowCards?: number;
  redCards?: number;
}

export interface WorldCupGroup {
  name: string; // e.g. "Group A"
  teams: WorldCupTeam[];
}

export interface WorldCupMatchOdds {
  homeWin: number; // decimal odds, e.g. 2.5
  draw: number;
  awayWin: number;
  homeProbability: number; // 0–100
  drawProbability: number;
  awayProbability: number;
}

export interface WorldCupMatch {
  id: string;
  date: string; // ISO kickoff
  state: "pre" | "in" | "post";
  statusDetail: string; // e.g. "FT", "38'", "Scheduled"
  homeName: string;
  homeCode: string;
  homeFlag: string;
  homeScore: number | null;
  homeSeedLabel?: string; // e.g. "1st Group A" (projected matches only)
  awayName: string;
  awayCode: string;
  awayFlag: string;
  awayScore: number | null;
  awaySeedLabel?: string; // e.g. "2nd Group D" (projected matches only)
  venue?: string;
  odds?: WorldCupMatchOdds;
}

export interface WorldCupSnapshot {
  lastUpdated: string; // ISO timestamp
  stageLabel: string; // e.g. "Group Stage"
  source?: "espn" | "mock";
  oddsSource?: "mock" | "api"; // separate source flag for odds/predictions
  groups: WorldCupGroup[];
  matches: WorldCupMatch[];
}

// Knockout stage types
export type KnockoutStage =
  | "Round of 32"
  | "Rd of 16"
  | "Quarterfinals"
  | "Semifinals"
  | "3rd-Place Match"
  | "Final";

export interface WorldCupBracket {
  lastUpdated: string;
  source: "espn" | "mock";
  stages: {
    name: KnockoutStage;
    startDate: string;
    endDate: string;
    matches: WorldCupMatch[];
  }[];
}

export interface WorldCupMatchDetail {
  id: string;
  homeName: string;
  awayName: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string; // e.g., "FT", "Live", "Scheduled"
  venue: string;
  city: string;
  attendance: number | null;
  homeLineup: { name: string; position: string; jersey: string }[];
  awayLineup: { name: string; position: string; jersey: string }[];
  keyEvents: {
    type: string; // "Goal", "Yellow Card", "Red Card", etc.
    clock: string; // e.g., "45'+2"
    team: string;
    player: string;
    description: string;
    isRedCard: boolean;
    isYellowCard: boolean;
    isPenalty: boolean;
  }[];
  homeStats: Record<string, string>;
  awayStats: Record<string, string>;
  source: "espn" | "mock";
}

export interface WorldCupPlayerStat {
  playerId: string;
  playerName: string;
  playerShortName: string;
  jersey: string;
  teamName: string;
  teamCode: string;
  teamColor: string;
  value: number;
  appearances: number;
  goals?: number;
  assists?: number;
}

export interface WorldCupStats {
  lastUpdated: string;
  source: "espn" | "mock";
  topScorers: WorldCupPlayerStat[];
  topAssisters: WorldCupPlayerStat[];
}

export interface WorldCupH2HMatch {
  id: string;
  date: string; // ISO
  year: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  result: "win" | "draw" | "loss"; // from perspective of team1
  stage: string; // e.g., "Final", "Group Stage", "Round of 16"
  venue?: string;
}

export interface WorldCupH2H {
  team1: string;
  team2: string;
  totalMatches: number;
  wins: number; // team1 wins
  draws: number;
  losses: number; // team1 losses
  matches: WorldCupH2HMatch[]; // recent meetings
  source: "espn" | "none"; // "none" = no historical data found
}

export interface WorldCupTeamRoster {
  teamCode: string;
  teamName: string;
  roster: {
    id: string;
    name: string;
    jersey: string;
    position: string;
    age: number | null;
    appearances: number | null;
    goals: number | null;
    assists: number | null;
  }[];
  source: "espn";
}

// Fabricated event types removed (OlympicsRankings, CyclingRankings, RugbyRankings, EventSummary).
// Only real sourced data remains (ATP/WTA/World Cup).
