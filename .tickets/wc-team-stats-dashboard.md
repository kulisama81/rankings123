---
id: wc-team-stats-dashboard
status: open
deps: []
links: []
created: 2026-06-22T13:30:00Z
type: feature
priority: 1
parent: worldcup
tags: [worldcup, engagement, data]
---
# World Cup team statistical leaderboards

Team-level stat leaders during live tournament: most goals scored, best defense (fewest conceded), most possession, most shots, disciplinary records (yellow/red cards). ESPN API already provides team stats — surface them as engaging leaderboards.

## First-principles ROI
- **User need**: During live WC, fans compare teams by performance stats, not just standings
- **Timing**: TIME-SENSITIVE (WC live through ~July 19) — high engagement window
- **Effort**: Low (ESPN standings API has team stats already)
- **Impact**: High engagement (shareable, discussable), differentiates from basic standings
- **Traffic**: World Cup pages have 621s avg session (10+ min) — deepest engagement on site

## Acceptance Criteria

1. /world-cup page includes "Team Stats" section with leaderboards:
   - Most goals scored (team, goals)
   - Best defense / fewest goals conceded (team, goals against)
   - Most disciplined / fewest cards (team, yellow/red count)
   - Any other available team stats from ESPN API
2. Data from ESPN World Cup standings/stats API (real-time)
3. Each leaderboard shows top 5-8 teams
4. Team names link to /world-cup/team/[code] pages
5. Mobile-responsive layout (stacks on mobile)
6. Mock fallback if API fails (with source flag)
7. Themed with World Cup accent colors
8. Build/lint/data-integrity green
9. Live-verified on rankings123.com
