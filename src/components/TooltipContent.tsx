/**
 * Specialized tooltip content components for ranking data
 * Each provides contextual information for a specific data point
 */

interface RankTooltipProps {
  currentRank: number;
  movement: number;
  officialRank: number;
}

export function RankTooltip({ currentRank, movement, officialRank }: RankTooltipProps) {
  const isTop3 = currentRank <= 3;
  const podium = currentRank === 1 ? "🥇" : currentRank === 2 ? "🥈" : currentRank === 3 ? "🥉" : "";

  return (
    <div>
      <div className="tooltip-title">
        {isTop3 && <span className="mr-1">{podium}</span>}
        Rank #{currentRank}
      </div>
      {movement !== 0 && (
        <div className="tooltip-stat">
          <span className="tooltip-stat-label">Movement</span>
          <span className="tooltip-stat-value">
            {movement > 0 ? `Up ${movement} spot${movement !== 1 ? 's' : ''}` :
             `Down ${Math.abs(movement)} spot${Math.abs(movement) !== 1 ? 's' : ''}`}
          </span>
        </div>
      )}
      {currentRank !== officialRank && (
        <div className="tooltip-meta">
          Official rank: #{officialRank}
        </div>
      )}
    </div>
  );
}

interface PointsTooltipProps {
  livePoints: number;
  officialPoints: number;
  delta: number;
  tournament?: string;
}

export function PointsTooltip({ livePoints, officialPoints, delta, tournament }: PointsTooltipProps) {
  return (
    <div>
      <div className="tooltip-title">Live Points</div>
      <div className="tooltip-stat">
        <span className="tooltip-stat-label">Current total</span>
        <span className="tooltip-stat-value">{livePoints.toLocaleString()}</span>
      </div>
      <div className="tooltip-stat">
        <span className="tooltip-stat-label">Official</span>
        <span className="tooltip-stat-value">{officialPoints.toLocaleString()}</span>
      </div>
      {delta !== 0 && (
        <div className="tooltip-stat">
          <span className="tooltip-stat-label">Change</span>
          <span className={`tooltip-stat-value ${delta > 0 ? 'text-up' : 'text-down'}`}>
            {delta > 0 ? '+' : ''}{delta.toLocaleString()}
          </span>
        </div>
      )}
      {tournament && delta !== 0 && (
        <div className="tooltip-meta">
          {delta > 0 ? 'Earning' : 'Defending'} at {tournament}
        </div>
      )}
    </div>
  );
}

interface MovementTooltipProps {
  movement: number;
  previousRank: number;
  currentRank: number;
}

export function MovementTooltip({ movement, previousRank, currentRank }: MovementTooltipProps) {
  const direction = movement > 0 ? 'up' : 'down';
  const absMovement = Math.abs(movement);

  return (
    <div>
      <div className="tooltip-title">
        {direction === 'up' ? '▲' : '▼'} {absMovement} position{absMovement !== 1 ? 's' : ''}
      </div>
      <div className="tooltip-stat">
        <span className="tooltip-stat-label">Previous rank</span>
        <span className="tooltip-stat-value">#{previousRank}</span>
      </div>
      <div className="tooltip-stat">
        <span className="tooltip-stat-label">Current rank</span>
        <span className="tooltip-stat-value">#{currentRank}</span>
      </div>
      <div className="tooltip-meta">
        Updated during live play
      </div>
    </div>
  );
}

interface PlayerTooltipProps {
  name: string;
  countryCode: string;
  age?: number;
  tournament?: string;
  tournamentRound?: string;
}

export function PlayerTooltip({ name, countryCode, age, tournament, tournamentRound }: PlayerTooltipProps) {
  return (
    <div>
      <div className="tooltip-title">{name}</div>
      <div className="tooltip-stat">
        <span className="tooltip-stat-label">Country</span>
        <span className="tooltip-stat-value">{countryCode}</span>
      </div>
      {age && (
        <div className="tooltip-stat">
          <span className="tooltip-stat-label">Age</span>
          <span className="tooltip-stat-value">{age} years</span>
        </div>
      )}
      {tournament && (
        <div className="tooltip-meta">
          {tournamentRound ? `${tournament} · ${tournamentRound}` : tournament}
        </div>
      )}
    </div>
  );
}

interface TeamTooltipProps {
  name: string;
  code: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  status?: string;
}

export function TeamTooltip({ name, code, played, won, drawn, lost, goalsFor, goalsAgainst, status }: TeamTooltipProps) {
  const winRate = played > 0 ? Math.round((won / played) * 100) : 0;

  return (
    <div>
      <div className="tooltip-title">{name} ({code})</div>
      <div className="tooltip-stat">
        <span className="tooltip-stat-label">Record</span>
        <span className="tooltip-stat-value">{won}W-{drawn}D-{lost}L</span>
      </div>
      <div className="tooltip-stat">
        <span className="tooltip-stat-label">Goals</span>
        <span className="tooltip-stat-value">{goalsFor} for, {goalsAgainst} against</span>
      </div>
      {winRate > 0 && (
        <div className="tooltip-stat">
          <span className="tooltip-stat-label">Win rate</span>
          <span className="tooltip-stat-value">{winRate}%</span>
        </div>
      )}
      {status && (
        <div className="tooltip-meta">{status}</div>
      )}
    </div>
  );
}

interface TeamPointsTooltipProps {
  points: number;
  won: number;
  drawn: number;
}

export function TeamPointsTooltip({ points, won, drawn }: TeamPointsTooltipProps) {
  const pointsFromWins = won * 3;
  const pointsFromDraws = drawn * 1;

  return (
    <div>
      <div className="tooltip-title">{points} Points</div>
      {won > 0 && (
        <div className="tooltip-stat">
          <span className="tooltip-stat-label">{won} win{won !== 1 ? 's' : ''}</span>
          <span className="tooltip-stat-value">{pointsFromWins} pts</span>
        </div>
      )}
      {drawn > 0 && (
        <div className="tooltip-stat">
          <span className="tooltip-stat-label">{drawn} draw{drawn !== 1 ? 's' : ''}</span>
          <span className="tooltip-stat-value">{pointsFromDraws} pt{pointsFromDraws !== 1 ? 's' : ''}</span>
        </div>
      )}
      <div className="tooltip-meta">
        3 points per win, 1 per draw
      </div>
    </div>
  );
}
