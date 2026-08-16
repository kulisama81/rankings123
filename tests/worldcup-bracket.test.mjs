import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";

/**
 * Regression test for bug-wc-bracket-tbd-complete-tournament
 * When the World Cup tournament is complete (Final match finished with valid scores),
 * the bracket visualization should NOT show "TBD" placeholders or "Projected" labels.
 * This prevents stale data from appearing on a completed tournament.
 *
 * Bug history:
 * - Tournament ended July 19, 2026, but bracket continued showing TBD/Projected for QF/SF/Final
 * - Root cause: bracket projection logic ran even when tournament was complete
 * - Fix: Skip projection when Final match is finished with valid scores
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

test("World Cup bracket: no TBD placeholders when tournament is complete", async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to World Cup page
    await page.goto(`${BASE_URL}/world-cup`, { waitUntil: "networkidle" });

    // Check if tournament is complete by looking for the Final result in the hero
    const heroText = await page.textContent("h1, h2, .type-hero, .type-title").catch(() => "");
    const hasFinalResult = heroText.toLowerCase().includes("final") || heroText.toLowerCase().includes("champion");

    // Also check the page content for explicit Final score
    const pageContent = await page.textContent("body");
    const hasCompletionIndicator = pageContent.includes("Tournament Complete") ||
                                    pageContent.includes("Final Result") ||
                                    /Argentina.*Switzerland|Switzerland.*Argentina/.test(pageContent);

    if (hasFinalResult || hasCompletionIndicator) {
      console.log("✓ Tournament appears complete — checking bracket for TBD placeholders...");

      // Find the bracket section
      const bracketSection = await page.locator("#knockout-bracket, section:has-text('Knockout Bracket')").first();
      const bracketExists = await bracketSection.count() > 0;

      if (bracketExists) {
        const bracketText = await bracketSection.textContent();

        // Regression guard: When tournament is complete, bracket should NOT contain:
        // 1. "TBD" text (placeholder team names)
        // 2. "Projected" labels (indicates projection logic ran)
        // 3. Trophy emoji without team names (🏆TBD pattern)

        assert.strictEqual(
          bracketText.includes("TBD"),
          false,
          "Bracket shows TBD placeholders despite tournament being complete. Expected all matches to show actual team names."
        );

        assert.strictEqual(
          bracketText.includes("Projected"),
          false,
          "Bracket shows Projected labels despite tournament being complete. Projected matches should only appear for upcoming tournaments."
        );

        // Additional check: Count trophy emojis that might indicate placeholder slots
        const trophyMatches = (bracketText.match(/🏆/g) || []).length;
        if (trophyMatches > 2) {
          // A few trophies are OK (Final match trophy icon), but many suggests TBD placeholders
          assert.fail(
            `Bracket contains ${trophyMatches} trophy emojis, suggesting multiple TBD placeholders despite tournament being complete.`
          );
        }

        console.log("✓ No TBD placeholders found in bracket");
      } else {
        // Bracket section doesn't exist - that's acceptable for a complete tournament
        console.log("⊘ No bracket section found — acceptable for completed tournament");
      }
    } else {
      // Tournament not complete — skip this test
      console.log("⊘ Tournament not complete (no Final result found) — test skipped");
    }
  } finally {
    await browser.close();
  }
});
