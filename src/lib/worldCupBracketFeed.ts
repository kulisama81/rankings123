import type {
  WorldCupBracket,
  WorldCupMatch,
  KnockoutStage,
  WorldCupGroup,
  WorldCupTeam,
} from "@/types";
import { soccerFlag } from "./worldCupFlags";
import { getMockWorldCupBracket } from "@/data/worldCup";
import {
  getR16Sources,
} from "./worldCupBracketTree";
import {
  getCachedStandings,
  getCachedScoreboardFull,
} from "./worldCupSharedCache";

/* eslint-disable @typescript-eslint/no-explicit-any */

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

// Official FIFA 2026 Round of 32 bracket template (per the tournament regulations).
// 12 groups A–L: the 12 winners (1X) + 12 runners-up (2X) + 8 best third-placed teams
// advance. Winner/runner-up pairings are FIXED by the bracket — note this 48-team format
// DOES pair some runners-up against each other (e.g. 2A v 2B), unlike the old 32-team
// 1-v-2 format. The eight 3rd-place slots take the best thirds, each constrained to a
// specific set of groups; the exact third→slot mapping comes from FIFA's 495-combination
// table (Annex C), which we approximate greedily within each slot's allowed groups. The
// whole bracket is clearly labelled a projection from current standings.
type SlotSpec =
  | { kind: "winner"; group: string }
  | { kind: "runnerup"; group: string }
  | { kind: "third"; allowed: string[] };

const R32_TEMPLATE: { home: SlotSpec; away: SlotSpec }[] = [
  { home: { kind: "runnerup", group: "A" }, away: { kind: "runnerup", group: "B" } }, // M73
  { home: { kind: "winner", group: "E" }, away: { kind: "third", allowed: ["A", "B", "C", "D", "F"] } }, // M74
  { home: { kind: "winner", group: "F" }, away: { kind: "runnerup", group: "C" } }, // M75
  { home: { kind: "winner", group: "C" }, away: { kind: "runnerup", group: "F" } }, // M76
  { home: { kind: "winner", group: "I" }, away: { kind: "third", allowed: ["C", "D", "F", "G", "H"] } }, // M77
  { home: { kind: "runnerup", group: "E" }, away: { kind: "runnerup", group: "I" } }, // M78
  { home: { kind: "winner", group: "A" }, away: { kind: "third", allowed: ["C", "E", "F", "H", "I"] } }, // M79
  { home: { kind: "winner", group: "L" }, away: { kind: "third", allowed: ["E", "H", "I", "J", "K"] } }, // M80
  { home: { kind: "winner", group: "D" }, away: { kind: "third", allowed: ["B", "E", "F", "I", "J"] } }, // M81
  { home: { kind: "winner", group: "G" }, away: { kind: "third", allowed: ["A", "E", "H", "I", "J"] } }, // M82
  { home: { kind: "runnerup", group: "K" }, away: { kind: "runnerup", group: "L" } }, // M83
  { home: { kind: "winner", group: "H" }, away: { kind: "runnerup", group: "J" } }, // M84
  { home: { kind: "winner", group: "B" }, away: { kind: "third", allowed: ["E", "F", "G", "I", "J"] } }, // M85
  { home: { kind: "winner", group: "J" }, away: { kind: "runnerup", group: "H" } }, // M86
  { home: { kind: "winner", group: "K" }, away: { kind: "third", allowed: ["D", "E", "I", "J", "L"] } }, // M87
  { home: { kind: "runnerup", group: "D" }, away: { kind: "runnerup", group: "G" } }, // M88
];

const GROUP_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

