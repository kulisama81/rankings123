---
id: acceptance-criteria-template
status: open
deps: []
links: []
created: 2026-08-15T13:50:22Z
type: task
priority: 1
parent: rankings123
tags: [process, loop-health]
---
# Acceptance criteria template + audit (buildability fix)

LOOP HEALTH ISSUE: Only 1 ticket showing as 'ready' despite 158 open tickets. Many P0s exist but aren't building.

ROOT CAUSE ANALYSIS: Acceptance criteria may be too broad, lack technical specificity, or have hidden blockers.

ACTION: Create acceptance criteria TEMPLATE that guarantees buildability:
1. Concrete technical specs (routes, API endpoints, component names)
2. Data sources identified + mock fallback specified
3. Testable checkboxes (build green, lint clean, route returns 200)
4. No human-blocked dependencies
5. SEO/meta requirements explicit

Then AUDIT 20 highest-priority open tickets and retrofit template.

ROI: 10/10 — Unblocks the entire backlog. Without buildable tickets, planner starves (current crisis: ~0 ready tickets).

## Acceptance Criteria

✅ Create template: docs/ticket-template.md with:
  - Technical implementation section (routes, APIs, components)
  - Data sources + mock fallback checklist
  - Verification checklist (build, lint, manual test)
  - SEO requirements
  - No human-action blockers
✅ Audit top 20 P0/P1 tickets against template
✅ Update 10+ tickets with improved acceptance criteria
✅ Document findings: common buildability blockers
✅ Commit template + updated tickets
