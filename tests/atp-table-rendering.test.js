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

test("ATP/WTA Live pages must use dynamic rendering (regression guard)", async () => {
  // This test guards against changing back to ISR (revalidate), which causes
  // a critical functional regression: ISR + Suspense + useSearchParams results
  // in the table only showing 1 player instead of the full ranking.
  // See tickets atp-live-table-truncated, wta-live-table-truncated.
  //
  // Trade-off: force-dynamic has worse performance (TTFB +259% ATP, +182% WTA)
  // but the page WORKS. ISR is faster but BREAKS the table rendering.
  // Working > Fast. File a separate ticket to optimize without breaking functionality.

  const { readFileSync } = await import("node:fs");
  const { join } = await import("node:path");

  const atpPagePath = join(process.cwd(), "src/app/atp-live/page.tsx");
  const wtaPagePath = join(process.cwd(), "src/app/wta-live/page.tsx");

  const atpContent = readFileSync(atpPagePath, "utf-8");
  const wtaContent = readFileSync(wtaPagePath, "utf-8");

  // Must use force-dynamic for useSearchParams compatibility
  assert.ok(
    atpContent.includes('dynamic = "force-dynamic"'),
    "ATP Live page must use dynamic = 'force-dynamic' (ISR breaks table rendering with useSearchParams)"
  );
  assert.ok(
    wtaContent.includes('dynamic = "force-dynamic"'),
    "WTA Live page must use dynamic = 'force-dynamic' (ISR breaks table rendering with useSearchParams)"
  );

  // Must NOT use ISR (which breaks the table)
  assert.ok(
    !atpContent.includes("export const revalidate"),
    "ATP Live page must NOT use revalidate (ISR) - it causes table to show only 1 player"
  );
  assert.ok(
    !wtaContent.includes("export const revalidate"),
    "WTA Live page must NOT use revalidate (ISR) - it causes table to show only 1 player"
  );
});
