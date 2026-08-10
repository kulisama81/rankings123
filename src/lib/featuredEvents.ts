/**
 * Featured Events System
 * Dynamically determines which events are live, upcoming, or complete
 * based on real data from feeds and known tournament dates.
 * NO hardcoded "featured" events — driven by actual status.
 */

export type EventStatus = {
  id: string;
  name: string;
  sport: "tennis" | "worldcup" | "cycling" | "other";
  status: "live" | "upcoming" | "complete";
  priority: number; // Higher = more relevant (live > upcoming soon > upcoming far); complete always 0
  startDate?: Date;
  endDate?: Date;
  href: string;
  description: string;
  emoji: string;
};

/**
 * Get all events with their current status
 */
export function getAllEvents(): EventStatus[] {
  const now = new Date();

  const events: EventStatus[] = [
    // World Cup 2026 (ended July 19, 10PM UTC)
    {
      id: "worldcup-2026",
      name: "FIFA World Cup 2026",
      sport: "worldcup",
      status: now > new Date(Date.UTC(2026, 6, 19, 22, 0, 0)) ? "complete" : "live",
      priority: now > new Date(Date.UTC(2026, 6, 19, 22, 0, 0)) ? 0 : 100,
      endDate: new Date(Date.UTC(2026, 6, 19, 22, 0, 0)),
      href: "/world-cup",
      description: "Final results & tournament recap",
      emoji: "⚽",
    },

    // Tour de France 2026 (July 4-26, UTC)
    {
      id: "tdf-2026",
      name: "Tour de France 2026",
      sport: "cycling",
      status: now > new Date(Date.UTC(2026, 6, 26, 23, 59, 59)) ? "complete" : (now >= new Date(Date.UTC(2026, 6, 4, 0, 0, 0)) ? "live" : "upcoming"),
      priority: now > new Date(Date.UTC(2026, 6, 26, 23, 59, 59)) ? 0 : (now >= new Date(Date.UTC(2026, 6, 4, 0, 0, 0)) ? 100 : 50),
      startDate: new Date(Date.UTC(2026, 6, 4, 0, 0, 0)),
      endDate: new Date(Date.UTC(2026, 6, 26, 23, 59, 59)),
      href: "/cycling",
      description: "Final GC standings & stage results",
      emoji: "🚴",
    },

    // Cincinnati Open 2026 (Aug 11-23, UTC)
    {
      id: "cincinnati-2026",
      name: "Cincinnati Open 2026",
      sport: "tennis",
      status: now > new Date(Date.UTC(2026, 7, 23, 23, 59, 59)) ? "complete" : (now >= new Date(Date.UTC(2026, 7, 11, 0, 0, 0)) ? "live" : "upcoming"),
      priority: now > new Date(Date.UTC(2026, 7, 23, 23, 59, 59)) ? 0 : (now >= new Date(Date.UTC(2026, 7, 11, 0, 0, 0)) ? 100 : getDaysUntil(now, new Date(Date.UTC(2026, 7, 11, 0, 0, 0))) <= 14 ? 70 : 40),
      startDate: new Date(Date.UTC(2026, 7, 11, 0, 0, 0)),
      endDate: new Date(Date.UTC(2026, 7, 23, 23, 59, 59)),
      href: "/atp-live", // TODO: dedicated page when built
      description: "ATP/WTA Masters 1000 event",
      emoji: "🎾",
    },

    // US Open 2026 (Aug 25 - Sep 8, estimated, UTC)
    {
      id: "us-open-2026",
      name: "US Open 2026",
      sport: "tennis",
      status: now >= new Date(Date.UTC(2026, 7, 25, 0, 0, 0)) && now <= new Date(Date.UTC(2026, 8, 8, 23, 59, 59)) ? "live" : (now < new Date(Date.UTC(2026, 7, 25, 0, 0, 0)) ? "upcoming" : "complete"),
      priority: now >= new Date(Date.UTC(2026, 7, 25, 0, 0, 0)) && now <= new Date(Date.UTC(2026, 8, 8, 23, 59, 59)) ? 100 : (now < new Date(Date.UTC(2026, 7, 25, 0, 0, 0)) && getDaysUntil(now, new Date(Date.UTC(2026, 7, 25, 0, 0, 0))) <= 21 ? 80 : 0),
      startDate: new Date(Date.UTC(2026, 7, 25, 0, 0, 0)),
      endDate: new Date(Date.UTC(2026, 8, 8, 23, 59, 59)),
      href: "/atp-live", // TODO: dedicated page when built
      description: "Grand Slam championship",
      emoji: "🎾",
    },

    // ATP/WTA Live Rankings (always live)
    {
      id: "atp-live",
      name: "ATP Live Rankings",
      sport: "tennis",
      status: "live",
      priority: 60, // Always relevant but lower than specific tournaments
      href: "/atp-live",
      description: "Men's tennis rankings updated in real time",
      emoji: "🎾",
    },

    {
      id: "wta-live",
      name: "WTA Live Rankings",
      sport: "tennis",
      status: "live",
      priority: 60,
      href: "/wta-live",
      description: "Women's tennis rankings updated in real time",
      emoji: "🎾",
    },
  ];

  return events;
}

/**
 * Get the most relevant event to feature on the homepage
 */
export function getFeaturedEvent(): EventStatus | null {
  const events = getAllEvents();

  // Filter out complete events
  const activeEvents = events.filter(e => e.status !== "complete");

  if (activeEvents.length === 0) return null;

  // Sort by priority (descending)
  const sorted = activeEvents.sort((a, b) => b.priority - a.priority);

  return sorted[0];
}

/**
 * Get all currently live events (not complete, not far-future upcoming)
 */
export function getCurrentEvents(): EventStatus[] {
  const events = getAllEvents();

  return events
    .filter(e => e.status === "live" || (e.status === "upcoming" && e.priority > 50))
    .sort((a, b) => b.priority - a.priority);
}

/**
 * Helper: days until a future date
 */
function getDaysUntil(from: Date, to: Date): number {
  return Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
}
