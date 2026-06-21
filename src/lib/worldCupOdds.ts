import type { WorldCupMatchOdds } from "@/types";

/**
 * World Cup match odds / predictions.
 *
 * We do NOT fabricate odds. Until a real provider is integrated (e.g. The Odds API,
 * API-Football, or a betting-affiliate feed), `getMatchOdds` returns null and the
 * predictions UI stays hidden (it is gated on `getOddsSource() === "api"`). No made-up
 * numbers ever reach users. See tickets `odds-api` / `betting-affiliate`.
 */
export function getMatchOdds(): WorldCupMatchOdds | null {
  // No real odds provider connected yet → no odds. Never invent probabilities.
  return null;
}

/**
 * Whether a real odds provider is configured. "api" = real data available (show
 * predictions); "mock" = none connected (hide predictions). Never returns fabricated data.
 */
export function getOddsSource(): "mock" | "api" {
  // TODO: return "api" once a real odds provider/env key is wired in.
  return "mock";
}
