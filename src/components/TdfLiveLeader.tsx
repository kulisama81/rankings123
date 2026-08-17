import type { TdfGCRider } from "@/types";
import FlagIcon from "./FlagIcon";

interface Props {
  leader: TdfGCRider | undefined;
  isLive: boolean;
}

export default function TdfLiveLeader({ leader, isLive }: Props) {
  if (!leader) {
    return (
      <div className="rounded-2xl border border-edge bg-surface p-6">
        <p className="text-sm uppercase tracking-wide text-muted">Current Leader</p>
        <p className="mt-4 text-lg text-secondary">Race not yet started</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent bg-accent/5 p-6">
      {isLive && (
        <div className="absolute right-4 top-4">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
          </span>
        </div>
      )}

      <p className="mb-4 text-sm uppercase tracking-wide text-muted">
        {isLive ? "Live Leader" : "Current Leader"}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-accent/10">
          <span className="text-3xl"><FlagIcon code={leader.flag} size="md" /></span>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-primary">{leader.name}</h3>
          <p className="text-sm text-secondary">{leader.team}</p>
        </div>

        <div className="text-right">
          <p className="text-sm uppercase tracking-wide text-muted">Rank</p>
          <p className="text-3xl font-bold text-accent">#{leader.rank}</p>
        </div>
      </div>

      {leader.time && (
        <div className="mt-4 border-t border-edge pt-4">
          <span className="text-sm text-muted">Total Time: </span>
          <span className="font-semibold text-primary">{leader.time}</span>
        </div>
      )}
    </div>
  );
}
