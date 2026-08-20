---
id: career-high-visual-indicators
status: open
deps: []
links: []
created: 2026-08-20T13:51:24Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, engagement, ux]
---
# Career High Visual Indicators — NEW CH! badges for engagement + retention

ENGAGEMENT DRIVER (Phase 1 parity + distinctive feature): Competitors (live-tennis.eu, TennisScoresToday) track career highs and highlight NEW achievements. We have careerHigh data in our codebase (src/types/index.ts, from UTS bestRank) but NO visual indicator for recent career high breaks. FIRST PRINCIPLES: Users ask 'who's at their peak right now?' — NEW CH! badges answer this instantly. Creates return-visit motivation ('did Rybakina break her career high this week?'). IMPLEMENTATION: (1) Add lastCareerHighDate field to track when CH was achieved, (2) Show 'NEW CH!' badge if within 7 days, (3) Visual design: small pill badge next to rank #, accent color glow. DATA AVAILABLE NOW: UTS provides bestRank, add temporal tracking. ROI: Retention driver (8/10) — creates 'comeback tomorrow' hooks. Low build effort (4-6 hours). Differentiates from competitors who show CH but not NEW indicators.

## Acceptance Criteria

NEW CH! badge appears next to players who recently broke career high, Badge shows on ATP/WTA ranking tables and player pages, Career high data from UTS bestRank field (already in codebase), NEW indicator persists for 7 days after achievement, Clicking badge shows career high history, Mobile-optimized badge design, Build + deploy + verify on rankings123.com

## Notes

**2026-08-20T13:52:07Z**

ROI Justification (First Principles): ROOT NEED: Users ask 'who's at their peak right now?' Career high tracking answers this. ENGAGEMENT DRIVER: Creates return-visit hooks ('did X break their CH this week?'). COMPETITOR PARITY: live-tennis.eu and TennisScoresToday both have NEW CH tracking — we have the data (careerHigh in codebase from UTS) but not the visual indicator. DISTINCTIVENESS: NEW CH! badges = visual storytelling (who's surging?). EFFORT: Medium (4-6 hours — add temporal tracking, badge UI, 7-day persistence). IMPACT: High retention driver (8/10) — creates 'comeback tomorrow' motivation. SCALABLE: Once built for tennis, can extend to cycling UCI rankings.
