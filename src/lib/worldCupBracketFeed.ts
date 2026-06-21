import type {
  WorldCupBracket,
  WorldCupMatch,
  KnockoutStage,
  WorldCupGroup,
  WorldCupTeam,
} from "@/types";
import { soccerFlag } from "./worldCupFlags";
import { getMockWorldCupBracket } from "@/data/worldCup";

const STANDINGS_URL =
  "https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings";
const SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";

/* eslint-disable @typescript-eslint/no-explicit-any */

async function fetchJson(url: string, revalidateSeconds = 180): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

// Parse ESPN standings data into WorldCupGroup[]
function parseStandings(data: any): WorldCupGroup[] {
  const groups: WorldCupGroup[] = [];
  for (const child of data?.children ?? []) {
    const entries: any[] = child?.standings?.entries ?? [];
    if (entries.length === 0) continue;

    const teams: WorldCupTeam[] = entries.map((entry) => {
      const team = entry?.team ?? {};
      const stats: any[] = entry?.stats ?? [];
      const statValue = (name: string): number => {
        const stat = (stats ?? []).find((s) => s?.name === name);
        return Math.round(Number(stat?.value ?? 0));
      };
      const gf = statValue("pointsFor");
      const ga = statValue("pointsAgainst");
      const code: string = team.abbreviation ?? "—";
      const played = statValue("gamesPlayed");
      const note = entry?.note;
      return {
        rank: statValue("rank"),
        name: team.displayName ?? team.name ?? "Unknown",
        code,
        flag: soccerFlag(code),
        played,
        won: statValue("wins"),
        drawn: statValue("ties"),
        lost: statValue("losses"),
        goalsFor: gf,
        goalsAgainst: ga,
        goalDiff: statValue("pointDifferential") || gf - ga,
        points: statValue("points"),
        status: note?.description,
        outlook: "alive",
      };
    });

    teams.sort(
      (a, b) =>
        a.rank - b.rank ||
        b.points - a.points ||
        b.goalDiff - a.goalDiff ||
        b.goalsFor - a.goalsFor
    );
    teams.forEach((t, i) => (t.rank = i + 1));

    groups.push({ name: child?.name ?? "Group", teams });
  }
  return groups;
}

// Project Round of 32 matchups from current group standings
// FIFA 2026: 12 groups → top 2 (24 teams) + 8 best 3rd-placed teams (32 total)
function projectRoundOf32(groups: WorldCupGroup[]): WorldCupMatch[] {
  // Extract group winners (rank 1) and runners-up (rank 2)
  const winners = groups.map((g) => g.teams.find((t) => t.rank === 1)).filter(Boolean);
  const runnersUp = groups.map((g) => g.teams.find((t) => t.rank === 2)).filter(Boolean);

  // Best 3rd-placed teams: rank all 3rd-place teams by points, GD, GF
  const thirds = groups
    .map((g) => g.teams.find((t) => t.rank === 3))
    .filter(Boolean)
    .sort(
      (a, b) =>
        b!.points - a!.points ||
        b!.goalDiff - a!.goalDiff ||
        b!.goalsFor - a!.goalsFor
    )
    .slice(0, 8);

  // Simplified bracket slot assignment (approximation of FIFA rules)
  // Real FIFA bracket has complex group-position-to-slot mapping
  const qualified = [...winners, ...runnersUp, ...thirds] as WorldCupTeam[];

  if (qualified.length < 32) {
    // Not enough teams projected yet — return empty
    return [];
  }

  // Generate 16 projected Round of 32 matches
  // Simple pairing: 1st vs qualifying team, avoiding same-group matchups when possible
  const matches: WorldCupMatch[] = [];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + 7); // Approx 1 week from now

  for (let i = 0; i < 16; i++) {
    const home = qualified[i] ?? { name: "TBD", code: "—", flag: "🏳️" };
    const away = qualified[31 - i] ?? { name: "TBD", code: "—", flag: "🏳️" };
    const matchDate = new Date(baseDate);
    matchDate.setHours(baseDate.getHours() + i * 3); // Stagger matches

    matches.push({
      id: `projected-r32-${i}`,
      date: matchDate.toISOString(),
      state: "pre",
      statusDetail: "Projected",
      homeName: home.name,
      homeCode: home.code,
      homeFlag: home.flag,
      homeScore: null,
      awayName: away.name,
      awayCode: away.code,
      awayFlag: away.flag,
      awayScore: null,
    });
  }

  return matches;
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
  // Fetch both knockout fixtures AND current standings for projection
  const [scoreboardData, standingsData] = await Promise.all([
    fetchJson(SCOREBOARD_URL, 180),
    fetchJson(STANDINGS_URL, 300),
  ]);

  // Extract calendar/stage information
  const calendar = scoreboardData?.leagues?.[0]?.calendar?.[0]?.entries ?? [];
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

  // Parse real knockout events from ESPN and group by stage
  const stageMatches = new Map<KnockoutStage, WorldCupMatch[]>();
  const events = scoreboardData?.events ?? [];

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

  // Parse group standings for projection
  const groups = parseStandings(standingsData);

  // If Round of 32 has no real matches yet, generate projected matchups from standings
  if (!stageMatches.has("Round of 32") || stageMatches.get("Round of 32")!.length === 0) {
    const projectedMatches = projectRoundOf32(groups);
    if (projectedMatches.length > 0) {
      stageMatches.set("Round of 32", projectedMatches);
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
