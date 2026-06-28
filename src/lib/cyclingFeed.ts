import type { TdfSnapshot, TdfStage, TdfGCRider } from "@/types";
import { getMockTdfSnapshot } from "@/data/tdf";

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

    stages.push({
      stage: stageNum,
      date,
      course: courseText,
      distance: distanceText,
      type,
    });
  }

  return stages.sort((a, b) => a.stage - b.stage);
}

// Parse GC standings from the Wikipedia page
// Note: GC data may not be available until the race starts
function parseGC(html: string): TdfGCRider[] {
  const gc: TdfGCRider[] = [];

  // Look for a General Classification table (try both capitalizations)
  const gcStart = Math.max(
    html.indexOf('General classification'),
    html.indexOf('General Classification')
  );
  if (gcStart === -1) return gc;

  // This is a placeholder - actual GC parsing would happen during the race
  // For now, return empty array as GC standings aren't available pre-race

  return gc;
}

function determineRaceStatus(stages: TdfStage[]): TdfSnapshot["raceStatus"] {
  const now = new Date();
  const year = 2026;

  // Check if any stage has a winner (race is active or complete)
  const hasWinners = stages.some(s => s.winner);
  if (hasWinners) {
    // Check if all stages are complete
    const allComplete = stages.every(s => s.winner);
    return allComplete ? "complete" : "active";
  }

  // Check if race has started based on first stage date
  // Stage 1 is July 4, 2026
  const raceStart = new Date(year, 6, 4); // Month is 0-indexed
  return now >= raceStart ? "active" : "upcoming";
}

function findCurrentStage(stages: TdfStage[], raceStatus: string): number | undefined {
  if (raceStatus !== "active") return undefined;

  // Find first stage without a winner
  const nextStage = stages.find(s => !s.winner);
  return nextStage?.stage;
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

    const gc = parseGC(html);
    const raceStatus = determineRaceStatus(stages);
    const currentStage = findCurrentStage(stages, raceStatus);

    return {
      lastUpdated: new Date().toISOString(),
      raceStatus,
      currentStage,
      stages,
      gc: gc.length > 0 ? gc : getMockTdfSnapshot().gc,
      source: "wikipedia",
    };
  } catch (error) {
    console.warn("Tour de France Wikipedia feed failed, using mock:", error);
    return getMockTdfSnapshot();
  }
}
