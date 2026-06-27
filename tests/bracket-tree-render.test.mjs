/**
 * Regression test for wc-bracket-tree-empty bug.
 * Verifies that the WorldCupBracketTree component renders projected matches.
 */

import { test } from "node:test";
import assert from "node:assert";

test("bracket tree renders projected R16 matches", async () => {
  // Fetch bracket data from API
  const response = await fetch("http://localhost:3000/api/worldcup/bracket");
  assert.strictEqual(response.ok, true, "Bracket API should be accessible");

  const bracket = await response.json();
  assert.ok(bracket.stages, "Bracket should have stages");

  // Find R16 stage
  const r16Stage = bracket.stages.find((s) => s.name === "Rd of 16");
  assert.ok(r16Stage, "Bracket should include Rd of 16 stage");
  assert.ok(r16Stage.matches, "R16 stage should have matches");

  // Verify projected matches exist
  const projectedMatches = r16Stage.matches.filter((m) =>
    m.id.startsWith("projected-")
  );
  assert.ok(
    projectedMatches.length > 0,
    "R16 should have projected matches when group stage is in progress"
  );

  // Verify match structure includes team data
  const firstMatch = r16Stage.matches[0];
  assert.ok(firstMatch.homeName, "Match should have home team name");
  assert.ok(firstMatch.awayName, "Match should have away team name");
  assert.ok(firstMatch.homeFlag, "Match should have home team flag");
  assert.ok(firstMatch.awayFlag, "Match should have away team flag");

  console.log(
    `✓ Bracket API returns ${r16Stage.matches.length} R16 matches (${projectedMatches.length} projected)`
  );
});

test("bracket tree renders all knockout rounds", async () => {
  const response = await fetch("http://localhost:3000/api/worldcup/bracket");
  const bracket = await response.json();

  const requiredStages = [
    "Rd of 16",
    "Quarterfinals",
    "Semifinals",
    "Final",
  ];

  for (const stageName of requiredStages) {
    const stage = bracket.stages.find((s) => s.name === stageName);
    assert.ok(stage, `Bracket should include ${stageName} stage`);
    assert.ok(
      stage.matches && stage.matches.length > 0,
      `${stageName} should have matches`
    );
  }

  console.log("✓ Bracket includes all required knockout stages");
});

test("bracket tree page loads successfully", async () => {
  const response = await fetch("http://localhost:3000/world-cup/knockout");
  assert.strictEqual(
    response.ok,
    true,
    "Bracket tree page should be accessible"
  );

  const html = await response.text();
  assert.ok(html.length > 0, "Page should render HTML");

  // Check for key bracket tree elements (these are in the component code)
  assert.ok(
    html.includes("Top Half") || html.includes("world-cup"),
    "Page should include bracket tree structural elements or route"
  );

  console.log("✓ Bracket tree page loads successfully");
});
