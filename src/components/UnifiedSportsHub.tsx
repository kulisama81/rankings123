"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SportLink {
  href: string;
  label: string;
  sub: string;
  sport: string;
  state: "live" | "upcoming" | "off-season";
  liveCount?: number;
  upcomingInfo?: string;
  showRankPeek?: boolean;
}

interface LiveStatus {
  worldCupMatches: number;
  tennisMatches: number;
  tdfStage: number | null;
  cyclingActive: boolean;
  upcomingEvents: {
    usOpen: boolean;
    wimbledon: boolean;
    cycling: boolean;
  };
}

type FilterType = "all" | "live" | "tennis" | "football" | "cycling";

export default function UnifiedSportsHub() {
  const [liveStatus, setLiveStatus] = useState<LiveStatus>({
    worldCupMatches: 0,
    tennisMatches: 0,
    tdfStage: null,
    cyclingActive: false,
    upcomingEvents: {
      usOpen: false,
      wimbledon: false,
      cycling: false,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchLiveStatus() {
      try {
        const [wcData, atpData, wtaData] = await Promise.all([
          fetch("/api/worldcup/live").then((r) => r.json()).catch(() => null),
          fetch("/api/atp-live").then((r) => r.json()).catch(() => null),
          fetch("/api/wta-live").then((r) => r.json()).catch(() => null),
        ]);

        let wcLiveCount = 0;
        if (wcData?.matches) {
          wcLiveCount = wcData.matches.filter((m: { state: string }) => m.state === "in").length;
        }

        let tennisLive = 0;
        if (atpData?.players) {
          tennisLive += atpData.players.filter((p: { tournament?: { active?: boolean } }) =>
            p.tournament?.active === true
          ).length;
        }
        if (wtaData?.players) {
          tennisLive += wtaData.players.filter((p: { tournament?: { active?: boolean } }) =>
            p.tournament?.active === true
          ).length;
        }

        // Check TdF (July 4-26, 2026)
        const now = new Date();
        const tdfStart = new Date(2026, 6, 4);
        const tdfEnd = new Date(2026, 6, 26);
        let tdfStage: number | null = null;
        if (now >= tdfStart && now <= tdfEnd) {
          const daysSinceStart = Math.floor((now.getTime() - tdfStart.getTime()) / (1000 * 60 * 60 * 24));
          tdfStage = Math.min(daysSinceStart + 1, 21);
        }

        // Check cycling (any active race)
        let cyclingActive = false;
        try {
          const { getCyclingRaces, getPrimaryRace } = await import("@/lib/cyclingFeed");
          const races = await getCyclingRaces();
          const primary = getPrimaryRace(races);
          cyclingActive = !!primary;
        } catch {
          // Fall back to off-season
        }

        // Check upcoming events (within 7 days)
        const daysAhead = (targetDate: Date) => {
          const diff = targetDate.getTime() - now.getTime();
          return Math.floor(diff / (1000 * 60 * 60 * 24));
        };

        const usOpenStart = new Date(2026, 7, 24); // Aug 24, 2026
        const wimbledonStart = new Date(2027, 5, 28); // June 28, 2027

        const upcomingEvents = {
          usOpen: daysAhead(usOpenStart) >= 0 && daysAhead(usOpenStart) <= 7,
          wimbledon: daysAhead(wimbledonStart) >= 0 && daysAhead(wimbledonStart) <= 7,
          cycling: false, // Cycling handled by cyclingActive
        };

        setLiveStatus({
          worldCupMatches: wcLiveCount,
          tennisMatches: tennisLive,
          tdfStage,
          cyclingActive,
          upcomingEvents,
        });
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }

    fetchLiveStatus();
    const interval = setInterval(fetchLiveStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Build sport links with dynamic state (3-tier: LIVE, UPCOMING, OFF-SEASON)
  const sportLinks: SportLink[] = [
    {
      href: "/atp-live",
      label: "ATP Live",
      sub: "Men's live rankings",
      sport: "atp",
      state: liveStatus.tennisMatches > 0
        ? "live"
        : liveStatus.upcomingEvents.usOpen
        ? "upcoming"
        : "off-season",
      liveCount: liveStatus.tennisMatches,
      upcomingInfo: liveStatus.upcomingEvents.usOpen ? "US Open starts soon" : undefined,
      showRankPeek: true,
    },
    {
      href: "/wta-live",
      label: "WTA Live",
      sub: "Women's live rankings",
      sport: "wta",
      state: liveStatus.tennisMatches > 0
        ? "live"
        : liveStatus.upcomingEvents.usOpen
        ? "upcoming"
        : "off-season",
      liveCount: liveStatus.tennisMatches,
      upcomingInfo: liveStatus.upcomingEvents.usOpen ? "US Open starts soon" : undefined,
      showRankPeek: true,
    },
    {
      href: "/world-cup",
      label: "FIFA 2026",
      sub: "World Cup standings",
      sport: "worldcup",
      state: liveStatus.worldCupMatches > 0 ? "live" : "off-season",
      liveCount: liveStatus.worldCupMatches,
    },
    {
      href: "/cycling",
      label: "Cycling",
      sub: "Grand Tour coverage",
      sport: "cycling",
      state: liveStatus.cyclingActive ? "live" : "off-season",
    },
    {
      href: "/wta-rankings",
      label: "WTA Rankings",
      sub: "Full women's rankings",
      sport: "wta",
      state: "off-season",
    },
    {
      href: "/world-cup/final-2026-predictions",
      label: "Final Predictions",
      sub: "Expert analysis",
      sport: "worldcup",
      state: "off-season",
    },
  ];

  // Filter links by state or sport type
  const filteredLinks = sportLinks.filter((link) => {
    if (filter === "live") return link.state === "live";
    if (filter === "tennis") return link.sport === "atp" || link.sport === "wta";
    if (filter === "football") return link.sport === "worldcup";
    if (filter === "cycling") return link.sport === "cycling";
    return true;
  });

  // Sort: LIVE first, UPCOMING mid, OFF-SEASON last
  const sortedLinks = [...filteredLinks].sort((a, b) => {
    const stateOrder = { live: 0, upcoming: 1, "off-season": 2 };
    return stateOrder[a.state] - stateOrder[b.state];
  });

  // Progressive disclosure: show 6 initially
  const visibleLinks = showAll ? sortedLinks : sortedLinks.slice(0, 6);
  const hiddenCount = sortedLinks.length - 6;

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="mb-6 animate-pulse">
          <div className="h-4 w-32 rounded bg-muted/30" />
          <div className="mt-3 flex gap-2">
            <div className="h-8 w-16 rounded-full bg-muted/30" />
            <div className="h-8 w-20 rounded-full bg-muted/30" />
            <div className="h-8 w-24 rounded-full bg-muted/30" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-32 rounded-2xl bg-muted/20 sm:col-span-2" />
          <div className="h-28 rounded-2xl bg-muted/20" />
          <div className="h-28 rounded-2xl bg-muted/20" />
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      {/* Section header + filters */}
      <div className="mb-6">
        <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
          Sports Hub
        </h2>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              filter === "all"
                ? "bg-accent text-bg shadow-[0_0_12px_rgba(var(--accent-rgb),0.3)]"
                : "bg-surface2 text-muted hover:bg-surface hover:text-fg"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("live")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              filter === "live"
                ? "bg-accent text-bg shadow-[0_0_12px_rgba(var(--accent-rgb),0.3)]"
                : "bg-surface2 text-muted hover:bg-surface hover:text-fg"
            }`}
          >
            Live Only
          </button>
          <button
            onClick={() => setFilter("tennis")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              filter === "tennis"
                ? "bg-accent text-bg shadow-[0_0_12px_rgba(var(--accent-rgb),0.3)]"
                : "bg-surface2 text-muted hover:bg-surface hover:text-fg"
            }`}
          >
            Tennis
          </button>
          <button
            onClick={() => setFilter("football")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              filter === "football"
                ? "bg-accent text-bg shadow-[0_0_12px_rgba(var(--accent-rgb),0.3)]"
                : "bg-surface2 text-muted hover:bg-surface hover:text-fg"
            }`}
          >
            Football
          </button>
          <button
            onClick={() => setFilter("cycling")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              filter === "cycling"
                ? "bg-accent text-bg shadow-[0_0_12px_rgba(var(--accent-rgb),0.3)]"
                : "bg-surface2 text-muted hover:bg-surface hover:text-fg"
            }`}
          >
            Cycling
          </button>
        </div>
      </div>

      {/* Cards grid with 3-tier sizing */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visibleLinks.map((link) => (
          <SportCard key={link.href} link={link} />
        ))}
      </div>

      {/* Progressive disclosure button */}
      {!showAll && hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-6 w-full rounded-2xl border border-edge bg-surface px-6 py-4 font-semibold text-fg transition-all duration-200 hover:border-accent/40 hover:bg-surface2"
        >
          + View all sports ({hiddenCount} more)
        </button>
      )}
    </section>
  );
}

