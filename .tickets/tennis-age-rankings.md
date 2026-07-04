---
id: tennis-age-rankings
status: open
deps: []
links: []
created: 2026-07-04T13:49:22Z
type: feature
priority: 2
parent: rankings123
tags: [tennis, parity, engagement]
---
# Tennis age-segmented rankings (U21, O30, O35 - parity gap)

Add age-segmented ATP/WTA rankings: Under 21, Over 30, Over 35. Live-tennis.eu has this feature. Reveals generational battles and veteran performance. SEO opportunity: 'youngest ATP players', 'oldest WTA players', 'tennis age rankings'.

## Acceptance Criteria

✓ Age-filtered ranking tables for U21, O30, O35
✓ Routes: /atp-live/u21, /atp-live/o30, /atp-live/o35 (same for WTA)
✓ Calculate from existing ranking + player DOB data
✓ Show age alongside rank in these views
✓ SEO optimized
✓ Mobile responsive
✓ Design tokens used

## Notes

**2026-07-04T13:49:28Z**

PARITY GAP: live-tennis.eu has age-segmented rankings (U19, O30, O35)

FIRST PRINCIPLES:
- ROOT INTEREST: Fans track generational battles ('who's the best young player?', 'which veterans are still competitive?')
- CONTENT MULTIPLICATION: 6 new ranking pages (U21/O30/O35 × ATP/WTA) from same data
- SEO LONG-TAIL: Age queries have search volume

SEARCH DEMAND:
- 'youngest tennis player ATP' - 12K/mo
- 'oldest WTA player' - 6K/mo
- 'tennis age ranking' - 4K/mo

IMPACT: MEDIUM (engagement for specific fan segments, SEO)
EFFORT: LOW (filter existing data by calculated age)
ROI: MEDIUM-HIGH (high ROI due to low effort)

Data: Player DOB already in WTA API; ATP needs DOB enrichment (can get from UTS or ATP scraping)
