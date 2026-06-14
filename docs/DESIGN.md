# Rankings123 — System Design

**Brand:** rankings123.com — a multi-sport rankings & live-standings hub (§9).

**Goal (beachhead):** Build a live ATP/WTA tennis rankings site that **rivals live-tennis.eu
in quality** and **surpasses it in ad revenue** — then expand the same live-data engine to
other sports (World Cup now, cycling, Olympics).

**Status (2026-06-14):** v1 of the core feature shipped — `/atp-live` renders the real ATP
top-100 live ranking from ESPN data (commit `fb42e77`). Build green, lint clean, not yet
deployed. Everything below is the plan to get from "one good page" to "monetized destination."

This document is the source of truth we align on before building further. Tracked work lives
in `tkt` (run `tkt ls`); the epic is `tennis-site`.

---

## 1. Competitive bar

live-tennis.eu is valuable because it shows the **live** ranking — what the ATP/WTA ranking
would be *right now* if frozen mid-tournament — which the official sites don't surface in real
time. Fans obsess over this during tournament weeks. To rival and surpass it:

| Dimension | live-tennis.eu | Us today | Plan |
|-----------|----------------|----------|------|
| ATP live ranking | ✅ | ✅ v1 (estimated points) | accuracy pass (`data-accuracy`) |
| WTA | ✅ | ❌ | `wta-live` (data verified available) |
| Race (YTD) rankings | ✅ | ❌ | `race-rankings` |
| Player detail / points breakdown | ✅ | ❌ | `player-pages` (also the SEO engine) |
| Points to defend / dropping | ✅ | ❌ (removed; needs 52-wk data) | `points-defend` |
| Doubles | ✅ | ❌ | `doubles` |
| Deployed + monetized | ✅ (display ads) | ❌ | `deploy-vercel`, `ad-inventory`, `gdpr-consent` |

**Where we can surpass:** faster/cleaner UX, more pages per session (ATP+WTA+race+player =
more ad impressions), better SEO (player pages → long-tail search traffic), and a data-quality
edge if we nail exact draw points.

---

## 2. Architecture

- **Framework:** Next.js (App Router) on **Vercel**. Server-rendered for SEO + freshness.
- **Data (dynamic, no-auth, multi-source):**
  - **Full ranking — WTA:** official `api.wtatennis.com/tennis/players/ranked`
    (`type=rankSingles&metric=singles&sort=asc&page=K&pageSize=N`) — paginated to 1,500+, with
    `ranking, points, movement, tournamentsPlayed, rankedAt` + `player{fullName, countryCode,
    dateOfBirth}`. Authoritative and live (auto-updates; `rankedAt` 2026-06-08).
  - **Full ranking — ATP:** `ultimatetennisstatistics.com/rankingsTableTable`
    (`rowCount=N&rankType=RANK`) — dynamic, 1,000+ deep (total ~2,161), with rank, name,
    country, points, and **career-high** (`bestRank`). (No clean official ATP API —
    atptour.com is Cloudflare-walled.) ESPN stays authoritative for the live top ranks;
    UTS extends depth, with the points snapshot reconciled.
  - **Live overlay (both tours):** ESPN `/sports/tennis/{atp|wta}/scoreboard` — this week's
    draws/rounds/results for players in current tournaments, joined by **normalized name**.
  - All sources are keyless live JSON (not committed files). Bundled **mock fallback** +
    `source` flag in the UI. Migration to full depth tracked in `top-1000`.
- **Live computation:** merge rankings + scoreboard by athlete GUID; estimate points earned
  this week from round-reached × per-tier points table; re-sort to a live rank with movement
  vs official. (v1 estimate today → exact draw points in `data-accuracy`.)
- **Caching:** Next.js revalidation — rankings ~30 min, scoreboard ~60 s. Client polls the
  API every 20 s for the live feel without hammering ESPN.
- **Reliability:** any feed failure degrades to the mock snapshot; the page never hard-fails.

```
ESPN rankings ─┐
               ├─► liveFeed (merge by GUID, estimate pts, re-sort) ─► /api/[tour]/live ─► client table (polls 20s)
ESPN scoreboard┘                                                  └─► server-rendered page (SEO)
```

---

## 3. The two loops

This is the heart of the request: **two cooperating agentic loops**, designed against the
three failure modes from the dynamic-workflows playbook — *agentic laziness* (stopping at
partial), *self-preferential bias* (rubber-stamping own work), and *goal drift* (losing the
objective across turns).

