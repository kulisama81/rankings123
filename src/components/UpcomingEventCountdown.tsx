"use client";

import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

interface UpcomingEvent {
  name: string;
  detail: string;
  targetDate: string;
  sport: "atp" | "wta" | "worldcup" | "cycling";
}

/**
 * Shows countdown timer for upcoming major events.
 * Hides once event goes live (LiveNowHero takes over).
 * Updates every minute to check event status.
 */
function getUpcomingEvent(): UpcomingEvent | null {
  const now = new Date();

  // Show countdown if event is within 7 days but hasn't started
  const SHOW_WINDOW = 7 * 24 * 60 * 60 * 1000; // 7 days

  // Tour de France final stage: July 26, 2026 at 2:00 PM CET (12:00 UTC)
  const tdfFinal = new Date("2026-07-26T12:00:00Z");
  const timeUntilTdf = tdfFinal.getTime() - now.getTime();
  if (timeUntilTdf > 0 && timeUntilTdf <= SHOW_WINDOW) {
    return {
      name: "Tour de France Final Stage",
      detail: "Stage 21: Champs-Élysées • 2:00 PM CET",
      targetDate: tdfFinal.toISOString(),
      sport: "cycling",
    };
  }

  // US Open 2026 (example - late August start)
  const usOpen = new Date("2026-08-31T16:00:00Z"); // 12 PM ET
  const timeUntilUsOpen = usOpen.getTime() - now.getTime();
  if (timeUntilUsOpen > 0 && timeUntilUsOpen <= SHOW_WINDOW) {
    return {
      name: "US Open 2026",
      detail: "Final Grand Slam of the year • 12:00 PM ET",
      targetDate: usOpen.toISOString(),
      sport: "atp",
    };
  }

  return null;
}

export default function UpcomingEventCountdown() {
  const [upcomingEvent, setUpcomingEvent] = useState<UpcomingEvent | null>(() => getUpcomingEvent());

  useEffect(() => {
    // Update every minute to check event status
    const interval = setInterval(() => {
      setUpcomingEvent(getUpcomingEvent());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!upcomingEvent) {
    return null;
  }

  return (
    <CountdownTimer
      targetDate={upcomingEvent.targetDate}
      eventName={upcomingEvent.name}
      eventDetail={upcomingEvent.detail}
      sport={upcomingEvent.sport}
    />
  );
}
