---
id: mcp-point-stats
status: open
deps: []
links: []
created: 2026-07-04T13:49:35Z
type: feature
priority: 2
parent: rankings123
tags: [tennis, differentiation, data]
---
# Match Charting Project point-by-point stats integration

Integrate Jeff Sackmann's Match Charting Project (GitHub, 5000+ matches with point-by-point shot data). Unique differentiator: show shot patterns, unforced errors, break points, serve stats per player. Free data, actively maintained (updated July 3, 2026). Display on player pages when available.

## Acceptance Criteria

✓ Fetch Match Charting CSV from GitHub (github.com/JeffSackmann/tennis_MatchChartingProject)
✓ Parse and store point-by-point data
✓ Display on player pages: serve %, unforced errors, break point conversion, shot patterns
✓ 'Data from Match Charting Project' attribution
✓ Update mechanism (weekly/monthly sync)
✓ Graceful handling when data unavailable for a player
✓ Mobile responsive visualizations

## Notes

**2026-07-04T13:49:42Z**

UNIQUE DIFFERENTIATOR: No major rankings site shows point-by-point stats. This sets us apart.

FIRST PRINCIPLES:
- ROOT VALUE: Stats tell the STORY behind the ranking (why does this player win?)
- DIFFERENTIATION: ESPN/ATP/WTA/live-tennis.eu lack granular shot data
- ENGAGEMENT: Stats are STICKY content (fans return to study patterns)
- DATA MOAT: Free, actively maintained, competitors aren't using it

Jeff Sackmann Match Charting Project:
- 5,000+ pro matches with shot-level data
- Last updated July 3, 2026 (ACTIVE)
- Free CSV on GitHub
- Includes: shot type, direction, depth, unforced errors, winners, break points

STATS TO SURFACE:
- Serve %
- Unforced error rate
- Break point conversion
- Shot patterns (forehand/backhand distribution)
- Clutch factor (performance under pressure)

IMPACT: HIGH (major differentiator, engagement driver)
EFFORT: MEDIUM (parse CSV, integrate into player pages)
ROI: VERY HIGH (unique data = unique value prop)

Blocks nothing, enhances player-pages when it ships
