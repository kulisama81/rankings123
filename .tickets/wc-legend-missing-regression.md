---
id: wc-legend-missing-regression
status: closed
deps: []
links: [wc-legend-mismatch]
created: 2026-06-21T20:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [worldcup, ui, bug]
---
# World Cup legend missing entirely (regression from wc-legend-mismatch fix)

**URL:** https://rankings123.com/world-cup

**Repro:** Visit the World Cup page and look for a legend/key explaining team status colors or indicators (advancing, eliminated, qualified, etc.).

**Expected:** A legend should be present showing which colors/indicators correspond to which team statuses, displaying only states that are actually present in the current standings (per the wc-legend-mismatch fix).

**Actual:** No legend exists anywhere on the page. The entire legend component appears to have been removed instead of being conditionally shown.

**Context:** Ticket `wc-legend-mismatch` was closed claiming the legend was fixed to only show relevant states. However, the current live page has NO legend at all. This is a regression — the fix may have accidentally removed the entire legend instead of just hiding irrelevant items. Users have no visual guide to understand team status indicators.

**Severity:** P2 (visual/UX consistency issue — not critical but confusing for users trying to understand team statuses)

## Acceptance Criteria

1. World Cup page displays a legend/key for team statuses
2. Legend only shows status indicators that are actually present in current standings (per original wc-legend-mismatch requirement)
3. When no teams have confirmed statuses yet, either show a note like "Status indicators appear when teams qualify/are eliminated" OR hide the legend entirely with clear messaging
4. REGRESSION TEST REQUIRED: Create `tests/world-cup-legend.test.js` that verifies:
   - Legend component exists and renders
   - Legend only shows keys for statuses actually present in the data
   - Test passes with the fix, would have caught this regression
5. Run via `npm test` — all tests green
6. Build/lint/check:data-integrity green
7. Live-verified on https://rankings123.com/world-cup in both dark and light themes
