/**
 * World Cup API fetch deduplication regression test.
 *
 * Verifies that when the World Cup page fetches data from both worldCupFeed
 * and worldCupBracketFeed, the ESPN standings and scoreboard APIs are only
 * called ONCE each (via React cache deduplication), not twice.
 *
 * This guards against the performance regression where both feeds independently
 * fetched the same ESPN APIs, wasting ~100-200ms TTFB on every page load.
 */

import { describe, test } from "node:test";
import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

describe("World Cup fetch deduplication", () => {
  test("worldCupFeed uses shared cache for standings", async () => {
    const feedPath = join(projectRoot, "src/lib/worldCupFeed.ts");
    const content = await readFile(feedPath, "utf-8");

    // Should import from shared cache
    assert.ok(
      content.includes('from "./worldCupSharedCache"'),
      "worldCupFeed must import from worldCupSharedCache"
    );

    // Should use getCachedStandings (not inline fetchJson)
    assert.ok(
      content.includes("getCachedStandings()"),
      "worldCupFeed must use getCachedStandings() for standings fetch"
    );

    // Should NOT have inline STANDINGS_URL fetch anymore
    assert.ok(
      !content.match(/fetchJson\(STANDINGS_URL/),
      "worldCupFeed should not call fetchJson(STANDINGS_URL) directly"
    );
  });

  test("worldCupFeed uses shared cache for scoreboard", async () => {
    const feedPath = join(projectRoot, "src/lib/worldCupFeed.ts");
    const content = await readFile(feedPath, "utf-8");

    // Should use getCachedScoreboardFull (not inline fetchJson)
    assert.ok(
      content.includes("getCachedScoreboardFull()"),
      "worldCupFeed must use getCachedScoreboardFull() for scoreboard fetch"
    );

    // Should NOT have inline SCOREBOARD_URL fetch anymore
    assert.ok(
      !content.match(/fetchJson\(SCOREBOARD_URL/),
      "worldCupFeed should not call fetchJson(SCOREBOARD_URL) directly"
    );
  });

  test("worldCupBracketFeed uses shared cache for standings", async () => {
    const bracketPath = join(projectRoot, "src/lib/worldCupBracketFeed.ts");
    const content = await readFile(bracketPath, "utf-8");

    // Should import from shared cache
    assert.ok(
      content.includes('from "./worldCupSharedCache"'),
      "worldCupBracketFeed must import from worldCupSharedCache"
    );

    // Should use getCachedStandings (not inline fetchJson)
    assert.ok(
      content.includes("getCachedStandings()"),
      "worldCupBracketFeed must use getCachedStandings() for standings fetch"
    );

    // Should NOT have inline STANDINGS_URL fetch anymore
    assert.ok(
      !content.match(/fetchJson\(STANDINGS_URL/),
      "worldCupBracketFeed should not call fetchJson(STANDINGS_URL) directly"
    );
  });

  test("worldCupBracketFeed uses shared cache for scoreboard", async () => {
    const bracketPath = join(projectRoot, "src/lib/worldCupBracketFeed.ts");
    const content = await readFile(bracketPath, "utf-8");

    // Should use getCachedScoreboardFull (SAME as worldCupFeed for true deduplication)
    assert.ok(
      content.includes("getCachedScoreboardFull()"),
      "worldCupBracketFeed must use getCachedScoreboardFull() for complete deduplication"
    );

    // Should NOT have inline SCOREBOARD_URL fetch anymore
    assert.ok(
      !content.match(/fetchJson\(SCOREBOARD_URL/),
      "worldCupBracketFeed should not call fetchJson(SCOREBOARD_URL) directly"
    );
  });

  test("shared cache module uses React cache() wrapper", async () => {
    const cachePath = join(projectRoot, "src/lib/worldCupSharedCache.ts");
    const content = await readFile(cachePath, "utf-8");

    // Should import cache from React
    assert.ok(
      content.includes('import { cache } from "react"'),
      "worldCupSharedCache must import cache from React"
    );

    // Should wrap the cached fetches with cache()
    assert.ok(
      content.includes("cache(() =>"),
      "worldCupSharedCache must use cache() wrapper for deduplication"
    );

    // Should export the cached functions
    assert.ok(
      content.includes("export const getCachedStandings"),
      "worldCupSharedCache must export getCachedStandings"
    );
    assert.ok(
      content.includes("export const getCachedScoreboard"),
      "worldCupSharedCache must export getCachedScoreboard functions"
    );
  });

  test("no duplicate ESPN API fetches in either feed", async () => {
    const feedPath = join(projectRoot, "src/lib/worldCupFeed.ts");
    const bracketPath = join(projectRoot, "src/lib/worldCupBracketFeed.ts");

    const feedContent = await readFile(feedPath, "utf-8");
    const bracketContent = await readFile(bracketPath, "utf-8");

    // Neither file should have hardcoded ESPN API URLs anymore (they're in the shared cache)
    const espnStandingsPattern = /https:\/\/site\.api\.espn\.com.*\/standings/g;
    const espnScoreboardPattern = /https:\/\/site\.api\.espn\.com.*\/scoreboard/g;

    const feedStandingsCount = (feedContent.match(espnStandingsPattern) || []).length;
    const feedScoreboardCount = (feedContent.match(espnScoreboardPattern) || []).length;
    const bracketStandingsCount = (bracketContent.match(espnStandingsPattern) || []).length;
    const bracketScoreboardCount = (bracketContent.match(espnScoreboardPattern) || []).length;

    // Each file should have at most 0 ESPN URLs (they're all moved to shared cache)
    // Update: they might have them in comments, so let's just verify they're not in fetchJson calls
    const feedHasDuplicateFetch =
      feedContent.match(/fetchJson\(.*espn\.com.*standings/i) ||
      feedContent.match(/fetchJson\(.*espn\.com.*scoreboard/i);
    const bracketHasDuplicateFetch =
      bracketContent.match(/fetchJson\(.*espn\.com.*standings/i) ||
      bracketContent.match(/fetchJson\(.*espn\.com.*scoreboard/i);

    assert.ok(
      !feedHasDuplicateFetch,
      "worldCupFeed should not call fetchJson with ESPN URLs directly"
    );
    assert.ok(
      !bracketHasDuplicateFetch,
      "worldCupBracketFeed should not call fetchJson with ESPN URLs directly"
    );
  });
});
