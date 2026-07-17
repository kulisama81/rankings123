# Autoresearch Report — July 17, 2026

**Research lens today:** Revenue enablement + World Cup Final urgency (48-hour crisis window)

**Backlog health:** ✅ 28 buildable tickets (healthy) — closed 4 outdated, created 5 new time-sensitive

---

## Executive Summary

**🚨 CRITICAL - 48 HOURS TO WORLD CUP FINAL:** Spain vs Argentina kick off July 19 at 3PM ET from MetLife Stadium. This is the **peak traffic and revenue moment of 2026** — yet the site still shows TBD in the bracket, has no Final countdown on homepage, and no kickoff time displayed. Filed P0 tickets to fix these credibility killers before the search traffic window closes.

**Key findings:**
1. 🚨 **World Cup bracket TBD bug UNFIXED (P0)** - despite being filed yesterday, bracket still shows TBD for Final/semifinals instead of Spain vs Argentina
2. 💰 **Betting affiliate research complete** - Bet365 (30-35% RevShare), FanDuel (35% RevShare), DraftKings (25-40% RevShare) - World Cup Final is THE highest RPM moment to launch
3. 📊 **Traffic still critically low** - 148 pageviews/28 days (~5/day), homepage 66.7% bounce rate
4. 🎾 **Tennis parity gaps mapped** - live-tennis.eu has next-week projections, 4-week schedules, career-high tracking we lack
5. ⏱️ **Post-Final retention plan needed** - tournament ends July 19 evening, need immediate pivot to Tour de France + US Open to capture visitors

---

## What Shipped Recently (via git log)

**July 16:**
- Inspector site health check clean (21cdf05)
- Sport hero imagery system with custom SVG icons (bfab686)
- Tour de France winner parsing fixes (97ec848, ca7d886)
- ATP rank jump bug closed (f18142c)

**Pattern:** Loop shipping regularly (design, data fixes, QA), but **P0 World Cup Final tickets not being picked up** despite 48h urgency. This is the research gap this run addresses.

---

## Analytics Status (Real Data - GA4)

**28-day summary (generated July 17, 1:30 PM):**
- **148 total pageviews**, 64 sessions, 45 users
- **Mobile:** 48% of sessions
- **Top pages:**
  1. `/world-cup` — 57 views, **41.2% bounce** (GOOD engagement during tournament) 
  2. `/` (homepage) — 51 views, **66.7% bounce** (CRISIS - needs live urgency widget)
  3. `/atp-live` — 14 views, 0% bounce
  4. `/world-cup/golden-boot` — 5 views, 282s avg duration, 0% bounce (EXCELLENT)

**SEO/Traffic:** Only 5 organic search sessions (weak). 57 direct sessions. **Traffic is critically low** — World Cup Final is a 48h opportunity to 10x this via SEO + social.

**Revenue status:** 
- **Ad revenue:** $0 (AdSense application PENDING approval)
- **Betting affiliates:** $0 (NOT SIGNED UP - wc-betting-affiliates is p0 blocker)

---

## URGENT: World Cup Final Status Check (Live Site)

**Verified via WebFetch at https://rankings123.com/world-cup:**

❌ **Bracket shows "🏆TBD" for Final** (should show Spain vs Argentina)  
❌ **Semifinals show "🏆TBD"** (both semifinals finished July 14-15)  
❌ **Quarterfinals show "🏆TBD"** (all QFs finished)  
❌ **Page says "FIFA World Cup 2026 · Semifinals"** (semifinals are DONE - should say "Final")  
❌ **No Final date/time shown** (should show "July 19, 3PM ET")  

**Verified via WebFetch at https://rankings123.com (homepage):**

❌ **No World Cup Final countdown or promotion**  
❌ **No mention of Spain vs Argentina Final**  
❌ **No "Live Now" urgency widget**

**VERDICT:** The site is **completely unprepared** for the World Cup Final despite it being 48 hours away. The wc-bracket-live-results bug filed YESTERDAY (P0) is still not fixed. This is the #1 priority blocker.

---

## Research: Betting Affiliate Programs (Revenue Enabler)

Researched top sports betting affiliate programs for rankings123 monetization:

### Commission Rates (2026)

**Bet365 Partners:**
- **RevShare:** 30-35% recurring commission on net revenue
- **CPA:** Custom deals available
- **Markets:** Regulated worldwide
- **Approval:** 24-48 hours typically

**FanDuel Affiliates:**
- **RevShare:** Up to 35% (capped at $1000/referral/month)
- **CPA:** $25-$35 per acquisition
- **Hybrid:** 35% lifetime RevShare for up to 730 days
- **Approval:** 24-48 hours

**DraftKings Affiliates:**
- **RevShare:** 25-40% of net gaming revenue
- **Structure:** 40% initially, 25% from day 31+
- **Performance tiers:** Can increase payouts up to 50% for high-volume affiliates
- **Approval:** 24-48 hours

### First-Principles ROI Analysis

