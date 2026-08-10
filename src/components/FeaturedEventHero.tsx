"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getFeaturedEvent, type EventStatus } from "@/lib/featuredEvents";

/**
 * Featured Event Hero
 * Dynamically promotes the most relevant current/upcoming event.
 * Auto-hides when events are complete. No hardcoded events.
 * Polls every 5 minutes to auto-update as events start/end.
 */
export default function FeaturedEventHero() {
  const [featured, setFeatured] = useState<EventStatus | null>(() => getFeaturedEvent());

  useEffect(() => {
    // Poll every 5 minutes to auto-update when events start/end
    const interval = setInterval(() => {
      setFeatured(getFeaturedEvent());
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Don't show if no relevant event
  if (!featured) return null;

  // Don't feature complete events
  if (featured.status === "complete") return null;

  const isLive = featured.status === "live";

  return (
    <section className="mb-12">
      <Link
        href={featured.href}
        className="group block overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-6 transition hover:border-accent hover:bg-accent/15 sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            {isLive && (
              <div className="mb-2 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
                    style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
                  />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-wide text-accent">
                  Live Now
                </span>
              </div>
            )}
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">{featured.emoji}</span>
              <h2 className="font-display text-xl font-bold text-fg sm:text-2xl">
                {featured.name}
              </h2>
            </div>
            <p className="text-sm text-secondary sm:text-base">{featured.description}</p>
            {featured.startDate && featured.status === "upcoming" && (
              <p className="mt-2 text-xs text-muted">
                Starts {featured.startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            )}
          </div>
          <div className="shrink-0">
            <span className="btn-base btn-primary whitespace-nowrap rounded-lg px-6 py-3 font-semibold">
              {isLive ? "Watch Live" : "View Details"} →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
