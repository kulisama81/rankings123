"use client";

import { useEffect, useState } from "react";

interface WorldCupCountdownProps {
  currentMatches?: Array<{ state: string; date: string }>;
}

export default function WorldCupCountdown({ currentMatches = [] }: WorldCupCountdownProps) {
  const [timeState, setTimeState] = useState<{
    daysToFinals: number;
    isFinalsDay: boolean;
    isSemiFinalsDay: boolean;
    hasLiveMatches: boolean;
    tournamentEnded: boolean;
  } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const finalsDate = new Date("2026-07-19T18:00:00-04:00"); // Finals July 19, 2026 (EST)
      const semiFinalsStart = new Date("2026-07-15T00:00:00-04:00"); // Semi-finals July 15-16
      const semiFinalsEnd = new Date("2026-07-16T23:59:59-04:00");
      const tournamentEnd = new Date("2026-07-20T00:00:00-04:00"); // Day after finals

      // Check if tournament has ended
      if (now > tournamentEnd) {
        setTimeState({ daysToFinals: 0, isFinalsDay: false, isSemiFinalsDay: false, hasLiveMatches: false, tournamentEnded: true });
        return;
      }

      // Calculate days to finals
      const msToFinals = finalsDate.getTime() - now.getTime();
      const daysToFinals = Math.floor(msToFinals / (1000 * 60 * 60 * 24));

      // Determine current stage
      const isFinalsDay = now.toDateString() === finalsDate.toDateString();
      const isSemiFinalsDay = now >= semiFinalsStart && now <= semiFinalsEnd;

      // Check for live matches
      const hasLiveMatches = currentMatches.some((m) => m.state === "in");

      setTimeState({
        daysToFinals: Math.max(0, daysToFinals),
        isFinalsDay,
        isSemiFinalsDay,
        hasLiveMatches,
        tournamentEnded: false,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [currentMatches]);

  // Auto-hide after tournament ends
  if (!timeState || timeState.tournamentEnded) {
    return null;
  }

  const { daysToFinals, isFinalsDay, isSemiFinalsDay, hasLiveMatches } = timeState;

  // Dynamic messaging based on tournament state
  let primaryMessage = "";
  let secondaryMessage = "";
  let urgencyLevel: "normal" | "high" | "critical" = "normal";

  if (isFinalsDay) {
    primaryMessage = hasLiveMatches ? "FINALS LIVE NOW" : "FINALS TODAY";
    secondaryMessage = "The moment we've all been waiting for";
    urgencyLevel = "critical";
  } else if (isSemiFinalsDay) {
    primaryMessage = hasLiveMatches ? "SEMI-FINALS LIVE" : "SEMI-FINALS TODAY";
    secondaryMessage = `Finals in ${daysToFinals} ${daysToFinals === 1 ? "day" : "days"}`;
    urgencyLevel = "high";
  } else if (daysToFinals <= 3) {
    primaryMessage = `FINALS IN ${daysToFinals} ${daysToFinals === 1 ? "DAY" : "DAYS"}`;
    secondaryMessage = "The countdown is on";
    urgencyLevel = "high";
  } else {
    primaryMessage = `Finals in ${daysToFinals} days`;
    secondaryMessage = "July 19, 2026";
    urgencyLevel = "normal";
  }

  // Styling based on urgency level
  const containerClasses = `
    relative overflow-hidden rounded-2xl border transition-all duration-500
    ${urgencyLevel === "critical" ? "border-accent/50 bg-accent/10 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)]" : ""}
    ${urgencyLevel === "high" ? "border-accent/40 bg-accent/5 shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)]" : ""}
    ${urgencyLevel === "normal" ? "border-edge bg-surface" : ""}
  `;

  const pulseAnimation = hasLiveMatches && (isFinalsDay || isSemiFinalsDay)
    ? "animate-pulse"
    : "";

  return (
    <div className={`${containerClasses} ${pulseAnimation}`}>
      {/* Background gradient effect for high urgency */}
      {urgencyLevel !== "normal" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at center, rgb(var(--accent-rgb)) 0%, transparent 70%)`,
          }}
        />
      )}

      <div className="relative px-6 py-4 sm:px-8 sm:py-5">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          {/* Left: Live indicator + primary message */}
          <div className="flex items-center gap-3">
            {hasLiveMatches && (isFinalsDay || isSemiFinalsDay) && (
              <div className="relative flex items-center">
                <div className="absolute h-3 w-3 animate-ping rounded-full bg-accent opacity-75" />
                <div className="relative h-3 w-3 rounded-full bg-accent" />
              </div>
            )}
            <div>
              <h2 className={`
                font-bold tracking-tight
                ${urgencyLevel === "critical" ? "text-2xl sm:text-3xl" : ""}
                ${urgencyLevel === "high" ? "text-xl sm:text-2xl" : ""}
                ${urgencyLevel === "normal" ? "text-lg sm:text-xl" : ""}
                ${urgencyLevel !== "normal" ? "text-accent" : "text-fg"}
              `}>
                {primaryMessage}
              </h2>
              {secondaryMessage && (
                <p className="mt-0.5 text-sm text-fg-muted sm:text-base">
                  {secondaryMessage}
                </p>
              )}
            </div>
          </div>

          {/* Right: Countdown number (when not finals day) */}
          {!isFinalsDay && (
            <div className="flex items-baseline gap-2">
              <span className={`
                font-bold tabular-nums tracking-tighter text-accent
                ${urgencyLevel === "high" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}
              `}>
                {daysToFinals}
              </span>
              <span className="text-base font-medium text-fg-muted sm:text-lg">
                {daysToFinals === 1 ? "day" : "days"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
