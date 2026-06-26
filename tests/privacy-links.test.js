/**
 * Privacy policy external links validation
 * Ensures all external links have proper protocols
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

test('Privacy policy Google Analytics opt-out link includes https:// protocol', async () => {
  const privacyPath = join(process.cwd(), 'src/app/privacy/page.tsx');
  const content = await readFile(privacyPath, 'utf-8');

  // Find the Google Analytics opt-out link text
  // Look for the link text between <a> tags that points to gaoptout
  const gaoptoutLinkMatch = content.match(
    /<a[^>]*href="https:\/\/tools\.google\.com\/dlpage\/gaoptout"[^>]*>\s*([^<]+)\s*<\/a>/
  );

  assert.ok(
    gaoptoutLinkMatch,
    'Could not find Google Analytics opt-out link in privacy policy'
  );

  const linkText = gaoptoutLinkMatch[1].trim();

  // Verify the link text includes the https:// protocol
  assert.ok(
    linkText.startsWith('https://'),
    `Google Analytics opt-out link text missing protocol. Found: "${linkText}", expected it to start with "https://"`
  );

  // Verify it's the correct full URL
  assert.strictEqual(
    linkText,
    'https://tools.google.com/dlpage/gaoptout',
    'Google Analytics opt-out link text should be the full URL with protocol'
  );
});

test('Privacy policy all external links have proper protocols', async () => {
  const privacyPath = join(process.cwd(), 'src/app/privacy/page.tsx');
  const content = await readFile(privacyPath, 'utf-8');

  // Extract all external links (http:// or https://)
  const externalLinkMatches = content.matchAll(
    /<a[^>]*href="(https?:\/\/[^"]+)"[^>]*>\s*([^<]+)\s*<\/a>/g
  );

  const linksWithText = Array.from(externalLinkMatches, match => ({
    href: match[1],
    text: match[2].trim(),
  }));

  // Filter to links where the text looks like a URL (contains a dot and a domain)
  const urlLikeTexts = linksWithText.filter(link =>
    link.text.includes('.') && !link.text.includes('@') // exclude email addresses
  );

  // For each URL-like link text, verify it includes a protocol
  for (const link of urlLikeTexts) {
    assert.ok(
      link.text.startsWith('http://') || link.text.startsWith('https://'),
      `External link text "${link.text}" should include protocol (href: ${link.href})`
    );
  }

  // Verify we found at least one external link
  assert.ok(
    urlLikeTexts.length > 0,
    'Expected to find at least one external link with URL-like text in privacy policy'
  );
});
