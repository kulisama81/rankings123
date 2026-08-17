import type { F1Snapshot } from "@/types";

/**
 * Mock F1 data fallback (2026 season after first 3 races).
 * Used when Wikipedia feed fails.
 * Based on realistic 2026 season snapshot from Wikipedia.
 */
export function getMockF1(): F1Snapshot {
  return {
    drivers: [
      { rank: 1, driver: "Kimi Antonelli", team: "Mercedes", points: 68 },
      { rank: 2, driver: "George Russell", team: "Mercedes", points: 63 },
      { rank: 3, driver: "Lewis Hamilton", team: "Ferrari", points: 46 },
      { rank: 4, driver: "Charles Leclerc", team: "Ferrari", points: 43 },
      { rank: 5, driver: "Max Verstappen", team: "Red Bull Racing", points: 35 },
      { rank: 6, driver: "Lando Norris", team: "McLaren", points: 28 },
      { rank: 7, driver: "Oscar Piastri", team: "McLaren", points: 24 },
      { rank: 8, driver: "Carlos Sainz Jr.", team: "Williams", points: 18 },
      { rank: 9, driver: "Pierre Gasly", team: "Alpine", points: 12 },
      { rank: 10, driver: "Gabriel Bortoleto", team: "Audi", points: 10 },
    ],
    constructors: [
      { rank: 1, constructor: "Mercedes", points: 131 },
      { rank: 2, constructor: "Ferrari", points: 89 },
      { rank: 3, constructor: "McLaren", points: 52 },
      { rank: 4, constructor: "Red Bull Racing", points: 44 },
      { rank: 5, constructor: "Williams", points: 24 },
      { rank: 6, constructor: "Alpine", points: 18 },
      { rank: 7, constructor: "Audi", points: 14 },
      { rank: 8, constructor: "Haas", points: 8 },
      { rank: 9, constructor: "Visa Cash App RB", points: 4 },
      { rank: 10, constructor: "Kick Sauber", points: 0 },
    ],
    source: "mock",
    lastUpdated: new Date().toISOString(),
    season: 2026,
  };
}
