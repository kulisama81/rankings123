---
id: data-persistence
status: open
deps: []
links: []
created: 2026-06-21T07:52:52Z
type: feature
priority: 2
parent: rankings123
tags: [infra, data, resilience]
---
# Persist last-known-good data (cache/archive) — survive API outages, never lose data

Today every feed (liveFeed, atpDeepFeed, worldCupFeed, worldCupBracketFeed, wtaDeep, stats) fetches upstream at request time and, on failure, falls back to a STATIC hand-coded mock bundled in the repo. So if ESPN/UTS/WTA/etc. go offline we (a) can lose access to recent real data and (b) serve an ancient mock instead of the last real data we had. We want to PERSIST the latest good data so it's never lost and the site degrades to last-known-good (LKG), not stale mock.

Recommended primary approach (zero new infra, fits our local-cron + git setup): a scheduled SNAPSHOT-ARCHIVE job that fetches all feeds and writes timestamped JSON snapshots into the repo (e.g. src/data/snapshots/<sport>/<date>.json + a 'latest' pointer) and commits them -> durable in git history (never lost) + auto-refreshes the fallback so it's always RECENT real data, not a frozen hand-coded mock. Bonus: this archive is the substrate for historical features (see rank-history).

Optional robustness upgrade: a runtime last-known-good cache in a durable store (Vercel KV/Blob via the Marketplace) written on every successful fetch and read on upstream failure for per-request freshness during outages — NOTE this needs storage provisioning + env keys (human handoff).

DATA-VERACITY: cached/LKG data must be clearly flagged (a distinct source value like 'cache'/'lkg' + an 'as of <timestamp>') so it is never presented as live. Never fabricate.

## Acceptance Criteria

1) Each feed persists its latest SUCCESSFUL snapshot durably (snapshot-archive committed to the repo via a scheduled job, and/or a durable KV/Blob store). 2) On simulated upstream failure, the feed serves the most recent persisted real snapshot (clearly flagged source='cache'/'lkg' + 'as of' timestamp in the UI) instead of the ancient bundled mock; the static mock remains only as the last-resort if no snapshot exists. 3) Snapshots are timestamped + retained (history-friendly). 4) Documented in README; data-sanity/inspector aware of the cache flag. 5) REGRESSION TEST (node --test) for the LKG selection logic (fresh upstream -> live; upstream fails + snapshot exists -> snapshot; neither -> mock). build/lint/readability green; live-verified.
