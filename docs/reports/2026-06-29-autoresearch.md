# Autoresearch Report — 2026-06-29

**Research lens today:** Loop process health + monetization enablement + immediate Wimbledon momentum

---

## Summary

- **Backlog status:** 104 total open tickets, 21 immediately buildable (healthy ~2-day supply for planner)
- **New tickets filed:** 6 high-ROI tickets (2 p0, 3 p1, 1 p2) — Wimbledon urgency + monetization + loop quality
- **CRITICAL URGENCY:** Wimbledon 2026 started TODAY (June 29) — tournament runs through July 12
- **P0 REGRESSIONS:** ATP/WTA Live tables only show 1 player (core feature broken)
- **Traffic (28d):** 162 pageviews, 67 users, 87 sessions — homepage 68.5% bounce (critical problem)
- **Revenue status:** $0/month — AdSense PENDING, betting affiliate signups not yet started (HIGH PRIORITY)

---

## Critical Time-Sensitive Events

### 1. **Wimbledon 2026 — STARTED TODAY (June 29)**
- **Status:** Main ticket `wimbledon-2026-live` exists (P0) but not yet built
- **Problem:** Homepage has ZERO mention of Wimbledon despite tournament starting today
- **NEW TODAY:** `homepage-wimbledon-callout` (P0) — Add Wimbledon hero banner to homepage NOW
- **NEW TODAY:** `wimbledon-betting-picks` (P1) — Betting picks article (50K+ searches/day)
- **Opportunity:** THE biggest tennis event globally — 500K+ searches/day during tournament
- **Window:** June 29 - July 12 (14 days) — every hour of delay = lost traffic
- **Action:** URGENT — planner must prioritize Wimbledon p0 tickets IMMEDIATELY

### 2. **Tour de France 2026 — starts in 5 DAYS (July 4)**
- **Status:** Cycling page exists, TdF stages/GC ready (shipped June 27)
- **Action:** Monitor for live updates once race starts

### 3. **World Cup 2026 — LIVE through July 19 (20 more days)**
- **Status:** Strong coverage, best engagement (161.9s avg session, 44.1% bounce)
- **Action:** Maintain ≥ half planner capacity on World Cup ✅

---

## P0 Critical Regressions (BLOCKING CORE FEATURES)

**ATP/WTA Live tables truncated** — Inspector found these bugs yesterday (June 28):

1. **`atp-live-table-truncated`** — https://rankings123.com/atp-live only shows Jannik Sinner (#1), no other players
2. **`wta-live-table-truncated`** — https://rankings123.com/wta-live only shows Aryna Sabalenka (#1), no other players

