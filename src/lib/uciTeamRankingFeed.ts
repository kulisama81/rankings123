import type { UciTeamRankingSnapshot, UciTeam } from "@/types";
import { getMockUciTeamRanking } from "@/data/mockUciTeamRanking";

const CYCLING_TEAM_RANKING_URL = "https://www.cyclingranking.com/teams/2026";

async function fetchCyclingRankingHtml(revalidateSeconds: number): Promise<string> {
  const res = await fetch(CYCLING_TEAM_RANKING_URL, {
    headers: {
      Accept: "text/html",
      "User-Agent": "Mozilla/5.0 (compatible; Rankings123Bot/1.0; +https://rankings123.com)",
    },
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`CyclingRanking.com teams → HTTP ${res.status}`);
  return res.text();
}

function parseTeams(html: string): UciTeam[] {
  const teams: UciTeam[] = [];

  // Split by table rows
  const rowMatches = html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g);

  for (const match of rowMatches) {
    const row = match[1];

    // Look for rank in <td class="cr-team-rank">NUMBER.</td>
    const rankMatch = row.match(/class="cr-team-rank">(\d+)\./);
    if (!rankMatch) continue;

    const rank = parseInt(rankMatch[1]);

    // Extract team name from <a href="/teams/...">TEAM_NAME</a>
    const nameMatch = row.match(/<a href="\/teams\/\d+\/\d+\/[^"]+">([^<]+)<\/a>/);
    if (!nameMatch) continue;
    const name = nameMatch[1]
      .trim()
      .replace(/&#160;/g, ' ')
      .replace(/&nbsp;/g, ' ');

    // Extract country from flag or span
    let country = "Unknown";
    let countryCode = "UNK";

    const countrySpanMatch = row.match(/<span title="([^"]+)">([^<]+)<\/span>/);
    if (countrySpanMatch) {
      country = countrySpanMatch[1].trim();
      countryCode = countrySpanMatch[2].trim();
    } else {
      // Fallback: try flag class
      const flagMatch = row.match(/class="flag flag-([a-z]{2})"/);
      if (flagMatch) {
        countryCode = flagMatch[1].toUpperCase();
      }
    }

    // Extract points from <td class="cr-team-score">POINTS</td>
    const pointsMatch = row.match(/class="cr-team-score">(\d+)</);
    const points = pointsMatch ? parseInt(pointsMatch[1]) : 0;

    teams.push({
      rank,
      name,
      country,
      countryCode,
      points,
    });

    // Stop at 50 teams for page size
    if (teams.length >= 50) break;
  }

  return teams.sort((a, b) => a.rank - b.rank);
}

export async function getUciTeamRanking(revalidateSeconds = 86400): Promise<UciTeamRankingSnapshot> {
  try {
    const html = await fetchCyclingRankingHtml(revalidateSeconds);
    const teams = parseTeams(html);

    if (teams.length === 0) {
      throw new Error("No teams found in CyclingRanking.com data");
    }

    return {
      lastUpdated: new Date().toISOString(),
      source: "cyclingranking",
      teams,
    };
  } catch (error) {
    console.warn("UCI team ranking feed failed, using mock:", error);
    return getMockUciTeamRanking();
  }
}
