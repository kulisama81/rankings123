---
id: nav-accent-strengthen
status: open
deps: []
links: []
created: 2026-06-21T12:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, ui, brand]
---
# Strengthen nav accent visibility (per-sport color identity)

Live site audit revealed "no visible color differentiation between sports categories" — the per-sport accent system exists but isn't prominent enough in navigation. Make active nav tabs more visually distinct with stronger accent color application: underline, glow, or filled background. Goal: immediate visual signal of which sport you're viewing (ATP=lime, WTA=magenta, World Cup=green).

## Acceptance Criteria

- Active nav tab has stronger accent treatment (not just subtle border)
- Options: accent underline (3–4px), filled background (bg-accent/10 + border-accent), or glow effect
- Inactive tabs clearly recede (muted, no accent)
- Hover state reinforces accent (preview of active state)
- Applied to: main nav (ATP/WTA/World Cup), sport switcher, sub-nav (if added)
- Works in dark + light + all 3 design variants
- Mobile: same accent strength (important for small screens)
- Verified with real users: "Can you tell which sport you're viewing at a glance?" = YES

## References

- Live audit: "monochromatic presentation misses opportunities"
- Apple Sports app: bold active tab treatment
- Current per-sport accent system (DESIGN-IDENTITY.md)
