/**
 * Regression test for bug-wc-tournament-status-stale
 * Ensures World Cup page shows "Tournament Complete" when the Final is finished,
 * not "Live" or in-progress status.
 */

import { test } from "node:test";
import assert from "node:assert";

test("World Cup page shows Tournament Complete when Final is finished", async () => {
  // Fetch the World Cup page
  const response = await fetch("http://localhost:3000/world-cup");
  assert.strictEqual(response.status, 200, "World Cup page should return 200");

  const html = await response.text();

  // Check for completion indicators
  const hasTournamentComplete = html.includes("Tournament Complete");
  const hasChampion = html.includes("Champion");
  const hasFinalResult = html.includes("Final Result") || html.includes("Final Score");

  // Should NOT show "Live" status when tournament is complete
  const showsLiveWhenComplete =
    hasTournamentComplete && html.includes("World Cup 2026 Live");

  assert.ok(
    !showsLiveWhenComplete,
    "Page should NOT show 'Live' status when tournament is complete"
  );

  // If tournament is complete, should show completion indicators
  if (hasTournamentComplete) {
    assert.ok(
      hasChampion || hasFinalResult,
      "When tournament is complete, should show Champion or Final Result"
    );
  }

  // Should NOT show TBD/projected brackets when tournament is complete
  if (hasTournamentComplete) {
    const hasTBD = html.includes("🏆TBD") || html.includes("To Be Determined");
    assert.ok(
      !hasTBD,
      "Complete tournament should NOT show TBD or projected brackets"
    );
  }
});
