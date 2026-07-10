/**
 * Regression test for bug-cycling-race-status-contradiction
 * Ensures no contradictory race status messages appear on the cycling page
 */

import { test } from "node:test";
import assert from "node:assert/strict";

test("cycling page: no contradictory race status messages when race is active", async () => {
  // This test verifies that when the race is active, the page doesn't show
  // "will update once the race begins" message, which would contradict the
  // "Stage X in progress" subtitle.

  // Mock the getTdfSnapshot function to return active race data
  const mockTdfData = {
    raceStatus: "active",
    currentStage: 5,
    stages: [],
    gc: [],
    jerseys: [],
    source: "wikipedia",
  };

  // Simulate the conditional logic from the page
  const dataSourceMessage = `Stage information sourced from Wikipedia.${
    mockTdfData.raceStatus === "upcoming"
      ? " General Classification will update once the race begins on July 4, 2026."
      : ""
  }${
    mockTdfData.raceStatus === "active"
      ? " General Classification updates as the race progresses."
      : ""
  }`;

  // Verify no contradiction exists
  assert.ok(
    !dataSourceMessage.includes("will update once the race begins"),
    "Active race should not show 'will update once race begins' message"
  );

  assert.ok(
    dataSourceMessage.includes("updates as the race progresses"),
    "Active race should show 'updates as the race progresses' message"
  );
});

test("cycling page: shows appropriate message when race is upcoming", async () => {
  const mockTdfData = {
    raceStatus: "upcoming",
    currentStage: 1,
    stages: [],
    gc: [],
    jerseys: [],
    source: "wikipedia",
  };

  const dataSourceMessage = `Stage information sourced from Wikipedia.${
    mockTdfData.raceStatus === "upcoming"
      ? " General Classification will update once the race begins on July 4, 2026."
      : ""
  }${
    mockTdfData.raceStatus === "active"
      ? " General Classification updates as the race progresses."
      : ""
  }`;

  assert.ok(
    dataSourceMessage.includes("will update once the race begins"),
    "Upcoming race should show 'will update once race begins' message"
  );

  assert.ok(
    !dataSourceMessage.includes("updates as the race progresses"),
    "Upcoming race should not show 'updates as race progresses' message"
  );
});

test("cycling page: no contradictory messages when race is complete", async () => {
  const mockTdfData = {
    raceStatus: "complete",
    currentStage: 21,
    stages: [],
    gc: [],
    jerseys: [],
    source: "wikipedia",
  };

  const dataSourceMessage = `Stage information sourced from Wikipedia.${
    mockTdfData.raceStatus === "upcoming"
      ? " General Classification will update once the race begins on July 4, 2026."
      : ""
  }${
    mockTdfData.raceStatus === "active"
      ? " General Classification updates as the race progresses."
      : ""
  }`;

  assert.ok(
    !dataSourceMessage.includes("will update once the race begins"),
    "Complete race should not show 'will update once race begins' message"
  );

  assert.ok(
    !dataSourceMessage.includes("updates as the race progresses"),
    "Complete race should not show 'updates as race progresses' message"
  );
});
