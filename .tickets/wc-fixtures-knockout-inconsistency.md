---
id: wc-fixtures-knockout-inconsistency
status: open
deps: []
links: []
created: 2026-07-18T18:07:05Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, ui, consistency]
---
# World Cup page shows 'No upcoming fixtures' but displays knockout bracket

**URL:** https://rankings123.com/world-cup

**Repro:**
1. Visit /world-cup
2. Scroll to fixtures section
3. Scroll to knockout bracket section

**Expected:** Either show upcoming fixtures OR display a message that none are scheduled - not both

**Actual:** The page displays 'No upcoming fixtures scheduled' and 'Check back as the tournament schedule is announced' in the fixtures section, but simultaneously shows a fully populated Round of 32 knockout bracket with specific matchups (e.g., South Africa vs Canada, Germany vs Bosnia-Herzegovina, etc.)

**Impact:** Confusing UX - users see contradictory information about whether matches are scheduled

## Acceptance Criteria

- Remove the 'No upcoming fixtures scheduled' message when knockout bracket matchups are determined
- OR hide the knockout bracket projections until they're confirmed as actual scheduled fixtures
- Add a regression test in tests/world-cup-consistency.test.mjs that verifies: if knockout bracket has matchups, fixtures section should not show 'no upcoming' message (or vice versa)
