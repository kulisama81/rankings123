/**
 * Regression test for World Cup knockout bracket core feature.
 * Guards against the bracket going missing (especially the R32 column).
 *
 * Context: A planner previously deleted the R32 bracket column "to save space",
 * leaving the knockout view useless. This test ensures the bracket (particularly
 * R32 matchups) is always present and contains real data, not placeholders.
 *
 * Related: bug-wc-bracket-missing-core-feature
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

test("World Cup bracket must NOT show placeholder 'will appear' message when tournament is complete", async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`${BASE_URL}/world-cup`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(2000); // Allow client hydration

    // Get the knockout bracket section text
    const bracketText = await page.evaluate(() => {
      const section = document.querySelector("#knockout-bracket");
      return section ? section.innerText : "";
    });

    // World Cup 2026 ended July 12 - must NOT show placeholder message
    assert.ok(
      !bracketText.includes("will appear once the group stage concludes"),
      "Bracket must not show placeholder message 'will appear once group stage concludes' for completed tournament"
    );

    // Must not show "no knockout bracket" message
    assert.ok(
      !bracketText.includes("No knockout bracket available"),
      "Bracket section must be present with data"
    );
  } finally {
    await browser.close();
  }
});

test("World Cup bracket must include Round of 32 column", async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`${BASE_URL}/world-cup`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(2000); // Allow client hydration

    // Check that "Round of 32" text appears in the bracket section
    const hasR32 = await page.evaluate(() => {
      const section = document.querySelector("#knockout-bracket");
      if (!section) return false;
      return /round of 32/i.test(section.innerText);
    });

    assert.ok(hasR32, "Bracket must include 'Round of 32' stage (this is the protected column per CORE-FEATURES.md)");
  } finally {
    await browser.close();
  }
});

test("World Cup bracket R32 must have real team data, not all TBDs", async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`${BASE_URL}/world-cup`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(2000); // Allow client hydration

    // Extract team codes from the bracket
    const teamCodes = await page.evaluate(() => {
      const section = document.querySelector("#knockout-bracket");
      if (!section) return [];
      const text = section.innerText;
      // Match 3-letter country codes (ARG, SUI, etc.)
      const codes = text.match(/\b[A-Z]{3}\b/g) || [];
      // Filter out common non-team codes
      return codes.filter((c) => !["TBD", "TOP", "BOT"].includes(c));
    });

    // World Cup 2026 is complete - must have real team codes
    assert.ok(
      teamCodes.length >= 4,
      `R32 bracket must show real team codes (ARG, SUI, etc.), not TBD placeholders. Found ${teamCodes.length} team codes`
    );
  } finally {
    await browser.close();
  }
});

test("World Cup bracket for completed tournament must show Final result with scores", async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`${BASE_URL}/world-cup`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(2000); // Allow client hydration

    // World Cup 2026 ended July 12 - Final should be visible with scores
    const finalData = await page.evaluate(() => {
      const section = document.querySelector("#knockout-bracket");
      if (!section) return null;
      const text = section.innerText;
      return {
        hasFinal: /final/i.test(text),
        hasArgentina: /argentina/i.test(text),
        hasSwitzerland: /switzerland/i.test(text),
        hasScores: /\b3\b.*\b1\b|\b1\b.*\b3\b/.test(text), // Match 3-1 or 1-3 score pattern
      };
    });

    assert.ok(finalData, "Bracket section must be present");
    assert.ok(finalData.hasFinal, "Bracket must include Final stage");
    assert.ok(
      finalData.hasArgentina && finalData.hasSwitzerland,
      "Final must show Argentina vs Switzerland (the actual finalists)"
    );
    assert.ok(
      finalData.hasScores,
      "Final must show match scores (3-1), not TBD or blank"
    );
  } finally {
    await browser.close();
  }
});
