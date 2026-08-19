# The Odds API Setup Guide

This guide explains how to set up The Odds API for live betting odds integration on Rankings123.

## Why The Odds API?

The Odds API provides live betting odds from 40+ bookmakers for tennis, soccer, and other sports. It powers our betting content widgets with real-time odds data.

**Free tier benefits:**
- 500 API requests per month (16/day)
- Coverage for ATP/WTA Grand Slams and tournaments
- 40+ bookmakers (Bet365, FanDuel, DraftKings, etc.)
- No credit card required for free tier
- Hourly odds updates (on paid tier; daily on free tier)

## Quick Setup (5 minutes)

### 1. Create Free Account

1. Go to [The Odds API](https://the-odds-api.com/)
2. Click "Get a Free API Key"
3. Sign up with your email
4. Verify your email address
5. Your API key will be displayed on the dashboard

### 2. Add API Key to Local Environment

Create or update `.env.local` in the project root:

```bash
# The Odds API (the-odds-api.com)
ODDS_API_KEY=your_api_key_here
```

### 3. Add API Key to Vercel

For production deployment:

```bash
vercel env add ODDS_API_KEY
# Choose: Production, Preview, Development
# Paste your API key when prompted
```

Or via Vercel dashboard:
1. Go to your project settings
2. Navigate to Environment Variables
3. Add `ODDS_API_KEY` with your API key
4. Select environments (Production, Preview, Development)

### 4. Verify Integration

Start the dev server and visit a betting content page:

```bash
npm run dev
```

Visit: `http://localhost:3000/articles/cincinnati-open-2026-betting-guide`

If the API key is configured correctly, you'll see live odds widgets with real bookmaker data. If not configured, the widgets gracefully hide (no placeholder/mock data shown).

## Free Tier Budget Management

**Quota:** 500 requests/month = ~16 requests/day

**Our caching strategy:**
- All odds responses cached for **6 hours** (Next.js revalidation)
- Only fetch during active tournaments (e.g., US Open Aug 30-Sep 13)
- Sports list cached for **24 hours**

**Example usage:**
- US Open (14 days) × 2 fetches/day (ATP + WTA) = **28 requests** (well under limit)
- Cincinnati (11 days) × 2 fetches/day = **22 requests**
- Monthly budget: ~50-60 requests during tournament season

**Monitoring:**
- Check your usage at: https://the-odds-api.com/account
- If you exceed free tier, upgrade to $30/mo for 20K requests (hourly updates)

## Supported Tournaments

The Odds API automatically detects active tennis tournaments. Common sport keys:

- `tennis_atp_us_open` / `tennis_wta_us_open`
- `tennis_atp_wimbledon` / `tennis_wta_wimbledon`
- `tennis_atp_french_open` / `tennis_wta_french_open`
- `tennis_atp_australian_open` / `tennis_wta_australian_open`
- Plus Masters 1000 events when active

Our code automatically discovers active tournaments — no manual configuration needed.

## Upgrading to Paid Tier

If free tier becomes limiting (e.g., during multi-tournament weeks), consider upgrading:

**Standard Plan ($30/month):**
- 20,000 requests/month
- Hourly odds updates (vs daily on free tier)
- Same coverage + all features

**When to upgrade:**
- User demand for more frequent odds updates
- Multiple simultaneous tournaments
- Expanding to more sports (cycling, football)

## Troubleshooting

**Odds widgets not showing:**
1. Check `.env.local` has `ODDS_API_KEY`
2. Restart dev server after adding env var
3. Check browser console for errors
4. Verify API key is valid at the-odds-api.com/account

**No matches returned:**
- Tournament may not be active in The Odds API
- Check available sports: https://api.the-odds-api.com/v4/sports?apiKey=YOUR_KEY
- Some tournaments may use different sport keys

**Rate limit errors:**
- Free tier = 500 req/month, check your dashboard
- Our caching (6h) should prevent hitting limits
- Upgrade to paid tier if needed

## CX-First Principle

**NEVER show mock/placeholder odds.** If the API key is missing or the API fails:
- Odds widgets gracefully hide (return null)
- No "Coming soon" or fake odds displayed
- Users only see real data or nothing

This protects user trust and complies with our CX-first principle.

## Implementation Details

**Code locations:**
- Tennis odds integration: `src/lib/tennisOdds.ts`
- World Cup odds: `src/lib/worldCupOdds.ts`
- Odds widget component: `src/components/OddsWidget.tsx`
- Example usage: `src/app/articles/cincinnati-open-2026-betting-guide/page.tsx`

**Key functions:**
- `getAllTennisOdds()` — Fetch all active tournament odds
- `getTournamentOdds(tournament)` — Fetch specific tournament (e.g., "us_open")
- `getMatchOdds(player1, player2)` — Find specific match odds
- `getOddsSource()` — Returns "api" or "mock" (for conditional rendering)

## Support

- The Odds API Docs: https://the-odds-api.com/liveapi/guides/v4/
- Rankings123 Issues: File a ticket via `tkt create`
- API Support: support@the-odds-api.com
