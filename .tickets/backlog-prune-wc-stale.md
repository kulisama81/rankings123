---
id: backlog-prune-wc-stale
status: closed
deps: []
links: []
created: 2026-07-26T13:49:35Z
type: task
priority: 2
parent: rankings123
tags: []
---
# Backlog pruning: Close or reprioritize stale World Cup Final tickets (tournament ended July 19)

## Notes

**2026-07-26T13:49:48Z**

CONTEXT: World Cup Final ended July 19 (7 days ago). Many p0/p1 World Cup tickets are now outdated or no longer relevant.

PROCESS IMPROVEMENT:
Current backlog has ~30+ World Cup tickets, many time-sensitive pre-Final tickets that are now stale:
- wc-final-kickoff-time-prominent (p0) - Final already happened
- wc-homepage-final-promo (p0) - Final already happened
- wc-how-to-watch-guide (p0) - Final already happened
- wc-finals-countdown-system (p0) - Final already happened
- wc-final-spain-argentina-preview (p0) - Final already happened
- Many other pre-Final content tickets

These clog the backlog and distort priority ranking.

ACTION:
1. **Close** tickets that are definitively obsolete (pre-Final content, countdown timers, 'how to watch' guides)
2. **Reprioritize to p3** tickets that are still valid but lower urgency (extended stats, historical archives)
3. **Keep p0/p1** for:
   - Post-Final retention content (recap, SEO tail)
   - Bug fixes (broken match pages, data errors)
   - Retention pivot tickets
4. **Document** which tickets closed and why (for loop improvement)

FIRST PRINCIPLES:
- Backlog should reflect CURRENT priorities, not past deadlines
- Stale tickets waste planner time (sorting/skipping outdated work)
- Time-sensitive tickets need lifecycle: open → in_progress → closed OR expired

ACCEPTANCE:
- Review all ~30 WC tickets (tkt ls | grep wc-)
- Close obsolete pre-Final tickets (add note: 'Closed: Final ended July 19')
- Reprioritize valid but non-urgent tickets to p3
- Keep high-priority: bugs, post-Final content, retention pivots
- Document in ticket note: X closed, Y reprioritized, Z kept p0/p1

ROI: Process health
- Effort: Low (30 min review)
- Impact: Cleaner backlog, accurate priorities, faster planner iterations

## Closed in backlog triage 2026-08-10
dup: superseded by triage
