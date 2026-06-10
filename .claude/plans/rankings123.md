# Rankings123 — Implementation Plan

Sports event rankings site supporting Olympics, Cycling (Grand Tours), and Rugby World Cup.

## Architecture

- **Next.js App Router** with dynamic routes
- **Mock data layer** in `/src/data` (no DB, static JSON-like exports)
- **API routes** at `/src/app/api/rankings/[eventId]`
- **Shared types** in `/src/types/index.ts` (already defined)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — list of events with top-3 summary cards |
| `/events/[eventId]` | Rankings table for a specific event |

## Components

| Component | Purpose |
|-----------|---------|
| `EventCard` | Card on landing page showing event + top entries |
| `OlympicsTable` | Medal table with expandable country rows |
| `CyclingTable` | GC standings table |
| `RugbyTable` | Group standings table |
| `MedalBadge` | Gold/silver/bronze icon pill |
| `FlagName` | Flag emoji + name inline component |

## Data

Three mock datasets:
- `paris-2024` — Paris 2024 Olympics (OlympicsRankings)
- `tdf-2024` — Tour de France 2024 (CyclingRankings)
- `rwc-2023` — Rugby World Cup 2023 (RugbyRankings)

## Tasks

1. Mock data layer (`/src/data`)
2. API route `/api/rankings/[eventId]`
3. Shared components (FlagName, MedalBadge, nav)
4. Landing page `/`
5. Event rankings page `/events/[eventId]`
6. Per-sport rankings tables

## ATP Live Ranking (live-tennis.eu competitor)

Flagship live-ranking feature at `/atp-live`, powered by **real live data**:

- **Feed**: `/src/lib/atpLiveFeed.ts` — fetches ESPN's public site API:
  official ATP rankings (top 100: rank, points, age, country) and the live
  tournament scoreboard (per-match rounds, statuses, winners). Players are
  matched across feeds by athlete GUID. Points earned this week are estimated
  from rounds reached using the ATP points table per tournament tier
  (250/500/Masters/Slam, inferred from tournament name). Live rank is the
  re-sort of official points + estimated weekly gains. Fetches use Next.js
  revalidation (rankings 30 min, scoreboard 60s).
- **Fallback**: `/src/data/atpLive.ts` — bundled demo snapshot (scripted
  results timeline) served with `source: "mock"` when the feed is unreachable;
  the UI shows a "Demo data" badge.
- **API**: `/api/atp/live` — dynamic route returning the current snapshot.
- **UI**: `AtpLiveTable` client component — polls every 20s with countdown,
  manual refresh, player/country search, country filter, "in play only" toggle,
  row pinning, live movement and points-delta indicators.
- Linked from the nav ("ATP Live") and a featured banner on the landing page.
- ESPN round labels are "Round 1"/"Round 2"/"Quarterfinal"/…; numbered rounds
  are anchored to the QF position so first-round byes don't skew the mapping.
