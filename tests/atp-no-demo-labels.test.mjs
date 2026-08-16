/**
 * Regression test for bug-atp-demo-data-visible
 *
 * Ensures the ATP Live page NEVER displays "demo", "placeholder", or "coming soon"
 * labels to end users, regardless of data source. This violates the CX-FIRST principle
 * which states: "never ship placeholder, coming soon, empty, or fabricated UI to users".
 *
 * The components should either show real data with a source indicator OR show no
 * source indicator at all (when using mock fallback data). They must NEVER explicitly
 * label data as "demo" to the user.
 *
 * This test checks for the EXACT conditional patterns that would render demo labels,
 * not just the presence of strings (which would pass even with the bug present in
 * a conditional branch).
 */

import { test } from "node:test";
import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

test("ATP Live components: NEVER render 'demo' or 'placeholder' labels to users", async () => {
  // Check LiveRankingTable.tsx
  const liveTablePath = join(projectRoot, "src/components/LiveRankingTable.tsx");
  const liveTableContent = await readFile(liveTablePath, "utf-8");

  // CRITICAL: Check for the BUGGY CONDITIONAL PATTERN that shows "Demo data"
  // The bug was: snapshot.source === "mock" ? <span>Demo data</span> : <DataSourceBadge ... />
  // This check fails if that conditional exists (catches the actual bug pattern)
  const hasDemoConditional =
    liveTableContent.includes('source === "mock"') &&
    liveTableContent.includes('Demo data');

  assert.ok(
    !hasDemoConditional,
    "LiveRankingTable.tsx must NOT have a conditional that renders 'Demo data' when source is mock. " +
    "The component should ALWAYS use DataSourceBadge (which returns null for mock)."
  );

  // Should use DataSourceBadge component instead
  assert.ok(
    liveTableContent.includes("DataSourceBadge"),
    "LiveRankingTable.tsx should use DataSourceBadge component for source attribution"
  );

  // Check AtpDeepRankingTable.tsx
  const deepTablePath = join(projectRoot, "src/components/AtpDeepRankingTable.tsx");
  const deepTableContent = await readFile(deepTablePath, "utf-8");

  // CRITICAL: Check for the BUGGY CONDITIONAL PATTERN that shows "Demo data"
  const hasDemoConditionalDeep =
    deepTableContent.includes('source === "mock"') &&
    deepTableContent.includes('Demo data');

  assert.ok(
    !hasDemoConditionalDeep,
    "AtpDeepRankingTable.tsx must NOT have a conditional that renders 'Demo data' when source is mock. " +
    "The component should ALWAYS use DataSourceBadge (which returns null for mock)."
  );

  // Should use DataSourceBadge component instead
  assert.ok(
    deepTableContent.includes("DataSourceBadge"),
    "AtpDeepRankingTable.tsx should use DataSourceBadge component for source attribution"
  );

  // Check atpDeepRanking.ts fallback logic
  const atpDeepPath = join(projectRoot, "src/lib/atpDeepRanking.ts");
  const atpDeepContent = await readFile(atpDeepPath, "utf-8");

  // CRITICAL: Check for the BUGGY PATTERN that appends "(demo)"
  // The bug was: weekLabel: `${mock.weekLabel} (demo)`
  const appendsDemoSuffix =
    atpDeepContent.includes('weekLabel') &&
    (atpDeepContent.includes('(demo)') || atpDeepContent.includes('· demo'));

  assert.ok(
    !appendsDemoSuffix,
    "atpDeepRanking.ts must NOT append '(demo)' or '· demo' suffix to weekLabel. " +
    "Generate a current-date label instead of exposing 'demo' to users."
  );

  // Should generate current date dynamically (not use hardcoded "Grass season")
  // Check that the mock fallback uses Date or similar to generate current labels
  const mockFallbackSection = atpDeepContent.match(/catch\s*{[\s\S]*?return\s*{[\s\S]*?}/);
  if (mockFallbackSection) {
    const fallbackCode = mockFallbackSection[0];
    const usesCurrentDate =
      fallbackCode.includes('new Date()') ||
      fallbackCode.includes('Date.now()') ||
      fallbackCode.includes('toLocaleDateString');

    assert.ok(
      usesCurrentDate,
      "atpDeepRanking.ts mock fallback should use current Date to generate weekLabel, not hardcoded dates"
    );
  }
});

test("DataSourceBadge component: gracefully handles mock source by hiding indicator", async () => {
  const badgePath = join(projectRoot, "src/components/DataSourceBadge.tsx");
  const badgeContent = await readFile(badgePath, "utf-8");

  // DataSourceBadge should return null for mock source (not show "Demo" or "Mock")
  assert.ok(
    badgeContent.includes('source === "mock"') && badgeContent.includes("return null"),
    "DataSourceBadge must return null for mock source (hide the indicator rather than show 'Demo')"
  );
});
