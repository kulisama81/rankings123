import type { AtpLivePlayer, AtpLiveSnapshot, AtpTournamentStatus, Tour } from "@/types";
import { flagEmoji } from "./flags";
import { getAtpLiveSnapshot as getAtpMockSnapshot } from "@/data/atpLive";

// Real tennis data from ESPN's public site API, for either tour:
// - rankings: official weekly ranking (rank, previous rank, points, athlete bio)
// - scoreboard: current tournaments with per-match rounds, statuses and winners
const TOP_N = 100;

interface TourConfig {
  label: string;
  rankingsUrl: string;
  scoreboardUrl: string;
  singlesSlug: string;
  points: Record<Tier, Partial<Record<Round, number>>>;
  tierOf: (tournamentName: string) => Tier;
}

type Round = "R128" | "R64" | "R32" | "R16" | "QF" | "SF" | "F" | "W";
const ROUND_ORDER: Round[] = ["R128", "R64", "R32", "R16", "QF", "SF", "F", "W"];

function nextRound(round: Round): Round {
  const i = ROUND_ORDER.indexOf(round);
  return ROUND_ORDER[Math.min(i + 1, ROUND_ORDER.length - 1)];
}

// Generic tournament tiers shared across tours; points differ per tour.
type Tier = "slam" | "t1000" | "t500" | "t250";

const SLAMS = ["australian open", "roland garros", "french open", "wimbledon", "us open"];

function tierMatcher(t1000: string[], t500: string[]) {
  return (tournamentName: string): Tier => {
    const n = tournamentName.toLowerCase();
    if (SLAMS.some((t) => n.includes(t))) return "slam";
    if (t1000.some((t) => n.includes(t))) return "t1000";
    if (t500.some((t) => n.includes(t))) return "t500";
    return "t250";
  };
}

const ATP: TourConfig = {
  label: "ATP",
  rankingsUrl: "https://site.api.espn.com/apis/site/v2/sports/tennis/atp/rankings",
  scoreboardUrl: "https://site.api.espn.com/apis/site/v2/sports/tennis/atp/scoreboard",
  singlesSlug: "mens-singles",
  points: {
    slam:  { R128: 10, R64: 50, R32: 100, R16: 200, QF: 400, SF: 800, F: 1300, W: 2000 },
    t1000: { R128: 10, R64: 30, R32: 50, R16: 100, QF: 200, SF: 400, F: 650, W: 1000 },
    t500:  { R32: 0, R16: 50, QF: 100, SF: 200, F: 330, W: 500 },
    t250:  { R32: 0, R16: 25, QF: 50, SF: 100, F: 165, W: 250 },
  },
  tierOf: tierMatcher(
    ["indian wells", "bnp paribas", "miami", "monte carlo", "monte-carlo", "madrid",
     "rome", "italian open", "internazionali", "canadian open", "national bank open",
     "cincinnati", "shanghai", "paris masters", "rolex paris"],
    ["rotterdam", "abn amro", "dubai", "acapulco", "barcelona", "queen's", "queens club",
     "hsbc championships", "halle", "terra wortmann", "hamburg", "washington", "citi open",
     "beijing", "china open", "tokyo", "japan open", "vienna", "basel", "swiss indoors",
     "rio open", "dallas open"]
  ),
};

const WTA: TourConfig = {
  label: "WTA",
  rankingsUrl: "https://site.api.espn.com/apis/site/v2/sports/tennis/wta/rankings",
  scoreboardUrl: "https://site.api.espn.com/apis/site/v2/sports/tennis/wta/scoreboard",
  singlesSlug: "womens-singles",
  points: {
    slam:  { R128: 10, R64: 70, R32: 130, R16: 240, QF: 430, SF: 780, F: 1300, W: 2000 },
    t1000: { R128: 10, R64: 35, R32: 65, R16: 120, QF: 215, SF: 390, F: 650, W: 1000 },
    t500:  { R32: 1, R16: 55, QF: 108, SF: 195, F: 325, W: 500 },
    t250:  { R32: 1, R16: 30, QF: 60, SF: 110, F: 180, W: 280 },
  },
  tierOf: tierMatcher(
    ["doha", "dubai", "indian wells", "miami", "madrid", "rome", "internazionali",
     "canadian open", "national bank open", "cincinnati", "beijing", "china open",
     "wuhan", "guadalajara"],
    ["stuttgart", "charleston", "berlin", "bad homburg", "eastbourne", "washington",
     "monterrey", "abu dhabi", "tokyo", "san diego", "zhengzhou", "ningbo", "brisbane",
     "adelaide", "strasbourg", "hobart", "merida"]
  ),
};

