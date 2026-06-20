---
id: cycling-section
status: open
deps: []
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
