/**
 * @file Regression test for /whats-new route redirect
 * @ticket whats-new-route-404
 *
 * Verifies that /whats-new redirects to /changelog (canonical URL).
 */

import { test } from 'node:test';
import assert from 'node:assert';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

test('/whats-new redirects to /changelog', async () => {
  const response = await fetch(`${BASE_URL}/whats-new`, {
    redirect: 'manual', // Don't auto-follow redirects
  });

  // Should be a 307 (Temporary Redirect) or 308 (Permanent Redirect)
  assert.ok(
    response.status === 307 || response.status === 308,
    `/whats-new should redirect (got ${response.status})`
  );

  const location = response.headers.get('location');
  assert.ok(
    location === '/changelog' || location?.endsWith('/changelog'),
    `/whats-new should redirect to /changelog (got ${location})`
  );
});

test('/changelog is accessible and returns 200', async () => {
  const response = await fetch(`${BASE_URL}/changelog`);

  assert.strictEqual(
    response.status,
    200,
    `/changelog should return 200 (got ${response.status})`
  );

  const html = await response.text();

  // Verify it's the changelog page
  assert.ok(
    html.includes("What's New") || html.includes("What&apos;s New"),
    "Changelog page should contain 'What's New' heading"
  );
});

test('/whats-new ultimately serves changelog content', async () => {
  // Follow redirects automatically (default behavior)
  const response = await fetch(`${BASE_URL}/whats-new`);

  assert.strictEqual(
    response.status,
    200,
    `/whats-new should ultimately serve content (got ${response.status})`
  );

  const html = await response.text();

  // Should end up at changelog content
  assert.ok(
    html.includes("What's New") || html.includes("What&apos;s New"),
    "Following /whats-new redirect should show changelog content"
  );
});
