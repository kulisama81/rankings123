/**
 * Regression test for cycling-race-status-detection ticket
 *
 * Bug: When Wikipedia API failed, the mock fallback hardcoded raceStatus as "upcoming"
 * instead of calling detectRaceStatus() to determine the correct status based on dates.
 *
 * This caused races to show as "upcoming" or "in progress" even after they ended.
 * Example: TdF 2026 (ended July 26) showed "Stage 21 in progress" on Aug 12.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { detectRaceStatus } from "../src/data/cyclingRaces.ts";

test("detectRaceStatus: correctly identifies completed race (past end date)", () => {
  const race = {
    id: "tour-de-france-2026",
    name: "Tour de France 2026",
    startDate: "2026-07-04",
    endDate: "2026-07-26",
    totalStages: 21,
  };

  // Simulate checking on Aug 12 when TdF ended July 26
  const completedStages = 21;
  const status = detectRaceStatus(race, completedStages);

  assert.strictEqual(
    status,
    "complete",
    "TdF should be 'complete' when all 21 stages are done and we're past end date"
  );
});

test("detectRaceStatus: correctly identifies active race (during race dates)", () => {
  const race = {
    id: "tour-de-pologne-2026",
    name: "Tour de Pologne 2026",
    startDate: "2026-08-09",
    endDate: "2026-08-15",
    totalStages: 7,
  };

  // Simulate checking on Aug 12 (during the race: Aug 9-15)
  // Even with 0 completed stages (Wikipedia failed, no data), should detect as active
  const completedStages = 0;
  const status = detectRaceStatus(race, completedStages);

  assert.strictEqual(
    status,
    "active",
    "Tour de Pologne should be 'active' on Aug 12 (between Aug 9-15 start/end)"
  );
});

test("detectRaceStatus: correctly identifies upcoming race (before start date)", () => {
  const race = {
    id: "vuelta-2026",
    name: "Vuelta a España 2026",
    startDate: "2026-08-22",
    endDate: "2026-09-13",
    totalStages: 21,
  };

  // Simulate checking on Aug 12 (before Aug 22 start)
  const completedStages = 0;
  const status = detectRaceStatus(race, completedStages);

  assert.strictEqual(
    status,
    "upcoming",
    "Vuelta should be 'upcoming' on Aug 12 (before Aug 22 start)"
  );
});

test("detectRaceStatus: identifies complete when all stages done, regardless of date", () => {
  const race = {
    id: "tour-de-pologne-2026",
    name: "Tour de Pologne 2026",
    startDate: "2026-08-09",
    endDate: "2026-08-15",
    totalStages: 7,
  };

  // Even if current date is during the race, if all stages are complete, it's complete
  const completedStages = 7;
  const status = detectRaceStatus(race, completedStages);

  assert.strictEqual(
    status,
    "complete",
    "Race should be 'complete' when all stages are finished, even if current date is before end date"
  );
});

test("detectRaceStatus: marks as archived 30+ days after end date", () => {
  const race = {
    id: "giro-2026",
    name: "Giro d'Italia 2026",
    startDate: "2026-05-08",
    endDate: "2026-05-31",
    totalStages: 21,
  };

  // Simulate checking on Aug 12 (more than 30 days after May 31)
  const completedStages = 15; // Partial data, but race is long past
  const status = detectRaceStatus(race, completedStages);

  assert.strictEqual(
    status,
    "archived",
    "Giro should be 'archived' on Aug 12 (>30 days after May 31 end)"
  );
});

test("detectRaceStatus: identifies complete within 30 days after end date", () => {
  const race = {
    id: "tour-de-france-2026",
    name: "Tour de France 2026",
    startDate: "2026-07-04",
    endDate: "2026-07-26",
    totalStages: 21,
  };

  // Simulate checking on Aug 12 (17 days after July 26, less than 30 days)
  const completedStages = 18; // Partial data (Wikipedia might still be updating)
  const status = detectRaceStatus(race, completedStages);

  assert.strictEqual(
    status,
    "complete",
    "TdF should be 'complete' (not archived) on Aug 12 (17 days after end, <30 days)"
  );
});
