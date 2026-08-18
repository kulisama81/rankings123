---
id: us-open-revenue-infrastructure-sprint
status: open
deps: []
links: [odds-api-integration, betting-affiliate-integration, us-open-2026-betting-guide, us-open-live-scores-widget]
created: 2026-08-18T13:45:00Z
type: epic
priority: 0
parent: rankings123
tags: [revenue, us-open, infrastructure, urgent]
---
# US Open Revenue Infrastructure Sprint — Critical Path for Aug 27 Deadline

**URGENCY: US Open draw in 9 days (Aug 27), main draw starts Aug 30. All revenue infrastructure MUST be live before Aug 30 to capture the 2-week betting peak.**

Meta-ticket coordinating the critical-path infrastructure needed to monetize US Open traffic. US Open = biggest tennis event in North America (100K+ searches, 5-8% betting conversion vs 1-2% baseline, peak RPM $75-150). Revenue infrastructure must be DEPLOYED before content to avoid Cincinnati bug repeat (content shipped without affiliate links = CX violation).

## Critical Path (Must Build First → Then Content)

### Infrastructure Layer (Build These FIRST):
1. **odds-api-integration** (P1 → should be P0) — The Odds API free tier, 500 req/day, NO approval needed. Can build TODAY. Blocks all betting content.

2. **betting-affiliate-integration** (P2 → should be P1) — Reusable affiliate link component with env-var gate (`BETTING_AFFILIATES_LIVE`). Build NOW (even without approved IDs) so approval = 5-min env swap, not multi-day build. Prevents CX violations.

3. **Ad slot architecture** — Prepare ad slots (hidden until AdSense approved) so approval = instant activation.

### Content Layer (Build After Infrastructure):
4. **us-open-2026-betting-guide** (P0) — Needs odds API + affiliate components ready
5. **us-open-live-scores-widget** (P0) — Needs odds API for live betting context
6. **us-open-2026-coverage** (P0) — Hub page, needs affiliate CTAs

## First-Principles ROI

**Why infrastructure BEFORE content:**
- Cincinnati shipped betting content WITHOUT affiliate links = CX violation (bug-betting-guide-no-links)
- Content without monetization infrastructure = wasted SEO opportunity
- Building sequentially (infra → content) prevents rework

**Why US Open is the #1 priority:**
- **Traffic asymmetry**: 100K+ searches over 2 weeks vs 5K/month baseline (20× monthly traffic)
- **Revenue asymmetry**: Grand Slam betting conversion 5-8% vs 1-2% baseline (4-8× conversion)
- **RPM peak**: Betting affiliates during majors = $75-150 RPM vs $5-10 AdSense baseline (10-30× RPM)
- **Timing is EVERYTHING**: Publish Aug 27-29 = rank for Aug 30+ traffic. Publish Sep 1 = too late.

**Revenue calculation (if infrastructure ready):**
- 100K searches × 1% CTR = 1,000 pageviews
- 1,000 pageviews × 3% affiliate CTR = 30 clicks
- 30 clicks × 10% conversion = 3 signups
- 3 signups × $150 CPA = **$450 revenue** (conservative)
- If infrastructure NOT ready = $0

## Acceptance Criteria

✅ All infrastructure tickets (odds API, affiliate component, ad slots) DEPLOYED before Aug 27
✅ All content tickets (betting guide, live scores, coverage hub) reference deployed infrastructure
✅ No betting content ships without real affiliate links (CX-first compliance)
✅ Verification: Manual test of affiliate link click-through flow (click → tracking param → partner site)
✅ Revenue dashboard updated with US Open revenue tracking

## Blockers & Mitigation

**HUMAN-BLOCKED:**
- AdSense approval (P0, waiting on Loic to apply)
- Betting affiliate approvals (P0, waiting on Loic to apply to Bet365/FanDuel)

**BUILDABLE NOW (not blocked):**
- Odds API integration (free tier, no approval)
- Affiliate component framework (env-var gate, swap IDs when approved)
- Ad slot architecture (hide until AdSense approved)

**Mitigation:** Build all non-blocked infrastructure NOW. When approvals come (likely during US Open), flip env vars and revenue activates instantly.

## Timeline

- **Aug 18-20 (3 days):** Build odds API + affiliate component infrastructure
- **Aug 21-24 (4 days):** Build US Open content (betting guide, live scores, hub)
- **Aug 25-26 (2 days):** Deploy, verify, SEO optimization
- **Aug 27:** US Open draw announced, content ranks for Aug 30+ searches
- **Aug 30-Sep 13:** Revenue window (2 weeks)

**Next autoresearch run (Aug 19):** Verify this sprint is in progress. If planner hasn't started infrastructure tickets, escalate priority or create handoff ticket.
