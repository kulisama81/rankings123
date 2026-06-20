export type SportType = "olympics" | "cycling" | "rugby" | "tennis";

// --- Common ---
export interface Event {
  id: string;
  name: string;
  sport: SportType;
  year: number;
  location: string;
  startDate: string;
  endDate: string;
  icon: string; // emoji
  status?: "completed" | "upcoming";
}

// --- Olympics ---
export interface OlympicCountry {
  rank: number;
  code: string;
  name: string;
  flag: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  disciplines: OlympicDiscipline[];
}

export interface OlympicDiscipline {
  name: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  events: OlympicEventResult[];
}

export interface OlympicEventResult {
  name: string;
  athlete: string;
  medal: "gold" | "silver" | "bronze";
}

// --- Cycling ---
export interface CyclingRider {
  rank: number;
  name: string;
  team: string;
  nationality: string;
  flag: string;
  time: string; // e.g., "82h 45' 12\"" or gap like "+3' 25\""
  points?: number;
  stages: CyclingStageResult[];
}

export interface CyclingStageResult {
  stage: string; // e.g., "Stage 1", "Prologue"
  position: number;
  time: string;
}

// --- Rugby ---
export interface RugbyTeam {
  rank: number;
  name: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  bonusPoints: number;
  points: number;
  matches: RugbyMatch[];
}

export interface RugbyMatch {
  opponent: string;
  opponentFlag: string;
  homeAway: "home" | "away";
  scoreFor: number;
  scoreAgainst: number;
  date: string;
  venue: string;
}

// --- Tennis ---
export interface TennisPlayer {
  rank: number;
  name: string;
  flag: string;
  nationality: string;
  points: number;
  movement: number; // positive = up, negative = down, 0 = same
  age: number;
}

export interface TennisRankings {
  event: Event;
  rankings: TennisPlayer[];
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
}

export interface WorldCupGroup {
  name: string; // e.g. "Group A"
  teams: WorldCupTeam[];
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
  awayName: string;
  awayCode: string;
  awayFlag: string;
  awayScore: number | null;
  venue?: string;
}

export interface WorldCupSnapshot {
  lastUpdated: string; // ISO timestamp
  stageLabel: string; // e.g. "Group Stage"
  source?: "espn" | "mock";
  groups: WorldCupGroup[];
  matches: WorldCupMatch[];
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

// --- Rankings data for an event ---
export interface OlympicsRankings {
  event: Event;
  rankings: OlympicCountry[];
}

export interface CyclingRankings {
  event: Event;
  rankings: CyclingRider[];
}

export interface RugbyRankings {
  event: Event;
  rankings: RugbyTeam[];
}

export type Rankings = OlympicsRankings | CyclingRankings | RugbyRankings | TennisRankings;

// --- Landing page summary ---
export interface EventSummary {
  event: Event;
  topEntries: { name: string; flag: string; value: string }[];
}
