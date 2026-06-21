---
id: cycling-page
status: open
deps: [cycling-dynamic-feed]
links: []
created: 2026-06-21T07:54:53Z
type: feature
priority: 1
parent: rankings123
tags: [cycling, parity, CX]
---
# /cycling route - UCI rankings + current/recent races page

Create a dedicated /cycling page (like /atp-live, /world-cup) showing UCI individual rankings (top 50+) + current/recent race standings. Make cycling a real, live sport on rankings123. Show: UCI world ranking table (rider, team, points, country flag), current race (Tour de Suisse NOW through June 21), recent results (Giro 2026 final GC, Dauphiné 2026), upcoming (Tour de France June 27). Depends on: cycling-dynamic-feed.

## Acceptance Criteria

✓ /cycling route exists and loads
✓ UCI individual rankings table (top 50+): rank, rider, team, country, points
✓ Current race shown if one is ongoing (e.g. Tour de Suisse through June 21)
✓ Recent results section (e.g. Giro 2026 final GC - Vingegaard won)
✓ Upcoming race preview (Tour de France starts June 27)
✓ Page meta (title, description, OG tags) optimized for SEO
✓ Mobile responsive, follows design system
✓ Source flag visible (firstcycling/mock)
✓ No placeholder/coming-soon/fabricated data shown to users

## Notes

**2026-06-21T07:55:08Z**

**ROI Justification (First Principles):**

FUNDAMENTAL TRUTH: Traffic = indexable pages × real search demand × UX quality. Cycling has massive search demand (Tour de France is one of the world's biggest sporting events - starts in 6 days!).

WHY THIS PAGE:
- Tour de France 2026 starts June 27 (6 days!) - huge traffic window opening
- 'tour de france standings', 'uci cycling rankings', 'giro results' = high search volume
- Cycling is promised on homepage but goes nowhere (credibility gap)
- Parity: competitors (ESPN, BBC Sport, FlashScore) all have cycling rankings/results

IMPACT vs EFFORT:
- Impact: HIGH - captures Tour de France traffic spike (millions of searches), establishes cycling SEO authority, fulfills homepage promise
- Effort: MEDIUM - follows established page pattern (ATP Live, World Cup), needs cycling-dynamic-feed first
- ROI: VERY HIGH - timing is critical (TdF starts in 6 days), search demand is massive, competitive parity

DIFFERENTIATOR: Most cycling sites show only one race at a time. We show UCI rankings + current + recent + upcoming = complete cycling hub.
