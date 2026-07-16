/**
 * Regression test for suspense-fallback-bug
 *
 * Guards against the Suspense fallback "Loading table..." text persisting
 * after the ranking table has loaded. This was a UX bug where the fallback
 * text appeared alongside fully-loaded content on ATP/WTA Live pages.
 *
 * @see https://rankings123.com/atp-live
 * @see https://rankings123.com/wta-live
 * @see .tickets/suspense-fallback-bug.md
 */

import { test } from "node:test";
import assert from "node:assert/strict";

/**
 * Optional runtime test - only runs if dev server is available on localhost:3000.
 * Verifies the SSR HTML output doesn't contain the problematic fallback text.
 * Primary protection is the source code check below; this is supplementary verification.
 */
test("ATP/WTA Live pages: no 'Loading table...' text in SSR output (runtime)", async () => {
  try {
    // Fetch SSR HTML from both ATP and WTA Live pages
    const atpResponse = await fetch("http://localhost:3000/atp-live");
    const wtaResponse = await fetch("http://localhost:3000/wta-live");

    assert.ok(atpResponse.ok, "ATP Live page should load successfully");
    assert.ok(wtaResponse.ok, "WTA Live page should load successfully");

    const atpHtml = await atpResponse.text();
    const wtaHtml = await wtaResponse.text();

    // CRITICAL: "Loading table..." must NOT appear in the HTML
    assert.ok(
      !atpHtml.includes("Loading table..."),
      'ATP Live page must not contain "Loading table..." text in SSR output'
    );
    assert.ok(
      !wtaHtml.includes("Loading table..."),
      'WTA Live page must not contain "Loading table..." text in SSR output'
    );

    // Verify the ranking table actually renders with data (not just empty)
    // Look for key table elements that indicate the table loaded properly
    assert.ok(
      atpHtml.includes("Live Pts") || atpHtml.includes("Live Points"),
      "ATP Live page should render ranking table with points column"
    );
    assert.ok(
      wtaHtml.includes("Live Pts") || wtaHtml.includes("Live Points"),
      "WTA Live page should render ranking table with points column"
    );

    // Verify at least one player name appears (indicates data loaded, not empty fallback)
    assert.ok(
      atpHtml.includes("Sinner") || atpHtml.includes("Djokovic") || atpHtml.includes("Alcaraz"),
      "ATP Live page should render at least one player name (top players)"
    );
    assert.ok(
      wtaHtml.includes("Sabalenka") || wtaHtml.includes("Swiatek") || wtaHtml.includes("Gauff"),
      "WTA Live page should render at least one player name (top players)"
    );
  } catch (error) {
    if (error.cause?.code === "ECONNREFUSED") {
      // Dev server not running - skip this test (source code tests below are primary protection)
      console.log("  ℹ Skipping runtime fetch test - dev server not running on localhost:3000");
      return;
    }
    throw error;
  }
});

/**
 * Verify no Suspense boundary with fallback text exists in LiveRankingView component source
 */
test("LiveRankingView component: no Suspense fallback with 'Loading table...' text", async () => {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const componentPath = path.join(
    process.cwd(),
    "src/components/LiveRankingView.tsx"
  );
  const componentSource = await fs.readFile(componentPath, "utf-8");

  // This is the exact pattern that caused the bug:
  // <Suspense fallback={<div className="...">Loading table...</div>}>
  const suspenseWithLoadingPattern =
    /Suspense\s+fallback={[^}]*Loading table[^}]*}/i;

  assert.ok(
    !suspenseWithLoadingPattern.test(componentSource),
    "LiveRankingView.tsx must not contain Suspense with 'Loading table...' fallback"
  );
});

/**
 * LiveRankingView must render both StaticRankingTable (SSR) and LiveRankingTable (client)
 * to maintain SEO + interactivity without showing loading fallbacks.
 */
test("LiveRankingView component: renders both SSR and client tables", async () => {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const componentPath = path.join(
    process.cwd(),
    "src/components/LiveRankingView.tsx"
  );
  const componentSource = await fs.readFile(componentPath, "utf-8");

  // Verify SSR table is rendered
  assert.ok(
    componentSource.includes("StaticRankingTable"),
    "LiveRankingView must render StaticRankingTable for SSR/SEO"
  );

  // Verify client table is rendered
  assert.ok(
    componentSource.includes("LiveRankingTable"),
    "LiveRankingView must render LiveRankingTable for client interactivity"
  );

  // Verify the SSR table has the data-ssr-fallback attribute
  // (used by LiveRankingTable to hide it on hydration)
  assert.ok(
    componentSource.includes("data-ssr-fallback"),
    "StaticRankingTable must have data-ssr-fallback attribute for proper hydration"
  );
});
