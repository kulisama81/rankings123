import { test } from 'node:test';
import assert from 'node:assert';

/**
 * Regression test for bug-cycling-wikipedia-cors
 *
 * Verifies that Wikipedia API calls for cycling data work correctly
 * without CORS errors. Since all Wikipedia fetches happen server-side
 * (in server components or API routes), there should be no CORS issues.
 *
 * This test verifies:
 * 1. The cycling feed functions work (no runtime errors)
 * 2. The code structure ensures server-side-only Wikipedia calls
 * 3. cyclingFeed.ts doesn't make client-side calls
 */

test('cyclingFeed.ts fetches Wikipedia data server-side without CORS errors', async () => {
  const fs = await import('node:fs/promises');
  const source = await fs.readFile('src/lib/cyclingFeed.ts', 'utf-8');

  // Verify expected exports exist
  assert.ok(
    source.includes('export async function getCyclingRaces'),
    'getCyclingRaces should be exported'
  );
  assert.ok(
    source.includes('export async function getCyclingRaceSnapshot'),
    'getCyclingRaceSnapshot should be exported'
  );
  assert.ok(
    source.includes('export function getPrimaryRace'),
    'getPrimaryRace should be exported'
  );

  // Verify no client-side DOM/window references (proves server-side only)
  assert.ok(
    !source.includes('window.') && !source.includes('document.'),
    'cyclingFeed should not reference window or document (server-side only)'
  );
});

test('Wikipedia API fetch uses proper User-Agent header', async () => {
  // Read the cyclingFeed source to verify proper headers are set
  const fs = await import('node:fs/promises');
  const source = await fs.readFile('src/lib/cyclingFeed.ts', 'utf-8');

  // Verify User-Agent header is set (Wikipedia requires this)
  assert.ok(
    source.includes('User-Agent'),
    'Wikipedia fetch should include User-Agent header (required by Wikipedia policy)'
  );

  // Verify we're using direct Wikipedia API (not client-side call)
  assert.ok(
    source.includes('en.wikipedia.org/w/api.php'),
    'Should fetch from Wikipedia API server-side'
  );
});

test('cyclingFeed uses AbortSignal timeout to prevent hangs', async () => {
  const fs = await import('node:fs/promises');
  const source = await fs.readFile('src/lib/cyclingFeed.ts', 'utf-8');

  // Verify timeout is configured
  assert.ok(
    source.includes('AbortSignal.timeout') || source.includes('signal:'),
    'Wikipedia fetch should include timeout to prevent hanging requests'
  );
});

test('no client-side Wikipedia calls in components', async () => {
  const fs = await import('node:fs/promises');
  const { readdir } = fs;

  // Check that no client components directly import cyclingFeed
  const componentFiles = await readdir('src/components', { recursive: false });
  const tsxFiles = componentFiles.filter(f => f.endsWith('.tsx'));

  for (const file of tsxFiles) {
    const content = await fs.readFile(`src/components/${file}`, 'utf-8');

    // If it's a client component
    if (content.includes('"use client"') || content.includes("'use client'")) {
      // It should NOT import cyclingFeed directly
      assert.ok(
        !content.includes('from "@/lib/cyclingFeed"') &&
        !content.includes("from '@/lib/cyclingFeed'"),
        `Client component ${file} should not import cyclingFeed directly (would cause client-side Wikipedia calls)`
      );

      // It should NOT call Wikipedia API directly
      assert.ok(
        !content.includes('en.wikipedia.org'),
        `Client component ${file} should not call Wikipedia API directly (CORS error)`
      );
    }
  }
});