**Why betting affiliates = highest ROI for rankings123:**
1. **Sports audience alignment** - our users are ALREADY interested in sports outcomes (rankings, predictions) = high betting conversion intent
2. **RPM multiplier** - betting affiliates pay 10-50x more per click than display ads (AdSense ~$1-5 RPM, betting ~$50-500 RPM)
3. **World Cup Final timing** - tournament winner bets, player props (Mbappé/Yamal Golden Boot), in-play betting = MASSIVE betting volume July 19
4. **Tour de France overlap** - stage betting, GC winner futures = continuous betting context through July 27
5. **Tennis betting synergy** - match winner, tournament futures, prop bets = year-round revenue vs World Cup one-time spike

**Action:** wc-betting-affiliates (P0) should be human-executed ASAP - sign up for Bet365, FanDuel, DraftKings TODAY to get 24-48h approval before Final.

---

## Research: Tennis Parity Gaps (Phase 1 - live-tennis.eu)

Researched live-tennis.eu features we lack:

### Core Parity Gaps (High ROI)

1. **Next-week ranking projections** - live-tennis.eu shows "Official ranking with projection for next week" based on current tournament results + points dropping off. We don't have this.
   - **User need:** See how Wimbledon results will affect Monday's rankings
   - **Filed ticket:** tennis-next-week-projection already exists

2. **4-week schedule & ranking projection** - live-tennis.eu shows "Rankings Projection for the next 4 weeks" and "Tennis Players Schedule for the next 4 weeks"
   - **User need:** Bettors need to see upcoming tournaments and rank movement forecasts
   - **Filed ticket:** tennis-4week-schedule-projection (P2)

3. **ATP Finals / WTA Finals qualification tracking** - live-tennis.eu shows "Race to Finals" cut line
   - **User need:** Who's qualified for year-end championships?
   - **Existing ticket:** tennis-race-to-finals (P1)

