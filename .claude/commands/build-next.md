---
description: Run one iteration of Loop A — build the next backlog ticket, verify it independently, commit and close.
argument-hint: "[optional ticket id]"
allowed-tools: Bash, Read, Edit, Write, Agent, Glob, Grep
---

You are running **ONE iteration of Loop A**, the autonomous build loop for Rankings123
(rankings123.com — multi-sport live rankings). Follow this contract exactly. The single most
important rule: **you did the work, so you do NOT get to decide it's done — an independent
verifier agent does.** Do not skip step 5.

Engineer against the three failure modes: *laziness* (finish the whole ticket, not 80%),
*self-preferential bias* (the verifier is independent and adversarial), *drift* (re-read the
acceptance criteria + `docs/DESIGN.md` at the start so the goal can't erode).

## Steps

1. **SELECT.** If `$ARGUMENTS` names a ticket id, use it. Otherwise run `tkt ls`, `tkt ready`,
   and `tkt blocked`, and pick the highest-priority **open, unblocked** ticket. SKIP tickets
   gated on a human handoff until that handoff is done: `deploy-vercel` (needs `vercel login` +
   domain), `domain` (purchase), `ad-inventory`/`daily-report` (AdSense id), `analytics`
   (needs `gdpr-consent` first), `gdpr-consent`/`daily-report` (Gmail/CMP setup). Prefer p0/p1.
   Read the ticket (`tkt show <id>`), its acceptance criteria, and `docs/DESIGN.md`.
   If nothing is buildable, say so and stop.

2. **START.** `tkt edit <id> --status in_progress`.

3. **IMPLEMENT.** Build the feature to fully meet the acceptance criteria. Match the existing
   code style and patterns (the live-feed/table architecture in `src/lib/liveFeed.ts` is the
   template for new sports/data). Keep the ESPN mock-fallback + `source` flag discipline.

4. **MECHANICAL VERIFY.** All must pass before step 5:
   - `npm run build` → green
   - `npx eslint src --max-warnings=0` → clean
   - actually exercise it: `npm run start -- -p 3123` (kill stale servers first) and
     `curl` the real routes / inspect output. Fix until genuinely working.

5. **ADVERSARIAL VERIFY (do not skip).** Spawn an **independent** verifier subagent
   (`Agent`, subagent_type general-purpose) and give it: the ticket id + acceptance criteria,
   the list of changed files, and the running server URL. Instruct it to **try to break the
   work** — regressions to existing pages, stale/dead references, half-done or faked/stubbed
   work, type leaks, broken acceptance criteria — and to independently re-run build + lint.
   It must return **PASS or FAIL** with concrete evidence (file:line, curl output).
   - FAIL → fix the cited issues and re-verify (max 3 rounds). Still failing → stop and
     report to the user; do not commit.

6. **COMMIT & PUSH (only on PASS).** Stop background servers. `git commit` with a clear message
   whose last line is `Closes: [<id>]`, then `git push origin main`. (Pushes auto-deploy to
   Vercel — the GitHub repo is git-connected to the production project.)

7. **POST-DEPLOY VERIFY (do not skip — local green ≠ live).** Confirm the change actually
   shipped before closing:
   - **Build:** poll the Vercel deploy result via GitHub —
     `gh api repos/kulisama81/rankings123/commits/<sha>/status --jq '.statuses[]|select(.context=="Vercel")|.state'`.
     It starts `pending`; wait for `success`. If `failure`/`error`, the cloud build broke
     (env/Node/import differences local didn't catch) — open the inspector (`target_url`), fix,
     re-push. **Do not close.**
   - **Live smoke test:** `curl` the production site `https://rankings123.com` for the feature's
     key routes — expect HTTP 200 **and** expected content (e.g. API `source`, player/group
     counts), not just a 200 shell. The deployment's live URL is also at
     `gh api repos/kulisama81/rankings123/deployments/<id>/statuses --jq '.[0].environment_url'`.

8. **CLOSE & REPORT.** Only after build=`success` AND the live smoke test passes:
   `tkt edit <id> --status closed`. Then one concise paragraph: what shipped, verifier verdict,
   live-verify result, next unblocked ticket. **One iteration per run — then stop.**

## Notes
- Pause and surface to the user only at: a human handoff (🔑), a verifier FAIL you can't fix
  in 3 rounds, or an empty buildable backlog.
- For several independent tickets at once, prefer the parallel workflow
  (`.claude/workflows/build-features.mjs`) over running this many times.
