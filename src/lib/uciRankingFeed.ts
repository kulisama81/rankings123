import type { UciRankingSnapshot, UciRider } from "@/types";
import { getMockUciRanking } from "@/data/mockUciRanking";

const CYCLING_RANKING_URL = "https://www.cyclingranking.com/riders/2026";

// Country code mapping from flag class to IOC code
const FLAG_TO_CODE: Record<string, string> = {
  "flag-si": "SLO",
  "flag-dk": "DEN",
  "flag-be": "BEL",
  "flag-nl": "NED",
  "flag-fr": "FRA",
  "flag-gb": "GBR",
  "flag-es": "ESP",
  "flag-it": "ITA",
  "flag-de": "GER",
  "flag-au": "AUS",
  "flag-us": "USA",
  "flag-co": "COL",
  "flag-ch": "SUI",
  "flag-at": "AUT",
  "flag-ie": "IRL",
  "flag-nz": "NZL",
  "flag-pl": "POL",
  "flag-pt": "POR",
  "flag-no": "NOR",
  "flag-se": "SWE",
  "flag-ca": "CAN",
};

// Country name mapping from IOC code (fallback for display)
const CODE_TO_COUNTRY: Record<string, string> = {
  SLO: "Slovenia",
  DEN: "Denmark",
  BEL: "Belgium",
  NED: "Netherlands",
  FRA: "France",
  GBR: "Great Britain",
  ESP: "Spain",
  ITA: "Italy",
  GER: "Germany",
  AUS: "Australia",
  USA: "United States",
  COL: "Colombia",
  SUI: "Switzerland",
  AUT: "Austria",
  IRL: "Ireland",
  NZL: "New Zealand",
  POL: "Poland",
  POR: "Portugal",
  NOR: "Norway",
  SWE: "Sweden",
  CAN: "Canada",
};

async function fetchCyclingRankingHtml(revalidateSeconds: number): Promise<string> {
  const res = await fetch(CYCLING_RANKING_URL, {
    headers: {
      Accept: "text/html",
      "User-Agent": "Mozilla/5.0 (compatible; Rankings123Bot/1.0; +https://rankings123.com)",
    },
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`CyclingRanking.com → HTTP ${res.status}`);
  return res.text();
}

function parseRiders(html: string): UciRider[] {
  const riders: UciRider[] = [];

  // Split by table rows - look for closing </tr> to get complete rows
  const rowMatches = html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g);

  for (const match of rowMatches) {
    const row = match[1];

    // Look for rank in <td class="cr-rider-rank">NUMBER.</td>
    const rankMatch = row.match(/class="cr-rider-rank">(\d+)\./);
    if (!rankMatch) continue;

    const rank = parseInt(rankMatch[1]);

    // Extract rider name from <a href="/rider/...">NAME</a>
    const nameMatch = row.match(/<a href="\/rider\/\d+\/[^"]+">([^<]+)<\/a>/);
    if (!nameMatch) continue;
    const name = nameMatch[1]
      .trim()
      .replace(/&#160;/g, ' ')
      .replace(/&nbsp;/g, ' ');

    // Extract team from <a href="/teams/...">TEAM</a>
    const teamMatch = row.match(/<a href="\/teams\/\d+\/\d+\/[^"]+">([^<]+)<\/a>/);
    const team = teamMatch
      ? teamMatch[1].trim().replace(/&#160;/g, ' ').replace(/&nbsp;/g, ' ')
      : "Unknown";

    // Extract country code from <span title="...">CODE</span> in the country cell
    // First try the span with title
    let countryCode = "UNK";
    let country = "Unknown";

    const countrySpanMatch = row.match(/<span title="([^"]+)">([^<]+)<\/span>/);
    if (countrySpanMatch) {
      country = countrySpanMatch[1].trim();
      const codeText = countrySpanMatch[2].trim();
      countryCode = codeText;
    } else {
      // Fallback: try flag class
      const flagMatch = row.match(/class="flag flag-([a-z]{2})"/);
      if (flagMatch) {
        const flagClass = `flag-${flagMatch[1]}`;
        countryCode = FLAG_TO_CODE[flagClass] || flagMatch[1].toUpperCase();
        country = CODE_TO_COUNTRY[countryCode] || countryCode;
      }
    }

    // Extract points from <td class="cr-rider-score">POINTS</td>
    const pointsMatch = row.match(/class="cr-rider-score">(\d+)</);
    const points = pointsMatch ? parseInt(pointsMatch[1]) : 0;

    riders.push({
      rank,
      name,
      team,
      country,
      countryCode,
      points,
    });

    // Stop at 150 riders for page size reasons (can increase if needed)
    if (riders.length >= 150) break;
  }

  return riders.sort((a, b) => a.rank - b.rank);
}

export async function getUciRanking(revalidateSeconds = 86400): Promise<UciRankingSnapshot> {
  try {
    const html = await fetchCyclingRankingHtml(revalidateSeconds);
    const riders = parseRiders(html);

    if (riders.length === 0) {
      throw new Error("No riders found in CyclingRanking.com data");
    }

    return {
      lastUpdated: new Date().toISOString(),
      source: "cyclingranking",
      riders,
    };
  } catch (error) {
    console.warn("UCI ranking feed failed, using mock:", error);
    return getMockUciRanking();
  }
}
