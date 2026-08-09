---
id: player-form-indicator
status: open
deps: []
links: []
created: 2026-08-09T13:49:27Z
type: feature
priority: 2
parent: rankings123
tags: []
---
# Player form indicator (W-L streak, last 5 matches) — engagement + differentiation

Add current form indicators to ATP/WTA live ranking tables showing each player's recent match results (e.g., 'WWLWW' for last 5 matches, or '5-match win streak'). SofaScore shows 'tennis power graph' for dominance level, FlashScore shows recent form badges. Form is what makes rankings PREDICTIVE — a player ranked #8 on a 10-match win streak is more dangerous than #5 coming off 3 losses.

## Acceptance Criteria

- ATP/WTA ranking tables show form indicator column: visual badges (W/L) or streak text ('5-0 L5', '8-match win streak')
- Form data sourced from ESPN recent matches or match results API
- Clicking form indicator expands/links to last 5 match results (opponent, score, surface, date)
- Mobile-responsive form badges (compact on mobile, full on desktop)
- Sort by form option (hottest players first)
- Mock fallback if recent match data unavailable (hide form column, don't fabricate)
- npm run build green, eslint clean, Core Web Vitals pass

## Notes

**2026-08-09T13:49:41Z**

ROI JUSTIFICATION (First Principles):

Rankings are BACKWARD-LOOKING (52-week rolling points). Form is FORWARD-LOOKING (who's hot NOW). A #15 player on a 10-match win streak is more relevant for betting, fantasy, and predictions than #10 coming off injury. Form = predictive power = user value.

Engagement driver: Users click form badges to see match history → 1 additional pageview per player explored → 5-10× pageviews for users who dig into top players' form.

DIFFERENTIATION: Live-tennis.eu shows only static ranking numbers. Form indicators add INSIGHT layer that helps users answer 'who's playing well right now?' — a question rankings alone don't answer.

EFFORT: MEDIUM (5-7 hours) — need recent match results data (ESPN API likely has this), UI for form badges (W/L sequence or streak text), sort/filter logic.

IMPACT: HIGH — engagement multiplier, differentiation opportunity, serves real user need (form = predictive signal).

ROI: 8/10 — proven engagement pattern (SofaScore, FlashScore have this), adds insight layer to basic rankings.

COMPETITORS WITH THIS:
- SofaScore ✅ ('tennis power graph' dominance level)
- FlashScore ✅ (recent form badges)
- Ultimate Tennis Statistics ✅ (form streaks)
- Live-tennis.eu ❌ (differentiation opportunity)

DATA SOURCES:
- ESPN /sports/tennis/{atp|wta}/athletes/{id}/results (recent match results)
- Or parse from scoreboard API (recent completed matches)
