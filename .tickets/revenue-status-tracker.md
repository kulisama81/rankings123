---
id: revenue-status-tracker
status: open
deps: []
links: []
created: 2026-06-23T13:53:19Z
type: task
priority: 2
parent: rankings123
tags: [revenue, process]
---
# Revenue enablement status and blockers (AdSense + affiliates)

Meta-ticket to track revenue enablement status and unblock the path to monetization. Document: (1) AdSense approval status and requirements, (2) Odds API integration status (ODDS_API_KEY env var), (3) Betting affiliate framework readiness, (4) Ad inventory implementation status, (5) What's buildable now vs. what's waiting on external approval/keys. Goal: clear visibility into revenue path and what the planner can ship vs. what needs human action.

**Current Revenue Status (as of 2026-06-23):**
- **Ad revenue:** $0 (no ads live)
- **Affiliate revenue:** $0 (no affiliates integrated)
- **Traffic:** 64 sessions, 109 pageviews (last 28 days) — very early stage
- **Revenue path:** AdSense → Ezoic (10k+ sessions/mo) → Mediavine (50k+ sessions/mo) + betting affiliates (highest RPM)

## Acceptance Criteria

Create a revenue status document at `docs/revenue-status.md` that tracks:

1. **AdSense:**
   - Application status (not applied / pending / approved / rejected)
   - Requirements checklist (ads.txt, privacy policy, content guidelines, traffic threshold)
   - Blockers and next actions
   - Related tickets: ad-inventory (p2), ads-txt (p2), adsense-approval-checklist (p2)

2. **Odds API (The Odds API):**
   - Integration status (not started / key needed / integrated)
   - ODDS_API_KEY env var status in Vercel
   - What unblocks when integrated (wc-odds p1, tennis-odds p2, betting-affiliate p2)
   - Related ticket: odds-api (p1)

3. **Betting Affiliates:**
   - Framework status (not started / designed / implemented)
   - Affiliate network signups (which networks, application status)
   - Integration readiness
   - Related ticket: betting-affiliate (p2)

4. **Monthly Revenue Target:**
   - Current: $0
   - 3-month goal: [TBD - human sets this]
   - 6-month goal: [TBD]
   - Path to goal: traffic growth + monetization mix

5. **What's Buildable Now:**
   - List tickets the planner can ship immediately to enable revenue (e.g., ad inventory implementation once AdSense approved)
   - vs. What's Waiting: tickets blocked on external approvals/keys/signups

Update this doc weekly or when status changes. Commit to docs/.
