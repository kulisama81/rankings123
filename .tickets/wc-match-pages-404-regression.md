---
id: wc-match-pages-404-regression
status: open
deps: []
links: [wc-match-pages]
created: 2026-06-21T00:00:00Z
type: bug
priority: 0
parent: rankings123
tags: [worldcup, bug]
---
# World Cup match detail pages return 404 (regression)

**URL:** https://rankings123.com/world-cup/match/401631445 (and all other match IDs)

**Repro:**
1. Visit https://rankings123.com/world-cup
2. Click any match or navigate directly to /world-cup/match/[any-id]
3. Observe HTTP 404 error

**Expected:** Match detail pages should render with lineups, timeline, stats, venue (per wc-match-pages acceptance criteria).

**Actual:** All match pages return 404. Feature is completely non-functional.

**Context:** Ticket `wc-match-pages` is marked as closed, indicating this feature was supposedly shipped. However, NO match pages exist in production. This is a critical regression — either the feature was never deployed, or it broke after deployment.

**Severity:** P0 (core feature completely broken — user-facing 404s)

## Acceptance Criteria

1. All World Cup match pages (/world-cup/match/[id]) return HTTP 200
2. Match pages render real data: team names, scores, lineups, events timeline, venue
3. Match pages are linked from fixtures list on /world-cup
4. Match pages are in sitemap
5. REGRESSION TEST REQUIRED: Create `tests/world-cup-match-pages.test.js` that:
   - Verifies match page route handler exists and responds to valid match IDs
   - Confirms at least one real match ID (e.g., 401631445) would render successfully
   - Test must fail when match pages return 404, pass when they work
6. Run via `npm test` — all tests green
7. Build/lint/check:data-integrity green
8. Live-verified: curl https://rankings123.com/world-cup/match/401631445 returns 200 and contains match data
