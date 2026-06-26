"use client";

interface StatBarProps {
  label: string;
  homeValue: number;
  awayValue: number;
  format?: "number" | "percent";
  homeDisplay?: string;
  awayDisplay?: string;
}

function StatBar({ label, homeValue, awayValue, format = "number", homeDisplay, awayDisplay }: StatBarProps) {
  const total = homeValue + awayValue;
  const homePercent = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPercent = total > 0 ? (awayValue / total) * 100 : 50;

  const displayHome = homeDisplay ?? (format === "percent" ? `${homeValue}%` : String(homeValue));
  const displayAway = awayDisplay ?? (format === "percent" ? `${awayValue}%` : String(awayValue));

  return (
    <div className="py-3">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold tabular-nums text-fg">{displayHome}</span>
        <span className="text-muted">{label}</span>
        <span className="font-semibold tabular-nums text-fg">{displayAway}</span>
      </div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-surface2">
        <div
          className="bg-accent transition-all"
          style={{ width: `${homePercent}%` }}
          aria-label={`Home ${homePercent.toFixed(0)}%`}
        />
        <div
          className="bg-accent/40 transition-all"
          style={{ width: `${awayPercent}%` }}
          aria-label={`Away ${awayPercent.toFixed(0)}%`}
        />
      </div>
    </div>
  );
}

interface WorldCupMatchStatsProps {
  homeStats: Record<string, string>;
  awayStats: Record<string, string>;
  source: "espn" | "mock";
}

export function WorldCupMatchStats({ homeStats, awayStats, source }: WorldCupMatchStatsProps) {
  // Parse stat values
  const getStat = (stats: Record<string, string>, name: string): number => {
    const value = stats[name];
    if (!value) return 0;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Key advanced stats that differentiate us from basic-stats sites
  const possession = {
    home: getStat(homeStats, "possessionPct"),
    away: getStat(awayStats, "possessionPct"),
  };

  const shots = {
    home: getStat(homeStats, "totalShots"),
    away: getStat(awayStats, "totalShots"),
  };

  const shotsOnTarget = {
    home: getStat(homeStats, "shotsOnTarget"),
    away: getStat(awayStats, "shotsOnTarget"),
  };

  const passes = {
    home: getStat(homeStats, "accuratePasses"),
    away: getStat(awayStats, "accuratePasses"),
    homeTotal: getStat(homeStats, "totalPasses"),
    awayTotal: getStat(awayStats, "totalPasses"),
  };

  const passAccuracy = {
    home: getStat(homeStats, "passPct") * 100,
    away: getStat(awayStats, "passPct") * 100,
  };

  const saves = {
    home: getStat(homeStats, "saves"),
    away: getStat(awayStats, "saves"),
  };

  const fouls = {
    home: getStat(homeStats, "foulsCommitted"),
    away: getStat(awayStats, "foulsCommitted"),
  };

  const corners = {
    home: getStat(homeStats, "wonCorners"),
    away: getStat(awayStats, "wonCorners"),
  };

  const offsides = {
    home: getStat(homeStats, "offsides"),
    away: getStat(awayStats, "offsides"),
  };

  // Only show stats if we have at least possession data (key indicator that match has stats)
  const hasStats = possession.home > 0 || possession.away > 0;

  if (!hasStats) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-fg">Match Statistics</h2>
        {source === "mock" && (
          <span className="rounded-full bg-down/15 px-2 py-0.5 text-xs font-medium text-down">
            Demo data
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
        <div className="divide-y divide-edge px-4">
          {/* Possession & Passing - highlighted as "advanced" stats */}
          <div className="py-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-accent">
              Possession & Passing
            </h3>
            <div className="space-y-1">
              <StatBar
                label="Possession"
                homeValue={possession.home}
                awayValue={possession.away}
                format="percent"
              />
              <StatBar
                label="Pass Accuracy"
                homeValue={passAccuracy.home}
                awayValue={passAccuracy.away}
                format="percent"
                homeDisplay={`${passAccuracy.home.toFixed(0)}%`}
                awayDisplay={`${passAccuracy.away.toFixed(0)}%`}
              />
              <StatBar
                label="Passes Completed"
                homeValue={passes.home}
                awayValue={passes.away}
                homeDisplay={`${passes.home}/${passes.homeTotal}`}
                awayDisplay={`${passes.away}/${passes.awayTotal}`}
              />
            </div>
          </div>

          {/* Shooting */}
          {(shots.home > 0 || shots.away > 0) && (
            <div className="py-4">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-accent">
                Shooting
              </h3>
              <div className="space-y-1">
                <StatBar
                  label="Shots"
                  homeValue={shots.home}
                  awayValue={shots.away}
                />
                <StatBar
                  label="Shots on Target"
                  homeValue={shotsOnTarget.home}
                  awayValue={shotsOnTarget.away}
                />
                {saves.home > 0 || saves.away > 0 ? (
                  <StatBar
                    label="Saves"
                    homeValue={saves.home}
                    awayValue={saves.away}
                  />
                ) : null}
              </div>
            </div>
          )}

          {/* Discipline & Set Pieces */}
          {(fouls.home > 0 || fouls.away > 0 || corners.home > 0 || corners.away > 0) && (
            <div className="py-4">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-accent">
                Discipline & Set Pieces
              </h3>
              <div className="space-y-1">
                {corners.home > 0 || corners.away > 0 ? (
                  <StatBar
                    label="Corners"
                    homeValue={corners.home}
                    awayValue={corners.away}
                  />
                ) : null}
                {fouls.home > 0 || fouls.away > 0 ? (
                  <StatBar
                    label="Fouls"
                    homeValue={fouls.home}
                    awayValue={fouls.away}
                  />
                ) : null}
                {offsides.home > 0 || offsides.away > 0 ? (
                  <StatBar
                    label="Offsides"
                    homeValue={offsides.home}
                    awayValue={offsides.away}
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-edge bg-surface2 px-4 py-2 text-center text-xs text-muted">
          Stats powered by ESPN · Updated in real-time
        </div>
      </div>
    </section>
  );
}
