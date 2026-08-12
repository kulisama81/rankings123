/**
 * Format a timestamp as relative time (e.g., "2m ago", "just now")
 * @param isoString ISO timestamp string
 * @returns Human-readable relative time
 */
export function formatTimeAgo(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffSeconds = Math.floor((now - then) / 1000);

  if (diffSeconds < 10) return "just now";
  if (diffSeconds < 60) return `${diffSeconds}s ago`;

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

/**
 * Format a timestamp as relative time (mobile-optimized, no "ago")
 * @param isoString ISO timestamp string
 * @returns Condensed relative time (e.g., "2m", "now")
 */
export function formatTimeAgoMobile(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffSeconds = Math.floor((now - then) / 1000);

  if (diffSeconds < 10) return "now";
  if (diffSeconds < 60) return `${diffSeconds}s`;

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d`;
}
