---
id: wc-knockout-bracket-display
status: open
deps: []
links: []
created: 2026-07-07T13:45:00Z
type: feature
priority: 0
parent: rankings123
tags: [worldcup, urgent, cx, seo]
---
# World Cup knockout bracket visualization (R16→Final)

Display the live knockout bracket showing Round of 16, Quarterfinals, Semifinals, and Final matchups with results and upcoming matches.

## Context
Round of 16 concludes TODAY (July 7). Quarterfinals start TOMORROW (July 8). Peak search volume for "World Cup 2026 bracket", "World Cup quarterfinals 2026". ESPN API provides match data and bracket structure.

## Acceptance Criteria

✓ /world-cup/bracket route with full knockout bracket visualization
✓ Shows R32→R16→QF→SF→Final structure (48→32→16→8→4→2→1)
✓ Completed matches show: teams, scores, winner highlighted
✓ Upcoming matches show: teams, date/time, venue
✓ Future matches show: "Winner of Match X vs Winner of Match Y"
✓ Real data from ESPN fifa.world API (no mocks/placeholders)
✓ Mobile responsive (horizontal scroll OR stacked format for mobile)
✓ Link from main /world-cup page prominently placed
✓ Auto-updates as matches complete
✓ Verifier must check: bracket accuracy vs ESPN, mobile usability, no fabricated data

## Notes

**2026-07-07T13:45:00Z**

FIRST PRINCIPLES ROI ANALYSIS:

**Root user need:** "Who plays who next? What's the path to the final?"

**Why this drives traffic:**
- Huge search volume during knockout stages (10M+ global searches for "World Cup bracket")
- Every fan wants to see: who's through, who plays next, path to glory
- Shareable (users screenshot/share brackets on social)

**Why this drives engagement:**
- Visual, scannable format = longer sessions (competitors: 2-4 min avg on bracket pages)
- Users return repeatedly as tournament progresses
- Low cognitive load (bracket = intuitive format)

**Why this drives revenue:**
- High-value indexable content (SEO for "World Cup 2026 bracket")
- Long session depth = more ad impressions
- Natural ad placement opportunities (between bracket rounds)

**TIME-SENSITIVE:** Tournament is LIVE NOW through July 19. R16 ends TODAY, QF starts TOMORROW.

**IMPACT:** VERY HIGH
- Search: "World Cup bracket" = 10M+ searches during knockouts
- Engagement: Bracket format = 2-4 min avg session (vs 1.5 min site avg)
- SEO: High search volume + low competition (most sites show static images, not live data)

**EFFORT:** MEDIUM
- Bracket visualization is moderately complex
- ESPN API provides structure via competitions[].format and events[]
- Mobile responsive bracket requires careful design

**ROI:** VERY HIGH (time-sensitive, huge search volume, tournament only lasts 3 more weeks)

**TECHNICAL NOTES:**
- ESPN API: https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard
- Bracket structure in competitions[].format field
- Match data in events[] with stage info
- Reference existing /world-cup page bracket column but make full-page comprehensive