### Loop A — Build / Execution (fast cadence)

Turns the backlog into shipped, verified features.

```
pick top READY ticket (tkt, priority-ordered)
  → mark in_progress
  → implement
  → MECHANICAL verify: npm run build (green) + eslint (clean) + run/curl the real result
  → INDEPENDENT verifier agent (separate context, adversarial): checks acceptance criteria,
    hunts for laziness/regressions/half-done work — the worker does NOT judge its own output
  → pass? commit with "Closes: [ticket]" → ticket auto-closes
  → fail? add note, fix, re-verify (bounded retries)
  → next
```

- **Cadence/guardrails:** paired `/loop` (drives iterations) + `/goal` (hard stop condition:
  "don't stop until the ready backlog is clear"). Green build is a commit gate.
- **Parallelism:** when several tickets are independent (e.g. `wta-live`, `player-pages`,
  `race-rankings`), run them as a **dynamic workflow** — one agent per feature in its own
  worktree, each adversarially verified, then merged. Avoids one context window doing
  everything (the laziness/drift trap).
- **Anti-drift:** the ticket's acceptance criteria + this doc are re-read each iteration; the
  verifier agent is given them fresh so summarization can't erode them.

### Loop B — Continuous Improvement / Strategy (slow cadence)

The meta-loop that decides **what Loop A should build next**, based on real-world results.

```
GATHER  → site metrics (analytics: visitors, sessions, pageviews/session)
        + ad performance (AdSense: revenue, RPM, viewability)
        + competitor state (live-tennis.eu features/changes)
        + newly-available data sources (what ESPN/others expose that we don't show)
ANALYZE → where do we trail on traffic or RPM? which missing feature has best traffic/$ ROI?
          what's underperforming and why? (root-cause pattern)
RECOMMEND → create / re-prioritize tkt tickets, each with an ROI justification
            (generate-and-filter: dedupe vs open tickets, keep only high-ROI survivors)
REPORT  → emit the daily summary (§4) to Loic
```

- **Cadence:** scheduled routine (candidate: weekly deep run + daily light report). Runs as a
  Claude Code scheduled agent (`/schedule`).
- **Closed loop:** B writes the backlog → A ships → B measures the lift → adjusts. This is the
  self-improving engine; A alone would just drain a static list.
- **Patterns used:** deep-research (competitor + data scan), root-cause investigation (revenue
  dips), generate-and-filter (task ideas → ROI-ranked tickets).

---

## 4. Daily report

One output of Loop B (ticket `daily-report`). A message to Loic each day containing:

- **Traffic:** unique visitors (last 24 h + 7-day trend), pageviews, pages/session, top pages.
- **Revenue:** ad revenue (24 h + trend), RPM, top-earning pages. *(Estimated & flagged until
  the AdSense API is connected.)*
- **Shipped:** tickets closed since last report (from `tkt`).
- **Recommendations:** 1–3 highest-ROI next actions from Loop B.
- **Anomalies:** traffic/revenue/error spikes worth attention.

**Delivery options (decision needed):** email via Gmail integration to loic.deniel@gmail.com
*(recommended)* · or a committed `docs/reports/YYYY-MM-DD.md` · or a push notification.

---

## 5. Monetization & measurement

Revenue = **traffic × RPM**. Code earns $0 until deployed and attracting traffic, so the
sequence is deliberate:

1. **Deploy** (`deploy-vercel`) — a live, indexable URL. Nothing else matters until this.
2. **Traffic levers:** WTA (doubles the audience), player pages (long-tail SEO), race rankings
   (more pages/session), SEO foundation (sitemap, metadata, JSON-LD), fast LCP.
3. **Ad inventory** (`ad-inventory`): leaderboard + in-table + sidebar slots, AdSense (only
   realistic network for a new site; Mediavine/AdThrive need existing traffic). Zero-CLS slots.
4. **Consent** (`gdpr-consent`): CMP before ads serve in the EU (our core audience).
5. **Measure** (`analytics`): visitors/pageviews feeding the daily report and Loop B.

**KPIs:** unique visitors/day · pages per session · ad RPM · daily revenue · returning-visitor
rate (tournament-week stickiness is our structural advantage).

---

## 6. Dependencies / handoffs (need Loic)

These are the only things the loops can't do autonomously:

