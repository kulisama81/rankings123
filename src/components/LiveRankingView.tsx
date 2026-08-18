import type { AtpLiveSnapshot, Tour } from "@/types";
import LiveRankingTable from "./LiveRankingTable";
import HeroBanner from "./HeroBanner";

interface LiveRankingViewProps {
  tour?: Tour;
  snapshot: AtpLiveSnapshot;
  showAgeGroupRank?: boolean;
}

export default function LiveRankingView({ tour, snapshot, showAgeGroupRank }: LiveRankingViewProps) {
  const tourValue = tour ?? snapshot.tour ?? "atp";
  const tourLabel = snapshot.tourLabel ?? tourValue.toUpperCase();
  const players = snapshot.players;
  const top = players[0];
  const liveCount = players.filter((p) => p.tournament?.active && p.pointsDelta !== 0).length;

  const stats = top
    ? [
        { label: "Live #1", value: `${top.flag} ${top.name}` },
        { label: "Points", value: top.livePoints.toLocaleString() },
        { label: "In play overall", value: String(liveCount) },
        { label: "Ranked", value: String(players.length) },
      ]
    : undefined;

  return (
    <div data-sport={tourValue} className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <HeroBanner
        sport="tennis"
        title={`${tourLabel} Live Ranking`}
        subtitle={snapshot.weekLabel}
        stats={stats}
      />
      <LiveRankingTable tour={tourValue} initialSnapshot={snapshot} showAgeGroupRank={showAgeGroupRank} />
    </div>
  );
}
