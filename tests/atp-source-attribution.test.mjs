/**
 * Regression test for bug-atp-source-attribution-missing
 *
 * ATP Live page must display data source attribution (UTS, ESPN, or UTS & ESPN)
 * to credit data providers and maintain consistency with WTA/World Cup pages.
 *
 * FIX: LiveRankingTable.tsx now handles all source types: "espn", "uts", "uts+espn"
 *
 * VERIFICATION:
 * - Visit https://rankings123.com/atp-live
 * - Look for "Data via UTS" or "Data via UTS & ESPN" in the footer text
 * - Should match the actual data source (not show for mock fallback)
 */

import { describe, test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

describe('ATP Live: Source attribution regression guard', () => {
  test('LiveRankingTable handles all source types', () => {
    const tablePath = join(ROOT, 'src/components/LiveRankingTable.tsx');
    const tableCode = readFileSync(tablePath, 'utf8');

    // Verify all source types are handled (espn, uts, uts+espn)
    assert.ok(
      tableCode.includes('snapshot.source === "espn"'),
      'Missing ESPN attribution check'
    );
    assert.ok(
      tableCode.includes('snapshot.source === "uts"'),
      'Missing UTS attribution check'
    );
    assert.ok(
      tableCode.includes('snapshot.source === "uts+espn"'),
      'Missing UTS+ESPN attribution check'
    );

    // Verify attribution text credits sources
    assert.ok(
      tableCode.includes('Data via ESPN'),
      'Missing ESPN attribution text'
    );
    assert.ok(
      tableCode.includes('Data via UTS'),
      'Missing UTS attribution text'
    );
    assert.ok(
      tableCode.includes('Data via UTS & ESPN'),
      'Missing UTS+ESPN attribution text'
    );
  });
});
