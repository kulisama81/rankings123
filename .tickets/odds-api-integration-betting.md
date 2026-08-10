---
id: odds-api-integration-betting
status: open
deps: []
links: []
created: 2026-08-10T14:25:00Z
type: feature
priority: 1
parent: rankings123
tags: [revenue, betting, api]
---
# Odds API Integration — Betting Affiliate Revenue Enabler

**CURRENT STATUS:** Betting affiliate applications ready (ticket `betting-affiliate-top3-apply`) but NO odds data to display. Can't place "Bet on this match" links without showing REAL odds.

## FIRST-PRINCIPLES ROI

**Betting = highest RPM for sports audience:**
- AdSense RPM: ~$1-3 per 1000 pageviews
- Betting affiliate CPA: $5-50 per conversion
- Conversion rate during tournaments: 5-8% (vs 1-2% for display ads)
- **Betting affiliates = 10-50× higher revenue per user than AdSense**

**Odds = betting conversion catalyst:**
- User sees "Sinner vs Alcaraz" match → clicks for details → sees odds "Sinner -150, Alcaraz +130" → "Bet Now" CTA → affiliate link
- **Without odds: betting links are blind CTAs with low conversion**
- **With odds: users make informed betting decisions, higher conversion**

**Timely opportunity:**
- Cincinnati Open: Aug 11-23 (starts TOMORROW)
- US Open: Aug 30 - Sep 13
- Betting volume PEAKS during tournaments
- **Every day without odds integration = lost betting revenue during peak season**

## Data Source Research (from WebSearch)

**Best free/affordable options:**

1. **OddsPapi** (RECOMMENDED)
   - Free tier available
   - 110+ bookmakers per match (Pinnacle, Singbet, Betfair)
   - ATP/WTA coverage across 5,605 tournaments
   - 159+ markets (match winner, set betting, game totals, handicaps)
   - URL: https://oddspapi.io

2. **The Odds API**
   - Free tier: NBA/MLB for evaluation
   - Professional $29/mo: 25 sports including tennis
   - Coverage: h2h, spreads, totals from US sportsbooks
   - URL: https://theoddsapi.com

3. **Sports Game Odds (SGO)**
   - Free tier with key features
   - Paid plans from $99/mo
   - URL: https://sportsgameodds.com

## Acceptance Criteria

### 1. Odds API Integration (Start with OddsPapi free tier)

- Sign up for OddsPapi free tier
- Implement odds fetch for ATP/WTA matches
- Parse odds data: match winner, set betting (if available)
- Cache odds (revalidate every 5-10 min during live matches)
- Mock fallback: if odds unavailable, HIDE betting UI (never show fake odds)

### 2. Odds Display on Match Pages

When tournament pages ship (Cincinnati, US Open):
- Show odds for upcoming/live matches
- Format: "Player A -150 | Player B +130" (American odds format for US audience)
- Source attribution: "Odds via OddsPapi" (transparency + API credit)
- Update odds live during matches

### 3. Betting Affiliate Integration

- **"Bet Now" CTA** next to odds (only when odds are REAL, not mock)
- Link to affiliate partner (DraftKings, FanDuel, or Bet365 — whichever approves first)
- Track click-through (affiliate conversion tracking pixel)

### 4. Revenue Tracking

- Count clicks on betting CTAs
- Estimate conversions (based on affiliate dashboard when approved)
- Report in analytics

## Implementation Phases

**Phase 1 (MVP, ~6 hours):**
- OddsPapi integration (free tier)
- Display match winner odds on Cincinnati/US Open match pages
- "Bet Now" CTA (links to affiliate when approved)

**Phase 2 (Rich, ~10 hours):**
- Set betting odds (1st set winner, 2-0 vs 2-1)
- Live odds updates during matches
- Multiple bookmaker comparison (show best odds)

## Impact Estimate

- **Revenue potential:** 
  - Cincinnati: 5K pageviews × 5% CTR × $10 CPA = $2,500 (if odds + affiliate live)
  - US Open: 50K pageviews × 5% CTR × $10 CPA = $25,000 (if odds + affiliate live)
- **Prerequisite for betting revenue:** Can't convert users without showing odds
- **Differentiation:** Live-tennis.eu does NOT show odds (major gap)

**ROI:** 9/10 — MEDIUM effort (6-10 hours), VERY HIGH revenue impact ($25K+ potential during US Open)

**Timeline:** URGENT — Cincinnati starts TOMORROW (Aug 11). Ship odds integration before US Open (Aug 30) at latest.

**Dependencies:**
- Betting affiliate approval (ticket `betting-affiliate-top3-apply` — human-gated)
- Cincinnati/US Open tournament pages (tickets `cincinnati-2026-live`, `us-open-2026-coverage`)

**Note:** CX FIRST — only show odds when REAL data is available. If API fails, HIDE betting UI (never fabricate odds).