// Project Round of 32 matchups from current group standings, following the official FIFA
// 2026 bracket template (winner/runner-up slots exact; thirds approximated).
function projectRoundOf32(groups: WorldCupGroup[]): WorldCupMatch[] {
  const byLetter = new Map<string, WorldCupGroup>();
  for (const g of groups) {
    const letter = g.name.replace(/group/i, "").trim().toUpperCase();
    byLetter.set(letter, g);
  }
  // Need all 12 groups (each with a current 1st/2nd/3rd) to project the bracket.
  if (!GROUP_LETTERS.every((l) => byLetter.has(l))) return [];
  const teamAt = (letter: string, rank: number): WorldCupTeam | undefined =>
    byLetter.get(letter)?.teams.find((t) => t.rank === rank);

  // Best 8 third-placed teams by current points / GD / GF (best → worst order kept for
  // the "best-ranked third" slot assignment).
  const thirdsRanked = GROUP_LETTERS.map((l) => ({ letter: l, team: teamAt(l, 3) }))
    .filter((x) => x.team)
    .sort(
      (a, b) =>
        b.team!.points - a.team!.points ||
        b.team!.goalDiff - a.team!.goalDiff ||
        b.team!.goalsFor - a.team!.goalsFor
    )
    .slice(0, 8);
  if (thirdsRanked.length < 8) return [];
  const qualifyingThirds = thirdsRanked.map((x) => x.letter); // best → worst

  // Assign qualifying thirds to the eight 3rd-place slots, respecting each slot's allowed
  // groups: fill the most-constrained slots first, taking the best-ranked available third
  // (approximates FIFA's Annex C combination table for a projection).
  const thirdSlots = R32_TEMPLATE.map((m, i) => ({ i, away: m.away })).filter(
    (s): s is { i: number; away: Extract<SlotSpec, { kind: "third" }> } => s.away.kind === "third"
  );
  const used = new Set<string>();
  const assignment = new Map<number, string>();
  const slotsByConstraint = [...thirdSlots].sort(
    (a, b) =>
      a.away.allowed.filter((g) => qualifyingThirds.includes(g)).length -
      b.away.allowed.filter((g) => qualifyingThirds.includes(g)).length
  );
  for (const slot of slotsByConstraint) {
    const remaining = qualifyingThirds.filter((l) => !used.has(l));
    // Only pick from the allowed groups for this slot (no fallback to invalid groups)
    const pick = remaining.find((l) => slot.away.allowed.includes(l));
    if (pick) {
      assignment.set(slot.i, pick);
      used.add(pick);
    }
  }

  const resolve = (
    spec: SlotSpec,
    templateIndex: number
  ): { team?: WorldCupTeam; label: string } => {
    if (spec.kind === "winner") return { team: teamAt(spec.group, 1), label: `1st Group ${spec.group}` };
    if (spec.kind === "runnerup") return { team: teamAt(spec.group, 2), label: `2nd Group ${spec.group}` };
    const letter = assignment.get(templateIndex);
    return { team: letter ? teamAt(letter, 3) : undefined, label: letter ? `3rd Group ${letter}` : "Best 3rd" };
  };

  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + 7);

  const matches: WorldCupMatch[] = [];
  R32_TEMPLATE.forEach((tmpl, i) => {
    const home = resolve(tmpl.home, i);
    const away = resolve(tmpl.away, i);
    if (!home.team || !away.team) return; // skip until standings provide both slots
    const matchDate = new Date(baseDate);
    matchDate.setHours(baseDate.getHours() + i * 3);
    matches.push({
      id: `projected-r32-${i}`,
      date: matchDate.toISOString(),
      state: "pre",
      statusDetail: "Projected",
      homeName: home.team.name,
      homeCode: home.team.code,
      homeFlag: home.team.flag,
      homeScore: null,
      homeSeedLabel: home.label,
      awayName: away.team.name,
      awayCode: away.team.code,
      awayFlag: away.team.flag,
      awayScore: null,
      awaySeedLabel: away.label,
    });
  });

  return matches;
}

