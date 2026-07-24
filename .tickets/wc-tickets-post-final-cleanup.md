---
id: wc-tickets-post-final-cleanup
status: open
deps: []
links: []
created: 2026-07-24T13:51:52Z
type: task
priority: 0
parent: rankings123
tags: []
---
# Reprioritize/Close Outdated World Cup Tickets (post-final)

World Cup ended July 19 (Spain 1-0 Argentina). Many p0/p1 WC tickets are now outdated (final countdown, lineups, how-to-watch, betting CTAs). Review all wc-* tickets, close past-date ones, reprioritize others to p3-p4 or convert to post-tournament content.

## Acceptance Criteria

- Review all open wc-* tickets (tkt ls | grep wc-)
- Close tickets that are past-date: wc-homepage-final-promo, wc-how-to-watch-guide, wc-lineups-page, wc-final-kickoff-time-prominent, wc-finals-countdown-system, wc-final-spain-argentina-preview (these were pre-final)
- Reprioritize to p3-p4: wc-qf-betting-hub, wc-semi-final-predictions, wc-semifinals-betting-hub (these are past-date too)
- Keep p1-p2: wc-2026-final-recap (NEW, post-tournament), wc-post-final-retention-content
- Update wc-betting-affiliates to reference post-final content (2030 futures, not 2026 match odds)
- Document changes in ticket notes

## Notes

**2026-07-24T13:51:56Z**

ROI: Backlog hygiene = planner efficiency. Outdated WC tickets waste planner time (it might try to build a "final countdown" 5 days after the final). Closing past-date tickets = cleaner backlog = planner focuses on high-ROI work. Also prevents CX bugs (shipping outdated content). Effort = Low (review + close). ROI = HIGH (backlog quality, prevents wasted work).
