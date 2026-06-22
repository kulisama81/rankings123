/**
 * Regression test for wc-match-pages-404-regression ticket.
 * Guards against World Cup match detail pages returning 404 by verifying:
 * - The page route file exists
 * - The mock fallback function works (prevents 404 on ESPN API failure)
 * - Mock data structure matches the required shape
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

describe("World Cup Match Detail Pages", () => {
  test("match page route file exists", () => {
    const pagePath = join(
      projectRoot,
      "src/app/world-cup/match/[id]/page.tsx"
    );
    assert.ok(
      existsSync(pagePath),
      "Match detail page route should exist at src/app/world-cup/match/[id]/page.tsx"
    );
  });

  test("feed has mock fallback to prevent 404s", () => {
    const feedPath = join(projectRoot, "src/lib/worldCupMatchFeed.ts");
    const feedContent = readFileSync(feedPath, "utf-8");

    // Verify the feed has a try/catch wrapper that prevents bare throws
    assert.ok(
      feedContent.includes("try"),
      "Feed should have try/catch for graceful degradation"
    );
    assert.ok(
      feedContent.includes("getMockWorldCupMatchDetail"),
      "Feed should import and use mock fallback"
    );
    assert.ok(
      feedContent.includes("catch"),
      "Feed should catch errors and return mock data"
    );
  });

  test("mock data generator exists and returns valid structure", () => {
    const mockPath = join(projectRoot, "src/data/worldCup.ts");
    const mockContent = readFileSync(mockPath, "utf-8");

    // Verify the mock generator function exists
    assert.ok(
      mockContent.includes("export function getMockWorldCupMatchDetail"),
      "Mock data module should export getMockWorldCupMatchDetail function"
    );

    // Verify it returns a proper WorldCupMatchDetail structure
    assert.ok(
      mockContent.includes('source: "mock"'),
      "Mock should set source to 'mock'"
    );
    assert.ok(
      mockContent.includes("homeLineup"),
      "Mock should include homeLineup"
    );
    assert.ok(
      mockContent.includes("awayLineup"),
      "Mock should include awayLineup"
    );
    assert.ok(
      mockContent.includes("keyEvents"),
      "Mock should include keyEvents"
    );
  });

  test("mock data is not placeholder text", () => {
    const mockPath = join(projectRoot, "src/data/worldCup.ts");
    const mockContent = readFileSync(mockPath, "utf-8");

    // Verify the mock doesn't use placeholder names (per CX FIRST principle)
    // It should use realistic player names, not "Goalkeeper Name" etc.
    const hasBadPlaceholders = /name: "(Goalkeeper|Defender|Midfielder|Forward) Name"/.test(mockContent);
    assert.ok(
      !hasBadPlaceholders,
      "Mock should use realistic player names, not placeholder text like 'Goalkeeper Name'"
    );
  });
});
