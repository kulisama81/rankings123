/**
 * Regression test for bug-wc-predictions-placeholder-archived
 *
 * Ensures that the World Cup page does not show future-tense placeholder text
 * (like "check back as the tournament schedule is announced") when the tournament
 * is complete.
 *
 * This guards against the bug where outdated placeholder text was shown on a
 * completed tournament page, creating confusing/contradictory messaging.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

test("World Cup: No future-tense placeholders on completed tournament", async () => {
  // Fetch the World Cup page
  const res = await fetch("http://localhost:3000/world-cup");
  assert.ok(res.ok, `Expected 200, got ${res.status}`);

  const html = await res.text();

  // Check if tournament appears complete by looking for final results hero
  const hasCompletedTournamentIndicator =
    html.includes("Tournament Complete") || html.includes("Tournament concluded");

  if (!hasCompletedTournamentIndicator) {
    // Tournament is still ongoing or hasn't started, skip this test
    console.log("  ⊘ Tournament not yet complete, skipping placeholder check");
    return;
  }

  // If tournament is complete, there should be NO future-tense placeholder text
  const futurePlaceholders = [
    "Check back as the tournament schedule is announced",
    "check back as the tournament schedule",
    "tournament schedule is announced",
  ];

  for (const placeholder of futurePlaceholders) {
    const found = html.toLowerCase().includes(placeholder.toLowerCase());
    assert.ok(
      !found,
      `Found future-tense placeholder "${placeholder}" on completed tournament page. ` +
        `Expected appropriate messaging for archived/completed tournament instead.`
    );
  }

  console.log("  ✓ No future-tense placeholders found on completed tournament page");
});
