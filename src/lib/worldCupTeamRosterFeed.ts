import type { WorldCupTeamRoster } from "@/types";

const TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/teams";

/* eslint-disable @typescript-eslint/no-explicit-any */

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 180 },
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

async function fetchTeamRosterFromESPN(teamCode: string): Promise<WorldCupTeamRoster> {
  const data = await fetchJson(`${TEAM_URL}/${teamCode}?enable=roster`);

  const team = data.team || {};
  const athletes = data.team?.athletes || [];

  const roster = athletes.map((athlete: any) => ({
    id: String(athlete.id || ""),
    name: athlete.displayName || athlete.fullName || "Unknown",
    jersey: String(athlete.jersey || ""),
    position: athlete.position?.abbreviation || athlete.position?.name || "—",
    age: athlete.age || null,
    appearances: null, // ESPN team endpoint doesn't include World Cup-specific stats
    goals: null,
    assists: null,
  }));

  return {
    teamCode,
    teamName: team.displayName || teamCode,
    roster,
    source: "espn",
  };
}

export async function fetchTeamRoster(teamCode: string): Promise<WorldCupTeamRoster | null> {
  try {
    return await fetchTeamRosterFromESPN(teamCode);
  } catch {
    // No mock fallback — if roster unavailable, return null to hide the section
    // (per CX FIRST principle: no placeholders)
    return null;
  }
}
