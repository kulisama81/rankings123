/**
 * Regression test for worldcup-match-404 bug fix
 *
 * Bug: World Cup match detail pages were returning 404 when ESPN's match detail
 * API didn't have data for a match ID (even though the match existed in the scoreboard).
 *
 * Fix: Fall back to mock data with "Demo data" badge instead of showing 404.
 *
 * This test ensures the route never returns 404 for valid match IDs.
 */

import { test } from "node:test";
import assert from "node:assert";

const TEST_PORT = process.env.TEST_PORT || "3124";

test("World Cup match detail route returns 200 (not 404) for valid match IDs", async () => {
  // Test the actual match ID from the bug report
  const testMatchId = "401636239";
  const url = `http://localhost:${TEST_PORT}/world-cup/match/${testMatchId}`;

  const res = await fetch(url);

  // Should return 200, never 404
  assert.strictEqual(
    res.status,
    200,
    `Expected 200 OK but got ${res.status} for match ${testMatchId}. ` +
    `Match detail pages should show mock data fallback, not 404.`
  );

  // Should return HTML content
  const contentType = res.headers.get("content-type");
  assert.ok(
    contentType?.includes("text/html"),
    `Expected HTML response but got ${contentType}`
  );

  const html = await res.text();

  // Should contain match structure elements
  assert.ok(
    html.includes("Back to World Cup"),
    "Page should contain back link to World Cup main page"
  );

  // Should show either real data or mock data with demo badge
  const hasRealData = html.includes("data-sport=\"worldcup\"");

  assert.ok(
    hasRealData,
    "Page should contain World Cup match page structure"
  );

  // If ESPN API is down or doesn't have this match, should show demo badge
  if (html.includes("Demo data")) {
    console.log(`✓ Match ${testMatchId}: Showing mock fallback (ESPN data not available)`);
  } else {
    console.log(`✓ Match ${testMatchId}: Showing real ESPN data`);
  }
});

test("World Cup match route handles multiple match IDs without 404", async () => {
  // Test a few different match ID formats to ensure general fix
  const testMatchIds = [
    "401636239", // From bug report
    "401636240", // Adjacent ID
    "999999999", // Non-existent ID (should still not 404)
  ];

  for (const matchId of testMatchIds) {
    const url = `http://localhost:${TEST_PORT}/world-cup/match/${matchId}`;
    const res = await fetch(url);

    assert.strictEqual(
      res.status,
      200,
      `Match ${matchId} should return 200, not ${res.status}`
    );
  }
});
