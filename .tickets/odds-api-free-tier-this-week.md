---
id: odds-api-free-tier-this-week
status: open
deps: []
links: [odds-api-integration, us-open-revenue-infrastructure-sprint, us-open-2026-betting-guide]
created: 2026-08-18T13:50:00Z
type: feature
priority: 0
parent: rankings123
tags: [revenue, betting, data, urgent, buildable-now]
---
# The Odds API Free Tier Integration — This Week Sprint (NOT Blocked)

**CRITICAL PATH for US Open betting revenue. Build THIS WEEK (Aug 18-22) before betting content ships.**

Integrate The Odds API free tier (500 req/day, 2+ bookmakers, NO credit card, NO approval needed) to power live odds widgets for US Open betting content. **This is buildable RIGHT NOW** — free tier requires only email signup, no human approval gates.

## Why P0 (Critical Path)

**Blocks these P0 tickets:**
- us-open-2026-betting-guide (can't ship betting guide without odds data)
- us-open-live-scores-widget (needs odds context for betting conversion)
- us-open-2026-coverage (hub needs odds widgets)

**Cincinnati lesson:** Cincinnati betting guide shipped without odds/affiliate infrastructure → CX violation (bug-betting-guide-no-links). Don't repeat.

**US Open timeline:** 9 days until Aug 27 draw, 12 days until Aug 30 main draw. Odds API must be live BEFORE content to avoid Cincinnati repeat.

## First-Principles Analysis (Autoresearch Aug 18 Research)

**The Odds API Recommendation:**
- **Free tier:** 500 credits/month = 16 requests/day (sufficient for daily updates)
- **Coverage:** ATP/WTA Grand Slams + 1000/500 events, 40+ bookmakers (Bet365, FanDuel, DraftKings, etc.)
- **Data freshness:** Hourly updates (daily on free tier, hourly for $30/mo paid tier)
- **Integration effort:** LOW (REST API, JSON response, simple fetch + cache pattern)
- **NO approval gate:** Sign up with email, get API key immediately

**Competitor research findings (from autoresearch agents):**
- OddsPortal: Displays odds inline with match data, clickable bookmaker comparisons
- FlashScore: Subtle odds integration, "Featured odds" sections
- Pattern: Content-first UX (80-90% editorial, 10-20% monetization), odds supplement naturally

**Revenue impact:**
- Odds comparison tables with affiliate links = 2-5% CTR target (research from betting sites)
- "Best value at [Bookmaker]" natural placements in match previews
- US Open = 100K+ searches, 3% affiliate CTR = 3K clicks, 10% conversion = 300 signups, $150 CPA = **$45K revenue potential** (requires odds API + affiliates)

## Acceptance Criteria

✅ **The Odds API account created** (free tier, theoddsapi.com/signup)
✅ **API key obtained** and stored in `.env.local` + Vercel env (`ODDS_API_KEY`)
✅ **OddsWidget component built** (`src/components/OddsWidget.tsx`):
  - Fetches live odds for given match/tournament (ATP/WTA US Open)
  - Displays odds from 2+ bookmakers (Bet365, FanDuel, DraftKings)
  - Affiliate links integrated (when `BETTING_AFFILIATES_LIVE=true`, else odds-only)
  - Click odds row → partner site with tracking params
  - Graceful fallback if API fails (hide widget, never show mock odds)
  - Source attribution: "Odds courtesy of The Odds API"
✅ **Caching strategy** to avoid burning free quota (500 req/month = 16/day):
  - Cache odds responses for 6 hours (Next.js revalidation)
  - Only fetch for active tournaments (US Open Aug 30-Sep 13)
  - Don't fetch for past/future tournaments
✅ **Test on Cincinnati betting guide** (`/articles/cincinnati-open-2026-betting-guide`):
  - Add OddsWidget to page
  - Verify odds display correctly
  - Verify caching works (check network tab, should cache 6h)
✅ **Ready for US Open deployment** by Aug 25

## Implementation Notes

**Free tier limits:**
- 500 requests/month = 16/day
- Strategy: Daily odds refresh at 6 AM ET (once/day during tournament)
- US Open = 14 days × 1 request/day = 14 requests (well under limit)

**Paid tier ($30/mo) considerations:**
- 20K requests/month = hourly updates during tournaments
- Upgrade IF free tier proves limiting (e.g., users want intraday odds changes)
- Start with free tier, upgrade based on data

**Competitor comparison:**
- Other options: API-Football (€50+/mo), Rapid API odds (limited free tier)
- The Odds API = best free tier for tennis coverage + ease of integration

## ROI: 10/10 (Critical Path Enabler)

**Impact:** CRITICAL — Unblocks $45K+ US Open revenue potential
**Effort:** LOW (2-3 hours: signup, component, test)
**Urgency:** P0 — Must be live by Aug 25 (4 days before betting content ships)
**Buildable NOW:** NO human approval needed (unlike AdSense/affiliates)

Start this FIRST. Everything else waits on odds data.
