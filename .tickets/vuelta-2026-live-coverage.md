---
id: vuelta-2026-live-coverage
status: closed
deps: []
links: []
created: 2026-08-10T14:15:00Z
type: feature
priority: 1
parent: rankings123
tags: [cycling, timely, seo]
---
# Vuelta a España 2026 live coverage (Aug 22 - Sep 13) — Cycling SEO opportunity

Vuelta a España 2026 starts Aug 22 (12 days away). Grand Tour = major cycling event (3 weeks, 21 stages). Overlaps with US Open (Aug 30 - Sep 13), doubling our live-event coverage and traffic potential.

## Acceptance Criteria

1. **Vuelta landing page:** `/cycling/vuelta-2026` with GC standings, stage results, jersey leaders
2. **General Classification (GC):** Top 20 riders, time gaps, team, country
3. **Jersey leaders:** Red (GC), Green (points), Polka-dot (KOM), White (young rider)
4. **Stage-by-stage results:** Stage winner, stage type (flat/hilly/mountain/ITT), distance
5. **Live updates:** Parse Wikipedia or ESPN cycling during race (Aug 22 - Sep 13)
6. **Race status detection:** Show "Upcoming" before Aug 22, "Active" during race, "Complete" after Sep 13
7. **Mock fallback:** If live feed fails, degrade to mock with clear "source: mock" flag (never fabricate)

## FIRST-PRINCIPLES ROI

**Multi-sport traffic smoothing:**
- Tennis: Grand Slams 4× per year (Jan, May-Jun, Jul, Aug-Sep) = seasonal spikes
- Cycling: Grand Tours 3× per year (May-Jun Giro, Jul TdF, Aug-Sep Vuelta) = different peaks
- Overlap window (Aug 22 - Sep 13): BOTH Vuelta AND US Open = 2× concurrent live events = traffic multiplier

**SEO opportunity:**
- "Vuelta 2026 standings" = 10K+ searches during race
- "Vuelta GC leaders" = 5K+ searches
- Cycling + tennis audience overlap = cross-sport discovery

**Cycling data crisis:**
- Current cycling page: static mock (Tour de France from Wikipedia, showing race as in-progress when complete)
- Vuelta = first dynamic cycling feed, establishes pattern for future races

## Data Sources (Priority Order)

1. **Wikipedia:** `https://en.wikipedia.org/wiki/2026_Vuelta_a_España` (parse HTML like Tour de France implementation)
2. **ESPN cycling:** Check `/sports/cycling/vuelta` endpoint (may or may not exist)
3. **ProCyclingStats:** Public scraping (last resort, may be blocked)
4. **Mock fallback:** Static Vuelta template with TBD placeholders

## Implementation Pattern

Copy Tour de France feed implementation (`src/lib/cyclingFeed.ts`) and adapt:
- Same Wikipedia parsing strategy (stages table, GC table, jersey leaders)
- Same race status detection (compare current date vs race dates)
- Same mock fallback discipline

## Impact Estimate

- **Traffic:** 10K+ searches during 3-week race
- **Multi-sport credibility:** Establishes cycling as legitimate second sport (not just tennis)
- **Cross-promotion:** US Open + Vuelta concurrent = keep users engaged Aug 22 - Sep 13
- **Data discipline:** First dynamic cycling feed, fixes staleness problem

**Timeline:** 12 days until Aug 22 race start — ship by Aug 21 for SEO window

**ROI:** 8/10 — MEDIUM effort (6-10 hours, copy TdF pattern), MEDIUM-HIGH impact (10K searches, multi-sport credibility)
