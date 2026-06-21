---
id: wc-golden-boot-data-fabricated
status: open
deps: []
links: [wc-golden-boot-page]
created: 2026-06-21T20:00:00Z
type: bug
priority: 0
parent: rankings123
tags: [worldcup, data, bug, cx-first-violation]
---
# Golden Boot page shows fabricated/test data (CX-FIRST violation)

**URL:** https://rankings123.com/world-cup/golden-boot

**Repro:** Visit the Golden Boot page and examine the player statistics (appearances, goals).

**Expected:** Real tournament data from ESPN or clearly-flagged mock fallback data if the API is unavailable. Never fabricated or test data presented as live.

**Actual:** The page shows what appears to be test/fabricated data:
- Leading scorer "J. David" with 3 goals in 2 matches (unclear/unknown player name)
- Messi, Mbappé, Haaland showing only 1-2 appearances each when tournament is supposedly "live"
- Inconsistent name formatting (some abbreviated, some full names)
- Data doesn't match the real sources mentioned in the footer attribution ("via ESPN")

**Severity:** P0 CRITICAL — This violates the CX-FIRST rule from CLAUDE.md: "never ship placeholder, 'coming soon', empty, or fabricated UI to users." Presenting test/fabricated data as live tournament statistics destroys user trust and credibility.

**Context:** The `wc-golden-boot-page` ticket was closed and the page was deployed, but the live page contains data that appears fabricated rather than sourced from the ESPN API mentioned in the footer. The ticket notes reference FOX/FIFA sources showing real current leaders, but the live page doesn't reflect this real data.

## Acceptance Criteria

1. Golden Boot page displays ONLY real data from ESPN API or other verified source
2. If ESPN API is unavailable, fall back to clearly-flagged mock data with source indicator showing "mock" (like tennis rankings do)
3. Remove any fabricated player entries or statistics
4. Ensure data matches the ESPN/FIFA sources referenced in the footer attribution
5. REGRESSION TEST REQUIRED: Add data-sanity invariant in `scripts/check-data-sanity.mjs`:
   - Check that Golden Boot data has realistic appearance counts (minimum 3 matches played per player if tournament is in group stage)
   - Verify no test/placeholder player names ("J. David" → should be "Jonathan David" with full context)
   - Ensure source flag accurately reflects data origin (espn/mock, never "espn" when showing mock data)
   - Test fails with current fabricated data, passes when real or honestly-flagged mock data is shown
6. Run `npm run check:data-sanity` — passes
7. Build/lint green
8. Live-verified: data on https://rankings123.com/world-cup/golden-boot matches real tournament standings or shows clear mock fallback indicator
