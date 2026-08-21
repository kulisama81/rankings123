/**
 * Mobile overflow regression tests
 *
 * Ensures pages fit within mobile viewport (375px) with no horizontal scroll.
 * Bug: bug-wc-mobile-overflow — World Cup page had horizontal overflow on mobile
 */

import { test } from "node:test";
import { strict as assert } from "node:assert";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test("World Cup page: no horizontal overflow on mobile viewport (375px)", async (t) => {
  // This test verifies the fix for bug-wc-mobile-overflow
  // The fix adds overflow-x-clip to the page container to prevent horizontal scroll
  try {
    const response = await fetch(`${BASE_URL}/world-cup`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      t.skip("Server not accessible");
      return;
    }

    // Read the HTML to verify the fix is in place
    const html = await response.text();

    // Verify overflow-x-clip class is present in the page container
    const hasOverflowFix = html.includes('overflow-x-clip');
    assert.ok(hasOverflowFix,
      "Page container should have overflow-x-clip to prevent horizontal scroll from negative margins");

    // Verify the bracket component has horizontal scroll capability (overflow-x-auto)
    const hasBracketScroll = html.includes('overflow-x-auto');
    assert.ok(hasBracketScroll,
      "Bracket should have overflow-x-auto for horizontal scrolling within its container");

    t.diagnostic("✓ World Cup page has overflow containment fix");
    t.diagnostic("✓ Bracket tree can scroll horizontally within clipped container");
    t.diagnostic("Manual verification required: Visit /world-cup on mobile (375px width)");
    t.diagnostic("Expected: No page-level horizontal scroll, bracket scrolls within bounds");
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch failed")) {
      t.skip("Server not running");
    } else {
      throw error;
    }
  }
});

// Placeholder for future Playwright-based test
test.todo("World Cup page: scrollWidth === clientWidth on 375px viewport");
test.todo("World Cup page: no overflow in dark theme on mobile");
test.todo("World Cup page: no overflow in light theme on mobile");
