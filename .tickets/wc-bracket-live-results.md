---
id: wc-bracket-live-results
status: open
deps: []
links: []
created: 2026-07-16T13:48:17Z
type: bug
priority: 0
parent: rankings123
tags: [worldcup]
---
# World Cup knockout bracket: sync live semifinal/final results (not projections)

## Notes

**2026-07-16T13:48:24Z**

**Impact**: CRITICAL revenue blocker - World Cup Final is July 19 (3 days), but bracket shows 'TBD' instead of Spain vs Argentina. Destroys credibility during peak traffic moment.

**Root cause**: worldCupBracketFeed.ts projects knockout bracket from group standings (R32 template) rather than fetching live knockout match results from ESPN scoreboard API. Semifinals are DONE (Spain 2-0 France, Argentina vs England), Final is SET, but bracket still shows projections.

**First-principles ROI**:
- User need: Know who's in the Final NOW (not projections)
- Traffic: 'World Cup Final 2026' search volume is MASSIVE right now
- CX: Showing TBD when Final is confirmed = credibility killer
- Revenue: Betting affiliate CTAs need real matchup context

**Solution**: Enhance getWorldCupBracket() to:
1. Parse ESPN scoreboard API for completed knockout matches (IDs M73-M88, semifinals, final)
2. Overlay live results onto bracket (replace projections with real teams/scores)
3. Only show projections for future rounds, clearly labeled
4. Verify with: https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard - filter for knockout stage completed matches

**Acceptance**:
- Bracket shows Spain vs Argentina in Final slot (not TBD)
- Semifinals show actual results: Spain 2-0 France, Argentina result
- Future/in-progress rounds can stay projected but labeled 'Projected'
- Source flag shows 'espn' when using live data
- Regression test: tests/worldcup-bracket-live.test.js confirms non-TBD Final when semifinals are complete

**2026-07-17T13:49:52Z**

2026-07-17 URGENT UPDATE: Final is in 48 HOURS (July 19, 3PM ET). Bracket STILL shows TBD for Spain vs Argentina Final. This is the #1 credibility killer during peak traffic. Every hour this persists, we lose search traffic to competitors showing the real matchup. FIRST-PRINCIPLES ROI: Users' root need is 'who's playing in the Final' - we're failing that basic test right now.
