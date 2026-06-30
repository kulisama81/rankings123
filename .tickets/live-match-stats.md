---
id: live-match-stats
status: open
deps: []
links: []
created: 2026-06-30T13:49:18Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, live, stats, parity, engagement]
---
# Live match statistics dashboard: detailed in-match stats

Detailed live match statistics during in-progress matches: aces, double faults, serve %, break points saved/won, unforced errors, winners, distance covered. Closes parity gap with SofaScore/FlashScore.

## Acceptance Criteria

✓ Live stats panel for each in-progress match
✓ Stats: aces, double faults, 1st serve %, 2nd serve %, break points saved, break points won, unforced errors, winners
✓ Updates in real-time (poll with live scores)
✓ Works for ATP + WTA
✓ Mobile responsive (collapsible stats panel)
✓ Data source: ESPN scoreboard API (verified available)
✓ Graceful degradation if stats unavailable
✓ Visual comparison between players (side-by-side)
✓ Integrates with existing live-scores ticket

## Notes

**2026-06-30T13:49:27Z**

**First Principles ROI Analysis:**

User's job: 'What's happening LIVE RIGHT NOW in this match?'

**Parity gap:** Competitors have detailed live stats, we don't:
- SofaScore: aces, double faults, serve %, break points, power graph (source: https://www.sofascore.com/tennis/in-progress)
- FlashScore: detailed stats, unforced errors, distance covered (source: https://www.flashscore.com/tennis/)
- ESPN: match statistics (source: https://www.espn.com/tennis/scoreboard)
We only show score (live-scores ticket), not detailed stats.

**Fundamental drivers:**
- LIVE DATA is our core value prop
- Richer live data = longer session duration during matches
- Engagement = depth of information while match is happening

**Impact:** HIGH — closes parity gap, increases session depth during live matches  
**Effort:** MEDIUM — ESPN scoreboard API has stats data (verified available)  
**ROI:** HIGH

Enhances existing live-scores ticket (which shows score only) with detailed statistics panel.
