---
id: premium-table-hover-microinteractions
status: open
deps: []
links: []
created: 2026-08-16T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, ux, premium]
---
# Premium table hover micro-interactions (address "generic/corporate" audit finding)

**AUDIT FINDING (Aug 16):** Live ATP page audit found tables "generic and corporate...functional but uninspired...flat aesthetic typical of sports databases rather than aspirational platforms." Zero micro-interactions, zero hover depth.

**Why now:** Tables are 70%+ of site content (ATP Live, WTA Live, doubles, cycling). Generic tables = generic site perception. Awwwards winners (Noomo 8.60/10, Spotify Wrapped Party) use sophisticated hover states — smooth transitions, atmospheric glows, subtle transforms.

**ROI:** Premium table UX = longer engagement. Digital Silk research: "microinteractions...help users process information faster" by confirming interactive areas. Cleo AI (Awwards May 2026, Developer Award) won for "animated transitions between data states" making financial data feel premium vs spreadsheet.

**Pattern:** Row hover = subtle glow + gentle lift + accent line (left edge) — atmospheric, premium, signals interactivity without being distracting.

## Acceptance Criteria

- Row hover treatment: (1) Background shifts from transparent to accent/5 (subtle tint), (2) Accent border-left: 3px solid accent appears with 150ms ease-out, (3) Box-shadow adds: 0 2px 8px accent/10 (gentle lift), (4) Transform: translateY(-1px) scale(1.002) for subtle elevation
- Smooth transitions: all hover effects 200ms cubic-bezier(0.4, 0.0, 0.2, 1) — feels responsive, premium, not instant/jarring
- Rank number on hover: scales 1.05× + color shifts from muted to accent (150ms) — reinforces interactivity
- Points differential (+13, -5) on hover: subtle glow effect (text-shadow: 0 0 8px accent/40) fades in over 200ms
- Active row (if clickable): stronger accent/8 background + border-left: 4px + shadow intensifies (0 3px 12px accent/15)
- Stagger effect on initial page load: rows fade in + slide up with 30ms delay between each (creates cascading entrance, premium feel) — max 20 rows stagger to avoid long waits
- Mobile touch states: tap shows accent/10 background flash (200ms) then fades — no hover on touch, uses :active state
- Performance: hover uses transform + opacity (GPU-composited), no layout reflow, test scrolling 1000-row table at 60fps
- Apply to: LiveRankingTable (ATP/WTA), doubles tables, cycling GC table
- Respect prefers-reduced-motion: remove transforms + stagger, keep color/shadow only
- Document in globals.css or table component styles: .table-row-hover, .table-row-active classes
