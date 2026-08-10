---
id: homepage-live-banner
status: closed
deps: []
links: []
created: 2026-07-04T13:50:10Z
type: feature
priority: 0
parent: rankings123
tags: [cx, engagement, traffic, urgent]
---
# Homepage 'Live Now' status banner (fix 68% bounce)

Add prominent 'Live Now' status banner at top of homepage showing active tournaments/events. Analytics show 68% homepage bounce vs 40% World Cup page (which shows live data). Users need immediate signal of what's happening NOW. Banner shows: 'LIVE: Wimbledon R16 | World Cup Quarterfinals | Tour de France Stage 5' with click-through to detail pages.

## Acceptance Criteria

✓ Banner component at top of homepage
✓ Shows currently active tournaments/events across all sports
✓ 'LIVE' badge with pulse animation
✓ Click → goes to event detail page
✓ Updates based on real tournament status (not hardcoded)
✓ Graceful handling when no events live (shows upcoming instead)
✓ Mobile responsive (prominent on mobile too)
✓ Target: reduce homepage bounce from 68% to <45%

## Notes

**2026-07-04T13:50:20Z**

CRITICAL CX ISSUE: Homepage has 68.4% bounce rate vs 40% World Cup, 7% ATP (analytics last 28 days)

FIRST PRINCIPLES:
- ROOT CAUSE: Homepage doesn't answer 'what's happening NOW?' 
- PROOF: World Cup page has LOW bounce (40%) because it shows LIVE data immediately
- DIRECT FIX: Make homepage SCREAM 'here's what's live NOW'

ANALYTICS DATA (last 28 days):
- Homepage: 68 views, 24.7s session, 68.4% bounce (TERRIBLE)
- World Cup: 58 views, 157.8s session, 40% bounce (GOOD - shows live data)
- ATP Live: 16 views, 18.5s session, 7.1% bounce (EXCELLENT - shows live data)

PATTERN: Pages with LIVE/NOW data = low bounce. Static navigation = high bounce.

SOLUTION: Immediate visual signal of live events:
'🔴 LIVE NOW: Wimbledon R16 | World Cup QF | Tour de France Stage 5'

IMPACT: CRITICAL (68% bounce = 46 of 68 visitors leave immediately)
- Saving even 30% = 14 extra engaged users/month
- As traffic scales: 1000 homepage visits × 30% saved = 300 extra sessions = 1200+ extra pageviews = 10-30 USD revenue/day

EFFORT: LOW (single banner component, reads from existing tournament status)

ROI: VERY HIGH (massive bounce reduction from simple visual change)

TIME-SENSITIVE: Wimbledon + WC + TdF all LIVE NOW (peak live-event density)

## Closed in backlog triage 2026-08-10
dup: homepage-live-urgency-widget
