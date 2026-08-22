---
id: skeuomorphic-depth-selective
status: closed
deps: []
links: []
created: 2026-08-16T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, premium, differentiation]
---
# Selective skeuomorphic depth treatment (2026 Clay guidance)

**NEW RESEARCH (Aug 16):** Clay "Skeuomorphism Design Best Practices for 2026" (Aug 3, now accessible) provides guidance on selective depth application. Modern skeuomorphism = purposeful dimensional details on key UI moments, NOT flat everywhere.

**Why now:** Rankings123 currently uses flat design universally. Selective depth on hero moments (rank badges, sport icons, primary CTAs) creates premium feel while maintaining scannability. Clay's "depth goes on icons, hero moments, and primary actions, while dense screens stay flat" is the exact pattern for a data-dense rankings site.

**ROI:** Premium aesthetic differentiation vs live-tennis.eu's completely flat design. Luxury sports apps (Apple Sports) use subtle depth to signal quality. Awwwards data viz winners scored 7.5+ using selective depth treatments.

**Design principle:** "Every dimensional detail should transfer knowledge" — depth signals importance (top 3 podium ranks get depth, rank 50 stays flat).

## Acceptance Criteria

- Apply soft shadows with large blur radii (12-20px) to: rank badges #1-3 (podium), sport icons in nav/hero, primary CTAs ("View Full Rankings"), live status badges
- Implement consistent top-left light source (135deg) across all depth effects for visual coherence
- Keep data tables, toolbars, settings FLAT with max 2px subtle borders (no shadows)
- Use CSS gradients + SVG noise for texture (zero bitmap images) — test on mid-range device, no dropped frames
- Add gentle specular highlights (linear-gradient with white/10% opacity at top edge) to depth-treated elements
- WCAG AA contrast verified on all depth-treated surfaces in both dark + light themes
- Focus states remain visible on dimensional elements (2px solid accent ring)
- Add to 3 key areas: (1) Podium rank badges in tables, (2) SportIcon component in nav/hero, (3) Live status badges
- Mobile: depth effects scale down proportionally (8-12px blur on small screens vs 12-20px desktop)
- Performance budget: depth effects add max 5ms to paint time (measure via Chrome DevTools)
- Document depth system in globals.css with utility classes: .depth-podium, .depth-icon, .depth-badge
