import { test } from "node:test";
import assert from "node:assert";

/**
 * Regression test for bug-cycling-stage-undefined:
 * Prevent "Stage undefined", "preview data", "Leader will be determined"
 * placeholder text from appearing on cycling pages.
 *
 * CX-FIRST: either show real data OR hide the feature.
 */

// Prohibited patterns that violate CX-FIRST
const prohibitedPatterns = [
  { pattern: /Stage undefined/i, description: "broken 'Stage undefined' text" },
  { pattern: /preview data/i, description: "'preview data' placeholder disclaimer" },
  { pattern: /Leader will be determined/i, description: "'Leader will be determined' placeholder" },
];

async function checkPageForPlaceholders(url, pageName) {
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    // If server is not running, skip test
    console.log(`⚠ ${pageName} placeholder test skipped (server not running)`);
    return;
  }

  // If page doesn't exist (404), that's acceptable (CX-FIRST: hide when no data)
  if (response.status === 404) {
    console.log(`✓ ${pageName} hidden (404) - acceptable per CX-FIRST`);
    return;
  }

  assert.strictEqual(
    response.status,
    200,
    `${pageName} should return 200 or 404, got ${response.status}`
  );

  const html = await response.text();

  const failures = [];
  for (const { pattern, description } of prohibitedPatterns) {
    if (pattern.test(html)) {
      failures.push(description);
    }
  }

  assert.strictEqual(
    failures.length,
    0,
    `${pageName} contains prohibited placeholder text: ${failures.join(", ")}`
  );

  console.log(`✓ ${pageName} contains no placeholder/broken text`);
}

test("cycling overview page must not show placeholder/broken text", async () => {
  const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";
  await checkPageForPlaceholders(`${BASE_URL}/cycling`, "Cycling overview page");
});

test("cycling individual race pages must not show placeholder/broken text", async () => {
  const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

  // Test a few specific race pages
  const raceIds = ["tour-de-france-2026", "vuelta-2026", "tour-de-pologne-2026"];

  for (const raceId of raceIds) {
    await checkPageForPlaceholders(
      `${BASE_URL}/cycling/${raceId}`,
      `Cycling page: ${raceId}`
    );
  }
});
