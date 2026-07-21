"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  /** ISO 8601 datetime string of when the event starts */
  targetDate: string;
  /** Event name shown before the countdown (e.g., "World Cup Final") */
  eventName: string;
  /** Optional supporting detail shown below countdown (e.g., "Spain vs Argentina • 3:00 PM ET") */
  eventDetail?: string;
  /** Sport for accent color theming */
  sport?: "atp" | "wta" | "worldcup" | "cycling";
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  total: number;
}

function calculateTimeRemaining(targetDate: string): TimeRemaining {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const total = Math.max(0, target - now);

  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes, total };
}

function formatCountdown(hours: number, minutes: number): string {
  if (hours > 0) {
    return `in ${hours}h ${minutes}m`;
  }
  return `in ${minutes}m`;
}

export default function CountdownTimer({
  targetDate,
  eventName,
  eventDetail,
  sport = "worldcup",
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 60000); // Update every minute as per acceptance criteria

    return () => clearInterval(interval);
  }, [targetDate]);

  // Don't render if countdown has expired
  if (timeRemaining.total === 0) {
    return null;
  }

  const countdownText = formatCountdown(timeRemaining.hours, timeRemaining.minutes);

  return (
    <div className="mb-8">
      <div
        className="group relative overflow-hidden rounded-3xl border bg-gradient-to-br from-surface via-surface to-surface2 p-6 sm:p-8"
        data-sport={sport}
        style={{
          borderColor: `color-mix(in srgb, var(--accent) 30%, transparent)`,
        }}
      >
        {/* Subtle accent glow background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            background: `radial-gradient(600px circle at 50% 50%, var(--accent), transparent 60%)`,
          }}
        />

        <div className="relative">
          {/* COMING UP label with clock icon */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">⏱</span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted sm:text-sm">
              Coming Up
            </span>
          </div>

          {/* Event name + countdown - inline format as per acceptance criteria */}
          <h2 className="font-display text-2xl font-bold leading-tight text-fg sm:text-4xl lg:text-5xl">
            {eventName}{" "}
            <span className="font-sans text-xl font-semibold text-accent sm:text-3xl lg:text-4xl">
              {countdownText}
            </span>
          </h2>

          {/* Event detail */}
          {eventDetail && (
            <p className="mt-3 text-sm text-muted sm:text-base">{eventDetail}</p>
          )}
        </div>
      </div>
    </div>
  );
}
