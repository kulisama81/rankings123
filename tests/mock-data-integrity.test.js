/**
 * Mock data integrity tests
 * Ensures fallback/mock data follows real-world constraints
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Extract jersey numbers from a lineup block in the source code
 */
function extractJerseyNumbers(lineupText) {
  const jerseyMatches = lineupText.matchAll(/jersey:\s*"(\d+)"/g);
  return Array.from(jerseyMatches, match => match[1]);
}

test('World Cup mock match data has unique jersey numbers in Türkiye (away) lineup', async () => {
  const worldCupTsPath = join(process.cwd(), 'src/data/worldCup.ts');
  const content = await readFile(worldCupTsPath, 'utf-8');

  // Extract the awayLineup array from getMockWorldCupMatchDetail
  // Look for awayLineup: [ ... ], pattern
  const awayLineupMatch = content.match(/awayLineup:\s*\[([\s\S]*?)\],\s*keyEvents/);

  if (!awayLineupMatch) {
    throw new Error('Could not find awayLineup in mock data');
  }

  const lineupText = awayLineupMatch[1];
  const jerseyNumbers = extractJerseyNumbers(lineupText);

  // Check for duplicates in the jersey numbers
  const uniqueJerseys = new Set(jerseyNumbers);

  assert.strictEqual(
    jerseyNumbers.length,
    uniqueJerseys.size,
    `Türkiye (away) lineup has duplicate jersey numbers: ${JSON.stringify(jerseyNumbers)}`
  );

  // Verify we found a reasonable number of jerseys (11 players)
  assert.strictEqual(
    jerseyNumbers.length,
    11,
    `Expected 11 players in Türkiye lineup, found ${jerseyNumbers.length}`
  );
});

test('World Cup mock match data has unique jersey numbers in home lineup', async () => {
  const worldCupTsPath = join(process.cwd(), 'src/data/worldCup.ts');
  const content = await readFile(worldCupTsPath, 'utf-8');

  // Extract the homeLineup array from getMockWorldCupMatchDetail
  // Look for homeLineup: [ ... ], pattern before awayLineup
  const homeLineupMatch = content.match(/homeLineup:\s*\[([\s\S]*?)\],\s*awayLineup/);

  if (!homeLineupMatch) {
    throw new Error('Could not find homeLineup in mock data');
  }

  const lineupText = homeLineupMatch[1];
  const jerseyNumbers = extractJerseyNumbers(lineupText);

  // Check for duplicates
  const uniqueJerseys = new Set(jerseyNumbers);

  assert.strictEqual(
    jerseyNumbers.length,
    uniqueJerseys.size,
    `Home lineup has duplicate jersey numbers: ${JSON.stringify(jerseyNumbers)}`
  );

  // Verify we found 11 players
  assert.strictEqual(
    jerseyNumbers.length,
    11,
    `Expected 11 players in home lineup, found ${jerseyNumbers.length}`
  );
});
