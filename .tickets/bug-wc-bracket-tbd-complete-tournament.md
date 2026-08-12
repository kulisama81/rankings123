---
id: bug-wc-bracket-tbd-complete-tournament
status: open
deps: []
links: []
created: 2026-08-12T17:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, ui, consistency]
---
# World Cup knockout bracket shows TBD placeholders despite tournament being complete

## Bug Report

**URL:** https://rankings123.com/world-cup

**Severity:** P2 - Data consistency issue that makes the site look stale

**Repro Steps:**
1. Visit https://rankings123.com/world-cup
2. Observe the Final result at the top: "Argentina 🇦🇷 3-1 🇨🇭 Switzerland · July 12, 2026 · AET"
3. Scroll down to the knockout bracket visualization
4. Observe that Quarterfinals, Semifinals, and Final boxes show "🏆TBD"

**Expected:**
Since the tournament ended July 19, 2026 (24+ days ago), the entire knockout bracket should show actual match results with team names and scores for all stages (Round of 32, Round of 16, Quarterfinals, Semifinals, Final).

**Actual:**
- Round of 32 and Round of 16 show "Proj" (projected) matchups with team names
- Quarterfinals, Semifinals, and Final show "🏆TBD" placeholders
- Meanwhile, the top of the page correctly shows the Final result: Argentina 3-1 Switzerland

**Impact:**
- Data inconsistency: The page header shows the final result but the bracket shows "TBD"
- Violates CX-first principle: showing placeholder/incomplete data on a completed tournament
- Makes the site appear stale and unmaintained
- During the World Cup time window, this lost potential traffic value

**Root Cause:**
The knockout bracket visualization is not being populated with actual match results from the completed tournament. It appears to be showing projected/seeded matchups for early rounds and TBD for later rounds, as if the tournament were still upcoming or in progress.

## Acceptance Criteria

- [ ] Knockout bracket visualization populated with actual results for ALL completed stages
- [ ] For each completed knockout match, show: team names, flags, scores
- [ ] No "🏆TBD" or "Proj" labels for completed matches
- [ ] Bracket data should match the final result shown at top of page (Argentina 3-1 Switzerland)
- [ ] If ESPN API doesn't provide historical bracket data, either:
  - Option A: Fetch and display actual knockout results from ESPN
  - Option B: Hide the bracket visualization entirely and show only the final result
  - Option C: Show bracket only for in-progress tournaments, hide for completed ones
- [ ] **Regression test:** Add test in `tests/worldcup-bracket.test.mjs`:
  - When tournament status is "complete", assert NO occurrence of "TBD" in the bracket section
  - Run via `npm test` and must pass
- [ ] Verified on live https://rankings123.com/world-cup after deploy:
  - No "TBD" visible in knockout bracket
  - All completed matches show actual teams and scores
  - Data consistency: bracket matches the summary result
