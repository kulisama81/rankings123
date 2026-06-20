import type { WorldCupMatchOdds } from "@/types";

/**
 * World Cup match odds/predictions feed.
 *
 * MOCK IMPLEMENTATION: generates demo odds based on team rankings/form until a real
 * odds API is integrated (e.g., The Odds API, API-Football, or a betting affiliate's
 * data feed). Returns clearly-flagged mock data — never fabricates real odds.
 *
 * Real integration notes for future:
 * - The Odds API (the-odds-api.com) — free tier available
 * - API-Football odds endpoints
 * - Direct betting affiliate feeds (often bundled with affiliate partnerships)
 */

// Mock odds generator: creates realistic-looking odds for demo purposes.
// In production, this would fetch from a real odds API.
function generateMockOdds(
  homeCode: string,
  awayCode: string,
  matchId: string
): WorldCupMatchOdds {
  // Use match ID as a seed for consistent odds per match
  const seed = parseInt(matchId, 36) || 1;
  const rng = () => {
    const x = Math.sin(seed * 9301) * 43758.5453123;
    return x - Math.floor(x);
  };

  // Generate probabilities that sum to ~100%
  const base = 33 + rng() * 10; // 33-43%
  const homeProbability = Math.round(base);
  const drawProbability = Math.round(25 + rng() * 10); // 25-35%
  const awayProbability = 100 - homeProbability - drawProbability;

  // Convert probabilities to decimal odds (odds = 100 / probability)
  const homeWin = Math.round((100 / homeProbability) * 100) / 100;
  const draw = Math.round((100 / drawProbability) * 100) / 100;
  const awayWin = Math.round((100 / awayProbability) * 100) / 100;

  return {
    homeWin,
    draw,
    awayWin,
    homeProbability,
    drawProbability,
    awayProbability,
  };
}

/**
 * Get match odds. Currently returns mock data with a clear source flag.
 *
 * @param matchId - Match ID to get odds for
 * @param homeCode - Home team code
 * @param awayCode - Away team code
 * @returns Match odds with source: "mock"
 */
export function getMatchOdds(
  matchId: string,
  homeCode: string,
  awayCode: string
): WorldCupMatchOdds {
  // TODO: Replace with real API call when odds provider is integrated
  // For now, return clearly-labeled mock data
  return generateMockOdds(homeCode, awayCode, matchId);
}

/**
 * Check if real odds API is configured (vs. mock fallback).
 *
 * @returns "api" if a real odds provider is configured, "mock" if using demo data
 */
export function getOddsSource(): "mock" | "api" {
  // TODO: Check for odds API key in environment
  // e.g., if (process.env.ODDS_API_KEY) return "api";
  return "mock";
}
