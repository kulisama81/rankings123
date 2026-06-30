---
id: tennis-ranking-scenarios
status: open
deps: []
links: []
created: 2026-06-30T13:49:03Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, differentiation, engagement, unique]
---
# Tennis ranking scenario calculator: interactive what-if tool

Interactive 'what-if' calculator for tennis rankings: select a player, select a tournament result (R16/QF/SF/F/W), see their projected new ranking. UNIQUE feature NO competitor has.

## Acceptance Criteria

✓ UI: Player selector + tournament selector + result selector → shows projected ranking
✓ Works for ATP + WTA  
✓ Shows current rank → projected rank with movement arrow
✓ Explains points calculation
✓ Mobile responsive
✓ Shareable URL (preserves selected scenario)
✓ Fast (<500ms calculation)
✓ Uses live ranking data
✓ Graceful handling if player not in tournament

## Notes

**2026-06-30T13:49:12Z**

**First Principles ROI Analysis:**

User's job-to-be-done: 'What do rankings MEAN for the players I care about? What needs to happen for [player] to reach [rank]?'

**Differentiation:** UNIQUE feature competitors DON'T have. Checked:
- live-tennis.eu: algorithmic projections only (source: https://www.sofascore.com/tennis, https://www.flashscore.com/tennis/)
- SofaScore: no scenario calculator
- FlashScore: no scenario calculator  
- ESPN: no scenario calculator
Only wc-group-scenarios exists (World Cup), this brings it to tennis.

**Fundamental drivers:**
- Engagement = real-time accuracy + DISTINCTIVE reasons to return (this is distinctive)
- Interactive tools = higher session depth
- Viral potential: users share scenarios ('See what Djokovic needs to overtake Sinner!')

**Examples:**
- 'If Djokovic wins Wimbledon, he'll be #2'
- 'What does Alcaraz need to reach #1? Win title + Sinner loses in R32'
- 'Scenario: Medvedev QF, Rublev SF — who ranks higher?'

Different from ranking-forecast/tennis-next-week-projection (algorithmic): this is USER-DRIVEN interactive.

**Impact:** VERY HIGH — unique viral feature, serves core job  
**Effort:** MEDIUM — math on existing rankings + tournament points  
**ROI:** VERY HIGH
