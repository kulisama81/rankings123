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
# Embedded YouTube highlights (engagement)

Like live-tennis.eu, surface a curated, inline **embedded YouTube highlights player** on the live
ranking pages (official ATP / WTA highlights) — not a per-match summary (no free reliably-embeddable
per-match source exists), just one tasteful curated player to boost dwell time/engagement. Place it
below the table (or in a sidebar) so it never pushes the rankings down. Lazy-load (facade thumbnail →
iframe on click) to protect Core Web Vitals; use `youtube-nocookie.com` and gate the iframe behind
consent. The video source (channel/playlist/video id) lives in one easily-updatable config constant.

## Acceptance Criteria

1. A lazy-loaded curated YouTube highlights embed appears on **both** `/atp-live` and `/wta-live`,
   below the ranking table — the table stays the hero and is not pushed down on load.
2. Tour-appropriate source: ATP highlights on `/atp-live`, WTA highlights on `/wta-live`, set in a
   single config constant (channel/playlist/video id) that's trivial to update.
3. **The embed/source URL must be verified reachable: a `curl -sI` (or fetch) of the resolved
   YouTube URL returns HTTP 200** at build/verify time — no dead/placeholder links ship. Note the
   checked URL + status code in the verifier report.
4. Facade → iframe on click; uses `www.youtube-nocookie.com`; iframe/cookies gated behind consent
   (no third-party cookies before consent).
5. No LCP/CLS regression (facade is a static thumbnail, fixed aspect-ratio box — no layout shift).
6. A GA4 event fires on play (e.g. `video_play`) so engagement is measurable.
