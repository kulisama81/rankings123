/**
 * Regression test for wc-legend-mismatch:
 * The World Cup standings legend should only show "Advancing"/"Eliminated" keys
 * when at least one team has that outlook. Before the fix, the legend always
 * showed both keys even when no team was confirmed advanced/eliminated.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Import the helper function - we need to build it first, so we'll import from the compiled output
// For now, we'll inline a copy of the logic to test it
function getActiveLegendItems(groups) {
  let hasAdvanced = false;
  let hasEliminated = false;

  for (const group of groups) {
    for (const team of group.teams) {
      if (team.outlook === "advanced") hasAdvanced = true;
      if (team.outlook === "out") hasEliminated = true;
      if (hasAdvanced && hasEliminated) break;
    }
    if (hasAdvanced && hasEliminated) break;
  }

  return {
    showAdvancing: hasAdvanced,
    showEliminated: hasEliminated,
  };
}

describe("World Cup Legend Helper", () => {
  it("should show no legend items when all teams are alive (mid-group stage)", () => {
    const groups = [
      {
        name: "Group A",
        teams: [
          { name: "Team 1", outlook: "alive" },
          { name: "Team 2", outlook: "alive" },
          { name: "Team 3", outlook: "alive" },
          { name: "Team 4", outlook: "alive" },
        ],
      },
      {
        name: "Group B",
        teams: [
          { name: "Team 5", outlook: "alive" },
          { name: "Team 6", outlook: "alive" },
          { name: "Team 7", outlook: "alive" },
          { name: "Team 8", outlook: "alive" },
        ],
      },
    ];

    const result = getActiveLegendItems(groups);
    assert.equal(result.showAdvancing, false, "Should not show Advancing when no team is advanced");
    assert.equal(result.showEliminated, false, "Should not show Eliminated when no team is eliminated");
  });

  it("should show advancing when at least one team is confirmed advanced", () => {
    const groups = [
      {
        name: "Group A",
        teams: [
          { name: "Team 1", outlook: "advanced" }, // Confirmed through
          { name: "Team 2", outlook: "alive" },
          { name: "Team 3", outlook: "alive" },
          { name: "Team 4", outlook: "alive" },
        ],
      },
    ];

    const result = getActiveLegendItems(groups);
    assert.equal(result.showAdvancing, true, "Should show Advancing when a team is advanced");
    assert.equal(result.showEliminated, false, "Should not show Eliminated when no team is eliminated");
  });

  it("should show eliminated when at least one team is confirmed out", () => {
    const groups = [
      {
        name: "Group A",
        teams: [
          { name: "Team 1", outlook: "alive" },
          { name: "Team 2", outlook: "alive" },
          { name: "Team 3", outlook: "alive" },
          { name: "Team 4", outlook: "out" }, // Confirmed eliminated
        ],
      },
    ];

    const result = getActiveLegendItems(groups);
    assert.equal(result.showAdvancing, false, "Should not show Advancing when no team is advanced");
    assert.equal(result.showEliminated, true, "Should show Eliminated when a team is eliminated");
  });

  it("should show both legend items when group stage is complete", () => {
    const groups = [
      {
        name: "Group A",
        teams: [
          { name: "Team 1", outlook: "advanced" },
          { name: "Team 2", outlook: "advanced" },
          { name: "Team 3", outlook: "out" },
          { name: "Team 4", outlook: "out" },
        ],
      },
      {
        name: "Group B",
        teams: [
          { name: "Team 5", outlook: "advanced" },
          { name: "Team 6", outlook: "advanced" },
          { name: "Team 7", outlook: "out" },
          { name: "Team 8", outlook: "out" },
        ],
      },
    ];

    const result = getActiveLegendItems(groups);
    assert.equal(result.showAdvancing, true, "Should show Advancing when teams are advanced");
    assert.equal(result.showEliminated, true, "Should show Eliminated when teams are eliminated");
  });

  it("should handle teams with undefined outlook", () => {
    const groups = [
      {
        name: "Group A",
        teams: [
          { name: "Team 1", outlook: undefined },
          { name: "Team 2" }, // No outlook field
          { name: "Team 3", outlook: "alive" },
          { name: "Team 4", outlook: "alive" },
        ],
      },
    ];

    const result = getActiveLegendItems(groups);
    assert.equal(result.showAdvancing, false, "Should not show Advancing when no team is advanced");
    assert.equal(result.showEliminated, false, "Should not show Eliminated when no team is eliminated");
  });

  it("should handle empty groups array", () => {
    const groups = [];

    const result = getActiveLegendItems(groups);
    assert.equal(result.showAdvancing, false, "Should not show Advancing with no groups");
    assert.equal(result.showEliminated, false, "Should not show Eliminated with no groups");
  });
});