const TOURS: Record<Tour, TourConfig> = { atp: ATP, wta: WTA };

export function isTour(value: string): value is Tour {
  return value === "atp" || value === "wta";
}

// ESPN labels early rounds "Round 1", "Round 2", … and the rest
// "Quarterfinal"/"Semifinal"/"Final". Anchor the numbered rounds to the
// quarterfinals (highest numbered round is always the one before the QF),
// which stays correct even when seeds have first-round byes.
function buildNumberedRoundMap(roundNames: string[]): Map<number, Round> {
  let maxNumbered = 0;
  for (const name of roundNames) {
    const m = name.toLowerCase().match(/^round (\d+)$/);
    if (m) maxNumbered = Math.max(maxNumbered, Number(m[1]));
  }
  const map = new Map<number, Round>();
  const qfIndex = ROUND_ORDER.indexOf("QF");
  for (let n = 1; n <= maxNumbered; n++) {
    const index = qfIndex - 1 - (maxNumbered - n);
    if (index >= 0) map.set(n, ROUND_ORDER[index]);
  }
  return map;
}

function parseRound(displayName: string, numberedRounds: Map<number, Round>): Round | null {
  const n = displayName.toLowerCase();
  if (n.includes("qualifying")) return null;
  if (n.includes("semifinal")) return "SF";
  if (n.includes("quarterfinal")) return "QF";
  if (n.includes("final")) return "F";
  const ofMatch = n.match(/round of (\d+)/);
  if (ofMatch) {
    const round = `R${ofMatch[1]}`;
    return ROUND_ORDER.includes(round as Round) ? (round as Round) : null;
  }
  const numbered = n.match(/^round (\d+)$/);
  if (numbered) return numberedRounds.get(Number(numbered[1])) ?? null;
  return null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

interface LiveStatus {
  earned: number;
  tournament: AtpTournamentStatus;
}

// Walk the scoreboard and work out, per player (by ESPN guid), the round they
// have reached in their current tournament and the ranking points earned so far.
function buildLiveStatuses(scoreboard: any, cfg: TourConfig): Map<string, LiveStatus> {
  const result = new Map<string, LiveStatus>();

  for (const event of scoreboard?.events ?? []) {
    const tournamentName: string = event.shortName || event.name || "Tournament";
    const tier = cfg.tierOf(tournamentName);
    const singles = (event.groupings ?? []).find(
      (g: any) => g?.grouping?.slug === cfg.singlesSlug
    );
    if (!singles) continue;

    const matches: any[] = singles.competitions ?? [];
    const mainDraw = matches.filter(
      (m: any) => !String(m?.round?.displayName ?? "").toLowerCase().includes("qualifying")
    );
    const numberedRounds = buildNumberedRoundMap(
      mainDraw.map((m: any) => String(m?.round?.displayName ?? ""))
    );

    const byPlayer = new Map<string, { round: Round; status: string; winner: boolean }[]>();
    for (const match of mainDraw) {
      const round = parseRound(String(match?.round?.displayName ?? ""), numberedRounds);
      if (!round) continue;
      const status: string = match?.status?.type?.name ?? "STATUS_SCHEDULED";
      for (const competitor of match?.competitors ?? []) {
        const guid = competitor?.athlete?.guid;
        if (!guid) continue;
        const list = byPlayer.get(guid) ?? [];
        list.push({ round, status, winner: competitor.winner === true });
        byPlayer.set(guid, list);
      }
    }

    for (const [guid, playerMatches] of byPlayer) {
      playerMatches.sort(
        (a, b) => ROUND_ORDER.indexOf(a.round) - ROUND_ORDER.indexOf(b.round)
      );
      const last = playerMatches[playerMatches.length - 1];

      let reached: Round = last.round;
      let active = true;
      let inPlay = false;
      if (last.status === "STATUS_FINAL") {
        if (last.winner) {
          reached = nextRound(last.round);
          active = reached !== "W";
        } else {
          active = false;
        }
      } else if (last.status === "STATUS_IN_PROGRESS") {
        inPlay = true;
      }

      result.set(guid, {
        earned: cfg.points[tier][reached] ?? 0,
        tournament: {
          name: tournamentName,
          round: inPlay ? `${reached} · in play` : reached,
          active: active || inPlay,
        },
      });
    }
  }

  return result;
}

async function fetchJson(url: string, revalidateSeconds: number): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

export async function fetchLiveSnapshot(tour: Tour): Promise<AtpLiveSnapshot> {
  const cfg = TOURS[tour];
  const [rankingsData, scoreboard] = await Promise.all([
    fetchJson(cfg.rankingsUrl, 1800),
    fetchJson(cfg.scoreboardUrl, 60),
  ]);

  const ranking = rankingsData?.rankings?.[0];
  const ranks: any[] = ranking?.ranks ?? [];
  if (ranks.length === 0) throw new Error(`ESPN ${tour} rankings feed returned no players`);

  const liveStatuses = buildLiveStatuses(scoreboard, cfg);

  const merged = ranks.slice(0, TOP_N).map((entry) => {
    const athlete = entry.athlete ?? {};
    const live = liveStatuses.get(athlete.guid);
    const officialPoints = Math.round(entry.points ?? 0);
    const earned = live?.earned ?? 0;
    return {
      officialRank: entry.current as number,
      name: (athlete.displayName as string) ?? "Unknown",
      countryCode: (athlete.citizenshipCountry as string) ?? "—",
      flag: flagEmoji(athlete.citizenshipCountry ?? ""),
      age: (athlete.age as number) ?? 0,
      officialPoints,
      livePoints: officialPoints + earned,
      pointsDelta: earned,
      tournament: live?.tournament,
    };
  });

  merged.sort((a, b) => b.livePoints - a.livePoints || a.officialRank - b.officialRank);

  const players: AtpLivePlayer[] = merged.map((p, i) => ({
    ...p,
    liveRank: i + 1,
    movement: p.officialRank - (i + 1),
  }));

  const updated = ranking?.update
    ? ` · official update ${String(ranking.update).slice(0, 10)}`
    : "";
  const tournaments = (scoreboard?.events ?? [])
    .map((e: any) => e.shortName || e.name)
    .filter(Boolean)
    .join(", ");

  return {
    lastUpdated: new Date().toISOString(),
    weekLabel: `${cfg.label} Tour${updated}${tournaments ? ` · This week: ${tournaments}` : ""}`,
    source: "espn",
    tour,
    tourLabel: cfg.label,
    players,
  };
}

// Minimal WTA fallback (top 10) so the page still renders if ESPN is unreachable.
function wtaMockSnapshot(): AtpLiveSnapshot {
  const top: [number, string, string, number, number][] = [
    [1, "Aryna Sabalenka", "BLR", 26, 9706],
    [2, "Iga Swiatek", "POL", 25, 8295],
    [3, "Coco Gauff", "USA", 22, 7874],
    [4, "Jessica Pegula", "USA", 32, 6383],
    [5, "Elena Rybakina", "KAZ", 26, 5471],
    [6, "Qinwen Zheng", "CHN", 23, 5165],
    [7, "Jasmine Paolini", "ITA", 30, 4068],
    [8, "Emma Navarro", "USA", 25, 3589],
    [9, "Daria Kasatkina", "AUS", 28, 3368],
    [10, "Barbora Krejcikova", "CZE", 30, 3214],
  ];
  return {
    lastUpdated: new Date().toISOString(),
    weekLabel: "WTA Tour · demo data",
    source: "mock",
    tour: "wta",
    tourLabel: "WTA",
    players: top.map(([rank, name, cc, age, pts]) => ({
      liveRank: rank,
      officialRank: rank,
      movement: 0,
      name,
      countryCode: cc,
      flag: flagEmoji(cc),
      age,
      officialPoints: pts,
      livePoints: pts,
      pointsDelta: 0,
    })),
  };
}

// Real data with graceful degradation: if the ESPN feed is unreachable,
// serve a bundled demo snapshot so the site keeps working offline.
export async function getLiveData(tour: Tour): Promise<AtpLiveSnapshot> {
  try {
    return await fetchLiveSnapshot(tour);
  } catch {
    if (tour === "wta") return wtaMockSnapshot();
    return { ...getAtpMockSnapshot(), source: "mock", tour: "atp", tourLabel: "ATP" };
  }
}
