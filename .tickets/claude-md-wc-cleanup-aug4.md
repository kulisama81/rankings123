---
id: claude-md-wc-cleanup-aug4
status: closed
deps: []
links: []
created: 2026-08-04T13:50:55Z
type: task
priority: 1
parent: rankings123
tags: [process, worldcup]
---
# Update CLAUDE.md: Remove WC capacity rule (tournament ended July 19)

World Cup ended July 19 (16 days ago). Remove obsolete '≥half capacity on World Cup' rule from CLAUDE.md. Prevents planner wasting capacity on stale WC tickets.

## Acceptance Criteria

- [ ] Edit CLAUDE.md to REMOVE the World Cup capacity rule paragraph
- [ ] Keep World Cup as a completed multi-sport expansion (Phase 2 achievement)
- [ ] Shift focus back to Phase 1 tennis parity + timely tennis content (Cincinnati, US Open)
- [ ] Commit with message: "Update CLAUDE.md: Remove WC capacity rule (tournament ended July 19)"

## Notes

**2026-08-04T13:51:02Z**

## Context

World Cup 2026 ended July 19 (16 days ago). CLAUDE.md still says:
> "⏱ TIME-SENSITIVE (overrides the split below): the FIFA World Cup 2026 is LIVE (through ~July 19, 2026) — a short-lived traffic spike we must capture now. The planner spends ≥ half its capacity on World Cup (`worldcup`-tagged tickets) every run until the tournament ends"

This misleads autonomous agents (planner, autoresearch).

## ROI: MEDIUM

**Effort:** 10 minutes  
**Impact:** Prevents planner capacity waste on obsolete WC tickets  
**First Principles:** Stale guidance = wasted agent effort

## Closed in backlog triage 2026-08-10
dup: update-wc-capacity-rule
