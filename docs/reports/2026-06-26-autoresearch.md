# Autoresearch Report — 2026-06-26

**Research lens today:** Competitor feature gaps (Phase 1 parity) + World Cup opportunities (tournament LIVE) + data freshness audit + differentiating stats

---

## Summary

- **Backlog status:** 22 buildable tickets (healthy ~2-day supply for planner)
- **World Cup tickets:** 10 (up from 6) — well-stocked for ≥ half planner capacity during tournament
- **New tickets filed:** 11 high-ROI features (weighted World Cup + Phase 1 parity + time-sensitive events)
- **Traffic (28d):** 135 pageviews, 66 users, 81 sessions — World Cup driving best engagement (192s avg session vs 10-15s tennis)
- **Revenue status:** PENDING — AdSense application/approval process (tickets exist: ad-inventory, ads-txt, adsense-approval-checklist)

---

## Recent Planner Activity (Last 7 Days)

The loop is shipping consistently:

✅ **World Cup features shipped:**
- Knockout stage hub with live results and countdown timers
- Head-to-head history on match pages
- Match predictions via The Odds API integration
- Venue pages (16 stadiums)
- Fixed placeholder text bugs and data inconsistencies

✅ **Performance + QA:**
- Fixed ISR regression on ATP/WTA pages
- Inspector and perf-inspector running regularly, finding/fixing bugs
- Data-integrity gate preventing fabricated data from shipping

---

## Competitor Intelligence (Phase 1 Parity)

**Researched:** live-tennis.eu (site blocking WebFetch, used search + domain knowledge)

**Parity gaps we still need (existing tickets):**
- ✅ Live match scores (`live-scores` — p1)
- ✅ Player profile pages (`player-pages` — p1)
- ✅ Head-to-head (`head-to-head` — p1)
- ✅ Points to defend (`points-defend`, `defend-next` — p1)
- ✅ Race rankings (`race-rankings` — p1)
- ✅ Historical rankings (`rank-history` — p1)
- ✅ Doubles rankings (`doubles` — p3)

**NEW parity opportunities (tickets filed today):**
- **Next-week ranking projections** (`tennis-next-week-projection` — p1) — live-tennis.eu has this; shows "what if current tournament results hold"
- **Tournament calendar** (`tennis-tour-calendar` — p2) — context for why rankings are changing

---

## World Cup — LIVE Tournament (Through ~July 19)

**Current Golden Boot standings (verified against live site):**
1. Messi (ARG) — 5 goals ✅ CORRECT on our site
2. Vinícius Júnior (BRA) — 4 goals ✅ CORRECT
3. Haaland (NOR) — 4 goals ✅ CORRECT
4. Mbappé (FRA) — 4 goals ✅ CORRECT
5. Saibari (MAR) — 3 goals ✅ CORRECT

Our data is **accurate and current** — excellent.

**Opportunities (tickets filed today):**
1. **Interactive knockout bracket** (`wc-bracket-interactive` — p1) — PEAK ENGAGEMENT tool for knockout rounds (starting soon)
2. **Live match ticker** (`wc-live-ticker` — p2) — real-time goal feed across all matches
3. **Group stage scenarios calculator** (`wc-group-scenarios` — p2) — "what-if" tool for final group matches
4. **Homepage live match widget** (`homepage-wc-live-widget` — p1) — reduce 74% homepage bounce by showing live scores
5. **SEO structured data** (`seo-structured-data-wc` — p2) — schema.org markup for Google rich results

**Advanced stats opportunity:**
- **xG, shot maps, player stats** — FotMob and SofaScore have this (ticket exists: `wc-xg-stats` — p2)
- Evaluate free alternatives to Opta (FotMob API, SofaScore, FBref/StatsBomb, ESPN advanced endpoints)

---

## Differentiating Stats (Every Run Hunt)

**Filed today:**
- **Tennis streak/form indicators** (`tennis-streak-form` — p2) — show W5/L2 streaks and recent form in ranking tables (ESPN has this data)
- **Biggest movers highlight** (`tennis-biggest-movers` — p2) — surface "who's surging/crashing" stories

**First principles:** Current rank is static; FORM is what fans use to judge who's hot/cold and predict performance. These stats make rankings engaging and forward-looking, not just archival.

---

## Data Freshness Audit

**Cycling:** BROKEN/MISSING (as flagged in autoresearch.md)
- No cycling files found in codebase (removed or never implemented)
- **FirstCycling has live 2026 UCI rankings:** Pogačar leads (10,865 pts), Vingegaard 2nd (8,625), del Toro 3rd (5,339)
- **Tour de France 2026 starts July 5** (9 days away) — massive traffic opportunity
- ✅ Existing tickets: `cycling-dynamic-feed` (p1), `firstcycling-mcp` (p1), `cycling-page` (p1)
- ✅ **NEW:** `cycling-tdf-2026` (p1) — TdF-specific live GC standings page (time-sensitive)

**All other sports:** Tennis (ATP/WTA) and World Cup data verified as fresh and accurate.

---

## Time-Sensitive Events (Next 3 Weeks)

1. **World Cup 2026** — LIVE NOW through ~July 19
   - Knockout rounds starting soon (peak engagement window)
   - Planner spending ≥ half capacity on WC ✅

2. **Wimbledon 2026** — June 29 to July 12 (starts in 3 days!)
   - Ticket exists: `wimbledon-2026-live` (p1)
   - Opportunity: live rankings updates during tournament

3. **Tour de France 2026** — July 5 to July 27 (starts in 9 days!)
   - NEW ticket: `cycling-tdf-2026` (p1)
   - Depends on cycling dynamic feed shipping first

---

## Analytics Insights (28 Days)

