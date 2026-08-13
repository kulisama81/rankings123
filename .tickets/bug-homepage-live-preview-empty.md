---
id: bug-homepage-live-preview-empty
status: open
deps: []
links: []
created: 2026-08-12T18:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, homepage, ui, regression]
---
# Homepage live rankings preview shows no data (empty section)

## Bug Report

**URL:** https://rankings123.com/

**Severity:** P2 (Medium) - Feature shipped but not rendering data, affects bounce rate goal

**Inspection Date:** 2026-08-12

## Description

The homepage "Live Rankings Preview" section (added in commit b101e52 "Add homepage live rankings preview to reduce bounce rate") displays only section headers and navigation links, but **no actual ranking data**. Users see categories like "Men's live rankings" and "Women's live rankings" with arrows, but no player names, ranks, points, or scores.

The section functions as a directory/navigation element rather than a data preview, defeating its stated purpose of reducing bounce rate by showing preview data upfront.

## Reproduction Steps

1. Visit https://rankings123.com/
2. Scroll to "Live Rankings Preview" section
3. Observe: only headers ("Men's live rankings", "Women's live rankings") and CTAs ("Watch Live →", "Full women's rankings →")
4. **Expected:** Preview data showing top 3-5 players with ranks and live points
5. **Actual:** No data displayed, just navigational elements

## Impact

- Feature incomplete: shipped without the core value (data preview)
- Bounce rate goal unmet: users must still click through to see any data
- False advertising: section title promises "preview" but shows nothing to preview

## Root Cause

The component likely renders the section structure but doesn't fetch/display the actual ranking data (top N players from ATP/WTA live feeds).

## Acceptance Criteria

1. **Populate the Live Rankings Preview with actual data:**
   - Show top 3-5 ATP players with: rank, name, live points, Δ change
   - Show top 3-5 WTA players with: rank, name, live points, Δ change
   - Data sourced from same feeds as /atp-live and /wta-live pages
   - If live feeds unavailable, degrade gracefully (show official top 5 or hide section)
   
2. **Visual design:**
   - Compact table or card layout showing key data at a glance
   - "View full rankings →" CTA below each sport's preview
   - Match existing table styling from ATP/WTA pages

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/homepage-live-preview.test.mjs` (run via `npm test`):
     - Fetch homepage HTML
     - Verify Live Rankings Preview section contains player names (not just headers)
     - Assert at least 3 player names visible in ATP preview
     - Assert at least 3 player names visible in WTA preview
     - Test should FAIL on current empty section, PASS when populated
   - OR extend `scripts/check-core-features.mjs`:
     - Add homepage live preview to protected features
     - Verify section renders with player data (names/ranks visible)

4. **Verify locally:**
   - Visit http://localhost:3000/
   - See actual player data in Live Rankings Preview (names, ranks, points)
   - Data updates on page refresh matching live feeds
   - `npm test` — all tests green including new regression test

5. **Standard checks:**
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — passes

6. **Live verification after deploy:**
   - Visit https://rankings123.com/
   - Confirm Live Rankings Preview shows real player data (not empty)
   - Data matches /atp-live and /wta-live pages (top players consistent)
   - Regression test passes in production
