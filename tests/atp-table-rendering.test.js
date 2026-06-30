/**
 * Regression test for atp-table-loading-failure bug.
 *
 * Ensures that the ATP Live ranking table renders with multiple players
 * and does not show a persistent "Loading..." fallback.
 *
 * Bug context: When LiveRankingTable (which uses useSearchParams) was wrapped
 * in a Suspense boundary, ISR static generation would suspend the component
 * and only render the Suspense fallback ("Loading...") instead of the actual
 * table data.
 */

import { test } from "node:test";
import assert from "node:assert";

test("ATP Live page renders full ranking table (not just Loading fallback)", async () => {
  const port = process.env.TEST_PORT || 3000;
  const url = `http://localhost:${port}/atp-live`;

  const response = await fetch(url);
  assert.strictEqual(response.status, 200, "ATP Live page should return 200");

  const html = await response.text();

  // Should contain multiple player names (checking for top 3 as a sample)
  const hasMultiplePlayers =
    html.includes("Jannik Sinner") &&
    html.includes("Carlos Alcaraz") &&
    (html.includes("Alexander Zverev") || html.includes("Novak Djokovic"));

  assert.ok(
    hasMultiplePlayers,
    "Page should render multiple players, not just the #1 player"
  );

  // Should have a table body with multiple rows (check for tbody with >1 <tr)
  const tbodyMatch = html.match(/<tbody[^>]*>(.*?)<\/tbody>/s);
  if (tbodyMatch) {
    const tbody = tbodyMatch[1];
    const rowCount = (tbody.match(/<tr/g) || []).length;
    assert.ok(
      rowCount > 1,
      `Table should have multiple rows, found ${rowCount}`
    );
  }

  // Should NOT show the Suspense fallback "Loading table..." as the main content
  // (it's ok if "Loading..." appears in a button label or as part of dynamic
  // client-side updates, but not as the primary table content indicator)
  const hasLoadingFallback = /Loading table\.\.\./i.test(html);
  assert.ok(
    !hasLoadingFallback,
    "Page should not show 'Loading table...' fallback text"
  );
});

test("ATP Live API endpoint returns full player list", async () => {
  const port = process.env.TEST_PORT || 3000;
  const url = `http://localhost:${port}/api/atp/live`;

  const response = await fetch(url);
  assert.strictEqual(response.status, 200, "API should return 200");

  const data = await response.json();

  assert.ok(Array.isArray(data.players), "Response should have players array");
  assert.ok(
    data.players.length >= 50,
    `API should return at least 50 players, got ${data.players.length}`
  );

  // Check that first player has expected structure
  const firstPlayer = data.players[0];
  assert.ok(firstPlayer.name, "Player should have a name");
  assert.ok(typeof firstPlayer.liveRank === "number", "Player should have liveRank");
  assert.ok(typeof firstPlayer.livePoints === "number", "Player should have livePoints");
});

test("ATP/WTA Live pages performance budget (TTFB ≤ 0.8s)", async () => {
  // Performance regression guard: ensures ISR caching is working and TTFB stays low.
  // If this test fails, the pages likely reverted to force-dynamic (no caching).
  // Target: TTFB ≤ 0.2s optimal, ≤ 0.8s acceptable budget.
  //
  // This replaces the old implementation-based test that enforced force-dynamic.
  // Now we test OUTCOMES: fast + working, regardless of implementation.

  const port = process.env.TEST_PORT || 3000;
  const atpUrl = `http://localhost:${port}/atp-live`;
  const wtaUrl = `http://localhost:${port}/wta-live`;

  // Warm up cache (first request may be slow)
  await fetch(atpUrl);
  await fetch(wtaUrl);

  // Measure cached response TTFB
  const measureTTFB = async (url) => {
    const start = Date.now();
    const response = await fetch(url);
    const ttfb = Date.now() - start;
    assert.strictEqual(response.status, 200, `${url} should return 200`);
    return ttfb;
  };

  const atpTTFB = await measureTTFB(atpUrl);
  const wtaTTFB = await measureTTFB(wtaUrl);

  // Budget: ≤ 800ms (force-dynamic would be 600ms+)
  assert.ok(
    atpTTFB <= 800,
    `ATP Live TTFB should be ≤ 800ms, got ${atpTTFB}ms (likely using force-dynamic instead of ISR)`
  );
  assert.ok(
    wtaTTFB <= 800,
    `WTA Live TTFB should be ≤ 800ms, got ${wtaTTFB}ms (likely using force-dynamic instead of ISR)`
  );
});
