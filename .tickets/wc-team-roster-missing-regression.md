---
id: wc-team-roster-missing-regression
status: open
deps: []
links: [wc-team-pages]
created: 2026-06-21T00:00:00Z
type: bug
priority: 1
parent: rankings123
tags: [worldcup, bug, data]
---
# World Cup team pages missing player rosters (regression)

**URL:** https://rankings123.com/world-cup/team/USA, /world-cup/team/BRA, and all other team pages

**Repro:**
1. Visit https://rankings123.com/world-cup/team/USA
2. Scroll through the page
3. Observe: no player roster/squad section exists

**Expected:** Team pages should display squad roster (per wc-team-pages acceptance criteria: "squad, group, fixtures/results, form").

**Actual:** Team pages show group standings, fixtures, and form, but have NO player roster whatsoever. The page is missing the core "squad" requirement from the original ticket.

**Additional issues on team pages:**
- Upcoming fixtures show "Scheduled" with no dates/times populated
- Missing team header/description section
- No manager/coach information

**Context:** Ticket `wc-team-pages` is marked as closed, claiming team pages render "real data" including squad. However, the live pages have no roster at all. This is a partial implementation or regression.

**Severity:** P1 (major missing feature — team pages exist but lack primary content)

## Acceptance Criteria

1. All World Cup team pages display a complete player roster section with:
   - Player names
   - Player numbers
   - Positions
   - Any available player stats (goals, caps, etc.)
2. Roster data must be REAL (from ESPN API or another legitimate source) — no fabricated/placeholder players
3. If roster data is unavailable from API, hide the roster section entirely rather than showing placeholders
4. Upcoming fixture dates/times are populated (or hidden if not available)
5. REGRESSION TEST REQUIRED: Create `tests/world-cup-team-pages.test.js` that:
   - Verifies team pages fetch roster data from the data layer
   - Confirms roster section either renders with real data OR is hidden (never shows placeholders)
   - Test would have caught this missing roster issue
6. Run via `npm test` — all tests green
7. Build/lint/check:data-integrity green
8. Live-verified: https://rankings123.com/world-cup/team/USA shows player roster (or cleanly hides it if data unavailable)
