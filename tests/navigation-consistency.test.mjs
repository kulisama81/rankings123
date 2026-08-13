#!/usr/bin/env node
/**
 * Navigation consistency test — ensures header nav and homepage 'All Sports' section
 * show the same sports (no navigation inconsistencies).
 *
 * Regression test for bug-cycling-nav-inconsistency: cycling was in header nav but
 * missing from homepage 'All Sports' when TdF was not active.
 *
 * Usage: node --test (via npm test)
 */
import { test } from "node:test";
import { strict as assert } from "node:assert";

const BASE = process.env.TEST_BASE_URL || "http://localhost:3000";

test("Navigation consistency: cycling appears in both header nav and homepage", async () => {
  const res = await fetch(`${BASE}/`);
  assert.equal(res.status, 200, "Homepage should return 200");

  const html = await res.text();

  // Check header nav includes cycling
  const hasNavCycling = html.includes('href="/cycling"') && html.includes('data-nav-sport="cycling"');
  assert.ok(hasNavCycling, "Header nav should include cycling link with data-nav-sport attribute");

  // Check homepage 'All Sports' section includes cycling
  // The cycling link appears in the sports grid
  const cyclingLinkPattern = /<a[^>]*href="\/cycling"[^>]*>/i;
  const matches = html.match(new RegExp(cyclingLinkPattern, "g"));

  assert.ok(matches && matches.length >= 2,
    "Cycling should appear at least twice: once in nav, once in 'All Sports' section");

  console.log("✓ Navigation consistency check passed: cycling appears in both header and homepage");
});
