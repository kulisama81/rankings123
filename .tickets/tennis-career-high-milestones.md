---
id: tennis-career-high-milestones
status: open
deps: []
links: []
created: 2026-07-18T13:48:52Z
type: feature
priority: 2
parent: rankings123
tags: [tennis, parity, engagement]
---
# Tennis career-high rank tracking & milestone badges

## Notes

**2026-07-18T13:49:15Z**

**FIRST-PRINCIPLES ROI (Engagement driver - parity gap vs live-tennis.eu):**

**Fundamental truth:** Users engage with STORIES, not just data. Milestone moments (first-time #1, career-high, returning to top-10) are stories.

**Competitor gap:** live-tennis.eu tracks career-high rank and highlights 'new career high' badges in their ranking tables. We don't. This is a Phase 1 parity gap.

**User need:** 'Is this player's best-ever ranking?' matters for:
- Betting context (player on hot streak, confidence high)
- Fan engagement (celebrating milestones)
- Social sharing ('Sinner reaches career-high #1!' = viral moment)

**Data sources:**
- ATP: Ultimate Tennis Statistics API includes 'bestRank' (career-high) in rankingsTableTable response
- WTA: api.wtatennis.com doesn't include career-high in rankings endpoint, need to track historically OR scrape WTA official site

**Implementation:**
1. ATP: Already have 'bestRank' from UTS - surface it in LiveRankingTable as a badge/tooltip
2. WTA: Track career-high from historical ranking snapshots OR add to data schema
3. Badge: '🆕 Career High' or '📈 Equals Career High' next to rank when player reaches/ties personal best
4. Sort option: 'New Career Highs This Week' (filter players where currentRank = careerHighRank AND careerHighRank changed this week)

**Impact vs Effort:**
- Impact: MEDIUM - engagement driver (social sharing, betting context), parity gap
- Effort: LOW for ATP (data exists), MEDIUM for WTA (need historical tracking)
- ROI: GOOD - differentiates from official ATP/WTA sites (they show rank but not milestone context)

**ACCEPTANCE CRITERIA:**
1. ATP Live table shows career-high rank badge or tooltip for each player
2. When player reaches new career-high: highlight with 'NEW Career High' badge
3. WTA Live table shows career-high (either from historical tracking or official source)
4. Sort/filter option: 'Career Highs This Week' shows players who reached personal bests
5. Mobile-optimized badges (don't crowd mobile table)
6. Data source documented: where career-high data comes from (UTS for ATP, [source] for WTA)

**Parity:** live-tennis.eu has this, we don't. Phase 1 = match competitor features.
