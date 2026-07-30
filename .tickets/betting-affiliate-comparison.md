---
id: betting-affiliate-comparison
status: open
deps: []
links: []
created: 2026-07-30T06:00:00Z
type: task
priority: 1
parent: rankings123
tags: [revenue, betting, research]
---
# Betting affiliate prioritization: Bet365 vs FanDuel vs DraftKings

Research and compare the top 3 betting affiliate programs to determine priority order for signup based on commission structure, requirements, approval speed, and traffic fit.

**Key Question:** Which affiliate should we apply to FIRST to minimize time-to-revenue?

## Comparison (2026 data)

**Bet365 Partners:**
- **Commission:** Up to 35% RevShare (or CPA/Hybrid negotiable with manager)
- **Minimum payout:** €100 threshold
- **Requirements:** 15 active customers/month minimum to qualify for payment
- **Geographic focus:** Global (strong in EU/UK)
- **Approval time:** ~3-7 days
- **Restrictions:** NO brand bidding, NO children/porn sites

**FanDuel Affiliates:**
- **Commission:** $100-500 CPA per first-time depositor OR 20-35% RevShare (2-year cookie)
- **CPA tiers:** $25 (1-25 refs/month), $30 (26-100), $35 (101+)
- **Requirements:** US traffic from regulated states + possible state affiliate license (NY, etc.)
- **Geographic focus:** US + Canada (Ontario) ONLY
- **Approval time:** Few days
- **Risk:** Rejection if no US/gambling niche experience or can't prove traffic legality

**DraftKings:**
- **Commission:** 25-40% on referred players
- **Requirements:** Similar to FanDuel (US-focused, state regulations)
- **Geographic focus:** US states where sports betting is legal
- **Approval time:** ~3-7 days

## Decision Factors

1. **Current traffic geography:** Rankings123 has 19/39 sessions from US (49%), rest international
   - FanDuel/DraftKings = US-only → LIMITED to half our traffic
   - Bet365 = global → works for ALL traffic

2. **Barrier to entry:**
   - Bet365 = 15 customers/month minimum (HARD with current 38 users/month)
   - FanDuel = possible state license requirement (blocker)
   - DraftKings = similar to FanDuel

3. **Commission ROI:**
   - All offer 25-35% RevShare (similar long-term)
   - FanDuel CPA ($100-500) gives faster short-term revenue
   - Bet365 highest RevShare ceiling (35%)

4. **Approval probability:**
   - FanDuel = may reject if no gambling niche experience
   - Bet365 = more lenient, global focus
   - DraftKings = similar to FanDuel

## Acceptance Criteria

1. Document full commission structures, requirements, and approval criteria for all 3 programs
2. Recommend priority order (1st, 2nd, 3rd) based on current traffic geography + quick-revenue path
3. Identify any blockers (state licenses, traffic minimums, niche experience)
4. Update `betting-affiliate-signups-execute` ticket with the recommended application sequence
5. Include ROI justification using first-principles: revenue per user, approval probability, time-to-first-dollar

## ROI Justification

**Impact:** HIGH — eliminates guesswork on which affiliate to apply to first, avoiding wasted time on wrong program or rejection. Directly unblocks the P0 `revenue-sprint-now` ticket.

**Effort:** LOW (2-3 hours research + documentation)

**First-principles reasoning:**
- Revenue = Traffic × Conversion × Commission
- Betting affiliates = $100-300+ RPM (10-50x AdSense's $9-18 for sports)
- Getting ONE approved fast >> applying to all three and waiting
- Wrong choice = weeks lost to rejection + reapplication

## Sources

- Bet365: https://getlasso.co/affiliate/bet365/, https://track360.io/blog/bet365-affiliate-program-us-operator-analysis-2026
- FanDuel: https://getlasso.co/affiliate/fanduel/, https://track360.io/blog/fanduel-affiliate-program-operator-review-2026
- DraftKings: https://uppromote.com/affiliate-programs/sports-betting/
- Market overview: https://affpapa.com/best-sports-betting-affiliate-programs/
