---
id: icon-system
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, ui, brand]
---
# Cohesive sport & UI icon set (replace emoji)

Move from emoji icons (🏆🎾🚴) to a cohesive, designed icon system for sports glyphs and UI elements. Icons should match the Archivo/Apple Sports aesthetic: bold, geometric, line-based or filled. Use consistent stroke weight, corner radius, and sizing. Apply to: sport badges, nav, hero banners, empty states.

## Acceptance Criteria

- Icon set created (SVG) for: tennis, football, cycling, trophy, live indicator, up/down arrows
- UI icons for: theme toggle (sun/moon), design switcher, filter, search, close
- Consistent style: stroke weight 2–2.5px, rounded caps, geometric
- Works as inline SVG or icon component (accessible with aria-label)
- Sized appropriately: 16px (inline), 24px (UI), 32–48px (hero)
- Maintains legibility in dark + light themes (stroke uses currentColor or accent)
- Applied across: Nav, HeroBanner, SportCard, section headers

## References

- Apple Sports app icons (bold, clean, sporty)
- Heroicons, Lucide, Phosphor (style inspiration, not direct use)
- Current emoji usage: 🏆 (trophy), 🎾 (tennis), 🚴 (cycling) — replace with SVG
