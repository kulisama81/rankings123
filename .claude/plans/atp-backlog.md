# Live Tennis Rankings — Build Backlog (agentic loop)

Goal: rival and surpass live-tennis.eu/atp-live-ranking in **quality** and **ad revenue**.

## Loop contract (per iteration)
1. Pick the top unchecked item that is **not blocked**.
2. Build it.
3. **Verify for real**: `npm run build` (green) + `npx eslint src` (clean) + run/curl the actual result. No "I think it works."
4. Commit with a clear message.
5. Check the item off here. Continue.

Pause only at external dependencies (marked 🔑): they need the user.

## Priority order (Balanced: deploy → traffic → ads → depth)

- [ ] 🔑 **Deploy to Vercel** — live URL, indexable, ad-ready. Blocked on `vercel login`.
- [x] **WTA live ranking** — generalize the feed to `tour: atp|wta`, route `/wta-live`, tour switcher. (ESPN WTA verified: 150 players, Sabalenka #1.)
- [ ] **SEO foundation** — per-page metadata, OpenGraph, `sitemap.ts`, `robots.ts`, canonical URLs, JSON-LD.
- [ ] **Player profile pages** `/[tour]/player/[id]` — bio, current + live rank, this-week status. The long-tail SEO engine. Server-rendered, statically generated where possible.
- [ ] **Ad inventory** — ad slot components in layout (top leaderboard, in-table, sidebar), AdSense integration (🔑 needs publisher ID), lazy/viewability-friendly.
- [ ] 🔑 **GDPR consent banner** — CMP for EU audience (required before ads serve in EU).
- [ ] **Race rankings** (ATP + WTA Race / YTD) — second-most-used view on the competitor.
- [ ] **Points to defend / dropping** — needs a 52-week results source; compute real defending points. Hardest data item.
- [ ] **Data accuracy** — replace tier-estimate live points with exact draw points where available.
- [ ] **Doubles rankings.**
- [ ] **Polish** — Core Web Vitals (LCP/CLS), dark mode, mobile table UX, "last updated" freshness, error states.

## Notes
- Data source: ESPN public site API (`/sports/tennis/{atp|wta}/rankings` and `/scoreboard`). No key, but unofficial — keep the mock fallback.
- Ad revenue reality: code enables it; actual revenue = traffic (SEO flywheel, weeks) × RPM. Deploy + player pages + WTA are the traffic levers.
