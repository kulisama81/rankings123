---
id: betting-affiliate-component-approval-ready
status: open
deps: []
links: [betting-affiliate-integration, us-open-revenue-infrastructure-sprint, bug-betting-guide-no-links]
created: 2026-08-18T13:55:00Z
type: feature
priority: 1
parent: rankings123
tags: [revenue, betting, infrastructure, cx-first]
---
# Betting Affiliate Link Component (Approval-Ready Framework)

Build reusable betting affiliate link component NOW (even without approved affiliate IDs) with env-var-driven conditional rendering. When Bet365/FanDuel approvals come (1-2 weeks), integration becomes a 5-minute env var swap instead of a multi-day build. Prevents CX violations (Cincinnati bug-betting-guide-no-links).

## Problem: Sequential Revenue Blockers

**Current state (broken):**
1. Betting content ships → no affiliate infrastructure → CX violation
2. Wait for affiliate approvals (1-2 weeks) → sit idle
3. Approvals arrive → scramble to build integration → lose revenue days

**Cincinnati example:**
- Cincinnati betting guide shipped Aug 17
- Inspector found: ZERO affiliate links (CX-first violation)
- Content is live, indexing, BUT generating $0 revenue
- If infrastructure existed, approval = instant activation

**Solution: Build infrastructure BEFORE approvals**
- Build component with env-var gate (`BETTING_AFFILIATES_LIVE`, default false)
- Component renders affiliate links when `true`, hides when `false`
- Store affiliate IDs as env vars (`BET365_AFFILIATE_ID`, `FANDUEL_AFFILIATE_ID`)
- When approvals arrive: Set env vars, flip `BETTING_AFFILIATES_LIVE=true`, deploy → INSTANT revenue

## First-Principles Analysis

**Why build before approvals:**
- **Approval timing unpredictable:** Bet365 says 1-2 weeks, could be 3-4
- **US Open deadline fixed:** Aug 27 draw, Aug 30 main draw (12 days)
- **Revenue opportunity cost:** Every day without infrastructure = lost revenue during peak betting window
- **CX-first compliance:** Never ship betting content without monetization path ready

**Competitor pattern (from autoresearch research):**
- OddsPortal: Clickable odds numbers (subtle CTAs, not loud buttons)
- Livetennis.io: "Betting sites" + "Betting guide" nav sections, regional redirects
- Pattern: Non-aggressive CTAs, value-focused copy ("highest odds to increase your chances")

**Best practices:**
- Disclosure: "We may earn commission from links on this page" (FTC compliance)
- Link attributes: `rel="noopener sponsored"` (Google guidelines)
- Tracking params: `?utm_source=rankings123&utm_medium=affiliate&utm_campaign=us-open`
- 18+ responsible gambling disclaimers

## Acceptance Criteria

✅ **BettingAffiliateCTA component** (`src/components/BettingAffiliateCTA.tsx`):
  - Props: `bookmaker` (Bet365|FanDuel|DraftKings), `ctaText`, `eventContext` (US Open, match name, etc.)
  - Conditional render based on `process.env.NEXT_PUBLIC_BETTING_AFFILIATES_LIVE === 'true'`
  - When enabled: Shows CTA button with affiliate tracking link
  - When disabled: Hides component entirely (NO placeholders, NO "coming soon")
  - Tracking params: `?affiliate_id={ID}&ref=rankings123&source={page}`
  - Link opens in new tab, `rel="noopener sponsored"`
  - Mobile-responsive, matches site design

✅ **Affiliate disclosure component** (`src/components/AffiliateDisclosure.tsx`):
  - Renders on pages with affiliate links
  - Text: "We may earn a commission if you make a purchase through our links. This supports our work at no extra cost to you."
  - Subtle styling (not prominent, but visible)

✅ **Environment variables documented** (`.env.example`):
  ```
  # Betting Affiliates (set to 'true' when approved)
  NEXT_PUBLIC_BETTING_AFFILIATES_LIVE=false
  
  # Affiliate IDs (add when approved)
  NEXT_PUBLIC_BET365_AFFILIATE_ID=
  NEXT_PUBLIC_FANDUEL_AFFILIATE_ID=
  NEXT_PUBLIC_DRAFTKINGS_AFFILIATE_ID=
  ```

✅ **Integration in Cincinnati betting guide** as proof-of-concept:
  - Add `<BettingAffiliateCTA bookmaker="Bet365" ctaText="View Cincinnati Odds" />`
  - Verify: When `BETTING_AFFILIATES_LIVE=false`, component hidden
  - Verify: When `BETTING_AFFILIATES_LIVE=true` (test locally), component shows with proper link

✅ **CX-first compliance check**:
  - NO "coming soon" text
  - NO placeholder buttons
  - Component simply doesn't render until affiliates are approved
  - Betting content provides value (odds analysis) even without affiliate CTAs

✅ **Regression test** (`tests/betting-affiliate-gate.test.js`):
  - Scans all betting content pages
  - FAILS if page shows affiliate CTAs but `BETTING_AFFILIATES_LIVE !== 'true'`
  - PASSES if no affiliate CTAs when disabled
  - Run via `npm test`

## Deployment Timeline

**Build now (Aug 18-20):** Component + Cincinnati integration
**Test locally:** Toggle env var, verify show/hide works
**Deploy (Aug 21):** Component live in prod, gated off (hidden)
**When approvals arrive:** Set env vars in Vercel, deploy, activate → 5 minutes to revenue

## ROI: 8/10 (Revenue Acceleration)

**Impact:** HIGH — Reduces affiliate approval → revenue from weeks to minutes
**Effort:** LOW — 2-3 hour build (reusable component, simple conditional render)
**Urgency:** P1 — Not blocking US Open content (can ship odds-only content), but accelerates revenue activation
**CX benefit:** Prevents future violations (all betting content uses this component pattern)

**Revenue unlock speed:**
- Without this: Approval arrives → 2-3 day build → lose revenue during build
- With this: Approval arrives → 5-min env var update → instant revenue activation
