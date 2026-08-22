---
id: process-fix-parent-epic-status
status: open
deps: []
links: []
created: 2026-08-22T13:48:22Z
type: task
priority: 2
parent: rankings123
tags: [process, autoresearch]
---
# Process Fix: Parent Epic Status Blocked 139 Tickets

PROCESS BUG DISCOVERED & FIXED (Aug 22 autoresearch): The rankings123 parent epic had status 'open' instead of 'in_progress', which blocked ALL child tickets from showing in 'tkt ready' (parent must be in_progress for children to be buildable). Result: only 1 ticket showed as ready despite 157 tickets existing.

## Acceptance Criteria

Document this in docs/loop-process-fixes.md. Update CLAUDE.md to warn future agents about parent status requirements. Add a check to autoresearch routine to verify parent epics are in_progress.

## Notes

**2026-08-22T13:48:50Z**

ROI: 10/10 - This single status change unblocked 139 tickets instantly. Process improvements like this compound forever. Effort: 2 hours to document + add safeguards. Impact: Prevents future planner starvation, ensures backlog stays buildable.
