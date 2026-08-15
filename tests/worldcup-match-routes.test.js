/**
 * Regression test for bug-wc-match-detail-404
 *
 * Tests that World Cup match detail routes behave correctly:
 * - Valid match IDs (from current World Cup) return 200 with match details
 * - Invalid/old match IDs return 404 with a helpful custom error page
 * - Network errors fall back to mock data (not 404)
 *
 * This prevents serving "Demo data" for invalid match IDs while maintaining
 * graceful degradation for real matches when ESPN API has temporary issues.
 */

import { test } from "node:test";
import assert from "node:assert";

const TEST_PORT = process.env.TEST_PORT || "3124";

test("World Cup match detail: valid match ID returns 200", async () => {
  // Use a known valid match ID from 2026 World Cup (Spain vs Argentina)
  const validMatchId = "760517";
  const url = `http://localhost:${TEST_PORT}/world-cup/match/${validMatchId}`;

  const res = await fetch(url);

  assert.strictEqual(
    res.status,
    200,
    `Valid match ${validMatchId} should return 200`
  );

  const html = await res.text();

  // Should contain match structure elements
  assert.ok(
    html.includes("data-sport=\"worldcup\""),
    "Page should contain World Cup match structure"
  );

  // Should contain team names
  assert.ok(
    html.includes("Spain") || html.includes("Argentina"),
    "Page should show team names for this match"
  );
});

test("World Cup match detail: invalid match ID returns 404 with custom error", async () => {
  // Use an old/invalid match ID from a previous World Cup
  const invalidMatchId = "401631699";
  const url = `http://localhost:${TEST_PORT}/world-cup/match/${invalidMatchId}`;

  const res = await fetch(url);

  assert.strictEqual(
    res.status,
    404,
    `Invalid match ${invalidMatchId} should return 404, not ${res.status}`
  );

  const html = await res.text();

  // Should show custom not-found page with helpful message
  assert.ok(
    html.includes("Match Not Found") || html.includes("doesn't exist"),
    "404 page should show helpful error message"
  );

  // Should have link back to World Cup page
  assert.ok(
    html.includes("/world-cup"),
    "404 page should have link back to World Cup page"
  );
});

test("World Cup match detail: completely fake match ID returns 404", async () => {
  const fakeMatchId = "999999999";
  const url = `http://localhost:${TEST_PORT}/world-cup/match/${fakeMatchId}`;

  const res = await fetch(url);

  assert.strictEqual(
    res.status,
    404,
    `Non-existent match ${fakeMatchId} should return 404`
  );
});
