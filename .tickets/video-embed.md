---
id: video-embed
status: open
deps: []
links: []
created: 2026-06-15T05:13:46Z
type: feature
priority: 2
parent: rankings123
tags: [ui, engagement]
---
# Embedded YouTube / live video (engagement)

Like live-tennis.eu, surface relevant tennis video — ideally an inline embedded YouTube player (e.g. official ATP/WTA highlights or a live stream where embeddable) rather than just a link, to boost dwell time/engagement. Place it tastefully (sidebar or below the table) so it doesn't push the rankings down. Lazy-load (facade thumbnail -> iframe on click) to protect Core Web Vitals; gate any cookies behind consent. Make the video source configurable/curatable.

## Acceptance Criteria

An embedded (lazy-loaded) tennis video appears on the live ranking page(s) without hurting LCP/CLS; consent-gated; source easily updatable; measurably testable for engagement (event in analytics).
