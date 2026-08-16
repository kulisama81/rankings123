---
id: atmospheric-gradient-transitions
status: open
deps: []
links: []
created: 2026-08-16T00:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, motion, premium]
---
# Atmospheric gradient transitions for live data updates (2026 trend)

**NEW RESEARCH (Aug 16):** Fontfabric 2026 trends: "Gradients are no longer just backgrounds...shifted weather" and "soft, cinematic gradients signal focus." For live rankings, this means animated atmospheric transitions when data updates — not jarring color changes, but weather-like gradient shifts.

**Why now:** Rankings123 polls data every 20s (tennis) to 5min (ranks). Currently updates are instant/jarring. Atmospheric transitions make updates feel organic, premium, alive — the "living design" signature from DESIGN-IDENTITY.md.

**ROI:** Noomo Showcase (Awwwards Aug 1, 8.60/10) won Developer Award for sophisticated GSAP transitions creating "immersive" feel. Smooth atmospheric updates = perceived quality lift without content changes. Reinforces "live data, living design" brand idea.

**Technical approach:** CSS custom properties + Framer Motion for gradient position/opacity animation (GPU-accelerated, performance-safe).

## Acceptance Criteria

- Create 3 atmospheric gradient states for live data: (1) Idle = subtle radial accent gradient 20% opacity, (2) Updating = gradient animates outward (scale 1.0 → 1.4) + opacity pulses 20% → 35% over 800ms, (3) Updated = gentle glow settles back to idle over 600ms ease-out
- Apply to: RankShowcase (already has accent gradient, enhance with animation), LiveNowWidget, and top 3 rows of ranking tables when their data changes
- Use CSS custom properties for gradient position: --gradient-x, --gradient-y animated via Framer Motion (GPU transform, no layout reflow)
- "Shifted weather" palette per sport: ATP = lime (#b6f23c) to yellow-green, WTA = magenta (#f472b6) to pink, WorldCup = green (#22c55e) to teal (creates color depth vs flat single hue)
- Smooth cross-fade between gradient states: 400ms cubic-bezier(0.4, 0.0, 0.2, 1) — feels cinematic, not mechanical
- Respect prefers-reduced-motion: gradients remain static, only opacity changes (no scale/position animation)
- Performance budget: gradient transitions use transform + opacity only (GPU-composited), max 2-3 active animations simultaneously
- Add visual cue on data refresh: subtle shimmer sweep (1s linear-gradient position shift) before atmospheric settle
- Mobile: gradients scale to 80% intensity (less blur, lighter opacity) to preserve battery
- Test with live data polling on: RankShowcase (5min poll), ATP Live table (20s poll)
- Document in globals.css: @keyframes atmospheric-update, .gradient-idle, .gradient-updating
