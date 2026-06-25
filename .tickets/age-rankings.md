---
id: age-rankings
status: open
deps: []
links: []
created: 2026-06-25T13:50:01Z
type: feature
priority: 2
parent: rankings123
tags: [tennis, parity, seo, engagement]
---
# Age-stratified tennis rankings (U21, U24, O30, O35)

Add age-filtered ATP/WTA ranking views. Routes: /atp/under-21, /atp/under-24, /atp/over-30, /atp/over-35 (and WTA equivalents). Filter existing live rankings by player age. Shows "Best Under-21 Players", "Best Veterans Over-35", etc. Live-tennis.eu has this (/atp-ranking-under-19, /atp-ranking-under-20, /atp-ranking-under-21, /atp-ranking-under-24, /atp-ranking-under-25, /atp-ranking-over-30, /atp-ranking-over-35). We lack it. SEO long-tail opportunity + engagement angle (youth development, comeback stories).

## Acceptance Criteria

✓ Routes exist:
  - /atp/under-21, /atp/under-24, /atp/under-25, /atp/over-30, /atp/over-35
  - /wta/under-21, /wta/under-24, /wta/under-25, /wta/over-30, /wta/over-35
✓ Each page filters live ATP/WTA rankings by player age (from birthdate)
✓ Shows: rank (within age group), player name, age, overall ATP/WTA rank, points
✓ Clearly labeled: "Best Under-21 ATP Players" (not confusing with overall rankings)
✓ Updates live as overall rankings update
✓ Mobile responsive, design system
✓ SEO optimized: unique meta descriptions per age group
✓ Internal linking: link to player pages (when they exist)
✓ Test: verify age calculations are correct (spot-check birthdates vs age shown)

## Notes

**2026-06-25 — ROI Justification (First Principles):**

FUNDAMENTAL TRUTH: Different audiences care about different ranking slices. Youth coaches track U21 talent. Media writes "youngest top-10 player" stories. Veterans' comebacks generate fan interest ("Federer at 40 still top-20"). Age stratification serves DISTINCT use cases, not just cosmetic filtering.

COMPETITIVE GAP: live-tennis.eu has 7 age-stratified views per tour (U19, U20, U21, U24, U25, O30, O35). We have NONE. This is a parity gap.

WHAT IT SERVES:
- Youth development tracking: "Who's the best teenager in tennis right now?"
- Comeback/longevity stories: "Is [veteran] still competitive?"
- Betting/fantasy: Age-based prop bets ("Will an U21 player win a Grand Slam this year?")
- Media: Age-milestone headlines ("Youngest top-10 player since Nadal")

SEARCH DEMAND (SEO long-tail):
- "youngest atp players" - 8K/mo
- "oldest tennis players" - 6K/mo
- "best under 21 tennis players" - 3K/mo
- "atp ranking under 21" - 1K/mo

IMPACT vs EFFORT:
- Impact: MEDIUM - SEO long-tail (multiple indexable pages), niche engagement, media-friendly
- Effort: LOW - just filtering existing data by birthdate (age calculation)
- ROI: GOOD - low effort for 10+ new indexable pages with unique search demand

DEPENDENCIES: Requires player birthdate in data layer (already have this from ATP/WTA/UTS feeds).

BLOCKING NONE: Standalone feature, no dependencies.
