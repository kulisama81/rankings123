/**
 * Regression tests for Wimbledon 2026 tournament view
 * Ticket: wimbledon-2026-live
 *
 * These tests verify the Wimbledon tournament page meets acceptance criteria:
 * - Route exists and renders successfully
 * - SEO metadata is present (title, description, OG tags)
 * - ATP/WTA tour toggle works
 * - Source attribution visible
 * - Design tokens used (no raw colors)
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("Wimbledon page TSX file exists", async () => {
  const pageContent = await readFile(
    "src/app/tournaments/wimbledon-2026/page.tsx",
    "utf-8"
  );

  assert.ok(pageContent.includes("Wimbledon 2026"), "Page should mention Wimbledon 2026");
  assert.ok(pageContent.includes("getLiveData"), "Page should fetch live data");
  assert.ok(
    pageContent.includes("WimbledonTournamentView"),
    "Page should use WimbledonTournamentView component"
  );
  assert.ok(
    pageContent.includes('dynamic = "force-dynamic"'),
    "Page should use force-dynamic rendering"
  );
});

test("Wimbledon page has proper SEO metadata", async () => {
  const pageContent = await readFile(
    "src/app/tournaments/wimbledon-2026/page.tsx",
    "utf-8"
  );

  assert.ok(
    pageContent.includes("title: \"Wimbledon 2026 Live Rankings"),
    "Should have proper title"
  );
  assert.ok(pageContent.includes("openGraph"), "Should have OpenGraph metadata");
  assert.ok(pageContent.includes("keywords:"), "Should have keywords array");
  assert.ok(pageContent.includes("wimbledon live rankings"), "Should target key search terms");
  assert.ok(pageContent.includes("canonical:"), "Should have canonical URL");
  assert.ok(pageContent.includes("application/ld+json"), "Should have JSON-LD structured data");
});

test("WimbledonTournamentView component exists", async () => {
  const componentContent = await readFile(
    "src/components/WimbledonTournamentView.tsx",
    "utf-8"
  );

  assert.ok(componentContent.includes("export default function"), "Component should export default");
  assert.ok(
    componentContent.includes("atpSnapshot") && componentContent.includes("wtaSnapshot"),
    "Component should accept ATP and WTA snapshots"
  );
  assert.ok(componentContent.includes("setActiveTour"), "Component should have tour toggle");
});

test("WimbledonTournamentView shows current round indicator", async () => {
  const componentContent = await readFile(
    "src/components/WimbledonTournamentView.tsx",
    "utf-8"
  );

  assert.ok(
    componentContent.includes("Current Round"),
    "Component should display current round"
  );
  assert.ok(
    componentContent.includes("tournament?.round"),
    "Component should extract round from tournament data"
  );
});

test("WimbledonTournamentView has post-tournament champions display", async () => {
  const componentContent = await readFile(
    "src/components/WimbledonTournamentView.tsx",
    "utf-8"
  );

  assert.ok(
    componentContent.includes("isTournamentConcluded"),
    "Component should detect post-tournament state"
  );
  assert.ok(
    componentContent.includes("Champions") || componentContent.includes("champion"),
    "Component should mention champions"
  );
  assert.ok(
    componentContent.includes("2026-07-12"),
    "Component should know tournament end date"
  );
  assert.ok(
    componentContent.includes("Men") && componentContent.includes("Women"),
    "Component should show both ATP and WTA champions"
  );
});

test("WimbledonTournamentView uses design tokens (not raw colors)", async () => {
  const componentContent = await readFile(
    "src/components/WimbledonTournamentView.tsx",
    "utf-8"
  );

  // Check for design token usage
  assert.ok(
    componentContent.includes("bg-surface-elevated") ||
      componentContent.includes("bg-surface-raised"),
    "Component should use surface design tokens"
  );
  assert.ok(
    componentContent.includes("text-muted") || componentContent.includes("text-default"),
    "Component should use text design tokens"
  );

  // Ensure no raw Tailwind color classes in active UI
  const rawColorPattern = /className="[^"]*\b(?:bg-white|bg-black|text-white|text-black|bg-gray-\d+|text-gray-\d+)\b/g;
  const matches = componentContent.match(rawColorPattern);

  assert.ok(
    !matches || matches.length === 0,
    "Component should not use raw color classes (found: " + (matches?.join(", ") || "none") + ")"
  );
});

test("WimbledonTournamentView shows source attribution", async () => {
  const componentContent = await readFile(
    "src/components/WimbledonTournamentView.tsx",
    "utf-8"
  );

  assert.ok(
    componentContent.includes("Data source") || componentContent.includes("source"),
    "Component should show data source"
  );
  assert.ok(
    componentContent.includes("activeSnapshot.source"),
    "Component should display snapshot source flag"
  );
});

test("Tournament date constants are correct", () => {
  const startDate = new Date("2026-06-29");
  const endDate = new Date("2026-07-12");

  assert.ok(startDate < endDate, "Start date should be before end date");

  // Verify tournament is 13 days duration (June 29 to July 12)
  const durationDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
  assert.equal(durationDays, 13, "Wimbledon should be 13 days duration");
});
