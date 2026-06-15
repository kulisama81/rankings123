---
id: deploy-verify
status: open
deps: []
links: []
created: 2026-06-15T00:27:23Z
type: feature
priority: 1
parent: rankings123
tags: [loop, verification, deploy]
---
# Post-deploy verification in the loop (build + live site)

Loop A currently verifies only the LOCAL build + LOCAL runtime. It does NOT confirm the Vercel deploy built or that the live site serves the change. Add a post-push step: (1) confirm Vercel build success via GitHub commit status (gh api .../commits/<sha>/status -> Vercel=success); (2) smoke-test live routes (200 + expected content) on the production URL; (3) on failure, reopen the ticket + fix/rollback before closing.

## Acceptance Criteria

Every shipped feature is confirmed live: Vercel build=success for its commit AND its key routes return 200 with expected content on the production URL; failures block closure and are surfaced.
