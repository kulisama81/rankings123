---
id: tennis-h2h-comparison
status: open
deps: []
links: []
created: 2026-08-15T13:50:00Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, parity, engagement]
---
# Tennis Head-to-Head (H2H) comparison tool

PARITY GAP: live-tennis.eu has H2H tool. We don't. Fans compare players before matches (esp. Grand Slam draws).

USER BEHAVIOR: 'Sinner vs Alcaraz H2H', 'Djokovic Federer head to head' = persistent search demand. Sticky feature (fans bookmark for quick comparisons).

DATA SOURCES: 
- Ultimate Tennis Statistics H2H endpoint (free, comprehensive)
- OR ESPN player comparison API
- Shows: overall record, surface breakdown, recent meetings, biggest wins

ENGAGEMENT: Comparison tools = HIGH session time (fans explore multiple H2H matchups). Differentiation from basic ranking sites.

ROI: 7/10 — Parity gap, MEDIUM effort (new UI pattern), HIGH stickiness (bookmarkable tool).

## Acceptance Criteria

✅ Route: /tennis/head-to-head
✅ Player search: type-ahead for ATP/WTA players
✅ Select 2 players → show H2H stats
✅ Display: Overall record, Surface splits (Clay/Hard/Grass), Recent 5 meetings, Biggest wins
✅ Data: UTS H2H API or ESPN comparison
✅ Link from player cards ('Compare →')
✅ SEO meta: 'Tennis Head-to-Head Tool | Compare ATP & WTA Players'
✅ Mobile: responsive search + results
✅ Mock fallback if API fails
✅ Build green
