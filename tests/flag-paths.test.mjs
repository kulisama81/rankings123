/**
 * Regression test for bug-flag-svg-404-emoji-paths
 *
 * Ensures flag paths use ISO country codes (e.g., "US", "DE") instead of emoji
 * Unicode (e.g., "%F0%9F%87%BA%F0%9F%87%B8" for 🇺🇸), preventing 404 errors.
 */

import { test } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Check if a string contains emoji characters (surrogate pairs in Unicode)
 * Flag emojis use regional indicator symbols (U+1F1E6 to U+1F1FF)
 */
function containsEmoji(str) {
  const emojiRegex = /[\uD83C][\uDDE6-\uDDFF]/;
  return emojiRegex.test(str);
}

/**
 * Check if a string is a valid ISO country code (2 or 3 letter uppercase)
 */
function isValidCountryCode(str) {
  return /^[A-Z]{2,3}$/.test(str);
}

test("giroFeed.ts uses ISO codes, not emoji flags", () => {
  const giroFeedPath = join(__dirname, "../src/lib/giroFeed.ts");
  const content = readFileSync(giroFeedPath, "utf-8");

  // Check that file doesn't contain emoji flag assignments
  const emojiInFlag = content.match(/flag:\s*["'][\uD83C][\uDDE6-\uDDFF]/);
  assert.ok(
    !emojiInFlag,
    `giroFeed.ts contains emoji in flag field: ${emojiInFlag ? emojiInFlag[0] : ""}`
  );

  // Check that flag assignments use ISO codes
  const flagAssignments = content.matchAll(/flag:\s*["']([A-Z]{2,3})["']/g);
  let count = 0;
  for (const match of flagAssignments) {
    count++;
    assert.ok(
      isValidCountryCode(match[1]),
      `Invalid flag code: ${match[1]}`
    );
  }

  assert.ok(count > 0, "giroFeed.ts should have flag assignments");
});

test("suisseFeed.ts uses ISO codes, not emoji flags", () => {
  const suisseFeedPath = join(__dirname, "../src/lib/suisseFeed.ts");
  const content = readFileSync(suisseFeedPath, "utf-8");

  // Check that file doesn't contain emoji flag assignments
  const emojiInFlag = content.match(/flag:\s*["'][\uD83C][\uDDE6-\uDDFF]/);
  assert.ok(
    !emojiInFlag,
    `suisseFeed.ts contains emoji in flag field: ${emojiInFlag ? emojiInFlag[0] : ""}`
  );

  // Check that flag assignments use ISO codes
  const flagAssignments = content.matchAll(/flag:\s*["']([A-Z]{2,3})["']/g);
  let count = 0;
  for (const match of flagAssignments) {
    count++;
    assert.ok(
      isValidCountryCode(match[1]),
      `Invalid flag code: ${match[1]}`
    );
  }

  assert.ok(count > 0, "suisseFeed.ts should have flag assignments");
});

test("raceFeed.ts doesn't use flagEmoji()", () => {
  const raceFeedPath = join(__dirname, "../src/lib/raceFeed.ts");
  const content = readFileSync(raceFeedPath, "utf-8");

  // Check that file doesn't import flagEmoji
  assert.ok(
    !content.includes("flagEmoji"),
    "raceFeed.ts should not use flagEmoji()"
  );

  // Check that flag assignments use the variable directly (not flagEmoji())
  assert.ok(
    !content.includes("flag: flagEmoji"),
    "raceFeed.ts should use flag: cc directly, not flag: flagEmoji(cc)"
  );
});

test("atpDeepRanking.ts doesn't use flagEmoji()", () => {
  const atpDeepRankingPath = join(__dirname, "../src/lib/atpDeepRanking.ts");
  const content = readFileSync(atpDeepRankingPath, "utf-8");

  // Check that file doesn't import flagEmoji
  assert.ok(
    !content.includes("flagEmoji"),
    "atpDeepRanking.ts should not use flagEmoji()"
  );

  // Check that flag assignments use the variable directly
  assert.ok(
    !content.includes("flag: flagEmoji"),
    "atpDeepRanking.ts should use flag: countryCode directly"
  );
});

test("atpLive.ts uses ISO codes, not emoji flags", () => {
  const atpLivePath = join(__dirname, "../src/data/atpLive.ts");
  const content = readFileSync(atpLivePath, "utf-8");

  // Check that file doesn't contain emoji flag assignments
  const emojiInFlag = content.match(/flag:\s*["'][\uD83C][\uDDE6-\uDDFF]/);
  assert.ok(
    !emojiInFlag,
    `atpLive.ts contains emoji in flag field: ${emojiInFlag ? emojiInFlag[0] : ""}`
  );

  // Check that flag assignments use ISO codes (same as countryCode)
  const flagAssignments = content.matchAll(/flag:\s*["']([A-Z]{2,3})["']/g);
  let count = 0;
  for (const match of flagAssignments) {
    count++;
    assert.ok(
      isValidCountryCode(match[1]),
      `Invalid flag code: ${match[1]}`
    );
  }

  assert.ok(count > 50, "atpLive.ts should have many flag assignments");
});

test("doublesFeed.ts flags Record uses ISO codes, not emoji flags", () => {
  const doublesFeedPath = join(__dirname, "../src/lib/doublesFeed.ts");
  const content = readFileSync(doublesFeedPath, "utf-8");

  // Check that the flags Record doesn't contain emoji values
  const flagsRecordMatch = content.match(/const flags:\s*Record<string,\s*string>\s*=\s*{([^}]+)}/s);
  if (flagsRecordMatch) {
    const flagsContent = flagsRecordMatch[1];
    assert.ok(
      !containsEmoji(flagsContent),
      "doublesFeed.ts flags Record should not contain emoji values"
    );
  }

  // Check that flag values in the Record use ISO codes
  const flagValueMatches = content.matchAll(/([A-Z]{2,3}):\s*["']([A-Z]{2,3})["']/g);
  let count = 0;
  for (const match of flagValueMatches) {
    count++;
    assert.ok(
      isValidCountryCode(match[2]),
      `Invalid flag value for ${match[1]}: ${match[2]}`
    );
  }

  assert.ok(count > 10, "doublesFeed.ts should have flag mappings");
});

test("Emoji-encoded URLs would result in 404 (validation)", () => {
  // Demonstrate that emoji-encoded paths don't work
  const emojiFlag = "🇺🇸";
  const encodedPath = `/flags/${encodeURIComponent(emojiFlag)}.svg`;

  // This would be: /flags/%F0%9F%87%BA%F0%9F%87%B8.svg (404)
  assert.ok(
    encodedPath.includes("%F0%9F"),
    "Emoji flag URLs are percent-encoded and won't match our SVG files"
  );

  // Correct ISO code approach
  const isoCode = "US";
  const correctPath = `/flags/${isoCode.toLowerCase()}.svg`;

  assert.strictEqual(correctPath, "/flags/us.svg", "ISO codes produce valid SVG paths");
  assert.ok(!correctPath.includes("%"), "ISO code paths don't need encoding");
});