| 🔑 | For | Action |
|----|-----|--------|
| Vercel login | `deploy-vercel` | `npx vercel login` in session (one-time) |
| AdSense publisher ID | `ad-inventory` | create/share AdSense account + site approval |
| AdSense Management API (OAuth) | `daily-report` real revenue | authorize read access |
| Analytics choice | `analytics` | confirm Vercel Analytics (default) vs Plausible/GA4 |
| Daily-report channel | `daily-report` | email / file / push (see §4) |
| Custom domain (optional) | SEO/brand | purchase + point DNS |

---

## 7. Roadmap (priority order)

Phase 1 — **Go live & double the audience:** `deploy-vercel`, `wta-live`, `seo-base`.
Phase 2 — **Traffic engine:** `player-pages`, `race-rankings`.
Phase 3 — **Monetize:** `analytics`, `gdpr-consent`, `ad-inventory`, `daily-report`.
Phase 4 — **Self-improve & deepen:** `improve-loop`, `points-defend`, `data-accuracy`,
`doubles`, `polish`.

(`loop-harness` — the Loop A verification machinery — is built once, up front.)

---

## 8. Decisions — CONFIRMED (2026-06-14)

1. **Analytics: Google Analytics 4.** ⇒ `gdpr-consent` is now a **prerequisite** of
   `analytics` (GA4 must not load in the EU before consent). Pair GA4 ↔ AdSense for revenue.
2. **Daily-report channel: email** to loic.deniel@gmail.com (via Gmail integration).
3. **Autonomy: Loop A fully autonomous** — commit each verified feature, pause only at §6
   handoffs.
4. **Loop B cadence: weekly deep strategy run + daily light report.**
5. **Domain: rankings123.com** (custom, up front). Loic purchases; we wire DNS on Vercel.
   A sport-neutral brand on purpose — it carries the multi-sport expansion (§9).

### Sequencing impact
- Consent banner moves earlier (before analytics & ads): Phase 3 order becomes
  `gdpr-consent` → `analytics` → `ad-inventory` → `daily-report`.
- Launch (`deploy-vercel`) is gated on two handoffs: **Vercel login** + **domain purchase**.
  Local build of all features proceeds in parallel meanwhile.

---

## 9. Multi-sport strategy (rankings123.com)

Tennis is the **beachhead**, not the ceiling. The same engine — fetch a sport's official
data + live event feed, merge, render fast SEO pages, run the two loops — generalizes to any
ranked/standings sport. The sport-neutral `rankings123.com` brand is chosen for exactly this.

**Why expand (the success thesis):**
- **Seasonal smoothing.** Tennis traffic dips between Slams. A portfolio (World Cup in
  summer, Tour de France in July, Olympics every 2 yrs, year-round tennis) keeps traffic and
  ad revenue from cratering off-season.
- **Compounding ad inventory.** Each sport adds pages, sessions, and impressions on the same
  ad/consent/analytics infrastructure built once. Marginal cost of a new sport ≈ a data
  adapter + tables.
- **Cross-sport traffic + brand.** One destination fans return to; internal linking and a
  recognizable brand lift SEO authority faster than single-sport sites.
- **Event spikes are cheap to capture.** Live events (World Cup, Olympics) drive huge
  short-term search traffic; being live with real data during the event is the whole game.

**Engine reuse:** the tennis `liveFeed` (ESPN rankings + scoreboard → merge by id → live
table) is the template. Each sport = a new adapter implementing {official table, live event
feed, tier/points or standings rules}. World Cup feasibility confirmed via ESPN
`soccer/fifa.world` scoreboard (live 2026 fixtures returned).

**Expansion roadmap:**
1. **Tennis (ATP/WTA)** — live now, the quality bar vs live-tennis.eu.
2. **FIFA World Cup 2026 (PARALLEL, now)** — live group standings + fixtures/results. The
   tournament is on *right now* (epic `worldcup`); time-boxed traffic spike to capture
   immediately, in parallel with tennis depth work.
3. **Cycling — Tour de France (July)** — GC/stage standings; repo already has cycling mock
   pages to evolve.
4. **Olympics** — medal table + event results; repo already has an Olympics mock to evolve.

**Sequencing note:** World Cup runs as a parallel build track (Loop A can fan out: one stream
deepens tennis, another builds World Cup) because the event window is open now and won't wait.
Shared infra (deploy, ads, consent, analytics, the two loops) is built once and serves all
sports.
