/**
 * Regression test for bug-wta-indonesia-flag-white
 * Ensures Indonesian players display Indonesian flag 🇮🇩 not white flag 🏳️
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { flagEmoji, IOC_TO_ISO2 } from "../src/lib/flags.ts";

test("Indonesia IOC code INA maps to ISO code ID", () => {
  const iso2 = IOC_TO_ISO2["INA"];
  assert.ok(iso2, "INA should have a mapping in IOC_TO_ISO2");
  assert.strictEqual(iso2, "ID", "INA should map to ID (Indonesia ISO code)");
});

test("flagEmoji renders Indonesian flag for INA code", () => {
  const flag = flagEmoji("INA");
  // Indonesian flag emoji is 🇮🇩 (U+1F1EE U+1F1E9)
  const expectedFlag = "🇮🇩";
  assert.notStrictEqual(flag, "🏳️", "INA should not render white flag");
  assert.strictEqual(flag, expectedFlag, "INA should render Indonesian flag 🇮🇩");
});

test("flagEmoji handles case-insensitive INA code", () => {
  const upperFlag = flagEmoji("INA");
  const lowerFlag = flagEmoji("ina");
  const mixedFlag = flagEmoji("Ina");

  assert.strictEqual(upperFlag, "🇮🇩", "uppercase INA should work");
  assert.strictEqual(lowerFlag, "🇮🇩", "lowercase ina should work");
  assert.strictEqual(mixedFlag, "🇮🇩", "mixed case Ina should work");
});
