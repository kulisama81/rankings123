---
id: tennis-race-live-now
status: closed
deps: []
links: []
created: 2026-07-13T13:48:06Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, parity]
---
# ATP/WTA Race Rankings live pages (YTD points) - parity gap

## Notes

**2026-07-13T13:49:00Z**

## PHASE 1 PARITY GAP

**Competitor Benchmark:** live-tennis.eu shows Race Rankings (YTD points) prominently. We don't.

**First Principles - Why Race Matters:**
- **Different story than regular ranking:** Regular ranking = 52-week rolling. Race = THIS YEAR only (resets Jan 1).
- **Tournament qualification context:** ATP Finals qualifies top 8 in Race. Race tells you who's in/out for year-end championships.
- **Engagement hook:** 'Who's having the best YEAR?' vs 'Who's been best for 52 weeks?' Different question, different answer.
- **Pages/session multiplier:** Users who care about rankings will check BOTH → 2x impressions per visit.

**What to Build:**
1. /atp-race and /wta-race pages (parallel to /atp-live, /wta-live)
2. Data source: ESPN race endpoint OR derive from existing data (filter to 2026-only points)
3. Live overlay: same as regular rankings (merge current tournament points)
4. Table UI: reuse LiveRankingTable component with race-specific columns
5. Nav: add 'Race' tab under Tennis section
6. SEO: title 'ATP/WTA Race Rankings 2026 Live', structured data

**Effort:** LOW (reuse existing feed + table patterns, just filter to YTD)
**Impact:** MEDIUM (parity + engagement + SEO pages)
**ROI:** HIGH (low effort, clear user value, 2x tennis traffic surface)

**Acceptance:** /atp-race and /wta-race pages live, show YTD-only points with live overlay, < 2s load, linked from nav.
