---
id: tennis-ranking-projections
status: closed
deps: []
links: []
created: 2026-08-07T13:50:05Z
type: feature
priority: 2
parent: rankings123
tags: [differentiation, engagement]
---
# Tennis Ranking Projections & What-If Scenarios

Show what happens to rankings if Player X wins/reaches finals. ESPN shows this during majors; we can surface it systematically. Engagement driver: 'If Alcaraz wins Cincinnati, he moves to #1'. Sticky feature during tournaments.

## Acceptance Criteria

1. Per-tournament projection: 'If [player] wins, rank becomes...'. 2. What-if calculator: select player + tournament + round → see rank impact. 3. Data: current ranking + tournament points + points-to-defend. 4. Shows top 3-5 ranking changes per scenario. 5. UI: collapsible widget on tournament pages + player pages.

## Notes

**2026-08-07T13:50:09Z**

**FIRST-PRINCIPLES ROI (Differentiation):** Engagement = giving users something to wonder about + speculate on. 'What if Djokovic wins?' is inherently compelling during tournaments. Competitors show historical results; we show FUTURE scenarios. This = retention (users return to check projections) + shareability (social media 'if X wins' posts). Requires: points-to-defend data + tournament prize points. Effort: MEDIUM (complex calculation, but reusable). Impact: HIGH (unique feature, session depth +20-30%, return rate boost).

## Closed in backlog triage 2026-08-10
dup: tennis-ranking-scenarios
