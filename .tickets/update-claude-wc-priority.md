---
id: update-claude-wc-priority
status: open
deps: []
links: []
created: 2026-08-17T00:00:00Z
type: task
priority: 1
parent: rankings123
tags: [task, process, documentation]
---
# Update CLAUDE.md — Remove stale World Cup priority rule

## Context

CLAUDE.md and `.claude/agents/autoresearch.md` both contain "World Cup ≥ half capacity" rule. **World Cup 2026 Final was July 19, 2026** (Argentina 3-1 Switzerland). Today is **August 17, 2026** = **29 days stale**.

Current priorities should be:
- **US Open** (Aug 27 - Sep 13, starts in 10 days) — biggest tennis SEO window of the year
- **Vuelta a España** (Aug 22 - Sep 13, starts in 5 days) — cycling betting opportunity
- **Phase 1 Parity** (ATP/WTA feature gaps vs live-tennis.eu)

## Task

Update both files to reflect current priorities and remove outdated World Cup capacity rule.

## Files to Update

1. **CLAUDE.md** — "CURRENT PRIORITY" section (lines ~18-22)
2. **.claude/agents/autoresearch.md** — World Cup paragraph (lines ~23-27)

## Changes Needed

### CLAUDE.md

**Remove:**
```markdown
**Tournament windows** (time-sensitive): When major tournaments are active or upcoming (US Open
Aug 27-Sep 13, Cincinnati Open Aug 11-23, Vuelta Aug 22-Sep 13), prioritize tournament-specific
content for SEO and betting revenue capture.
```

**Replace with:**
```markdown
**Tournament windows** (time-sensitive): When major tournaments are active or upcoming, prioritize 
tournament-specific content for SEO and betting revenue capture.

**CURRENT PRIORITIES (Aug-Sep 2026):**
- **US Open** (Aug 27 - Sep 13) — biggest tennis SEO window of the year, 150K+ daily searches
- **Vuelta a España** (Aug 22 - Sep 13) — cycling betting opportunity, 21-day revenue window
- **Phase 1 Parity** — close feature gaps vs live-tennis.eu (H2H, points to defend, race rankings, player pages)
```

### .claude/agents/autoresearch.md

**Remove:**
```markdown
**World Cup (while live, through ~July 19, 2026):** the planner spends **≥ half its capacity**
on World Cup, so keep the `worldcup`-tagged backlog well stocked every run — leaders/top
scorers, knockout bracket, per-match detail pages, team & player pages, odds/predictions, group
views, advanced stats. Never let the World Cup queue run dry while the tournament is on.
```

**Replace with:**
```markdown
**Tournament priorities (rotate based on live events):** Keep the planner stocked with 
time-sensitive tournament content (≥30% capacity during major events). Current priorities:
- **US Open** (Aug 27 - Sep 13) — tennis SEO peak
- **Vuelta** (Aug 22 - Sep 13) — cycling betting window
```

## Acceptance Criteria

1. **Files updated**:
   - CLAUDE.md reflects current tournament priorities (US Open, Vuelta)
   - `.claude/agents/autoresearch.md` removes World Cup ≥half capacity rule
   - Both files mention current date context (Aug-Sep 2026)

2. **Git commit**:
   - Clear commit message: "Update priorities: remove stale World Cup rule, add US Open + Vuelta focus"
   - No `Co-Authored-By` trailer (per user preference)

3. **Verification**:
   - Read both files and confirm World Cup capacity rule is gone
   - Confirm US Open + Vuelta are mentioned as current priorities

## Impact

**Alignment**: Ensures planner and autoresearch focus on current revenue windows (US Open, Vuelta) instead of stale World Cup priority.

**Capacity**: Frees up mental model capacity for time-sensitive US Open content (10 days until draw).

**ROI: 6/10** — Low effort, removes outdated constraint. Doesn't directly create value but removes friction.

## Notes

- This is the SECOND time the World Cup rule has gone stale (yesterday's autoresearch report mentioned it too)
- Consider adding a DATE marker to time-sensitive rules so they're easier to spot when stale
- Example: `## CURRENT PRIORITIES (valid through Sep 2026)`
