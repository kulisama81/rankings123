/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AtpDeepRankingSnapshot, AtpLivePlayer } from "@/types";
import { flagEmoji } from "./flags";
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
const DEEP_N = 1000;

function utsUrl(rowCount: number): string {
  return (
    "https://www.ultimatetennisstatistics.com/rankingsTableTable" +
    `?current=1&rowCount=${rowCount}&rankType=RANK&searchPhrase=&season=&date=`
  );
}

// UTS country.id is the IOC code (e.g. "ITA"); country.code is ISO2 (e.g. "it").
function countryCodeOf(country: any): string {
  return String(country?.id ?? country?.code ?? "").toUpperCase() || "—";
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
      flag: flagEmoji(countryCode),
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
    // Prefer ESPN's official points where available (authoritative top-rank source).
    const officialPoints = espn ? espn.points : b.officialPoints;
    const live = liveByName.get(key);
    const earned = live?.earned ?? 0;
    return {
      officialRank: b.officialRank,
      name: b.name,
      countryCode: b.countryCode,
      flag: b.flag,
      age: 0, // UTS table feed does not carry age
      officialPoints,
      livePoints: officialPoints + earned,
      pointsDelta: earned,
      careerHigh: b.careerHigh,
      tournament: live?.tournament,
    };
  });

  // Re-sort to a live ranking, keeping official rank as the tiebreaker.
  merged.sort(
    (a, b) => b.livePoints - a.livePoints || a.officialRank - b.officialRank
  );

  const players: AtpLivePlayer[] = merged.map((p, i) => ({
    ...p,
    liveRank: i + 1,
    movement: p.officialRank - (i + 1),
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
    return {
      lastUpdated: mock.lastUpdated,
      weekLabel: `${mock.weekLabel} (demo)`,
      total: mock.players.length,
      source: "mock",
      players: mock.players,
    };
  }
}
