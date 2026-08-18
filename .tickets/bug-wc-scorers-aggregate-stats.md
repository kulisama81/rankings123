---
id: bug-wc-scorers-aggregate-stats
status: closed
deps: []
links: []
created: 2026-08-10T18:07:02Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, data-consistency]
---
# World Cup top scorers show misleading aggregate stats (8 matches in group stage)

## Acceptance Criteria

- [ ] Top Scorers section either:
  - Shows only current-tournament stats (max 3 appearances during group stage), OR
  - Clearly labeled as "All-time" or "Career" stats with disclaimer, OR
  - Hidden when stats don't match current tournament context
- [ ] Stats displayed are never confusing or misleading to users
- [ ] Data source attribution is accurate
- [ ] **Regression test:** Add invariant to scripts/check-data-sanity.mjs:
  - During group stage (stageLabel contains "Group"), topScorers appearances should be ≤3
  - OR if showing aggregate stats, verify UI includes "all-time"/"career" label
  - Test must fail on current buggy state and pass after fix
- [ ] Verified on live https://rankings123.com/world-cup after deploy

## Bug Report

**URL:** https://rankings123.com/world-cup (Top Scorers section)

**Repro Steps:**
1. Visit https://rankings123.com/world-cup
2. Scroll to "Top Scorers" section
3. Observe the stats shown (e.g., "K. Mbappé: 8 matches, 10 goals")

**Expected:**
Statistics should make sense for the current tournament context. During group stage, each team plays only 3 matches, so "8 matches" is impossible and confusing.

**Actual:**
Top scorers display aggregate/all-time stats from ESPN API that include previous World Cups:
- K. Mbappé (France): 8 matches, 10 goals
- L. Messi (Argentina): 8 matches, 8 goals
- J. Bellingham (England): 8 matches, 7 goals

**Root Cause:**
ESPN's statistics API returns aggregate World Cup stats (combining 2022 + 2026 tournaments), not filtered to current tournament only. While this is ESPN's data (not fabricated), displaying it without context is misleading.

**Severity:** p2 - Data consistency/UX issue. Stats don't match the tournament structure shown elsewhere on the page, confusing users.

**Proposed Solutions:**
1. Filter ESPN stats to only show players with ≤3 appearances (current group stage max), OR
2. Add clear label: "All-time World Cup Stats" or "Career World Cup Stats", OR  
3. Hide the Top Scorers section until knockout rounds when higher match counts make sense, OR
4. Fall back to mock data which uses realistic group-stage numbers (3 appearances)
