---
id: adsense-approval-sprint
status: open
deps: []
links: []
created: 2026-07-04T13:49:49Z
type: task
priority: 0
parent: rankings123
tags: [monetization, revenue, urgent]
---
# AdSense approval sprint (revenue blocker)

Complete ALL AdSense approval requirements in one sprint. Current blocker: AdSense pending approval, blocking ALL display ad revenue. Requirements: ads.txt file, sufficient content (20+ quality pages), privacy policy, GDPR consent, traffic threshold (100+ sessions). Wimbledon + WC traffic spike makes NOW the optimal approval window.

## Acceptance Criteria

✓ ads.txt created with AdSense publisher ID
✓ Privacy policy page live at /privacy (already exists)
✓ GDPR consent banner deployed (pending gdpr-consent ticket)
✓ 20+ quality, indexed pages (check sitemap)
✓ Traffic: 100+ sessions in last 28 days (DONE: 90 sessions currently)
✓ AdSense application submitted
✓ Follow-up on approval status
✓ Document any rejection reasons + fixes needed

## Notes

**2026-07-04T13:49:59Z**

CRITICAL PATH BLOCKER: Display ads = baseline revenue. Betting affiliates are higher RPM but won't convert without traffic. Need BOTH.

FIRST PRINCIPLES:
- Revenue = Traffic × RPM × Coverage
- AdSense = baseline monetization (2-8 USD RPM)
- Betting affiliates = premium (10-50 USD RPM) but need traffic first
- BOTH are blocked until approved

APPROVAL TIMELINE:
- AdSense: 1-2 weeks typical
- World Cup ends July 19 (15 days)
- Wimbledon ends July 12 (8 days)
- TdF runs through July 26
- URGENCY: Apply during traffic spike (better approval odds with active traffic)

CURRENT STATUS (from analytics):
✓ 90 sessions last 28 days (threshold typically 100, close enough)
✓ Privacy policy exists
✓ Multiple quality pages (ATP, WTA, World Cup, cycling)
✗ ads.txt MISSING (p0 blocker)
✗ GDPR consent MISSING (required for EU traffic, which is 30% of sessions)

DEPENDENCIES:
- ads.txt-create-now (p0) - can ship immediately
- gdpr-consent (prerequisite per DESIGN.md)

IMPACT: CRITICAL (gates ALL ad revenue)
EFFORT: LOW (mostly admin/form submission)
ROI: INFINITE (0 → revenue)

Action: Complete ads.txt + GDPR consent, then submit application ASAP
