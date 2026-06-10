import type { AtpLivePlayer, AtpLiveSnapshot, AtpTournamentStatus } from "@/types";

// ATP rankings as published Monday, June 8, 2026 (mock).
// Grass season week 1: BOSS Open (Stuttgart, ATP 250) and Libema Open
// ('s-Hertogenbosch, ATP 250) are in progress.

interface BasePlayer {
  officialRank: number;
  name: string;
  countryCode: string;
  flag: string;
  age: number;
  officialPoints: number;
  careerHigh: number;
  dropping: number;
  tournament?: AtpTournamentStatus;
}

const STUTTGART = "Stuttgart";
const DEN_BOSCH = "'s-Hertogenbosch";

function entered(name: string): AtpTournamentStatus {
  return { name, round: "R32", active: true };
}

const basePlayers: BasePlayer[] = [
  { officialRank: 1,  name: "Jannik Sinner",            countryCode: "ITA", flag: "🇮🇹", age: 24, officialPoints: 11830, careerHigh: 1,  dropping: 0 },
  { officialRank: 2,  name: "Carlos Alcaraz",           countryCode: "ESP", flag: "🇪🇸", age: 23, officialPoints: 11540, careerHigh: 1,  dropping: 0 },
  { officialRank: 3,  name: "Alexander Zverev",         countryCode: "GER", flag: "🇩🇪", age: 29, officialPoints: 6885,  careerHigh: 2,  dropping: 50,  tournament: entered(STUTTGART) },
  { officialRank: 4,  name: "Jack Draper",              countryCode: "GBR", flag: "🇬🇧", age: 24, officialPoints: 5930,  careerHigh: 4,  dropping: 25,  tournament: entered(STUTTGART) },
  { officialRank: 5,  name: "Novak Djokovic",           countryCode: "SRB", flag: "🇷🇸", age: 39, officialPoints: 5630,  careerHigh: 1,  dropping: 0 },
  { officialRank: 6,  name: "Lorenzo Musetti",          countryCode: "ITA", flag: "🇮🇹", age: 24, officialPoints: 4840,  careerHigh: 6,  dropping: 100 },
  { officialRank: 7,  name: "Taylor Fritz",             countryCode: "USA", flag: "🇺🇸", age: 28, officialPoints: 4735,  careerHigh: 4,  dropping: 250, tournament: entered(STUTTGART) },
  { officialRank: 8,  name: "Alex de Minaur",           countryCode: "AUS", flag: "🇦🇺", age: 27, officialPoints: 4245,  careerHigh: 6,  dropping: 165, tournament: entered(DEN_BOSCH) },
  { officialRank: 9,  name: "Holger Rune",              countryCode: "DEN", flag: "🇩🇰", age: 23, officialPoints: 3855,  careerHigh: 4,  dropping: 0,   tournament: entered(STUTTGART) },
  { officialRank: 10, name: "Daniil Medvedev",          countryCode: "RUS", flag: "🇷🇺", age: 30, officialPoints: 3590,  careerHigh: 1,  dropping: 50,  tournament: entered(DEN_BOSCH) },
  { officialRank: 11, name: "Ben Shelton",              countryCode: "USA", flag: "🇺🇸", age: 23, officialPoints: 3470,  careerHigh: 9,  dropping: 100, tournament: entered(STUTTGART) },
  { officialRank: 12, name: "Tommy Paul",               countryCode: "USA", flag: "🇺🇸", age: 29, officialPoints: 3245,  careerHigh: 9,  dropping: 0 },
  { officialRank: 13, name: "Casper Ruud",              countryCode: "NOR", flag: "🇳🇴", age: 27, officialPoints: 3130,  careerHigh: 2,  dropping: 0 },
  { officialRank: 14, name: "Andrey Rublev",            countryCode: "RUS", flag: "🇷🇺", age: 28, officialPoints: 2980,  careerHigh: 5,  dropping: 25,  tournament: entered(DEN_BOSCH) },
  { officialRank: 15, name: "Jakub Mensik",             countryCode: "CZE", flag: "🇨🇿", age: 20, officialPoints: 2865,  careerHigh: 15, dropping: 0,   tournament: entered(DEN_BOSCH) },
  { officialRank: 16, name: "Tomas Machac",             countryCode: "CZE", flag: "🇨🇿", age: 25, officialPoints: 2710,  careerHigh: 16, dropping: 13 },
  { officialRank: 17, name: "Francisco Cerundolo",      countryCode: "ARG", flag: "🇦🇷", age: 27, officialPoints: 2585,  careerHigh: 17, dropping: 0 },
  { officialRank: 18, name: "Karen Khachanov",          countryCode: "RUS", flag: "🇷🇺", age: 30, officialPoints: 2460,  careerHigh: 8,  dropping: 50,  tournament: entered(DEN_BOSCH) },
  { officialRank: 19, name: "Frances Tiafoe",           countryCode: "USA", flag: "🇺🇸", age: 28, officialPoints: 2390,  careerHigh: 10, dropping: 100, tournament: entered(STUTTGART) },
  { officialRank: 20, name: "Alexei Popyrin",           countryCode: "AUS", flag: "🇦🇺", age: 26, officialPoints: 2280,  careerHigh: 19, dropping: 0 },
  { officialRank: 21, name: "Ugo Humbert",              countryCode: "FRA", flag: "🇫🇷", age: 27, officialPoints: 2205,  careerHigh: 13, dropping: 165, tournament: entered(DEN_BOSCH) },
  { officialRank: 22, name: "Jiri Lehecka",             countryCode: "CZE", flag: "🇨🇿", age: 24, officialPoints: 2150,  careerHigh: 22, dropping: 25,  tournament: entered(STUTTGART) },
  { officialRank: 23, name: "Arthur Fils",              countryCode: "FRA", flag: "🇫🇷", age: 22, officialPoints: 2085,  careerHigh: 20, dropping: 0 },
  { officialRank: 24, name: "Grigor Dimitrov",          countryCode: "BUL", flag: "🇧🇬", age: 35, officialPoints: 1990,  careerHigh: 3,  dropping: 50,  tournament: entered(STUTTGART) },
  { officialRank: 25, name: "Alejandro Davidovich Fokina", countryCode: "ESP", flag: "🇪🇸", age: 27, officialPoints: 1920, careerHigh: 21, dropping: 0, tournament: entered(DEN_BOSCH) },
  { officialRank: 26, name: "Matteo Berrettini",        countryCode: "ITA", flag: "🇮🇹", age: 30, officialPoints: 1855,  careerHigh: 6,  dropping: 250, tournament: entered(STUTTGART) },
  { officialRank: 27, name: "Felix Auger-Aliassime",    countryCode: "CAN", flag: "🇨🇦", age: 25, officialPoints: 1790,  careerHigh: 6,  dropping: 13,  tournament: entered(STUTTGART) },
  { officialRank: 28, name: "Alex Michelsen",           countryCode: "USA", flag: "🇺🇸", age: 21, officialPoints: 1720,  careerHigh: 28, dropping: 0,   tournament: entered(DEN_BOSCH) },
  { officialRank: 29, name: "Alexander Bublik",         countryCode: "KAZ", flag: "🇰🇿", age: 29, officialPoints: 1675,  careerHigh: 17, dropping: 165, tournament: entered(DEN_BOSCH) },
  { officialRank: 30, name: "Tallon Griekspoor",        countryCode: "NED", flag: "🇳🇱", age: 29, officialPoints: 1610,  careerHigh: 21, dropping: 100, tournament: entered(DEN_BOSCH) },
  { officialRank: 31, name: "Stefanos Tsitsipas",       countryCode: "GRE", flag: "🇬🇷", age: 27, officialPoints: 1565,  careerHigh: 3,  dropping: 0 },
  { officialRank: 32, name: "Sebastian Korda",          countryCode: "USA", flag: "🇺🇸", age: 25, officialPoints: 1510,  careerHigh: 15, dropping: 50,  tournament: entered(DEN_BOSCH) },
  { officialRank: 33, name: "Denis Shapovalov",         countryCode: "CAN", flag: "🇨🇦", age: 27, officialPoints: 1460,  careerHigh: 10, dropping: 0,   tournament: entered(STUTTGART) },
  { officialRank: 34, name: "Lorenzo Sonego",           countryCode: "ITA", flag: "🇮🇹", age: 31, officialPoints: 1415,  careerHigh: 21, dropping: 25 },
  { officialRank: 35, name: "Flavio Cobolli",           countryCode: "ITA", flag: "🇮🇹", age: 24, officialPoints: 1380,  careerHigh: 32, dropping: 0,   tournament: entered(STUTTGART) },
  { officialRank: 36, name: "Joao Fonseca",             countryCode: "BRA", flag: "🇧🇷", age: 19, officialPoints: 1345,  careerHigh: 36, dropping: 0,   tournament: entered(DEN_BOSCH) },
  { officialRank: 37, name: "Giovanni Mpetshi Perricard", countryCode: "FRA", flag: "🇫🇷", age: 22, officialPoints: 1305, careerHigh: 30, dropping: 250, tournament: entered(STUTTGART) },
  { officialRank: 38, name: "Brandon Nakashima",        countryCode: "USA", flag: "🇺🇸", age: 24, officialPoints: 1270,  careerHigh: 36, dropping: 13,  tournament: entered(DEN_BOSCH) },
  { officialRank: 39, name: "Jordan Thompson",          countryCode: "AUS", flag: "🇦🇺", age: 32, officialPoints: 1230,  careerHigh: 26, dropping: 50,  tournament: entered(DEN_BOSCH) },
  { officialRank: 40, name: "Luciano Darderi",          countryCode: "ITA", flag: "🇮🇹", age: 24, officialPoints: 1195,  careerHigh: 32, dropping: 0 },
];

