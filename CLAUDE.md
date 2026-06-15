# Rankings123 — rankings123.com

A **live multi-sport rankings hub**. Beachhead: live ATP/WTA tennis rankings to rival and
surpass live-tennis.eu in **quality and ad revenue**; expanding to World Cup (live now),
cycling, Olympics. Live in production at **https://rankings123.com**.

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
- Analytics: GA4 (`G-GDM8YNM3SM`) via `src/components/Analytics.tsx` with Consent Mode v2
  (default denied) + `ConsentBanner.tsx`.

## The build loop (Loop A) — how all work ships
Per iteration: pick top unblocked ticket → implement → **mechanical verify** (`npm run build`
green + `npx eslint src --max-warnings=0` clean + run/curl) → **independent adversarial
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

## Autonomy (scheduled cloud routines)
- **rankings123-daily-improve** (daily) — runs one build-loop iteration, ships one verified
  improvement to production.
- **rankings123-weekly-strategy** (Mondays) — researches competitors + data + metrics, creates
  ROI-ranked tickets, writes a growth summary to `docs/reports/`.
- Manage at https://claude.ai/code/routines. These start cold — that's why this file exists.

## Design direction
**Apple Sports app** aesthetic: clean/premium, bold type, rounded high-contrast cards, dark
base, vibrant per-sport accents, score/rank-forward, subtle motion. Installed skills to use:
`frontend-design`, `theme-factory`, `brand-guidelines`, `webapp-testing`. Ticket: `design-revamp`.

## Conventions
- **Ads UX (never overwhelm users):** keep ad density LOW and non-intrusive. Max ~1 leaderboard
  + 1 in-content/sidebar unit per page (no ad walls/stacking); NO pop-ups, interstitials,
  auto-play-with-sound, or content-blocking formats (follow the Better Ads Standards); the
  rankings/data stay the hero; below-the-fold ads lazy-load; mobile ads never cover content.
  A good experience beats short-term ad revenue.
- **Git authorship: do NOT add `Co-Authored-By` trailers** to commits. Loic is sole author.
- Match existing code style; prefer extending the feed/table patterns over new architectures.
- Branch off `main` for risky work; routine improvements commit to `main` (auto-deploys).
