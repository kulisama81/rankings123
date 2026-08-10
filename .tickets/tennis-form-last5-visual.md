---
id: tennis-form-last5-visual
status: closed
deps: []
links: []
created: 2026-07-03T13:54:53Z
type: feature
priority: 2
parent: rankings123
tags: [tennis, engagement]
---
# ATP/WTA: Visual form indicator (last 5 matches) in ranking tables

Add inline form indicator showing each player's last 5 match results (W-W-L-W-L or colored dots) in ATP/WTA live ranking tables. Research shows this is a key differentiator vs live-tennis.eu and drives engagement.

FIRST PRINCIPLES: Users assess momentum at a glance. 'Is player X on a hot streak or struggling?' Static rank number doesn't answer this — form context does. ESPN/SofaScore use this extensively; missing from live-tennis.eu.

Implementation:
- Visual badges/dots next to each player: 🟢🟢🔴🟢🟢 OR 'W-W-L-W-L'
- Data: ESPN scoreboard API already provides recent match results (we fetch for live tournaments)
- Render in new column or inline after rank
- Mobile: abbreviated to last 3 for space
- Tooltip on hover: 'Last 5: d. Djokovic (W), d. Alcaraz (W), l. to Sinner (L)...'

Data source: liveFeed.ts already fetches ESPN scoreboard with match history

## Acceptance Criteria

- ATP Live table shows last 5 match results for top 100 players
- WTA Live table shows last 5 match results for top 100 players
- Visual indicator: colored dots (green=W, red=L) OR text 'W-W-L-W-L'
- Mobile: abbreviated to last 3 matches
- Tooltip shows opponent names + result on hover
- Falls back gracefully if data unavailable (no form = no indicator, not placeholder)
- Verified readable in dark + light themes
- No performance regression (form data fetched with existing ESPN call, not separate)

## Notes

**2026-07-03T13:55:54Z**

ROI JUSTIFICATION (First Principles):

Differentiation = reason to choose rankings123 over live-tennis.eu.

Form indicators answer: 'Is this player hot or struggling?' at a glance.

WHY this drives engagement:
1. INSTANT CONTEXT: No need to click through to see recent performance
2. SCANNABLE: Visual patterns (🟢🟢🟢🟢🔴) parse faster than text
3. NARRATIVE HOOKS: Streaks visible = users follow storylines ('Can Alcaraz extend 10-match win streak?')

Competitive advantage:
- ESPN/SofaScore use this extensively
- live-tennis.eu DOES NOT HAVE THIS (parity gap we can exploit)
- Data already available (ESPN API we fetch for live tournaments)

Impact:
- Increases session depth (users scan form, discover narratives, explore players)
- Drives retention (follow form trends day-to-day)
- Zero API cost (data already fetched)

Effort: MEDIUM (new column + visual component)
Impact: MEDIUM-HIGH (key differentiator, drives engagement)
ROI: HIGH (differentiates vs competitor, reuses existing data)

## Closed in backlog triage 2026-08-10
dup: tennis-form-streaks
