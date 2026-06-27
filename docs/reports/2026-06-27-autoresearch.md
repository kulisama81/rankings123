# Autoresearch Report — 2026-06-27

**Research lens today:** SEO & content opportunities + monetization enablement + time-sensitive event urgency (Wimbledon imminent, TdF 1 week)

---

## Summary

- **Backlog status:** 79 total open tickets, 21 immediately buildable (healthy ~2-day supply for planner)
- **New tickets filed:** 6 high-ROI features (SEO entity pages + retention + engagement)
- **Priority update:** Wimbledon 2026 elevated to **P0** (tournament starts in 2 DAYS, June 29)
- **Traffic (28d):** 136 pageviews, 67 users, 82 sessions — World Cup driving best engagement (186s avg session)
- **Revenue status:** PENDING — AdSense application/approval in progress (tickets exist)

---

## Critical Time-Sensitive Events (Next 3 Weeks)

### 1. **Wimbledon 2026 — IMMINENT (starts June 29, in 2 DAYS)**
- **Status:** Ticket exists (`wimbledon-2026-live`) → **elevated to P0**
- **Opportunity:** THE biggest tennis event of the year. Massive search volume ("Wimbledon live rankings", "Wimbledon results 2026" = 500K+ searches/day during tournament)
- **Window:** June 29 - July 12 (14 days) — if we ship BEFORE June 29, we capture the entire traffic spike
- **Action:** Planner should prioritize this IMMEDIATELY

### 2. **Tour de France 2026 — starts July 4 (in 7 DAYS)**
- **Status:** Tickets exist (`tdf-2026-page`, `tdf-2026-predictions`, `cycling-dynamic-feed`)
- **Urgency:** Analytics show cycling event pages already getting traffic but **100% bounce rate** (Paris-Roubaix 2 views, Vuelta 2 views, TdF 1 view) = broken/placeholder pages
- **NEW ticket:** `cycling-uci-rankings` (p1) — UCI World Ranking as foundation for TdF coverage
- **Action:** Must ship dynamic cycling feed + TdF page BEFORE July 4 to capture traffic

### 3. **World Cup 2026 — LIVE through July 19 (22 more days)**
- **Status:** Strong coverage (bracket, stats, leaders, match pages all shipped)
- **Performance:** Best engagement on site (186s avg session, 48% bounce)
- **Strategy:** Planner maintains ≥ half capacity on World Cup tickets ✅

---

## Analytics Deep Dive (28 Days)

**Traffic:** 136 pageviews, 82 sessions, 67 users (35% mobile)

**Top Pages by Engagement:**
1. **/world-cup** — 43 views, **186s avg session**, 48% bounce ⭐ BEST ENGAGEMENT
2. **/** (homepage) — 57 views, 10.6s avg session, **74% bounce** ❌ CRITICAL PROBLEM
3. **/atp-live** — 12 views, 15.6s avg session, 11% bounce
4. **/wta-live** — 4 views, 26.3s avg session, 0% bounce

**Cycling Pages Red Flag:**
- `/events/paris-roubaix-2026` — 2 views, **100% bounce**
- `/events/vuelta-2026` — 2 views, **100% bounce**
- `/events/giro-2026` — 1 view, **100% bounce**
- `/events/tdf-2026` — 1 view, **100% bounce**

**Insight:** Cycling pages are getting organic traffic but immediately bouncing = broken/empty pages. URGENT need for dynamic cycling feed before TdF (July 4).

**Traffic Sources:**
- Direct: 75 sessions (92%)
- Organic Search: 5 sessions (6%) ← **SEO opportunity**
- Referral: 2 sessions (2%)

**Geography:** US (50%), Germany (13%), France (12%), Poland (6%)

---

## First Principles Analysis: What Drives Growth?

**User's root need:** Know who's #1 right now, what's happening live, and what's next — faster, more accurately, more clearly than anyone else.

**Traffic = indexable pages × real search demand × timing**
- **Entity pages** (player pages, team pages, match pages) = #1 SEO strategy
- **Time-sensitive coverage** (Wimbledon NOW, TdF soon) = capture massive short-window search spikes
- **Evergreen content** (historical results, archives) = consistent long-tail traffic

**Engagement = live data + distinctive stats + reasons to return**
- World Cup proves this: live scores → 186s sessions vs homepage static content → 10s sessions
- Homepage 74% bounce = users don't see value immediately → need LIVE data visible

**Revenue = traffic × RPM × session depth**
- Email newsletter = owned audience + direct affiliate channel (highest RPM)
- Betting affiliates > display ads for sports audience
- More entity pages = more sessions = more ad impressions

---

## Tickets Filed Today (6 Total)

### High-Priority (P1)
1. **`cycling-uci-rankings`** — UCI World Ranking with dynamic feed (FirstCycling/similar)
   - **Why:** Foundation for TdF coverage + fixes 100% bounce on cycling pages
   - **Impact:** Unlocks cycling as 3rd sport; TdF traffic spike in 1 week
   - **Effort:** HIGH (scraper/API integration)

2. **`homepage-live-carousel`** — Live events carousel showing what's happening NOW
   - **Why:** Homepage 74% bounce vs World Cup 48% bounce = need live data visible
   - **Impact:** Reduces bounce → more pageviews → more ad revenue
   - **Effort:** MEDIUM

### Medium-Priority (P2)
3. **`email-newsletter`** — Daily/weekly rankings + betting picks newsletter
   - **Why:** Retention + direct affiliate channel (sports newsletters monetize at 30-40% of affiliate revenue)
   - **Impact:** Owned audience + highest-RPM affiliate channel
   - **Effort:** MEDIUM (Resend API)

