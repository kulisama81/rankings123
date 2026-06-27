import { cache } from "react";

/**
 * Shared ESPN API cache for World Cup data.
 *
 * React's cache() deduplicates fetches within a single render pass:
 * when both worldCupFeed and worldCupBracketFeed request the same URL,
 * only ONE network call happens. Saves ~100-200ms TTFB on /world-cup.
 *
 * @see https://react.dev/reference/react/cache
 * @see https://nextjs.org/docs/app/building-your-application/caching#request-memoization
 */

const STANDINGS_URL =
  "https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings";
const SCOREBOARD_URL_FULL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719";

/* eslint-disable @typescript-eslint/no-explicit-any */

async function fetchJson(url: string, revalidateSeconds: number): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

/**
 * Cached ESPN standings fetch (group tables, advancement notes).
 * Revalidates every 60s (1 min) — matches scoreboard frequency to prevent
 * staleness during live matches (standings showing fewer matches played than
 * the schedule shows completed/in-progress).
 */
export const getCachedStandings = cache(() => fetchJson(STANDINGS_URL, 60));

/**
 * Cached ESPN scoreboard fetch — FULL tournament window (Jun 11 – Jul 19, 2026).
 * Revalidates every 60s (live matches).
 *
 * Used by BOTH worldCupFeed and worldCupBracketFeed for complete deduplication.
 * The bracket feed filters these events by stage, so it needs the full window too.
 */
export const getCachedScoreboardFull = cache(() =>
  fetchJson(SCOREBOARD_URL_FULL, 60)
);
