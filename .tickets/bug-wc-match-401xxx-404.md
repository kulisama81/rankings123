---
id: bug-wc-match-401xxx-404
status: closed
deps: []
links: []
created: 2026-07-13T18:04:20Z
type: bug
priority: 0
parent: rankings123
tags: [bug, worldcup, regression, p0]
---
# World Cup match pages: 401xxx ID format returns 404 (regression)

**URL Examples:**
- https://rankings123.com/world-cup/match/401631683 (404)
- https://rankings123.com/world-cup/match/401631682 (404)
- https://rankings123.com/world-cup/match/401631680 (404)
- https://rankings123.com/world-cup/match/401631445 (404)
- https://rankings123.com/world-cup/match/401636239 (404)

**Severity:** P0 (CRITICAL) — Core World Cup feature broken during live tournament, regression of supposedly fixed tickets

**Type:** Regression — Tickets `worldcup-match-404` and `wc-match-pages-404-regression` were marked CLOSED but the issue persists for 401xxx format match IDs

**Description:**
World Cup match detail pages are returning 404 Not Found for match IDs in the `401xxxxxx` format. However, match pages with the `760xxx` format work correctly (e.g., /world-cup/match/760513 returns 200).

This appears to be a routing or data feed issue where only certain match ID formats are handled. The previous tickets claimed to fix match page 404s, but they only verified with specific IDs and didn't catch that an entire ID format range was still broken.

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup/match/401631683 (or any 401xxx ID)
2. Observe HTTP 404 Not Found
3. Compare with https://rankings123.com/world-cup/match/760513 (760xxx format)
4. Observe that 760xxx returns 200 with match data

**Expected Behavior:**
All valid World Cup match IDs should either:
- Return 200 with match data if the match exists in ESPN
- Return 404 only if ESPN API returns 404 for that match ID

**Actual Behavior:**
- 760xxx format: Works correctly (200 with data)
- 401xxx format: Always returns 404, regardless of whether match exists

**Impact:**
- Multiple match IDs are broken
- Two supposedly "fixed" tickets (worldcup-match-404, wc-match-pages-404-regression) are still broken
- Users clicking match links from external sources or bookmarks get 404s
- Tournament is LIVE (through July 19) - this is time-sensitive

## Acceptance Criteria

1. Investigate why 401xxx match IDs return 404 while 760xxx IDs work:
   - Check `src/lib/worldCupMatchFeed.ts` — does it handle both ID formats?
   - Check `src/app/world-cup/match/[id]/page.tsx` — any ID format validation?
   - Test ESPN API directly with both ID formats to see which ones are valid
   - Determine if 401xxx IDs are from a different ESPN endpoint/sport

2. Fix the root cause:
   - If 401xxx are invalid IDs: Remove any broken links from team pages
   - If 401xxx are valid but from different endpoint: Support both formats
   - If routing issue: Fix the dynamic route to handle all formats

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/worldcup-match-id-formats.test.mjs`:
     - Test at least 3 match IDs from each format (760xxx and 401xxx)
     - Verify that valid IDs return 200 with match data
     - Verify that truly invalid IDs return 404 (not mock/demo data)
     - Mock the ESPN API or use real API to determine which IDs are actually valid
   - Test should FAIL on current code (401xxx returns 404)
   - Test should PASS after fix (both formats work or invalid IDs properly return 404)
   - Run via `npm test`

4. Verify the fix locally:
   - Test these specific IDs that were in closed tickets:
     - curl http://localhost:3000/world-cup/match/401631445 (should work if valid)
     - curl http://localhost:3000/world-cup/match/401636239 (should work if valid)
   - Test the working format still works:
     - curl http://localhost:3000/world-cup/match/760513 (should still work)
   - `npm run build` — succeeds
   - `npm test` — regression test passes
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — clean

5. Live verification after deploy:
   - Test all IDs from step 4 on production (https://rankings123.com/world-cup/match/...)
   - Verify Vercel build succeeded: `gh api repos/kulisama81/rankings123/commits/HEAD/status`
   - Check browser console: no errors
   - Verify both ID formats now work (or invalid IDs properly 404)

6. Re-test the previously closed tickets:
   - Verify fixes for `worldcup-match-404` actually work now
   - Verify fixes for `wc-match-pages-404-regression` actually work now
   - Consider what went wrong with those tickets (insufficient test coverage)

## Closed in backlog triage 2026-08-10
obsolete: WC over
