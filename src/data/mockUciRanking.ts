import type { UciRankingSnapshot } from "@/types";

// Mock fallback data for UCI World Ranking
// Used only when CyclingRanking.com is unavailable
export function getMockUciRanking(): UciRankingSnapshot {
  return {
    lastUpdated: new Date().toISOString(),
    source: "mock",
    riders: [
      {
        rank: 1,
        name: "Tadej POGAČAR",
        team: "UAE Team Emirates",
        country: "Slovenia",
        countryCode: "SLO",
        points: 4749,
      },
      {
        rank: 2,
        name: "Jonas VINGEGAARD",
        team: "Visma–Lease a Bike",
        country: "Denmark",
        countryCode: "DEN",
        points: 3890,
      },
      {
        rank: 3,
        name: "Remco EVENEPOEL",
        team: "Soudal–Quick-Step",
        country: "Belgium",
        countryCode: "BEL",
        points: 3245,
      },
      {
        rank: 4,
        name: "Primož ROGLIČ",
        team: "BORA–hansgrohe",
        country: "Slovenia",
        countryCode: "SLO",
        points: 2987,
      },
      {
        rank: 5,
        name: "Wout VAN AERT",
        team: "Visma–Lease a Bike",
        country: "Belgium",
        countryCode: "BEL",
        points: 2654,
      },
      {
        rank: 6,
        name: "Mathieu VAN DER POEL",
        team: "Alpecin–Deceuninck",
        country: "Netherlands",
        countryCode: "NED",
        points: 2543,
      },
      {
        rank: 7,
        name: "Julian ALAPHILIPPE",
        team: "Soudal–Quick-Step",
        country: "France",
        countryCode: "FRA",
        points: 2321,
      },
      {
        rank: 8,
        name: "Simon YATES",
        team: "Team Jayco AlUla",
        country: "Great Britain",
        countryCode: "GBR",
        points: 2187,
      },
      {
        rank: 9,
        name: "Egan BERNAL",
        team: "INEOS Grenadiers",
        country: "Colombia",
        countryCode: "COL",
        points: 2098,
      },
      {
        rank: 10,
        name: "Marc HIRSCHI",
        team: "UAE Team Emirates",
        country: "Switzerland",
        countryCode: "SUI",
        points: 1976,
      },
    ],
  };
}
