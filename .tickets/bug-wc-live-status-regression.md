---
id: bug-wc-live-status-regression
status: closed
deps: []
links: []
created: 2026-08-10T18:06:42Z
type: bug
priority: 1
parent: rankings123
tags: [bug, worldcup, ui]
---
# World Cup page shows 'Live' status when tournament is complete (ended July 19)

## Acceptance Criteria

- [ ] World Cup page detects when tournament is complete (all matches finished)
- [ ] When complete, page shows "Tournament Complete" or "Final Results" status (NOT "Live")
- [ ] No "Live now" text displayed for completed tournament
- [ ] Finals section shows actual results, not TBD placeholders
- [ ] Champion and runner-up clearly labeled if final match is complete
- [ ] **Regression test:** Add a test in tests/ that verifies tournament status logic:
  - When all matches have state=post, status should NOT be live
  - Test both via mock data (completed tournament) and via the actual detection logic
  - Run via npm test and must pass
- [ ] Verified on live https://rankings123.com/world-cup after deploy

## Bug Report

**URL:** https://rankings123.com/world-cup

**Repro Steps:**
1. Visit https://rankings123.com/world-cup
2. Observe the tournament status badge near the title

**Expected:**
Tournament status should show "Complete" or "Final Results" since the FIFA World Cup 2026 ended on July 19, 2026 (verified on ESPN).

**Actual:**
Page displays "Live" status badge and "Live now" text, misleading users into thinking the tournament is still in progress.

**Severity:** p1 - This makes the site appear stale/abandoned and misleads users about current events.

**Additional Context:**
- A previous ticket (bug-wc-tournament-status-stale) was incorrectly closed as "obsolete: WC over" but the bug persists
- ESPN's own site confirms the 2026 World Cup has concluded
- The page also shows TBD placeholders in the Finals section despite completed group stages
- Commit e8fd06f fixed a similar issue for Tour de France but World Cup still broken
