/**
 * Sport-specific background textures for hero sections
 * Uses inline SVG patterns + CSS gradients (not external images)
 * Theme-adaptive via opacity and blend modes
 * Performance: <5KB per texture, no LCP impact
 */

type Sport = 'tennis' | 'worldcup' | 'cycling' | 'general';

interface HeroSportTextureProps {
  sport: Sport;
  className?: string;
}

export default function HeroSportTexture({ sport, className = '' }: HeroSportTextureProps) {
  // SVG pattern definitions - opacity adapts to theme via dark: modifier
  const patterns = {
    tennis: (
      // Clay court texture - terracotta earth tones with subtle grain
      <svg className="absolute inset-0 h-full w-full opacity-[0.15] dark:opacity-[0.20]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="clay-texture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Horizontal court lines (subtle) */}
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            {/* Subtle grain */}
            <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.15" />
            <circle cx="60" cy="30" r="0.8" fill="currentColor" opacity="0.12" />
            <circle cx="40" cy="70" r="1.2" fill="currentColor" opacity="0.18" />
            <circle cx="80" cy="60" r="0.9" fill="currentColor" opacity="0.14" />
            <circle cx="10" cy="85" r="1.1" fill="currentColor" opacity="0.16" />
            <circle cx="90" cy="15" r="0.7" fill="currentColor" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#clay-texture)" className="text-accent" />
      </svg>
    ),
    worldcup: (
      // Pitch grass with subtle line markings
      <svg className="absolute inset-0 h-full w-full opacity-[0.12] dark:opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pitch-texture" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
            {/* Pitch lines */}
            <line x1="0" y1="40" x2="120" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <line x1="60" y1="0" x2="60" y2="80" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
            {/* Center circle hint */}
            <circle cx="60" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
            {/* Grass texture (diagonal stripes) */}
            <line x1="0" y1="0" x2="30" y2="80" stroke="currentColor" strokeWidth="12" opacity="0.08" />
            <line x1="30" y1="0" x2="60" y2="80" stroke="currentColor" strokeWidth="12" opacity="0.06" />
            <line x1="60" y1="0" x2="90" y2="80" stroke="currentColor" strokeWidth="12" opacity="0.08" />
            <line x1="90" y1="0" x2="120" y2="80" stroke="currentColor" strokeWidth="12" opacity="0.06" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pitch-texture)" className="text-accent" />
      </svg>
    ),
    cycling: (
      // Road asphalt with subtle directional grain
      <svg className="absolute inset-0 h-full w-full opacity-[0.1] dark:opacity-[0.16]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="road-texture" x="0" y="0" width="150" height="100" patternUnits="userSpaceOnUse">
            {/* Road lane marking */}
            <rect x="70" y="0" width="2" height="20" fill="currentColor" opacity="0.3" />
            <rect x="70" y="30" width="2" height="20" fill="currentColor" opacity="0.3" />
            <rect x="70" y="60" width="2" height="20" fill="currentColor" opacity="0.3" />
            <rect x="70" y="90" width="2" height="20" fill="currentColor" opacity="0.3" />
            {/* Asphalt grain (tiny lines suggesting movement) */}
            <line x1="10" y1="15" x2="30" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
            <line x1="40" y1="35" x2="55" y2="37" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
            <line x1="80" y1="25" x2="100" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.18" />
            <line x1="20" y1="55" x2="35" y2="57" stroke="currentColor" strokeWidth="0.5" opacity="0.14" />
            <line x1="90" y1="70" x2="110" y2="73" stroke="currentColor" strokeWidth="0.5" opacity="0.16" />
            <line x1="50" y1="85" x2="65" y2="87" stroke="currentColor" strokeWidth="0.5" opacity="0.13" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#road-texture)" className="text-accent" />
      </svg>
    ),
    general: null, // Trophy icon uses existing gradient only
  };

  const pattern = patterns[sport];

  if (!pattern) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {pattern}
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
    </div>
  );
}
