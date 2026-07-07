---
id: wc-qf-betting-preview
status: open
deps: []
links: []
created: 2026-07-07T13:55:00Z
type: feature
priority: 0
parent: rankings123
tags: [worldcup, urgent, revenue, betting]
---
# World Cup Quarterfinal betting preview (July 8-11)

Comprehensive betting preview for all 4 World Cup quarterfinal matches with odds, analysis, and predictions.

## Context
Round of 16 ends TODAY (July 7). Quarterfinals start TOMORROW (July 8-11). Ticket `wc-r16-betting-previews` covers R16; need QF coverage. Peak traffic window for betting content. ESPN API provides odds from DraftKings.

## Acceptance Criteria

✓ New page or section: World Cup Quarterfinal Betting Preview
✓ All 4 QF matches covered (determined after today's R16 matches complete)
✓ Per match: teams, date/time, venue, matchup analysis
✓ Odds display: moneyline, spread, over/under (from ESPN API / DraftKings)
✓ Head-to-head: previous meetings if applicable
✓ Form analysis: last 5 matches, goals scored/conceded
✓ Key players to watch per team
✓ Prediction: which team likely to advance (with reasoning)
✓ Real odds from ESPN API (no fabricated betting lines)
✓ Mobile responsive
✓ Published before first QF match kicks off (July 8)
✓ Link from: World Cup main page, bracket page, relevant match pages
✓ Verifier must check: odds accuracy, no fabricated predictions, published on time

## Notes

**2026-07-07T13:55:00Z**

FIRST PRINCIPLES ROI ANALYSIS:

**Root user need:** "Who should I bet on? What are the odds? Who's likely to win?"

**Why this drives traffic:**
- High search volume: "World Cup quarterfinal predictions", "World Cup betting odds", "Argentina vs [opponent] odds"
- Timely content: peak search during 24-48h before matches
- Shareable: users share betting tips on social media

**Why this drives engagement:**
- Betting content = high intent (users actively seeking info to act on)
- Session depth: users read analysis carefully (3-5 min avg on betting preview content)
- Return visits: users check odds changes, updated analysis

**Why this drives revenue:**
- HIGHEST RPM content for sports sites (betting audience = premium CPM)
- Direct affiliate revenue: betting ads/links earn 2-5× typical display CPM
- Proof: Industry standard sports betting RPM = $15-40 (vs $5-10 for general sports content)

**TIME-SENSITIVE:** QF starts TOMORROW (July 8). Must publish TODAY or early tomorrow to capture peak traffic.

**IMPACT:** VERY HIGH
- Traffic: Betting preview content = 50-100K views for QF (based on competitor data)
- RPM: Betting content earns 2-5× typical sports content
- Affiliate potential: Natural entry point for betting partnerships

**EFFORT:** LOW-MEDIUM
- Similar to existing R16 preview ticket
- ESPN API provides odds data
- Analysis can be data-driven (form, h2h stats)
- 4 matches to cover (vs 8 in R16)

**ROI:** VERY HIGH (time-sensitive, highest-RPM content type, tournament LIVE, low effort)

**MONETIZATION NOTE (CX FIRST):**
- Display odds from ESPN API (real data) ✓
- If/when betting affiliate partner secured: add affiliate links
- NEVER show placeholder betting partners or fabricated odds
- Odds display = value even without affiliate (users want the info)

**TECHNICAL NOTES:**
- ESPN API scoreboard includes odds.details with moneyline/spread/over-under
- Provider: DraftKings (via ESPN)
- Reference ticket: wc-r16-betting-previews for format