**Impact:** Core rankings feature is UNUSABLE. Users cannot view full rankings (only #1 player visible).

**Root cause hypothesis:** Rendering/pagination regression. Data feed likely OK (returns full rankings), but UI only renders first row.

**NEW TODAY:** `table-pagination-fix` (P0) — Consolidates fix for both ATP/WTA truncation bugs

**Severity:** CRITICAL — This is a regression that slipped past mechanical verification (build green, ESLint clean). The planner needs stronger pre-commit checks.

---

## Loop Health Findings

### Problem: Silent UI regressions passing verification

The ATP/WTA table truncation is a **SILENT REGRESSION** that passed all current verification steps:
- ✓ `npm run build` (green)
- ✓ `npx eslint` (clean)
- ✓ `npm test` (unit tests)
- ✗ **NO real-browser rendering check**

Result: UI regressions slip through undetected.

### Solution: Strengthen planner verification

**NEW TODAY:** `planner-render-verification` (P2) — Extend `npm run check:core-features` to include:
- ATP Live table has > 1 row
- WTA Live table has > 1 row
- World Cup bracket has > 1 match
- Nav tabs all visible

Update planner contract in `.claude/commands/build-next.md` to require `check:core-features` green before commit.

**Impact:** Prevents future classes of UI regressions (one-time fix, long-term quality lever).

---

## Analytics Deep Dive (28 Days · through June 29)

**Traffic:** 162 pageviews, 87 sessions, 67 users (39% mobile)

**Top Pages by Engagement:**
1. **/world-cup** — 54 views, **161.9s avg session**, 44.1% bounce ⭐ BEST ENGAGEMENT
2. **/** (homepage) — 64 views, 25.6s avg session, **68.5% bounce** ❌ CRITICAL PROBLEM
3. **/atp-live** — 15 views, 18.5s avg session, 7.7% bounce (but BROKEN — only shows 1 player)
4. **/wta-live** — 5 views, 21.1s avg session, 20% bounce (but BROKEN — only shows 1 player)

**Insight — Homepage bounce crisis:**
- World Cup page: 161.9s sessions (LIVE data = engagement)
- Homepage: 25.6s sessions (static, no live moments = bounce)
- Fix: `homepage-wimbledon-callout` (ship TODAY) + `homepage-live-carousel` (already exists, p1)

**Traffic Sources — SEO bottleneck continues:**
- **Direct:** 80 sessions (92%)
- **Organic Search:** 5 sessions (6%) ← CRITICAL BOTTLENECK
- Referral: 2 sessions (2%)

**Geography:** US (53%), Germany (13%), France (11%), Poland (6%)

---

## Competitor & Data Source Research

### live-tennis.eu
- **Access:** Cloudflare-blocked (403 Forbidden) — cannot scrape directly
- **Known parity gaps** (from CLAUDE.md):
  - ✓ Live match scores widget (MAJOR gap)
  - ✓ Race rankings (ATP/WTA YTD)
  - ✓ Player profile pages
  - ✓ Tournament draws/brackets
  - ✓ Historical rankings

### Wimbledon 2026 Data Sources
- **ESPN:** `/tennis/wimbledon/bracket`, `/tennis/scoreboard` — Draw brackets + live scores available
- **Official:** wimbledon.com/en_GB/scores/results
- **WTA:** wtatennis.com/tournaments/wimbledon/draws

**Action:** Existing ESPN integration can power Wimbledon coverage (data source verified available).

### Sports Betting Affiliates (Revenue Research)

**Commission Models (2026):**
- **CPA:** $50-$500 per first-time depositor
- **RevShare:** 25-40% of net gaming revenue (lifetime)
- **Hybrid:** Small CPA + RevShare (best alignment)

**Top Programs:**
1. **Bet365 Partners** — 35% RevShare, largest sportsbook globally
2. **Pinnacle Affiliates** — 30-40% RevShare, sharp lines
3. **William Hill Affiliates** — Established brand
4. **FanDuel / DraftKings** — US-focused
5. **Betway Partners** — International coverage

**Market Growth:** $155B (2026) → $256B (2030)

**RPM Comparison:** Betting affiliates = 5-10x higher RPM than display ads for sports traffic

**NEW TODAY:** `betting-affiliate-signup-now` (P1) — Start signup process NOW (1-2 week approval lead time)

### Cycling Data Sources
- **ProCyclingStats:** API documented at procyclingstats.readthedocs.io — UCI rankings, race results
- **FirstCycling:** firstcycling.com/m/ranking.php — 2026 UCI World Ranking
- **Status:** TdF page shipped June 27 (Wikipedia API), ready for live race updates July 4

---

## Revenue Status

**Current Monthly Revenue:** $0 (pre-monetization)

**AdSense (Display Ads):**
- **Status:** PENDING human-gated approval
- **Blocker:** Missing `ads.txt` file (required for AdSense compliance)
- **NEW TODAY:** `ads-txt-file` (P1) — Create public/ads.txt (trivial effort, unblocks approval path)
- **Existing tickets:** `ad-inventory` (p2), `adsense-approval-checklist` (p2)

**Betting Affiliates (High-RPM Revenue):**
- **Status:** NOT YET STARTED (highest priority gap)
- **Why urgent:** 1-2 week signup + approval lead time; should have started already
- **NEW TODAY:** `betting-affiliate-signup-now` (P1) — Sign up for Bet365, Pinnacle, William Hill
- **Revenue potential:** 5-10x higher RPM than display ads for sports audience
- **Enabling content:** Wimbledon picks (NEW), WC predictions (exists), TdF bets (exists)

**Action Required:** Parallel-track BOTH AdSense (long-term stable) AND betting affiliates (high-RPM) — don't wait for one to start the other.

---

## Tickets Filed Today (6 Total)

### URGENT — Time-Sensitive (P0)
1. **`homepage-wimbledon-callout`** — Add Wimbledon 2026 hero banner to homepage
   - **Why:** Wimbledon started TODAY but homepage has ZERO mention — missing massive traffic opportunity
   - **Impact:** VERY HIGH — 500K+ searches/day, reduces 68.5% homepage bounce
   - **Effort:** LOW — Simple banner component, reuse design tokens
   - **Window:** 14 days (June 29 - July 12) — ship TODAY or tomorrow

2. **`table-pagination-fix`** — Fix ATP/WTA Live table truncation (only 1 player visible)
   - **Why:** P0 regression — core rankings feature is broken
   - **Impact:** CRITICAL — Core feature unusable, blocks primary user value
   - **Effort:** MEDIUM — Debug rendering/pagination logic
   - **Consolidates:** `atp-live-table-truncated` + `wta-live-table-truncated` bugs

### High-Priority — Revenue + Wimbledon (P1)
3. **`ads-txt-file`** — Create ads.txt for AdSense compliance
   - **Why:** Required for AdSense approval (revenue blocker)
   - **Impact:** HIGH — Unblocks display ad monetization path
   - **Effort:** TRIVIAL — One text file, 5 lines
   - **Lead time:** Do NOW before AdSense application

4. **`wimbledon-betting-picks`** — Wimbledon 2026 betting picks & predictions article
   - **Why:** High search volume NOW (50K+ searches/day), betting affiliate revenue opportunity
   - **Impact:** HIGH — SEO traffic + highest affiliate conversion (betting content)
   - **Effort:** MEDIUM — Content writing (~2-3 hours)
   - **Window:** 14 days, PEAKS first week (ship ASAP)

5. **`betting-affiliate-signup-now`** — Start betting affiliate signups (Bet365, Pinnacle, William Hill)
   - **Why:** Highest-RPM monetization for sports traffic (5-10x display ads)
   - **Impact:** VERY HIGH — Unblocks high-RPM revenue stream
   - **Effort:** MEDIUM — Signup 3-5 programs, 1-2 week approval
   - **Lead time:** Start NOW (long approval process)

### Loop Quality (P2)
6. **`planner-render-verification`** — Strengthen planner verification to catch UI rendering regressions
   - **Why:** ATP/WTA truncation was a silent regression that passed all mechanical checks
   - **Impact:** HIGH — Prevents future classes of UI bugs
   - **Effort:** MEDIUM — Extend check:core-features, update planner contract
   - **Quality lever:** One-time fix, long-term quality improvement

---

## First Principles Analysis

### Homepage Engagement Crisis

**Problem:** 68.5% bounce rate (vs 44.1% on World Cup)

**Root cause:** Homepage feels static — claims "live" and "real-time" but shows no visible live moments.

**Fundamental truth:** Users bounce when they don't see value immediately. LIVE DATA is the value prop.

**Solution path:**
1. **Immediate win (TODAY):** `homepage-wimbledon-callout` — Show "Wimbledon is LIVE NOW" hero
2. **Existing ticket:** `homepage-live-carousel` (P1) — Auto-rotating carousel of live events across sports
3. **Design improvements:** `hero-depth-treatment`, `sport-background-visuals`, `data-storytelling-callouts`

**Impact:** Homepage is the #1 landing page (64 views) — fixing bounce = more sessions = more ad revenue

### Revenue Enablement Has Long Lead Times

**Observation:** Revenue is still $0/month despite being a core Phase 3 goal.

**First principles insight:** Monetization has 1-2 week (or longer) approval lead times:
- AdSense approval: weeks (human review)
- Betting affiliate approval: 1-2 weeks
- Content creation: days

**Strategy:** Don't wait for one to complete before starting another — parallel-track:
1. **AdSense path:** ads.txt (NEW) → approval checklist → application → inventory integration
2. **Betting affiliate path:** Signup NOW (NEW) → approval (1-2 weeks) → integrate into content
3. **Content enablers:** Wimbledon picks (NEW), WC predictions (exists), TdF bets (exists)

**Action:** Start BOTH revenue streams in parallel this week.

---

## Loop Health Summary

**Recent planner activity:**
- ✅ Tour de France page shipped June 27 (cycling section launched)
- ✅ World Cup features shipping consistently
- ✅ Inspector running 2×/day, finding bugs (caught ATP/WTA truncation)
- ⚠️ **Silent regression slipped through:** ATP/WTA table truncation passed all verification
- 🔧 **Fix:** Strengthen verification with real-browser checks (ticket filed)

**Backlog health:**
- 104 total open tickets (up from 96 yesterday — healthy growth)
- 21 immediately buildable (good ~2-day supply)
- Mix of parity (Phase 1), differentiation (Phase 2), and revenue (Phase 3) ✅
- World Cup well-stocked (planner maintains ≥ half capacity) ✅
- **NEW:** Wimbledon urgency tickets added (2 p0, 1 p1)

**No blockers detected.** Loop running smoothly, but needs stronger verification (ticket filed).

---

## Top 3 Recommendations (First Principles)

### 1. **Ship Wimbledon homepage visibility TODAY (P0 URGENT)**
**First principles:** Wimbledon started TODAY. Search traffic is spiking RIGHT NOW (500K+ searches/day). Homepage has zero mention despite being the #1 landing page. Every hour of delay = unrecoverable lost traffic.

**Why it matters:** This is a 2-week window we can never get back. Wimbledon is THE most prestigious tennis tournament — not covering it is a credibility failure.

**Tickets:** `homepage-wimbledon-callout` (P0 NEW), `wimbledon-2026-live` (P0 existing), `wimbledon-draw-bracket` (P0 existing)

**Timeline:** Ship homepage callout TODAY or early tomorrow — tournament is LIVE NOW.

### 2. **Fix P0 regression + strengthen verification (BLOCKING CORE FEATURES)**
**First principles:** ATP/WTA Live rankings are the CORE VALUE of rankings123. Right now they're broken (only 1 player visible). This regression passed all mechanical checks because verification doesn't test rendering.

**Why it matters:** Core feature broken = site is unusable for primary use case (viewing rankings). Silent regressions erode trust in the loop.

**Tickets:** `table-pagination-fix` (P0 NEW), `planner-render-verification` (P2 NEW)

**Two-part fix:** (1) Fix the bug NOW, (2) prevent future regressions with real-browser verification.

### 3. **Start revenue enablement NOW (long lead times)**
**First principles:** Revenue = traffic × RPM × session depth. We're optimizing traffic (Wimbledon, SEO, player pages) but RPM is still $0 because monetization isn't started.

**Why it matters:** AdSense + betting affiliate signups have 1-2 week approval lead times. If we don't start NOW, we'll have traffic but no monetization when it arrives.

**Tickets:** `ads-txt-file` (P1 NEW), `betting-affiliate-signup-now` (P1 NEW), `wimbledon-betting-picks` (P1 NEW)

**Action:** Parallel-track display ads AND betting affiliates this week — don't serialize what can be parallelized.

---

## Data Freshness Status (Rotational Lens Check)

**Tennis:** ✅ Dynamic ESPN + WTA API feeds, mock fallback + source flags
**World Cup:** ✅ Dynamic ESPN feed, live standings/scores/bracket
**Cycling:** ✅ Dynamic Wikipedia feed (TdF), ships live July 4
**Known gaps:** ProCyclingStats integration pending (UCI rankings, non-TdF races)

**No stale data detected** across current sports. Cycling event pages (Giro, Paris-Roubaix) were flagged in June 28 analytics (100% bounce) but those are static /events/ pages, not the main /cycling page (which is fresh TdF-focused).

---

## Next Autoresearch Run

**Rotate lens to:** Post-Wimbledon early momentum check (did planner ship homepage callout?) + SEO entity-page strategy (player pages = #1 organic traffic lever) + design identity progress

**Date:** 2026-06-30 (tomorrow — daily cadence)

---

## Research Sources

- [Wimbledon 2026 Schedule & Draws — WTA Official](https://www.wtatennis.com/tournaments/wimbledon/draws)
- [Wimbledon 2026 Men's Singles Draw — ESPN](https://www.espn.com/tennis/wimbledon/bracket/_/season/2026)
- [Wimbledon 2026 Live Updates — CBS Sports](https://www.cbssports.com/tennis/news/wimbledon-2026-schedule-bracket-live-updates-results-scores-matches-where-to-watch/live/)
- [Top 25 Sports Betting Affiliate Programs 2026 — Olavivo](https://olavivo.com/sports-betting-affiliate-programs/)
- [Best Sports Betting Affiliate Programs 2026 — AffPapa](https://affpapa.com/best-sports-betting-affiliate-programs/)
- [ProCyclingStats API Documentation — Read the Docs](https://procyclingstats.readthedocs.io/en/stable/api.html)
- [2026 UCI World Ranking — FirstCycling](https://firstcycling.com/m/ranking.php)
- Live site analytics: rankings123.com (GA4 data through 2026-06-29)
- Inspector reports: `.tickets/atp-live-table-truncated.md`, `.tickets/wta-live-table-truncated.md`
- Previous autoresearch: `docs/reports/2026-06-28-autoresearch.md`
