"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SportIcon from "./SportIcon";
import type { CyclingRaceSnapshot } from "@/types";

export default function LiveTdfWidget() {
  const [raceData, setRaceData] = useState<CyclingRaceSnapshot | null>(null);

  useEffect(() => {
    async function fetchRaceData() {
      try {
        const res = await fetch("/api/cycling/primary");
        const data: CyclingRaceSnapshot = await res.json();
        setRaceData(data);
      } catch {
        setRaceData(null);
      }
    }

    // Initial fetch
    fetchRaceData();

    // Poll every 5 minutes (cycling updates less frequently than football)
    const interval = setInterval(fetchRaceData, 300000);

    return () => clearInterval(interval);
  }, []);

  // Hide widget if race isn't active or no data
  if (!raceData || raceData.raceStatus !== "active") {
    return null;
  }

  // Show top 5 GC when available, fallback to primary jersey leader (yellow/red/pink)
  const hasGCData = raceData.gc.length > 0;
  const topGC = hasGCData ? raceData.gc.slice(0, 5) : [];

  // Find the GC jersey (first jersey in the list, usually yellow/red/pink)
  const gcJersey = raceData.jerseys[0];

  // Only show if we have GC data OR GC jersey leader
  if (!hasGCData && !gcJersey?.rider) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
            style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
          />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-accent">
          {raceData.metadata.name}
        </h2>
      </div>

      <Link
        href="/cycling"
        className="group block rounded-2xl border border-edge bg-surface p-6 transition hover:border-accent/60 hover:bg-surface2"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="mb-1 text-sm font-medium text-muted">
              {raceData.currentStage ? `Stage ${raceData.currentStage}` : "In Progress"}
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-fg sm:text-2xl">
              {hasGCData ? (
                <>
                  <SportIcon type="trophy" size={24} className="text-trophy" />
                  <span>General Classification</span>
                </>
              ) : (
                <>
                  <SportIcon type="jersey-yellow" size={24} className="text-accent" />
                  <span>{gcJersey.jerseyName}</span>
                </>
              )}
            </div>
          </div>
          <span className="text-2xl text-accent transition group-hover:translate-x-1">
            →
          </span>
        </div>

        {/* Top 5 GC (when available) */}
        {hasGCData ? (
          <div className="space-y-2">
            {topGC.map((rider, idx) => (
              <div
                key={rider.rank}
                className="flex items-center gap-3 rounded-lg border border-edge bg-surface2 p-3"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-base">
                  {idx === 0 ? (
                    <SportIcon type="jersey-yellow" size={16} className="text-base" />
                  ) : (
                    rider.rank
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-fg sm:text-base">
                    {rider.name}
                  </div>
                  <div className="truncate text-xs text-muted">{rider.team}</div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-sm font-bold tabular-nums text-fg">
                    {rider.gap || rider.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Fallback: GC jersey leader only (pre-race or GC data not yet available) */
          gcJersey?.rider && (
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                <SportIcon type="cycling" size={28} className="text-base" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-lg font-bold text-fg">
                  {gcJersey.rider}
                </div>
                {gcJersey.team && (
                  <div className="truncate text-sm text-muted">{gcJersey.team}</div>
                )}
              </div>
            </div>
          )
        )}

        <div className="mt-4 text-xs text-muted">
          {raceData.source === "wikipedia"
            ? "Live data via Wikipedia"
            : raceData.source === "mock"
              ? "Preview data"
              : "Live data"}
        </div>
      </Link>
    </section>
  );
}
