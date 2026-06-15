---
id: ads-txt
status: open
deps: []
links: []
created: 2026-06-15T05:51:32Z
type: feature
priority: 2
parent: rankings123
tags: [ads, revenue]
---
# ads.txt for ad networks

Serve /ads.txt (public/ads.txt or app route) declaring authorized sellers (Google AdSense line once we have the publisher id; add Ezoic/others later). Required for programmatic demand + AdSense verification.

## Acceptance Criteria

/ads.txt served with the correct google.com pub-id line; updatable as networks are added.
