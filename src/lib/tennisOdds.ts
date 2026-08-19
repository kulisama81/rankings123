/**
 * Tennis match odds from The Odds API (the-odds-api.com).
 * Requires ODDS_API_KEY env var. Free tier = 500 requests/month, so we cache aggressively.
 * Never fabricates odds — returns null if unavailable.
 */

export interface TennisMatchOdds {
  player1: string; // Player 1 name from API
  player2: string; // Player 2 name from API
  player1Odds: number; // decimal odds, e.g. 1.85
  player2Odds: number; // decimal odds, e.g. 2.10
  player1Probability: number; // 0–100
  player2Probability: number; // 0–100
  bookmakers: Array<{
    name: string; // e.g., "Bet365"
    key: string; // e.g., "bet365"
    player1Odds: number;
    player2Odds: number;
  }>;
  lastUpdate: string; // ISO timestamp
}

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
 * Fetch tennis sport key from The Odds API.
 * Returns the active tennis sport key (varies by tournament).
 */
async function getTennisSportKey(tournament?: string): Promise<string | null> {
  if (!ODDS_API_KEY) return null;

  try {
    const url = `${ODDS_API_BASE}/sports?apiKey=${ODDS_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 24 * 60 * 60 } });
    if (!res.ok) return null;

    const sports = (await res.json()) as Array<{
      key: string;
      title: string;
      active: boolean;
    }>;

    // Look for active tennis tournaments
    // The Odds API has sport keys like: tennis_atp_us_open, tennis_wta_us_open, etc.
    const tennisSports = sports.filter(
      (s) => s.active && s.key.includes("tennis")
    );

    if (tournament) {
      // Try to find specific tournament (e.g., "us_open", "wimbledon")
      const tournamentKey = tennisSports.find((s) =>
        s.key.toLowerCase().includes(tournament.toLowerCase())
      );
      if (tournamentKey) return tournamentKey.key;
    }

    // Return first active tennis sport if no specific tournament requested
    return tennisSports[0]?.key ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch all active tennis sport keys (ATP + WTA tournaments).
 */
async function getAllActiveTennisSportKeys(): Promise<string[]> {
  if (!ODDS_API_KEY) return [];

  try {
    const url = `${ODDS_API_BASE}/sports?apiKey=${ODDS_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 24 * 60 * 60 } });
    if (!res.ok) return [];

    const sports = (await res.json()) as Array<{
      key: string;
      title: string;
      active: boolean;
    }>;

    return sports
      .filter((s) => s.active && s.key.includes("tennis"))
      .map((s) => s.key);
  } catch {
    return [];
  }
}

/**
 * Fetch odds for a specific tennis tournament.
 */
async function fetchTournamentOdds(
  sportKey: string
): Promise<TennisMatchOdds[]> {
  if (!ODDS_API_KEY) return [];

  try {
    // Fetch h2h (head-to-head/moneyline) market from multiple regions
    const url = `${ODDS_API_BASE}/sports/${sportKey}/odds?apiKey=${ODDS_API_KEY}&regions=us,uk,eu&markets=h2h&oddsFormat=decimal`;
    const res = await fetch(url, { next: { revalidate: CACHE_SECONDS } });
    if (!res.ok) return [];

    const events = (await res.json()) as OddsApiEvent[];
    const matches: TennisMatchOdds[] = [];

    for (const event of events) {
      if (!event.bookmakers || event.bookmakers.length === 0) continue;

      const bookmakerOdds: Array<{
        name: string;
        key: string;
        player1Odds: number;
        player2Odds: number;
      }> = [];

      // Collect odds from all bookmakers
      for (const bookmaker of event.bookmakers) {
        const h2hMarket = bookmaker.markets.find((m) => m.key === "h2h");
        if (!h2hMarket || h2hMarket.outcomes.length !== 2) continue;

        const player1Outcome = h2hMarket.outcomes.find(
          (o) => o.name === event.home_team
        );
        const player2Outcome = h2hMarket.outcomes.find(
          (o) => o.name === event.away_team
        );

        // Only include bookmakers that provide both player odds
        if (player1Outcome && player2Outcome) {
          bookmakerOdds.push({
            name: bookmaker.title,
            key: bookmaker.key,
            player1Odds: player1Outcome.price,
            player2Odds: player2Outcome.price,
          });
        }
      }

      if (bookmakerOdds.length === 0) continue;

      // Average odds across bookmakers for the main display
      const avgPlayer1Odds =
        bookmakerOdds.reduce((sum, b) => sum + b.player1Odds, 0) /
        bookmakerOdds.length;
      const avgPlayer2Odds =
        bookmakerOdds.reduce((sum, b) => sum + b.player2Odds, 0) /
        bookmakerOdds.length;

      // Convert decimal odds to implied probabilities
      const impliedPlayer1 = 1 / avgPlayer1Odds;
      const impliedPlayer2 = 1 / avgPlayer2Odds;
      const total = impliedPlayer1 + impliedPlayer2;

      matches.push({
        player1: event.home_team,
        player2: event.away_team,
        player1Odds: Math.round(avgPlayer1Odds * 100) / 100,
        player2Odds: Math.round(avgPlayer2Odds * 100) / 100,
        player1Probability: Math.round((impliedPlayer1 / total) * 100),
        player2Probability: Math.round((impliedPlayer2 / total) * 100),
        bookmakers: bookmakerOdds,
        lastUpdate: new Date().toISOString(),
      });
    }

    return matches;
  } catch {
    return [];
  }
}

/**
 * Get odds for all active tennis tournaments (ATP + WTA).
 * Returns array of matches with odds from all active tournaments.
 */
export async function getAllTennisOdds(): Promise<TennisMatchOdds[]> {
  const sportKeys = await getAllActiveTennisSportKeys();
  if (sportKeys.length === 0) return [];

  // Fetch odds for all active tournaments in parallel
  const results = await Promise.all(
    sportKeys.map((key) => fetchTournamentOdds(key))
  );

  // Flatten and return
  return results.flat();
}

/**
 * Get odds for a specific tennis tournament (e.g., "us_open", "wimbledon").
 */
export async function getTournamentOdds(
  tournament: string
): Promise<TennisMatchOdds[]> {
  const sportKey = await getTennisSportKey(tournament);
  if (!sportKey) return [];

  return fetchTournamentOdds(sportKey);
}

/**
 * Get odds for a specific match by player names.
 * Searches all active tournaments for the match.
 */
export async function getMatchOdds(
  player1: string,
  player2: string
): Promise<TennisMatchOdds | null> {
  const allOdds = await getAllTennisOdds();

  // Normalize names for matching (case-insensitive, trim whitespace)
  const normalizedP1 = player1.toLowerCase().trim();
  const normalizedP2 = player2.toLowerCase().trim();

  // Find match by either player order
  const match = allOdds.find(
    (m) =>
      (m.player1.toLowerCase().includes(normalizedP1) &&
        m.player2.toLowerCase().includes(normalizedP2)) ||
      (m.player1.toLowerCase().includes(normalizedP2) &&
        m.player2.toLowerCase().includes(normalizedP1))
  );

  return match ?? null;
}

/**
 * Whether a real odds provider is configured.
 * "api" = real data available (show odds); "mock" = none connected (hide odds).
 */
export function getOddsSource(): "mock" | "api" {
  return ODDS_API_KEY ? "api" : "mock";
}