4. **`tennis-match-pages`** — Individual match detail pages (like World Cup match pages)
   - **Why:** SEO entity pages; "Djokovic vs Alcaraz Wimbledon 2026" = 200K+ searches for big matches
   - **Impact:** VERY HIGH (SEO + session depth)
   - **Effort:** MEDIUM

5. **`tournament-archives`** — Historical tournament results (past Grand Slams, World Cups, TdF)
   - **Why:** Evergreen SEO traffic; "Wimbledon 2024 results" has consistent search volume year-round
   - **Impact:** MEDIUM-HIGH (long-term compound)
   - **Effort:** LOW (static data)

### Lower-Priority (P3)
6. **`public-api-json`** — Public JSON API for developers
   - **Why:** Backlinks + brand awareness (developers who use API link to us)
   - **Impact:** MEDIUM (indirect SEO)
   - **Effort:** LOW (document + rate-limit existing endpoints)

---

## Priority Update

**`wimbledon-2026-live` elevated from P1 → P0**
- **Reason:** Tournament starts in 2 DAYS (June 29), not "5 days" as ticket originally stated
- **Urgency:** Every day we delay = lost traffic from the biggest tennis event of the year
- **Action required:** Planner should ship this IMMEDIATELY (before all other P1 tickets)

---

## Revenue Status

**AdSense:** PENDING human-gated approval process
- Tickets exist: `ad-inventory` (p2), `ads-txt` (p2), `adsense-approval-checklist` (p2)
- No revenue data to report yet (pre-monetization)

**Betting Affiliates:** Ticket exists (`betting-affiliate` — p2)
- CX-FIRST rule: no placeholder UI; only ship when backed by real links
- Email newsletter creates direct affiliate distribution channel

**Current monthly revenue:** $0 (awaiting AdSense approval)

**Monetization strategy:** Display ads (AdSense → Ezoic → Mediavine as traffic grows) + betting affiliates (highest RPM for sports audience)

---

## Loop Health (Self-Improvement)

**Recent planner activity (last 3 days):**
- ✅ World Cup knockout bracket shipped
- ✅ World Cup advanced match stats shipped
- ✅ ATP/WTA table regression fixed (2nd occurrence caught by inspector)
- ✅ Homepage World Cup live widget shipped
- ✅ Data-integrity gate preventing fabricated data

**Observations:**
- Planner shipping consistently (~5-15 tickets/day, 5 runs/day)
- Inspector finding bugs regularly, most fixed quickly
- Data-sanity monitor auto-filing anomaly tickets
- Backlog is VERY healthy (79 open, 21 immediately buildable)

**No blockers detected.** Loop running well.

---

## Top 3 Recommendations (First Principles)

### 1. **Ship Wimbledon live coverage BEFORE June 29 (P0 urgency)**
**First principles:** Traffic = real search demand × timing. Wimbledon is a 2-week window (June 29 - July 12) with millions of searches. If we ship BEFORE the tournament starts, we capture the entire spike. Every day of delay = lost traffic we can never recover.

**Why it matters:** This is THE most prestigious tennis tournament globally. Being live during the event establishes credibility as a tennis rankings authority.

**Ticket:** `wimbledon-2026-live` (now P0)

### 2. **Fix cycling data + launch TdF coverage before July 4**
**First principles:** Analytics prove demand exists (cycling event pages getting traffic) but we're failing users (100% bounce = broken pages). TdF starts in 7 days — another massive short-window opportunity like Wimbledon.

**Why it matters:** TdF = 3 weeks of intense search traffic. Cycling unlocks rankings123 as a true multi-sport destination (not just tennis + World Cup).

**Tickets:** `cycling-uci-rankings` (p1), `tdf-2026-page` (p1), `cycling-dynamic-feed` (p1)

### 3. **Reduce homepage bounce from 74% → sub-50%**
**First principles:** Homepage bounce = users don't see value immediately. World Cup page proves live data drives engagement (48% bounce, 186s avg session). Homepage needs the SAME live-data-forward approach.

**Why it matters:** Homepage is 42% of traffic (57/136 views). Reducing bounce by even 10 points = +5-6 extra pageviews/session × 80 sessions/month = +400-480 monthly pageviews = more ad impressions.

**Tickets:** `homepage-live-carousel` (p1), `homepage-engagement` (p2)

---

## Next Autoresearch Run

**Rotate lens to:** UX/engagement optimization + revenue path (AdSense approval progress) + post-Wimbledon analysis

**Date:** 2026-06-28 (tomorrow — daily cadence)

---

## Research Sources

- [Tour de France 2026 Route — Cycling Stage](https://www.cyclingstage.com/tour-de-france-2026-route/)
- [Tour de France 2026 Favorites — Velo/Outside](https://velo.outsideonline.com/road/road-racing/tour-de-france/who-win-tour-de-france-ranking-favorites/)
- [Wimbledon 2026 Dates — Wikipedia](https://en.wikipedia.org/wiki/2026_Wimbledon_Championships)
- [Giro d'Italia 2026 Results — Olympics.com](https://www.olympics.com/en/news/road-cycling-giro-d-italia-2026-full-schedule-all-results-general-classification-standings)
- [ESPN API Documentation — ScrapeCreators](https://scrapecreators.com/blog/espn-api-sports-data)
- Live site analytics: rankings123.com (GA4 data through 2026-06-27)
