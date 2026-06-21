---
id: data-integrity-gate
status: closed
deps: []
links: []
created: 2026-06-21T06:39:40Z
type: chore
priority: 1
parent: rankings123
tags: [infra, quality]
---
# Data-integrity guardrail: block fabricated/placeholder data in build + pre-commit

Add scripts/check-data-integrity.mjs (flags Math.random/Math.sin generators in the data layer + placeholder/stub UI), wire it into npm run build (so Vercel won't deploy violations), a shared .githooks/pre-commit, and the planner verify step. Neutralize the worldCupOdds Math.sin fabricator.

## Acceptance Criteria

check:data-integrity runs in build + pre-commit + loop verify; catches fabrication (negative-tested); no fabricators remain in src; documented in CLAUDE.md + planner.md.
