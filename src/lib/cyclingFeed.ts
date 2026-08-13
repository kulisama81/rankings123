import type {
  CyclingRaceSnapshot,
  CyclingRaceMetadata,
  CyclingStage,
  CyclingGCRider,
  CyclingJerseyLeader,
} from "@/types";
import { CYCLING_RACES, detectRaceStatus } from "@/data/cyclingRaces";
import { flagEmoji } from "@/lib/flags";

async function fetchWikipediaHtml(
  wikipediaPage: string,
  revalidateSeconds: number
): Promise<string> {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(wikipediaPage)}&prop=text&format=json`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`Wikipedia API → HTTP ${res.status}`);
  const data = await res.json();
  return data?.parse?.text?.["*"] ?? "";
}

// Parse HTML to extract stage data from the wikitable
function parseStages(html: string): CyclingStage[] {
  const stages: CyclingStage[] = [];

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

    // Extract all <td> cells
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
    let type: CyclingStage["type"] = "Flat stage";
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
    let winner: string | undefined;
    const winnerCellIndex = cells.length >= 7 ? 6 : (cells.length >= 6 ? 5 : -1);
    if (winnerCellIndex >= 0 && cells[winnerCellIndex]) {
      const winnerCell = cells[winnerCellIndex];
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
      ...(winner && { winner }),
    });
  }

  return stages.sort((a, b) => a.stage - b.stage);
}

// Parse jersey leaders from the Classification leadership table
function parseJerseyLeaders(html: string, totalStages: number): {
  leaders: Map<string, { name: string; team?: string }>;
  latestStage: number;
} {
  const leaders = new Map<string, { name: string; team?: string }>();

  // Find the "Classification leadership by stage" table
  const tableStart = html.indexOf('Classification leadership by stage');
  if (tableStart === -1) return { leaders, latestStage: 0 };

  const tableEnd = html.indexOf('</table>', tableStart);
  const tableSection = html.substring(tableStart, tableEnd);

  const rows = tableSection.split('<tr>');

  let latestCompleteStage = 0;

  // Map of background colors to jersey types (works for TdF, Vuelta, Giro)
  const colorMap: Record<string, string> = {
    '#FFEB64': 'yellow',    // TdF yellow
    '#008000': 'green',     // TdF/Vuelta green
    '#FFA8A4': 'polka-dot', // TdF polka-dot
    '#F8F9FA': 'white',     // TdF/Vuelta/Giro white
    '#FF1744': 'red',       // Vuelta red
    '#FFB6C1': 'pink',      // Giro pink
    '#9C27B0': 'purple',    // Giro purple (ciclamino)
    '#2196F3': 'blue',      // Giro/Poland blue
  };

  for (const row of rows) {
    const stageMatch = row.match(/>(\d+)<\/a>/);
    if (!stageMatch) continue;

    const stageNum = parseInt(stageMatch[1]);
    if (stageNum > totalStages) continue; // Skip invalid stages

    // Extract riders for each jersey color
    for (const [bgColor, jerseyKey] of Object.entries(colorMap)) {
      const pattern = new RegExp(
        `<td[^>]*style="background:${bgColor.replace(/[()]/g, '\\$&')}[^"]*"[^>]*>.*?<a[^>]*>([^<]+)<\\/a>`,
        'i'
      );
      const match = row.match(pattern);
      if (match) {
        leaders.set(jerseyKey, { name: match[1].trim() });
        if (stageNum > latestCompleteStage) {
          latestCompleteStage = stageNum;
        }
      }
    }
  }

  return { leaders, latestStage: latestCompleteStage };
}

