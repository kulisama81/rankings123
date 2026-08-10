---
id: 3d-depth-micro-effects
status: closed
deps: []
links: []
created: 2026-07-26T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, engagement, premium]
---
# 3D depth micro-effects — premium 2026 pattern

Figma 2026 trends: "3D and immersive elements" differentiate premium sites. Awwwards winners use subtle 3D transforms (not heavy WebGL) for depth. Apply to rankings123: cards tilt on hover (3-5deg rotate), rank badges have layered depth (box-shadow + transform), podium positions scale/elevate on interaction. Goal: tactile, premium feel without performance cost.

Current state: Flat 2D cards with simple hover translate. 2026 bar: Nike, IKEA, Spotify use 3D to create presence. Rankings123 needs signature 3D moments — not gimmicky, but refined depth cues that say "this is a designed product."

## Acceptance Criteria

- Sport cards on homepage: `transform: perspective(1000px) rotateY(2deg)` on hover (tilt toward cursor)
- Rank badges #1-3: layered box-shadow (`0 4px 8px, 0 8px 16px`) + `translateZ(4px)` effect on hover
- Live pulse dot: 3-layer depth (outer glow, mid ring, inner solid) with staggered z-index
- Hero banner: parallax depth — background texture moves slower than foreground content on scroll
- Table rows: subtle lift on hover (`transform: translateZ(2px)` equivalent via shadow)
- GPU-only transforms (`transform`, `opacity`) — no layout-shifting properties
- Respect `prefers-reduced-motion`: disable all 3D, flat interaction only
- Performance budget: no CLS, LCP < 2.5s maintained
- Test on Safari (3D transform support), Firefox, Chrome
- Add `.transform-3d` utility class to globals.css with vendor prefixes

## Closed in backlog triage 2026-08-10
stale: speculative polish
