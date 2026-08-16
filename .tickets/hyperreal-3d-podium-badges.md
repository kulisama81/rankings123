---
id: hyperreal-3d-podium-badges
status: open
deps: []
links: []
created: 2026-08-16T00:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, premium, experimental]
---
# Hyperreal 3D badges for podium ranks #1-3 (2026 material depth trend)

**NEW RESEARCH (Aug 16):** Fontfabric 2026 trends: "Hyperreal 3D...glass, liquid, metal and lighting" for premium UI elements. Digital Silk minimalism trends: "bold accents" (one dramatic pop of color) create luxury feel. Rankings123 opportunity: hyperreal 3D badges ONLY for podium positions #1-3 (gold/silver/bronze) — creates trophy-like premium feel.

**Why now:** Current rank badges are flat colored circles. Top 3 = special achievements (podium finishers) and deserve trophy-level treatment. Apple Sports uses subtle 3D depth on score cards; Awwwards winners use glass/metal for premium tier indicators.

**ROI:** Luxury differentiation — live-tennis.eu has zero visual celebration of top ranks. Hyperreal podium badges = screenshot-worthy, shareable moments. Clay guidance: depth should "transfer knowledge" — 3D badges signal "this rank is special."

**Technical:** CSS gradients (glass), backdrop-blur (depth), box-shadow layering (lighting), SVG noise (material texture). Zero WebGL/heavy 3D libs.

## Acceptance Criteria

- Create 3 hyperreal badge variants: (1) Gold #1 = metallic gold gradient (#d4af37 to #f9e076) + warm glow, (2) Silver #2 = chrome gradient (#c7cdd6 to #e8ecf1) + cool shimmer, (3) Bronze #3 = copper gradient (#d08b5b to #e6a875) + amber glow
- Apply glass morphism: backdrop-blur(8px) + semi-transparent bg (rgba with 15-20% opacity) + subtle white gradient overlay (10% at top edge for specular highlight)
- Lighting system: 3 layered box-shadows per badge = (1) outer glow (accent color, 12px blur, 40% opacity), (2) depth shadow (black, 4px blur, 20% opacity, offset 0 2px), (3) inner highlight (white, inset, 1px blur)
- Material texture: SVG noise pattern (3-5% opacity) as background-image for subtle grain — feels tactile vs flat digital
- Micro-interaction: hover scales badge 1.05× + intensifies glow (800ms opacity 40% → 60%) — gentle, premium, not jarring
- Apply ONLY to rank #1-3 in: ATP Live table, WTA Live table, ATP Doubles, WTA Doubles, RankShowcase component
- Rank #4+ stay flat colored circles (maintains hierarchy — podium = special)
- Mobile: reduce blur radius 50% (4px backdrop-blur) and simplify to 2 shadows (outer glow + depth) for performance
- Dark + light theme variants: adjust gradient lightness (dark mode = deeper tones, light mode = brighter metallics) while maintaining gold/silver/bronze identity
- Accessibility: badges are decorative (rank number is real content), aria-hidden="true" on badge wrapper
- Performance: CSS-only (no JS), GPU-composited (transform/opacity), test on mid-range device
- Document in globals.css: .badge-gold-3d, .badge-silver-3d, .badge-bronze-3d with full shadow/gradient/blur system
