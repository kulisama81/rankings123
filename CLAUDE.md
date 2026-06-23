# Rankings123 — rankings123.com

A **live multi-sport rankings hub**. Beachhead: live ATP/WTA tennis rankings to rival and
surpass live-tennis.eu in **quality and ad revenue**; expanding to World Cup (live now),
with future plans for cycling and Olympics. Live in production at **https://rankings123.com**.

> New here (new session or a scheduled cloud routine)? Read this file, then `docs/DESIGN.md`
> (full design + strategy), `docs/LOOP.md` (how the build loop runs), and
> `.claude/commands/build-next.md` (the one-iteration contract). Don't re-derive or duplicate
> what those already capture.

## CURRENT PRIORITY — growth phases

**⏱ TIME-SENSITIVE (overrides the split below): the FIFA World Cup 2026 is LIVE**
(through ~July 19, 2026) — a short-lived traffic spike we must capture now. The **planner
spends ≥ half its capacity on World Cup** (`worldcup`-tagged tickets) every run until the
tournament ends; **autoresearch keeps the World Cup backlog stocked**. The remaining capacity
goes to the phases below.

1. **Phase 1 — PARITY (now): match and then exceed live-tennis.eu's feature set ASAP** so we are
   a credible competitive product. Parity features outrank everything else until done.
2. **Phase 2 — Differentiate:** build what competitors lack (advanced stats, more sports/events,
   shareable embeds, cross-sport views, faster/deeper live data).
3. **Phase 3 — Revenue streams:** display ads (AdSense → Ezoic → Mediavine as traffic grows)
   **plus sports betting/odds affiliates** (highest RPM for a sports audience).

Autoresearch + planner should drive Phase 1 to done first, then weight Phase 2/3.

## Tech stack
- **Next.js 16 (App Router)** · TypeScript · Tailwind CSS v4
- Deployed on **Vercel**, git-connected: **`git push origin main` auto-deploys to production**
  (rankings123.com). No manual deploy step.

## Data (dynamic, keyless, with mock fallback)
- **Tennis live (ATP/WTA top ~100):** ESPN site API `/sports/tennis/{atp|wta}/rankings` +
  `/scoreboard`, merged by athlete GUID; live points estimated from round reached × per-tier
  points table. Core: `src/lib/liveFeed.ts`, table `src/components/LiveRankingTable.tsx`.
- **ATP deep ranking (top ~1000):** Ultimate Tennis Statistics `rankingsTableTable`, ESPN live
  overlay joined by normalized name. `src/lib/atpDeepFeed.ts` + `atpDeepRanking.ts`.
- **WTA full ranking:** official `api.wtatennis.com/tennis/players/ranked`.
- **World Cup:** ESPN `soccer/fifa.world`. `src/lib/worldCupFeed.ts`.
- **Discipline (keep it):** every feed degrades to a bundled mock on failure and surfaces a
  `source` flag (`espn`/`uts`/`uts+espn`/`mock`) in the UI. Never hard-fail; never fabricate.
