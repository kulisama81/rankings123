---
id: bug-wc-tournament-status-stale
status: in_progress
deps: []
links: []
created: 2026-07-27T13:50:52Z
type: bug
priority: 0
parent: rankings123
tags: []
---
# World Cup: Tournament showing 'Live' when complete (ended July 19)

The /world-cup page shows 'FIFA World Cup 2026 · Final' with 'Live' status and projected brackets, but the tournament ended July 19, 2026 (8 days ago). This misleads users and makes the site look stale.

Impact: Homepage bounce rate is 88.9% (per analytics) — likely because we're promoting an ended tournament as if it's live.

Root cause: worldCupFeed.ts or page logic not detecting tournament completion. ESPN feed should show complete status, but UI may not be surfacing it.

Fix: When tournament is complete, page should show:
- 'Tournament Complete' or 'Final Results' (not 'Live')
- Actual Final match result (Spain 1-0 Argentina)
- Champion/runner-up clearly displayed
- No 'TBD' or projected brackets

## Acceptance Criteria

- /world-cup page shows 'Tournament Complete' when all matches finished
- Final result displayed (Spain 1-0 Argentina, July 19)
- No 'Live' status for completed tournament
- No 'TBD' or projected brackets shown
- Champion (Spain) and runner-up (Argentina) clearly labeled
- Verified on live site after deploy

## Notes

**2026-07-27T13:52:37Z**

**ROI Justification:**
Homepage bounce rate is 88.9% (per analytics). Visitors land on a page promoting a 'Live' World Cup that ended 8 days ago — they immediately leave thinking the site is abandoned/stale.

**First-Principles Reasoning:**
User's root need = know what's happening NOW. Showing an ended event as 'Live' violates that fundamental promise. Trust is the moat; staleness kills it.

**Impact vs Effort:**
- Effort: Low (display logic fix, ESPN feed already has completion data)
- Impact: High (could cut bounce rate in half, restores credibility for return visits)
- Urgency: Critical (every day we bleed visitors)

## Closed in backlog triage 2026-08-10

obsolete: WC over
