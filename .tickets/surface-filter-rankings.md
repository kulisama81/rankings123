---
id: surface-filter-rankings
status: open
deps: []
links: []
created: 2026-08-09T13:49:00Z
type: feature
priority: 1
parent: rankings123
tags: []
---
# Surface filter for rankings (Clay/Hard/Grass/Carpet) — engagement driver

Add surface-specific performance filters to ATP/WTA live ranking pages. TennisRatio, Ultimate Tennis Statistics, and Tennis Abstract all offer advanced surface filtering — users want to see 'who's the best on clay' separate from overall ranking. This is a key engagement feature that keeps users exploring vs bouncing after viewing one table.

## Acceptance Criteria

- ATP/WTA ranking pages have surface filter dropdown: All (default) | Clay | Hard | Grass | Carpet
- Selecting a surface re-ranks players by their performance on that surface (win%, titles, or surface-specific points if available)
- Filter state persists in URL query param (?surface=clay) for shareability
- Filter works client-side (no page reload) with smooth transition
- Mobile-friendly filter UI (dropdown or segmented control)
- Shows player count per surface (e.g., 'Clay: 247 players ranked')
- Surface badge/indicator shown in filtered view
- npm run build green, eslint clean, Core Web Vitals pass

## Notes

**2026-08-09T13:49:14Z**

ROI JUSTIFICATION (First Principles):

Engagement = keeping users on site exploring data. Base ranking table = one pageview, user leaves. Surface filter = user explores 4 surfaces × 2 tours = 8 additional views = 8× ad impressions + lower bounce rate.

Tennis is SURFACE-DEPENDENT. Djokovic dominates hard courts, Nadal owns clay, grass is a different game. Fans want to know 'who's best on X surface' — this is a common search query and conversation topic. Offering this filter = answering a real user question that generic ranking sites miss.

EFFORT: MEDIUM (4-6 hours) — need surface performance data (win%, titles per surface) or compute from match results. Client-side filter logic is straightforward.

IMPACT: HIGH — engagement multiplier (1 → 8 pageviews), differentiator vs basic ranking sites, serves real user intent.

ROI: 9/10 — surface filtering is a proven engagement pattern on TennisRatio, Tennis Abstract.

COMPETITORS WITH THIS:
- TennisRatio ✅ (advanced surface filters)
- Ultimate Tennis Statistics ✅
- Tennis Abstract ✅
- Live-tennis.eu ❌ (we can differentiate here)
- FlashScore ❌

DIFFERENTIATION OPPORTUNITY: Live-tennis.eu does NOT have surface filters. This is a Phase 2 feature that can help us surpass them in engagement.
