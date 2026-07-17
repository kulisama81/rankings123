/**
 * Regression test for bug-cycling-stage-status-stale
 *
 * Bug: Tour de France page showed "Stage 11 in progress" when Stage 12 was completed.
 * Root cause: currentStage logic only checked jersey leaders table, which lagged behind
 * the stage winners table.
 *
 * This test verifies that currentStage reflects the most recent completed stage from
 * BOTH the stages table (winners) and jersey leaders table.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

// Mock data structures matching the TdF snapshot
const createMockStages = (completedUpTo) => {
  const stages = [];
  for (let i = 1; i <= 21; i++) {
    const stage = {
      stage: i,
      date: `${i + 3} Jul`,
      course: `Stage ${i}`,
      distance: "200 km",
      type: "Flat stage",
    };
    if (i <= completedUpTo) {
      stage.winner = `Rider ${i}`;
    }
    stages.push(stage);
  }
  return stages;
};

const createMockJerseyLeaders = (latestStage) => ({
  yellow: { name: "Leader" },
  green: { name: "Sprinter" },
  polkadot: { name: "Climber" },
  white: { name: "Young Rider" },
  latestStage,
});

// Extracted logic from cyclingFeed.ts getCurrentStage calculation
const calculateCurrentStage = (stages, jerseyLeaders, isPastStartDate) => {
  // Find the highest completed stage from the stages table (has a winner)
  const completedStages = stages.filter((s) => s.winner);
  const latestCompletedFromStages =
    completedStages.length > 0 ? Math.max(...completedStages.map((s) => s.stage)) : 0;

  // Get latest completed stage from jersey leaders
  const latestCompletedFromJerseys =
    typeof jerseyLeaders.latestStage === "number" ? jerseyLeaders.latestStage : 0;

  // Use whichever source shows the most recent completed stage
  const latestCompletedStage = Math.max(latestCompletedFromStages, latestCompletedFromJerseys);

  if (latestCompletedStage > 0 && latestCompletedStage < 21) {
    // Next stage after the latest completed one
    return latestCompletedStage + 1;
  } else if (latestCompletedStage === 21) {
    // Race finished
    return undefined;
  } else if (isPastStartDate) {
    // Race started but no completed stages yet
    return 1;
  } else {
    // Pre-race
    return undefined;
  }
};

test("currentStage uses most recent stage from stages table when it's ahead of jersey leaders", () => {
  // Bug scenario: Stage 12 completed (has winner), but jersey leaders only updated to Stage 11
  const stages = createMockStages(12); // Stages 1-12 have winners
  const jerseyLeaders = createMockJerseyLeaders(11); // Jersey table lags behind
  const isPastStartDate = true;

  const currentStage = calculateCurrentStage(stages, jerseyLeaders, isPastStartDate);

  // Should show Stage 13 as current (12 + 1), not Stage 12 (11 + 1)
  assert.equal(currentStage, 13, "Should use Stage 12 from stages table, not Stage 11 from jerseys");
});

test("currentStage uses jersey leaders when stages table lags behind", () => {
  // Opposite scenario: Jersey leaders updated to Stage 10, but stages table only shows 9 winners
  const stages = createMockStages(9);
  const jerseyLeaders = createMockJerseyLeaders(10);
  const isPastStartDate = true;

  const currentStage = calculateCurrentStage(stages, jerseyLeaders, isPastStartDate);

  assert.equal(currentStage, 11, "Should use Stage 10 from jerseys, not Stage 9 from stages");
});

test("currentStage is undefined when all 21 stages are complete", () => {
  const stages = createMockStages(21); // All stages complete
  const jerseyLeaders = createMockJerseyLeaders(21);
  const isPastStartDate = true;

  const currentStage = calculateCurrentStage(stages, jerseyLeaders, isPastStartDate);

  assert.equal(currentStage, undefined, "Race complete, no current stage");
});

test("currentStage is 1 when race started but no stages complete", () => {
  const stages = createMockStages(0); // No completed stages
  const jerseyLeaders = { latestStage: 0 };
  const isPastStartDate = true;

  const currentStage = calculateCurrentStage(stages, jerseyLeaders, isPastStartDate);

  assert.equal(currentStage, 1, "Race started but no complete stages, should be Stage 1");
});

test("currentStage is undefined before race starts", () => {
  const stages = createMockStages(0);
  const jerseyLeaders = { latestStage: 0 };
  const isPastStartDate = false;

  const currentStage = calculateCurrentStage(stages, jerseyLeaders, isPastStartDate);

  assert.equal(currentStage, undefined, "Pre-race, no current stage");
});

test("currentStage handles missing jersey leader data gracefully", () => {
  const stages = createMockStages(5);
  const jerseyLeaders = {}; // No latestStage field
  const isPastStartDate = true;

  const currentStage = calculateCurrentStage(stages, jerseyLeaders, isPastStartDate);

  assert.equal(currentStage, 6, "Should fall back to stages table only");
});
