// Shared utilities for World Cup venue pages

// Convert venue name to URL-safe slug
export function venueToSlug(venueName: string): string {
  return venueName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Parse venue components from ESPN venue string
export interface VenueInfo {
  stadiumName: string;
  cityState: string;
  shortName: string;
}

export function parseVenue(venue: string): VenueInfo {
  // ESPN venue format is typically "Stadium Name, City, State"
  // e.g., "MetLife Stadium, East Rutherford, NJ"
  const parts = venue.split(",").map((p) => p.trim());
  const stadiumName = parts[0] || venue;
  // Only show city if available — never use placeholder text
  const cityState = parts.length > 1 ? parts.slice(1).join(", ") : "";
  const shortName = stadiumName.replace(/\s+(Stadium|Arena|Field)$/i, "");
  return { stadiumName, cityState, shortName };
}
