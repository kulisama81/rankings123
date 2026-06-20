import type {
  WorldCupGroup,
  WorldCupMatch,
  WorldCupSnapshot,
  WorldCupStats,
  WorldCupTeam,
} from "@/types";
import { soccerFlag } from "@/lib/worldCupFlags";

// Bundled demo snapshot of the FIFA World Cup 2026 group stage, used as a
// graceful fallback when the live ESPN feed is unreachable. Modelled on the
// real opening-round standings so the page stays useful offline.

interface MockTeam {
  code: string;
  name: string;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  outlook: WorldCupTeam["outlook"];
  status: string;
}

const STATUS_BY_OUTLOOK: Record<NonNullable<WorldCupTeam["outlook"]>, string> = {
  advanced: "Advance to Round of 32",
  alive: "Best 8 advance",
  out: "Eliminated",
};

function buildGroup(name: string, rows: MockTeam[]): WorldCupGroup {
  const teams: WorldCupTeam[] = rows.map((t) => {
    const played = t.w + t.d + t.l;
    return {
      rank: 0,
      name: t.name,
      code: t.code,
      flag: soccerFlag(t.code),
      played,
      won: t.w,
      drawn: t.d,
      lost: t.l,
      goalsFor: t.gf,
      goalsAgainst: t.ga,
      goalDiff: t.gf - t.ga,
      points: t.w * 3 + t.d,
      status: t.status || STATUS_BY_OUTLOOK[t.outlook ?? "alive"],
      outlook: t.outlook,
    };
  });
  teams.sort(
    (a, b) =>
      b.points - a.points || b.goalDiff - a.goalDiff || b.goalsFor - a.goalsFor
  );
  teams.forEach((t, i) => (t.rank = i + 1));
  return { name, teams };
}

const groups: WorldCupGroup[] = [
  buildGroup("Group A", [
    { code: "MEX", name: "Mexico", w: 1, d: 0, l: 0, gf: 2, ga: 0, outlook: "advanced", status: "" },
    { code: "KOR", name: "South Korea", w: 1, d: 0, l: 0, gf: 2, ga: 1, outlook: "advanced", status: "" },
    { code: "CZE", name: "Czechia", w: 0, d: 0, l: 1, gf: 1, ga: 2, outlook: "alive", status: "" },
    { code: "RSA", name: "South Africa", w: 0, d: 0, l: 1, gf: 0, ga: 2, outlook: "out", status: "" },
  ]),
  buildGroup("Group B", [
    { code: "SUI", name: "Switzerland", w: 0, d: 1, l: 0, gf: 1, ga: 1, outlook: "advanced", status: "" },
    { code: "CAN", name: "Canada", w: 0, d: 1, l: 0, gf: 1, ga: 1, outlook: "advanced", status: "" },
    { code: "QAT", name: "Qatar", w: 0, d: 1, l: 0, gf: 1, ga: 1, outlook: "alive", status: "" },
    { code: "BIH", name: "Bosnia-Herzegovina", w: 0, d: 1, l: 0, gf: 1, ga: 1, outlook: "out", status: "" },
  ]),
  buildGroup("Group C", [
    { code: "SCO", name: "Scotland", w: 1, d: 0, l: 0, gf: 1, ga: 0, outlook: "advanced", status: "" },
    { code: "MAR", name: "Morocco", w: 0, d: 1, l: 0, gf: 1, ga: 1, outlook: "advanced", status: "" },
    { code: "BRA", name: "Brazil", w: 0, d: 1, l: 0, gf: 1, ga: 1, outlook: "alive", status: "" },
    { code: "HAI", name: "Haiti", w: 0, d: 0, l: 1, gf: 0, ga: 1, outlook: "out", status: "" },
  ]),
];

interface MockMatch {
  home: string;
  homeName: string;
  hs: number | null;
  away: string;
  awayName: string;
  as: number | null;
  state: WorldCupMatch["state"];
  detail: string;
  venue: string;
  offsetHours: number;
}

const mockMatches: MockMatch[] = [
  { home: "AUS", homeName: "Australia", hs: 2, away: "TUR", awayName: "Türkiye", as: 0, state: "post", detail: "FT", venue: "BC Place, Vancouver", offsetHours: -18 },
  { home: "GER", homeName: "Germany", hs: 7, away: "CUW", awayName: "Curaçao", as: 1, state: "post", detail: "FT", venue: "MetLife Stadium, New York", offsetHours: -5 },
  { home: "NED", homeName: "Netherlands", hs: 2, away: "JPN", awayName: "Japan", as: 2, state: "post", detail: "FT", venue: "SoFi Stadium, Los Angeles", offsetHours: -2 },
  { home: "ARG", homeName: "Argentina", hs: 1, away: "CRO", awayName: "Croatia", as: 0, state: "in", detail: "38'", venue: "Estadio Azteca, Mexico City", offsetHours: 1 },
  { home: "FRA", homeName: "France", hs: null, away: "NOR", awayName: "Norway", as: null, state: "pre", detail: "Scheduled", venue: "Hard Rock Stadium, Miami", offsetHours: 4 },
];

export function getWorldCupSnapshot(now: number = Date.now()): WorldCupSnapshot {
  const matches: WorldCupMatch[] = mockMatches.map((m, i) => ({
    id: `mock-${i}`,
    date: new Date(now + m.offsetHours * 3_600_000).toISOString(),
    state: m.state,
    statusDetail: m.detail,
    homeName: m.homeName,
    homeCode: m.home,
    homeFlag: soccerFlag(m.home),
    homeScore: m.hs,
    awayName: m.awayName,
    awayCode: m.away,
    awayFlag: soccerFlag(m.away),
    awayScore: m.as,
    venue: m.venue,
  }));

  return {
    lastUpdated: new Date(now).toISOString(),
    stageLabel: "Group Stage",
    groups,
    matches,
  };
}

export function getMockWorldCupStats(now: number = Date.now()): WorldCupStats {
  return {
    lastUpdated: new Date(now).toISOString(),
    source: "mock",
    topScorers: [
      {
        playerId: "1",
        playerName: "Max Müller",
        playerShortName: "M. Müller",
        jersey: "10",
        teamName: "Germany",
        teamCode: "GER",
        teamColor: "000000",
        value: 3,
        appearances: 1,
        goals: 3,
        assists: 0,
      },
      {
        playerId: "2",
        playerName: "Emma Dupont",
        playerShortName: "E. Dupont",
        jersey: "9",
        teamName: "France",
        teamCode: "FRA",
        teamColor: "001e63",
        value: 2,
        appearances: 1,
        goals: 2,
        assists: 1,
      },
    ],
    topAssisters: [
      {
        playerId: "3",
        playerName: "Carlos Silva",
        playerShortName: "C. Silva",
        jersey: "7",
        teamName: "Brazil",
        teamCode: "BRA",
        teamColor: "009739",
        value: 2,
        appearances: 1,
        goals: 0,
        assists: 2,
      },
      {
        playerId: "2",
        playerName: "Emma Dupont",
        playerShortName: "E. Dupont",
        jersey: "9",
        teamName: "France",
        teamCode: "FRA",
        teamColor: "001e63",
        value: 1,
        appearances: 1,
        goals: 2,
        assists: 1,
      },
    ],
  };
}
