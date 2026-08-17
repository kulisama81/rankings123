"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface LiveEvent {
  id: string;
  name: string;
  detail: string;
  href: string;
  emoji: string;
}

/**
 * Live Now Widget
 * Consolidated hero widget showing ALL currently live events across sports
 * Auto-hides when nothing is live. Shows specific details (match counts, stages).
 * Mobile-first: large touch target, high contrast.
 */
export default function LiveNowWidget() {
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveStatus() {
      try {
        const events: LiveEvent[] = [];

        // 1. Tennis: Check for live matches via ATP/WTA scoreboards
        try {
          const [atpData, wtaData] = await Promise.all([
            fetch("/api/atp-live").then((r) => r.json()).catch(() => null),
            fetch("/api/wta-live").then((r) => r.json()).catch(() => null),
          ]);

          let atpLive = 0;
          let wtaLive = 0;

          if (atpData?.players) {
            atpLive = atpData.players.filter((p: { tournament?: { active?: boolean } }) =>
              p.tournament?.active === true
            ).length;
          }

          if (wtaData?.players) {
            wtaLive = wtaData.players.filter((p: { tournament?: { active?: boolean } }) =>
              p.tournament?.active === true
            ).length;
          }

          // Cincinnati Open (Aug 11-23, 2026) - check if active
          const now = new Date();
          const cincyStart = new Date(Date.UTC(2026, 7, 11, 0, 0, 0));
          const cincyEnd = new Date(Date.UTC(2026, 7, 23, 23, 59, 59));
          const isCincyLive = now >= cincyStart && now <= cincyEnd;

          if (isCincyLive && (atpLive > 0 || wtaLive > 0)) {
            const totalMatches = atpLive + wtaLive;
            events.push({
              id: "cincinnati-2026",
              name: "Cincinnati Open",
              detail: `${totalMatches} ${totalMatches === 1 ? "match" : "matches"} in progress`,
              href: "/atp-live",
              emoji: "🎾",
            });
          } else if (atpLive > 0 || wtaLive > 0) {
            // Generic tennis tournaments
            if (atpLive > 0) {
              events.push({
                id: "atp-live",
                name: "ATP Tennis",
                detail: `${atpLive} ${atpLive === 1 ? "match" : "matches"} in progress`,
                href: "/atp-live",
                emoji: "🎾",
              });
            }
            if (wtaLive > 0) {
              events.push({
                id: "wta-live",
                name: "WTA Tennis",
                detail: `${wtaLive} ${wtaLive === 1 ? "match" : "matches"} in progress`,
                href: "/wta-live",
                emoji: "🎾",
              });
            }
          }
        } catch {
          // Tennis data fetch failed, skip
        }

        // 2. World Cup: Check for live matches
        try {
          const wcData = await fetch("/api/worldcup/live").then((r) => r.json()).catch(() => null);
          if (wcData?.matches) {
            const liveMatches = wcData.matches.filter((m: { state: string }) => m.state === "in");
            if (liveMatches.length > 0) {
              events.push({
                id: "worldcup-2026",
                name: "FIFA World Cup 2026",
                detail: `${liveMatches.length} ${liveMatches.length === 1 ? "match" : "matches"} live`,
                href: "/world-cup",
                emoji: "⚽",
              });
            }
          }
        } catch {
          // World Cup fetch failed, skip
        }

        // 3. Cycling: Check if race is active
        try {
          const response = await fetch("/api/cycling/races");
          if (response.ok) {
            const data = await response.json();
            const primary = data.primary;

            if (primary && primary.raceStatus === "active") {
              const stageName = primary.currentStage
                ? `Stage ${primary.currentStage}`
                : "Race in progress";
              events.push({
                id: primary.metadata.id,
                name: primary.metadata.name,
                detail: stageName,
                href: "/cycling",
                emoji: "🚴",
              });
            }
          }
        } catch {
          // Fail silently - graceful degradation (CX-first: no console errors)
        }

        setLiveEvents(events);
        setIsLoading(false);
      } catch {
        setLiveEvents([]);
        setIsLoading(false);
      }
    }

    fetchLiveStatus();
    // Poll every 60 seconds for live status updates
    const interval = setInterval(fetchLiveStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-hide if no live events
  if (!isLoading && liveEvents.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="animate-pulse rounded-2xl border border-edge bg-surface p-6">
          <div className="h-6 w-32 rounded bg-muted/30" />
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/5 to-accent/10 shadow-[0_0_24px_rgba(var(--accent-rgb),0.12)]">
        {/* Header */}
        <div className="border-b border-accent/20 bg-accent/5 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]" />
            </span>
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-accent">
              Live Now
            </h2>
          </div>
        </div>

        {/* Live events list */}
        <div className="divide-y divide-accent/10 bg-surface">
          {liveEvents.map((event) => (
            <Link
              key={event.id}
              href={event.href}
              className="group block px-4 py-4 transition-colors hover:bg-accent/5 sm:px-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="text-2xl leading-none">{event.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-bold text-fg">{event.name}</div>
                    <div className="truncate text-sm text-muted">{event.detail}</div>
                  </div>
                </div>
                <span className="shrink-0 text-xl text-accent transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
