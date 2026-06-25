import type { WorldCupH2H, WorldCupH2HMatch } from "@/types";

// Fetch historical World Cup matches between two teams from ESPN API
// Covers past tournaments: 2022, 2018, 2014, 2010, 2006, 2002
const PAST_TOURNAMENTS = [2022, 2018, 2014, 2010, 2006, 2002];

interface ESPNEvent {
  id: string;
  date: string;
  competitions?: Array<{
    id: string;
    date: string;
    status?: {
      type?: {
        name?: string;
        shortDetail?: string;
      };
    };
    competitors?: Array<{
      team?: {
        id: string;
        displayName?: string;
        abbreviation?: string;
      };
      score?: string | number;
      homeAway?: string;
    }>;
    venue?: {
      fullName?: string;
    };
    notes?: Array<{
      headline?: string;
    }>;
  }>;
  season?: {
    year?: number;
  };
}

async function fetchTournamentMatches(year: number): Promise<ESPNEvent[]> {
  const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${year}`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }, // Cache for 1 hour (historical data doesn't change)
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.events ?? []) as ESPNEvent[];
  } catch {
    return [];
  }
}

function normalizeTeamName(name: string): string {
  // Normalize to handle variations (e.g., "USA" vs "United States")
  return name.toLowerCase().trim();
}

function isMatchBetween(event: ESPNEvent, team1: string, team2: string): boolean {
  const comp = event?.competitions?.[0];
  if (!comp) return false;

  const competitors = comp.competitors ?? [];
  if (competitors.length < 2) return false;

  const teamNames = competitors
    .map((c) => normalizeTeamName(c?.team?.displayName ?? ""))
    .filter(Boolean);

  const t1 = normalizeTeamName(team1);
  const t2 = normalizeTeamName(team2);

  return (
    (teamNames.includes(t1) && teamNames.includes(t2)) ||
    (teamNames.includes(t1.replace(/\s+/g, "")) && teamNames.includes(t2.replace(/\s+/g, "")))
  );
}

function parseH2HMatch(event: ESPNEvent, team1Name: string): WorldCupH2HMatch | null {
  const comp = event?.competitions?.[0];
  if (!comp) return null;

  const competitors = comp.competitors ?? [];
  if (competitors.length < 2) return null;

  const home = competitors.find((c) => c?.homeAway === "home") ?? competitors[0];
  const away = competitors.find((c) => c?.homeAway === "away") ?? competitors[1];

  const homeTeam = home?.team?.displayName ?? "Unknown";
  const awayTeam = away?.team?.displayName ?? "Unknown";
  const homeScore = home?.score ? Number(home.score) : null;
  const awayScore = away?.score ? Number(away.score) : null;

  // Determine result from perspective of team1
  let result: "win" | "draw" | "loss" = "draw";
  const team1IsHome = normalizeTeamName(homeTeam) === normalizeTeamName(team1Name);

  if (homeScore !== null && awayScore !== null) {
    if (homeScore > awayScore) {
      result = team1IsHome ? "win" : "loss";
    } else if (awayScore > homeScore) {
      result = team1IsHome ? "loss" : "win";
    }
  }

  const stageName = comp?.notes?.[0]?.headline ?? comp?.status?.type?.name ?? "Group Stage";

  return {
    id: String(event.id),
    date: event.date ?? comp.date ?? "",
    year: event?.season?.year ?? 0,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    result,
    stage: stageName,
    venue: comp?.venue?.fullName,
  };
}

export async function fetchWorldCupH2H(team1: string, team2: string): Promise<WorldCupH2H> {
  const allMatches: WorldCupH2HMatch[] = [];

  // Fetch matches from past tournaments in parallel
  const results = await Promise.all(PAST_TOURNAMENTS.map((year) => fetchTournamentMatches(year)));

  for (const events of results) {
    for (const event of events) {
      if (isMatchBetween(event, team1, team2)) {
        const match = parseH2HMatch(event, team1);
        if (match) {
          allMatches.push(match);
        }
      }
    }
  }

  // Sort by date descending (most recent first)
  allMatches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate aggregate stats
  const wins = allMatches.filter((m) => m.result === "win").length;
  const draws = allMatches.filter((m) => m.result === "draw").length;
  const losses = allMatches.filter((m) => m.result === "loss").length;

  return {
    team1,
    team2,
    totalMatches: allMatches.length,
    wins,
    draws,
    losses,
    matches: allMatches.slice(0, 10), // Show last 10 meetings
    source: allMatches.length > 0 ? "espn" : "none",
  };
}

export async function getWorldCupH2H(team1: string, team2: string): Promise<WorldCupH2H> {
  try {
    return await fetchWorldCupH2H(team1, team2);
  } catch {
    // Fallback: no h2h data available
    return {
      team1,
      team2,
      totalMatches: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      matches: [],
      source: "none",
    };
  }
}
