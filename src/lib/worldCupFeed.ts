import type {
  WorldCupGroup,
  WorldCupMatch,
  WorldCupSnapshot,
  WorldCupStats,
  WorldCupPlayerStat,
  WorldCupTeam,
} from "@/types";
import { soccerFlag } from "./worldCupFlags";
import {
  getWorldCupSnapshot as getMockSnapshot,
  getMockWorldCupStats,
} from "@/data/worldCup";
import { getMatchOdds, getOddsSource } from "./worldCupOdds";

// Real FIFA World Cup 2026 data from ESPN's public site API:
// - standings: per-group tables (played/W/D/L/GF/GA/GD/points + advancement note)
// - scoreboard: this matchday's fixtures, live scores and results
// - statistics: tournament leaders (top scorers, assists, etc.)
const STANDINGS_URL =
  "https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings";
// ESPN's default scoreboard returns only ONE matchday (~3 matches), so most of the
// schedule — including matches happening "today" in the user's timezone — is missing.
// Pull the full FIFA World Cup 2026 window (Jun 11 – Jul 19) so every fixture/result
// is present; the table buckets "today" / upcoming / past client-side.
const SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719";
const STATISTICS_URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/statistics";

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

// FIFA group teams each play 3 matches. ESPN flags "Advance"/"Eliminated" as a
// PROJECTION after only 1–2 games (e.g. a team on 0 pts after a single match is
// shown "Eliminated"), which is NOT mathematically confirmed. To avoid publishing
// wrong info, we only surface a confirmed advanced/eliminated state once a team has
// completed all its group games; until then everyone is "alive" (still in contention).
const GROUP_GAMES = 3;

function outlookFrom(
  description: string | undefined,
  played: number
): WorldCupTeam["outlook"] {
  // Not confirmed until the group games are done — ignore ESPN's early projections.
  if (played < GROUP_GAMES || !description) return "alive";
  const d = description.toLowerCase();
  if (d.includes("eliminat")) return "out";
  // "Best 8 advance" = third-place contention rule, not a confirmed berth.
  if (d.includes("best")) return "alive";
  if (d.includes("advance") || d.includes("qualif") || d.includes("clinch")) return "advanced";
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
      const played = statNumber(stats, "gamesPlayed");
      return {
        rank: statNumber(stats, "rank"),
        name: team.displayName ?? team.name ?? "Unknown",
        code,
        flag: soccerFlag(code),
        played,
        won: statNumber(stats, "wins"),
        drawn: statNumber(stats, "ties"),
        lost: statNumber(stats, "losses"),
        goalsFor: gf,
        goalsAgainst: ga,
        goalDiff: statNumber(stats, "pointDifferential") || gf - ga,
        points: statNumber(stats, "points"),
        // Only show ESPN's note once it's actually confirmed (group games complete),
        // so we never display a premature "Eliminated"/"Advanced" projection.
        status: played >= GROUP_GAMES ? note?.description : undefined,
        outlook: outlookFrom(note?.description, played),
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

  // Attach odds to upcoming matches (pre-match only — never show odds as "predictions"
  // for live or finished matches, which would present unconfirmed outcomes as fact).
  const oddsSource = getOddsSource();
  const matchesWithOdds = matches.map((match) => {
    if (match.state === "pre") {
      const odds = getMatchOdds();
      return odds ? { ...match, odds } : match;
    }
    return match;
  });

  return {
    lastUpdated: new Date().toISOString(),
    stageLabel: stageName,
    source: "espn",
    oddsSource,
    groups,
    matches: matchesWithOdds,
  };
}

// Real data with graceful degradation: if the ESPN feed is unreachable,
// serve the bundled demo snapshot so the page keeps working offline.
export async function getWorldCupData(): Promise<WorldCupSnapshot> {
  try {
    return await fetchWorldCupSnapshot();
  } catch {
    const mockSnapshot = getMockSnapshot();
    const oddsSource = getOddsSource();
    const matchesWithOdds = mockSnapshot.matches.map((match) => {
      if (match.state === "pre") {
        const odds = getMatchOdds();
        return odds ? { ...match, odds } : match;
      }
      return match;
    });
    return { ...mockSnapshot, source: "mock", oddsSource, matches: matchesWithOdds };
  }
}

function parseStats(data: any): WorldCupStats {
  const stats = data?.stats ?? [];
  const goalsLeaders = stats.find((s: any) => s?.name === "goalsLeaders");
  const assistsLeaders = stats.find((s: any) => s?.name === "assistsLeaders");

  const parseLeaders = (leaders: any[]): WorldCupPlayerStat[] => {
    return (leaders ?? []).map((leader: any) => {
      const athlete = leader?.athlete ?? {};
      const team = athlete?.team ?? {};
      const athleteStats = athlete?.statistics ?? [];

      const getStat = (name: string): number => {
        const stat = athleteStats.find((s: any) => s?.name === name);
        return Math.round(Number(stat?.value ?? 0));
      };

      return {
        playerId: String(athlete.id ?? ""),
        playerName: athlete.displayName ?? "Unknown",
        playerShortName: athlete.shortName ?? athlete.displayName ?? "Unknown",
        jersey: String(athlete.jersey ?? ""),
        teamName: team.displayName ?? team.name ?? "Unknown",
        teamCode: String(team.abbreviation ?? ""),
        teamColor: String(team.color ?? "000000"),
        value: Math.round(Number(leader.value ?? 0)),
        appearances: getStat("appearances"),
        goals: getStat("totalGoals"),
        assists: getStat("goalAssists"),
      };
    });
  };

  return {
    lastUpdated: new Date().toISOString(),
    source: "espn",
    topScorers: parseLeaders(goalsLeaders?.leaders ?? []),
    topAssisters: parseLeaders(assistsLeaders?.leaders ?? []),
  };
}

export async function fetchWorldCupStats(): Promise<WorldCupStats> {
  // Fetch top 50 scorers/assisters to populate player pages (SEO long-tail).
  const data = await fetchJson(`${STATISTICS_URL}?limit=50`, 180);
  return parseStats(data);
}

export async function getWorldCupStats(): Promise<WorldCupStats> {
  try {
    return await fetchWorldCupStats();
  } catch {
    return getMockWorldCupStats();
  }
}
