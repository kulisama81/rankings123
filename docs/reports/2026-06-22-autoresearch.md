# Autoresearch Report — 2026-06-22

**Focus lens today:** Data source expansion + SEO opportunities (rotating daily)

---

## 1. What Shipped Recently (Last 7 Days)

**4 tickets closed, strong planner performance:**

- **World Cup player pages** (wc-player-pages) — Top 50 tournament performers, SEO long-tail ("Messi World Cup 2026 stats"), 86 player pages in sitemap
- **WC bracket fix** (wc-bracket-tree-render) — Full R32→R16→QF→SF→Final structure now visible, regression test added
- **WC perf optimization** (perf-wc-dedupe-fetches) — Deduplicated ESPN API fetches, ~100-200ms TTFB savings
- **CX-first compliance** — Purged all fabricated mock data (cycling events, etc.), added regression tests

**Loop health:** Planner consistently shipping 1-2 tickets per run, meeting World Cup ≥50% allocation, adversarial verification catching issues (verifier initially caught incomplete dedupe fix).

---

## 2. Traffic & Revenue Status

**Traffic (GA4, last 28 days):**
- **50 users, 59 sessions, 94 pageviews** (early stage, pre-SEO)
- **Top pages:** Homepage (50 views, 86% bounce), World Cup (19 views, 56% bounce), ATP Live (10 views, 63% bounce)
- **World Cup engagement is VERY STRONG:** 621.8s avg session duration (10+ minutes) vs 19.1s homepage, 146.2s ATP
- **Traffic source:** 97% Direct (57/59 sessions) — SEO not yet effective, almost all direct navigation
- **Cycling /events traffic:** 13 cycling event pages got hits but ALL returned 404 or 0s duration (confirmed broken after mock purge — correct behavior, now need real cycling data)

**Revenue:**
- **AdSense:** PENDING approval + integration (ticket ad-inventory p2, adsense-approval-checklist p2)
- **Odds/betting affiliates:** PENDING (odds-api p1 ready for API key, betting-affiliate p2 framework design)
- **Current ad revenue:** $0 (no ads live yet)

**Key insight:** World Cup is sticky (10+ min sessions) during live tournament — priority to keep momentum through July 19.

---

## 3. Competitor & Market Research

