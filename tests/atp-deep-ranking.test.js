/**
 * Regression test for bug-atp-pagination-missing-deep-ranking.
 *
 * Ensures ATP deep ranking loads sufficient players (500+ for real UTS data, 100+ for mock fallback)
 * so pagination can render. This guards against the regression where only 40 players were shown.
 *
 * Run via: npm test
 */
const assert = require("node:assert/strict");
const test = require("node:test");

test("ATP deep ranking has sufficient players for pagination", async () => {
  // Fetch ATP live data (which uses deep ranking for ATP)
  const res = await fetch("http://localhost:3123/api/atp/live");
  assert.ok(res.ok, `API returned ${res.status}`);

  const snapshot = await res.json();
  const playerCount = snapshot.players?.length ?? 0;
  const source = snapshot.source;

  // If using real UTS data, we should have 500+ players (deep ranking)
  // If falling back to mock, we should have 100+ players (expanded mock for pagination testing)
  // The old bug had only 40 players in the mock, which broke pagination
  if (source === "mock") {
    assert.ok(
      playerCount >= 100,
      `ATP mock fallback should have 100+ players for pagination testing, got ${playerCount}`
    );
    console.log(`  ✓ Mock fallback has ${playerCount} players (sufficient for pagination)`);
  } else if (source === "uts" || source === "uts+espn") {
    assert.ok(
      playerCount >= 500,
      `ATP deep ranking (${source}) should have 500+ players, got ${playerCount}`
    );
    console.log(`  ✓ Deep ranking (${source}) has ${playerCount} players`);
  } else {
    throw new Error(`Unexpected source: ${source}`);
  }

  // Verify we never fall below the data-sanity threshold (50 players minimum)
  assert.ok(
    playerCount >= 50,
    `ATP ranking should always have ≥50 players (data-sanity requirement), got ${playerCount}`
  );
});
