/**
 * Regression test for bug-wta-live-10-rows
 *
 * Ensures the WTA Live rankings page shows a full ranking table (50+ players)
 * with real ESPN data, not the minimal 10-player mock fallback. This prevents
 * regression of the "WTA table truncated to 10 rows" bug.
 *
 * The bug was: WTA feed was falling back to wtaMockSnapshot() which only
 * contains 10 hardcoded players, instead of fetching live ESPN data.
 */

import { test } from "node:test";
import assert from "node:assert";

const API_BASE = process.env.TEST_API_BASE || "https://rankings123.com";

test("WTA Live API: returns full ranking data (50+ players, ESPN source)", async () => {
  const res = await fetch(`${API_BASE}/api/wta/rankings`);
  assert.ok(res.ok, `WTA API should return 200, got ${res.status}`);

  const data = await res.json();

  // Must have substantial player count (not the 10-player mock)
  assert.ok(
    data.players && data.players.length >= 50,
    `WTA rankings should have 50+ players, got ${data.players?.length || 0}. ` +
    `If this fails, the feed is likely falling back to wtaMockSnapshot() which only has 10 players.`
  );

  // Source should be ESPN (live data), not mock
  // Note: It's acceptable if source is "wta" (official WTA API) or "espn".
  // But it should NOT be "mock" under normal circumstances.
  assert.ok(
    data.source && data.source !== "mock",
    `WTA source should be "espn" or "wta" (live data), got "${data.source}". ` +
    `Source "mock" indicates the feed failed and fell back to the 10-player snapshot.`
  );

  // Week label should not contain "demo" (CX-FIRST principle)
  assert.ok(
    !data.weekLabel?.toLowerCase().includes("demo"),
    `WTA weekLabel must not contain "demo": got "${data.weekLabel}"`
  );
});

test("WTA Live page: renders full table with pagination", async () => {
  const res = await fetch(`${API_BASE}/wta-live`);
  assert.ok(res.ok, `WTA Live page should return 200, got ${res.status}`);

  const html = await res.text();

  // Count table rows in the HTML
  const rowMatches = html.match(/<tr|role="row"/gi) || [];
  assert.ok(
    rowMatches.length >= 20,
    `WTA Live page should render at least 20 table rows, got ${rowMatches.length}. ` +
    `Too few rows indicates the table is truncated to the 10-player mock.`
  );

  // Should have pagination indicators (like "Page 1" or "1-50 of 150")
  const hasPagination =
    /page\s+\d+/i.test(html) ||
    /\d+-\d+\s+of\s+\d+/i.test(html) ||
    /next|previous/i.test(html);

  assert.ok(
    hasPagination,
    "WTA Live page should have pagination controls. Missing pagination suggests truncated data."
  );
});
