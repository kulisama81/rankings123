---
id: cycling-race-status-detection
status: open
deps: []
links: [bug-tdf-race-status-stale]
created: 2026-08-01T14:25:00Z
type: feature
priority: 0
parent: rankings123
tags: [cycling, data-quality, bug-prevention]
---
# Cycling Race Status Auto-Detection (Fix Staleness Across All Races)

Build systematic race status detection for cycling so races NEVER show as "live" when complete. Current bug: TdF shows "Stage 21 in progress" when race ended July 26. This will recur for Tour of Poland, Vuelta, and every future race unless we fix it systematically.

## Acceptance Criteria

- **Refactor `cyclingFeed.ts` (or similar):**
  - Add `determineRaceStatus(raceConfig)` function
  - Input: race start date, end date, current stage data
  - Output: `"upcoming" | "active" | "complete"`
  - Logic:
    ```
    const today = new Date()
    if (today < startDate) return "upcoming"
    if (today > endDate) return "complete"
    if (allStagesComplete(stageData)) return "complete"
    return "active"
    ```
- **Apply to all cycling races:**
  - Tour de France 2026 (start: July 4, end: July 26) → should show "complete" now
  - Tour of Poland 2026 (start: Aug 3, end: Aug 9) → "upcoming" now, "active" Aug 3-9, "complete" after Aug 9
  - Vuelta 2026 (start: Aug 22, end: Sep 13) → "upcoming" now
- **UI updates:**
  - Show "Race Complete - Final Results" for completed races (not "Stage X in progress")
  - Show "Starts [Date]" for upcoming races
  - Show "Stage X - Live" only for truly active races
- **Data freshness:**
  - Never show race as active if > 7 days past end date (hard cutoff)
  - Consider caching race calendars (start/end dates) rather than hardcoding
- **Verification:**
  - `/cycling` page shows TdF as "complete" (not "in progress")
  - Tour of Poland transitions: upcoming → active (Aug 3) → complete (Aug 9)
  - Check console: no "race is live" when it's not
  - Builds green
- **Regression test:**
  - Add to `npm run check:data-sanity`: flag races showing "live" > 3 days past end date
  - Prevents this bug from recurring

## ROI Justification (First Principles)

**User's root need:** Know what's happening NOW — not what happened last week.

**Why staleness is a defect (trust fundamentals):**
- **Credibility damage:** "Live rankings" site showing finished race as ongoing = looks abandoned/broken
- **False urgency:** Users click expecting live action, find stale data = bounce
- **Recurring bug:** Will happen again with Tour of Poland (ends Aug 9), Vuelta (ends Sep 13), every future race

**Why systematic fix matters:**
- **Prevention > reaction:** Don't file a bug ticket for EVERY race; fix the pattern once
- **Data veracity discipline:** "Never fabricate, never mislead" includes stale status
- **Scalability:** As we add more cycling races, manual status updates don't scale

**How race status SHOULD work (first principles):**
1. **Derive status from current date + race calendar** (not hardcoded)
2. **States:** `upcoming` (before start), `active` (during race), `complete` (after final stage)
3. **Transition logic:**
   - If today < startDate → upcoming
   - If startDate ≤ today ≤ endDate → active (check if stage data available)
   - If today > endDate OR all stages complete → complete
4. **Never assume ongoing:** Default to `complete` if ambiguous (better to show old results than fake "live")

**Effort:** Medium (refactor race status logic, apply to TdF/Poland/Vuelta/future races)
**Impact:** High (fixes current bug + prevents future staleness, improves trust/credibility)
**Urgency:** P1 (Tour of Poland starts Aug 3, need status detection working BEFORE it ends Aug 9)

## Notes

Fixes `bug-tdf-race-status-stale` and prevents same bug for all future cycling races.

Race calendar source ideas:
- Hardcode start/end dates per race (simple, but requires updates)
- Fetch from UCI calendar API (if exists)
- Derive from Wikipedia infobox (race dates often in structured data)
