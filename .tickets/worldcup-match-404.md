---
id: worldcup-match-404
status: closed
deps: []
links: []
created: 2026-07-06T18:00:00Z
type: bug
priority: 0
parent: rankings123
tags: [bug, worldcup, routing, p0]
---
# CRITICAL: World Cup match detail pages return 404

## Acceptance Criteria

1. World Cup match detail routes `/world-cup/match/[id]` return 200 (not 404)
2. Match page loads with proper data (teams, score, stats, or "match not found" message if ID is invalid)
3. Links from /world-cup page to match details work correctly
4. **REGRESSION TEST REQUIRED:**
   - Add test in `tests/worldcup-match-routes.test.js` (run via `npm test`)
   - Test must verify:
     - Route handler exists for /world-cup/match/[id]
     - Valid match IDs return 200 status
     - Response contains match data structure
   - Test should FAIL on current code, PASS when fixed
5. Run `npm test` — all tests green
6. Run `npm run build` — succeeds
7. Verify on LIVE production after deploy:
   - Visit https://rankings123.com/world-cup/match/401636239
   - Page loads (200 status)
   - Match data displays correctly
8. Check multiple match IDs to ensure the fix is general

## Bug Report

**URL:** https://rankings123.com/world-cup/match/401636239

**Severity:** CRITICAL (p0) - Core World Cup feature broken during live tournament

**Description:**
World Cup match detail pages are returning 404 Not Found errors. The World Cup main page shows match links (e.g., /world-cup/match/401636239) but clicking them or visiting directly results in 404.

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup
2. Click any match link with href="/world-cup/match/[id]"
3. OR directly visit https://rankings123.com/world-cup/match/401636239
4. Page returns 404 Not Found

**Expected Behavior:**
Match detail page should load showing match details, lineups, stats, etc.

**Actual Behavior:**
HTTP 404 Not Found

**Impact:**
- Users cannot view World Cup match details
- Tournament is LIVE (through July 19) - this is time-sensitive
- Core navigation from main World Cup page is broken
