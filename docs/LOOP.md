# Rankings123 — Build Loop Runbook

How to run the autonomous build loop (Loop A). Design rationale is in `DESIGN.md` §3.

## One iteration

`/build-next [ticket-id]` runs exactly one iteration:
select top unblocked ticket → implement → mechanical verify (build + lint + run) →
**independent adversarial verifier agent** → commit `Closes: [id]` → close ticket → report.

The command is defined in `.claude/commands/build-next.md`. The non-negotiable rule: the agent
that wrote the code never declares it done — a separate verifier agent does (guards against
self-preferential bias). Build-green is a hard commit gate (guards against laziness). The
acceptance criteria + `DESIGN.md` are re-read each iteration (guards against drift).

## Self-driving (hands-off)

Pair the cadence driver with a hard completion goal:

```
/goal  build loop: keep building the unblocked Rankings123 backlog until tkt has no open,
       unblocked tickets left; never commit on a verifier FAIL; pause only at a 🔑 human handoff
/loop  /build-next
```

`/loop` re-invokes `/build-next` (self-paced); `/goal` blocks stopping until the backlog is
clear. The loop pauses and surfaces to the user only on: a human handoff, a verifier FAIL it
can't fix in 3 rounds, or an empty buildable backlog.

## Parallel fan-out

For several independent tickets at once, use the saved dynamic workflow instead of N sequential
iterations:

```
use the build-features workflow with args ["worldcup", "player-pages"]
```

`.claude/workflows/build-features.mjs` builds each ticket in its own git worktree + branch,
runs an independent adversarial verifier on each branch diff, and returns the verified branches
to merge. The main loop then merges PASS branches into `main`, runs a final build, and closes
the tickets; failures are reported. (Per the dynamic-workflows guidance, treat this script as a
template — adjust per task.)

## Blocked / human handoffs (🔑)

These tickets wait on Loic and are skipped by the loop until done:
`domain` (buy rankings123.com) · `deploy-vercel` (`vercel login` + domain) ·
`gdpr-consent` then `analytics` (GA4 needs consent) · `ad-inventory`/`daily-report`
(AdSense id, Gmail auth). Everything else builds locally meanwhile.

## Ticket lifecycle — always maintained (so the human can track)

Every loop action keeps the `tkt` board current; the board + the daily email are how Loic
follows progress without reading code.

- **Create:** Loop B (and any newly-discovered work) files tickets with acceptance criteria
  and priority before building.
- **Update:** a ticket moves to `in_progress` when work starts. In a **sequential**
  `/build-next` run the building agent owns this. In a **parallel** `build-features` run the
  **main loop owns status** (builders work on throwaway branches): mark all fan-out tickets
  `in_progress` at launch, and on completion `closed` for merged PASS branches / back to
  `open` with a note for FAILs.
- **Close:** only after an independent verifier PASS + merge to `main`, via a commit ending
  `Closes: [id]` and `tkt edit <id> --status closed`. Never close unverified work.
- **Daily email** (`daily-report`) summarizes the churn: tickets created, status changes, and
  closures (with commit refs) since the last report — plus traffic/revenue once live. This is
  the human-facing heartbeat; it ships from day one (build/ticket progress) even before
  analytics exist.

## Definition of done (every feature)

Green `npm run build` + clean `eslint` + clean `npm run check:readability` (no dark-on-dark /
theme-unaware colors; UI verified readable in dark AND light) + exercised for real + an
independent verifier **PASS** +
a commit ending `Closes: [id]` + `git push` + **Vercel build = success** (via
`gh api .../commits/<sha>/status`) + **live smoke test passes** on https://rankings123.com
(key routes 200 + expected content) + ticket moved to `closed`. Local green ≠ live: closure
requires the change to be confirmed serving in production.
