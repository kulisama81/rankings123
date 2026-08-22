---
id: realtime-data-indicators
status: closed
deps: []
links: []
created: 2026-08-02T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, live-data, ux, trust]
---
# Real-time data update indicators

**Site audit finding:** Rankings123 lacks visible real-time update indicators. Users can't tell if data is live or stale, undermining the "live rankings" positioning. Premium sports sites (SofaScore, FlashScore, ESPN) show "Updated 2m ago" timestamps and pulse animations during active updates.

**Trust signal:** Visible freshness indicators build confidence that data is current, not cached.

## Acceptance Criteria

- Every ranking table shows "Updated X ago" timestamp in header (updates every 60s)
- When data refreshes, changed rows briefly glow with accent color (respects prefers-reduced-motion)
- Data source badge visible in table header or hero: "Source: ESPN Live" with 6px live dot
- Loading skeleton appears during fetch, preserves table structure (no layout shift)
- Settings panel allows disabling auto-refresh (localStorage persisted)
- Mobile: timestamp condensed to "2m" format, fits in header without wrapping
- Accessibility: screen reader announces "Rankings updated" on refresh

## Changes

- Add "Last updated" timestamp to each ranking table header (relative: "2m ago", "just now")
- Pulse animation on rows when rank changes in real-time (brief accent glow, 600ms fade)
- Data source badge: "ESPN Live" / "Official WTA" / "UTS Rankings" with small live dot
- Loading skeleton for table sections during refresh (partial updates, not full-page reload)
- "Updating..." subtle badge during active fetch (top-right of table, non-blocking)
- Auto-refresh interval indicator: "Auto-updates every 5 minutes" (settings toggle)

## References

- Live site audit: "No real-time update indicators, predictive filtering, or contextual personalization"
- SofaScore pattern: visible "Updated X ago" + pulse on score changes
- ESPN live data: source attribution builds trust
