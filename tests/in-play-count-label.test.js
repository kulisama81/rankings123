/**
 * Regression test for bug-atp-in-play-count-mismatch
 *
 * ISSUE: The "In play" badge showed a count (e.g., "8 In play") that didn't match
 * the number of players with active tournaments visible on the current page,
 * causing user confusion when pagination split active players across pages.
 *
 * FIX: Added clarifying text "(X total)" to indicate the count is across all rankings,
 * not just the current page.
 *
 * This test ensures the label includes clarifying language so users understand
 * the count represents all active players, not just those on the current page.
 */

import { test } from "node:test";
import assert from "node:assert";

test("In play count label includes clarifying text indicating total count", async () => {
  // Read both ranking table component sources
  const fs = await import("fs/promises");
  const path = await import("path");

  const components = [
    "src/components/LiveRankingTable.tsx",
    "src/components/AtpDeepRankingTable.tsx",
  ];

  for (const componentPath of components) {
    const fullPath = path.join(process.cwd(), componentPath);
    const content = await fs.readFile(fullPath, "utf-8");

    // Verify the "In play" label includes clarifying text like "total" or "across all"
    // to indicate it's not just the current page count
    const inPlayLabelRegex = /In play \({liveCount}[^)]*\)/;
    const match = content.match(inPlayLabelRegex);

    assert.ok(
      match,
      `${componentPath} should contain "In play ({liveCount}...)" label`
    );

    // The match should include clarifying text (not just "In play ({liveCount})")
    const hasClarifyingText =
      match[0].includes("total") ||
      match[0].includes("across all") ||
      match[0].includes("all rankings") ||
      match[0].includes("overall");

    assert.ok(
      hasClarifyingText,
      `"In play" count label in ${componentPath} must include clarifying text like "total", "overall", "across all", or "all rankings" to indicate it's not just the current page count. Found: ${match[0]}`
    );
  }
});
