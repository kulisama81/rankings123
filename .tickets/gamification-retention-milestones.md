---
id: gamification-retention-milestones
status: open
deps: []
links: []
created: 2026-07-19T14:36:06Z
type: feature
priority: 3
parent: rankings123
tags: [design, retention, gamification, engagement]
---
# Gamification retention milestones — journey-based UX for return visits

2026 retention research (StriveCloud, gr8.tech): Gamification lifts retention 30%+ by framing the platform as a journey with achievements. Betting sites use levels/milestones (Club Brugge tripled return visits). Rankings123 currently has no return-visit hooks beyond 'check rankings again'. Need subtle milestone system: 'Followed 5 tournaments', 'Tracked 20 players', unlock badges.

## Acceptance Criteria

- Milestone tracking (localStorage): tournaments_followed, players_tracked, days_visited | - Badge system: 5 tournaments = Bronze, 10 = Silver, 20 = Gold | - Subtle UI: small badge icon in nav (top-right), click for progress drawer | - Progress drawer: Your journey, next milestone, encouragement copy | - Milestones: First Visit, 3 Days Streak, 5 Tournaments, 10 Players Tracked, Grand Slam Fan (watched all 4) | - Visual: per-sport accent colors for badges, trophy icon base | - No aggressive prompts: milestones celebrate organically, not block flow | - Privacy: localStorage only, no account required, clear in 90 days | - Analytics: milestone_unlocked event with milestone_id | - Copy tone: encouraging, not pushy — You've followed 3 tournaments!
