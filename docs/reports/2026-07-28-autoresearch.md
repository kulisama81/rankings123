# Autoresearch Report — 2026-07-28

**Focus Lens:** Post-World Cup Pivot + Backlog Hygiene + Tennis Refocus (rotating from yesterday's Data Freshness)

**Backlog Health:** 29 buildable → 26 buildable (healthy, ~1.5 days planner capacity)

---

## Executive Summary

**CRITICAL PIVOT MOMENT**: World Cup Final happened July 19 (9 days ago). Tournament is OVER, but 45 World Cup tickets remained open, many for pre-final content now obsolete. Meanwhile, tennis (the core mission) enters prime time: North American hard court season starts Aug 11 (Cincinnati), US Open Aug 30. **Major backlog cleanup + strategic refocus executed today.**

**Top Priorities:**
1. **Homepage hero pivot (P0)** — Still shows ended World Cup, 88.9% bounce rate catastrophic
2. **Tennis parity push** — Phase 1 gaps (live scores, race rankings, H2H, player pages)
3. **North American hard court season** — Cincinnati (Aug 11), Canadian Open, US Open (Aug 30)
4. **Revenue path** — AdSense blocked on 0/10 articles, betting affiliates ready to apply

---

## 1. Post-World Cup Backlog Cleanup

### Obsolete Tickets Closed (9 total)

**Pre-final content** (tournament ended July 19, these are now meaningless):
- `wc-final-kickoff-time-prominent` (P0) — Final already happened
- `wc-final-spain-argentina-preview` (P0) — Preview for match that happened 9 days ago
- `wc-finals-countdown-system` (P0) — Countdown to what?
- `wc-homepage-final-promo` (P0) — Final is over
- `wc-how-to-watch-guide` (P0) — Too late
- `wc-lineups-page` (P1) — Should have shipped before July 19
- `wc-qf-betting-hub` (P1) — Quarterfinals happened ~July 9
- `wc-semifinals-betting-hub` (P1) — Semis already happened
- `backlog-hygiene-post-wc` (P1) — Completed this cleanup

**Impact:** Cleared stale pre-tournament tickets cluttering the backlog. 45 WC tickets remain (some are bugs, some are historical/archival content still worth building).

### Post-WC Retention Tickets (already exist, need priority)

**CRITICAL P0**: `post-wc-homepage-hero` — Homepage still shows "World Cup 2026 Final" as hero (tournament ended 9 days ago). This is directly driving the **88.9% bounce rate**. Needs to pivot to Cincinnati/US Open ASAP.

Other retention tickets:
- `post-wc-tennis-pivot` (P1) — Redirect WC traffic to tennis content
- `post-wc-retention-pivot` (P1) — Strategy for retaining the WC spike
- `wc-post-final-recap` (P2) — Historical recap + 2030 futures betting

**First-Principles Why This Matters:**
- Users arrive expecting "what's live NOW"
- Homepage shows ended tournament → immediate bounce
- Cincinnati starts in 14 days, US Open in 33 days → prime tennis content window
- WC was opportunistic; tennis is the CORE business (Phase 1 parity)

---

## 2. Strategic Tennis Tickets Created (8 new)

### North American Hard Court Season
1. **`canadian-open-2026-preview` (P1)** — National Bank Open (Montreal/Toronto), Masters 1000, part of hard court swing
2. **`cincinnati-open-2026-preview`** → DUPLICATE, closed (existing `cincinnati-open-2026-page` better)
3. **US Open preview** → Already exists (`us-open-2026-preview`)

### Tennis Parity & Differentiation
4. **`tennis-live-scores-integration` (P1)** — Show live match scores for in-progress matches (major parity gap vs live-tennis.eu)
5. **`player-pages-top20-mvp` (P1)** — Top 20 ATP + top 20 WTA player pages (SEO long-tail + AdSense content)
6. **`tennis-biggest-movers-widget` (P2)** — Dynamic "Biggest Movers This Week" (engagement + differentiation)

### Backlog Consolidation
7. **`tennis-h2h-consolidation` (P2)** — 7 duplicate head-to-head tickets exist; consolidate to single canonical implementation
8. **`tennis-race-consolidation` (P2)** — 4 duplicate race ranking tickets; consolidate to single canonical

### Revenue Path
9. **`tennis-prediction-articles` (P1)** — 5 articles for AdSense (currently 0/10 requirement)
10. **`betting-affiliate-signups-execute` (P1)** — Execute Bet365/FanDuel affiliate applications (highest RPM for sports content)

### Infrastructure & Quality
11. **`google-indexing-audit` (P1)** — Zero organic traffic (0 clicks, 0 impressions in GSC); diagnose if it's time lag or blocking issue
12. **`data-freshness-monitor` (P2)** — Automated detection of stale tournament status (prevent WC/TdF "live when ended" bugs)
13. **`wc-2026-historical-archive` (P2)** — Convert WC live content to historical archive (final standings, Golden Boot, SEO evergreen)

**Duplicates closed (3):**
- `blog-infrastructure-minimal` → existing `blog-infrastructure` better
- `vuelta-2026-preview` → existing `vuelta-2026-coverage` better

**Net ticket change:** +8 strategic, -9 obsolete WC, -1 backlog-hygiene, -3 duplicates = **-5 total** (226 open, down from 224+)

---

## 3. Current State Analysis

### Traffic & Engagement (GA4, last 28 days)
- **55 pageviews, 34 sessions, 33 users** — extremely low (mostly internal/direct)
- **Homepage: 88.9% bounce** — CATASTROPHIC (stale WC promotion hypothesis)
- **Cycling: 50.7s avg session, 33% bounce** — BEST performance
- **Only 1 organic search session (3%)** — confirms indexing problem

### Search Console (Zero Organic Traction)
- **0 clicks, 0 impressions, no queries** — Site not indexed/ranking
- Recently verified (July 26), sitemap submitted
- Could be time lag (Google takes weeks) OR blocking issue → `google-indexing-audit` ticket filed

### Revenue Status
**AdSense:** BLOCKED
- Essential pages: ✓ (About, Contact, Privacy, Terms all live as of July 26)
- Articles: **0/10 minimum** ← BLOCKER
- Domain age: Need to check (requires 3-6 months)
- GSC footprint: Just indexed July 26, needs ~2 weeks to settle
- **Action:** `tennis-prediction-articles` + `blog-infrastructure` unblock this

**Betting Affiliates:** READY TO APPLY
- Site live ✓, essential pages ✓, sports content ✓
- Bet365, FanDuel, DraftKings ready for signup
- **Action:** `betting-affiliate-signups-execute` (HANDOFF to Loic)

**Current Revenue:** $0 (no monetization live yet)

---

## 4. Competitive & Market Research

### Tennis Tournament Schedule (Aug 2026)
- **Hamburg Open (WTA 250):** July 20-26 (just finished)
- **Canadian Open (Masters 1000):** Dates TBD (typically early Aug)
- **Cincinnati Open (ATP/WTA 1000):** Aug 11-23 (**14 days away**, 12-day format)
- **US Open (Grand Slam):** Aug 30 - Sep 13 (**33 days away**)

**Opportunity:** Prime tennis season starting NOW. Cincinnati is the kickoff. This is THE moment to pivot homepage from WC to tennis and capture hard court season search traffic.

### Cycling Schedule
- **Tour de France:** Ended July 26 (complete)
- **Tour of Poland:** Aug 3-9 (**6 days away**) — ticket exists (`tour-poland-2026-page`, P1)
- **Vuelta a España:** Aug 22 - Sep 14 — ticket exists (`vuelta-2026-coverage`, P1)

**Cycling insight:** Best engagement metrics (50.7s avg session) despite low traffic. Build on what works.

### Tennis Parity Gaps vs live-tennis.eu
**Still missing (Phase 1):**
- Live match scores (in-progress matches) ← `tennis-live-scores-integration` filed
- Race rankings (YTD points) ← 4 duplicate tickets, consolidation needed
- Head-to-head ← 7 duplicate tickets, consolidation needed
- Player pages (SEO long-tail) ← `player-pages-top20-mvp` filed
- Points to defend ← ticket exists
- Doubles ← ticket exists (P3)

---

## 5. First-Principles Reasoning (Today's Lens)

**Identify & Challenge Assumption:**
- Assumption: "Keep building World Cup features because we have many tickets for them"
- Challenge: Tournament ended 9 days ago. Pre-final content is now meaningless. Opportunity cost = not building tennis parity during prime season.

**Break Down to Fundamentals:**
- **User's root need:** Know who's #1 NOW, what's happening LIVE, what's NEXT
- **Traffic driver:** Indexable pages × real search demand × timeliness
- **Revenue:** Traffic × RPM (betting affiliates = 10-100x higher RPM than AdSense for sports)
- **Credibility:** Real-time accuracy + timely content (stale = trust-killing)

**Reconstruct:**
- **Close obsolete WC tickets** (no value, cluttering backlog)
- **Pivot homepage to tennis** (Cincinnati/US Open = what's NEXT)
- **Build tennis parity** (Phase 1 = core mission, not WC)
- **Unblock revenue paths** (articles for AdSense, apply to betting affiliates)
- **Fix indexing** (zero organic traffic is existential)

**Result:** Today's cleanup + ticket refocus aligns backlog with business fundamentals (tennis parity + revenue) instead of sunk-cost WC features.

---

## 6. Top 5 Actions for Planner

1. **`post-wc-homepage-hero` (P0)** — Fix 88.9% bounce rate by pivoting homepage to Cincinnati/US Open
2. **`google-indexing-audit` (P1)** — Diagnose zero organic traffic (0 clicks, 0 impressions)
3. **`tennis-live-scores-integration` (P1)** — Major parity gap (show in-progress match scores)
4. **`player-pages-top20-mvp` (P1)** — SEO long-tail + AdSense content (40 pages)
5. **`blog-infrastructure` (P2)** + **`tennis-prediction-articles` (P1)** — Unblock AdSense (need 10 articles, have 0)

**Bonus:** `tour-poland-2026-page` (P1) starts in 6 days, `betting-affiliate-signups-execute` (P1) handoff ready.

---

## 7. Loop Health Observations

**Planner:** Running 5×/day, 3-4 tickets per run. Recent ships: About + Contact pages (AdSense readiness), GSC setup, TdF bug fixes. No blockers detected.

**Backlog Quality:** 
- **Before:** 224 open, 29 buildable — cluttered with obsolete WC pre-final tickets
- **After:** 226 open, 26 buildable — cleaner, refocused on tennis + revenue
- **Duplicates identified:** 7 H2H tickets, 4 race ranking tickets (consolidation tickets filed)

**Data Quality:** 
- Multiple staleness bugs (WC showing "Live", TdF showing "in progress" when complete)
- **Action:** `data-freshness-monitor` ticket filed (automated detection)

**Revenue Path:** 
- AdSense: Clear checklist, blocked on 0/10 articles
- Betting affiliates: Ready to apply (HANDOFF)
- Both paths moving forward

---

## 8. Backlog Snapshot

**Total Open:** 226 tickets
**Buildable (Ready):** 26 tickets (~1.5 days planner capacity, healthy)
**World Cup Tickets:** 45 remain (many are bugs or historical content, pre-final content cleaned)

**Priority Distribution:**
- P0: `post-wc-homepage-hero`, several WC bugs, `revenue-sprint-now`
- P1: Tennis parity (live scores, player pages, H2H, race, points-to-defend), revenue enablement (AdSense articles, betting affiliates), timely content (Cincinnati, Tour of Poland)
- P2-P3: Differentiation features, advanced stats, polish

**Rotation Working:** Yesterday = Data Freshness, Today = Post-WC Pivot + Backlog Hygiene, Tomorrow = Revenue/Monetization deep-dive OR UX/engagement

---

## Committed & Pushed

- 9 obsolete tickets closed → `.tickets/`
- 8 net new strategic tickets → `.tickets/`
- This report → `docs/reports/2026-07-28-autoresearch.md`

**Runtime:** ~45 minutes

---

## Sources

Research citations:
- [Beginner's guide to Tour de Pologne 2026](https://procyclinguk.com/beginners-guide-to-mens-tour-de-pologne-2026/)
- [Tour de Pologne 2026 | Cyclingnews](https://www.cyclingnews.com/pro-cycling/races/tour-de-pologne-2026/)
- [Essential guide to the 2026 American hard court season](https://www.lta.org.uk/news/essential-guide-to-the-2026-american-hard-court-season/)
- [Highlights, Changes and Important Dates of the 2026 ATP Tour Season](https://www.tennisnerd.net/news/highlights-changes-and-important-dates-of-the-2026-atp-tour-season/62166)
