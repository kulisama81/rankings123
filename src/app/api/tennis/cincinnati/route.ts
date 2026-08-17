import { NextResponse } from "next/server";

const ATP_SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/tennis/atp/scoreboard";
const WTA_SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/tennis/wta/scoreboard";

interface Match {
  id: string;
  player1: string;
  player2: string;
  score: string;
  status: string;
  round: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function extractMatches(
  data: any,
  singlesSlug: "mens-singles" | "womens-singles",
  matches: Match[]
) {
/* eslint-enable @typescript-eslint/no-explicit-any */
  for (const event of data?.events ?? []) {
    const tournamentName: string = event.shortName || event.name || "";

    // Filter for Cincinnati Open
    if (!tournamentName.toLowerCase().includes("cincinnati")) {
      continue;
    }

    // Get singles matches (ATP or WTA)
    const singles = (event.groupings ?? []).find(
      (g: { grouping?: { slug?: string } }) => g?.grouping?.slug === singlesSlug
    );

    if (!singles) continue;

    for (const match of singles.competitions ?? []) {
      const status = match?.status?.type?.name ?? "";

      // Only show in-progress or recently completed matches
      if (status !== "STATUS_IN_PROGRESS" && status !== "STATUS_FINAL") {
        continue;
      }

      const competitors = match?.competitors ?? [];
      if (competitors.length < 2) continue;

      const player1Name = competitors[0]?.athlete?.displayName;
      const player2Name = competitors[1]?.athlete?.displayName;

      // Skip matches with missing player data (CX-first: never show placeholders)
      if (!player1Name || !player2Name) {
        continue;
      }

      // Build score string
      let scoreStr = "";
      if (match?.status?.displayClock) {
        scoreStr = match.status.displayClock;
      } else {
        const p1Score = competitors[0]?.score || "0";
        const p2Score = competitors[1]?.score || "0";
        scoreStr = `${p1Score} - ${p2Score}`;
      }

      const roundName = match?.round?.displayName || "";

      matches.push({
        id: match.id || `${player1Name}-${player2Name}`,
        player1: player1Name,
        player2: player2Name,
        score: scoreStr,
        status: status === "STATUS_IN_PROGRESS" ? "Live" : "Final",
        round: roundName,
      });
    }
  }
}

export async function GET() {
  try {
    // Fetch both ATP and WTA scoreboards (Cincinnati is a joint tournament)
    const [atpResponse, wtaResponse] = await Promise.all([
      fetch(ATP_SCOREBOARD_URL, { next: { revalidate: 60 } }),
      fetch(WTA_SCOREBOARD_URL, { next: { revalidate: 60 } }),
    ]);

    const cincinnatiMatches: Match[] = [];

    // Process ATP scoreboard
    if (atpResponse.ok) {
      const atpData = await atpResponse.json();
      extractMatches(atpData, "mens-singles", cincinnatiMatches);
    }

    // Process WTA scoreboard
    if (wtaResponse.ok) {
      const wtaData = await wtaResponse.json();
      extractMatches(wtaData, "womens-singles", cincinnatiMatches);
    }

    return NextResponse.json({ matches: cincinnatiMatches });
  } catch {
    // Fail silently, return empty matches (CX-first: graceful degradation)
    return NextResponse.json({ matches: [] });
  }
}
