---
id: video-embed
status: open
deps: []
links: []
created: 2026-06-15T05:13:46Z
type: feature
priority: 1
parent: rankings123
tags: [ui, engagement]
---
# Per-player inline highlights — last round played (like live-tennis.eu)

REPLACE the single curated page-level highlights embed (shipped in 7560f14) with **per-player inline
highlights**, like live-tennis.eu: each player row on `/atp-live` and `/wta-live` (and the deep 1000
table) gets a small, unobtrusive "▶ highlights" affordance (a YouTube/play icon) that surfaces
highlights for **that player's most recent match — the last round they played**.

DATA-VERACITY (hard): there is no free API that maps "player's last match → a specific embeddable
video", so we must NOT guess/fabricate a specific video id. The honest, buildable-now version is a
per-player **YouTube search deep-link for their latest match**, built from data we already have:
player name + their current/most-recent tournament + round (from the ESPN live overlay `tournament`
field in `liveFeed.ts`, e.g. "Halle R16") + "highlights". For players not currently in a draw, fall
back to `"{player} tennis highlights"`. A true *inline embed of the exact match video* requires the
keyed YouTube Data API — that's the separate handoff ticket `youtube-api` (build this search-link
version now; the embed upgrades on top of it when the key lands).

CX-first: keep it subtle (icon per row, opens in a new tab or a small lazy modal) — it must not push
the rankings down, slow the first scroll, or clutter the table. Lazy; if any embed/modal is used,
`youtube-nocookie.com` + consent-gated.

## Acceptance Criteria

1. Each player row on `/atp-live` and `/wta-live` (incl. the deep 1000 table) shows a small,
   tasteful per-player highlights affordance — the rankings stay the hero (no layout shift, table not
   pushed down, mobile-OK).
2. The link targets **that player's last round**: query built from name + their tournament + round
   (from the ESPN overlay) + "highlights"; sensible `"{player} tennis highlights"` fallback when no
   current match. No fabricated/guessed specific video ids.
3. The resolved YouTube URL returns HTTP 200 (it's a search URL, so always valid) — verify at build/
   verify time; note it in the verifier report.
4. The old single curated page-level embed is removed (superseded by per-player).
5. **REGRESSION TEST REQUIRED:** a `node --test` unit test under `tests/` for the query-builder —
   given a player with `tournament`/`round` → the expected search query/URL; given none → the
   fallback. `npm test` green.
6. Optional GA4 `video_play`/`highlights_click` event for engagement. Tokens-themed (dark+light);
   build + eslint + check:readability green; live-verified on rankings123.com.