function SportCard({ link }: { link: SportLink }) {
  // LIVE cards: 2-column span, large, glowing
  // UPCOMING: standard size
  // OFF-SEASON: compact
  const isLive = link.state === "live";
  const isUpcoming = link.state === "upcoming";

  const cardClasses = isLive
    ? "group relative overflow-hidden rounded-2xl border border-accent/40 bg-surface p-6 transition-all duration-300 hover:border-accent/60 hover:bg-surface2 hover:scale-[1.01] sm:col-span-2 lg:col-span-2"
    : isUpcoming
    ? "group relative overflow-hidden rounded-2xl border border-accent/20 bg-surface p-5 transition-all duration-300 hover:border-accent/40 hover:bg-surface2"
    : "group relative overflow-hidden rounded-xl border border-edge bg-surface p-4 transition-all duration-300 hover:border-accent/30 hover:bg-surface2";

  const glowStyle = isLive
    ? {
        boxShadow: `0 0 0 1px rgba(var(--accent-rgb), 0.1), 0 8px 24px rgba(var(--accent-rgb), 0.12)`,
      }
    : {};

  return (
    <Link
      href={link.href}
      data-sport={link.sport}
      className={cardClasses}
      style={glowStyle}
    >
      {/* Pulsing glow background (LIVE only) */}
      {isLive && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] motion-reduce:opacity-0"
          style={{
            background: `radial-gradient(600px circle at 50% 50%, rgba(var(--accent-rgb), 0.15), transparent 50%)`,
            animation: "pulse-glow 3s ease-in-out infinite",
          }}
        />
      )}

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2.5">
              {/* Pulsing dot (LIVE/UPCOMING) */}
              {(isLive || isUpcoming) && (
                <span className="relative flex h-2.5 w-2.5">
                  {isLive && (
                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                  )}
                  <span
                    className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]"
                    style={{ opacity: isUpcoming ? 0.6 : 1 }}
                  />
                </span>
              )}
              <span
                className={`font-bold text-fg ${
                  isLive ? "text-xl sm:text-2xl" : isUpcoming ? "text-lg" : "text-base"
                }`}
              >
                {link.label}
              </span>
            </div>

            <p
              className={`mt-1.5 text-muted ${
                isLive ? "text-sm sm:text-base" : isUpcoming ? "text-xs" : "text-xs"
              }`}
            >
              {link.sub}
            </p>

            {/* Live match count badge */}
            {isLive && link.liveCount !== undefined && link.liveCount > 0 && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-mono font-bold text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                </span>
                {link.liveCount} {link.liveCount === 1 ? "match" : "matches"} live
              </div>
            )}

            {/* Upcoming info badge */}
            {isUpcoming && link.upcomingInfo && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/5 px-3 py-1 text-xs font-mono font-semibold text-accent/80">
                {link.upcomingInfo}
              </div>
            )}
          </div>

          <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
