import type { WorldCupBracket, WorldCupMatch, KnockoutStage } from "@/types";
import { soccerFlag } from "./worldCupFlags";
import { getMockWorldCupBracket } from "@/data/worldCup";

const SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";

/* eslint-disable @typescript-eslint/no-explicit-any */

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 180 }, // 3min cache for bracket data
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

// Map ESPN stage labels to our knockout stage types
function normalizeStage(label: string): KnockoutStage | null {
  const lower = label.toLowerCase();
  if (lower.includes("round of 32")) return "Round of 32";
  if (lower.includes("rd of 16") || lower.includes("round of 16")) return "Rd of 16";
  if (lower.includes("quarterfinal")) return "Quarterfinals";
  if (lower.includes("semifinal")) return "Semifinals";
  if (lower.includes("3rd") || lower.includes("third")) return "3rd-Place Match";
  if (lower.includes("final") && !lower.includes("semi") && !lower.includes("quarter"))
    return "Final";
  return null;
}

function parseMatch(event: any): WorldCupMatch | null {
  const comp = (event?.competitions ?? [])[0];
  if (!comp) return null;

  const competitors: any[] = comp.competitors ?? [];
  const home = competitors.find((c) => c?.homeAway === "home") ?? competitors[0];
  const away = competitors.find((c) => c?.homeAway === "away") ?? competitors[1];
  if (!home || !away) return null;

  const statusType = comp?.status?.type ?? {};
  const state = (statusType.state ?? "pre") as WorldCupMatch["state"];
  const score = (c: any): number | null => {
    if (c?.score === undefined || c?.score === null || c?.score === "") return null;
    const n = Number(c.score);
    return Number.isNaN(n) ? null : n;
  };
  const codeOf = (c: any): string => c?.team?.abbreviation ?? "—";
  const venue = comp?.venue?.fullName as string | undefined;

  return {
    id: String(event?.id ?? comp?.id ?? ""),
    date: event?.date ?? comp?.date ?? new Date().toISOString(),
    state,
    statusDetail: statusType.shortDetail ?? statusType.detail ?? "Scheduled",
    homeName: home?.team?.displayName ?? "TBD",
    homeCode: codeOf(home),
    homeFlag: soccerFlag(codeOf(home)),
    homeScore: score(home),
    awayName: away?.team?.displayName ?? "TBD",
    awayCode: codeOf(away),
    awayFlag: soccerFlag(codeOf(away)),
    awayScore: score(away),
    venue,
  };
}

export async function fetchWorldCupBracket(): Promise<WorldCupBracket> {
  const data = await fetchJson(SCOREBOARD_URL);

  // Extract calendar/stage information
  const calendar = data?.leagues?.[0]?.calendar?.[0]?.entries ?? [];
  const stageInfo: Record<string, { startDate: string; endDate: string }> = {};
  for (const entry of calendar) {
    const stage = normalizeStage(entry.label ?? "");
    if (stage) {
      stageInfo[stage] = {
        startDate: entry.startDate ?? "",
        endDate: entry.endDate ?? "",
      };
    }
  }

  // Parse events and group by stage (use ESPN's stage metadata)
  const stageMatches = new Map<KnockoutStage, WorldCupMatch[]>();
  const events = data?.events ?? [];

  for (const event of events) {
    const match = parseMatch(event);
    if (!match) continue;

    // Determine stage from ESPN's metadata
    const seasonType = event?.season?.type;
    const stage = normalizeStage(seasonType?.name ?? event?.altGameNote ?? "");
    if (stage) {
      if (!stageMatches.has(stage)) {
        stageMatches.set(stage, []);
      }
      stageMatches.get(stage)!.push(match);
    }
  }

  // Build stages array in tournament order
  const stages: WorldCupBracket["stages"] = [];
  const stageOrder: KnockoutStage[] = [
    "Round of 32",
    "Rd of 16",
    "Quarterfinals",
    "Semifinals",
    "3rd-Place Match",
    "Final",
  ];

  for (const stageName of stageOrder) {
    const matches = stageMatches.get(stageName) ?? [];
    if (matches.length > 0 || stageInfo[stageName]) {
      stages.push({
        name: stageName,
        startDate: stageInfo[stageName]?.startDate ?? "",
        endDate: stageInfo[stageName]?.endDate ?? "",
        matches,
      });
    }
  }

  return {
    lastUpdated: new Date().toISOString(),
    source: "espn",
    stages,
  };
}

export async function getWorldCupBracket(): Promise<WorldCupBracket> {
  try {
    return await fetchWorldCupBracket();
  } catch (error) {
    console.error("Failed to fetch World Cup bracket:", error);
    return getMockWorldCupBracket();
  }
}
