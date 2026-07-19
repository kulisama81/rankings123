"use client";

import { useEffect, useState } from "react";
import type { WorldCupSnapshot, AtpLiveSnapshot } from "@/types";

interface LiveStatus {
  worldCupMatches: number;
  worldCupFinal: boolean;
  tennisMatches: number;
  tdfStage: number | null;
}

export default function LiveNowHero() {
  const [liveStatus, setLiveStatus] = useState<LiveStatus>({
    worldCupMatches: 0,
    worldCupFinal: false,
    tennisMatches: 0,
    tdfStage: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveStatus() {
      try {
        // Parallel fetch all live data sources
        const [wcData, atpData, wtaData] = await Promise.all([
          fetch("/api/worldcup/live").then((r) => r.json()).catch(() => null),
          fetch("/api/atp-live").then((r) => r.json()).catch(() => null),
          fetch("/api/wta-live").then((r) => r.json()).catch(() => null),
        ]);

        let wcLiveCount = 0;
        let wcFinalLive = false;
        if (wcData) {
          const wcSnapshot = wcData as WorldCupSnapshot;
          const liveMatches = wcSnapshot.matches.filter((m) => m.state === "in");
          wcLiveCount = liveMatches.length;
          // Check for Final match using correct WorldCupMatch properties
          wcFinalLive = liveMatches.some((m) =>
            m.statusDetail?.toLowerCase().includes("final") ||
            m.homeName?.toLowerCase().includes("final") ||
            m.awayName?.toLowerCase().includes("final")
          );
        }

        // Count live tennis matches from both ATP and WTA
        // A player is "in progress" if they have a tournament and it's active
        let tennisLive = 0;
        if (atpData) {
          const atpSnapshot = atpData as AtpLiveSnapshot;
          if (atpSnapshot.players) {
            tennisLive += atpSnapshot.players.filter((p) => p.tournament?.active === true).length;
          }
        }
        if (wtaData) {
          const wtaSnapshot = wtaData as AtpLiveSnapshot; // WTA uses same structure
          if (wtaSnapshot.players) {
            tennisLive += wtaSnapshot.players.filter((p) => p.tournament?.active === true).length;
          }
        }

        // Check if Tour de France is active (July 4-26, 2026)
        const now = new Date();
        const tdfStart = new Date(2026, 6, 4); // July 4
        const tdfEnd = new Date(2026, 6, 26); // July 26
        let tdfStage: number | null = null;
        if (now >= tdfStart && now <= tdfEnd) {
          const daysSinceStart = Math.floor((now.getTime() - tdfStart.getTime()) / (1000 * 60 * 60 * 24));
          tdfStage = Math.min(daysSinceStart + 1, 21);
        }

        setLiveStatus({
          worldCupMatches: wcLiveCount,
          worldCupFinal: wcFinalLive,
          tennisMatches: tennisLive,
          tdfStage,
        });
        setIsLoading(false);
      } catch {
        // Silent fail - component hides if nothing live
        setIsLoading(false);
      }
    }

    fetchLiveStatus();
    const interval = setInterval(fetchLiveStatus, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  // Build dynamic headline from what's actually live
  const liveEvents: string[] = [];
  if (liveStatus.worldCupFinal) {
    liveEvents.push("World Cup Final");
  } else if (liveStatus.worldCupMatches > 0) {
    liveEvents.push(`${liveStatus.worldCupMatches} World Cup ${liveStatus.worldCupMatches === 1 ? "Match" : "Matches"}`);
  }
  if (liveStatus.tennisMatches > 0) {
    liveEvents.push(`${liveStatus.tennisMatches} Tennis ${liveStatus.tennisMatches === 1 ? "Match" : "Matches"}`);
  }
  if (liveStatus.tdfStage) {
    liveEvents.push(`Tour de France Stage ${liveStatus.tdfStage}`);
  }

  const hasLiveContent = liveEvents.length > 0;

  // Skeleton loading state - prevents layout shift
  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="relative overflow-hidden rounded-3xl border border-edge bg-gradient-to-br from-surface via-surface to-surface2 p-6 sm:p-8">
          <div className="relative animate-pulse">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-muted/30" />
              <div className="h-3 w-16 rounded bg-muted/30" />
            </div>
            <div className="h-8 w-3/4 rounded bg-muted/30 sm:h-12" />
            <div className="mt-3 h-4 w-1/2 rounded bg-muted/30" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {hasLiveContent ? (
        <div className="group relative overflow-hidden rounded-3xl border border-live/30 bg-gradient-to-br from-surface via-surface to-surface2 p-6 sm:p-8">
          {/* Subtle animated glow background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--live-rgb), 0.15), transparent 40%)`,
            }}
          />

          <div className="relative">
            {/* Large 8px pulse dot + LIVE NOW label */}
            <div className="mb-3 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span
                  className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-60"
                />
                <span className="relative inline-flex h-full w-full rounded-full bg-live shadow-[0_0_12px_rgba(var(--live-rgb),0.6)]" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-live sm:text-sm">
                Live Now
              </span>
            </div>

            {/* Dynamic headline showing what's actually live */}
            <h1 className="font-display text-2xl font-bold leading-tight text-fg sm:text-4xl lg:text-5xl">
              {liveEvents.join(" • ")}
            </h1>

            <p className="mt-3 text-sm text-muted sm:text-base">
              Real-time rankings and scores updating now
            </p>
          </div>
        </div>
      ) : (
        // Fallback when nothing is live - still compelling but no pulse
        <div className="relative overflow-hidden rounded-3xl border border-edge bg-gradient-to-br from-surface via-surface to-surface2 p-6 sm:p-8">
          <div className="relative">
            <h1 className="font-display text-2xl font-bold leading-tight text-fg sm:text-4xl lg:text-5xl">
              Live Sports Rankings
            </h1>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Tennis • Football • Cycling — Updated in real time
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
