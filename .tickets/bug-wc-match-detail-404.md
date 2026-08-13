---
id: bug-wc-match-detail-404
status: open
deps: []
links: []
created: 2026-08-12T18:00:00Z
type: bug
priority: 1
parent: rankings123
tags: [bug, worldcup, routing, 404]
---
# World Cup match detail pages return 404 (broken internal links)

## Bug Report

**URL:** https://rankings123.com/world-cup/match/401631699

**Severity:** P1 (High) - Broken navigation, internal links lead to 404

**Inspection Date:** 2026-08-12

## Description

World Cup match detail pages (e.g., `/world-cup/match/401631699`) return **HTTP 404 Not Found**, suggesting these routes are either not implemented or the URL structure is incorrect.

## Reproduction Steps

1. Visit https://rankings123.com/world-cup/match/401631699
2. **Expected:** Match detail page showing teams, score, stats, lineups
3. **Actual:** HTTP 404 Not Found

## Impact

- Broken user experience if match detail links exist on the World Cup page
- Missing functionality for showing detailed match information
- 404 errors look unprofessional and hurt SEO

## Investigation Needed

1. Check if `/world-cup/match/[id]` route is defined in `src/app/world-cup/match/[id]/page.tsx` or similar
2. Verify if match detail links are shown anywhere on the site (World Cup page, bracket, etc.)
3. If links don't exist yet, this may be a **missing feature** rather than a bug
4. If links DO exist (in bracket/standings), this is a **P0 broken navigation bug**

## Acceptance Criteria

1. **Investigate the issue:**
   - Check if World Cup page has any links to `/world-cup/match/[id]` routes
   - Search codebase for match detail route definitions
   - Determine if this is a missing route (unimplemented) or broken route (implemented wrong)

2. **Fix the routes (if links exist):**
   - All `/world-cup/match/[id]` URLs return HTTP 200 (not 404)
   - Match detail pages show: teams, score, date, venue, basic match info
   - Match IDs in links match the route parameter format
   
3. **OR remove broken links (if route unimplemented):**
   - Remove any clickable match links from World Cup page until feature is built
   - Never show links that lead to 404s

4. **REGRESSION TEST REQUIRED:**
   - Add test in `tests/worldcup-match-routes.test.mjs` (run via `npm test`):
     - If match detail feature exists:
       - Test at least one known match ID returns 200
       - Assert page contains team names and score
     - If feature doesn't exist:
       - Test World Cup page has no links to /world-cup/match/* routes
     - Test should FAIL on current 404, PASS when fixed

5. **Verify locally:**
   - Visit http://localhost:3000/world-cup
   - Click any match links (if they exist)
   - Confirm they navigate to working pages (200, not 404)
   - OR confirm no match links are shown if feature unimplemented
   - `npm test` — all tests green

6. **Standard checks:**
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean

7. **Live verification:**
   - Visit https://rankings123.com/world-cup
   - Test match links work (if present) or are absent (if not implemented)
   - No 404 errors from internal navigation
