import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Regression test for bug-atp-wta-isr-single-player
// Verifies that ATP/WTA live pages render full player lists in SSR HTML

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function checkSSRPlayerCount(tour) {
  // Check the pre-rendered HTML file from the build output
  const htmlPath = join(projectRoot, '.next/server/app', `${tour}-live.html`);
  const html = await readFile(htmlPath, 'utf-8');

  // Count occurrences of player data in SSR HTML
  // Players are rendered with class="font-semibold text-fg" for their names
  const playerNameMatches = html.match(/class="font-semibold text-fg"/g);
  const playerCount = playerNameMatches ? playerNameMatches.length : 0;

  return { tour, playerCount };
}

test('ATP live page renders at least 50 players in SSR HTML', async () => {
  const { playerCount } = await checkSSRPlayerCount('atp');
  assert.ok(
    playerCount >= 50,
    `ATP page should render at least 50 players in SSR, but got ${playerCount}`
  );
  console.log(`✓ ATP SSR renders ${playerCount} players`);
});

test('WTA live page renders at least 50 players in SSR HTML', async () => {
  const { playerCount } = await checkSSRPlayerCount('wta');
  assert.ok(
    playerCount >= 50,
    `WTA page should render at least 50 players in SSR, but got ${playerCount}`
  );
  console.log(`✓ WTA SSR renders ${playerCount} players`);
});
