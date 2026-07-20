"use client";

import Link from "next/link";
import { useState } from "react";
import SportIcon from "./SportIcon";

interface LiveSport {
  sport: "atp" | "wta" | "cycling";
  label: string;
  subtitle: string;
  href: string;
  icon: "tennis" | "cycling";
  stat?: string;
}

interface PostEventDiscoveryProps {
  /** Sport they just finished watching (for transition gradient) */
  fromSport: "worldcup" | "atp" | "wta" | "cycling";
}

// Helper: determine what's actually live NOW
function getActiveSports(): LiveSport[] {
  const now = new Date();
  const active: LiveSport[] = [];

  // Tour de France (July 4-26, 2026) - UTC dates to avoid timezone bugs
  const tdfStart = new Date(Date.UTC(2026, 6, 4, 0, 0, 0)); // July 4, midnight UTC
  const tdfEnd = new Date(Date.UTC(2026, 6, 26, 23, 59, 59)); // July 26, end of day UTC
  const isTdfActive = now >= tdfStart && now <= tdfEnd;

  if (isTdfActive) {
    active.push({
      sport: "cycling",
      label: "Tour de France",
      subtitle: "Final week • GC battle heating up",
      href: "/cycling",
      icon: "cycling",
      stat: "Stage 18 today",
    });
  }

  // US Open Series (late July - early September) - UTC dates
  const usOpenSeriesStart = new Date(Date.UTC(2026, 6, 20, 0, 0, 0)); // July 20, midnight UTC
  const usOpenSeriesEnd = new Date(Date.UTC(2026, 8, 14, 23, 59, 59)); // Sep 14, end of day UTC
  if (now >= usOpenSeriesStart && now <= usOpenSeriesEnd) {
    active.push({
      sport: "atp",
      label: "ATP Live",
      subtitle: "US Open Series • Summer hardcourt season",
      href: "/atp-live",
      icon: "tennis",
      stat: "500+ players",
    });
    active.push({
      sport: "wta",
      label: "WTA Live",
      subtitle: "Road to US Open • Live rankings",
      href: "/wta-live",
      icon: "tennis",
      stat: "Live updates",
    });
  }

  // UCI World Rankings - always available when TdF is not active (provides year-round cycling content)
  if (!isTdfActive) {
    active.push({
      sport: "cycling",
      label: "UCI World Rankings",
      subtitle: "Top professional cyclists across all disciplines",
      href: "/cycling/uci-ranking",
      icon: "cycling",
    });
  }

  // Default fallback: always show tennis (year-round) if nothing else is active
  if (active.length === 0) {
    active.push(
      {
        sport: "atp",
        label: "ATP Live",
        subtitle: "Men&apos;s live rankings",
        href: "/atp-live",
        icon: "tennis",
        stat: "500+ players",
      },
      {
        sport: "wta",
        label: "WTA Live",
        subtitle: "Women&apos;s live rankings",
        href: "/wta-live",
        icon: "tennis",
        stat: "Live updates",
      }
    );
  }

  return active;
}

export default function PostEventDiscovery({ fromSport }: PostEventDiscoveryProps) {
  const [liveSports] = useState<LiveSport[]>(getActiveSports);

  // Note: liveSports.length can never be 0 due to fallback in getActiveSports(),
  // but we keep this defensive check for safety in case the logic changes
  if (liveSports.length === 0) return null;

  const trackClick = (sport: string, href: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "post_event_discovery_click", {
        event_category: "retention",
        event_label: `${fromSport}_to_${sport}`,
        target_url: href,
      });
    }
  };

  return (
    <section className="my-16 overflow-hidden rounded-3xl border border-edge bg-surface p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display text-2xl font-extrabold text-fg sm:text-3xl">
          What&apos;s Next
          <span className="ml-2 inline-block h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">
          The action never stops.{" "}
          <span className="font-semibold text-fg">
            Followed 32 teams? Track 500+ players across tennis & cycling.
          </span>
        </p>
      </div>

      {/* Live sport cards - mobile: horizontal scroll, desktop: grid */}
      <div className="scrollbar-hide -mx-2 flex gap-4 overflow-x-auto px-2 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {liveSports.map((sport, index) => (
          <Link
            key={sport.href}
            href={sport.href}
            data-sport={sport.sport}
            onClick={() => trackClick(sport.sport, sport.href)}
            className={`group relative min-w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-accent/40 bg-surface2 p-5 transition-all duration-300 hover:border-accent/70 hover:scale-[1.03] sm:min-w-0 animate-entrance-card-${index + 1}`}
            style={{
              boxShadow: `0 0 0 1px rgba(var(--accent-rgb), 0.08), 0 4px 16px rgba(var(--accent-rgb), 0.1)`,
            }}
          >
            {/* Subtle pulse gradient */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04] motion-reduce:opacity-0"
              style={{
                background: `radial-gradient(600px circle at 50% 50%, rgba(var(--accent-rgb), 0.2), transparent 60%)`,
                animation: "pulse-glow 3s ease-in-out infinite",
              }}
            />

            {/* Accent glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                boxShadow: `inset 0 0 0 1px rgba(var(--accent-rgb), 0.3), 0 8px 32px rgba(var(--accent-rgb), 0.2)`,
              }}
            />

            <div className="relative">
              {/* Icon + Live Badge */}
              <div className="mb-4 flex items-center justify-between">
                <div className="text-accent">
                  <SportIcon type={sport.icon} size={40} />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_6px_rgba(var(--accent-rgb),0.6)]" />
                  </span>
                  Live
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="mb-1.5 font-display text-xl font-bold text-fg">{sport.label}</h3>
                <p className="mb-3 text-sm text-muted">{sport.subtitle}</p>

                {sport.stat && (
                  <div className="inline-flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-mono font-bold text-accent">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    </span>
                    {sport.stat}
                  </div>
                )}
              </div>

              {/* Arrow */}
              <div className="absolute bottom-0 right-0 text-2xl text-accent transition-transform duration-200 group-hover:translate-x-1">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom hook - gamification tease */}
      <div className="mt-6 rounded-xl border border-edge/50 bg-surface2/50 p-4 text-center">
        <p className="text-xs text-muted">
          <span className="font-semibold text-fg">Your journey continues.</span>{" "}
          Rankings update live, every 20 seconds. New champions rise daily.
        </p>
      </div>
    </section>
  );
}
