/**
 * Regression test for cycling stage URL consistency across all Grand Tours.
 *
 * Ensures that stage links on each race page correctly point to that race's
 * stage routes (not hardcoded to TDF or mixed up between races).
 *
 * Bug: https://github.com/kulisama81/rankings123/issues/bug-vuelta-stage-urls-wrong-event
 */

import { test } from 'node:test';
import assert from 'node:assert';

const RACES = [
  { id: 'tour-de-france-2026', name: 'Tour de France' },
  { id: 'vuelta-2026', name: 'Vuelta a España' },
  { id: 'giro-2026', name: 'Giro d\'Italia' },
];

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

for (const race of RACES) {
  test(`${race.name} stage links point to correct race`, async () => {
    const url = `${BASE_URL}/cycling/${race.id}`;
    const response = await fetch(url);
    assert.strictEqual(response.status, 200, `${race.name} page should return 200`);

    const html = await response.text();

    // Extract all stage link hrefs
    const stageLinks = html.match(/href="[^"]*stage[^"]*"/g) || [];

    assert.ok(stageLinks.length > 0, `${race.name} page should have stage links`);

    // Check that ALL stage links point to the correct race
    const expectedPattern = `/events/${race.id}/stage/`;

    for (const link of stageLinks) {
      assert.ok(
        link.includes(expectedPattern),
        `${race.name} stage link ${link} should contain ${expectedPattern}`
      );
    }

    // Ensure NO stage links point to wrong races
    const wrongRaces = RACES.filter(r => r.id !== race.id);
    for (const wrongRace of wrongRaces) {
      for (const link of stageLinks) {
        assert.ok(
          !link.includes(`/events/${wrongRace.id}/stage/`),
          `${race.name} should not have stage links to ${wrongRace.name}: found ${link}`
        );
      }
    }
  });
}
