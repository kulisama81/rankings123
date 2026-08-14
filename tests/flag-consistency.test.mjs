/**
 * Regression test for wta-romanian-flag-display
 *
 * Ensures all players in ranking data have valid flag emojis matching their
 * country codes. No white flags 🏳️ should appear unless country is null/unknown.
 *
 * Before fix: Romanian players with country code 'ROM' showed white flag
 * After fix: 'ROM' maps to Romanian flag 🇷🇴
 */

import { test } from "node:test";
import assert from "node:assert";
import { flagEmoji } from "../src/lib/flags.ts";

test("flagEmoji returns Romanian flag for ROM country code", () => {
  const flag = flagEmoji("ROM");
  assert.strictEqual(flag, "🇷🇴", "ROM should map to Romanian flag 🇷🇴");
});

test("flagEmoji returns Romanian flag for ROU country code", () => {
  const flag = flagEmoji("ROU");
  assert.strictEqual(flag, "🇷🇴", "ROU should also map to Romanian flag 🇷🇴");
});

test("flagEmoji returns white flag for unknown country codes", () => {
  const flag = flagEmoji("UNKNOWN");
  assert.strictEqual(flag, "🏳️", "Unknown codes should return white flag");
});

test("flagEmoji handles common ATP/WTA country codes", () => {
  const testCases = [
    { code: "USA", expected: "🇺🇸" },
    { code: "ESP", expected: "🇪🇸" },
    { code: "GBR", expected: "🇬🇧" },
    { code: "FRA", expected: "🇫🇷" },
    { code: "ITA", expected: "🇮🇹" },
    { code: "GER", expected: "🇩🇪" },
    { code: "POL", expected: "🇵🇱" },
    { code: "CZE", expected: "🇨🇿" },
  ];

  for (const { code, expected } of testCases) {
    const flag = flagEmoji(code);
    assert.strictEqual(flag, expected, `${code} should map to ${expected}`);
  }
});
