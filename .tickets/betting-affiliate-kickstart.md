---
id: betting-affiliate-kickstart
status: open
deps: []
links: []
created: 2026-07-01T13:50:47Z
type: task
priority: 0
parent: rankings123
tags: [monetization, urgent, revenue]
---
# URGENT: Betting affiliate program signups (Bet365, Pinnacle, William Hill)

CRITICAL PATH BLOCKER: Sign up for betting affiliate programs NOW. Approval takes 1-2 weeks, which blocks ALL betting content monetization (R16 betting, TdF betting, golden boot odds, etc.). This is p0 because it gates ALL high-RPM betting revenue. Programs: Bet365 Partners (35% RevShare), Pinnacle (30-40%), William Hill, FanDuel, DraftKings.

## Acceptance Criteria

Apply to Bet365 Partners, Pinnacle, William Hill, and 2+ additional programs. Document approval status. Once approved add affiliate tracking links to /lib/affiliates.ts config. Document commission structure. Set up conversion tracking if required. Ships IMMEDIATELY (manual task). Impact: CRITICAL - gates ALL betting content monetization. Effort: LOW - application forms (1-2 hours). ROI: BLOCKS revenue path. URGENCY: Start TODAY. 1-2 week approval lead time. Note: Manual task - user may need to complete if programs require business verification.

## Notes

**2026-07-01T13:54:39Z**

CRITICAL PATH ANALYSIS (first principles):

Revenue = Traffic × RPM × Session Depth × Conversion

Betting affiliates optimize ALL FOUR:
- Attracts HIGH-INTENT traffic (sports fans actively betting)
- HIGHEST RPM: Betting = 10-50 USD RPM, Display ads = 2-8 USD RPM (5-10× difference)
- RECURRING revenue: RevShare = 40-60% lifetime commission per bettor (not one-time impression)
- Deepens sessions: Betting content (odds, predictions) INCREASES engagement vs generic rankings

Lead time problem:
- Approval takes 1-2 weeks
- World Cup ends July 19 (18 days left)
- R16 starts July 4 (3 days away) — peak betting volume
- Every day of delay = lost revenue during peak engagement window

What this gates:
- wc-r16-betting-previews (p0)
- wc-golden-boot-odds-live (p1)
- wc-tournament-winner-odds (p1)
- wc-qf-betting-hub (p1)
- tdf-winner-betting-guide (p0)
- tdf-stage-betting-daily (p2)
- ALL betting content monetization

Action: USER must sign up TODAY (manual task, requires business verification). Can't be automated.