**live-tennis.eu analysis:**
- Site blocked WebFetch with 403 (Cloudflare protection), but feature set is well-documented
- **Parity gaps covered:** Most competitor features already have tickets (player-pages p1, head-to-head p1, live-scores p1, race-rankings p1, points-defend p1, doubles p3, rank-history p1)
- **Missing usability feature:** Nationality/country filter on ranking tables (they have it, we don't) — HIGH usability value for 1000+ player lists. **New ticket filed:** rankings-country-filter (p2)

**Data source opportunities (keyless, dynamic feeds):**

1. **Cycling (CRITICAL — data freshness failure):**
   - ProCyclingStats has a Rankings API (documented at procyclingstats.readthedocs.io)
   - FirstCycling has 2026 UCI rankings (Pogačar 10865 pts, Vingegaard 8625 pts)
   - Both provide live results + current/recent races
   - **Action:** Existing tickets cycling-dynamic-feed (p1) + cycling-page (p1) cover this

2. **World Cup advanced stats:**
   - xG/possession/shot maps available from: TheStatsAPI ($50/mo), Enetpulse (paid), xGscore (free analytics), RealGM tracker
   - **Action:** Existing ticket opta-soccer-stats (p2) + wc-xg-stats (p2) cover this
   - **NEW opportunity:** Team-level stat leaderboards (most goals, best defense, discipline) from ESPN API already in use. **New ticket filed:** wc-team-stats-dashboard (p1, time-sensitive)

3. **Tennis live scores:**
   - APIs available: Tennis API (MatchStat), Goalserve, SportRadar, Tennis-API.com
   - All require paid subscriptions for real-time updates
   - **Action:** Existing ticket live-scores (p1) covers this

4. **Sports betting odds:**
   - The Odds API (affiliate widget support), OddsJam (maximizes affiliate revenue)
   - **Action:** Existing ticket odds-api (p1) ready for API key

**SEO opportunities:**

- **Tournament pages:** Grand Slam pages (Wimbledon, US Open, etc.) have huge search volume during/after tournaments. **New ticket filed:** tennis-major-tournament-pages (p2)
- **Player pages:** Already in backlog (player-pages p1), sitemap already includes WC player pages (86 URLs)
- **Structured data:** Schema.org markup already implemented on ATP/WTA/WC pages (verified in src/)

---

## 4. Loop Performance & Process Health

**Planner (4 runs analyzed from logs):**
- ✅ Consistent 1-2 ticket throughput per run
- ✅ World Cup ≥50% allocation met (perf-wc-dedupe-fetches, wc-bracket-tree-render, wc-player-pages)
- ✅ Adversarial verification working (caught incomplete dedupe fix, required re-verify)
- ✅ Post-deploy verification in place (Vercel build checks + live smoke tests)
- ⚠️ **Inspector filed 2 critical WC regressions** (wc-match-pages-404-regression p0, wc-team-roster-missing-regression p1) — features marked "closed" but broken in production. Planner should prioritize these.

**Inspector (2×/day):**
- ✅ Finding real bugs (2 WC regressions just filed)
- ✅ Filing reproducible tickets with regression test requirements
- 📊 Inspector effectiveness high (catching production issues before user reports)

**Backlog health:**
- **22 buildable (ready) tickets** — healthy (≥12 threshold)
- **15 total p0/p1 tickets** — good prioritization signal
- **World Cup backlog:** 12+ wc-tagged tickets (healthy given ≥50% allocation)
- **Action:** Added 3 new tickets today (staying lean per 22 buildable count)

**Observations:**
- Loop is functioning well (ship → verify → deploy → live-check)
- Data-sanity checks catching placeholder content (cycling regression test added)
- Ticket hygiene improved (commit-msg hook strips Co-Authored-By trailers)

---

## 5. New Tickets Filed (ROI-Ranked)

**3 tickets created** (backlog was healthy at 22 buildable, staying lean):

### 1. wc-team-stats-dashboard (p1, worldcup, engagement) — TIME-SENSITIVE
**What:** Team statistical leaderboards on /world-cup — most goals scored, best defense, most disciplined, etc.  
**Why (first principles):**
- World Cup live through ~July 19 (short window)
- WC pages have 621s avg session (highest engagement on site)
- ESPN API already provides team stats (low effort to surface)
- Shareable, discussable content (virality potential)
- Differentiates from basic standings table

**ROI:** HIGH (time-sensitive, high engagement, low effort)

### 2. rankings-country-filter (p2, tennis, usability)
**What:** Client-side filter to view ATP/WTA rankings by country (e.g., "Show only USA players")  
**Why (first principles):**
- live-tennis.eu has this (parity gap)
- Essential usability for 1000+ player lists (ATP 1000+, WTA 1500+)
- Fans want to track their country's players without scanning full table
- Low effort (client-side filtering, no API changes)

**ROI:** MEDIUM-HIGH (usability win, competitor parity, low effort)

### 3. tennis-major-tournament-pages (p2, tennis, seo)
**What:** Dedicated pages for Grand Slams + Masters 1000 tournaments (Wimbledon, US Open, etc.) with draws/results/points  
**Why (first principles):**
- Huge SEO long-tail ("Wimbledon 2026 draw", "US Open 2026 results")
- Tournament-specific indexable pages drive organic search traffic
- Users want tournament-centric views, not just overall rankings
- Higher pages/session (rankings → tournament → player)

**ROI:** MEDIUM (high SEO value, medium effort)

---

## 6. Top Recommendations

**Immediate (next 2 planner runs):**
1. **Fix WC regressions** (wc-match-pages-404-regression p0, wc-team-roster-missing-regression p1) — user-facing 404s and missing content
2. **Ship wc-team-stats-dashboard** (p1) — time-sensitive for live WC engagement
3. **Continue tennis parity** (player-pages p1, live-scores p1) — SEO + core value prop

**This week:**
4. **Wire cycling dynamic feed** (cycling-dynamic-feed p1, cycling-page p1) — fix data freshness failure (404s getting traffic)
5. **Odds API integration** (odds-api p1) — revenue enabler (betting affiliates = highest RPM for sports)

**Long-term (revenue path):**
- AdSense approval → Ezoic (10k+ sessions/mo) → Mediavine (50k+ sessions/mo)
- Betting/odds affiliates (higher RPM than display ads for sports audience)
- SEO compound: player pages + tournament pages → organic search traffic → sessions → ad impressions

---

## Appendix: Research Sources

**World Cup advanced stats:**
- [xGscore — World Cup 2026 xG Statistics](https://xgscore.io/xg-statistics/world-cup/2026)
- [TheStatsAPI — FIFA World Cup 2026 API](https://www.thestatsapi.com/world-cup)
- [RealGM — 2026 FIFA World Cup xG Tracker](https://soccer.realgm.com/analysis/559/2026-FIFA-World-Cup-xG-Tracker-Results-Expected-Goals-Of-Every-Match)

**Cycling data:**
- [ProCyclingStats](https://www.procyclingstats.com/)
- [ProCyclingStats API Documentation](https://procyclingstats.readthedocs.io/en/stable/api.html)
- [FirstCycling — 2026 UCI World Ranking](https://firstcycling.com/m/ranking.php)

**Tennis APIs:**
- [Tennis API (MatchStat) Documentation](https://tennisapidoc.matchstat.com/)
- [Tennis-API.com](https://tennis-api.com/)
- [WTA Race Rankings](https://www.wtatennis.com/rankings/race-singles)

**Betting/Odds APIs:**
- [The Odds API](https://the-odds-api.com/)
- [OddsJam Odds API](https://oddsjam.com/odds-api)
- [SportsDataIO Odds API](https://sportsdata.io/live-odds-api)

---

**Next autoresearch run:** 2026-06-23 (rotate lens to monetization + UX/engagement)
