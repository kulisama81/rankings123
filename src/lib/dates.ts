/**
 * Parse an ISO date string (YYYY-MM-DD) as a local date, avoiding timezone shifts.
 *
 * Using `new Date('2026-08-22')` creates a UTC date, which shifts to Aug 21 in
 * timezones west of UTC when formatted. This function parses the string as a
 * local date to preserve the intended calendar day.
 */
export function parseLocalDate(isoDateString: string): Date {
  const [year, month, day] = isoDateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format a Date object as a localized date string.
 * Uses the same format options as throughout the app for consistency.
 */
export function formatDate(date: Date, options: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  year: "numeric"
}): string {
  return date.toLocaleDateString("en-US", options);
}

/**
 * Format an ISO date string (YYYY-MM-DD) as a localized date string,
 * preserving the calendar day without timezone shifts.
 */
export function formatISODate(isoDateString: string, options?: Intl.DateTimeFormatOptions): string {
  return formatDate(parseLocalDate(isoDateString), options);
}
