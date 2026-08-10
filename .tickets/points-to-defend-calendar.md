---
id: points-to-defend-calendar
status: closed
deps: []
links: []
created: 2026-07-24T13:51:06Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, parity]
---
# Tennis Points to Defend Calendar — parity gap

Show points-to-defend calendar for each player: which tournaments they need to defend points from (52-week rolling). Parity gap (live-tennis.eu has this) + helps fans understand ranking volatility ('why did Alcaraz drop 5 spots? Oh, he's defending Wimbledon points').

## Acceptance Criteria

- Per-player points to defend view (on player pages when built)
- Show: upcoming tournaments where player has points expiring
- Data: 52-week rolling window (current points - points from same tournament last year)
- Table: tournament name, date, points defending, status (defending/dropped)
- Mock fallback if 52-week data unavailable
- Link from ranking tables
- SEO: 'tennis points to defend', 'ranking points dropping'
- Builds green, ESLint clean

## Notes

**2026-07-24T13:51:09Z**

ROI (First Principles): User need = understand ranking changes ('why did X drop?'). Parity = live-tennis.eu has this; critical for credibility. Engagement = points-to-defend changes weekly → return visits. Differentiation = most sites don't explain ranking volatility; this does. Education = helps casual fans understand ATP/WTA system. Effort = High (requires 52-week historical data). ROI = MEDIUM-HIGH (parity requirement, but effort is significant).

## Closed in backlog triage 2026-08-10
dup: points-defend-data-source
