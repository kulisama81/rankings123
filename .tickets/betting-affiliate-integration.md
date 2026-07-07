---
id: betting-affiliate-integration
status: open
deps: []
links: []
created: 2026-07-07T14:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [revenue, betting, monetization]
---
# Sports betting affiliate integration (DraftKings, FanDuel, or similar)

Research, apply to, and integrate a sports betting affiliate program to monetize betting-related content with referral links and banners.

## Context
Sports betting content = highest RPM for sports sites (2-5× typical display ads). We're displaying odds from ESPN API. Next step: partner with betting affiliate networks to earn commission on signups/deposits. Many existing tickets reference betting/odds (wc-r16-betting-previews, tennis-odds, wc-qf-betting-preview) - this enables monetization.

## Acceptance Criteria - Phase 1: Research & Application

✓ Research top sports betting affiliate programs for US/international audience:
  - DraftKings Partners
  - FanDuel Affiliates  
  - BetMGM Affiliates
  - Caesars Sportsbook Affiliates
  - Other networks (CJ Affiliate, Awin, etc.)
✓ Compare: commission rates, cookie duration, signup requirements, geo-restrictions
✓ Document findings in ticket notes
✓ Apply to top 2-3 programs (applications can take 1-2 weeks)
✓ Track application status

## Acceptance Criteria - Phase 2: Integration (after approval)

✓ Add affiliate disclosure page (/affiliate-disclosure) per FTC guidelines
✓ Create reusable betting affiliate component: CTA button with tracking link
✓ Integrate affiliate links in existing betting content:
  - World Cup betting previews
  - Tennis odds pages
  - Any page displaying odds
✓ Affiliate links use proper tracking parameters
✓ Links open in new tab, include rel="noopener sponsored"
✓ CX FIRST: only show affiliate CTAs when backed by real approved partner (no placeholders)
✓ Privacy: document in privacy policy
✓ Mobile responsive
✓ Test: click-through tracking works, links valid

## Notes

**2026-07-07T14:00:00Z**

FIRST PRINCIPLES ROI ANALYSIS:

**Root user need:** Betting info is ACTIONABLE (unlike rankings which are informational). Users want to place bets, and we can facilitate that while earning commission.

**Why betting affiliates are the highest-ROI monetization:**
- Sports audience overlap: 40-60% of sports content consumers bet on sports
- High commission: $50-200 per qualified signup (CPA) OR 25-35% revenue share
- Compound value: one user = recurring revenue (vs one-time ad impression)
- Premium CPM: betting display ads also pay 2-5× typical sports ads

**Why this fits our content:**
- We already display odds (ESPN API)
- Already creating betting preview content (wc-r16-betting-previews, wc-qf-betting-preview)
- World Cup + Tennis = prime betting sports
- Tournament timing = peak betting activity

**INDUSTRY BENCHMARKS:**
- Betting affiliate RPM: $15-40 (vs $5-10 general sports content)
- Conversion rate: 2-5% of betting content viewers click affiliate links
- Commission: $50-200 per signup (CPA) or 25-35% revenue share
- Example: 10K betting content views × 3% CTR × 10% signup = 30 signups × $100 CPA = $3,000

**IMPACT:** VERY HIGH (highest RPM monetization for sports sites)
- Revenue: Betting affiliates = 2-5× display ad revenue
- Scalability: more betting content = more affiliate opportunities
- Timing: World Cup is LIVE (peak betting activity)

**EFFORT:** LOW-MEDIUM
- Phase 1 (research/apply): LOW (1-2 hours research, 30 min per application)
- Phase 2 (integration): LOW (reusable component, affiliate links are just URLs with tracking params)
- Lead time: 1-2 weeks for application approval

**ROI:** VERY HIGH (highest-ROI revenue stream for sports content)

**CX FIRST RULE:**
- NEVER show "Sign up with [Placeholder Betting Partner]" or fabricated affiliate CTAs
- Only integrate affiliate links AFTER approval and with real working tracking
- Until approved: display odds without affiliate CTAs (still provides user value)
- Betting content is valuable even without affiliate (users want the odds/analysis)

**COMPLIANCE NOTES:**
- FTC: Must disclose affiliate relationships clearly
- COPPA: Age-gate if required (18+ for betting)
- State restrictions: Some US states prohibit sports betting advertising
- International: Different regulations per country (UK Gambling Commission, etc.)

**RECOMMENDED PROGRAMS (US market):**
1. DraftKings Partners - large US operator, strong brand, good commission
2. FanDuel Affiliates - #2 US operator, good rates
3. BetMGM - good international reach
4. CJ Affiliate / Awin - networks with multiple sportsbook offers
