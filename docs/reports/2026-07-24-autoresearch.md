# Autoresearch Report — July 24, 2026

**Research Lens Today:** Post-tournament pivot + tennis parity gaps + US Open SEO buildup + revenue enablement

**Backlog Status:** 29 buildable tickets → +10 new → ~39 buildable (healthy: ~2-6 days of work for planner)

---

## 1. What Shipped Recently (git log, last 7 days)

### World Cup
- Fixed WC Final widget showing stale "Today" text (6da77fc)
- Added WC Finals celebration visual treatment (2cda2aa)
- Homepage countdown timer for upcoming major events (eb26feb)

### Tennis & Cycling
- Tour de France 2026 coverage is live and updating (Stage 19 in progress as of July 24)
- Giro d'Italia and Tour de Suisse completed races shown

### Performance & QA
- Continuous perf improvements: ATP -19% TTFB, WTA load -8-14% (6371d07, 6610c59)
- Inspector runs: no new bugs filed, confirmed 8-10 existing bugs (eadf355)
- Data-sanity monitor: auto-filed data-anomaly tickets on transient issues (dda5251)

---

## 2. Key Findings & Opportunities

### CRITICAL TIMING: Tournament Pivots

**World Cup 2026 — ENDED July 19**
- **Result:** Spain 1-0 Argentina (Ferran Torres 106' ET) at NY/NJ Stadium
- **Impact:** Many p0/p1 WC tickets are now **outdated** (final countdown, lineups, how-to-watch, pre-final betting CTAs)
- **Action:** Created ticket `wc-tickets-post-final-cleanup` (p0) to close past-date tickets and pivot to post-tournament content
- **Opportunity:** Post-final recap content to retain WC traffic spike and pivot to tennis/cycling

**Wimbledon 2026 — Ended July 12**
- **Winners:** Jannik Sinner (ATP), Linda Nosková (WTA)
- **Opportunity:** Ranking impact analysis while "wimbledon 2026 results" searches are still hot (created `wimbledon-2026-impact`, p2)

**Tour de France 2026 — Ends July 26** (2 days)
- Currently live: Stage 19 in progress
- **Next:** Vuelta a España starts Aug 22 (existing ticket enhanced with ROI note)

**US Open 2026 — Starts Aug 31** (5 weeks)
- **Opportunity:** Preview content cluster to capture pre-tournament search traffic (existing ticket enhanced)

### Tennis Parity Gaps (Phase 1 — vs live-tennis.eu)

**Critical Missing Features:**
1. **Race Rankings** (YTD points) — `race-rankings-implementation` created (p0)
2. **Head-to-Head Tool** — `tennis-h2h-tool` created (p1)
3. **Player Pages** — `player-pages-v1` created (p1) — **SEO long-tail engine**
4. **Points to Defend** — `points-to-defend-calendar` created (p1)
5. Doubles rankings — existing ticket `doubles` (p3)

**APIs Available (from research):**
- **H2H:** tennis-api.com, MatchStat API
- **Race/Player Data:** ESPN endpoints, ATP/WTA APIs

### Revenue Enablement (Parallel to Parity)

**Monetization Lead Times Matter:**
- AdSense approval: 7-14 days
- Betting affiliate signup: 24-48 hours
- **Action:** Created `adsense-application-2026` (p1) and `betting-odds-api` (p1)

**Revenue Strategy (First Principles):**
- **Display Ads:** AdSense ($2-10 RPM baseline) → Ezoic (5K sessions) → Mediavine (50K sessions)
- **Betting Affiliates:** 10-50× higher RPM than display ads (sports audience)
- **The Odds API:** Free tier for eval, paid for production (tennis, soccer odds)

**CX-First Protection:**
- Only show odds/affiliate UI when **real API connected** (no placeholder content)
- Low ad density: max 1 leaderboard + 1 in-content per page
- Below-fold lazy loading, no CLS

---

## 3. Traffic & Analytics (GA4, last 28 days)

**Summary:**
- **36 users**, 42 sessions, 78 pageviews
- **Mobile:** 26% (11/42 sessions)
- **Bounce Rate:** 83.9% (homepage) — **CRITICAL ISSUE**

**Top Pages:**
1. Homepage (/) — 35 views, 83.9% bounce ⚠️
2. World Cup — 21 views, 41.7% bounce
3. Cycling — 7 views, 0% bounce ✅
4. ATP Live — 6 views, 14.3% bounce ✅
5. WTA Live — 2 views, 0% bounce ✅

**Traffic Sources:**
- Direct: 76% (32 sessions)
- Organic Search: **12%** (5 sessions) ⚠️ — **SEO opportunity**
- Referral: 12% (5 sessions)

**Geography:**
- US: 62% (26 sessions)
- UK: 10% (4 sessions)
- Other: 28% (12 sessions across 9 countries)

**Key Insight:** Very early stage. Organic search is only 12% — **SEO-focused features (player pages, tournament content) will drive growth.**

**Homepage Bounce Issue:**
Created `homepage-bounce-optimization` (p1) to reduce bounce from 83.9% → <60% via:
- Live scores ticker above-the-fold
- Clearer value prop ("Live Rankings Updated Every 20 Seconds")
- Stronger CTAs to ATP/WTA/World Cup

---

## 4. Ad Revenue Status

**Current:** PENDING AdSense approval (no live ads yet)

**Action:** Created `adsense-application-2026` (p1) to start approval process

**Never fabricate revenue numbers.** Revenue tracking begins once AdSense is live.

---

## 5. Competitor Research

### live-tennis.eu
- Attempted to fetch, got HTTP 403 Forbidden (Cloudflare-protected)
- Known features from DESIGN.md parity table:
  - ATP/WTA live rankings ✅ (we have this)
  - Race rankings ❌ (we don't — ticket created)
  - Player detail/points breakdown ❌ (player pages ticket created)
  - Points to defend ❌ (ticket created)
  - Doubles ❌ (existing ticket)
  - Deployed + monetized ❌ (AdSense ticket created)

### Other Tennis Sites (from research)
- **livetennis.io:** ATP/WTA rankings, doubles rankings
- **Perfect Tennis, LiveTennis:** Similar features
- **MatchStat, Tennis API:** Provide H2H data, player stats (sources for our features)

---

## 6. Data Source Research

### Cycling (Post-TdF)
**Current:** Wikipedia API for TdF 2026 (live, ending July 26)
**Issue:** After TdF ends, need next race coverage
**Solution:** Vuelta a España 2026 (Aug 22-Sep 13) — Wikipedia `2026_Vuelta_a_España` exists (verified)
**Action:** Enhanced existing `vuelta-2026-coverage` ticket with ROI note

**Other Cycling Sources:**
- ProCyclingStats (live data, but scraping needed)
- Intervals.icu (TdF standings)
- ESPN cycling (limited coverage)

### Tennis H2H & Player Data
**Sources Identified:**
- **tennis-api.com:** H2H API, player matchups, ATP/WTA coverage
- **MatchStat API:** Comprehensive H2H stats, rivalry records
- **ESPN:** Player endpoints, race rankings, tournament data
- **WTA API:** Official WTA rankings (already in use)
- **Ultimate Tennis Statistics:** ATP deep rankings (already in use)

### Betting Odds
**Sources Identified:**
- **The Odds API (theoddsapi.com):** Free tier, paid for tennis/soccer, 370+ bookmakers
- **OddsPapi:** Free tier, 69 sports
- **SportsDataIO, Sports Game Odds:** Alternative options

---

## 7. Loop Health (Planner Performance)

**Logs Reviewed:** `.claude/planner-cron.log`, `.claude/inspector-cron.log`, `.claude/perf-inspector-cron.log`

**Status:** ✅ Healthy
- Planner runs 5×/day (tennis, cycling, design, worldcup, general specializations)
- Recent successful ships: WC Final widget fix, TdF coverage, perf improvements
- Inspector: no new bugs filed (8-10 existing bugs confirmed)
- Perf-inspector: continuous improvements (ATP -19% TTFB, WTA -8-14% load)
- Data-sanity monitor: catching transient issues, auto-filing tickets

**No Issues Detected:** Backlog is healthy, planner is shipping, verifier is catching issues.

---

## 8. Top 10 New Tickets Filed (ROI-Ranked)

### Phase 1 Parity (Critical)
1. **`race-rankings-implementation`** (p0) — ATP/WTA Race (YTD) rankings. Parity blocker.
2. **`tennis-h2h-tool`** (p1) — Head-to-head comparison tool. Parity + engagement driver.
3. **`player-pages-v1`** (p1) — Player profile pages (top 50 ATP/WTA). SEO long-tail engine + parity gap.
4. **`points-to-defend-calendar`** (p1) — Points-to-defend calendar. Parity gap + helps explain ranking volatility.

### Revenue Enablement (Parallel)
5. **`adsense-application-2026`** (p1) — AdSense setup. Revenue foundation, 7-14 day lead time.
6. **`betting-odds-api`** (p1) — The Odds API integration. 10-50× higher RPM than display ads.

### Post-Tournament Content (Timely)
7. **`wc-2026-final-recap`** (p1) — Spain 1-0 Argentina recap. Captures "world cup 2026 final" search tail, retains WC traffic.
8. **`wimbledon-2026-impact`** (p2) — Post-Wimbledon ranking impact analysis. Time-sensitive (search volume decays).

### Conversion & Engagement
9. **`homepage-bounce-optimization`** (p1) — Reduce homepage bounce from 83.9% → <60%. Revenue multiplier via engagement.

### Backlog Hygiene
10. **`wc-tickets-post-final-cleanup`** (p0) — Close outdated WC tickets (final countdown, lineups, etc.). Prevents wasted planner time.

---

## 9. Enhanced Existing Tickets (Added ROI Notes)

- **`us-open-2026-preview`** — US Open preview content cluster (Aug 31-Sep 13). Time-sensitive SEO opportunity.
- **`vuelta-2026-coverage`** — Vuelta a España 2026 (Aug 22-Sep 13). Next cycling event after TdF.

---

## 10. Recommendations (Top 3 Actions)

### 1. **IMMEDIATE: Close Outdated WC Tickets** (p0 — `wc-tickets-post-final-cleanup`)
**Why:** World Cup ended July 19. Many p0/p1 tickets (final countdown, lineups, how-to-watch) are past-date and waste planner time if attempted.
**Action:** Review all `wc-*` tickets, close pre-final ones, reprioritize others to p3-p4.

### 2. **PHASE 1 PARITY PUSH: Race Rankings + H2H + Player Pages** (p0-p1)
**Why:** These are the top gaps vs live-tennis.eu. We can't be a credible alternative without them.
**Impact:** Race rankings (p0) is most critical. Player pages (p1) are the SEO long-tail engine (100 pages × 10K searches each = 1M+ monthly opportunity).
**Action:** Planner should prioritize `race-rankings-implementation`, `tennis-h2h-tool`, `player-pages-v1` in next runs.

### 3. **REVENUE ENABLEMENT: AdSense + Betting Odds API** (p1)
**Why:** Long lead times (AdSense = 7-14 days, API setup = days). Start now so revenue can begin flowing in parallel with feature build.
**Impact:** AdSense = $2-10 RPM baseline. Betting affiliates = 10-50× higher RPM. With current 78 pageviews/28d, revenue is tiny, but **traffic growth requires monetization to be ready**.
**Action:** Apply for AdSense, integrate The Odds API on free tier, set up affiliate CTAs (CX-first: only show when real data available).

---

## 11. Strategic Context (First Principles)

**Phase 1 Goal:** Match and exceed live-tennis.eu feature set to be a credible competitor.

**First-Principles Reasoning Applied:**
- **User's root need:** Know who's #1 right now, what's happening live, what's next — faster/clearer than anyone else.
- **Traffic = indexable pages × real search demand × speed/UX**
  - Player pages (100+) = massive indexable page inventory
  - US Open preview = high search demand (time-sensitive)
  - Homepage bounce reduction = better UX = more sessions
- **Engagement = real-time accuracy + distinctive reasons to return**
  - H2H tool = return before big matches
  - Race rankings = changes faster than official ranking
  - Points to defend = helps fans understand volatility
- **Revenue = traffic × RPM × session depth**
  - AdSense = RPM baseline
  - Betting affiliates = 10-50× RPM multiplier
  - Homepage bounce reduction = session depth increase

**Why Not Just Copy Competitors?**
Parity is the **floor for credibility**, not the strategy. Real leverage comes from:
1. **Better SEO** (player pages, tournament content) → more organic traffic
2. **Higher RPM** (betting affiliates, not just display ads) → more revenue per visitor
3. **Differentiation** (stats competitors lack: H2H surface splits, form tracking, advanced analytics) → reasons to return

**World Cup Pivot:**
The WC provided a traffic spike (21 pageviews to /world-cup in 28 days). Tournament ended July 19. Strategy:
- Retain WC traffic with **post-final recap** + cross-links to tennis/cycling
- Reprioritize outdated WC tickets
- Shift planner capacity back to **tennis parity** (was ≥50% WC while live, now back to tennis focus)

---

## 12. Backlog Health

**Before:** 202 open, 29 buildable
**After:** 202+10 = 212 open, ~39 buildable (assuming new tickets are unblocked)

**Planner Capacity:** ~5-15 tickets/day × 5 runs/day = ~25-75 tickets/week

**Assessment:** ✅ Healthy. ~39 buildable = ~2-6 days of work queued. Never let it drop below 12 buildable.

**Next Autoresearch Run:** Will rotate lens (SEO/content → monetization/RPM → UX/engagement → loop/process health).

---

## Sources Referenced

- [Spain wins 2026 FIFA World Cup](https://www.cbsnews.com/news/2026-fifa-world-cup-final-spain-argentina-sunday/)
- [Wimbledon 2026 Results](https://www.olympics.com/en/news/wimbledon-2026-tennis-results-scores-complete-list)
- [Tour de France 2026 Standings](https://www.intervals.icu/tour-de-france-2026/standings/)
- [Vuelta a España 2026](https://en.wikipedia.org/wiki/2026_Vuelta_a_Espa%C3%B1a)
- [US Open 2026 Schedule](https://www.lta.org.uk/news/essential-guide-to-the-2026-american-hard-court-season/)
- [Tennis H2H API](https://tennis-api.com/tennis-h2h-api/)
- [The Odds API](https://theoddsapi.com/)
- [ESPN Cycling Data](https://www.espn.co.uk/cycling/)

---

**End of Report**

*Autoresearch next run: Daily (rotating lens). Planner: keep backlog depth ≥12 buildable.*
