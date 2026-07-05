---
id: scroll-reveal-parallax
status: open
deps: []
links: []
created: 2026-07-05T07:33:00Z
type: feature
priority: 3
parent: rankings123
tags: [design]
---
# Scroll-triggered reveals and parallax hero system

## Problem
No scroll-based interactivity — all content is immediately visible and static. Premium sports sites (Awwwards nominees) use parallax and scroll reveals to create depth and guide attention. Current hero gradient orbs are static; they could move subtly on scroll for added dimension.

## Solution
Implement two scroll effects:
1. **Parallax hero elements**: Gradient orbs in `HeroBanner` move at 0.3x scroll speed (subtle depth)
2. **Scroll-triggered reveals**: Cards/sections below fold fade-up when they enter viewport (IntersectionObserver, 10% threshold)

## Acceptance Criteria
- [ ] Hero gradient orbs parallax on scroll (slower than content scroll, creates depth)
- [ ] Sections below fold (e.g., sport cards, footer) reveal with fade-up when entering viewport
- [ ] IntersectionObserver with 10% threshold (reveals just before fully in view)
- [ ] Once revealed, elements stay visible (no re-hiding on scroll up)
- [ ] Respects `prefers-reduced-motion` (no parallax, instant reveals)
- [ ] GPU-efficient (transform: translateY only)
- [ ] Smooth 60fps on mobile (test on real iOS/Android devices)

## Technical Notes
- Use `IntersectionObserver` for reveals (better perf than scroll listeners)
- Parallax: `transform: translateY(scrollY * -0.3)` on hero orbs only
- Limit parallax to hero only (too much everywhere = gimmicky)

## ROI
Medium effort (~3-4h) for high visual impact. Adds signature premium feel aligned with Awwwards-level sports sites. Creates sense of depth and guides user attention down the page.