// Project future rounds (R16/QF/SF/Final) as placeholders when they don't exist yet.
// Uses the official bracket tree mappings to create traceable "Winner R32-x" slots.
function projectFutureRounds(r32Matches: WorldCupMatch[]): {
  r16: WorldCupMatch[];
  qf: WorldCupMatch[];
  sf: WorldCupMatch[];
  final: WorldCupMatch | null;
} {
  if (r32Matches.length === 0) return { r16: [], qf: [], sf: [], final: null };

  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + 10); // offset from R32

  // R16: 8 matches, each fed by 2 R32 winners
  const r16Matches: WorldCupMatch[] = [];
  for (let i = 0; i < 8; i++) {
    const sourceIndices = getR16Sources(i); // [r32Index1, r32Index2]
    const matchDate = new Date(baseDate);
    matchDate.setHours(baseDate.getHours() + i * 3);

    r16Matches.push({
      id: `projected-r16-${i}`,
      date: matchDate.toISOString(),
      state: "pre",
      statusDetail: "Projected",
      homeName: "TBD",
      homeCode: "—",
      homeFlag: "🏆",
      homeScore: null,
      homeSeedLabel: sourceIndices[0] !== undefined ? `Winner of R32 Match ${sourceIndices[0] + 1}` : undefined,
      awayName: "TBD",
      awayCode: "—",
      awayFlag: "🏆",
      awayScore: null,
      awaySeedLabel: sourceIndices[1] !== undefined ? `Winner of R32 Match ${sourceIndices[1] + 1}` : undefined,
    });
  }

  // QF: 4 matches, each fed by 2 R16 winners
  const qfMatches: WorldCupMatch[] = [];
  for (let i = 0; i < 4; i++) {
    const matchDate = new Date(baseDate);
    matchDate.setDate(baseDate.getDate() + 3);
    matchDate.setHours(baseDate.getHours() + i * 4);

    qfMatches.push({
      id: `projected-qf-${i}`,
      date: matchDate.toISOString(),
      state: "pre",
      statusDetail: "Projected",
      homeName: "TBD",
      homeCode: "—",
      homeFlag: "🏆",
      homeScore: null,
      homeSeedLabel: undefined, // Seed labels omitted for later rounds - bracket tree shows connections visually
      awayName: "TBD",
      awayCode: "—",
      awayFlag: "🏆",
      awayScore: null,
      awaySeedLabel: undefined, // Seed labels omitted for later rounds - bracket tree shows connections visually
    });
  }

  // SF: 2 matches, each fed by 2 QF winners
  const sfMatches: WorldCupMatch[] = [];
  for (let i = 0; i < 2; i++) {
    const matchDate = new Date(baseDate);
    matchDate.setDate(baseDate.getDate() + 6);
    matchDate.setHours(baseDate.getHours() + i * 6);

    sfMatches.push({
      id: `projected-sf-${i}`,
      date: matchDate.toISOString(),
      state: "pre",
      statusDetail: "Projected",
      homeName: "TBD",
      homeCode: "—",
      homeFlag: "🏆",
      homeScore: null,
      homeSeedLabel: undefined, // Seed labels omitted for later rounds - bracket tree shows connections visually
      awayName: "TBD",
      awayCode: "—",
      awayFlag: "🏆",
      awayScore: null,
      awaySeedLabel: undefined, // Seed labels omitted for later rounds - bracket tree shows connections visually
    });
  }

  // Final: 1 match, fed by 2 SF winners
  const finalDate = new Date(baseDate);
  finalDate.setDate(baseDate.getDate() + 9);
  const finalMatch: WorldCupMatch = {
    id: "projected-final",
    date: finalDate.toISOString(),
    state: "pre",
    statusDetail: "Projected",
    homeName: "TBD",
    homeCode: "—",
    homeFlag: "🏆",
    homeScore: null,
    homeSeedLabel: undefined, // Seed labels omitted for Final - bracket tree shows connections visually
    awayName: "TBD",
    awayCode: "—",
    awayFlag: "🏆",
    awayScore: null,
    awaySeedLabel: undefined, // Seed labels omitted for Final - bracket tree shows connections visually
  };

  return { r16: r16Matches, qf: qfMatches, sf: sfMatches, final: finalMatch };
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
    getCachedScoreboardFull(),
    getCachedStandings(),
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

  // Project future rounds (R16/QF/SF/Final) as placeholders when they don't exist yet
  const r32Matches = stageMatches.get("Round of 32") ?? [];
  if (r32Matches.length > 0) {
    const futureRounds = projectFutureRounds(r32Matches);

    // Only add projected rounds if the real matches don't exist yet
    if (!stageMatches.has("Rd of 16") || (stageMatches.get("Rd of 16")?.length ?? 0) === 0) {
      stageMatches.set("Rd of 16", futureRounds.r16);
    }
    if (!stageMatches.has("Quarterfinals") || (stageMatches.get("Quarterfinals")?.length ?? 0) === 0) {
      stageMatches.set("Quarterfinals", futureRounds.qf);
    }
    if (!stageMatches.has("Semifinals") || (stageMatches.get("Semifinals")?.length ?? 0) === 0) {
      stageMatches.set("Semifinals", futureRounds.sf);
    }
    if (futureRounds.final && (!stageMatches.has("Final") || (stageMatches.get("Final")?.length ?? 0) === 0)) {
      stageMatches.set("Final", [futureRounds.final]);
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
