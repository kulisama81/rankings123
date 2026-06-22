import type { WorldCupMatchDetail } from "@/types";
import { getMockWorldCupMatchDetail } from "@/data/worldCup";

const SUMMARY_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary";

/* eslint-disable @typescript-eslint/no-explicit-any */

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

async function fetchWorldCupMatchDetailFromESPN(matchId: string): Promise<WorldCupMatchDetail> {
  const data = await fetchJson(`${SUMMARY_URL}?event=${matchId}`);

  const header = data.header || {};
  const competitions = header.competitions?.[0] || {};
  const competitors = competitions.competitors || [];
  const home = competitors.find((c: any) => c.homeAway === "home") || competitors[0];
  const away = competitors.find((c: any) => c.homeAway === "away") || competitors[1];

  const venue = data.gameInfo?.venue || {};
  const rosters = data.rosters || [];
  const homeRoster = rosters.find((r: any) => r.team?.id === home?.team?.id);
  const awayRoster = rosters.find((r: any) => r.team?.id === away?.team?.id);

  const keyEvents = (data.keyEvents || []).map((event: any) => ({
    type: event.type?.text || "Event",
    clock: event.clock?.displayValue || "",
    team: event.team?.displayName || "",
    player: event.athletesInvolved?.[0]?.displayName || "",
    description: event.text || "",
    isRedCard: event.redCard || false,
    isYellowCard: event.yellowCard || false,
    isPenalty: event.penaltyKick || false,
  }));

  const homeLineup = (homeRoster?.roster || [])
    .filter((p: any) => p.starter)
    .map((p: any) => ({
      name: p.athlete?.displayName || "",
      position: p.position?.abbreviation || "",
      jersey: p.jersey || "",
    }));

  const awayLineup = (awayRoster?.roster || [])
    .filter((p: any) => p.starter)
    .map((p: any) => ({
      name: p.athlete?.displayName || "",
      position: p.position?.abbreviation || "",
      jersey: p.jersey || "",
    }));

  const boxscore = data.boxscore?.teams || [];
  const homeStats = boxscore.find((t: any) => t.team?.id === home?.team?.id)?.statistics || [];
  const awayStats = boxscore.find((t: any) => t.team?.id === away?.team?.id)?.statistics || [];

  const statMap = (stats: any[]) => {
    const map: Record<string, string> = {};
    stats.forEach((s: any) => {
      map[s.name] = s.displayValue;
    });
    return map;
  };

  return {
    id: matchId,
    homeName: home?.team?.displayName || "Home",
    awayName: away?.team?.displayName || "Away",
    homeScore: home?.score || null,
    awayScore: away?.score || null,
    status: competitions.status?.type?.shortDetail || "Scheduled",
    venue: venue.fullName || "Unknown",
    city: venue.address?.city || "",
    attendance: data.gameInfo?.attendance || null,
    homeLineup,
    awayLineup,
    keyEvents,
    homeStats: statMap(homeStats),
    awayStats: statMap(awayStats),
    source: "espn",
  };
}

export async function fetchWorldCupMatchDetail(matchId: string): Promise<WorldCupMatchDetail> {
  try {
    return await fetchWorldCupMatchDetailFromESPN(matchId);
  } catch {
    return getMockWorldCupMatchDetail(matchId);
  }
}