4. **Career high tracking** - live-tennis.eu tracks "new career high" and shows career-high rank
   - **User need:** Milestone moments (Sinner reaches career-high #1)
   - **Gap:** Not currently tracked

5. **Live scores** - live-tennis.eu embeds in-progress match scores
   - **Existing ticket:** live-scores (P1)

### First-Principles Priority

**Most valuable parity features** (not just copying, but reasoning from user needs):
1. **Next-week projection** (P1) - answers "how will TODAY's matches affect Monday's rankings" = real-time engagement driver
2. **Live scores** (P1) - users can't know "who's #1 right now" without seeing who's winning ongoing matches
3. **Race to Finals** (P1) - answers "who's making year-end championships" = October/November traffic spike
4. **4-week schedule** (P2) - helps bettors, but less urgent than real-time features

---

## Backlog Analysis & Cleanup

**Starting state:** 27 buildable tickets (healthy but low end)

**Closed outdated tickets (4):**
- `wc-semifinal-betting-guides` - semifinals finished July 14-15, window passed
- `wc-semifinals-content-hub` - semifinals finished July 14-15, window passed
- `wc-r16-odds-hub` - Round of 16 completed, window passed
- `wc-qf-live-tracker` - quarterfinals completed, window passed

**Created new time-sensitive tickets (5):**
1. **wc-final-kickoff-time-prominent** (P0, task, worldcup+ux) - Surface "3PM ET July 19" prominently on /world-cup and homepage. Search intent "what time is World Cup Final" is massive in next 48h.

2. **betting-affiliate-revenue-tracker** (P1, feature, revenue) - Track affiliate clicks, conversions, RevShare earnings once affiliates are live. Informs content strategy (which pages drive most betting conversions).

3. **wc-post-final-retention-content** (P0, feature, worldcup+retention) - Ships July 19 post-match: Final recap + homepage pivot to Tour de France + cross-sport "What's next" widget. Captures World Cup traffic before they leave.

4. **tennis-4week-schedule-projection** (P2, feature, tennis+parity) - 4-week tournament calendar + per-player schedule + ranking projections (parity gap vs live-tennis.eu).

5. **wimbledon-2026-results-analysis** (P2, feature, tennis+seo) - Wimbledon ended July 12, need results wrap + ranking impact analysis + US Open preview. SEO: "Wimbledon 2026 results Sinner".

**Ending state:** 28 buildable tickets (healthy)

---

## Loop Health Observations

**Strengths:**
- Loop running regularly (5 runs/day across domains visible in logs)
- Inspector + perf-inspector + data-sanity monitor actively finding bugs
- Recent ships: sport hero imagery, TdF fixes, UCI cycling rankings, tooltips

**Critical gaps:**
1. **P0 World Cup tickets not being built** - wc-bracket-live-results filed YESTERDAY as P0, still not fixed despite Final in 48h. Why is planner not picking this up?
2. **Revenue blockers stalled** - wc-betting-affiliates (P0) requires human action (signup forms) but planner can't execute it. Need to flag this clearly to user.
3. **Time-sensitive prioritization weak** - semifinals/QF/R16 tickets stayed open past their event windows. Loop needs better "event deadline" awareness.

**Process recommendation:**
- **Pre-event checklists for major tournaments** - 1 week before World Cup Final, Olympics closing ceremony, Grand Slam finals, etc., audit: (1) Is data architecture ready for live progression? (2) Are SEO pages prepped? (3) Are betting affiliates signed up? Don't wait until 48h before to discover bracket shows TBD.
- **Human-action ticket flagging** - tickets requiring external signups (AdSense, betting affiliates, API keys) should be clearly marked "REQUIRES HUMAN" in title/tags so planner doesn't silently skip them.

---

## Revenue Status & Blockers

**Current state:**
- **Ad revenue:** $0 (AdSense PENDING - adsense-approval-sprint is P0)
- **Betting affiliates:** $0 (NOT SIGNED UP - wc-betting-affiliates is P0 BLOCKER)
- **Traffic:** 148 pageviews/28 days (~5/day) - critically low, but World Cup Final could 10x this in 48h if we execute

**Immediate priorities (next 48 hours):**
1. **[HUMAN ACTION REQUIRED] Sign up for betting affiliates** - Bet365, FanDuel, DraftKings (wc-betting-affiliates). Approval takes 24-48h, so TODAY is the deadline to launch before Final.
2. **Fix World Cup bracket TBD bug** (wc-bracket-live-results P0) - showing TBD instead of Spain vs Argentina is a credibility killer during peak traffic
3. **Add Final countdown to homepage** (wc-homepage-final-promo P0) - funnel homepage traffic (66.7% bounce rate) to World Cup Final content
4. **Ship Spain vs Argentina preview** (wc-final-spain-argentina-preview P0) - capture "Spain Argentina World Cup Final 2026" search traffic

**Monthly revenue goal:** Not yet set. **Betting affiliates during World Cup Final week** could drive first meaningful revenue ($100-1000+ depending on traffic spike and conversion rate). But ONLY if we sign up TODAY.

---

## Recommendations (Top 3)

1. **[HUMAN ACTION] Sign up for betting affiliates NOW** - Bet365, FanDuel, DraftKings applications (wc-betting-affiliates P0). This is externally-blocked work the planner can't do. Approval takes 24-48h - if we don't sign up TODAY, we miss the World Cup Final revenue window entirely. Commission rates: 25-40% RevShare, highest RPM opportunity of the year.

2. **URGENT (next planner run): Fix World Cup bracket TBD bug** (wc-bracket-live-results P0). The Final is in 48 HOURS and the bracket still shows TBD instead of Spain vs Argentina. This was filed YESTERDAY as P0 and is still not fixed. Every hour this persists, we lose search traffic to ESPN/BBC/FanDuel who show the real matchup. This should be THE TOP PRIORITY for the next planner run.

3. **URGENT (next 24h): World Cup Final site preparation sprint** - Ship in sequence: (1) Fix bracket TBD bug, (2) Add kickoff time "3PM ET July 19" prominently (wc-final-kickoff-time-prominent P0), (3) Add homepage countdown widget (wc-homepage-final-promo P0), (4) Ship Spain vs Argentina preview article (wc-final-spain-argentina-preview P0). These 4 tickets capture the "World Cup Final 2026" search traffic spike happening NOW.

---

## Today's Research Lens

**Revenue enablement + World Cup Final urgency (48-hour crisis window)** - researched betting affiliate programs (Bet365/FanDuel/DraftKings commission rates, approval timelines), verified live site is unprepared for Final (bracket shows TBD, no countdown, no kickoff time), mapped tennis parity gaps (next-week projections, 4-week schedules), filed 5 time-sensitive tickets, closed 4 outdated tickets, added ROI notes to critical P0 tickets.

**Tomorrow's recommended lens:** Loop health + process improvements - investigate why P0 World Cup tickets (filed yesterday) are not being picked up by planner despite 48h urgency, strengthen time-sensitive prioritization, add "requires human action" flagging for externally-blocked tickets.

---

**Sources:**
- [16 Best Sports Betting Affiliate Programs 2026 List | StatsDrone](https://statsdrone.com/best-affiliate-programs/sports-betting/)
- [21 Best Sports Betting Affiliate Programs of 2026](https://affpapa.com/best-sports-betting-affiliate-programs/)
- [18 Best Sports Betting Affiliate Programs - 2026 Commission Rates](https://getlasso.co/niche/sports-betting/)
- [Odds to win the 2026 World Cup: Spain the favorite over Argentina in Final - ESPN](https://www.espn.com/espn/betting/story/_/id/48386952/espn-soccer-futbol-world-cup-betting-odds-championship-groups)
- [Spain vs Argentina Odds & Props: 2026 World Cup Final](https://www.bookmakersreview.com/analysis/spain-vs-argentina-odds-world-cup-final-2026/627474/)
- [Spain vs. Argentina: World Cup Final Betting Odds, Possible Lineups (July 19) | FanDuel Research](https://www.fanduel.com/research/spain-vs-argentina-world-cup-final-betting-odds-possible-lineups-july-19)
- [Live ATP, WTA & Elo tennis rankings 2026, top 100](https://livetennis.io/rankings/)
- [Live ATP Ranking](https://live-tennis.eu/en/atp-live-ranking)
- [Live WTA Ranking](https://live-tennis.eu/en/wta-live-ranking)
