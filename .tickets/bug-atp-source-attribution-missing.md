---
id: bug-atp-source-attribution-missing
status: open
deps: []
links: []
created: 2026-08-12T18:00:00Z
type: bug
priority: 3
parent: rankings123
tags: [bug, atp, consistency, attribution]
---
# ATP Live page missing data source attribution (consistency bug)

## Bug Report

**URL:** https://rankings123.com/atp-live

**Severity:** P3 (Low) - Consistency issue, not user-facing breakage

**Inspection Date:** 2026-08-12

## Description

The ATP Live rankings page shows **no data source attribution** in the footer, while WTA Live and World Cup pages properly credit their sources:

- **ATP Live:** No attribution visible (only "© 2026 Rankings123")
- **WTA Live:** Shows "Data via ESPN" ✓
- **World Cup:** Shows "Standings & results via ESPN" ✓

This is a **consistency bug** where one page breaks the established pattern of crediting data sources.

## Reproduction Steps

1. Visit https://rankings123.com/atp-live
2. Scroll to table footer or page footer
3. **Expected:** "Data via ESPN" or "Data via UTS + ESPN" attribution
4. **Actual:** No source attribution, only copyright notice

5. Compare to https://rankings123.com/wta-live → shows "Data via ESPN" ✓
6. Compare to https://rankings123.com/world-cup → shows "Standings & results via ESPN" ✓

## Impact

- Inconsistent user experience across pages
- Missing credit to data providers (ESPN/UTS)
- Could look like we're claiming original data when we're aggregating

## Expected Behavior

ATP page should show attribution matching its data source (e.g., "Data via ESPN & UTS" or "Data via ESPN" depending on the source flag).

## Acceptance Criteria

1. **Add source attribution to ATP Live page:**
   - Display "Data via ESPN" or "Data via UTS + ESPN" in the footer (below table or in page footer)
   - Attribution should reflect the actual source flag (check `src/lib/atpDeepFeed.ts` for source logic)
   - Match the placement/styling used on WTA Live page for consistency

2. **REGRESSION TEST REQUIRED:**
   - Add test in `tests/atp-source-attribution.test.mjs` (run via `npm test`):
     - Fetch ATP Live page HTML
     - Assert page contains "Data via" or "Source:" text
     - Verify attribution mentions ESPN or UTS (the actual data sources)
     - Test should FAIL on current page (no attribution), PASS when added
   - OR extend existing test to verify all sport pages have source attribution

3. **Verify locally:**
   - Visit http://localhost:3000/atp-live
   - See source attribution in footer (e.g., "Data via ESPN & UTS")
   - Compare to /wta-live for consistency (same placement/style)
   - `npm test` — all tests green

4. **Standard checks:**
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean

5. **Live verification:**
   - Visit https://rankings123.com/atp-live
   - Confirm source attribution visible in footer
   - Check consistency: ATP, WTA, World Cup all show attributions in similar style
