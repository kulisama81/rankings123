---
id: ambient-gradient-pulse
status: closed
deps: []
links: []
created: 2026-07-05T07:34:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, motion]
---
# Ambient gradient pulse system (breathing backgrounds)

## Acceptance Criteria

- [ ] Body radial gradient pulses opacity slowly (6-8s ease-in-out loop, 0.08 to 0.12)
- [ ] Hero gradient orbs slowly translate position (10-20px over 8s, infinite alternate)
- [ ] On data refresh (rankings update), accent gradient briefly flashes brighter (200ms)
- [ ] All animations use GPU-cheap properties (opacity, transform only)
- [ ] Respects `prefers-reduced-motion` (all animations disabled)
- [ ] No janky scrolling or layout shift
- [ ] Subtle enough to not distract from data (data is always the hero)
- [ ] Works across all themes (dark/light, all 3 design variants)

## Problem

Current site has static radial gradient on body (subtle, good) but no ambient motion. Award-winning sports sites (day one® Run, Awwwards nominees) use subtle animated gradients that create a "breathing" premium feel. Current gradient orbs in hero are static.

## Solution

Add **subtle pulsing/shifting gradients** that create ambient motion:
1. **Body background gradient**: Very slow radial gradient pulse (6-8s loop, opacity shift from 0.08 to 0.12)
2. **Hero gradient orbs**: Slow position shift (translate 10-20px over 8s, infinite alternate)
3. **Accent color shift**: When data updates (new rankings refresh), accent gradient briefly intensifies (200ms flash)

All motion is VERY subtle — barely perceptible, creates "breathing" feel without distraction.

## Design Notes

- Use CSS animations (no JS, better perf)
- Keyframes:
  ```css
  @keyframes pulse-bg { 0%, 100% { opacity: 0.08; } 50% { opacity: 0.12; } }
  @keyframes drift { 0% { transform: translate(0, 0); } 50% { transform: translate(10px, 15px); } 100% { transform: translate(0, 0); } }
  ```
- Apply to existing gradient elements, don't add new DOM nodes

## ROI

Low-medium effort (~2h) for subtle premium polish. Creates "living design" signature feel aligned with DESIGN-IDENTITY.md. Differentiates from static competitor sites. Very low risk (easily tuned or removed if too distracting).

## Closed in backlog triage 2026-08-10
stale: speculative polish
