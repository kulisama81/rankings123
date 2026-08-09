---
id: immersive-match-viz-3d
status: open
deps: []
links: []
created: 2026-08-09T00:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, engagement, premium, experimental]
---
# Immersive 3D match data visualization (WC Data Portraits pattern)

Awwwards "WC 2026 — Data Portraits" (Aug 2026): Award-winning approach transforms ~1,500 match events into explorable 3D terrain using WebGL/Three.js + GLSL. Reviewer scores averaged 7.5+ for creativity. Solo developer execution shows it's achievable.

**Why award-worthy:** Novel visualization makes complex match dynamics immediately comprehensible — visitors intuitively understand match progression by navigating terrain shaped by actual game events. Data becomes visceral and memorable vs static tables.

**Application to rankings123:** Create an experimental immersive view for completed World Cup/Grand Slam matches. Each match event (goal, break point, set) becomes a 3D terrain feature. Goal: differentiate from every commodity rankings site with a signature data-viz experience people screenshot and share.

**Constraints:** Optional enhancement (toggle to table view), performance-gated (GPU detection), mobile gets simplified 2.5D version.

## Acceptance Criteria

- Prototype 3D match visualization for ONE completed World Cup Final match using Three.js + real match event data
- Match events (goals, shots, possession phases) mapped to 3D terrain height/color/density
- Camera controls: orbit/pan/zoom to explore match "landscape"
- Performance: 60fps on desktop GPU, graceful degradation (show table fallback on low-end devices)
- Mobile: simplified 2.5D version with touch gestures OR table-only fallback
- Toggle between 3D viz and traditional table view (accessibility escape hatch)
- Loads async (doesn't block page render), shows skeleton while loading
- Data-driven: no fabricated geometry, every terrain feature traces to real event
- Respects prefers-reduced-motion (disable 3D, show table only)
- Add as experimental "/world-cup/final-2026-viz" route, link from main final page with "Experimental 3D View" badge
