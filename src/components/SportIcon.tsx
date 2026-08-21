/**
 * Custom SVG sport icon system
 * Line-style icons matching the clean Rankings123 aesthetic
 * Auto-colored via currentColor to inherit per-sport accent
 * Selective skeuomorphic depth applied per Clay 2026 guidance
 */

type SportIconType = 'trophy' | 'tennis' | 'football' | 'cycling' | 'team-tt' | 'individual-tt' | 'mountain' | 'uphill-finish' | 'flat' | 'finish' | 'jersey-yellow' | 'jersey-green' | 'jersey-polkadot' | 'jersey-white';

interface SportIconProps {
  type: SportIconType;
  size?: number;
  className?: string;
}

export default function SportIcon({ type, size = 24, className = '' }: SportIconProps) {
  // Apply selective skeuomorphic depth to icons in nav/hero (Clay 2026 guidance)
  const iconClassName = `${className} depth-icon rounded-lg p-1.5 bg-surface/50`;

  const icons = {
    trophy: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClassName}
        aria-hidden="true"
      >
        {/* Trophy cup */}
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    tennis: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClassName}
        aria-hidden="true"
      >
        {/* Tennis racket */}
        <circle cx="8" cy="8" r="6" />
        <path d="M 12 12 L 17 17" />
        <path d="M 18 18 L 21 21" />
        {/* String pattern */}
        <path d="M 5 8 L 11 8" strokeWidth="1" opacity="0.5" />
        <path d="M 8 5 L 8 11" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    football: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClassName}
        aria-hidden="true"
      >
        {/* Soccer ball */}
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2 L9 8 L3 9 L6 14 L12 12 L18 14 L21 9 L15 8 Z" fill="currentColor" opacity="0.1" />
        <path d="M12 2 L9 8 M3 9 L9 8 M3 9 L6 14 M6 14 L12 12 M12 12 L18 14 M18 14 L21 9 M21 9 L15 8 M15 8 L12 2" />
      </svg>
    ),
    cycling: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClassName}
        aria-hidden="true"
      >
        {/* Bicycle */}
        <circle cx="5" cy="18" r="3" />
        <circle cx="19" cy="18" r="3" />
        <path d="M15 5 L19 18" />
        <path d="M9 8 L12 11 L16 8 L19 18" />
        <path d="M5 18 L8 11 L12 11" />
        <circle cx="16" cy="5" r="1.5" fill="currentColor" />
      </svg>
    ),
    'team-tt': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
        <circle cx="9" cy="7" r="2" />
        <circle cx="15" cy="7" r="2" />
        <path d="M9 10v5M15 10v5M6 15h12M7 19h10" />
      </svg>
    ),
    'individual-tt': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    mountain: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
        <path d="M3 20l5-9 4 6 5-11 4 7" />
      </svg>
    ),
    'uphill-finish': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
        <path d="M3 20l18-12" />
        <path d="M19 10v6h-6" opacity="0.5" />
      </svg>
    ),
    flat: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
        <path d="M3 12h18" />
      </svg>
    ),
    finish: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
        <path d="M4 15l5-5 5 5 5-5" />
        <rect x="4" y="4" width="3" height="3" fill="currentColor" />
        <rect x="9" y="4" width="3" height="3" opacity="0.3" />
        <rect x="14" y="4" width="3" height="3" fill="currentColor" />
        <rect x="19" y="4" width="3" height="3" opacity="0.3" />
      </svg>
    ),
    'jersey-yellow': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" fill="currentColor" opacity="0.2" />
      </svg>
    ),
    'jersey-green': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" fill="currentColor" opacity="0.15" />
      </svg>
    ),
    'jersey-polkadot': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" fill="currentColor" opacity="0.1" />
        <circle cx="10" cy="12" r="1.5" fill="currentColor" />
        <circle cx="14" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
    'jersey-white': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" fill="none" />
      </svg>
    ),
  };

  return icons[type] || null;
}
