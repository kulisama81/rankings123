"use client";

import Link from "next/link";

/**
 * Mobile-first homepage hero - shows the most urgent/relevant event
 * Priority: Live matches > Current tournament > Upcoming major event
 */
export default function MobileHomepageHero() {
  const now = new Date();

  // Cincinnati Open: Aug 11-23, 2026
  const cincinnatiStart = new Date("2026-08-11");
  const cincinnatiEnd = new Date("2026-08-23T23:59:59");
  const isCincinnatiLive = now >= cincinnatiStart && now <= cincinnatiEnd;

  // US Open: Aug 30 - Sep 13, 2026
  const usOpenStart = new Date("2026-08-30");
  const usOpenEnd = new Date("2026-09-13T23:59:59");
  const isUsOpenLive = now >= usOpenStart && now <= usOpenEnd;
  const isUsOpenUpcoming = now < usOpenStart && now >= new Date("2026-08-18"); // Show 12 days before

  // Determine hero content
  let heroContent;

  if (isCincinnatiLive) {
    heroContent = {
      isLive: true,
      title: "Cincinnati Open",
      subtitle: "ATP & WTA Masters 1000",
      dates: "Aug 11-23, 2026",
      cta: "Live Scores & Draws",
      href: "/articles/cincinnati-open-2026-betting-guide",
      accent: "border-design-accent-tennis"
    };
  } else if (isUsOpenLive) {
    heroContent = {
      isLive: true,
      title: "US Open",
      subtitle: "Grand Slam Championship",
      dates: "Aug 30 - Sep 13",
      cta: "Live Scores & Draws",
      href: "/articles/us-open-2026-betting-favorites",
      accent: "border-design-accent-tennis"
    };
  } else if (isUsOpenUpcoming) {
    heroContent = {
      isLive: false,
      title: "US Open 2026",
      subtitle: "Grand Slam · Flushing Meadows",
      dates: "Starts Aug 30",
      cta: "Preview & Predictions",
      href: "/articles/us-open-2026-betting-favorites",
      accent: "border-design-accent-tennis"
    };
  } else {
    // Fallback: ATP/WTA rankings
    heroContent = {
      isLive: false,
      title: "Live Tennis Rankings",
      subtitle: "ATP & WTA World Rankings",
      dates: "Updated Live",
      cta: "View Rankings",
      href: "/atp-live",
      accent: "border-design-accent-tennis"
    };
  }

  return (
    <div className="mb-6">
      <Link
        href={heroContent.href}
        className={`block rounded-2xl bg-surface2 p-6 border-l-4 ${heroContent.accent} transition-all hover:scale-[1.02] active:scale-[0.98]`}
      >
        {/* Live indicator */}
        {heroContent.isLive && (
          <div className="flex items-center gap-2 mb-3">
            <div className="relative">
              <div className="size-2.5 rounded-full bg-live" />
              <div className="absolute inset-0 size-2.5 rounded-full bg-live animate-ping opacity-75" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wide text-live">
              Live
            </span>
          </div>
        )}

        {/* Event title */}
        <h2 className="text-2xl font-bold text-fg mb-1">
          {heroContent.title}
        </h2>

        {/* Subtitle */}
        <p className="text-base text-muted mb-1">
          {heroContent.subtitle}
        </p>

        {/* Dates */}
        <p className="text-sm text-muted mb-4">
          {heroContent.dates}
        </p>

        {/* CTA */}
        <div className="inline-flex items-center gap-2 text-accent font-semibold">
          <span>{heroContent.cta}</span>
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
