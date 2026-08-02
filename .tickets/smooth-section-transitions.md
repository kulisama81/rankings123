---
id: smooth-section-transitions
status: open
deps: links: []
created: 2026-08-02T00:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, animation, polish, premium]
---
# Smooth page and section transitions

**Noomo Showcase (Awwwards Aug 1, 2026):** Earned Developer Award (8.60/10) through sophisticated GSAP-powered transitions — immersive scroll, 3D project previews, preloader reveals. Creates cohesive experience where navigation feels choreographed, not jarring.

**Rankings123 gap:** Pages load instantly (good perf) but feel abrupt. No transition between ATP → WTA → World Cup navigation. Tables appear immediately without reveal. Lacks premium polish of award-winning 2026 sites.

## Transition Patterns

1. **Page transitions:** Fade-out current content (150ms) → route change → fade-in new (200ms stagger)
2. **Hero reveals:** On page load, hero animates in from opacity 0 + translateY(-20px), 400ms ease-out
3. **Table row stagger:** Rows fade in sequentially (20ms offset per row, max 10 rows), creates "data populating" feel
4. **Sport switching:** When changing sport (ATP→WTA), accent color morphs via CSS transition (300ms)
5. **Scroll-triggered reveals:** Section headers + cards fade in when scrolling into viewport (Intersection Observer)

## Technical Approach

- Use Framer Motion (already in dependencies) for page transitions
- CSS-only transitions for hover/focus states (performance)
- Intersection Observer for scroll-triggered reveals (no heavy GSAP library needed initially)
- Respect `prefers-reduced-motion`: disable all transitions, instant content appearance
- Mobile: faster transitions (200ms vs 400ms desktop), reduced translate distances

## Acceptance Criteria

- Page navigation includes subtle cross-fade (ATP → WTA feels connected, not page reload)
- Hero on each sport page animates in: fade + slide from top, 400ms ease-out
- Ranking table rows stagger in: first 10 rows visible @ 20ms intervals (200ms total), rest instant
- Accent color transitions smoothly when switching sports: 300ms ease-in-out
- Scroll-triggered: section headers fade in when entering viewport (once per session, no repeat)
- Settings: "Reduce Motion" toggle overrides all transitions (or respects system preference)
- Performance: no jank, 60fps maintained, transitions are GPU-accelerated (transform/opacity only)
- Mobile: reduced motion by default (battery/performance), opt-in for full transitions

## References

- Noomo Showcase (Awwwards Aug 1, 2026): GSAP + Three.js transitions, 8.60/10 developer score
- Framer Motion for React: production-ready, tree-shakeable, performant
- Site audit: "Lacks sophisticated data visualization, no micro-interactions" — this addresses motion gap
