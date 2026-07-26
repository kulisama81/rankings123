---
id: kinetic-number-reveals
status: open
deps: []
links: []
created: 2026-07-26T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, engagement, premium]
---
# Kinetic number reveals — bold typography 2026 trend

Figma 2026: "Bold typography" and "kinetic lettering" for impact. Apply to live rankings: when rank/score updates, numbers don't just change — they REVEAL with motion. Staggered digit flip (odometer style), scale pulse on change, color flash. Goal: make live data updates FEEL live and exciting, not passive.

Current: AnimatedNumber component does basic count-up. 2026 bar: kinetic, athletic reveals that celebrate data changes. Think Apple keynote number drops, SofaScore live score pop.

## Acceptance Criteria

- Digit flip animation for rank changes: each digit flips independently (staggered 40ms), odometer/slot-machine style
- Scale pulse on update: number scales to 1.15x for 200ms, then back to 1.0 (spring easing)
- Color flash: new value shows in accent color for 300ms, then fades to default text color
- Sound off by default, optional tap-to-enable subtle "tick" sound on flip (accessibility consideration)
- Component: `<KineticNumber value={rank} format="rank" />` — handles single/double/triple digit logic
- Formats: `rank` (integer, left-pad), `score` (decimal, tabular-nums), `percent` (with % symbol)
- Stagger calculation: `delay = digitIndex * 40ms` for multi-digit (e.g. rank 127 → 1 flips, then 2, then 7)
- Respect `prefers-reduced-motion`: instant update, no flip/scale/flash
- GPU-efficient: `transform` and `opacity` only, 60fps maintained
- Apply to: ranking tables (rank column), live scores, stat badges, countdown timers
- Spring physics easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for bounce feel
- Example: Djokovic rank changes 3→2 → "2" digit flips in, scales 1.15x, flashes lime accent, settles
