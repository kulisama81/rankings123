---
id: cognitive-load-homepage-ia
status: closed
deps: []
links: []
created: 2026-08-02T00:00:00Z
type: feature
priority: 1
parent: rankings123
tags: [design, homepage, ux, retention]
---
# Reduce cognitive load — homepage information architecture

**Clay cognitive load research (Jul 28, 2026):** Sites with redundant sections and unclear hierarchy cause cognitive overload → users leave. Rankings123 audit shows "What's Live Now" carousel and "All Sports" grid present similar content in different formats, forcing users to scan multiple sections for the same information.

**Impact:** Every redundant choice adds cognitive load. Research from Nielsen Norman Group shows reducing choices directly increases task completion rates.

## Acceptance Criteria

- Single unified sports section replaces carousel + grid duplication
- 3-tier hierarchy: LIVE (prominent, top), UPCOMING (mid), OFF-SEASON (compact, below fold)
- Filter/sort controls at section top (All, Live Only, By Sport Type)
- Skeleton loading states during data fetch (no layout shift)
- Mobile: vertical stack, LIVE events full-width
- Measured via session recording: fewer back-navigations, reduced scroll depth to find content
- WCAG AA contrast maintained in all states

## Changes

- Consolidate "What's Live Now" and "All Sports" into single prioritized section
- Clear visual hierarchy: LIVE events at top (larger, animated), off-season sports below (smaller, muted)
- Remove redundant navigation paths — one clear way to reach each sport
- Progressive disclosure: show top 3-5 sports initially, "View all sports" expansion
- Distinct visual treatment per state: LIVE (pulse, accent glow) vs UPCOMING (countdown) vs OFF-SEASON (muted, reduced size)

## References

- Clay Blog: "Cognitive Load: Hidden Reason Users Leave Your Website" (Jul 28, 2026)
- Nielsen Norman Group: reducing cognitive load increases task completion
- Current metrics: homepage bounce 70% (partially addressed by homepage-live-urgency-overhaul but IA redundancy remains)
