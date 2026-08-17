import type { F1Snapshot, F1DriverStanding, F1ConstructorStanding } from "@/types";
import { getMockF1 } from "@/data/mockF1";

const WIKIPEDIA_PAGE = "2026_Formula_One_World_Championship";
const CURRENT_SEASON = 2026;

async function fetchWikipediaHtml(revalidateSeconds: number): Promise<string> {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(WIKIPEDIA_PAGE)}&prop=text&format=json`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Rankings123/1.0 (https://rankings123.com; loic.deniel@gmail.com)",
    },
    next: { revalidate: revalidateSeconds },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Wikipedia API → HTTP ${res.status}`);
  const data = await res.json();
  return data?.parse?.text?.["*"] ?? "";
}

function parseDriverStandings(html: string): F1DriverStanding[] {
  const drivers: F1DriverStanding[] = [];

  // Find the drivers' standings table
  const driversHeading = html.indexOf("World Drivers' Championship standings");
  if (driversHeading === -1) return [];

  // Find the next table after the heading
  const tableStart = html.indexOf('<table', driversHeading);
  if (tableStart === -1) return [];

  const tableEnd = html.indexOf('</table>', tableStart);
  const tableSection = html.substring(tableStart, tableEnd);

  // Split into rows
  const rows = tableSection.split('<tr>');

  for (const row of rows) {
    // Look for rank (first <td> or <th scope="row">)
    const rankMatch = row.match(/<th[^>]*scope="row"[^>]*>(\d+)</);
    if (!rankMatch) continue;

    const rank = parseInt(rankMatch[1]);

    // Extract driver name from link
    const nameMatch = row.match(/<a[^>]*title="([^"]+)"[^>]*>([^<]+)<\/a>/);
    if (!nameMatch) continue;
    const driver = nameMatch[2].trim();

    // Extract team (look for team link or text after driver)
    const teamMatches = [...row.matchAll(/<a[^>]*title="([^"]+)"[^>]*>([^<]+)<\/a>/g)];
    const team = teamMatches.length > 1 ? teamMatches[1][2].trim() : "Unknown";

    // Extract points
    const pointsMatch = row.match(/<td[^>]*>(\d+(?:,\d+)?)<\/td>/);
    const points = pointsMatch ? parseInt(pointsMatch[1].replace(/,/g, '')) : 0;

    drivers.push({
      rank,
      driver,
      team,
      points,
    });

    // Limit to top 20 for performance
    if (drivers.length >= 20) break;
  }

  return drivers.sort((a, b) => a.rank - b.rank);
}

function parseConstructorStandings(html: string): F1ConstructorStanding[] {
  const constructors: F1ConstructorStanding[] = [];

  // Find the constructors' standings table
  const constructorsHeading = html.indexOf("World Constructors' Championship standings");
  if (constructorsHeading === -1) return [];

  // Find the next table after the heading
  const tableStart = html.indexOf('<table', constructorsHeading);
  if (tableStart === -1) return [];

  const tableEnd = html.indexOf('</table>', tableStart);
  const tableSection = html.substring(tableStart, tableEnd);

  // Split into rows
  const rows = tableSection.split('<tr>');

  for (const row of rows) {
    // Look for rank
    const rankMatch = row.match(/<th[^>]*scope="row"[^>]*>(\d+)</);
    if (!rankMatch) continue;

    const rank = parseInt(rankMatch[1]);

    // Extract constructor name
    const nameMatch = row.match(/<a[^>]*title="([^"]+)"[^>]*>([^<]+)<\/a>/);
    if (!nameMatch) continue;
    const constructor = nameMatch[2].trim();

    // Extract points
    const pointsMatch = row.match(/<td[^>]*>(\d+(?:,\d+)?)<\/td>/);
    const points = pointsMatch ? parseInt(pointsMatch[1].replace(/,/g, '')) : 0;

    constructors.push({
      rank,
      constructor,
      points,
    });

    // Limit to top 10 (all F1 teams)
    if (constructors.length >= 10) break;
  }

  return constructors.sort((a, b) => a.rank - b.rank);
}

export async function getF1Standings(revalidateSeconds = 300): Promise<F1Snapshot> {
  try {
    const html = await fetchWikipediaHtml(revalidateSeconds);
    const drivers = parseDriverStandings(html);
    const constructors = parseConstructorStandings(html);

    if (drivers.length === 0 || constructors.length === 0) {
      throw new Error("No standings data found in Wikipedia");
    }

    return {
      drivers,
      constructors,
      source: "wikipedia",
      lastUpdated: new Date().toISOString(),
      season: CURRENT_SEASON,
    };
  } catch (error) {
    console.warn("F1 feed failed, using mock:", error);
    return getMockF1();
  }
}
