---
id: podium-trophy-micro-interactions
status: open
deps: []
links: []
created: 2026-07-12T07:40:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, engagement, polish]
---
# Podium trophy micro-interactions (top 3 celebration)

Special animations and micro-interactions for top 3 ranks (gold/silver/bronze podium positions). Subtle trophy icon pulse, rank badge glow, celebratory sparkle on hover/focus. Makes podium positions feel special and memorable.

## Acceptance Criteria

- Top 3 ranks get enhanced visual treatment:
  - Rank #1: Gold badge with subtle pulse animation + trophy icon ✨
  - Rank #2: Silver badge with softer glow
  - Rank #3: Bronze badge with warm accent
- Hover/focus triggers micro-interaction:
  - Trophy icon scales up slightly (1.05x)
  - Rank badge glows brighter (opacity pulse)
  - Subtle sparkle effect (CSS or SVG, GPU-cheap)
- Works on: LiveRankingTable (ATP/WTA top 3), AtpDeepRankingTable, WorldCupTable (group leaders)
- Respects prefers-reduced-motion (no animation, static trophy)
- Dark + light theme support (colors adjust for contrast)
- Performance: transform/opacity only, no layout thrashing

## ROI

Premium polish that makes top ranks feel special — differentiation from competitors (live-tennis.eu has no podium treatment). Quick win (~2h), delight factor, reinforces "designed product people remember" identity. Aligns with trophy/medal semantic colors already in design system.

## References

- Current trophy color (#d4af37 gold) in design tokens
- Award-winning sports apps: Apple Sports (podium positions highlighted)
- 2026 micro-interaction trend: purposeful, minimalist animations
