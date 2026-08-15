/**
 * Regression test for bug-homepage-live-preview-empty and bug-homepage-preview-still-broken
 *
 * Guards against the homepage Live Rankings Preview section being stuck in loading state
 * (skeleton loaders never replaced with actual player data after client-side hydration).
 *
 * Bug history:
 * - commit b101e52 added the preview feature but it remained stuck in loading state
 * - commit 96597d2 attempted a fix
 * - This test ensures client-side React component properly fetches and displays data
 *
 * IMPORTANT: This test checks CLIENT-SIDE RENDERING, not just SSR HTML.
 * SSR HTML correctly includes skeleton loaders as initial state - they should disappear
 * after client-side hydration fetches data.
 */

import { test } from "node:test";
import assert from "node:assert";
import { chromium } from "playwright";

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

test("Homepage Live Rankings Preview displays player data after client-side hydration", async () => {
  // Launch headless browser to test client-side rendering
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate and wait for network to be idle (JS loaded and executed)
    await page.goto(BASE_URL, { waitUntil: "networkidle" });

    // Wait up to 5 seconds for client-side data fetch to complete
    await page.waitForTimeout(5000);

    // 1. Verify the section exists
    const previewSectionCount = await page.locator('text=Live Rankings Preview').count();
    assert.ok(
      previewSectionCount > 0,
      "Homepage should include 'Live Rankings Preview' section"
    );

    // 2. Verify skeleton loaders are GONE (client-side component replaced them)
    const skeletonCount = await page.locator('.animate-pulse').count();
    assert.ok(
      skeletonCount === 0,
      `Homepage should not show skeleton loaders after client-side hydration (found ${skeletonCount}, expected 0)`
    );

    // 3. Verify ATP/WTA sections are visible
    const atpCount = await page.locator('text=ATP Live').count();
    const wtaCount = await page.locator('text=WTA Live').count();

    assert.ok(
      atpCount > 0,
      "Homepage should show ATP Live section after hydration"
    );
    assert.ok(
      wtaCount > 0,
      "Homepage should show WTA Live section after hydration"
    );

    // 4. Verify player names are present (check for known top players)
    const playerNames = [
      "Jannik Sinner", "Carlos Alcaraz", "Alexander Zverev", "Novak Djokovic",
      "Aryna Sabalenka", "Elena Rybakina", "Iga Swiatek", "Coco Gauff"
    ];

    let foundPlayers = 0;
    for (const name of playerNames) {
      const count = await page.locator(`text=${name}`).count();
      if (count > 0) foundPlayers++;
    }

    assert.ok(
      foundPlayers >= 2,
      `Homepage should show at least 2 top player names (found ${foundPlayers})`
    );

    // 5. Verify rank numbers are displayed
    const rankNumberCount = await page.locator('text=/^\\d+\\./').count();
    assert.ok(
      rankNumberCount >= 10,
      `Homepage should show rank numbers for top players (found ${rankNumberCount}, expected ≥10)`
    );

    // 6. Verify points data is displayed (formatted numbers like "11,830")
    const pointsDataCount = await page.locator('text=/\\d{1,3}(,\\d{3})+/').count();
    assert.ok(
      pointsDataCount >= 5,
      `Homepage should show ranking points (found ${pointsDataCount}, expected ≥5)`
    );

  } finally {
    await browser.close();
  }
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
