/**
 * Regression test for bug-cycling-stage-404 fix
 *
 * Bug: Tour de France stage pages at /events/tdf-2026/stage-[N] were returning
 * HTTP 404 even though the route was configured and the pages were linked from
 * the cycling main page.
 *
 * Root cause: Missing parent page at /events/tdf-2026. Next.js requires a parent
 * route to exist before serving child dynamic routes.
 *
 * Fix: Added /events/tdf-2026/page.tsx (TdF overview) as parent page.
 *
 * This test ensures all 21 stage pages are accessible and return 200.
 */

import { test } from "node:test";
import assert from "node:assert";

const TEST_PORT = process.env.TEST_PORT || "3124";

test("Tour de France stage 1 page returns 200 (not 404)", async () => {
  const url = `http://localhost:${TEST_PORT}/events/tdf-2026/stage/1`;
  const res = await fetch(url);

  assert.strictEqual(
    res.status,
    200,
    `Expected 200 OK but got ${res.status} for stage-1. ` +
    `Stage pages should be accessible, not 404.`
  );

  const contentType = res.headers.get("content-type");
  assert.ok(
    contentType?.includes("text/html"),
    `Expected HTML response but got ${contentType}`
  );

  const html = await res.text();

  // Should contain stage structure elements
  assert.ok(
    html.includes("Stage 1"),
    "Page should contain 'Stage 1' heading"
  );

  assert.ok(
    html.includes("Back to Tour de France overview"),
    "Page should contain back link to cycling overview"
  );
});

test("Current Tour de France stage page returns 200 (not 404)", async () => {
  // Test a mid-race stage (e.g., stage 7)
  const url = `http://localhost:${TEST_PORT}/events/tdf-2026/stage/7`;
  const res = await fetch(url);

  assert.strictEqual(
    res.status,
    200,
    `Expected 200 OK but got ${res.status} for stage-7`
  );

  const html = await res.text();

  // Should contain stage information
  assert.ok(
    html.includes("Stage 7"),
    "Page should contain 'Stage 7' content"
  );
});

test("All 21 Tour de France stage pages are accessible (no 404s)", async () => {
  // Test all 21 stages to ensure complete fix
  const stageTests = Array.from({ length: 21 }, (_, i) => i + 1);

  for (const stageNum of stageTests) {
    const url = `http://localhost:${TEST_PORT}/events/tdf-2026/stage/${stageNum}`;
    const res = await fetch(url);

    assert.strictEqual(
      res.status,
      200,
      `Stage ${stageNum} should return 200, not ${res.status}`
    );
  }

  console.log(`✓ All 21 stage pages accessible`);
});

test("Tour de France parent overview page returns 200", async () => {
  // The fix also added a parent overview page - verify it works
  const url = `http://localhost:${TEST_PORT}/events/tdf-2026`;
  const res = await fetch(url);

  assert.strictEqual(
    res.status,
    200,
    `Expected 200 OK for TdF overview page but got ${res.status}`
  );

  const html = await res.text();

  assert.ok(
    html.includes("Tour de France 2026"),
    "Overview page should contain 'Tour de France 2026' title"
  );

  assert.ok(
    html.includes("Stages"),
    "Overview page should list stages"
  );
});
