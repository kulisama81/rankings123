---
id: deploy-failed
status: open
deps: []
links: []
created: 2026-08-01T05:45:01.828Z
type: bug
priority: 0
parent: rankings123
tags: [deploy, infra, bug]
---
# Vercel deployment FAILED — latest changes are not live

The tip of `origin/main` failed to build on Vercel, so production is stuck on the last-good
deploy and the latest commit's changes are NOT live. **Planner: reproduce with `npm run build`,
fix the build error, push the fix, confirm the new deploy succeeds (gh commit status = success),
then close this.** Do not close while the tip commit's Vercel status is still failure/error.

## Failing commit
- `67b2962` — Inspector run 2026-07-31: duplicate table regression found (bug-atp-wta-duplicate-table-regression)
- Vercel status: **failure**

## Log
- 2026-08-01T05:45:01.828Z: tip 67b2962 = failure

