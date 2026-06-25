"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { WorldCupMatch } from "@/types";

interface KnockoutNextMatchesProps {
  liveMatches: WorldCupMatch[];
  nextMatch: WorldCupMatch | undefined;
  allUpcoming: WorldCupMatch[];
}

function formatCountdown(targetDate: string): string {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) return "Starting soon";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

function formatMatchTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();

  // Check if today
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  // Check if tomorrow
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow =
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();

  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return `Today, ${timeStr}`;
  if (isTomorrow) return `Tomorrow, ${timeStr}`;

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface MatchCardProps {
  match: WorldCupMatch;
  isLive?: boolean;
  showCountdown?: boolean;
  priority?: "primary" | "secondary";
}

function MatchCard({ match, isLive = false, showCountdown = false, priority = "secondary" }: MatchCardProps) {
  const [countdown, setCountdown] = useState<string>(() =>
    showCountdown ? formatCountdown(match.date) : ""
  );

  useEffect(() => {
    if (!showCountdown) return;
    const timer = setInterval(() => {
      setCountdown(formatCountdown(match.date));
    }, 30000); // Update every 30 seconds
    return () => clearInterval(timer);
  }, [showCountdown, match.date]);

  const isPrimary = priority === "primary";
  const showScore = match.homeScore !== null && match.awayScore !== null;
  const homeWon = showScore && (match.homeScore ?? 0) > (match.awayScore ?? 0);
  const awayWon = showScore && (match.awayScore ?? 0) > (match.homeScore ?? 0);

  return (
    <Link
      href={`/world-cup/match/${match.id}`}
      className={`group relative overflow-hidden rounded-xl transition-all ${
        isLive
          ? "border-2 border-trophy bg-trophy/5 shadow-lg shadow-trophy/10"
          : isPrimary
            ? "border-2 border-accent/50 bg-accent/5 shadow-md hover:shadow-lg"
            : "border border-surface2 bg-surface hover:border-accent/40 hover:shadow-md"
      } ${isPrimary ? "p-6" : "p-4"}`}
    >
      {/* Live indicator */}
      {isLive && (
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-trophy/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-trophy">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trophy opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-trophy" />
          </span>
          Live Now
        </div>
      )}

      {/* Countdown indicator */}
      {showCountdown && !isLive && countdown && (
        <div className="absolute right-3 top-3 rounded-full border border-accent/40 bg-bg/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent backdrop-blur-sm">
          {countdown}
        </div>
      )}

      <div className="space-y-4">
        {/* Match info */}
        {!isLive && (
          <div className="text-center">
            <p className={`font-semibold text-muted ${isPrimary ? "text-sm" : "text-xs"}`}>
              {formatMatchTime(match.date)}
            </p>
            {match.venue && (
              <p className={`text-muted ${isPrimary ? "text-xs" : "text-[10px]"}`}>{match.venue}</p>
            )}
          </div>
        )}

        {isLive && (
          <div className="text-center">
            <p className={`font-bold text-trophy ${isPrimary ? "text-sm" : "text-xs"}`}>
              {match.statusDetail}
            </p>
          </div>
        )}

        {/* Teams */}
        <div className="space-y-3">
          {/* Home team */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className={`leading-none ${isPrimary ? "text-3xl" : "text-2xl"}`} aria-hidden="true">
                {match.homeFlag}
              </span>
              <span
                className={`truncate font-bold ${isPrimary ? "text-xl" : "text-base"} ${
                  homeWon ? "text-fg" : match.state === "post" ? "text-muted" : "text-fg"
                }`}
              >
                {match.homeName}
              </span>
            </div>
            {showScore && (
              <span
                className={`font-mono font-bold tabular-nums ${isPrimary ? "text-2xl" : "text-xl"} ${
                  homeWon ? "text-trophy" : "text-muted"
                }`}
              >
                {match.homeScore}
              </span>
            )}
          </div>

          {/* Away team */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className={`leading-none ${isPrimary ? "text-3xl" : "text-2xl"}`} aria-hidden="true">
                {match.awayFlag}
              </span>
              <span
                className={`truncate font-bold ${isPrimary ? "text-xl" : "text-base"} ${
                  awayWon ? "text-fg" : match.state === "post" ? "text-muted" : "text-fg"
                }`}
              >
                {match.awayName}
              </span>
            </div>
            {showScore && (
              <span
                className={`font-mono font-bold tabular-nums ${isPrimary ? "text-2xl" : "text-xl"} ${
                  awayWon ? "text-trophy" : "text-muted"
                }`}
              >
                {match.awayScore}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function KnockoutNextMatches({
  liveMatches,
  nextMatch,
  allUpcoming,
}: KnockoutNextMatchesProps) {
  if (liveMatches.length === 0 && !nextMatch && allUpcoming.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            <span className="text-trophy">⚡</span> Happening Now
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} isLive={true} priority="primary" />
            ))}
          </div>
        </div>
      )}

      {/* Next Match */}
      {nextMatch && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            <span className="text-accent">🔜</span> Next Match
          </h2>
          <MatchCard match={nextMatch} showCountdown={true} priority="primary" />
        </div>
      )}

      {/* Other Upcoming Matches */}
      {allUpcoming.length > 1 && (
        <div>
          <h2 className="mb-4 text-xl font-bold">Upcoming Matches</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allUpcoming.slice(1, 4).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
