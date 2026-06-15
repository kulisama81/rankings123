import type {
  WorldCupGroup,
  WorldCupMatch,
  WorldCupSnapshot,
  WorldCupTeam,
} from "@/types";
import { soccerFlag } from "./worldCupFlags";
import { getWorldCupSnapshot as getMockSnapshot } from "@/data/worldCup";

// Real FIFA World Cup 2026 data from ESPN's public site API:
// - standings: per-group tables (played/W/D/L/GF/GA/GD/points + advancement note)
// - scoreboard: this matchday's fixtures, live scores and results
const STANDINGS_URL =
  "https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings";
const SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";

/* eslint-disable @typescript-eslint/no-explicit-any */

async function fetchJson(url: string, revalidateSeconds: number): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

function statNumber(stats: any[], name: string): number {
  const stat = (stats ?? []).find((s) => s?.name === name);
  return Math.round(Number(stat?.value ?? 0));
}

// Map ESPN's advancement note to a simple outlook bucket for colour-coding.
function outlookFrom(description?: string): WorldCupTeam["outlook"] {
  if (!description) return "alive";
  const d = description.toLowerCase();
  if (d.includes("eliminat")) return "out";
  // "Advance to Round of 32" = qualified; "Best 8 advance" = still in contention.
  if (d.includes("round of") || d.includes("qualif")) return "advanced";
  if (d.includes("best") || d.includes("contention") || d.includes("play")) return "alive";
  if (d.includes("advance")) return "advanced";
  return "alive";
}

function parseStandings(data: any): WorldCupGroup[] {
  const groups: WorldCupGroup[] = [];
  for (const child of data?.children ?? []) {
    const entries: any[] = child?.standings?.entries ?? [];
    if (entries.length === 0) continue;

    const teams: WorldCupTeam[] = entries.map((entry) => {
      const team = entry?.team ?? {};
      const stats: any[] = entry?.stats ?? [];
      const note = entry?.note;
      const gf = statNumber(stats, "pointsFor");
      const ga = statNumber(stats, "pointsAgainst");
      const code: string = team.abbreviation ?? "—";
      return {
        rank: statNumber(stats, "rank"),
        name: team.displayName ?? team.name ?? "Unknown",
        code,
        flag: soccerFlag(code),
        played: statNumber(stats, "gamesPlayed"),
        won: statNumber(stats, "wins"),
        drawn: statNumber(stats, "ties"),
        lost: statNumber(stats, "losses"),
        goalsFor: gf,
        goalsAgainst: ga,
        goalDiff: statNumber(stats, "pointDifferential") || gf - ga,
        points: statNumber(stats, "points"),
        status: note?.description,
        outlook: outlookFrom(note?.description),
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

function parseMatches(scoreboard: any): WorldCupMatch[] {
  const matches: WorldCupMatch[] = [];
  for (const event of scoreboard?.events ?? []) {
    const comp = (event?.competitions ?? [])[0];
    if (!comp) continue;
    const competitors: any[] = comp.competitors ?? [];
    const home = competitors.find((c) => c?.homeAway === "home") ?? competitors[0];
    const away = competitors.find((c) => c?.homeAway === "away") ?? competitors[1];
    if (!home || !away) continue;

    const statusType = comp?.status?.type ?? {};
    const state = (statusType.state ?? "pre") as WorldCupMatch["state"];
    const score = (c: any): number | null => {
      if (c?.score === undefined || c?.score === null || c?.score === "") return null;
      const n = Number(c.score);
      return Number.isNaN(n) ? null : n;
    };
    const codeOf = (c: any): string => c?.team?.abbreviation ?? "—";
    const venue = comp?.venue?.fullName as string | undefined;

    matches.push({
      id: String(event?.id ?? comp?.id ?? matches.length),
      date: event?.date ?? comp?.date ?? new Date().toISOString(),
      state,
      statusDetail: statusType.shortDetail ?? statusType.detail ?? "Scheduled",
      homeName: home?.team?.displayName ?? "Home",
      homeCode: codeOf(home),
      homeFlag: soccerFlag(codeOf(home)),
      homeScore: score(home),
      awayName: away?.team?.displayName ?? "Away",
      awayCode: codeOf(away),
      awayFlag: soccerFlag(codeOf(away)),
      awayScore: score(away),
      venue,
    });
  }
  // Live matches first, then upcoming, then finished — newest result on top.
  const order: Record<WorldCupMatch["state"], number> = { in: 0, pre: 1, post: 2 };
  matches.sort((a, b) => {
    if (order[a.state] !== order[b.state]) return order[a.state] - order[b.state];
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return a.state === "post" ? db - da : da - db;
  });
  return matches;
}

export async function fetchWorldCupSnapshot(): Promise<WorldCupSnapshot> {
  const [standingsData, scoreboard] = await Promise.all([
    fetchJson(STANDINGS_URL, 300),
    fetchJson(SCOREBOARD_URL, 60),
  ]);

  const groups = parseStandings(standingsData);
  if (groups.length === 0) throw new Error("ESPN standings feed returned no groups");
  const matches = parseMatches(scoreboard);

  const stageName: string =
    scoreboard?.leagues?.[0]?.season?.type?.name ||
    standingsData?.seasons?.[0]?.types?.[0]?.name ||
    "Group Stage";

  return {
    lastUpdated: new Date().toISOString(),
    stageLabel: stageName,
    source: "espn",
    groups,
    matches,
  };
}

// Real data with graceful degradation: if the ESPN feed is unreachable,
// serve the bundled demo snapshot so the page keeps working offline.
export async function getWorldCupData(): Promise<WorldCupSnapshot> {
  try {
    return await fetchWorldCupSnapshot();
  } catch {
    return { ...getMockSnapshot(), source: "mock" };
  }
}
