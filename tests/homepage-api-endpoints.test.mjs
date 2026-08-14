/**
 * Regression test for bug-homepage-api-404-tennis
 *
 * Ensures /api/atp-live and /api/wta-live endpoints exist and return valid data.
 * Before fix: both endpoints returned 404
 * After fix: both endpoints return 200 with valid player data
 */

import { test } from "node:test";
import assert from "node:assert";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test("GET /api/atp-live returns 200 with valid player data", async () => {
  const res = await fetch(`${BASE_URL}/api/atp-live`);

  assert.strictEqual(res.status, 200, "/api/atp-live should return 200 OK");

  const data = await res.json();
  assert.ok(data, "Response should contain data");
  assert.ok(Array.isArray(data.players), "Response should have players array");
  assert.ok(data.players.length > 0, "Players array should not be empty");

  // Verify player structure
  const player = data.players[0];
  assert.ok(player.liveRank, "Player should have liveRank");
  assert.ok(player.name, "Player should have name");
  assert.ok(typeof player.livePoints === "number", "Player should have livePoints");
});

test("GET /api/wta-live returns 200 with valid player data", async () => {
  const res = await fetch(`${BASE_URL}/api/wta-live`);

  assert.strictEqual(res.status, 200, "/api/wta-live should return 200 OK");

  const data = await res.json();
  assert.ok(data, "Response should contain data");
  assert.ok(Array.isArray(data.players), "Response should have players array");
  assert.ok(data.players.length > 0, "Players array should not be empty");

  // Verify player structure
  const player = data.players[0];
  assert.ok(player.liveRank, "Player should have liveRank");
  assert.ok(player.name, "Player should have name");
  assert.ok(typeof player.livePoints === "number", "Player should have livePoints");
});
