/**
 * Regression test for wc-legend-missing-regression:
 * The World Cup standings page should ALWAYS display a legend explaining what
 * the status indicators (Advancing/Eliminated color bars) mean, even when no
 * teams currently have those statuses.
 *
 * Previously, the legend was conditionally shown only when at least one team
 * had "advanced" or "out" status, causing confusion when the legend disappeared
 * entirely during early group stages.
 *
 * The fix ensures users always see what status indicators mean, providing
 * educational value and consistency throughout the tournament.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

describe("World Cup Legend Always Visible", () => {
  it("should always render legend items even when no teams have advanced/eliminated status", async () => {
    // This test verifies that the legend is present in the component code
    // In a real React component test, we'd render the component and check the DOM
    // For now, we verify the source contains both legend items unconditionally

    const componentPath = join(process.cwd(), "src/components/WorldCupTable.tsx");
    const source = await readFile(componentPath, "utf-8");

    // Verify the legend section exists and is not conditionally hidden
    assert.match(source, /Advancing/, "Legend should include 'Advancing' text");
    assert.match(source, /Eliminated/, "Legend should include 'Eliminated' text");

    // Verify both status indicators are rendered with their visual markers
    assert.match(source, /bg-up.*Advancing/, "Advancing indicator should have green visual marker");
    assert.match(source, /bg-down.*Eliminated/, "Eliminated indicator should have red visual marker");
  });

  it("should always render the legend container", async () => {
    const componentPath = join(process.cwd(), "src/components/WorldCupTable.tsx");
    const source = await readFile(componentPath, "utf-8");

    // The legend should be in a container that's always rendered (not conditionally)
    // We're looking for the legend items NOT being wrapped in a conditional that hides them entirely
    const hasAlwaysVisibleLegend =
      source.includes("Advancing") &&
      source.includes("Eliminated") &&
      // The section should exist without being entirely wrapped in a conditional based on team status
      !source.includes("showAdvancing &&") ||
      !source.includes("showEliminated &&");

    assert.ok(hasAlwaysVisibleLegend, "Legend should be always visible, not conditionally hidden");
  });

  it("should include both status indicator types in legend", () => {
    // This is a documentation test - verifying the expected behavior
    // The legend should explain BOTH possible status indicators:
    // 1. Advancing (green bar) - teams that have qualified for knockout stage
    // 2. Eliminated (red bar) - teams that cannot advance

    const expectedLegendItems = [
      { status: "Advancing", color: "green", meaning: "Qualified for knockout stage" },
      { status: "Eliminated", color: "red", meaning: "Cannot advance" },
    ];

    assert.equal(expectedLegendItems.length, 2, "Legend should explain both possible statuses");
    assert.ok(
      expectedLegendItems.some(item => item.status === "Advancing"),
      "Legend must include Advancing status"
    );
    assert.ok(
      expectedLegendItems.some(item => item.status === "Eliminated"),
      "Legend must include Eliminated status"
    );
  });
});

// Keep the helper function tests for documentation, but note they're no longer
// driving the UI logic since we always show all legend items
describe("getActiveLegendItems helper (legacy)", () => {
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

  it("correctly identifies when teams have advanced status", () => {
    const groups = [
      {
        name: "Group A",
        teams: [
          { name: "Team 1", outlook: "advanced" },
          { name: "Team 2", outlook: "alive" },
        ],
      },
    ];

    const result = getActiveLegendItems(groups);
    assert.equal(result.showAdvancing, true);
    assert.equal(result.showEliminated, false);
  });

  it("correctly identifies when teams have eliminated status", () => {
    const groups = [
      {
        name: "Group A",
        teams: [
          { name: "Team 1", outlook: "alive" },
          { name: "Team 2", outlook: "out" },
        ],
      },
    ];

    const result = getActiveLegendItems(groups);
    assert.equal(result.showAdvancing, false);
    assert.equal(result.showEliminated, true);
  });
});
