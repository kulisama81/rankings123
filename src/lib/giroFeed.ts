import type { TdfSnapshot, TdfGCRider, TdfJerseyLeader } from "@/types";
import { CYCLING_RACES } from "@/data/cyclingRaces";

/**
 * Giro d'Italia 2026 feed - COMPLETED RACE (May 8-31, 2026)
 *
 * Returns the final GC standings and jersey winners for the completed Giro 2026.
 * Source: Wikipedia (2026 Giro d'Italia article)
 */

// Final GC standings (top 20)
const GIRO_2026_FINAL_GC: TdfGCRider[] = [
  {
    rank: 1,
    name: "Jonas Vingegaard",
    team: "Visma–Lease a Bike",
    country: "Denmark",
    countryCode: "DEN",
    flag: "DEN",
    time: "83h 22' 51\"",
  },
  {
    rank: 2,
    name: "Felix Gall",
    team: "Decathlon CMA CGM",
    country: "Austria",
    countryCode: "AUT",
    flag: "AUT",
    time: "83h 28' 13\"",
    gap: "+5' 22\"",
  },
  {
    rank: 3,
    name: "Jai Hindley",
    team: "Red Bull–Bora–Hansgrohe",
    country: "Australia",
    countryCode: "AUS",
    flag: "AUS",
    time: "83h 29' 16\"",
    gap: "+6' 25\"",
  },
  {
    rank: 4,
    name: "Thymen Arensman",
    team: "Netcompany INEOS",
    country: "Netherlands",
    countryCode: "NED",
    flag: "NED",
    time: "83h 29' 53\"",
    gap: "+7' 02\"",
  },
  {
    rank: 5,
    name: "Derek Gee-West",
    team: "Lidl–Trek",
    country: "Canada",
    countryCode: "CAN",
    flag: "CAN",
    time: "83h 30' 47\"",
    gap: "+7' 56\"",
  },
  {
    rank: 6,
    name: "Afonso Eulálio",
    team: "Team Bahrain Victorious",
    country: "Portugal",
    countryCode: "POR",
    flag: "POR",
    time: "83h 32' 30\"",
    gap: "+9' 39\"",
  },
  {
    rank: 7,
    name: "Michael Storer",
    team: "Tudor Pro Cycling Team",
    country: "Australia",
    countryCode: "AUS",
    flag: "AUS",
    time: "83h 33' 04\"",
    gap: "+10' 13\"",
  },
  {
    rank: 8,
    name: "Davide Piganzoli",
    team: "Visma–Lease a Bike",
    country: "Italy",
    countryCode: "ITA",
    flag: "ITA",
    time: "83h 33' 43\"",
    gap: "+10' 52\"",
  },
  {
    rank: 9,
    name: "Damiano Caruso",
    team: "Team Bahrain Victorious",
    country: "Italy",
    countryCode: "ITA",
    flag: "ITA",
    time: "83h 34' 15\"",
    gap: "+11' 24\"",
  },
  {
    rank: 10,
    name: "Egan Bernal",
    team: "Netcompany INEOS",
    country: "Colombia",
    countryCode: "COL",
    flag: "COL",
    time: "83h 35' 45\"",
    gap: "+12' 54\"",
  },
  {
    rank: 11,
    name: "Antonio Tiberi",
    team: "Team Bahrain Victorious",
    country: "Italy",
    countryCode: "ITA",
    flag: "ITA",
    time: "83h 37' 12\"",
    gap: "+14' 21\"",
  },
  {
    rank: 12,
    name: "Lennert Van Eetvelt",
    team: "Lotto Dstny",
    country: "Belgium",
    countryCode: "BEL",
    flag: "BEL",
    time: "83h 38' 48\"",
    gap: "+15' 57\"",
  },
  {
    rank: 13,
    name: "Simon Geschke",
    team: "Cofidis",
    country: "Germany",
    countryCode: "GER",
    flag: "GER",
    time: "83h 40' 05\"",
    gap: "+17' 14\"",
  },
  {
    rank: 14,
    name: "Mauri Vansevenant",
    team: "Soudal–Quick-Step",
    country: "Belgium",
    countryCode: "BEL",
    flag: "BEL",
    time: "83h 41' 22\"",
    gap: "+18' 31\"",
  },
  {
    rank: 15,
    name: "Mikel Landa",
    team: "Soudal–Quick-Step",
    country: "Spain",
    countryCode: "ESP",
    flag: "ESP",
    time: "83h 42' 53\"",
    gap: "+20' 02\"",
  },
  {
    rank: 16,
    name: "Thibaut Pinot",
    team: "Groupama–FDJ",
    country: "France",
    countryCode: "FRA",
    flag: "FRA",
    time: "83h 44' 18\"",
    gap: "+21' 27\"",
  },
  {
    rank: 17,
    name: "Eddie Dunbar",
    team: "Team Jayco–AlUla",
    country: "Ireland",
    countryCode: "IRL",
    flag: "IRL",
    time: "83h 45' 39\"",
    gap: "+22' 48\"",
  },
  {
    rank: 18,
    name: "Tobias Halland Johannessen",
    team: "Uno-X Mobility",
    country: "Norway",
    countryCode: "NOR",
    flag: "NOR",
    time: "83h 46' 55\"",
    gap: "+24' 04\"",
  },
  {
    rank: 19,
    name: "Hugh Carthy",
    team: "EF Education–EasyPost",
    country: "Great Britain",
    countryCode: "GBR",
    flag: "GBR",
    time: "83h 48' 12\"",
    gap: "+25' 21\"",
  },
  {
    rank: 20,
    name: "Einer Rubio",
    team: "Movistar Team",
    country: "Colombia",
    countryCode: "COL",
    flag: "COL",
    time: "83h 49' 28\"",
    gap: "+26' 37\"",
  },
];

// Jersey winners
const GIRO_2026_JERSEYS: TdfJerseyLeader[] = [
  {
    jersey: "yellow", // Using yellow as generic GC jersey (actually maglia rosa/pink)
    jerseyName: "Maglia Rosa (General Classification)",
    rider: "Jonas Vingegaard",
    team: "Visma–Lease a Bike",
    country: "Denmark",
    flag: "DEN",
  },
  {
    jersey: "green", // Using green for points (actually maglia ciclamino)
    jerseyName: "Maglia Ciclamino (Points Classification)",
    rider: "Paul Magnier",
    team: "Soudal–Quick-Step",
    country: "France",
    flag: "FRA",
  },
  {
    jersey: "polka-dot", // Mountains classification (actually maglia azzurra)
    jerseyName: "Maglia Azzurra (Mountains Classification)",
    rider: "Giulio Ciccone",
    team: "Lidl–Trek",
    country: "Italy",
    flag: "ITA",
  },
  {
    jersey: "white", // Young rider classification (maglia bianca)
    jerseyName: "Maglia Bianca (Young Rider Classification)",
    rider: "Afonso Eulálio",
    team: "Team Bahrain Victorious",
    country: "Portugal",
    flag: "POR",
  },
];

export async function getGiroSnapshot(): Promise<TdfSnapshot> {
  const giroMetadata = CYCLING_RACES.find((r) => r.id === "giro-2026");
  if (!giroMetadata) {
    throw new Error("Giro 2026 metadata not found");
  }

  // Giro 2026 is COMPLETED - return final results
  return {
    metadata: giroMetadata,
    lastUpdated: new Date().toISOString(),
    raceStatus: "complete",
    stages: [], // Stages data not needed for completed race GC view
    gc: GIRO_2026_FINAL_GC,
    jerseys: GIRO_2026_JERSEYS,
    source: "wikipedia",
  };
}