- **Data-veracity gate:** `npm run check:data-integrity` (also run inside `npm run build`, the
  pre-commit hook via `.githooks`, and the loop's verify step) FAILS the build on fabricated or
  placeholder data — synthetic generators (`Math.random`/`Math.sin`) in the data layer, or
  "coming soon"/"Placeholder" stub UI. It's a tripwire, not a guarantee: the independent verifier
  still owns *semantic* veracity (does every user-facing number trace to a real source?). Model
  real structures faithfully (e.g. the official FIFA bracket template); projections only when
  explicitly labelled as such.
- Analytics: GA4 (`G-GDM8YNM3SM`) via `src/components/Analytics.tsx` with Consent Mode v2
  (default denied) + `ConsentBanner.tsx`.

## The build loop (Loop A) — how all work ships
Per iteration: pick top unblocked ticket → implement → **mechanical verify** (`npm run build`
green + `npx eslint src --max-warnings=0` clean + run/curl; **bug fixes ship a regression test** —
`node --test` under `tests/` via `npm test`, or a new `check:data-sanity` invariant for data bugs)
→ **independent adversarial
verifier subagent** (the author never judges its own work) → commit `Closes: [id]` →
`git push` → **post-deploy verify** (Vercel build = success via `gh api .../commits/<sha>/status`
+ smoke-test https://rankings123.com routes: 200 + expected content) → close ticket.
Local-green ≠ live: closure requires production confirmation. Full contract in
`.claude/commands/build-next.md` and `docs/LOOP.md`.

## Tickets — ALWAYS keep current (the human tracks via these)
Tickets live as markdown in **`.tickets/`** (YAML frontmatter: `status`
open|in_progress|needs_testing|closed, `priority` 0=highest, `parent`). Use the **`tkt`** CLI
when available (`tkt ls`, `tkt edit <id> --status ...`, `tkt create ...`); in environments
without it (e.g. cloud routines) **edit the `.tickets/*.md` files directly**. Every loop action
**creates / updates / closes** tickets: mark `in_progress` at start, `closed` only after an
independent verifier PASS + merged + live-verified. Loop B files new tickets.

## Autonomy (local cron agents — `.claude/agents/*.md`, run via `claude -p`)
- **planner** (5×/day) — builds the top tickets through the verified loop and ships them.
- **autoresearch** (daily) — strategy + backlog: keeps the planner stocked (≥2 days buildable,
  weighted CX + revenue, World Cup ≥half while live); files ROI tickets + a report.
- **design-research** (weekly) — distinctive visual identity: mines Clay/Awwwards, maintains
  `docs/DESIGN-IDENTITY.md`, files `design` tickets.
- **inspector** (2×/day) — live QA: hunts functional/visual/data/consistency bugs on
  rankings123.com and files reproducible `bug` tickets (regression test required in their criteria).
- **perf-inspector** (daily) — measures load perf + Core Web Vitals across the site, keeps a
  `docs/perf-baseline.md`, and files `perf` tickets on budget breaches or regressions vs baseline
  (`npm run check:performance` is the cheap measurement). Performance = conversion + ad-revenue lever.
- **data-sanity monitor** (5×/day) — `check:data-sanity`; auto-files a `data-anomaly` ticket on bad data.
- **analytics pull** (daily) + **daily digest email** (daily).
These start cold — that's why this file exists. Research/QA agents touch only `.tickets/` + `docs/`.

## Docs to keep current (every ship)
- **README.md** — update when something **major** ships (new sport/page/feature/data source).
- **Site changelog** — `src/data/changelog.ts` drives a public "What's new" page linked in the
  footer; append a one-line **customer-facing** entry for each user-visible change (see `site-changelog`).

## Design direction
**Apple Sports app** aesthetic: clean/premium, bold type, rounded high-contrast cards, dark
base, vibrant per-sport accents, score/rank-forward, subtle motion. Installed skills to use:
`frontend-design`, `theme-factory`, `brand-guidelines`, `webapp-testing`. Ticket: `design-revamp`.
The **`design-research`** agent (`.claude/agents/design-research.md`, runs weekly) owns evolving this
into a **distinctive, memorable identity** — it mines Clay (clay.global/blog), Awwwards, etc., keeps
**`docs/DESIGN-IDENTITY.md`** as the single north-star spec, and files `design`-tagged tickets the
planner builds. All design work ladders up to that doc so the look stays cohesive (CX-first: data is
always the hero; no CWV/a11y regressions).

## Conventions
- **Use skills first (check before every task):** before starting any task, inspect the available
  skills and use the relevant one instead of hand-rolling. In particular: **`frontend-design`** for
  ANY UI/visual work (it enforces strong aesthetic choices — use it on every design/UI ticket),
  **`theme-factory`** for design tokens/palettes, **`brand-guidelines`** for branding,
  **`webapp-testing`** for rendered/visual QA, and **`skill-creator`** to capture reusable project
  workflows as new skills. (Installed via the `example-skills` plugin; more in the Anthropic skills
  repo.) Don't reinvent what a skill does better.
- **CX FIRST — protect the viewer experience above short-term revenue (overriding rule):** a great
  experience is what guarantees continued engagement and viewer trust, which is what ultimately drives
  revenue. So: **never ship placeholder, "coming soon", empty, or fabricated UI to users** — no
  "Affiliate Partner: Placeholder", no made-up odds/stats/predictions, no dead links. Monetization or
  data UI ships **only when backed by a real, working source/link**; until then it stays hidden (gate
  it on a real `source`, e.g. `oddsSource === "api"`), not stubbed. Demo/mock fallback is only
  acceptable as an honest, clearly-flagged degradation when a live feed is temporarily down — never as
  a permanent stand-in for a feature that isn't built. This applies to the planner and autoresearch
  too: revenue matters, but it never comes at the cost of CX.
- **Ads UX (never overwhelm users):** keep ad density LOW and non-intrusive. Max ~1 leaderboard
  + 1 in-content/sidebar unit per page (no ad walls/stacking); NO pop-ups, interstitials,
  auto-play-with-sound, or content-blocking formats (follow the Better Ads Standards); the
  rankings/data stay the hero; below-the-fold ads lazy-load; mobile ads never cover content.
  A good experience beats short-term ad revenue.
- **Git authorship: do NOT add `Co-Authored-By` trailers** to commits. Loic is sole author.
- Match existing code style; prefer extending the feed/table patterns over new architectures.
- Branch off `main` for risky work; routine improvements commit to `main` (auto-deploys).
