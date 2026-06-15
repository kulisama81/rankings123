import type { AtpLiveSnapshot, Tour } from "@/types";
import LiveRankingTable from "./LiveRankingTable";

interface LiveRankingViewProps {
  tour: Tour;
  snapshot: AtpLiveSnapshot;
}

export default function LiveRankingView({ tour, snapshot }: LiveRankingViewProps) {
  const tourLabel = snapshot.tourLabel ?? tour.toUpperCase();
  return (
    <div data-sport={tour} className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            {tourLabel} Live Ranking
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
                style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Live
          </span>
        </div>
        <p className="mt-1.5 text-sm text-muted">{snapshot.weekLabel}</p>
      </div>
      <LiveRankingTable tour={tour} initialSnapshot={snapshot} />
    </div>
  );
}
