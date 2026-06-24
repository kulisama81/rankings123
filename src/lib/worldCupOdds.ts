import type { WorldCupMatchOdds } from "@/types";

/**
 * World Cup match odds from The Odds API (the-odds-api.com).
 * Requires ODDS_API_KEY env var. Free tier = 500 requests/month, so we cache aggressively.
 * Never fabricates odds — returns null if unavailable.
 */

interface OddsApiEvent {
  id: string;
  sport_key: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers?: Array<{
    key: string;
    title: string;
    markets: Array<{
      key: string;
      outcomes: Array<{
        name: string;
        price: number; // decimal odds
      }>;
    }>;
  }>;
}

const ODDS_API_KEY = process.env.ODDS_API_KEY;
const ODDS_API_BASE = "https://api.the-odds-api.com/v4";

// Cache for odds data — 6 hour revalidation (free tier = 500 req/mo, ~16/day budget)
const CACHE_SECONDS = 6 * 60 * 60;

/**
 * Fetch available sports from The Odds API to find the World Cup sport key.
 * Cached for 24 hours.
 */
async function getWorldCupSportKey(): Promise<string | null> {
  if (!ODDS_API_KEY) return null;

  try {
    const url = `${ODDS_API_BASE}/sports?apiKey=${ODDS_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 24 * 60 * 60 } });
    if (!res.ok) return null;

    const sports = await res.json() as Array<{ key: string; title: string; active: boolean }>;

    // Look for FIFA World Cup sport key (active tournaments only)
    const worldCupSport = sports.find(
      (s) =>
        s.active &&
        (s.key.includes("fifa") ||
         s.key.includes("world_cup") ||
         s.title.toLowerCase().includes("world cup") ||
         s.title.toLowerCase().includes("fifa"))
    );

    return worldCupSport?.key ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch odds for World Cup matches from The Odds API.
 * Returns map of match id → odds, or null if unavailable.
 */
async function fetchWorldCupOdds(): Promise<Map<string, WorldCupMatchOdds> | null> {
  if (!ODDS_API_KEY) return null;

  const sportKey = await getWorldCupSportKey();
  if (!sportKey) return null;

  try {
    // Fetch odds with h2h (head-to-head/moneyline) market, US + EU regions for coverage
    const url = `${ODDS_API_BASE}/sports/${sportKey}/odds?apiKey=${ODDS_API_KEY}&regions=us,uk,eu&markets=h2h&oddsFormat=decimal`;
    const res = await fetch(url, { next: { revalidate: CACHE_SECONDS } });
    if (!res.ok) return null;

    const events = await res.json() as OddsApiEvent[];
    const oddsMap = new Map<string, WorldCupMatchOdds>();

    for (const event of events) {
      // Average odds across bookmakers for more stable predictions
      const allBookmakerOdds: Array<{ home: number; draw: number; away: number }> = [];

      for (const bookmaker of event.bookmakers ?? []) {
        const h2hMarket = bookmaker.markets.find((m) => m.key === "h2h");
        if (!h2hMarket || h2hMarket.outcomes.length < 2) continue;

        const homeOutcome = h2hMarket.outcomes.find((o) => o.name === event.home_team);
        const awayOutcome = h2hMarket.outcomes.find((o) => o.name === event.away_team);
        const drawOutcome = h2hMarket.outcomes.find((o) => o.name === "Draw");

        // Only include bookmakers that provide all three outcomes — never fabricate.
        if (homeOutcome && awayOutcome && drawOutcome) {
          allBookmakerOdds.push({
            home: homeOutcome.price,
            draw: drawOutcome.price,
            away: awayOutcome.price,
          });
        }
      }

      if (allBookmakerOdds.length === 0) continue;

      // Average across bookmakers
      const avgHome = allBookmakerOdds.reduce((sum, o) => sum + o.home, 0) / allBookmakerOdds.length;
      const avgDraw = allBookmakerOdds.reduce((sum, o) => sum + o.draw, 0) / allBookmakerOdds.length;
      const avgAway = allBookmakerOdds.reduce((sum, o) => sum + o.away, 0) / allBookmakerOdds.length;

      // Convert decimal odds to implied probabilities
      // Decimal odds of 2.5 → implied prob = 1/2.5 = 0.4 = 40%
      // Normalize to sum to 100% (bookmaker margin removed)
      const impliedHome = 1 / avgHome;
      const impliedDraw = 1 / avgDraw;
      const impliedAway = 1 / avgAway;
      const total = impliedHome + impliedDraw + impliedAway;

      const matchOdds: WorldCupMatchOdds = {
        homeWin: Math.round(avgHome * 100) / 100,
        draw: Math.round(avgDraw * 100) / 100,
        awayWin: Math.round(avgAway * 100) / 100,
        homeProbability: Math.round((impliedHome / total) * 100),
        drawProbability: Math.round((impliedDraw / total) * 100),
        awayProbability: Math.round((impliedAway / total) * 100),
      };

      // Use ESPN-style match id (home_away normalized) as key
      const matchKey = `${event.home_team.toLowerCase()}_${event.away_team.toLowerCase()}`;
      oddsMap.set(matchKey, matchOdds);
    }

    return oddsMap.size > 0 ? oddsMap : null;
  } catch {
    return null;
  }
}

/**
 * Get odds for a specific World Cup match.
 * @param homeTeam - Home team name (case-insensitive)
 * @param awayTeam - Away team name (case-insensitive)
 */
export async function getMatchOdds(
  homeTeam: string,
  awayTeam: string
): Promise<WorldCupMatchOdds | null> {
  const oddsMap = await fetchWorldCupOdds();
  if (!oddsMap) return null;

  const matchKey = `${homeTeam.toLowerCase()}_${awayTeam.toLowerCase()}`;
  return oddsMap.get(matchKey) ?? null;
}

/**
 * Whether a real odds provider is configured. "api" = real data available (show
 * predictions); "mock" = none connected (hide predictions).
 */
export function getOddsSource(): "mock" | "api" {
  return ODDS_API_KEY ? "api" : "mock";
}
