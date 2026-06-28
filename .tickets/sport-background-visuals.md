---
id: sport-background-visuals
status: open
deps: []
links: []
created: 2026-06-28T14:32:22Z
type: feature
priority: 2
parent: rankings123
tags: [design]
---
# Sport background imagery & visual moments system

Add subtle, distinctive background imagery or visual treatments to sport pages (not just text/data). Examples: subtle tennis court texture on ATP/WTA, pitch pattern on World Cup, cycling road motif. Should be SUBTLE (not distracting), theme-aware (dark/light), and per-sport.

## Acceptance Criteria

- Each sport page has a distinctive background treatment or hero imagery
- Visuals are subtle, never obscure data (data stays the hero)
- Implemented via CSS/SVG (no heavy images; <50KB total)
- Works in dark + light themes + all 3 design variants
- No CWV regression (LCP stays <2.5s)
- Passes accessibility contrast checks (WCAG AA)
