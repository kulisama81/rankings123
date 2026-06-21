---
id: cycling-section
status: open
deps: [cycling-page]
links: []
created: 2026-06-15T02:06:32Z
type: feature
priority: 2
parent: rankings123
tags: [cycling, navigation, seo, multi-sport]
---
# Cycling as a first-class top-level sport (nav tab, like ATP / World Cup)

Promote Cycling to a top-level sport ALONGSIDE Tennis (ATP/WTA) and World Cup — a **nav tab at the
top + landing-page presence + its own route (/cycling)** — not just archive event data. Surface live
cycling rankings/standings: UCI world ranking and/or current Grand Tour GC (reuse the existing
CyclingRider/CyclingRankings types + feed/table architecture). Find a dynamic, keyless source (scan
for a public API — ESPN cycling, UCI, PCS-style data) with the standard mock-fallback + `source`
flag. CX FIRST: only ship real, sourced standings — no placeholder/fabricated data; if no live data
is available yet, keep it honest (clearly-flagged) or hold the tab until a real source is wired.

## Acceptance Criteria

1) Cycling appears as a top-level **nav tab** and on the landing page next to Tennis + World Cup.
2) /cycling renders real cycling rankings/standings from a dynamic source with mock-fallback +
   `source` flag (never fabricated; mock only as honest, flagged degradation).
3) Reuses the table/feed patterns + design tokens (works dark+light); SEO metadata + sitemap entry.
4) build + eslint + check:readability green; live-verified on rankings123.com.

## Notes

**2026-06-21T07:55:21Z**

**UPDATE (June 21, 2026) - CURRENT CYCLING LANDSCAPE:**

The cycling world is ACTIVE RIGHT NOW with major events:

COMPLETED (need results):
- Giro d'Italia 2026 (May 9-31) - Jonas Vingegaard won (1st Giro, completes Grand Tour set), beat Felix Gall by 5:22, Jai Hindley 3rd
- Critérium du Dauphiné 2026 (June 7-14) - Isaac del Toro won, Luke Tuckwell 2nd at +54s

ONGOING (need live standings):
- Tour de Suisse 2026 (June 17-21) - Tadej Pogačar leading, Richard Carapaz 2nd at +4:22, final stage tomorrow

UPCOMING (huge traffic opportunity):
- **Tour de France 2026 (June 27 - July 19)** - STARTS IN 6 DAYS! One of world's biggest sporting events

UCI RANKINGS (June 2026):
1. Tadej Pogačar (10,865 pts)
2. Jonas Vingegaard (8,625 pts)
3. Isaac del Toro (5,339 pts)

**DEPENDENCIES:**
See new tickets filed today:
- cycling-dynamic-feed (wire FirstCycling/scraping feed)
- cycling-page (create /cycling route)

These should be built BEFORE this nav promotion ticket.
