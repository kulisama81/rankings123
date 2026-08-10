---
id: tennis-point-stats-live
status: closed
deps: []
links: []
created: 2026-07-19T13:49:56Z
type: feature
priority: 2
parent: rankings123
tags: [tennis, differentiation, live, engagement]
---
# Tennis point-by-point match stats integration (aces, DFs, break points)

Integrate live point-by-point match statistics for in-progress ATP/WTA matches: aces, double faults, 1st serve %, break points saved/converted, unforced errors, winners. Source: ESPN scoreboard API already includes some stats, or FlashScore/SofaScore as alternatives. Display on live match pages (when we build them) and as expandable detail on live rankings table (show which match a player is in + their stats). Differentiating feature: combines live rankings + live match stats in one place (competitors separate these).

## Acceptance Criteria

- Live match stats displayed for in-progress matches: aces, DFs, 1st serve %, BP saved, winners, errors
- Source: ESPN scoreboard API (already using for match status), or FlashScore API if richer
- Integration point: live rankings table shows 'In play' badge → click to see match stats
- Fallback: if stats unavailable, show match status only (score + round)
- Data refreshes every 20-60s (same cadence as live rankings)

## Notes

**2026-07-19T13:50:04Z**

**ROI Justification (first-principles):**
- **User need:** When a player is 'in play', fans want to know HOW they're performing (serving well? breaking serve?), not just the score
- **Differentiation:** live-tennis.eu shows 'in play' status but NO match stats. FlashScore/SofaScore show match stats but NO live rankings impact. We'd be the ONLY site combining both.
- **Engagement:** Live stats = reason to stay on page during a match (check back every 10 mins), vs one-time visit for rankings
- **Betting context:** In-play betting decisions use stats (aces, DFs, break points) — attracts bettors to the site
- **Data already available:** ESPN scoreboard API (which we already call) includes stats. Low implementation cost for high engagement lift.

**Why this matters:** A tennis fan watching a match wants to track 'is Djokovic serving well today?' while ALSO seeing 'if he wins this match, he moves to #3'. We're the only site that can show both in one place.

## Closed in backlog triage 2026-08-10
dup: mcp-point-stats
