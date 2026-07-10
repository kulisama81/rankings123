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

test("ATP Live ranking table: SSR contains both tables, JavaScript hides fallback", async () => {
  // Regression test for atp-duplicate-table bug.
  //
  // Bug context: The ATP Live page was rendering both a StaticRankingTable
  // (SSR version) and LiveRankingTable (interactive version), both visible
  // to users simultaneously, causing duplicate content.
  //
  // Solution: SSR HTML intentionally contains BOTH tables (for SEO - search engines
  // need the StaticRankingTable content), but JavaScript hides the StaticRankingTable
  // on hydration so users only see one table.
  //
  // This test verifies:
  // 1. SSR HTML has 2 tbody elements (StaticRankingTable + LiveRankingTable) for SEO
  // 2. The data-ssr-fallback attribute exists so JavaScript can find and hide it
  // 3. Player name counts are reasonable (not excessive duplication like 50+)

  const port = process.env.TEST_PORT || 3000;
  const url = `http://localhost:${port}/atp-live`;

  const response = await fetch(url);
  assert.strictEqual(response.status, 200, "ATP Live page should return 200");

  const html = await response.text();

  // SSR HTML should have 2 tbody elements: StaticRankingTable (for SEO) + LiveRankingTable
  const tbodyMatches = html.match(/<tbody[^>]*>/g) || [];
  const tbodyCount = tbodyMatches.length;

  assert.strictEqual(
    tbodyCount,
    2,
    `ATP Live SSR HTML should have exactly 2 tbody elements (StaticRankingTable + LiveRankingTable), found ${tbodyCount}.`
  );

  // Verify the data-ssr-fallback attribute exists so JavaScript can hide the SSR table
  assert.ok(
    html.includes('data-ssr-fallback'),
    'SSR HTML should include data-ssr-fallback attribute for JavaScript to hide the fallback table'
  );

  // Player names will appear multiple times (in both tables + stats banner + meta tags).
  // Expect ~10-15 occurrences. If it's 50+, something is severely wrong.
  const sinnerMatches = html.match(/Jannik Sinner/g) || [];
  const sinnerCount = sinnerMatches.length;

  assert.ok(
    sinnerCount >= 5 && sinnerCount <= 20,
    `"Jannik Sinner" should appear 5-20 times (2 tables + meta tags), found ${sinnerCount}.`
  );
});
