/**
 * Regression test for bug-homepage-console-errors
 *
 * Guards against JavaScript console errors on the homepage, specifically:
 * - CORS policy violations when fetching ESPN data
 * - "Failed to fetch Cincinnati scores" errors
 * - Any other console errors that break data fetching logic
 *
 * Bug history:
 * - Homepage was generating 17 console errors due to:
 *   1. CincinnatiLiveScoresWidget making client-side fetches to ESPN (CORS blocked)
 *   2. console.error() logging failed fetch attempts
 * - Fixed by:
 *   1. Creating server-side API route /api/tennis/cincinnati
 *   2. Widget now fetches from API route instead of ESPN directly
 *   3. Silent failure handling (no console.error)
 *
 * IMPORTANT: This test checks for ZERO console errors (warnings are acceptable).
 * Console errors indicate broken data fetching logic and hurt site reliability.
 */

import { test } from "node:test";
import assert from "node:assert";
import { chromium } from "playwright";

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

test("Homepage produces zero console errors", async () => {
  // Launch headless browser to capture console events
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Collect all console errors
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  // Collect all page errors (uncaught exceptions)
  const pageErrors = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  try {
    // Navigate and wait for network to be idle (all fetches complete)
    await page.goto(BASE_URL, { waitUntil: "networkidle" });

    // Wait for client-side components to hydrate and make fetch calls
    await page.waitForTimeout(5000);

    // Assert zero console errors
    assert.strictEqual(
      consoleErrors.length,
      0,
      `Homepage should produce ZERO console errors. Found ${consoleErrors.length} errors:\n${consoleErrors.join("\n")}`
    );

    // Assert zero page errors (uncaught exceptions)
    assert.strictEqual(
      pageErrors.length,
      0,
      `Homepage should produce ZERO page errors. Found ${pageErrors.length} errors:\n${pageErrors.join("\n")}`
    );

  } finally {
    await browser.close();
  }
});

test("Cincinnati API endpoint returns valid data structure", async () => {
  // Verify the new server-side API endpoint works correctly
  const response = await fetch(`${BASE_URL}/api/tennis/cincinnati`);

  assert.strictEqual(
    response.status,
    200,
    "Cincinnati API should return 200 status"
  );

  const data = await response.json();

  // Verify data structure
  assert.ok(
    Array.isArray(data.matches),
    "Cincinnati API should return a matches array"
  );

  // If there are matches, verify their structure
  if (data.matches.length > 0) {
    const match = data.matches[0];
    assert.ok(match.id, "Match should have an id");
    assert.ok(match.player1, "Match should have player1 name");
    assert.ok(match.player2, "Match should have player2 name");
    assert.ok(match.score, "Match should have a score");
    assert.ok(match.status, "Match should have a status");
    assert.ok(match.round, "Match should have a round");
  }
});
