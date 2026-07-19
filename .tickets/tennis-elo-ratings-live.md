---
id: tennis-elo-ratings-live
status: open
deps: []
links: []
created: 2026-07-19T13:49:12Z
type: feature
priority: 2
parent: rankings123
tags: [tennis, differentiation, engagement, stats]
---
# Tennis Elo ratings integration (live skill-based rankings)

Integrate live Elo ratings for ATP/WTA players as an alternative/complementary view to official point-based rankings. Sources: Tennis Abstract, Ultimate Tennis Statistics, or TenELOs APIs. Display Elo rating alongside official ranking, show surface-specific Elo (hard/clay/grass), and use Elo for match predictions. Differentiating feature: traditional ranking sites (live-tennis.eu) don't show Elo, but betting sites do — this bridges the gap.

## Acceptance Criteria

- Elo ratings displayed on /atp-live and /wta-live tables (optional column or toggle)
- Surface-specific Elo ratings available (hard, clay, grass, overall)
- Match prediction feature using Elo ratings (if 2 players face off, show win probability)
- Source attribution + fallback to no-Elo if feed fails
- Data sourced from Tennis Abstract, UTS, or TenELOs (keyless/public API or scraping)

## Notes

**2026-07-19T13:49:20Z**

**ROI Justification (first-principles):**
- **User need:** Bettors and serious fans want skill-based rankings (Elo) not just points-based (official). 'Who's better RIGHT NOW at this surface?'
- **Differentiation:** NO traditional ranking site (live-tennis.eu, live-ranking.com) shows Elo. Betting sites do, but they don't have live rankings. We'd be the ONLY live-ranking + Elo hybrid.
- **Revenue driver:** Betting affiliate context — Elo-based predictions = betting value, attract bettors
- **Engagement:** Advanced stats = longer sessions, return visits from 'serious fan' segment
- **Competitive moat:** Hard to copy quickly (requires multi-source data integration + surface-specific logic)

**Why Elo matters:** Official rankings reward tournament prestige (Grand Slam = more points). Elo rewards who you beat. A player ranked #20 with Elo #8 is 'undervalued' — betting edge. We surface that edge.
