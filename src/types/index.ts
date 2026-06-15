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
  source?: "espn" | "mock";
  tour?: Tour;
  tourLabel?: string; // "ATP" | "WTA"
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
