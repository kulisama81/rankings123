---
id: youtube-api
status: open
deps: []
links: []
created: 2026-06-21T07:30:30Z
type: feature
priority: 3
parent: rankings123
tags: [ui, engagement, handoff]
---
# YouTube Data API: embed actual last-match highlight per player

Upgrade per-player highlights (video-embed) from a YouTube SEARCH deep-link to a real inline EMBED of the top highlight video for the player's last match. Needs a YouTube Data API key (handoff): resolve the per-player query -> top video id -> lazy youtube-nocookie embed, consent-gated. Gate on the key being present (like odds-api): no key -> keep the honest search-link fallback. Never embed an unverified/guessed video.

## Acceptance Criteria

With a YOUTUBE_API_KEY set: per-player highlights resolves the search to the top video and embeds it inline (lazy, youtube-nocookie, consent-gated); verify the video id resolves (API 200) before embedding; no key -> graceful search-link fallback (no fabricated ids). build/lint/readability green; regression test for the resolver.