**Traffic:** 135 pageviews, 66 users, 81 sessions (36% mobile)

**Top pages by engagement:**
1. **/world-cup** — 42 views, **192s avg session**, 50% bounce ⭐ BEST ENGAGEMENT
2. **/** (homepage) — 57 views, 10.6s avg session, **74% bounce** ❌ PROBLEM
3. **/atp-live** — 12 views, 15.6s avg session, 11% bounce
4. **/wta-live** — 4 views, 26.3s avg session, 0% bounce

**Key insight:** World Cup driving 10-20× better engagement than tennis. Homepage bounce rate is critical issue.

**Recommended actions:**
- ✅ `homepage-wc-live-widget` (p1) — show live WC scores on homepage to reduce bounce
- ✅ `homepage-engagement` (p2) — existing ticket for broader homepage improvements

---

## Revenue Status

**AdSense:** PENDING application/approval (human-gated)
- Tickets exist: `ad-inventory` (p2), `ads-txt` (p2), `adsense-approval-checklist` (p2)
- No revenue numbers to report yet — will update when AdSense is live

**Betting affiliates:** High-RPM opportunity (ticket exists: `betting-affiliate` — p2)
- CX-FIRST rule applies: no placeholder affiliate UI; only ship when backed by real links

**Current RPM:** $0 (pre-monetization)

---

## Loop Health (Self-Improvement)

**Observations:**
- Planner shipping consistently (~5-15 tickets/day, 5 runs/day)
- Inspector and perf-inspector finding/fixing bugs regularly
- Data-integrity gate preventing fabricated data ✅
- ISR regression caught and fixed quickly ✅

**Process improvement opportunity:**
- ✅ `backlog-roi-scoring` (p3) — explicit ROI scoring system to help autoresearch and planner align on highest-leverage work

**No blockers or stalls detected.** Loop is healthy.

---

## Top 3 Recommendations (First Principles)

### 1. Ship World Cup interactive bracket + live widgets ASAP (p1)
**Why:** Knockout rounds starting soon = PEAK tournament engagement window. Visual brackets and live scores are what fans check constantly during tournaments.

**First principles:** During a live event, users return to see "what's happening RIGHT NOW" and "what's next." Static standings don't answer this; live widgets and brackets do. Short window to capture this traffic — after July 19, it's gone.

**Tickets:** `wc-bracket-interactive`, `homepage-wc-live-widget`, `wc-live-ticker`

### 2. Prepare for Wimbledon (June 29) and Tour de France (July 5)
**Why:** Two massive traffic events starting in 3-9 days. Like World Cup, these are short-window opportunities we can't miss.

**First principles:** Traffic = indexed pages × search demand × timing. Wimbledon and TdF have HUGE search demand during their ~2-3 week windows, then it crashes. Being live with real data during the event is the entire game.

**Tickets:** `wimbledon-2026-live` (p1), `cycling-tdf-2026` (p1), `cycling-dynamic-feed` (p1)

### 3. Add differentiating stats to tennis rankings (Phase 2 prep)
**Why:** Parity is nearly done; differentiation is what makes us a destination, not just a clone.

**First principles:** Users don't just want to know "who's #1" (anyone can show that) — they want to understand WHY (form, streaks, momentum) and WHAT'S NEXT (projections, points to defend). These forward-looking stats are what drive repeat visits.

**Tickets:** `tennis-next-week-projection` (p1), `tennis-streak-form` (p2), `tennis-biggest-movers` (p2)

---

## Tickets Filed Today (11 Total)

### World Cup (6 tickets — priority for live tournament)
1. `wc-bracket-interactive` (p1) — Interactive knockout bracket visualization
2. `homepage-wc-live-widget` (p1) — Live match scores widget on homepage
3. `seo-structured-data-wc` (p2) — Schema.org markup for rich snippets
4. `wc-live-ticker` (p2) — Real-time goal notifications feed
5. `wc-group-scenarios` (p2) — Group stage "what-if" calculator
6. (2 duplicates: wc-match-pages, wc-team-pages already existed)

### Tennis (4 tickets — Phase 1 parity + differentiation)
7. `tennis-next-week-projection` (p1) — Next-week ranking projections
8. `tennis-tour-calendar` (p2) — ATP/WTA tournament calendar
9. `tennis-streak-form` (p2) — Win/loss streaks and form indicators
10. `tennis-biggest-movers` (p2) — Highlight biggest ranking changes

### Cycling (1 ticket — time-sensitive)
11. `cycling-tdf-2026` (p1) — Tour de France 2026 live GC standings (starts July 5)

### Process (1 ticket)
12. `backlog-roi-scoring` (p3) — Loop improvement: explicit ROI scoring system

---

## Sources

Research sources used:
- [FOX Sports World Cup Golden Boot Tracker](https://www.foxsports.com/stories/soccer/2026-fifa-world-cup-golden-boot-tracker)
- [MLS Soccer World Cup Golden Boot Tracker](https://www.mlssoccer.com/news/fifa-2026-world-cup-golden-boot-tracker-top-scorer)
- [FirstCycling 2026 UCI World Ranking](https://firstcycling.com/ranking.php?h=1&rank=1&y=2026)
- [FotMob FIFA World Cup xG Table](https://www.fotmob.com/leagues/77/table/world-cup?filter=xg)
- [SofaScore World Cup xG Overperformers](https://www.sofascore.com/news/world-cup-xg-overperformers-who-is-beating-the-numbers-right-now)
- [ESPN ATP Rankings 2026](https://www.espn.com/tennis/rankings)
- Live site verification: rankings123.com

---

**Next autoresearch run:** Rotate lens to SEO/content opportunities + monetization/RPM optimization
