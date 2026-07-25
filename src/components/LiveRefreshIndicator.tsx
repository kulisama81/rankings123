"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  refreshInterval?: number; // in seconds, default 30
  enabled?: boolean;
}

export default function LiveRefreshIndicator({
  refreshInterval = 30,
  enabled = true
}: Props) {
  const router = useRouter();
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(refreshInterval);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setSecondsUntilRefresh((prev) => {
        if (prev <= 1) {
          setIsRefreshing(true);
          router.refresh();
          setTimeout(() => setIsRefreshing(false), 1000);
          return refreshInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, refreshInterval, router]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setSecondsUntilRefresh(refreshInterval);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  if (!enabled) return null;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-edge bg-surface p-4">
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
        </span>
        <span className="text-sm font-medium text-primary">Live Updates</span>
      </div>

      <div className="flex-1 text-sm text-secondary">
        {isRefreshing ? (
          <span className="text-accent">Refreshing...</span>
        ) : (
          <span>Next update in {secondsUntilRefresh}s</span>
        )}
      </div>

      <button
        onClick={handleManualRefresh}
        disabled={isRefreshing}
        className="rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/20 disabled:opacity-50"
      >
        Refresh Now
      </button>
    </div>
  );
}
