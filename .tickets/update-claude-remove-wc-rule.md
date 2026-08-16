---
id: update-claude-remove-wc-rule
status: open
deps: []
links: []
created: 2026-08-16T13:50:59Z
type: task
priority: 1
parent: rankings123
tags: [docs, process]
---
# Update CLAUDE.md — Remove World Cup ≥half-capacity rule

World Cup ended July 19. CLAUDE.md still has 'planner spends ≥half capacity on World Cup' rule (4 weeks stale).

Impact: Reduces capacity for US Open (11 days away) and other high-ROI work.

Update CLAUDE.md + autoresearch.md to remove/archive World Cup rule, add US Open priority.

## Acceptance Criteria

✅ CLAUDE.md: World Cup ≥half rule removed from CURRENT PRIORITY
✅ .claude/agents/autoresearch.md: World Cup paragraph removed
✅ Both files reference US Open/Vuelta priorities
✅ Git grep confirms no other stale WC rules
✅ Committed with clear message
