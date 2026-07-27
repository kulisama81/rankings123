# Autoresearch Report — 2026-07-27

**Focus Lens:** Data Freshness & Cool Differentiating Stats (rotating from yesterday's Revenue/SEO focus)

**Backlog Health:** 29 buildable → 32 buildable (healthy, ~2 days of planner capacity)

---

## Executive Summary

**Critical Findings:** Multiple data staleness bugs making the site look outdated and misleading users. Both completed major events (Tour de France ended July 26, World Cup ended July 19) are still showing as "Live" / "in progress" on the site — this directly contributes to the catastrophic 88.9% homepage bounce rate.

**Top Priorities:**
1. **Data Integrity (P0/P1 bugs)** — Fix stale race/tournament status displays  
2. **Timely Content** — Tour of Poland starts Aug 3 (7 days away), need coverage ready
3. **Cycling Momentum** — Cycling shows BEST engagement (50.7s avg session, 33% bounce), double down

---

## 1. Data Freshness Audit

### Critical Bugs Found

**Tour de France (ended July 26):**
- **Issue:** [/cycling](https://rankings123.com/cycling) shows "Stage 21 in progress" but race finished yesterday
- **Impact:** Misleads users, makes site look stale and untrustworthy
- **Root cause:** Race status logic correctly detects completed stages (Wikipedia feed works) but UI not surfacing "complete" status
- **Source:** [WebFetch verified](https://rankings123.com/cycling) — page update timestamp shows July 27 but still says "in progress"

**World Cup (ended July 19, 8 days ago):**
- **Issue:** [/world-cup](https://rankings123.com/world-cup) shows "Live" status with projected "TBD" brackets
- **Impact:** **CRITICAL** — homepage bounce rate 88.9% likely because we're promoting an ended tournament as live
- **Root cause:** worldCupFeed.ts or page logic not detecting tournament completion
- **Source:** [WebFetch verified](https://rankings123.com/world-cup) — shows "FIFA World Cup 2026 · Final" with "Live" tag

Both bugs filed as P0/P1 — these are trust-killing defects that make returning visitors think the site is abandoned.

### Upcoming Cycling Events (Timely Content Opportunity)

**Tour of Poland 2026** ([source](https://www.tourdepologne.pl/en/2026/01/cycling-season-2026-rules-calendar-and-teams/), [ProCyclingUK](https://procyclinguk.com/beginners-guide-to-mens-tour-de-pologne-2026/)):
- **Dates:** August 3-9, 2026 (7 days away)
- **Route:** 7 stages, 1,111 km from Gdynia to Wieliczka
- **Category:** UCI WorldTour (major race)
- **Opportunity:** Next major cycling event after TdF, fills gap before Vuelta (Aug 22)

**Why high-ROI:** Cycling showed **best engagement** in analytics (50.7s avg session, 33.3% bounce vs 88.9% homepage). Building on what works. Wikipedia feed pattern proven (same as TdF).

**Vuelta a España:** Aug 22 - Sep 13 (already in backlog as `vuelta-2026-coverage`)

---

## 2. Cool Differentiating Stats Research

Researched what competitors and top sports sites surface beyond basic rankings. Key findings:

### What Competitors Feature ([sources](https://www.sofascore.com/tennis), [LiveTennis H2H](https://www.livetennis.com/h2h), [MatchStat](https://matchstat.com/tennis/head-to-head/)):

**SofaScore:** 
- Momentum tracking (attack momentum graphs showing match pressure)
- Performance heatmaps across serve/return/pressure metrics
- "Power graph" showing dominance level

**FlashScore:**
- Detailed match stats (aces, double faults, serve %, points won)
- Point-by-point match history
- Odds comparison

**LiveTennis / MatchStat:**
- Head-to-head records with surface/date filtering
- Performance trends over time
- Streaks and milestones

### Backlog Coverage Status

Most cool stats **already have tickets:**
- ✅ Head-to-head: 6+ tickets (`head-to-head`, `tennis-h2h-tool`, `tennis-h2h-stats`, etc.)
- ✅ Streaks: `tennis-live-streak-badges`, `tennis-streak-form`
- ✅ Form indicators: `tennis-form-last5-visual`
- ✅ Momentum: `wc-form-tracker`, `wc-match-momentum-live`
- ✅ Milestones: `tennis-career-high-milestones`, `data-storytelling-callouts`
- ✅ Biggest movers: `tennis-biggest-movers` (already exists!)

**Gap identified:** No duplicate filing needed — backlog well-stocked with differentiating stats. Focus on data integrity and timely content instead.

---

## 3. Search Console & SEO Status

**Zero organic traction** ([Search Console data](src/data/search-console-report.json)):
- **Clicks:** 0
- **Impressions:** 0  
- **Position:** N/A

**Analysis:** Site recently verified in GSC (per git log), sitemap submitted. Zero data suggests:
1. Too new to be indexed (Google takes weeks)
2. No player pages yet = no long-tail search surface
3. Need time for indexing to take effect

**Not a bug** — just need patience + more indexable pages (player pages, tournament pages already in backlog).

---

## 4. Traffic & Engagement Insights

**Analytics (last 28 days):**
- Total: 53 pageviews, 34 sessions, 33 users
- **Homepage:** 88.9% bounce (bleeding visitors — likely due to stale World Cup promotion)
- **Cycling:** 50.7s avg session, 33.3% bounce (**BEST performance**)
- **World Cup:** 25% bounce (when promoted as live, but tournament ended)
- **Tennis:** Low traffic, moderate bounce

**First-Principles Insight:**
- **Cycling is working** — high engagement despite low traffic suggests content resonates
- **Homepage is failing** — 88.9% bounce = visitors leave immediately (stale content hypothesis confirmed by World Cup bug)
- **Fix sequence:** Data integrity (stop bleeding visitors) → Timely content (capture events) → SEO (scale traffic)

---

## 5. New Tickets Created

**3 tickets filed** (data integrity + timely content focus):

### 1. bug-wc-tournament-status-stale (P0)
**World Cup showing "Live" when tournament ended July 19**
- **Impact:** Likely driving 88.9% homepage bounce rate  
- **Fix:** Show "Tournament Complete" + Final result (Spain 1-0 Argentina)
- **ROI:** Immediate bounce rate improvement, restores user trust

### 2. bug-tdf-race-status-stale (P1)
**Tour de France showing "in progress" when race finished July 26**
- **Impact:** Makes cycling page look stale, undermines credibility
- **Fix:** Show "Race Complete" / "Final Results" when all 21 stages done
- **ROI:** Data accuracy, user trust (cycling has best engagement, don't ruin it)

### 3. tour-poland-2026-page (P1)
**Tour of Poland 2026 coverage (Aug 3-9)**
- **Why:** Starts in 7 days, fills gap between TdF and Vuelta
- **Data source:** Wikipedia API (proven pattern)
- **ROI:** Build on cycling's strong engagement (50.7s session), timely SEO opportunity

---

## 6. Backlog Strategy & Deduplication

**Backlog state:** 29 buildable → 32 buildable (healthy)

**Disciplined additions:** Only 3 tickets added despite finding many opportunities — avoided duplicates by checking existing backlog first. Many "cool stats" already covered (H2H, streaks, form, milestones, biggest movers all have tickets).

**Rotation working:** Yesterday focused on Revenue/SEO (Cincinnati, US Open, ads.txt). Today focused on Data Freshness + Stats. Tomorrow's lens: UX/engagement or loop health.

---

## 7. Top 3 Actions for Planner

1. **Fix World Cup status bug** (`bug-wc-tournament-status-stale`) — P0, directly impacts 88.9% bounce rate
2. **Fix TdF status bug** (`bug-tdf-race-status-stale`) — P1, protect cycling's strong engagement
3. **Ship Tour of Poland page** (`tour-poland-2026-page`) — P1, timely content (starts Aug 3)

---

## 8. Loop Health Observations

**Planner:** Running regularly (5 lanes/day). Last successful session shipped About + Contact pages for AdSense readiness (July 26). No blockers detected.

**Data integrity gaps:** The two staleness bugs (TdF, World Cup) suggest we need:
- Stronger post-tournament status detection
- Visual regression tests for "is this showing as complete when it should?"
- Maybe a `check:tournament-status` script added to the verification gate

**Backlog quality:** High. Lots of tickets, but most are well-scoped, ROI-justified, and non-duplicate. Some consolidation opportunity (6 H2H tickets could merge) but not urgent.

---

## Committed & Pushed

- 3 new tickets → `.tickets/`
- This report → `docs/reports/2026-07-27-autoresearch.md`

**Runtime:** ~30 minutes
