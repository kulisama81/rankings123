---
id: sport-hero-imagery
status: in_progress
deps: []
links: []
created: 2026-07-12T07:55:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, brand, visual]
---
# Sport hero imagery system (replace emojis with photography)

Replace emoji icons (🎾🏆🇦🇷) with real sport photography + cohesive icon system. Hero sections get high-quality sport imagery (tennis court, World Cup stadium, cycling peloton), nav/UI icons use custom SVG glyphs. Moves from "functional" to "memorable" visual identity.

## Acceptance Criteria

- Hero sections: sport-specific background imagery (subtle, not overwhelming)
  - ATP/WTA: tennis court texture or action shot (green/clay court)
  - World Cup: stadium atmosphere or pitch close-up
  - Cycling: peloton or mountain stage panorama
- Custom SVG icon set replaces emojis:
  - Sport glyphs: tennis racket, soccer ball, bike (line icons, not emoji)
  - UI icons: trophy, arrow, filter, theme toggle (cohesive style)
- Flag icons: use SVG flag sprites (not emojis) for player countries
- Typography hierarchy preserved: imagery supports data, never obscures it
- Performance: WebP/AVIF images, lazy-loaded below-the-fold, < 150KB total per page
- Dark + light theme support (imagery adapts via opacity/blend-mode)
- Respects Core Web Vitals: no LCP regression, no layout shift

## ROI

Final step in visual maturity — moves from "clean template" to "designed product people remember." Real sport photography + cohesive icons elevate premium feel. Medium effort (~5-6h sourcing imagery + icon design), high brand impact. Award-winning sports sites (Awwwards) all use real photography, not emojis.

## References

- Unsplash/Pexels: free high-quality sport photography
- Heroicons/Lucide: cohesive icon system inspiration
- Award-winning sports sites (day one® Run, Balmoral): photography-driven design
- Current emoji usage: 🎾🏆🇦🇷 (functional but not premium)
