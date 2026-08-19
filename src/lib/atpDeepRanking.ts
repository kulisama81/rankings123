/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AtpDeepRankingSnapshot, AtpLivePlayer } from "@/types";
import {
  ATP_SCOREBOARD_URL,
  ATP_RANKINGS_URL,
  fetchJson,
  buildLiveStatusesByName,
  buildEspnPointsByName,
  normalizeName,
} from "./atpDeepFeed";
import { getAtpLiveSnapshot as getMockSnapshot } from "@/data/atpLive";

// Ultimate Tennis Statistics exposes the full ATP singles ranking (~2160
// players) as live JSON with no auth, deep enough to surface emerging players
// well past ESPN's ~150-player feed. We take the top DEEP_N here.
// Shape per row: { rank, playerId, name, country:{id (IOC), code}, points, bestRank }.
// Reduced from 1000 to 500 to meet 300KB page budget (557KB → ~300KB, perf-atp-size-regression-557kb)
const DEEP_N = 500;

function utsUrl(rowCount: number): string {
  return (
    "https://www.ultimatetennisstatistics.com/rankingsTableTable" +
    `?current=1&rowCount=${rowCount}&rankType=RANK&searchPhrase=&season=&date=`
  );
}

// UTS country.id is the IOC code (e.g. "ITA"); country.code is ISO2 (e.g. "it").
// Filter out invalid/placeholder codes like "???" that UTS returns for unknown nationalities.
function countryCodeOf(country: any): string {
  const raw = String(country?.id ?? country?.code ?? "").toUpperCase();
  // Treat "???" as missing data (UTS uses this for players with unknown/disputed nationality)
  return raw && raw !== "???" ? raw : "—";
}

interface DeepBase {
  officialRank: number;
  name: string;
  countryCode: string;
  flag: string;
  officialPoints: number;
  careerHigh?: number;
}

async function fetchDeepRanking(): Promise<{ rows: DeepBase[]; total: number }> {
  // Larger UTS responses are revalidated ~30 min, matching the rankings cadence.
  const data = await fetchJson(utsUrl(DEEP_N), 1800);
  const rows: any[] = data?.rows ?? [];
  if (rows.length === 0) throw new Error("UTS ranking feed returned no players");
  const mapped: DeepBase[] = rows.map((r) => {
    const countryCode = countryCodeOf(r.country);
    return {
      officialRank: r.rank as number,
      name: (r.name as string) ?? "Unknown",
      countryCode,
      flag: countryCode,
      officialPoints: Math.round(r.points ?? 0),
      careerHigh: typeof r.bestRank === "number" ? r.bestRank : undefined,
    };
  });
  return { rows: mapped, total: typeof data?.total === "number" ? data.total : mapped.length };
}

// Build the deep snapshot: full UTS ranking with this week's live points (from
// the ESPN scoreboard, joined by normalized name) overlaid where a player is in
// a current draw. Official points are reconciled to ESPN for the players ESPN
// covers, since ESPN is our authoritative top-rank source.
export async function fetchAtpDeepRankingSnapshot(): Promise<AtpDeepRankingSnapshot> {
  const [{ rows, total }, scoreboard, rankingsData] = await Promise.all([
    fetchDeepRanking(),
    fetchJson(ATP_SCOREBOARD_URL, 60).catch(() => null),
    fetchJson(ATP_RANKINGS_URL, 1800).catch(() => null),
  ]);

  const liveByName = scoreboard ? buildLiveStatusesByName(scoreboard) : new Map();
  const espnByName = rankingsData ? buildEspnPointsByName(rankingsData) : new Map();

  const merged = rows.map((b) => {
    const key = normalizeName(b.name);
    const espn = espnByName.get(key);
    // Prefer ESPN's official rank AND points where available (ESPN is the authoritative
    // source for top-rank players and updates faster than UTS). This prevents implausible
    // movement indicators when UTS has stale data (e.g., UTS shows rank #896 but ESPN
    // shows #25 for the same player after a strong tournament performance).
    const officialRank = espn ? espn.rank : b.officialRank;
    const officialPoints = espn ? espn.points : b.officialPoints;
    const live = liveByName.get(key);
    const earned = live?.earned ?? 0;
    const maxPossible = live?.maxPossible ?? 0;
    return {
      guid: espn?.guid,
      officialRank,
      name: b.name,
      countryCode: b.countryCode,
      flag: b.flag,
      age: 0, // UTS table feed does not carry age
      officialPoints,
      livePoints: officialPoints + earned,
      pointsDelta: earned,
      nextPoints: officialPoints + earned, // same as livePoints
      maxPoints: officialPoints + maxPossible,
      careerHigh: b.careerHigh,
      tournament: live?.tournament,
    };
  });

  // Re-sort to a live ranking, keeping official rank as the tiebreaker.
  merged.sort(
    (a, b) => b.livePoints - a.livePoints || a.officialRank - b.officialRank
  );

  // Calculate projected ranks based on max points
  const projectedRanking = [...merged].sort((a, b) => b.maxPoints - a.maxPoints || a.officialRank - b.officialRank);
  const projectedRankMap = new Map(projectedRanking.map((p, i) => [p.name, i + 1]));

  const players: AtpLivePlayer[] = merged.map((p, i) => ({
    ...p,
    liveRank: i + 1,
    movement: p.officialRank - (i + 1),
    projectedRank: projectedRankMap.get(p.name),
  }));

  const update = rankingsData?.rankings?.[0]?.update;
  const updated = update ? ` · official update ${String(update).slice(0, 10)}` : "";
  const tournaments = (scoreboard?.events ?? [])
    .map((e: any) => e.shortName || e.name)
    .filter(Boolean)
    .join(", ");
  const hasOverlay = liveByName.size > 0;

  return {
    lastUpdated: new Date().toISOString(),
    weekLabel: `ATP Tour — full ranking (top ${players.length})${updated}${
      tournaments ? ` · This week: ${tournaments}` : ""
    }`,
    total,
    source: hasOverlay ? "uts+espn" : "uts",
    players,
  };
}

// Graceful degradation, mirroring getAtpLiveData: if UTS is unreachable, fall
// back to the bundled demo snapshot so the page keeps working offline.
export async function getAtpDeepRankingData(): Promise<AtpDeepRankingSnapshot> {
  try {
    return await fetchAtpDeepRankingSnapshot();
  } catch {
    const mock = getMockSnapshot();
    // Generate current date label without "demo" suffix (CX-FIRST: never show
    // placeholder/demo labels to users)
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return {
      lastUpdated: mock.lastUpdated,
      weekLabel: `ATP Tour — full ranking (top ${mock.players.length}) · Week of ${dateStr}`,
      total: mock.players.length,
      source: "mock",
      players: mock.players,
    };
  }
}