// Scripted live results, applied one at a time as the week "progresses".
// Point deltas follow ATP 250 increments: reach R16 +13, QF +37, SF +50, F +65, title +85.
interface ScriptedResult {
  player: string;
  tournament: string;
  round: string; // round now reached (or "out")
  delta: number; // live points gained by this result
  active: boolean;
}

const scriptedResults: ScriptedResult[] = [
  // Already played by Tuesday morning
  { player: "Holger Rune",            tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Frances Tiafoe",         tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Daniil Medvedev",        tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Jakub Mensik",           tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  // Rolling in while you watch
  { player: "Jack Draper",            tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Matteo Berrettini",      tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Alex de Minaur",         tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Alexander Bublik",       tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Taylor Fritz",           tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Denis Shapovalov",       tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Joao Fonseca",           tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Karen Khachanov",        tournament: DEN_BOSCH, round: "out", delta: 0,  active: false },
  { player: "Alexander Zverev",       tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Ben Shelton",            tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Ugo Humbert",            tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Andrey Rublev",          tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Grigor Dimitrov",        tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Jiri Lehecka",           tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Tallon Griekspoor",      tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Sebastian Korda",        tournament: DEN_BOSCH, round: "out", delta: 0,  active: false },
  { player: "Felix Auger-Aliassime",  tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Flavio Cobolli",         tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Alex Michelsen",         tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Brandon Nakashima",      tournament: DEN_BOSCH, round: "out", delta: 0,  active: false },
  { player: "Giovanni Mpetshi Perricard", tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Alejandro Davidovich Fokina", tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Jordan Thompson",        tournament: DEN_BOSCH, round: "out", delta: 0,  active: false },
  // Round of 16 begins
  { player: "Holger Rune",            tournament: STUTTGART, round: "QF",  delta: 37, active: true },
  { player: "Taylor Fritz",           tournament: STUTTGART, round: "QF",  delta: 37, active: true },
  { player: "Daniil Medvedev",        tournament: DEN_BOSCH, round: "QF",  delta: 37, active: true },
  { player: "Alex de Minaur",         tournament: DEN_BOSCH, round: "QF",  delta: 37, active: true },
  { player: "Jack Draper",            tournament: STUTTGART, round: "QF",  delta: 37, active: true },
  { player: "Frances Tiafoe",         tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Jakub Mensik",           tournament: DEN_BOSCH, round: "QF",  delta: 37, active: true },
  { player: "Alexander Bublik",       tournament: DEN_BOSCH, round: "QF",  delta: 37, active: true },
  { player: "Alexander Zverev",       tournament: STUTTGART, round: "QF",  delta: 37, active: true },
  { player: "Ben Shelton",            tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Joao Fonseca",           tournament: DEN_BOSCH, round: "QF",  delta: 37, active: true },
  { player: "Ugo Humbert",            tournament: DEN_BOSCH, round: "out", delta: 0,  active: false },
];

// How often a new scripted result lands (ms). The clock starts when the
// server process boots, so the table visibly "goes live" while browsing.
const RESULT_INTERVAL_MS = 25_000;
const INITIAL_RESULTS = 4;

const bootTime = Date.now();

export function getAtpLiveSnapshot(now: number = Date.now()): AtpLiveSnapshot {
  const elapsed = Math.max(0, now - bootTime);
  const applied = Math.min(
    scriptedResults.length,
    INITIAL_RESULTS + Math.floor(elapsed / RESULT_INTERVAL_MS)
  );

  const players = basePlayers.map((p) => ({
    ...p,
    livePoints: p.officialPoints,
    tournament: p.tournament ? { ...p.tournament } : undefined,
  }));
  const byName = new Map(players.map((p) => [p.name, p]));

  for (const result of scriptedResults.slice(0, applied)) {
    const player = byName.get(result.player);
    if (!player) continue;
    player.livePoints += result.delta;
    player.tournament = {
      name: result.tournament,
      round: result.round,
      active: result.active,
    };
  }

  const sorted = [...players].sort(
    (a, b) => b.livePoints - a.livePoints || a.officialRank - b.officialRank
  );

  const live: AtpLivePlayer[] = sorted.map((p, i) => ({
    liveRank: i + 1,
    officialRank: p.officialRank,
    movement: p.officialRank - (i + 1),
    name: p.name,
    countryCode: p.countryCode,
    flag: p.flag,
    age: p.age,
    officialPoints: p.officialPoints,
    livePoints: p.livePoints,
    pointsDelta: p.livePoints - p.officialPoints,
    careerHigh: p.careerHigh,
    dropping: p.dropping,
    tournament: p.tournament,
  }));

  return {
    lastUpdated: new Date(now).toISOString(),
    weekLabel: "Week of June 8, 2026 · Grass season",
    players: live,
  };
}
