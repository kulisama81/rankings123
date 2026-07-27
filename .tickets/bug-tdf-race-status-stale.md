---
id: bug-tdf-race-status-stale
status: open
deps: []
links: []
created: 2026-07-27T13:48:57Z
type: bug
priority: 1
parent: rankings123
tags: []
---
# Tour de France: Race showing 'in progress' when complete (finished July 26)

The /cycling page shows Tour de France Stage 21 as 'in progress' but the race finished July 26. This misleads users about race status and makes the site look stale.

Root cause: Race status logic in getTdfSnapshot() correctly detects completed stages but may not be surfacing 'complete' status properly in the UI.

Fix: Ensure when all 21 stages are complete, the UI clearly shows 'Race Complete' / 'Final Results' rather than 'Stage 21 in progress'.

## Acceptance Criteria

- When TdF is complete (21 stages finished), page header shows 'Race Complete' or 'Final Results'
- No 'in progress' language for finished races  
- Wikipedia feed still works (this is a display bug, not a feed bug)
- Verified on live site after deploy

## Notes

**2026-07-27T13:52:41Z**

**ROI Justification:**
Cycling showed BEST engagement in analytics (50.7s avg session, 33.3% bounce vs 88.9% homepage). Don't ruin our best-performing content with stale status displays.

**First-Principles Reasoning:**
Data accuracy = table stakes for a rankings site. If users can't trust the race status, they can't trust the rankings either.

**Impact vs Effort:**
- Effort: Low (display logic fix, Wikipedia feed already returns completion status)
- Impact: Medium-High (preserves trust in our best-performing section)
- Urgency: High (race just finished, users checking back now)
