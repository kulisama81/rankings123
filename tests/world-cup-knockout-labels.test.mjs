/**
 * Regression test for wc-knockout-placeholder-text bug
 *
 * Ensures that the World Cup knockout bracket never shows technical placeholder
 * text like "Winner M74" to users. All labels must be user-friendly.
 *
 * This test would FAIL on commit ed53384 (before fix) and PASS after the fix.
 */

import { test } from "node:test";
import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

test("knockout bracket feed must not contain technical 'Winner M##' placeholder patterns", async () => {
  const feedPath = join(projectRoot, "src/lib/worldCupBracketFeed.ts");
  const content = await readFile(feedPath, "utf-8");

  // The bug pattern: "Winner M74", "Winner M89", "Winner M97", "Winner M101", "Winner M102"
  // These are ESPN internal match IDs that should never be shown to users
  const technicalPlaceholderPattern = /Winner M\d+/g;
  const matches = content.match(technicalPlaceholderPattern);

  assert.strictEqual(
    matches,
    null,
    `Found technical placeholder pattern(s) in worldCupBracketFeed.ts that violate CX-first principle:\n` +
    (matches ? `  - ${matches.join('\n  - ')}` : '') +
    '\n\nAll labels must be user-friendly (e.g., "Winner of R32 Match 1", "TBD", "Winner QF 1"). ' +
    'Remove any "Winner M##" patterns from homeSeedLabel and awaySeedLabel assignments.'
  );
});

test("knockout bracket R16 labels should use user-friendly format", async () => {
  const feedPath = join(projectRoot, "src/lib/worldCupBracketFeed.ts");
  const content = await readFile(feedPath, "utf-8");

  // For R16 matches, should use "Winner of R32 Match" format or TBD
  // Look for the R16 projection section
  const r16Section = content.substring(
    content.indexOf('// R16: 8 matches'),
    content.indexOf('// QF: 4 matches')
  );

  // Should NOT contain the old technical format
  assert.ok(
    !r16Section.includes('Winner M${73'),
    'R16 section should not use technical "Winner M${73 + ..." format'
  );

  // Should use user-friendly format or undefined
  const hasUserFriendlyFormat =
    r16Section.includes('Winner of R32 Match') ||
    r16Section.includes('homeSeedLabel: undefined') ||
    r16Section.includes('homeSeedLabel: sourceIndices[0] !== undefined ? `Winner of R32 Match');

  assert.ok(
    hasUserFriendlyFormat,
    'R16 section should use user-friendly label format like "Winner of R32 Match ${index + 1}" or set to undefined'
  );
});

test("knockout bracket QF/SF/Final labels should not expose technical IDs", async () => {
  const feedPath = join(projectRoot, "src/lib/worldCupBracketFeed.ts");
  const content = await readFile(feedPath, "utf-8");

  // Check QF section (should not have Winner M89+)
  const qfSection = content.substring(
    content.indexOf('// QF: 4 matches'),
    content.indexOf('// SF: 2 matches')
  );

  assert.ok(
    !qfSection.includes('Winner M${89'),
    'Quarterfinals section should not use technical "Winner M${89 + ..." format'
  );

  // Check SF section (should not have Winner M97+)
  const sfSection = content.substring(
    content.indexOf('// SF: 2 matches'),
    content.indexOf('// Final match')
  );

  assert.ok(
    !sfSection.includes('Winner M${97'),
    'Semifinals section should not use technical "Winner M${97 + ..." format'
  );

  // Check Final (should not have Winner M101/M102)
  const finalSection = content.substring(
    content.indexOf('// Final match'),
    content.indexOf('return { r16: r16Matches')
  );

  assert.ok(
    !finalSection.includes('"Winner M101"') && !finalSection.includes('"Winner M102"'),
    'Final match should not use technical "Winner M101" or "Winner M102" labels'
  );
});
