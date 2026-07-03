---
id: cycling-completed-races
status: open
deps: []
links: []
created: 2026-07-03T13:54:46Z
type: feature
priority: 1
parent: rankings123
tags: [cycling]
---
# Cycling: Show Giro 2026 + Tour de Suisse final results (fix 100% bounce)

Add final GC standings for completed 2026 races (Giro d'Italia, Tour de Suisse). Analytics show cycling event pages have 100% bounce — users land and immediately leave because there's no content.

FIRST PRINCIPLES: Completed races = SEO long-tail ('Giro 2026 results', 'Vingegaard Giro win') + reference utility (users bookmark final standings). 100% bounce = zero value delivered.

Current state:
- /cycling shows ONLY Tour de France 2026 (upcoming)
- Giro 2026 FINISHED May 31 (winner: Vingegaard) — missing
- Tour de Suisse 2026 FINISHED June 21 — missing
- Analytics: /events/giro-2026 = 100% bounce, /events/vuelta-2026 = 100% bounce

Implementation:
- Add Giro 2026 final GC (top 20) to /events/giro-2026
- Add Tour de Suisse final GC to /events/tour-de-suisse-2026
- Mark as 'Completed' with date range
- Wire Wikipedia API (pattern: getTdfSnapshot) or fallback to static final results
- Show on /cycling calendar as completed races

Data sources: Wikipedia API for Giro/Suisse (same pattern as TdF), or static final results if API unavailable

## Acceptance Criteria

- /events/giro-2026 shows final GC standings (top 20 minimum)
- Winner: Jonas Vingegaard, dates May 9-31, 2026
- /events/tour-de-suisse-2026 shows final GC standings
- Both marked 'Completed' status
- Visible on /cycling calendar in completed races section
- Bounce rate for these pages measured (target: 100% → <50%)
- Source flag indicates 'Wikipedia' or 'final results'
- No placeholder/fabricated data

## Notes

**2026-07-03T13:55:49Z**

ROI JUSTIFICATION (First Principles):

100% bounce = zero value delivered = worst possible outcome.

WHY cycling events have 100% bounce:
- Users search 'Giro 2026 results' (SEO long-tail)
- Land on /events/giro-2026
- Find NO CONTENT (page exists but empty/placeholder)
- Immediately leave
- Never return (trust destroyed)

Completed race results = reference utility:
- SEO: 'Giro 2026 results', 'Vingegaard Giro win', 'Tour de Suisse GC'
- Bookmark behavior: Users save final standings pages
- Evergreen: Races from 2026 searched for years

Impact:
- Fix 100% bounce → target <50% (deliverable value)
- Enable SEO long-tail (currently getting traffic but delivering zero value)
- Build trust (site has complete coverage, not just upcoming events)

Effort: LOW (Wikipedia API pattern already exists for TdF)
Impact: HIGH (fix worst-performing pages)
ROI: VERY HIGH
