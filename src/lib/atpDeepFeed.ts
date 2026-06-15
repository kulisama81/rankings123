import type { AtpLivePlayer, AtpLiveSnapshot, AtpTournamentStatus } from "@/types";
import { flagEmoji } from "./flags";
import { getAtpLiveSnapshot as getMockSnapshot } from "@/data/atpLive";

// Real ATP data from ESPN's public site API:
// - rankings: official weekly ATP rankings (rank, previous rank, points, athlete bio)
// - scoreboard: current tournaments with per-match rounds, statuses and winners
const RANKINGS_URL =
  "https://site.api.espn.com/apis/site/v2/sports/tennis/atp/rankings";
export const ATP_RANKINGS_URL = RANKINGS_URL;
const SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/tennis/atp/scoreboard";
export const ATP_SCOREBOARD_URL = SCOREBOARD_URL;
const TOP_N = 100;

type Round = "R128" | "R64" | "R32" | "R16" | "QF" | "SF" | "F" | "W";

const ROUND_ORDER: Round[] = ["R128", "R64", "R32", "R16", "QF", "SF", "F", "W"];

function nextRound(round: Round): Round {
  const i = ROUND_ORDER.indexOf(round);
  return ROUND_ORDER[Math.min(i + 1, ROUND_ORDER.length - 1)];
}

type Tier = "slam" | "m1000" | "atp500" | "atp250";

const GRAND_SLAMS = ["australian open", "french open", "roland garros", "wimbledon", "us open"];
const MASTERS_1000 = [
  "indian wells", "bnp paribas", "miami", "monte carlo", "monte-carlo", "madrid",
  "rome", "italian open", "internazionali", "canadian open", "national bank open",
  "canada masters", "cincinnati", "shanghai", "paris masters", "rolex paris",
];
const ATP_500 = [
  "rotterdam", "abn amro", "dubai", "acapulco", "mexican open", "barcelona",
  "queen's", "queens club", "halle", "terra wortmann", "hamburg", "washington",
  "citi open", "mubadala", "beijing", "china open", "tokyo", "japan open",
  "vienna", "erste bank", "basel", "swiss indoors", "rio open", "dallas open",
];

function tierOf(tournamentName: string): Tier {
  const n = tournamentName.toLowerCase();
  if (GRAND_SLAMS.some((t) => n.includes(t))) return "slam";
  if (MASTERS_1000.some((t) => n.includes(t))) return "m1000";
  if (ATP_500.some((t) => n.includes(t))) return "atp500";
  return "atp250";
}

// ATP points awarded for reaching a round (2024+ tables; entry round = 0/10).
const POINTS_BY_TIER: Record<Tier, Partial<Record<Round, number>>> = {
  slam:   { R128: 10, R64: 50, R32: 100, R16: 200, QF: 400, SF: 800, F: 1300, W: 2000 },
  m1000:  { R64: 30, R32: 50, R16: 100, QF: 200, SF: 400, F: 650, W: 1000 },
  atp500: { R16: 50, QF: 100, SF: 200, F: 330, W: 500 },
  atp250: { R16: 25, QF: 50, SF: 100, F: 165, W: 250 },
};

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

