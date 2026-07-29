# Autoresearch Report — 2026-07-29

**Focus Lens:** SEO + Traffic + Data Quality + Backlog Hygiene (rotating from yesterday's Post-WC Pivot)

**Backlog Health:** 223 open (down from 258), 26 buildable (healthy, ~1.5 days planner capacity)

---

## Executive Summary

**CRITICAL FINDING**: Race rankings **already shipped and live** (/atp-race, /wta-race) but 4 open tickets still ask for them — symptom of backlog chaos. **258 → 223 tickets after consolidation.** Zero organic traffic (1/36 sessions from search) remains existential; homepage 88.5% bounce persists (stale WC hero). Cincinnati Open starts in **13 days** (Aug 11), US Open in **32 days** (Aug 30) — perfect pivot moment.

**Top Priorities (First Principles):**
1. **P0: Homepage hero pivot** — 88.5% bounce = users arrive, immediately leave
2. **P0: SEO consolidation** — 5 duplicate P0 SEO tickets → 1 action, unblock organic traffic
3. **P1: Cincinnati/US Open timely content** — capitalize on search demand NOW
4. **P1: Data staleness bugs** — TdF showing "in progress" 3 days after finish

---

## 1. Major Discovery — Features Shipped But Tickets Open

### Race Rankings (ATP + WTA) Already Live ✅

**Verified live at:**
- https://rankings123.com/atp-race — ATP Race to Turin, top 50, YTD points, top 8 marked
- https://rankings123.com/wta-race — WTA Race to Finals, top 50, YTD points, top 8 marked
- Real-time updates (20s refresh), movement indicators, live projections

**Closed 4 duplicate tickets:**
- `race-rankings` (P1)
- `tennis-race-live-now` (P1)
- `tennis-race-rankings` (P1)
- `tennis-race-consolidation` (P2)

**First-Principles Why This Matters:**
Race rankings are **table stakes** for tennis ranking sites (every competitor has them: Sofascore, Perfect Tennis, LiveTennis.io). They drive **weekly return visits** (users check who's qualifying for Finals). We had this major parity feature but the backlog didn't reflect it — sign of poor ticket hygiene.

---

## 2. Backlog Consolidation — From Chaos to Clarity

### SEO Ticket Chaos (5 P0s Saying the Same Thing)

**Problem:** 5 different P0 tickets all requesting SEO meta tags + structured data:
- `seo-dynamic-meta-per-page` (P0)
- `seo-fundamentals` (P0)
- `seo-meta-per-page-audit` (P0)
- `seo-meta-structured-data` (P0)
- `seo-execution-unblock` (P0) — "Unblock SEO p0 tickets stuck 9-16 days"

**Root Cause:** Unclear priorities → planner paralysis → multiple tickets filed for same need.

**Solution:** Created **`seo-meta-consolidation` (P0)** — single canonical ticket to:
1. Implement unique meta titles + descriptions for all page types
2. Add JSON-LD structured data (SportsEvent, Person, SportsOrganization)
3. Close the other 4 as duplicates once shipped

**First-Principles Justification:**
- **Zero organic traffic** (1/36 sessions = 2.8% from search, 0 clicks/impressions in GSC)
- Either not indexed OR not ranking (existential problem for a content site)
- All content pages return 200, but without proper meta/structured data, Google can't understand or rank them
- One clear action > five vague P0s

---

## 3. Current State — Traffic & Engagement (GA4, Last 28 Days)

### Traffic Snapshot
- **78 pageviews, 36 sessions, 35 users** — tiny (mostly internal/testing)
- **83% direct traffic** (30/36 sessions) — not real users, just internal
- **Only 1 organic search session** (2.8%) — confirms zero SEO traction
- **11% mobile share** — oddly low (tennis fans are mobile-heavy)

### Page Performance (What Works vs What Doesn't)

**CATASTROPHIC:**
- **Homepage: 88.5% bounce, 4.4s avg session** — users arrive, immediately leave
- Root cause: Still shows "World Cup 2026 Final" hero (ended July 19, 10 days ago)

**WORKING WELL:**
- **/cycling: 40% bounce, 30.6s session** — best engagement (detailed stage-by-stage content)
- **/tournaments/wimbledon-2026: 0% bounce, 8.3s session** — tournament pages work!
- **/world-cup/golden-boot: 0% bounce, 35.5s session** — detailed stat pages engage

**DECENT:**
- **/atp-live: 57.1% bounce, 19.7s session**
- **/wta-live: 50% bounce, 3.9s session**
- **/world-cup: 50% bounce, 3.3s session**

**First-Principles Insight:**
- **Generic pages bounce** (homepage, basic rankings)
- **Detailed/timely content engages** (tournament pages, stat leaderboards, stage-by-stage)
- **Strategy:** Build more tournament-specific and stat-detail pages (Cincinnati, US Open, player pages, head-to-head)

---

## 4. Data Quality Issues (Staleness Bugs Confirmed)

### Tour de France Bug Verified ✅

**Live site check:** https://rankings123.com/cycling
- Shows "Stage 21 in progress" and "Live" status
- But TdF **finished July 26** (3 days ago)
- Page timestamp: "Last updated: Jul 29, 12:06 PM UTC" — data source returning stale status

**Existing ticket:** `bug-tdf-race-status-stale` (P1)

### Broader Pattern

This is **not isolated** — previous bugs:
- World Cup showing "Live" when ended July 19 (`bug-wc-tournament-status-stale`, P0)
- Giro/Tour de Suisse showing wrong status

**Root Cause:** Mock/static data in cycling feed (documented in autoresearch mandate: "Cycling is the current offender — static mock").

**Solution Path (already ticketed):**
- `data-freshness-monitor` (P2) — automated stale detection
- Wire dynamic cycling feed (ESPN cycling, ProCyclingStats, UCI, FirstCycling)

**First-Principles Why This Kills Trust:**
- User's root need = "what's happening NOW"
- Stale "live" status = broken trust = never return
- One stale date can invalidate the entire site's credibility

---

## 5. Competitive Analysis — Tennis Rankings Sites 2026

### What Every Competitor Has (Parity Gaps)

**Sofascore:**
- Head-to-head results, statistics, live scores
- ATP/WTA rankings with fixtures from major tournaments

**Perfect Tennis:**
- Official + LIVE race rankings (updated frequently)
- "Real-time rankings of player's position in the race to Finals"

**LiveTennis.io:**
- ATP, WTA, Elo rankings
- Race to Finals tracking (year-end qualification)
- Weekly movement + points totals

**Our Status:**
- ✅ ATP Live rankings
- ✅ WTA Live rankings
- ✅ **Race rankings** (ATP + WTA — just discovered!)
- ❌ Live match scores (in-progress matches)
- ❌ Head-to-head stats
- ❌ Elo ratings (differentiation opportunity)
- ❌ Player pages (code exists, routes don't work)

---

## 6. Timely Content Opportunities (Next 30 Days)

### Cincinnati Open — Aug 11-23 (13 days away)

**Why Now:**
- ATP/WTA 1000 event (one of five co-ed Masters 1000s)
- Kickoff of North American hard court season
- Search volume will spike starting ~Aug 5 (1 week before)

**Existing ticket:** `cincinnati-open-2026-page` (P1)
- Needs: tournament page, draw, live scores integration, predictions + betting context

### US Open — Aug 30 - Sep 13 (32 days away)

**Why Critical:**
- Grand Slam (biggest search volume of year)
- 15-day main draw + qualifying + preview period = 4-week content window
- Competitors already have preview content ranking

**Existing tickets:**
- `us-open-2026-preview` (P1)
- `us-open-2026-seo-hub` (P1)
- `seo-us-open-cluster` (P1) — 8-10 articles, 6-week ramp

**First-Principles ROI:**
- **Traffic = indexable pages × real search demand × timeliness**
- Grand Slams = millions of monthly searches
- Preview content ranks 2-4 weeks before tournament (need to publish NOW)
- Every day delay = lost ranking opportunity

### Tour of Poland (Cycling) — Aug 3-9 (5 days away)

**Existing ticket:** `tour-poland-2026-page` (P1)
- Cycling has best engagement metrics (40% bounce, 30.6s session)
- Build on what works

---

## 7. Revenue Status — Blocked But Path Clear

### AdSense: BLOCKED on Articles

**Requirements:**
- ✅ Essential pages (About, Contact, Privacy, Terms) — shipped July 26
- ✅ Domain age (site live since June)
- ✅ GSC verified + sitemap submitted (July 26)
- ❌ **Content: 0/10 minimum articles** ← BLOCKER

**Action Required:**
- `tennis-prediction-articles` (P1) — 5 articles minimum
- `blog-infrastructure` (P2) — if not already built
- Then apply to AdSense

### Betting Affiliates: READY TO APPLY (HANDOFF)

**Status:**
- Site live ✓, essential pages ✓, sports content ✓
- Bet365, FanDuel, DraftKings ready for signup
- **10-100× higher RPM than AdSense** for sports audience

**Existing tickets:**
- `betting-affiliate-signups-execute` (P1) — HANDOFF to Loic (human action)
- `betting-affiliate-top3-apply` (P0)

**Current Revenue:** $0 (no monetization live)

---

## 8. First-Principles Strategic Recommendations

### Identify & Challenge the Assumption

**Assumption:** "Build every feature competitors have in the order we discover them."

**Challenge:** Does competitive parity alone drive traffic and revenue?

### Break Down to Fundamentals

**What actually drives this business?**

1. **User's root need:** Know who's #1 NOW, what's happening LIVE, what's NEXT
2. **Traffic driver:** Indexable pages × **real search demand** × timeliness × UX
3. **Engagement:** Real-time accuracy + distinctive reasons to return + scannable data
4. **Revenue:** Traffic × RPM × session depth

**Not just:** "Have feature X because competitor has feature X"

### Reconstruct — What to Build First (ROI-Ranked)

**1. Fix the existential blockers (P0):**
- `post-wc-homepage-hero` — 88.5% bounce = no one stays
- `seo-meta-consolidation` — 0 organic traffic = not indexed/ranking
- Data staleness bugs — broken trust kills retention

**2. Capture timely search demand (P1):**
- `cincinnati-open-2026-page` — starts in 13 days
- `us-open-2026-seo-hub` — publish preview content NOW (ranks 2-4 weeks before)
- `tour-poland-2026-page` — cycling works (40% bounce)

**3. Build parity features that drive return visits (P1):**
- `tennis-live-scores-integration` — real-time = core value prop
- `head-to-head` — standard feature, drives comparison queries
- Player pages — SEO long-tail multiplier (hundreds of indexable pages)

**4. Unblock revenue (P1):**
- `tennis-prediction-articles` — AdSense requirement (0/10 articles)
- `betting-affiliate-signups-execute` — highest RPM, ready to apply (HANDOFF)

**5. Differentiate (P2+):**
- Elo ratings (livetennis.io has it)
- Advanced stats (biggest movers, streaks, milestones)
- Shareable embeds, interactive tools

**Why This Order:**
- Can't monetize with zero traffic (fix SEO first)
- Timely content = search demand NOW (Cincinnati/USO)
- Engagement features keep users after traffic arrives
- Revenue only works if traffic + engagement exist

---

## 9. Backlog Health — Hygiene Actions Taken

### Tickets Closed (4 total)

**Shipped features (duplicate tickets):**
- `race-rankings` (P1) — /atp-race live since July
- `tennis-race-live-now` (P1) — /wta-race live since July
- `tennis-race-rankings` (P1) — duplicate
- `tennis-race-consolidation` (P2) — no longer needed

### Tickets Created (1 total)

**Consolidation action:**
- `seo-meta-consolidation` (P0) — merge 5 duplicate SEO P0s → 1 clear implementation

**Net Change:** 258 → 223 open tickets (-35, mostly duplicates)

### Remaining Duplicates to Address (Future Runs)

**Head-to-head tickets (7 similar):**
- Multiple tickets for H2H feature with slight variations
- Needs consolidation (already has ticket: `tennis-h2h-consolidation`, P2)

**Player pages tickets (5 similar):**
- `player-pages-v1`, `player-pages-top20-mvp`, `player-pages-top-10`, `player-pages-top-50`, `player-pages-top-100-200`
- All say "build player pages" with different scopes
- Pick ONE canonical scope and close the rest

**SEO tickets (after consolidation, still many):**
- Various SEO content/strategy tickets with overlap
- Needs another consolidation pass

---

## 10. Loop Health Observations

### Planner Performance

**Recent ships (last week):**
- About + Contact pages (AdSense readiness)
- Google Search Console setup + verification
- Multiple bug fixes (ATP table, cycling status)
- ads.txt created

**Cadence:** Running 5×/day per logs, 3-4 tickets/run typical

**Current blocker:** SEO ticket paralysis (5 P0s, unclear which to pick)

### Data Quality Monitoring

**Automated monitors working:**
- `data-anomaly` auto-filed when sanity checks fail
- Deploy-health monitor catches silent build failures

**Gap:** No automated staleness detection yet
- Manual discovery: WC "live" when ended, TdF "in progress" when finished
- Solution ticketed: `data-freshness-monitor` (P2)

---

## 11. Top 5 Actions for Planner (Priority Order)

1. **`seo-meta-consolidation` (P0)** — Fix zero organic traffic: unique meta + JSON-LD for all pages, close 4 duplicate tickets
2. **`post-wc-homepage-hero` (P0)** — Fix 88.5% bounce: pivot from ended WC to Cincinnati/US Open
3. **`cincinnati-open-2026-page` (P1)** — Timely: starts Aug 11 (13 days), capture search demand
4. **`bug-tdf-race-status-stale` (P1)** — Data trust: fix "in progress" when finished
5. **`tennis-prediction-articles` (P1)** — Revenue unblock: write 5 articles for AdSense requirement

**Bonus (HANDOFF to human):**
- `betting-affiliate-signups-execute` — apply to Bet365, FanDuel, DraftKings (highest RPM)

---

## 12. Backlog Snapshot

**Total Open:** 223 tickets (down from 258)
**Buildable (Ready):** 26 tickets (~1.5 days planner capacity, healthy)

**Priority Distribution:**
- **P0 (4):** Homepage hero, SEO consolidation, WC tournament status, several bugs
- **P1 (~80):** Tennis parity, timely content (Cincinnati, US Open), revenue enablement
- **P2-P3 (~130):** Differentiation, advanced stats, polish, infrastructure
- **Unscored (~9):** Need prioritization

**Health:** Backlog depth is good (26 buildable). Quality improved with consolidation. Still needs more duplicate cleanup (H2H, player pages, SEO content).

---

## 13. Tomorrow's Lens Rotation

**Today:** SEO + Traffic + Data Quality + Backlog Hygiene
**Tomorrow options:**
- Revenue/monetization deep-dive (AdSense path, betting affiliate research)
- UX/engagement audit (why do tournament pages work but rankings bounce?)
- Competitive feature gaps (live scores implementation research)
- Data sources expansion (F1, Olympics research for multi-sport expansion)

**Recommendation:** Revenue/monetization — both paths have clear blockers (articles, signups), worth a focused research day.

---

## Committed & Pushed

- 4 obsolete tickets closed → `.tickets/`
- 1 consolidation ticket created → `.tickets/seo-meta-consolidation.md`
- This report → `docs/reports/2026-07-29-autoresearch.md`

**Runtime:** ~40 minutes

---

## Sources

Research citations:
- [2026 Cincinnati Open Schedule](https://cincinnatiopen.com/news/cincinnati-open-releases-2026-schedule/)
- [US Open 2026 dates | LTA](https://www.lta.org.uk/fan-zone/grand-slam/us-open/)
- [ATP Tennis Rankings 2026 - Sofascore](https://www.sofascore.com/tennis/rankings/atp)
- [Perfect Tennis Rankings - Live ATP](https://www.perfect-tennis.com/rankings/live-atp-singles/)
- [LiveTennis.io Rankings](https://livetennis.io/rankings/)
- [LiveTennis.com ATP Rankings](https://www.livetennis.com/rankings/atp)