// Parse GC standings from the Wikipedia page
function parseGC(html: string): CyclingGCRider[] {
  const riders: CyclingGCRider[] = [];

  const tableStart = html.indexOf('General classification after Stage');
  if (tableStart === -1) return [];

  const tableEnd = html.indexOf('</tbody>', tableStart);
  if (tableEnd === -1) return [];
  const tableSection = html.substring(tableStart, tableEnd);

  const rows = tableSection.split('<tr>');

  for (const row of rows) {
    const rankMatch = row.match(/<th scope="row">(\d+)/);
    if (!rankMatch) continue;

    const rank = parseInt(rankMatch[1]);

    const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/g);
    if (!cells || cells.length < 3) continue;

    // Cell 0: Rider name (contains flag, name, country code, jerseys)
    const countryAbbrMatch = cells[0].match(/<abbr title="([^"]+)">([^<]+)<\/abbr>/);
    const country = countryAbbrMatch ? countryAbbrMatch[1] : "";
    const countryCode = countryAbbrMatch ? countryAbbrMatch[2] : "";
    const flag = flagEmoji(countryCode);

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

    // Cell 2: Time
    const timeText = cells[2]
      .replace(/<[^>]+>/g, '')
      .replace(/&#160;/g, ' ')
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .trim();

    let gap: string | undefined;
    if (timeText.startsWith('+')) {
      gap = timeText;
    } else if (rank > 1) {
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

/**
 * Fetch a single cycling race snapshot from Wikipedia.
 */
export async function getCyclingRaceSnapshot(
  raceMetadata: CyclingRaceMetadata,
  revalidateSeconds = 300
): Promise<CyclingRaceSnapshot> {
  try {
    const html = await fetchWikipediaHtml(raceMetadata.wikipediaPage, revalidateSeconds);
    const stages = parseStages(html);

    if (stages.length === 0) {
      throw new Error(`No stages found in Wikipedia data for ${raceMetadata.name}`);
    }

    // Parse jersey leaders
    const { leaders: jerseyLeaderMap, latestStage: latestStageFromJerseys } =
      parseJerseyLeaders(html, raceMetadata.totalStages);

    // Build jerseys array with actual leaders when available
    const jerseys: CyclingJerseyLeader[] = raceMetadata.jerseys.map((j) => {
      const leader = jerseyLeaderMap.get(j.jersey);
      return {
        jersey: j.jersey,
        jerseyName: j.name,
        rider: leader?.name,
        team: leader?.team,
      };
    });

    const gc = parseGC(html);

    // Calculate latest completed stage from BOTH sources
    const completedStages = stages.filter(s => s.winner);
    const latestCompletedFromStages = completedStages.length > 0
      ? Math.max(...completedStages.map(s => s.stage))
      : 0;

    const latestCompletedStage = Math.max(latestCompletedFromStages, latestStageFromJerseys);

    // Auto-detect race status
    const raceStatus = detectRaceStatus(raceMetadata, latestCompletedStage);

    // Determine current stage
    let currentStage: number | undefined;
    if (latestCompletedStage === raceMetadata.totalStages) {
      currentStage = undefined; // Race finished
    } else if (latestCompletedStage > 0 && latestCompletedStage < raceMetadata.totalStages) {
      currentStage = latestCompletedStage + 1; // Next stage
    } else if (raceStatus === "active") {
      currentStage = 1; // Race started but no completed stages yet
    } else {
      currentStage = undefined; // Pre-race or archived
    }

    return {
      metadata: raceMetadata,
      lastUpdated: new Date().toISOString(),
      raceStatus,
      currentStage,
      stages,
      gc,
      jerseys,
      source: "wikipedia",
    };
  } catch (error) {
    console.warn(`${raceMetadata.name} Wikipedia feed failed:`, error);
    // Return minimal mock fallback with correctly detected status
    const raceStatus = detectRaceStatus(raceMetadata, 0);
    return {
      metadata: raceMetadata,
      lastUpdated: new Date().toISOString(),
      raceStatus,
      stages: [],
      gc: [],
      jerseys: raceMetadata.jerseys.map(j => ({
        jersey: j.jersey,
        jerseyName: j.name,
      })),
      source: "mock",
    };
  }
}

/**
 * Fetch all configured cycling races.
 */
export async function getCyclingRaces(
  revalidateSeconds = 300
): Promise<CyclingRaceSnapshot[]> {
  const snapshots = await Promise.all(
    CYCLING_RACES.map((race) => getCyclingRaceSnapshot(race, revalidateSeconds))
  );
  return snapshots;
}

/**
 * Get the single most relevant race for the homepage/main cycling section.
 * Priority: active (with real data) > upcoming > complete (most recent) > archived
 * CX-FIRST: Never show a race as "active" if we only have mock data.
 */
export function getPrimaryRace(
  races: CyclingRaceSnapshot[]
): CyclingRaceSnapshot | null {
  if (races.length === 0) return null;

  // First, try to find an active race WITH REAL DATA (not mock)
  const activeWithData = races.filter(
    (r) => r.raceStatus === "active" && r.source !== "mock"
  );
  if (activeWithData.length > 0) {
    // Return the one with the highest current stage (most advanced)
    return activeWithData.sort((a, b) => (b.currentStage || 0) - (a.currentStage || 0))[0];
  }

  // No active race with data, find the next upcoming race
  const upcoming = races.filter((r) => r.raceStatus === "upcoming");
  if (upcoming.length > 0) {
    return upcoming.sort(
      (a, b) =>
        new Date(a.metadata.startDate).getTime() -
        new Date(b.metadata.startDate).getTime()
    )[0];
  }

  // No active or upcoming, return most recent completed race (prefer real data)
  const complete = races.filter((r) => r.raceStatus === "complete");
  if (complete.length > 0) {
    const completeWithData = complete.filter((r) => r.source !== "mock");
    const racesToSort = completeWithData.length > 0 ? completeWithData : complete;
    return racesToSort.sort(
      (a, b) =>
        new Date(b.metadata.endDate).getTime() -
        new Date(a.metadata.endDate).getTime()
    )[0];
  }

  // Fallback: return first race with real data, or any race
  const withData = races.filter((r) => r.source !== "mock");
  return withData.length > 0 ? withData[0] : races[0];
}

/**
 * Get a specific race by ID.
 */
export async function getCyclingRaceById(
  raceId: string,
  revalidateSeconds = 300
): Promise<CyclingRaceSnapshot | null> {
  const raceMetadata = CYCLING_RACES.find((r) => r.id === raceId);
  if (!raceMetadata) return null;
  return getCyclingRaceSnapshot(raceMetadata, revalidateSeconds);
}

// Backward compat: getTdfSnapshot() now returns TdF from the multi-race system
export async function getTdfSnapshot(revalidateSeconds = 300): Promise<CyclingRaceSnapshot> {
  const tdf = await getCyclingRaceById("tour-de-france-2026", revalidateSeconds);
  if (!tdf) {
    throw new Error("Tour de France 2026 not found in race configuration");
  }
  return tdf;
}
