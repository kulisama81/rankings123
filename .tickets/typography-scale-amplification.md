---
id: typography-scale-amplification
status: open
deps: []
links: []
created: 2026-06-21T12:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, ui, brand]
---
# Amplified typographic scale (whisper-to-shout hierarchy)

Establish more dramatic type scale contrast: rank 1 is HUGE, rank 50 is smaller, metadata whispers. Current scale is functional but safe — push bolder hierarchy to guide eye to what matters (top ranks, live scores, big movers). Per DESIGN-IDENTITY.md evolution goal: "whisper-to-shout typographic rhythm."

## Acceptance Criteria

- Refined type scale defined in globals.css @theme tokens
- Rank numbers: top 3 larger (3xl–4xl bold), 4–10 medium (2xl), 11+ standard (xl)
- Player names: proportional to rank (top 3 bolder, larger tracking)
- Live scores/differentials: oversized when hero data (2xl–3xl in HeroBanner)
- Section labels: small caps, tracked, muted (recede so data pops)
- Applied to: LiveRankingTable, AtpDeepRankingTable, WorldCupTable, player pages
- Maintains scannability (hierarchy aids reading flow, doesn't hinder)
- Works across dark/light + all 3 design variants
- No mobile truncation issues (test on iPhone SE width)

## References

- DESIGN-IDENTITY.md: "whisper-to-shout typographic rhythm"
- Apple Sports app: bold data, small metadata
- ESPN scoreboards: score dominates, team names secondary
