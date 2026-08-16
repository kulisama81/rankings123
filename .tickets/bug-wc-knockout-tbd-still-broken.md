---
id: bug-wc-knockout-tbd-still-broken
status: open
deps: []
links: []
created: 2026-08-16T05:04:04Z
type: bug
priority: 0
parent: rankings123
tags: [bug, worldcup]
---
# World Cup knockout bracket still shows TBD (regression)

The World Cup knockout bracket (R16, QF, SF) shows 'TBD' placeholders throughout, even though the tournament is completed (final: Argentina 3-1 Switzerland). This was supposedly fixed in commit ba4fdb9 ('Fix World Cup bracket showing TBD on completed tournament') but the bug still exists on the live site.

URL: https://rankings123.com/world-cup
Repro: Visit the World Cup page and scroll to the knockout bracket section - multiple '🏆TBD' entries appear in match results.
Expected: Completed matches should show actual team names and results, not TBD.
Actual: TBD placeholders throughout R16/QF/SF sections.
Severity: P0 - This makes the site look broken and unreliable to users.

## Acceptance Criteria

1. The World Cup knockout bracket displays NO 'TBD' text for completed matches
2. All completed match results show actual team names and scores
3. A regression test is added (either as a node --test unit test in tests/ that validates knockout bracket data structure has no TBD for completed tournaments, OR a new invariant in scripts/check-data-sanity.mjs that fails if TBD appears in completed World Cup knockout stages)
4. The test MUST fail on current code and pass after the fix
5. Verified on live production site (rankings123.com/world-cup)
