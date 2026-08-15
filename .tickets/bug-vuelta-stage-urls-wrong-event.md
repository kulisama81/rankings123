---
id: bug-vuelta-stage-urls-wrong-event
status: closed
created: 2026-08-15T18:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, cycling, vuelta, routing, p2]
---
# Vuelta 2026 page stage links point to TDF URLs (404)

## Acceptance Criteria

1. **Fix stage URL routing on Vuelta 2026 page:**
   - All stage links on `/cycling/vuelta-2026` must point to `/events/vuelta-2026/stage/X` (not `/events/tdf-2026/stage/X`)
   - Verify all 21 stage links use correct event slug (`vuelta-2026`)
   - Stage routes either exist and work, or gracefully 404 with proper error page (not showing TDF content)

2. **Check other cycling races for same issue:**
   - Verify Giro d'Italia stage links (if present) point to Giro routes, not TDF
   - Verify TDF stage links still work correctly (not broken by the fix)
   - Check any other cycling events in CYCLING_RACES for URL consistency

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/cycling-stage-urls.test.mjs` (run via `npm test`):
     - Fetch `/cycling/vuelta-2026` HTML
     - Extract all stage link hrefs
     - Assert every stage link matches pattern `/events/vuelta-2026/stage/\d+`
     - Assert NO stage links contain `tdf-2026` or other wrong event slugs
     - Test should FAIL on current broken state, PASS when fixed
   - OR extend existing cycling test to validate stage URL consistency

4. **Verify locally:**
   - Visit http://localhost:3000/cycling/vuelta-2026
   - Inspect stage links in DevTools (should show `/events/vuelta-2026/stage/X`)
   - Click a stage link
   - Either see Vuelta stage details OR proper 404 page (not TDF content)
   - `npm test` — all tests green including new regression test

5. **Standard checks:**
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — passes
   - `npm run check:core-features` — passes

6. **Live verification after deploy:**
   - Visit https://rankings123.com/cycling/vuelta-2026
   - Inspect stage link hrefs (all show `/events/vuelta-2026/stage/X`)
   - Click stage 1 link — goes to Vuelta stage 1 (or 404, not TDF)
   - Verify TDF page still works: https://rankings123.com/cycling/tdf-2026 (stage links → TDF routes)
   - Regression test passes when run against production

## Bug Report

**URL:** https://rankings123.com/cycling/vuelta-2026

**Severity:** P2 (Medium) - Navigation broken, users clicking stage links get wrong content or 404s

**Inspection Date:** 2026-08-15

## Description

The Vuelta a España 2026 standings page displays 21 stages with clickable links, but **all stage links incorrectly point to Tour de France (TDF) stage URLs** instead of Vuelta stage URLs.

**Expected:** Stage 1 link → `/events/vuelta-2026/stage/1`
**Actual:** Stage 1 link → `/events/tdf-2026/stage/1`

This causes users clicking on Vuelta stages to either:
1. See Tour de France stage details (wrong race), or
2. Get 404 errors if Vuelta stage routes exist but aren't being linked

## Reproduction Steps

1. Visit https://rankings123.com/cycling/vuelta-2026
2. Scroll to the stages table (21 stages listed)
3. Hover over any stage link (e.g., "Stage 1", "Stage 2")
4. **Expected:** Link href = `/events/vuelta-2026/stage/1`
5. **Actual:** Link href = `/events/tdf-2026/stage/1`
6. Click the link
7. **Result:** Either shows TDF stage data (wrong race) or 404 if Vuelta routes don't exist

## Evidence

```bash
# Vuelta page contains TDF stage URLs
$ curl -s https://rankings123.com/cycling/vuelta-2026 | grep -o 'href="[^"]*stage[^"]*"' | head -5
href="/events/tdf-2026/stage/1"
href="/events/tdf-2026/stage/2"
href="/events/tdf-2026/stage/3"
href="/events/tdf-2026/stage/4"
href="/events/tdf-2026/stage/5"

# TDF URLs work (wrong race):
$ curl -s -o /dev/null -w "%{http_code}" https://rankings123.com/events/tdf-2026/stage/1
200

# Correct Vuelta URLs don't exist:
$ curl -s -o /dev/null -w "%{http_code}" https://rankings123.com/events/vuelta-2026/stage/1
404
```

## Impact

- **Navigation broken:** Users clicking Vuelta stages see wrong race data or 404
- **UX confusion:** Vuelta page links to TDF content
- **SEO issue:** Internal links point to wrong events
- **Tournament urgency:** Vuelta starts Aug 22 (7 days) — this needs to work before race begins

## Root Cause

Likely a hardcoded or copy-paste error in the Vuelta page component where stage links use `tdf-2026` instead of `vuelta-2026` in the URL template.
