"use client";

import { useEffect, useState } from "react";
import type { AtpLiveSnapshot } from "@/types";

interface ShowcaseData {
  atp: {
    rank: number;
    name: string;
    points: number;
    diffVsTwo: number;
    isLive: boolean;
  } | null;
  wta: {
    rank: number;
    name: string;
    points: number;
    diffVsTwo: number;
    isLive: boolean;
  } | null;
}

/**
 * Rank Showcase - Homepage dramatic visual anchor
 *
 * Shows ATP #1 and WTA #1 with POINTS as the hero (84px tabular mono).
 * Signature: count-up animation + live pulse glow.
 *
 * Design principle: In tennis, points = rank = everything.
 * Make the data itself beautiful.
 */
export default function RankShowcase() {
  const [data, setData] = useState<ShowcaseData>({ atp: null, wta: null });
  const [isLoading, setIsLoading] = useState(true);
  const [animatedPoints, setAnimatedPoints] = useState({ atp: 0, wta: 0 });

  useEffect(() => {
    // Track component render (homepage anchor displayed)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "homepage_anchor_interaction", {
        event_category: "engagement",
        event_label: "rank_showcase_render",
        value: 1,
      });
    }

    async function fetchRankings() {
      try {
        const [atpRes, wtaRes] = await Promise.all([
          fetch("/api/atp-live").then(r => r.json()).catch(() => null),
          fetch("/api/wta-live").then(r => r.json()).catch(() => null),
        ]);

        let atpData = null;
        let wtaData = null;

        if (atpRes) {
          const atpSnapshot = atpRes as AtpLiveSnapshot;
          const rank1 = atpSnapshot.players?.[0];
          if (rank1 && rank1.liveRank === 1) {
            const rank2 = atpSnapshot.players?.[1];
            atpData = {
              rank: 1,
              name: rank1.name,
              points: rank1.livePoints,
              diffVsTwo: rank2 ? rank1.livePoints - rank2.livePoints : 0,
              isLive: rank1.tournament?.active === true,
            };
          }
        }

        if (wtaRes) {
          const wtaSnapshot = wtaRes as AtpLiveSnapshot;
          const rank1 = wtaSnapshot.players?.[0];
          if (rank1 && rank1.liveRank === 1) {
            const rank2 = wtaSnapshot.players?.[1];
            wtaData = {
              rank: 1,
              name: rank1.name,
              points: rank1.livePoints,
              diffVsTwo: rank2 ? rank1.livePoints - rank2.livePoints : 0,
              isLive: rank1.tournament?.active === true,
            };
          }
        }

        setData({ atp: atpData, wta: wtaData });
        setIsLoading(false);

        // Start count-up animation after data loads
        if (atpData || wtaData) {
          const duration = 1200; // 1.2s
          const steps = 60;
          const stepDuration = duration / steps;
          let currentStep = 0;

          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            // Ease-out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);

            setAnimatedPoints({
              atp: atpData ? Math.round(atpData.points * eased) : 0,
              wta: wtaData ? Math.round(wtaData.points * eased) : 0,
            });

            if (currentStep >= steps) {
              clearInterval(interval);
              setAnimatedPoints({
                atp: atpData?.points || 0,
                wta: wtaData?.points || 0,
              });

              // Track count-up animation completion
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "homepage_anchor_interaction", {
                  event_category: "engagement",
                  event_label: "rank_showcase_animation_complete",
                  value: 1,
                });
              }
            }
          }, stepDuration);

          return () => clearInterval(interval);
        }
      } catch {
        setIsLoading(false);
      }
    }

    fetchRankings();
    const pollInterval = setInterval(fetchRankings, 300000); // Poll every 5 min
    return () => clearInterval(pollInterval);
  }, []);

  // Hide if no data
  if (!isLoading && !data.atp && !data.wta) {
    return null;
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-edge bg-gradient-to-br from-surface to-surface2 p-6 sm:p-10">
          <div className="animate-pulse">
            <div className="mb-6 h-4 w-40 rounded bg-muted/20" />
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="h-3 w-12 rounded bg-muted/20" />
                <div className="h-20 w-48 rounded bg-muted/20" />
                <div className="h-6 w-32 rounded bg-muted/20" />
              </div>
              <div className="space-y-4">
                <div className="h-3 w-12 rounded bg-muted/20" />
                <div className="h-20 w-48 rounded bg-muted/20" />
                <div className="h-6 w-32 rounded bg-muted/20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      {/* Live status bar */}
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-60" />
          <span className="relative inline-flex h-full w-full rounded-full bg-live shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
          Live • Updating Every 5 Min
        </span>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-edge bg-gradient-to-br from-surface to-surface2 p-6 sm:p-10">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* ATP #1 */}
          {data.atp && (
            <div className="relative" data-sport="atp">
              {/* Accent glow background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  background: "radial-gradient(circle at 50% 30%, rgb(182, 242, 60), transparent 70%)",
                }}
              />

              <div className="relative">
                {/* Sport label */}
                <div className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
                  ATP
                </div>

                {/* POINTS - the hero */}
                <div className="relative mb-2">
                  {/* Live pulse glow (only when player is live) */}
                  {data.atp.isLive && (
                    <div
                      className="motion-safe:animate-pulse absolute inset-0 blur-2xl opacity-20"
                      style={{ backgroundColor: "rgb(182, 242, 60)" }}
                    />
                  )}

                  <div
                    className="font-mono text-[48px] font-black tabular-nums leading-none text-fg sm:text-[84px]"
                    style={{
                      textShadow: data.atp.isLive
                        ? "0 0 40px rgba(182, 242, 60, 0.3)"
                        : "none"
                    }}
                  >
                    {animatedPoints.atp.toLocaleString()}
                  </div>
                </div>

                {/* Label */}
                <div className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-muted">
                  Points
                </div>

                {/* Rank + Name */}
                <div className="mb-1 flex items-baseline gap-2">
                  <span
                    className="font-display text-xl font-black tabular-nums sm:text-2xl"
                    style={{ color: "rgb(182, 242, 60)" }}
                  >
                    #1
                  </span>
                  <h3 className="font-display text-xl font-bold text-fg sm:text-2xl">
                    {data.atp.name}
                  </h3>
                </div>

                {/* Diff vs #2 */}
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <span className="font-mono font-semibold tabular-nums" style={{ color: "rgb(182, 242, 60)" }}>
                    +{data.atp.diffVsTwo.toLocaleString()}
                  </span>
                  <span>vs #2</span>
                </div>

                {/* Live indicator */}
                {data.atp.isLive && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-live/30 bg-live/10 px-3 py-1 text-xs font-semibold text-live">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
                    </span>
                    Playing now
                  </div>
                )}
              </div>
            </div>
          )}

          {/* WTA #1 */}
          {data.wta && (
            <div className="relative" data-sport="wta">
              {/* Accent glow background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  background: "radial-gradient(circle at 50% 30%, rgb(244, 114, 182), transparent 70%)",
                }}
              />

              <div className="relative">
                {/* Sport label */}
                <div className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
                  WTA
                </div>

                {/* POINTS - the hero */}
                <div className="relative mb-2">
                  {/* Live pulse glow (only when player is live) */}
                  {data.wta.isLive && (
                    <div
                      className="motion-safe:animate-pulse absolute inset-0 blur-2xl opacity-20"
                      style={{ backgroundColor: "rgb(244, 114, 182)" }}
                    />
                  )}

                  <div
                    className="font-mono text-[48px] font-black tabular-nums leading-none text-fg sm:text-[84px]"
                    style={{
                      textShadow: data.wta.isLive
                        ? "0 0 40px rgba(244, 114, 182, 0.3)"
                        : "none"
                    }}
                  >
                    {animatedPoints.wta.toLocaleString()}
                  </div>
                </div>

                {/* Label */}
                <div className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-muted">
                  Points
                </div>

                {/* Rank + Name */}
                <div className="mb-1 flex items-baseline gap-2">
                  <span
                    className="font-display text-xl font-black tabular-nums sm:text-2xl"
                    style={{ color: "rgb(244, 114, 182)" }}
                  >
                    #1
                  </span>
                  <h3 className="font-display text-xl font-bold text-fg sm:text-2xl">
                    {data.wta.name}
                  </h3>
                </div>

                {/* Diff vs #2 */}
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <span className="font-mono font-semibold tabular-nums" style={{ color: "rgb(244, 114, 182)" }}>
                    +{data.wta.diffVsTwo.toLocaleString()}
                  </span>
                  <span>vs #2</span>
                </div>

                {/* Live indicator */}
                {data.wta.isLive && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-live/30 bg-live/10 px-3 py-1 text-xs font-semibold text-live">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
                    </span>
                    Playing now
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
