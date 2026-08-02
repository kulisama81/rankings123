---
id: user-engagement-persistence
status: open
deps: []
links: []
created: 2026-08-02T13:50:54Z
type: feature
priority: 2
parent: rankings123
tags: [ux, engagement, retention]
---
# User Favorites & Return-Visitor Engagement System

Build persistence layer for return visitors: favorite players, notification preferences, custom dashboards. Drive repeat visits beyond 'check rankings again'.

## Acceptance Criteria

User can save favorite players (localStorage), Custom dashboard shows favorites first, Notification opt-in for favorite player milestones, Analytics: return visitor rate increases

## Notes

**2026-08-02T13:51:09Z**

FIRST PRINCIPLES:

RETENTION DRIVER: Why do users return to a site?
1. Habit (daily need — rankings change daily ✓)
2. Personalization (it knows ME)
3. Investment (I've built something here)
4. Anticipation (what changed since I last checked?)

CURRENT STATE:
- No personalization — every user sees same rankings
- No investment — nothing saved, nothing built
- No anticipation hooks — user has to remember to check

COMPETITORS:
- ESPN: favorites, notifications, personalized feeds
- SofaScore: favorite teams/players, alerts
- FlashScore: follow players, match alerts

GAP: We're missing the return-driver layer above raw data

SOLUTION:
- Favorites (localStorage): save players, get custom view
- Milestones/alerts: 'Federer back to top 10!' (opt-in)
- Custom dashboard: favorites-first rankings

IMPACT: Repeat visits, brand loyalty, competitive parity
EFFORT: MEDIUM (client state, notification system)
ROI: MEDIUM-HIGH — converts one-time visitors to regular users
