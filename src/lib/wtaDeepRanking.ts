/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AtpDeepRankingSnapshot, AtpLivePlayer } from "@/types";
import { flagEmoji } from "./flags";
import { fetchJson } from "./atpDeepFeed";

// WTA full ranking from ESPN (top ~200 players). Mirrors the ATP live feed pattern.
// NOTE: The official WTA API (api.wtatennis.com) requires authentication and is not
// publicly accessible. ESPN provides the most complete free WTA ranking data.
const WTA_SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/tennis/wta/scoreboard";
const WTA_RANKINGS_URL =
  "https://site.api.espn.com/apis/site/v2/sports/tennis/wta/rankings";

// Minimal WTA mock data for graceful degradation (top 10 WTA players as of mid-2026)
function getWtaMockSnapshot(): AtpDeepRankingSnapshot {
  const mockPlayers: AtpLivePlayer[] = [
    { liveRank: 1, officialRank: 1, name: "Aryna Sabalenka", countryCode: "BLR", flag: flagEmoji("BLR"), age: 26, officialPoints: 9716, livePoints: 9716, pointsDelta: 0, movement: 0 },
    { liveRank: 2, officialRank: 2, name: "Iga Swiatek", countryCode: "POL", flag: flagEmoji("POL"), age: 25, officialPoints: 9115, livePoints: 9115, pointsDelta: 0, movement: 0 },
    { liveRank: 3, officialRank: 3, name: "Coco Gauff", countryCode: "USA", flag: flagEmoji("USA"), age: 22, officialPoints: 7963, livePoints: 7963, pointsDelta: 0, movement: 0 },
    { liveRank: 4, officialRank: 4, name: "Elena Rybakina", countryCode: "KAZ", flag: flagEmoji("KAZ"), age: 25, officialPoints: 5871, livePoints: 5871, pointsDelta: 0, movement: 0 },
    { liveRank: 5, officialRank: 5, name: "Jessica Pegula", countryCode: "USA", flag: flagEmoji("USA"), age: 30, officialPoints: 5785, livePoints: 5785, pointsDelta: 0, movement: 0 },
    { liveRank: 6, officialRank: 6, name: "Jasmine Paolini", countryCode: "ITA", flag: flagEmoji("ITA"), age: 28, officialPoints: 5344, livePoints: 5344, pointsDelta: 0, movement: 0 },
    { liveRank: 7, officialRank: 7, name: "Qinwen Zheng", countryCode: "CHN", flag: flagEmoji("CHN"), age: 21, officialPoints: 4480, livePoints: 4480, pointsDelta: 0, movement: 0 },
    { liveRank: 8, officialRank: 8, name: "Emma Navarro", countryCode: "USA", flag: flagEmoji("USA"), age: 23, officialPoints: 3698, livePoints: 3698, pointsDelta: 0, movement: 0 },
    { liveRank: 9, officialRank: 9, name: "Daria Kasatkina", countryCode: "RUS", flag: flagEmoji("RUS"), age: 27, officialPoints: 3368, livePoints: 3368, pointsDelta: 0, movement: 0 },
    { liveRank: 10, officialRank: 10, name: "Danielle Collins", countryCode: "USA", flag: flagEmoji("USA"), age: 30, officialPoints: 3178, livePoints: 3178, pointsDelta: 0, movement: 0 },
  ];
  return {
    lastUpdated: new Date().toISOString(),
    weekLabel: "WTA Tour — Demo Data",
    total: mockPlayers.length,
    source: "mock",
    players: mockPlayers,
  };
}

// Build the WTA snapshot from ESPN rankings (top ~200 players).
export async function fetchWtaDeepRankingSnapshot(): Promise<AtpDeepRankingSnapshot> {
  const [rankingsData, scoreboard] = await Promise.all([
    fetchJson(WTA_RANKINGS_URL, 1800),
    fetchJson(WTA_SCOREBOARD_URL, 60).catch(() => null),
  ]);

  const ranking = rankingsData?.rankings?.[0];
  const ranks: any[] = ranking?.ranks ?? [];
  if (ranks.length === 0) throw new Error("ESPN WTA rankings feed returned no players");

  // For now, use ESPN rankings directly without live overlay
  // TODO: Implement live points calculation similar to ATP

  const players: AtpLivePlayer[] = ranks.map((entry, i) => {
    const athlete = entry.athlete ?? {};
    const officialPoints = Math.round(entry.points ?? 0);
    return {
      liveRank: i + 1,
      officialRank: entry.current as number,
      name: (athlete.displayName as string) ?? "Unknown",
      countryCode: (athlete.citizenshipCountry as string) ?? "—",
      flag: flagEmoji(athlete.citizenshipCountry ?? ""),
      age: (athlete.age as number) ?? 0,
      officialPoints,
      livePoints: officialPoints,
      pointsDelta: 0,
      movement: 0,
    };
  });

  const update = ranking?.update ? ` · official update ${String(ranking.update).slice(0, 10)}` : "";
  const tournaments = (scoreboard?.events ?? [])
    .map((e: any) => e.shortName || e.name)
    .filter(Boolean)
    .join(", ");

  return {
    lastUpdated: new Date().toISOString(),
    weekLabel: `WTA Tour — top ${players.length}${update}${
      tournaments ? ` · This week: ${tournaments}` : ""
    }`,
    total: players.length,
    source: "espn",
    players,
  };
}

// Graceful degradation: if ESPN feed is unreachable, fall back to bundled demo.
export async function getWtaDeepRankingData(): Promise<AtpDeepRankingSnapshot> {
  try {
    return await fetchWtaDeepRankingSnapshot();
  } catch {
    return getWtaMockSnapshot();
  }
}
