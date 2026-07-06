"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TdfSnapshot } from "@/types";

export default function LiveTdfWidget() {
  const [tdfData, setTdfData] = useState<TdfSnapshot | null>(null);

  useEffect(() => {
    async function fetchTdfData() {
      try {
        const res = await fetch("/api/tdf/live");
        const data: TdfSnapshot = await res.json();
        setTdfData(data);
      } catch {
        setTdfData(null);
      }
    }

    // Initial fetch
    fetchTdfData();

    // Poll every 5 minutes (TdF updates less frequently than football)
    const interval = setInterval(fetchTdfData, 300000);

    return () => clearInterval(interval);
  }, []);

  // Hide widget if race isn't active or no data
  if (!tdfData || tdfData.raceStatus !== "active") {
    return null;
  }

  // Show top 5 GC when available, fallback to yellow jersey leader
  const hasGCData = tdfData.gc.length > 0;
  const topGC = hasGCData ? tdfData.gc.slice(0, 5) : [];
  const yellowJersey = tdfData.jerseys.find((j) => j.jersey === "yellow");

  // Only show if we have GC data OR yellow jersey leader
  if (!hasGCData && !yellowJersey?.rider) {
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
          Tour de France 2026
        </h2>
      </div>

      <Link
        href="/cycling"
        className="group block rounded-2xl border border-edge bg-surface p-6 transition hover:border-accent/60 hover:bg-surface2"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="mb-1 text-sm font-medium text-muted">
              {tdfData.currentStage ? `Stage ${tdfData.currentStage}` : "In Progress"}
            </div>
            <div className="text-xl font-bold text-fg sm:text-2xl">
              {hasGCData ? "🏆 General Classification" : "🟡 Yellow Jersey Leader"}
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
                  {idx === 0 ? "🟡" : rider.rank}
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
          /* Fallback: Yellow jersey leader only (pre-race or GC data not yet available) */
          yellowJersey?.rider && (
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent text-2xl font-bold">
                🚴
              </div>
              <div className="min-w-0">
                <div className="truncate text-lg font-bold text-fg">
                  {yellowJersey.rider}
                </div>
                {yellowJersey.team && (
                  <div className="truncate text-sm text-muted">{yellowJersey.team}</div>
                )}
              </div>
            </div>
          )
        )}

        <div className="mt-4 text-xs text-muted">
          {tdfData.source === "wikipedia"
            ? "Live data via Wikipedia"
            : tdfData.source === "mock"
              ? "Preview data"
              : "Live data"}
        </div>
      </Link>
    </section>
  );
}
