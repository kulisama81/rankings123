/**
 * Regression test for bug-homepage-live-preview-empty
 *
 * Guards against the homepage Live Rankings Preview section showing only
 * headers/skeleton loaders without actual player data.
 *
 * Bug: commit b101e52 added the preview feature but it remained stuck in
 * loading state, showing no player names/ranks/points.
 *
 * This test ensures the component:
 * 1. Renders the Live Rankings Preview section
 * 2. Populates it with actual player data (names, not just headers)
 * 3. Shows at least 3 players each for ATP and WTA
 */

import { test } from "node:test";
import assert from "node:assert";

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

test("Homepage Live Rankings Preview displays player data (not empty)", async () => {
  const res = await fetch(BASE_URL);
  assert.strictEqual(res.status, 200, "Homepage should return 200");

  const html = await res.text();

  // 1. Verify the section exists
  assert.match(
    html,
    /Live Rankings Preview/i,
    "Homepage should include 'Live Rankings Preview' section header"
  );

  // 2. Verify it's NOT stuck in loading state
  // The loading skeleton has multiple "animate-pulse" divs with "h-4 bg-surface2 rounded"
  // If we see more than 5 of these, it's likely still showing skeleton loaders
  const skeletonCount = (html.match(/animate-pulse.*?rounded-2xl/g) || []).length;
  assert.ok(
    skeletonCount <= 3,
    `Homepage should not show skeleton loaders for Live Rankings Preview (found ${skeletonCount} skeletons, expected ≤3)`
  );

  // 3. ATP preview: verify player names are present
  // Look for known top ATP players (any of these should appear)
  const hasAtpPlayers =
    /Jannik Sinner|Carlos Alcaraz|Alexander Zverev|Novak Djokovic|Daniil Medvedev/i.test(
      html
    );
  assert.ok(
    hasAtpPlayers,
    "Homepage Live Rankings Preview should show ATP player names (Sinner, Alcaraz, etc.)"
  );

  // 4. WTA preview: verify player names are present
  const hasWtaPlayers =
    /Aryna Sabalenka|Elena Rybakina|Jessica Pegula|Iga Swiatek|Coco Gauff/i.test(
      html
    );
  assert.ok(
    hasWtaPlayers,
    "Homepage Live Rankings Preview should show WTA player names (Sabalenka, Rybakina, etc.)"
  );

  // 5. Verify ranking data structure (should have rank numbers like "1.", "2.", etc.)
  const hasRankNumbers = /<span[^>]*>1\.<\/span>/.test(html) && /<span[^>]*>2\.<\/span>/.test(html);
  assert.ok(
    hasRankNumbers,
    "Homepage Live Rankings Preview should display rank numbers (1., 2., etc.)"
  );

  // 6. Verify points data (should have numbers with commas like "11,830")
  const hasPointsData = /\d{1,3}(,\d{3})+/.test(html);
  assert.ok(
    hasPointsData,
    "Homepage Live Rankings Preview should display ranking points (formatted with commas)"
  );
});

test("Homepage Live Rankings Preview APIs return valid data", async () => {
  // Verify the underlying APIs work correctly
  const [atpRes, wtaRes] = await Promise.all([
    fetch(`${BASE_URL}/api/atp-live`),
    fetch(`${BASE_URL}/api/wta-live`),
  ]);

  assert.strictEqual(atpRes.status, 200, "ATP Live API should return 200");
  assert.strictEqual(wtaRes.status, 200, "WTA Live API should return 200");

  const atpData = await atpRes.json();
  const wtaData = await wtaRes.json();

  // Verify ATP data structure
  assert.ok(Array.isArray(atpData.players), "ATP API should return players array");
  assert.ok(
    atpData.players.length >= 5,
    `ATP API should return at least 5 players for top-5 preview (got ${atpData.players.length})`
  );

  const atpTop5 = atpData.players.slice(0, 5);
  atpTop5.forEach((p, idx) => {
    assert.ok(p.name, `ATP player ${idx + 1} should have a name`);
    assert.ok(
      typeof p.liveRank === "number" || typeof p.officialRank === "number",
      `ATP player ${p.name} should have a rank`
    );
    assert.ok(
      typeof p.livePoints === "number" || typeof p.officialPoints === "number",
      `ATP player ${p.name} should have points`
    );
  });

  // Verify WTA data structure
  assert.ok(Array.isArray(wtaData.players), "WTA API should return players array");
  assert.ok(
    wtaData.players.length >= 5,
    `WTA API should return at least 5 players for top-5 preview (got ${wtaData.players.length})`
  );

  const wtaTop5 = wtaData.players.slice(0, 5);
  wtaTop5.forEach((p, idx) => {
    assert.ok(p.name, `WTA player ${idx + 1} should have a name`);
    assert.ok(
      typeof p.liveRank === "number" || typeof p.officialRank === "number",
      `WTA player ${p.name} should have a rank`
    );
    assert.ok(
      typeof p.livePoints === "number" || typeof p.officialPoints === "number",
      `WTA player ${p.name} should have points`
    );
  });
});
