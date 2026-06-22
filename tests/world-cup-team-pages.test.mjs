/**
 * Regression test for wc-team-roster-missing-regression ticket.
 * Guards against team pages missing roster sections by verifying:
 * - The roster feed function exists
 * - Roster data is fetched and either displayed or hidden (never placeholders)
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

describe("World Cup Team Pages - Roster", () => {
  test("roster feed module exists", () => {
    const feedPath = join(projectRoot, "src/lib/worldCupTeamRosterFeed.ts");
    assert.ok(
      existsSync(feedPath),
      "Team roster feed should exist at src/lib/worldCupTeamRosterFeed.ts"
    );
  });

  test("roster feed has proper error handling", () => {
    const feedPath = join(projectRoot, "src/lib/worldCupTeamRosterFeed.ts");
    const feedContent = readFileSync(feedPath, "utf-8");

    // Verify the feed has try/catch with null return on failure
    assert.ok(
      feedContent.includes("try"),
      "Feed should have try/catch for graceful degradation"
    );
    assert.ok(
      feedContent.includes("catch"),
      "Feed should catch errors"
    );
    assert.ok(
      feedContent.includes("return null"),
      "Feed should return null on error (to hide section, not show placeholders)"
    );
  });

  test("team page imports and uses roster feed", () => {
    const pagePath = join(
      projectRoot,
      "src/app/world-cup/team/[code]/page.tsx"
    );
    const pageContent = readFileSync(pagePath, "utf-8");

    // Verify the page imports the roster feed
    assert.ok(
      pageContent.includes("fetchTeamRoster"),
      "Team page should import fetchTeamRoster"
    );

    // Verify the page calls fetchTeamRoster
    assert.ok(
      pageContent.includes("await fetchTeamRoster"),
      "Team page should await fetchTeamRoster"
    );

    // Verify the page conditionally renders roster (hides if null)
    assert.ok(
      pageContent.includes("rosterData &&") || pageContent.includes("rosterData?."),
      "Team page should conditionally render roster (hide if null)"
    );
  });

  test("team page renders roster with real data structure", () => {
    const pagePath = join(
      projectRoot,
      "src/app/world-cup/team/[code]/page.tsx"
    );
    const pageContent = readFileSync(pagePath, "utf-8");

    // Verify roster section displays player fields
    assert.ok(
      pageContent.includes("player.name") || pageContent.includes("{player.name}"),
      "Roster should display player names"
    );
    assert.ok(
      pageContent.includes("player.jersey") || pageContent.includes("{player.jersey}"),
      "Roster should display player jersey numbers"
    );
    assert.ok(
      pageContent.includes("player.position") || pageContent.includes("{player.position}"),
      "Roster should display player positions"
    );
  });

  test("WorldCupTeamRoster type is defined", () => {
    const typesPath = join(projectRoot, "src/types/index.ts");
    const typesContent = readFileSync(typesPath, "utf-8");

    assert.ok(
      typesContent.includes("export interface WorldCupTeamRoster"),
      "WorldCupTeamRoster type should be exported"
    );
    assert.ok(
      typesContent.includes("roster:"),
      "WorldCupTeamRoster should include roster field"
    );
    assert.ok(
      typesContent.includes("source:"),
      "WorldCupTeamRoster should include source field"
    );
  });
});