function parseRound(
  displayName: string,
  numberedRounds: Map<number, Round>
): Round | null {
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
function buildLiveStatuses(scoreboard: any): Map<string, LiveStatus> {
  const result = new Map<string, LiveStatus>();

  for (const event of scoreboard?.events ?? []) {
    const tournamentName: string = event.shortName || event.name || "Tournament";
    const tier = tierOf(tournamentName);
    const singles = (event.groupings ?? []).find(
      (g: any) => g?.grouping?.slug === "mens-singles"
    );
    if (!singles) continue;

    const matches: any[] = singles.competitions ?? [];
    const mainDraw = matches.filter(
      (m: any) => !String(m?.round?.displayName ?? "").toLowerCase().includes("qualifying")
    );
    const numberedRounds = buildNumberedRoundMap(
      mainDraw.map((m: any) => String(m?.round?.displayName ?? ""))
    );

    // Collect each player's main-draw matches.
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
          active = reached !== "W"; // champion: nothing left to play
        } else {
          active = false;
        }
      } else if (last.status === "STATUS_IN_PROGRESS") {
        inPlay = true;
      }

      result.set(guid, {
        earned: POINTS_BY_TIER[tier][reached] ?? 0,
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

export async function fetchJson(url: string, revalidateSeconds: number): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

export async function fetchAtpLiveSnapshot(): Promise<AtpLiveSnapshot> {
  const [rankingsData, scoreboard] = await Promise.all([
    fetchJson(RANKINGS_URL, 1800),
    fetchJson(SCOREBOARD_URL, 60),
  ]);

  const ranking = rankingsData?.rankings?.[0];
  const ranks: any[] = ranking?.ranks ?? [];
  if (ranks.length === 0) throw new Error("ESPN rankings feed returned no players");

  const liveStatuses = buildLiveStatuses(scoreboard);

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

  merged.sort(
    (a, b) => b.livePoints - a.livePoints || a.officialRank - b.officialRank
  );

  const players: AtpLivePlayer[] = merged.map((p, i) => ({
    ...p,
    liveRank: i + 1,
    movement: p.officialRank - (i + 1),
  }));

  const updated = ranking?.update ? ` · official update ${String(ranking.update).slice(0, 10)}` : "";
  const tournaments = (scoreboard?.events ?? [])
    .map((e: any) => e.shortName || e.name)
    .filter(Boolean)
    .join(", ");

  return {
    lastUpdated: new Date().toISOString(),
    weekLabel: `ATP Tour${updated}${tournaments ? ` · This week: ${tournaments}` : ""}`,
    source: "espn",
    players,
  };
}

// Real data with graceful degradation: if the ESPN feed is unreachable,
// serve the bundled demo snapshot so the site keeps working offline.
export async function getAtpLiveData(): Promise<AtpLiveSnapshot> {
  try {
    return await fetchAtpLiveSnapshot();
  } catch {
    return { ...getMockSnapshot(), source: "mock" };
  }
}

// ---------------------------------------------------------------------------
// Additive helpers for the deep (top ~1000) ranking. The deep source (Ultimate
// Tennis Statistics) has no shared key with ESPN, so the live overlay is joined
// by normalized player name instead of athlete GUID. These extend the feed
// without altering any of the existing exports above.
// ---------------------------------------------------------------------------

// Normalize a player name for cross-source joins: lowercase, strip accents,
// drop punctuation, collapse whitespace. "Félix Auger-Aliassime" and
// "Felix Auger Aliassime" both become "felix auger aliassime".
export function normalizeName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface LiveOverlayEntry {
  earned: number;
  tournament: AtpTournamentStatus;
}

// Same scoreboard walk as buildLiveStatuses, but keyed by normalized athlete
// name so it can be joined to a name-only deep ranking source.
export function buildLiveStatusesByName(
  scoreboard: any
): Map<string, LiveOverlayEntry> {
  const byGuid = buildLiveStatuses(scoreboard);
  const guidToName = new Map<string, string>();
  for (const event of scoreboard?.events ?? []) {
    const singles = (event.groupings ?? []).find(
      (g: any) => g?.grouping?.slug === "mens-singles"
    );
    for (const match of singles?.competitions ?? []) {
      for (const competitor of match?.competitors ?? []) {
        const guid = competitor?.athlete?.guid;
        const display = competitor?.athlete?.displayName;
        if (guid && display) guidToName.set(guid, display);
      }
    }
  }
  const byName = new Map<string, LiveOverlayEntry>();
  for (const [guid, status] of byGuid) {
    const display = guidToName.get(guid);
    if (display) byName.set(normalizeName(display), status);
  }
  return byName;
}

// Official ESPN points keyed by normalized name, used to reconcile the deep
// source's points snapshot against ESPN for the players ESPN actually covers.
export function buildEspnPointsByName(
  rankingsData: any
): Map<string, { rank: number; points: number }> {
  const ranks: any[] = rankingsData?.rankings?.[0]?.ranks ?? [];
  const map = new Map<string, { rank: number; points: number }>();
  for (const entry of ranks) {
    const name = entry?.athlete?.displayName;
    if (!name) continue;
    map.set(normalizeName(name), {
      rank: entry.current as number,
      points: Math.round(entry.points ?? 0),
    });
  }
  return map;
}
