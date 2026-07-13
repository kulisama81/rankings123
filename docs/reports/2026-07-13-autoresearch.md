# Autoresearch Report — 2026-07-13

**Focus Lens Today:** World Cup finals urgency + data freshness crisis + revenue enablement

**Backlog Health:** 20 buildable tickets (healthy range). Added 5 high-ROI tickets this run.

---

## 1. Recent Shipments (Since Last Run)

**Last 48 Hours Shipped (from git log):**
- ✅ World Cup finals countdown widget
- ✅ Tennis player pages with SEO-friendly slug URLs (top 200)
- ✅ Nav accent color strengthening (per-sport identity)
- ✅ Tour de France live stage winners parsing
- ✅ ATP duplicate table bug fix

**Velocity:** Planner is shipping consistently (~3-5 tickets/day). Loop health is good.

---

## 2. Traffic & Revenue Status

### Traffic (GA4 — Last 28 Days)
- **76 users, 183 pageviews, 97 sessions**
- **Pages/session:** 1.89 (modest, room to grow)
- **Mobile:** 37% of traffic
- **Bounce rates:**
  - Homepage: **72.6%** ⚠️ (users land but don't explore)
  - World Cup: **40.0%** (strong engagement, 157s avg session)
  - ATP Live: **7.1%** (excellent)
  - Cycling: **0.0%** (but data is stale — see below)

**Top Pages:**
1. `/` — 71 views, 22s avg session, 72.6% bounce
2. `/world-cup` — 58 views, 157s avg session, 40% bounce
3. `/atp-live` — 16 views, 20s avg session, 7.1% bounce

**Geography:** US (51 sessions), Germany (11), France (10) — strong EU presence (our core tennis audience)

### Revenue
**Current:** $0 (AdSense not yet integrated, no betting affiliates)

**Blockers:** 
1. AdSense approval pending (application not yet submitted)
2. Betting affiliate signups not started (Bet365, Pinnacle, William Hill, DraftKings)

**Lead Times:** AdSense 7-14 days, betting affiliates 3-7 days → **execute NOW for revenue during peak traffic windows**

---

## 3. Critical Findings

### 🚨 CRISIS: Tour de France Data is Stale (P0 Bug Filed)

**Current State:** rankings123.com/cycling shows "General Classification will update once the race begins on July 4, 2026. Currently showing preview data." All stage winners show "—" dashes.

**Reality:** Tour de France 2026 is **LIVE NOW** (stage 9, rest day July 13). Tadej Pogačar leads by 2:42 over Vingegaard. 9 stages completed.

**Impact:** **Trust destroyer.** Claiming "live" when showing stale data is worse than no data. Users arrive expecting real-time standings, see placeholder, never return.

**Ticket:** `bug-tdf-live-data-stale` (P0) — root cause likely in Wikipedia API parsing (src/lib/cyclingFeed.ts)

**First Principles:** User's root need = "know what's happening RIGHT NOW." Stale data with "live" claims breaks that promise fundamentally.

---

### ⏱ TIME-SENSITIVE OPPORTUNITIES (Next 7 Days)

#### 1. World Cup Semifinals (July 14-15) — 1-2 Days Away
- **Matches:** France vs Spain (July 14), England vs Argentina (July 15)
- **Traffic Window:** Betting content peaks 24-48hr BEFORE match
- **Existing Ticket:** `wc-semifinals-content-hub` (P0) — already in backlog, ship ASAP

#### 2. World Cup Final (July 19) — 6 Days Away
- **Peak Attention:** The tournament's climax. Search volume for "World Cup final predictions" spikes 3-5 days before.
- **Revenue Opportunity:** Betting content RPM = $15-40 (vs $5-10 general sports) = **3-4x multiplier**
- **New Ticket:** `wc-final-ultimate-preview` (P0) — comprehensive final preview + betting hub, ship by July 17

#### 3. Wimbledon Finals (July 11-12) — THIS WEEKEND
- **Finals:** Ladies' final July 11, Men's final July 12 (Sinner vs Zverev)
- **Existing Tickets:** `wimbledon-2026-live` (P0), `wimbledon-betting-picks` (P1), `wimbledon-draw-bracket` (P0)
- **Status:** Tickets filed, planner should prioritize

**First Principles Reasoning:** These are **zero-marginal-cost traffic spikes** — the events are happening whether we cover them or not. Capturing the attention NOW (vs "someday") has infinite ROI because the window closes permanently after the event. Tournament finals = peak search volume + peak betting activity = maximum traffic × maximum RPM.

---

## 4. Competitive Analysis

### live-tennis.eu (Cloudflare-blocked, can't access directly)

**Known Parity Gaps (Phase 1):**
- ❌ Race Rankings (YTD points) — **New ticket filed:** `tennis-race-live-now` (P1)
- ❌ Points to defend / dropping — Ticket exists: `points-defend` (P1)
- ❌ Player detail pages — Ticket exists: `player-pages-top-50` (P1)
- ❌ Doubles rankings — Ticket exists: `doubles` (P3)
- ❌ Historical rankings — Ticket exists: `rank-history` (P1)

**First Principles:** Parity is the **credibility floor** — users compare us to live-tennis.eu and if we're missing obvious features, we're "not serious." But parity alone doesn't win — we need differentiation (Phase 2) after we close the gaps.

---

## 5. Revenue Enablement Research

### Sports Betting Affiliate Programs (Highest Paying 2026)

**Top Programs:**
- **Bet365:** 30% RevShare, 45-day cookie
- **Pinnacle:** 35% RevShare
- **William Hill:** 25-35% RevShare
- **DraftKings / FanDuel:** CPA $50-200 per player (US market)
- **RevMasters:** 50% first month

**Commission Models:**
- **RevShare:** 20-50% of net revenue (best for recurring traffic)
- **CPA:** $50-500 per player (best for high-converting content)
- **Hybrid:** Both (maximize revenue across user types)

**Why Betting Affiliates Beat AdSense:**
- AdSense RPM: $5-10 for general sports content
- Betting RPM: $15-40 (3-4x higher)
- Sports audience = high betting propensity = perfect match

**Action Required:** Sign up NOW (3-7 day approval lead time). New ticket filed: `revenue-sprint-now` (P0) consolidates all AdSense + betting affiliate work.

**First Principles:** Revenue = Traffic × RPM × Session Depth. We're working on Traffic (World Cup, Wimbledon, tennis parity). RPM depends on monetization quality — betting affiliates = highest RPM for a sports audience. Session Depth comes from engagement (live widgets, race rankings, player pages). All three levers must move in parallel.

### Data Source Research

**Cycling Data (to fix TdF bug):**
- ProCyclingStats.com — has live GC standings + stage results
- FirstCycling.com — clean UCI rankings + race results
- Wikipedia API — currently used but parsing may be broken
- SportBex Cycling API — may require paid tier

**Recommendation:** Fix Wikipedia parsing first (lowest effort). If broken, pivot to ProCyclingStats scraping (keyless, public).

---

## 6. Homepage Bounce Rate Crisis

**Problem:** 72.6% bounce rate = users land and leave without exploring.

**Why Users Bounce (First Principles):**
1. **No urgency signal** — Nothing tells them "something is happening RIGHT NOW"
2. **No value preview** — Can't see data without clicking through
3. **No personalization** — Can't tell what's relevant to them

**Solution:** Cross-sport "Live Now" widget showing which events are live RIGHT NOW with preview data.

**New Ticket:** `homepage-live-urgency-widget` (P1) — horizontal carousel showing live events (TdF stage, WC match, Wimbledon result) with pulsing "LIVE" badges + key stat snapshot + CTA.

**Hypothesis:** "LIVE" urgency + data preview → users click through → bounce rate drops to <50%.

**ROI:** Homepage is the front door. Fixing bounce = unlocking traffic we're already getting but losing immediately.

---

## 7. Loop Health

**Planner Performance:**
- ✅ Shipping consistently (3-5 tickets/day)
- ✅ No stuck/blocked tickets (except human handoffs like AdSense/GA4)
- ✅ Inspector finding bugs proactively (good quality feedback loop)
- ⚠️ Some duplicate tickets (betting affiliates) — consolidated in `revenue-sprint-now`

**Backlog Composition:**
- **20 buildable tickets** (healthy)
- **World Cup:** 29 tickets (well-stocked for ≥50% planner capacity)
- **Tennis parity:** ~10 tickets (sufficient)
- **Revenue:** 10+ tickets (now consolidated into `revenue-sprint-now`)
- **Design/UX:** ~15 tickets

**Process Improvements:** None needed this run. Loop is performing well.

---

## 8. Top 5 New Tickets (ROI-Ranked)

### 1. `bug-tdf-live-data-stale` (P0, Bug)
**Problem:** Tour de France page shows stale "preview data" when race is live (stage 9).
**Impact:** Trust destroyer. "Live" claims with stale data = users never return.
**Effort:** LOW-MEDIUM (fix Wikipedia parsing or pivot to alternate source)
**ROI:** CRITICAL (fixes active defect harming reputation)

### 2. `wc-final-ultimate-preview` (P0, Feature)
**Problem:** World Cup final (July 19) is 6 days away. Peak betting/traffic window.
**Impact:** Time-sensitive revenue opportunity. Final = maximum search volume + betting activity.
**Effort:** MEDIUM (comprehensive preview + odds + betting CTAs)
**ROI:** VERY HIGH (peak tournament moment, 3-4x RPM with betting content, window closes after July 19)

### 3. `revenue-sprint-now` (P0, Task)
**Problem:** Revenue is $0. AdSense + betting affiliates have multi-week lead times. Duplicate tickets scattered.
**Impact:** Consolidates and EXECUTES revenue enablement NOW so revenue flows during peak traffic (WC finals, Wimbledon finals).
**Effort:** MEDIUM (applications + integrations in parallel)
**ROI:** VERY HIGH (unblocks entire revenue stream, long-term compound effect)

### 4. `tennis-race-live-now` (P1, Feature)
**Problem:** Parity gap vs live-tennis.eu. Race Rankings (YTD points) are prominent competitor feature.
**Impact:** Closes credibility gap + doubles tennis surface area (users check both regular + race rankings) = 2x impressions.
**Effort:** LOW (reuse existing feed + table patterns, filter to YTD points)
**ROI:** HIGH (low effort, clear user value, parity + engagement + SEO)

### 5. `homepage-live-urgency-widget` (P1, Feature)
**Problem:** 72.6% homepage bounce rate. Users land and leave without exploring.
**Impact:** Unlocks traffic we're already getting but losing immediately. "LIVE" urgency + data preview drives click-through.
**Effort:** MEDIUM (cross-sport data aggregation + widget UI)
**ROI:** HIGH (homepage is front door — fixing bounce = multiplier on all traffic sources)

---

## 9. Recommendations (Top 3)

### 1. **Ship World Cup Finals Content by July 17** (URGENT)
The final is July 19 (6 days away). Betting content peaks 24-48hr before match. This is a **zero-marginal-cost traffic spike** — capture it NOW or lose it forever when the tournament ends.

**Action:** Prioritize `wc-semifinals-content-hub` (P0, ships July 13-14) and `wc-final-ultimate-preview` (P0, ships by July 17).

### 2. **Fix Tour de France Data Bug Immediately** (CRITICAL)
Showing stale data with "live" claims is a **trust destroyer**. This is worse than no TdF page at all. Ship `bug-tdf-live-data-stale` (P0) ASAP — ideally same day as discovery.

**Action:** Debug Wikipedia API parsing (src/lib/cyclingFeed.ts) or pivot to ProCyclingStats/FirstCycling.

### 3. **Execute Revenue Sprint in Parallel** (UNBLOCK REVENUE)
Revenue is $0 because AdSense and betting affiliates aren't set up yet. Both have **multi-week lead times** (AdSense 7-14 days, affiliates 3-7 days). Start NOW so revenue flows during peak traffic (WC finals, Wimbledon finals).

**Action:** Ship `revenue-sprint-now` (P0) — AdSense application + ads.txt + ≥3 betting affiliate signups in parallel.

---

## 10. First-Principles Strategy Check

**User's Root Need:** Know who's #1 right now, what's happening live, and what's next — **faster, more accurately, and more clearly than anyone else.**

**How Today's Tickets Serve That:**
- `bug-tdf-live-data-stale` → **Accuracy** (fix stale data breaking "right now" promise)
- `wc-final-ultimate-preview` → **What's next** (finals preview) + **Faster** (ship before competitors)
- `homepage-live-urgency-widget` → **Right now** signal (what's live RIGHT NOW)
- `tennis-race-live-now` → **More clearly** (YTD vs 52-week story is clearer context)
- `revenue-sprint-now` → Enables sustainability (revenue funds growth)

**Strategic Alignment:** ✅ All tickets trace back to core user need or business sustainability. No "nice-to-haves" or copied-without-reasoning features.

---

## Sources

Research citations (as required by WebSearch tool):

**World Cup Schedule:**
- [2026 FIFA World Cup semifinals: Schedule, how to watch live, predictions - NBC Sports](https://www.nbcsports.com/soccer/news/when-are-the-2026-fifa-world-cup-semifinals-dates-confirmed-teams)
- [Which teams are in the World Cup semifinals, and what's the match schedule? - Al Jazeera](https://www.aljazeera.com/sports/2026/7/12/which-teams-are-in-the-world-cup-semifinals-and-whats-the-match-schedule)
- [FIFA World Cup 2026 Semifinals Schedule – Dates, Times, Venues & Fixtures](https://www.fifaworldcupnews.com/fifa-world-cup-2026-semifinals/)

**Tour de France 2026:**
- [2026 Tour de France Standings: Who's in the yellow jersey? - IDL Procycling](https://www.idlprocycling.com/cycling/2026-tour-de-france-standings-new-yellow-white-and-green-jersey-wearers)
- [Tour de France 2026 GC standings – Tadej Pogačar remains in yellow - Cyclingnews](https://www.cyclingnews.com/pro-cycling/racing/tour-de-france-gc-standings-2026/)
- [Tour de France 2026 | Stage winners and leaders - ProCyclingStats](https://www.procyclingstats.com/race/tour-de-france/2026/results)

**Wimbledon 2026:**
- [Wimbledon 2026: Full order of play featuring Sinner vs Zverev in men's final - Olympics.com](https://www.olympics.com/en/news/wimbledon-2026-order-of-play-12-july-all-matches-complete-schedule)
- [What is the Wimbledon schedule? - ATP Tour](https://www.atptour.com/en/news/wimbledon-2026-schedule)

**Cycling Data Sources:**
- [Road | RANKINGS | UCI](https://www.uci.org/discipline/road/6TBjsDD8902tud440iv1Cu?tab=rankings)
- [2026 UCI WorldTour Results & Rankings - CyclingGrid](https://cyclinggrid.com/)
- [2026 UCI World Ranking - FirstCycling](https://firstcycling.com/m/ranking.php)
- [Cycling API for Apps, Websites and Sports Platforms - SportBex](https://sportbex.com/cycling-api/)

**Sports Betting Affiliates:**
- [21 Best Sports Betting Affiliate Programs of 2026 - AffPapa](https://affpapa.com/best-sports-betting-affiliate-programs/)
- [The Best Sports Betting Affiliate Programs in 2026 - 15M](https://15m.com/affiliate-programs/betting/)
- [Top 25 Sports Betting Affiliate Programs in 2026 - Olavivo](https://olavivo.com/sports-betting-affiliate-programs/)
- [Best Sports Betting Affiliate Programs (2026) - Traffic Cardinal](https://en.trafficcardinal.com/post/betting-affiliate-programs-in-2025-2026)

---

**Next Autoresearch Run:** 2026-07-14 (daily cadence)
**Lens Rotation Next Run:** Revenue optimization + Wimbledon finals wrap + post-WC-semifinals traffic analysis
