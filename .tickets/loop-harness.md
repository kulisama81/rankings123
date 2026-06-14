---
id: loop-harness
status: open
deps: []
links: []
created: 2026-06-14T22:51:04Z
type: task
priority: 1
parent: tennis-site
tags: [meta]
---
# Agentic build-loop harness (verification + tracking)

The loop itself: per-iteration build->verify(build/lint/run)->independent adversarial verifier agent->commit referencing ticket->mark done. Guards against laziness/self-bias/drift. Pairs /loop + /goal.

## Acceptance Criteria

Each completed feature has: green build+lint, a verifier-agent sign-off, a commit with Closes:[ticket], ticket moved to closed.
