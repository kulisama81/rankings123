/**
 * Regression guard for bug-atp-in-play-count-mismatch
 *
 * The "In play" count badge shows the total across ALL players in the ranking,
 * not just those visible on the current page. This test ensures:
 * 1. The label clarifies it's an overall/total count (not just current page)
 * 2. The count logic actually counts ALL players with active tournaments
 */

import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";

test("ATP/WTA Live: 'In play' stat label clarifies it's across all pages", () => {
  const liveRankingView = fs.readFileSync("src/components/LiveRankingView.tsx", "utf8");

  // The HeroBanner stat must clarify the count is overall, not just current page.
  // Acceptable phrasings: "In play overall", "In play (all pages)", "Total in play", etc.
  // NOT acceptable: bare "In play" or "Players in play" (the original bug).
  const hasClarity =
    liveRankingView.includes('{ label: "In play overall"') ||
    liveRankingView.includes('{ label: "In play (all pages)"') ||
    liveRankingView.includes('{ label: "Total in play"') ||
    liveRankingView.includes('{ label: "In play (total)"');

  assert.ok(
    hasClarity,
    'LiveRankingView stat label must clarify "In play" is an overall count, not just current page'
  );

  // The table filters also use "overall" for consistency
  const liveRankingTable = fs.readFileSync("src/components/LiveRankingTable.tsx", "utf8");
  const atpDeepRankingTable = fs.readFileSync("src/components/AtpDeepRankingTable.tsx", "utf8");

  assert.ok(
    liveRankingTable.includes("In play ({liveCount} overall)"),
    'LiveRankingTable filter should show "In play ({liveCount} overall)" for consistency'
  );

  assert.ok(
    atpDeepRankingTable.includes("In play ({liveCount} overall)"),
    'AtpDeepRankingTable filter should show "In play ({liveCount} overall)" for consistency'
  );
});

test("ATP/WTA Live: 'In play' count logic counts ALL players, not just current page", () => {
  const liveRankingView = fs.readFileSync("src/components/LiveRankingView.tsx", "utf8");

  // Verify the count logic filters ALL players from the snapshot, not a subset.
  // The key line: `const liveCount = players.filter((p) => p.tournament?.active).length;`
  // Must use `players` (full snapshot), not a paginated/filtered subset.
  assert.ok(
    liveRankingView.includes("players.filter((p) => p.tournament?.active).length"),
    '"In play" count must be calculated from ALL players in snapshot, not a paginated subset'
  );

  // Ensure `players` comes from the full snapshot, not filtered
  assert.ok(
    liveRankingView.includes("const players = snapshot.players"),
    '"players" must be the full snapshot, not a filtered/paginated view'
  );
});
