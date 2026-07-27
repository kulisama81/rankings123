---
id: tour-poland-2026-page
status: open
deps: []
links: []
created: 2026-07-27T13:49:13Z
type: feature
priority: 1
parent: rankings123
tags: [cycling, worldcup]
---
# Tour of Poland 2026 coverage (Aug 3-9)

Build coverage for Tour of Poland 2026 (UCI WorldTour stage race, Aug 3-9) — starts in 7 days. This is the next major cycling event after TdF, with high search potential during the race.

Data source: Wikipedia API (same pattern as TdF), or ESPN cycling if available. Display GC standings, stage schedule, winners, jersey leaders.

ROI Justification (First Principles):
- Timely content (starts Aug 3, 7 days away) = SEO window
- Cycling showed BEST engagement in analytics (50.7s avg session, 33% bounce vs 88.9% homepage)
- Builds on proven Wikipedia feed pattern (low implementation risk)
- Fills content gap between TdF (ended) and Vuelta (Aug 22)
- Multi-race cycling coverage = return visitors (not just one-off TdF spike)

## Acceptance Criteria

- /cycling/tour-poland-2026 page live with:
  - Stage schedule (7 stages, dates, courses)
  - GC standings table (real-time from Wikipedia or ESPN)
  - Jersey leaders (if available)
  - Race status (upcoming/active/complete)
- Dynamic feed with mock fallback + source flag (never static)
- Tokens-themed, mobile-responsive
- SEO metadata + JSON-LD
- Verified on live site: 200 response, data loads, no console errors

## Notes

**2026-07-27T13:52:51Z**

**ROI Justification (First Principles):**

**User's root need:** Know who's winning, what's happening live, what's next.

**Why Tour of Poland now:**
- Timely: Starts Aug 3 (7 days away) — SEO lead time window
- Proven pattern: Wikipedia feed (same as TdF), low implementation risk
- Fills content gap: TdF ended, Vuelta starts Aug 22 (20-day gap)
- Build on success: Cycling = 50.7s avg session, 33% bounce (best engagement on site)

**Traffic = indexable pages × search demand × speed/UX**
- Tour of Poland = 7+ indexable pages (stages, GC, jerseys)
- Search demand: UCI WorldTour race = moderate search volume during event
- Multi-race cycling coverage = return visitors (not just TdF one-offs)

**Differentiation:** Most ranking sites are tennis-only. Multi-sport cycling depth sets us apart.

**Impact vs Effort:**
- Effort: Medium (Wikipedia parsing, reuse TdF UI components)
- Impact: Medium-High (engagement retention, SEO surface expansion, proves multi-race strategy)
- Urgency: High (starts in 7 days, need to be live BEFORE stage 1)
