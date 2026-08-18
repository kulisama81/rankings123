/**
 * Regression test for bug-betting-guide-no-links
 *
 * Ensures betting content is never publicly accessible without real affiliate links.
 * Per CX-first principle: "never ship placeholder, 'coming soon', empty, or fabricated UI to users"
 *
 * @see .tickets/bug-betting-guide-no-links.md
 */

import { describe, it, before } from "node:test";
import assert from "node:assert";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const BETTING_AFFILIATES_LIVE =
  process.env.BETTING_AFFILIATES_LIVE === "true";

// Known betting partner domains (update when affiliates are integrated)
const AFFILIATE_DOMAINS = [
  "fanduel.com",
  "draftkings.com",
  "bet365.com",
  "betmgm.com",
  "caesars.com",
];

/**
 * Routes that contain betting content
 * These MUST either:
 * 1. Return 404 when BETTING_AFFILIATES_LIVE !== 'true'
 * 2. Include affiliate links when public (200 status)
 */
const BETTING_CONTENT_ROUTES = [
  "/articles/cincinnati-open-2026-betting-guide",
  "/articles/us-open-2026-betting-favorites",
];

describe("Betting content gate", () => {
  it("should block betting pages when affiliates not live", async () => {
    if (BETTING_AFFILIATES_LIVE) {
      // When affiliates are live, this test becomes "verify affiliate links present"
      // Skip the gate check
      return;
    }

    for (const route of BETTING_CONTENT_ROUTES) {
      const url = `${BASE_URL}${route}`;
      const response = await fetch(url);

      // Should return 404 when BETTING_AFFILIATES_LIVE !== 'true'
      assert.strictEqual(
        response.status,
        404,
        `${route} should return 404 when BETTING_AFFILIATES_LIVE !== 'true', got ${response.status}`,
      );
    }
  });

  it("should include affiliate links when betting pages are public", async () => {
    if (!BETTING_AFFILIATES_LIVE) {
      // Pages are gated, skip affiliate link check
      return;
    }

    for (const route of BETTING_CONTENT_ROUTES) {
      const url = `${BASE_URL}${route}`;
      const response = await fetch(url);

      // Page is public
      if (response.status === 200) {
        const html = await response.text();

        // Check for affiliate links
        const hasAffiliateLinks = AFFILIATE_DOMAINS.some((domain) =>
          html.includes(`href="https://${domain}`),
        );

        assert.ok(
          hasAffiliateLinks,
          `${route} is public (200) but contains NO affiliate links. ` +
            `Per CX-first: betting content must not ship without real affiliate links. ` +
            `Either add affiliate links or gate the page with BETTING_AFFILIATES_LIVE check.`,
        );
      }
    }
  });
});
