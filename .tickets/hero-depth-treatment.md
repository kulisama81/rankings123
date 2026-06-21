---
id: hero-depth-treatment
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, ui, engagement]
---
# Hero sections 3D depth & layered gradients

Elevate HeroBanner and landing page SportCards with subtle 3D depth treatments inspired by Awwwards World Cup 2026 site: layered gradient washes, CSS transform-based parallax/depth, stacked accent glows. Goal: more visual richness without sacrificing performance or obscuring data. Use GPU-cheap transforms only.

## Acceptance Criteria

- HeroBanner has enhanced depth via layered gradients (2–3 layers max)
- Subtle 3D transform effects on hover/scroll (translateZ, perspective, or layered blur)
- SportCards on homepage gain hover depth treatment (lift + glow, not flat)
- No CWV regression (LCP still <2.5s, no layout shift)
- GPU-efficient (transform/opacity only, no width/height animations)
- Respects prefers-reduced-motion (depth effects disabled)
- Works in dark + light, all per-sport accents

## References

- Awwwards: World Cup 2026, simplified (colorful + 3D + clean)
- Current HeroBanner gradient (expand on this)
- SportCard hover state (already has subtle translate, can amplify)
