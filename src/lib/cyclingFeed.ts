import type { TdfSnapshot, TdfStage, TdfGCRider } from "@/types";
import { getMockTdfSnapshot } from "@/data/tdf";
import { flagEmoji } from "@/lib/flags";

const WIKIPEDIA_API_URL =
  "https://en.wikipedia.org/w/api.php?action=parse&page=2026_Tour_de_France&prop=text&format=json";

async function fetchWikipediaHtml(revalidateSeconds: number): Promise<string> {
  const res = await fetch(WIKIPEDIA_API_URL, {
    headers: { Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`Wikipedia API → HTTP ${res.status}`);
  const data = await res.json();
  return data?.parse?.text?.["*"] ?? "";
}

// Parse HTML to extract stage data from the wikitable
function parseStages(html: string): TdfStage[] {
  const stages: TdfStage[] = [];

  // Find the stages table
  const tableStart = html.indexOf('<caption>Stage characteristics');
  if (tableStart === -1) return [];

  // Extract table section
  const tableEnd = html.indexOf('</table>', tableStart);
  const tableSection = html.substring(tableStart, tableEnd);

  // Split into rows - each row starts with <tr>
  const rows = tableSection.split('<tr>');

  for (const row of rows) {
    // Look for stage number in <th scope="row"><a...>NUMBER</a>
    const stageMatch = row.match(/scope="row"><a[^>]*>(\d+)<\/a>/);
    if (!stageMatch) continue;

    const stageNum = parseInt(stageMatch[1]);

    // Extract all <td> cells (use [\s\S] instead of . with s flag for better compatibility)
    const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/g);
    if (!cells || cells.length < 3) continue;

    // Cell 0: Date
    const dateMatch = cells[0].match(/>([^<]+)</);
    const date = dateMatch ? dateMatch[1].trim() : "";

    // Cell 1: Course (may have nested HTML tags)
    const courseText = cells[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    // Cell 2: Distance
    const distanceText = cells[2]
      .replace(/<[^>]+>/g, '')
      .replace(/&#160;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Determine type from image filename or text in following cells
    let type: TdfStage["type"] = "Flat stage";
    if (row.includes("Team_Time_Trial") || row.includes("Team time trial")) {
      type = "Team time trial";
    } else if (row.includes("Mountainstage") || row.includes("Mountain stage")) {
      type = "Mountain stage";
    } else if (row.includes("Hillystage") || row.includes("Hilly stage")) {
      type = "Hilly stage";
    } else if (row.includes("Individual_time_trial") || row.includes("Individual time trial")) {
      type = "Individual time trial";
    } else if (row.includes("Plainstage") || row.includes("Plain stage")) {
      type = "Flat stage";
    }

    // Cell 5 or 6: Winner (if stage is completed)
    // Winner cell contains: <span class="flagicon">...</span> <a href="/wiki/...">RIDER_NAME</a>
    // Extract the rider/team name from the <a> tag (skip the flag link)
    let winner: string | undefined;
    const winnerCellIndex = cells.length >= 7 ? 6 : (cells.length >= 6 ? 5 : -1);
    if (winnerCellIndex >= 0 && cells[winnerCellIndex]) {
      const winnerCell = cells[winnerCellIndex];
      // Find all <a> tags, and take the last one (the winner name, not the flag)
      // Iterate through matches to find the last one (more compatible than spread operator)
      let winnerMatch = null;
      const linkMatches = winnerCell.matchAll(/<a[^>]*>([^<]+)<\/a>/g);
      for (const match of linkMatches) {
        winnerMatch = match;
      }
      if (winnerMatch && winnerMatch[1]) {
        winner = winnerMatch[1]
          .replace(/&#160;/g, ' ')
          .replace(/&ndash;/g, '–')
          .replace(/&mdash;/g, '—')
          .replace(/&#8211;/g, '–')
          .replace(/&#8212;/g, '—')
          .trim();
      }
    }

    stages.push({
      stage: stageNum,
      date,
      course: courseText,
      distance: distanceText,
      type,
      ...(winner && { winner }), // Only include winner if it exists
    });
  }

  return stages.sort((a, b) => a.stage - b.stage);
}

// Parse jersey leaders from the Classification leadership table
function parseJerseyLeaders(html: string): {
  yellow?: { name: string; team?: string };
  green?: { name: string; team?: string };
  polkadot?: { name: string; team?: string };
  white?: { name: string; team?: string };
  latestStage?: number;
} {
  const jerseys: ReturnType<typeof parseJerseyLeaders> = {};

  // Find the "Classification leadership by stage" table
  const tableStart = html.indexOf('Classification leadership by stage');
  if (tableStart === -1) return jerseys;

  // Extract table section
  const tableEnd = html.indexOf('</table>', tableStart);
  const tableSection = html.substring(tableStart, tableEnd);

  // Split into rows
  const rows = tableSection.split('<tr>');

  let latestCompleteStage = 0;

  // Process each stage row (skip header rows)
  for (const row of rows) {
    // Look for stage number
    const stageMatch = row.match(/>(\d+)<\/a>/);
    if (!stageMatch) continue;

    const stageNum = parseInt(stageMatch[1]);

    // Extract rider names from this row FIRST
    const yellowMatch = row.match(/<td[^>]*style="background:#FFEB64[^"]*"[^>]*>.*?<a[^>]*>([^<]+)<\/a>/);
    const greenMatch = row.match(/<td[^>]*style="background:#008000[^"]*"[^>]*>.*?<a[^>]*>.*?<span[^>]*>([^<]+)<\/span>/);
    const polkadotMatch = row.match(/<td[^>]*style="background:#FFA8A4[^"]*"[^>]*>.*?<a[^>]*>([^<]+)<\/a>/);
    const whiteMatch = row.match(/<td[^>]*style="background:#F8F9FA[^"]*"[^>]*>.*?<a[^>]*>([^<]+)<\/a>/);

    // Only count as a complete stage if we found at least one jersey leader
    const hasJerseyData = yellowMatch || greenMatch || polkadotMatch || whiteMatch;

    if (hasJerseyData && stageNum > latestCompleteStage) {
      latestCompleteStage = stageNum;
      if (yellowMatch) jerseys.yellow = { name: yellowMatch[1].trim() };
      if (greenMatch) jerseys.green = { name: greenMatch[1].trim() };
      if (polkadotMatch) jerseys.polkadot = { name: polkadotMatch[1].trim() };
      if (whiteMatch) jerseys.white = { name: whiteMatch[1].trim() };
    }
  }

  // If we found any jersey leaders, set latestStage even if it's 0
  // (0 means race started but no stages complete yet)
  jerseys.latestStage = latestCompleteStage;

  return jerseys;
}

// Parse GC standings from the Wikipedia page
function parseGC(html: string): TdfGCRider[] {
  const riders: TdfGCRider[] = [];

  // Find the "General classification after Stage" table
  const tableStart = html.indexOf('General classification after Stage');
  if (tableStart === -1) return [];

  // Extract table section
  const tableEnd = html.indexOf('</tbody>', tableStart);
  if (tableEnd === -1) return [];
  const tableSection = html.substring(tableStart, tableEnd);

  // Split into rows
  const rows = tableSection.split('<tr>');

  for (const row of rows) {
    // Look for rank in <th scope="row">RANK</th>
    const rankMatch = row.match(/<th scope="row">(\d+)/);
    if (!rankMatch) continue;

    const rank = parseInt(rankMatch[1]);

    // Extract all <td> cells
    const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/g);
    if (!cells || cells.length < 3) continue;

    // Cell 0: Rider name (contains flag, name, country code, jerseys)
    // Extract country from <abbr title="COUNTRY">CODE</abbr>
    const countryAbbrMatch = cells[0].match(/<abbr title="([^"]+)">([^<]+)<\/abbr>/);
    const country = countryAbbrMatch ? countryAbbrMatch[1] : "";
    const countryCode = countryAbbrMatch ? countryAbbrMatch[2] : "";

    // Convert country code to flag emoji
    const flag = flagEmoji(countryCode);

    // Extract rider name from <a> tag
    const riderMatch = cells[0].match(/<a[^>]*>([^<]+)<\/a>/);
    if (!riderMatch) continue;
    const name = riderMatch[1]
      .replace(/&#160;/g, ' ')
      .replace(/&ndash;/g, '–')
      .replace(/&mdash;/g, '—')
      .trim();

    // Cell 1: Team
    const teamMatch = cells[1].match(/<a[^>]*>([^<]+)<\/a>/);
    const team = teamMatch
      ? teamMatch[1].replace(/&#160;/g, ' ').trim()
      : cells[1].replace(/<[^>]+>/g, '').trim();

    // Cell 2: Time (either absolute time like "32h 17' 04"" or gap like "+ 2' 42"")
    const timeText = cells[2]
      .replace(/<[^>]+>/g, '')
      .replace(/&#160;/g, ' ')
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .trim();

    // Parse the gap (if it starts with +, it's a gap; otherwise it's the leader's time)
    let gap: string | undefined;
    if (timeText.startsWith('+')) {
      gap = timeText;
    } else if (rank > 1) {
      // This shouldn't happen (non-leaders should have + gap), but handle it
      gap = timeText;
    }

    riders.push({
      rank,
      name,
      team,
      country,
      countryCode,
      flag,
      time: timeText,
      ...(gap && { gap }),
    });
  }

  return riders.sort((a, b) => a.rank - b.rank);
}


export async function getTdfSnapshot(
  revalidateSeconds = 300
): Promise<TdfSnapshot> {
  try {
    const html = await fetchWikipediaHtml(revalidateSeconds);
    const stages = parseStages(html);

    if (stages.length === 0) {
      throw new Error("No stages found in Wikipedia data");
    }

    // Parse jersey leaders from the classification table
    const jerseyLeaders = parseJerseyLeaders(html);

    // Build jerseys array with actual leaders when available
    const jerseys = [
      {
        jersey: "yellow" as const,
        jerseyName: "General Classification (Maillot Jaune)",
        rider: jerseyLeaders.yellow?.name,
        team: jerseyLeaders.yellow?.team,
      },
      {
        jersey: "green" as const,
        jerseyName: "Points Classification (Maillot Vert)",
        rider: jerseyLeaders.green?.name,
        team: jerseyLeaders.green?.team,
      },
      {
        jersey: "polka-dot" as const,
        jerseyName: "Mountains Classification (Maillot à Pois)",
        rider: jerseyLeaders.polkadot?.name,
        team: jerseyLeaders.polkadot?.team,
      },
      {
        jersey: "white" as const,
        jerseyName: "Young Rider Classification (Maillot Blanc)",
        rider: jerseyLeaders.white?.name,
        team: jerseyLeaders.white?.team,
      },
    ];

    const gc = parseGC(html);

    // Determine race status: if we have jersey leaders OR we're past the start date, race is active
    const hasJerseyLeaders = jerseyLeaders.yellow || jerseyLeaders.green || jerseyLeaders.polkadot || jerseyLeaders.white;

    // Check if we're past the race start date (July 4, 2026)
    const now = new Date();
    const raceStart = new Date(2026, 6, 4); // Month is 0-indexed
    const isPastStartDate = now >= raceStart;

    const raceStatus = (hasJerseyLeaders || isPastStartDate) ? "active" : "upcoming";

    // Calculate current stage — use the most recent completed stage from BOTH sources
    let currentStage: number | undefined;

    // Find the highest completed stage from the stages table (has a winner)
    const completedStages = stages.filter(s => s.winner);
    const latestCompletedFromStages = completedStages.length > 0
      ? Math.max(...completedStages.map(s => s.stage))
      : 0;

    // Get latest completed stage from jersey leaders
    const latestCompletedFromJerseys = typeof jerseyLeaders.latestStage === 'number'
      ? jerseyLeaders.latestStage
      : 0;

    // Use whichever source shows the most recent completed stage
    const latestCompletedStage = Math.max(latestCompletedFromStages, latestCompletedFromJerseys);

    if (latestCompletedStage > 0 && latestCompletedStage < 21) {
      // Next stage after the latest completed one
      currentStage = latestCompletedStage + 1;
    } else if (latestCompletedStage === 21) {
      // Race finished
      currentStage = undefined;
    } else if (isPastStartDate) {
      // Race started but no completed stages yet
      currentStage = 1;
    } else {
      // Pre-race
      currentStage = undefined;
    }

    return {
      lastUpdated: new Date().toISOString(),
      raceStatus,
      currentStage,
      stages,
      gc, // Keep parsed GC (empty pre-race, populated during race) - never use fabricated mock riders
      jerseys,
      source: "wikipedia",
    };
  } catch (error) {
    console.warn("Tour de France Wikipedia feed failed, using mock:", error);
    return getMockTdfSnapshot();
  }
}
