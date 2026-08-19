import type { TdfSnapshot, TdfGCRider, TdfJerseyLeader, CyclingRaceMetadata } from "@/types";

/**
 * Tour de Suisse 2026 feed - COMPLETED RACE (June 17-21, 2026)
 *
 * Returns the final GC standings for the completed Tour de Suisse 2026.
 * Source: Wikipedia (2026 Tour de Suisse article)
 */

// Final GC standings (top 15)
const SUISSE_2026_FINAL_GC: TdfGCRider[] = [
  {
    rank: 1,
    name: "Tadej Pogačar",
    team: "UAE Team Emirates XRG",
    country: "Slovenia",
    countryCode: "SLO",
    flag: "SLO",
    time: "15h 08' 43\"",
  },
  {
    rank: 2,
    name: "Richard Carapaz",
    team: "EF Education–EasyPost",
    country: "Ecuador",
    countryCode: "ECU",
    flag: "ECU",
    time: "15h 15' 15\"",
    gap: "+6' 32\"",
  },
  {
    rank: 3,
    name: "Mathias Vacek",
    team: "Lidl–Trek",
    country: "Czech Republic",
    countryCode: "CZE",
    flag: "CZE",
    time: "15h 15' 36\"",
    gap: "+6' 53\"",
  },
  {
    rank: 4,
    name: "Tobias Foss",
    team: "Netcompany INEOS",
    country: "Norway",
    countryCode: "NOR",
    flag: "NOR",
    time: "15h 16' 17\"",
    gap: "+7' 34\"",
  },
  {
    rank: 5,
    name: "Ilan Van Wilder",
    team: "Soudal–Quick-Step",
    country: "Belgium",
    countryCode: "BEL",
    flag: "BEL",
    time: "15h 16' 34\"",
    gap: "+7' 51\"",
  },
  {
    rank: 6,
    name: "Brandon McNulty",
    team: "UAE Team Emirates XRG",
    country: "United States",
    countryCode: "USA",
    flag: "USA",
    time: "15h 16' 36\"",
    gap: "+7' 53\"",
  },
  {
    rank: 7,
    name: "Matthew Riccitello",
    team: "Decathlon CMA CGM",
    country: "United States",
    countryCode: "USA",
    flag: "USA",
    time: "15h 17' 31\"",
    gap: "+8' 48\"",
  },
  {
    rank: 8,
    name: "Primož Roglič",
    team: "Red Bull–Bora–Hansgrohe",
    country: "Slovenia",
    countryCode: "SLO",
    flag: "SLO",
    time: "15h 18' 06\"",
    gap: "+9' 23\"",
  },
  {
    rank: 9,
    name: "Sergio Higuita",
    team: "XDS Astana Team",
    country: "Colombia",
    countryCode: "COL",
    flag: "COL",
    time: "15h 18' 09\"",
    gap: "+9' 26\"",
  },
  {
    rank: 10,
    name: "Bart Lemmen",
    team: "Visma–Lease a Bike",
    country: "Netherlands",
    countryCode: "NED",
    flag: "NED",
    time: "15h 18' 27\"",
    gap: "+9' 44\"",
  },
];

// Overall classification winner (Tour de Suisse typically only has GC, no separate jerseys)
const SUISSE_2026_JERSEYS: TdfJerseyLeader[] = [
  {
    jersey: "yellow", // Using yellow as generic GC jersey
    jerseyName: "General Classification Winner",
    rider: "Tadej Pogačar",
    team: "UAE Team Emirates XRG",
    country: "Slovenia",
    flag: "SLO",
  },
];

const SUISSE_METADATA: CyclingRaceMetadata = {
  id: "tour-de-suisse-2026",
  name: "Tour de Suisse 2026",
  year: 2026,
  wikipediaPage: "2026_Tour_de_Suisse",
  startDate: "2026-06-17",
  endDate: "2026-06-21",
  totalStages: 5,
  country: "Switzerland",
  countryCode: "SUI",
  flag: "SUI",
  jerseys: [
    { jersey: "yellow", name: "General Classification" },
    { jersey: "green", name: "Points Classification" },
    { jersey: "polka-dot", name: "Mountains Classification" },
    { jersey: "white", name: "Young Rider Classification" },
  ],
};

export async function getSuisseSnapshot(): Promise<TdfSnapshot> {
  // Tour de Suisse 2026 is COMPLETED - return final results
  return {
    metadata: SUISSE_METADATA,
    lastUpdated: new Date().toISOString(),
    raceStatus: "complete",
    stages: [], // Stages data not needed for completed race GC view
    gc: SUISSE_2026_FINAL_GC,
    jerseys: SUISSE_2026_JERSEYS,
    source: "wikipedia",
  };
}
