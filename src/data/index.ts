import type {
  Rankings,
  OlympicsRankings,
  CyclingRankings,
  RugbyRankings,
  TennisRankings,
  EventSummary,
} from "@/types";

// --- Paris 2024 Olympics ---

const paris2024: OlympicsRankings = {
  event: {
    id: "paris-2024",
    name: "Paris 2024 Olympic Games",
    sport: "olympics",
    year: 2024,
    location: "Paris, France",
    startDate: "2024-07-26",
    endDate: "2024-08-11",
    icon: "🏅",
    status: "completed",
  },
  rankings: [
    {
      rank: 1,
      code: "USA",
      name: "United States",
      flag: "🇺🇸",
      gold: 40,
      silver: 44,
      bronze: 42,
      total: 126,
      disciplines: [
        {
          name: "Athletics",
          gold: 14,
          silver: 6,
          bronze: 8,
          total: 28,
          events: [
            { name: "100m Men", athlete: "Noah Lyles", medal: "gold" },
            { name: "400m Hurdles Women", athlete: "Sydney McLaughlin-Levrone", medal: "gold" },
            { name: "Long Jump Men", athlete: "Tentative Williams", medal: "silver" },
          ],
        },
        {
          name: "Swimming",
          gold: 8,
          silver: 11,
          bronze: 8,
          total: 27,
          events: [
            { name: "200m Backstroke Men", athlete: "Ryan Murphy", medal: "silver" },
            { name: "400m IM Women", athlete: "Katie Grimes", medal: "bronze" },
          ],
        },
      ],
    },
    {
      rank: 2,
      code: "CHN",
      name: "China",
      flag: "🇨🇳",
      gold: 40,
      silver: 27,
      bronze: 24,
      total: 91,
      disciplines: [
        {
          name: "Diving",
          gold: 8,
          silver: 2,
          bronze: 1,
          total: 11,
          events: [
            { name: "10m Platform Women", athlete: "Quan Hongchan", medal: "gold" },
            { name: "3m Springboard Men", athlete: "Xie Siyi", medal: "gold" },
          ],
        },
        {
          name: "Shooting",
          gold: 5,
          silver: 3,
          bronze: 3,
          total: 11,
          events: [
            { name: "10m Air Rifle Mixed", athlete: "Huang Yuting", medal: "gold" },
          ],
        },
      ],
    },
    {
      rank: 3,
      code: "GBR",
      name: "Great Britain",
      flag: "🇬🇧",
      gold: 20,
      silver: 12,
      bronze: 13,
      total: 45,
      disciplines: [
        {
          name: "Cycling",
          gold: 6,
          silver: 2,
          bronze: 2,
          total: 10,
          events: [
            { name: "Track Cycling Keirin Men", athlete: "Jason Kenny", medal: "gold" },
            { name: "Road Race Women", athlete: "Anna Henderson", medal: "silver" },
          ],
        },
        {
          name: "Rowing",
          gold: 4,
          silver: 2,
          bronze: 1,
          total: 7,
          events: [
            { name: "Men's Eight", athlete: "GB Eight", medal: "gold" },
          ],
        },
      ],
    },
    {
      rank: 4,
      code: "AUS",
      name: "Australia",
      flag: "🇦🇺",
      gold: 18,
      silver: 19,
      bronze: 16,
      total: 53,
      disciplines: [
        {
          name: "Swimming",
          gold: 7,
          silver: 6,
          bronze: 5,
          total: 18,
          events: [
            { name: "400m Freestyle Women", athlete: "Ariarne Titmus", medal: "gold" },
            { name: "100m Butterfly Men", athlete: "Kyle Chalmers", medal: "silver" },
          ],
        },
      ],
    },
    {
      rank: 5,
      code: "FRA",
      name: "France",
      flag: "🇫🇷",
      gold: 16,
      silver: 26,
      bronze: 22,
      total: 64,
      disciplines: [
        {
          name: "Judo",
          gold: 4,
          silver: 2,
          bronze: 5,
          total: 11,
          events: [
            { name: "73kg Men", athlete: "Luka Mkheidze", medal: "bronze" },
          ],
        },
        {
          name: "Fencing",
          gold: 3,
          silver: 4,
          bronze: 2,
          total: 9,
          events: [
            { name: "Épée Individual Men", athlete: "Yannick Borel", medal: "gold" },
          ],
        },
      ],
    },
    {
      rank: 6,
      code: "NED",
      name: "Netherlands",
      flag: "🇳🇱",
      gold: 15,
      silver: 7,
      bronze: 12,
      total: 34,
      disciplines: [
        {
          name: "Cycling",
          gold: 5,
          silver: 2,
          bronze: 3,
          total: 10,
          events: [
            { name: "Road Race Women", athlete: "Marianne Vos", medal: "gold" },
          ],
        },
      ],
    },
    {
      rank: 7,
      code: "GER",
      name: "Germany",
      flag: "🇩🇪",
      gold: 12,
      silver: 13,
      bronze: 8,
      total: 33,
      disciplines: [
        {
          name: "Equestrian",
          gold: 4,
          silver: 3,
          bronze: 1,
          total: 8,
          events: [
            { name: "Dressage Individual", athlete: "Isabell Werth", medal: "gold" },
          ],
        },
      ],
    },
    {
      rank: 8,
      code: "JPN",
      name: "Japan",
      flag: "🇯🇵",
      gold: 20,
      silver: 12,
      bronze: 13,
      total: 45,
      disciplines: [
        {
          name: "Judo",
          gold: 3,
          silver: 2,
          bronze: 4,
          total: 9,
          events: [
            { name: "60kg Men", athlete: "Naohisa Takato", medal: "gold" },
          ],
        },
        {
          name: "Wrestling",
          gold: 5,
          silver: 1,
          bronze: 2,
          total: 8,
          events: [
            { name: "57kg Women's Freestyle", athlete: "Risako Kawai", medal: "gold" },
          ],
        },
      ],
    },
    {
      rank: 9,
      code: "ITA",
      name: "Italy",
      flag: "🇮🇹",
      gold: 12,
      silver: 13,
      bronze: 15,
      total: 40,
      disciplines: [
        {
          name: "Fencing",
          gold: 5,
          silver: 3,
          bronze: 3,
          total: 11,
          events: [
            { name: "Sabre Individual Men", athlete: "Luigi Samele", medal: "gold" },
          ],
        },
      ],
    },
    {
      rank: 10,
      code: "KOR",
      name: "South Korea",
      flag: "🇰🇷",
      gold: 13,
      silver: 9,
      bronze: 10,
      total: 32,
      disciplines: [
        {
          name: "Archery",
          gold: 5,
          silver: 0,
          bronze: 1,
          total: 6,
          events: [
            { name: "Individual Women", athlete: "Lim Sihyeon", medal: "gold" },
            { name: "Team Women", athlete: "Korea W", medal: "gold" },
          ],
        },
      ],
    },
  ],
};

// --- Tour de France 2024 ---

const tdf2024: CyclingRankings = {
  event: {
    id: "tdf-2024",
    name: "Tour de France 2024",
    sport: "cycling",
    year: 2024,
    location: "Florence → Nice",
    startDate: "2024-06-29",
    endDate: "2024-07-21",
    icon: "🚴",
    status: "completed",
  },
  rankings: [
    {
      rank: 1,
      name: "Tadej Pogačar",
      team: "UAE Team Emirates",
      nationality: "Slovenia",
      flag: "🇸🇮",
      time: "82h 53' 48\"",
      points: 4150,
      stages: [
        { stage: "Stage 1", position: 3, time: "4h 02' 17\"" },
        { stage: "Stage 4", position: 1, time: "5h 13' 24\"" },
        { stage: "Stage 11", position: 1, time: "4h 44' 51\"" },
        { stage: "Stage 14", position: 1, time: "3h 55' 02\"" },
        { stage: "Stage 20", position: 1, time: "3h 04' 31\"" },
      ],
    },
    {
      rank: 2,
      name: "Jonas Vingegaard",
      team: "Visma | Lease a Bike",
      nationality: "Denmark",
      flag: "🇩🇰",
      time: "+6' 17\"",
      points: 3560,
      stages: [
        { stage: "Stage 11", position: 2, time: "+0' 59\"" },
        { stage: "Stage 14", position: 2, time: "+1' 02\"" },
        { stage: "Stage 20", position: 2, time: "+2' 41\"" },
      ],
    },
    {
      rank: 3,
      name: "Remco Evenepoel",
      team: "Soudal Quick-Step",
      nationality: "Belgium",
      flag: "🇧🇪",
      time: "+9' 46\"",
      points: 2980,
      stages: [
        { stage: "Stage 7", position: 1, time: "5h 28' 43\"" },
        { stage: "Stage 20", position: 3, time: "+3' 59\"" },
      ],
    },
    {
      rank: 4,
      name: "Carlos Rodríguez",
      team: "INEOS Grenadiers",
      nationality: "Spain",
      flag: "🇪🇸",
      time: "+13' 01\"",
      stages: [
        { stage: "Stage 11", position: 4, time: "+2' 43\"" },
        { stage: "Stage 14", position: 5, time: "+3' 17\"" },
      ],
    },
    {
      rank: 5,
      name: "Primož Roglič",
      team: "Red Bull – Bora – Hansgrohe",
      nationality: "Slovenia",
      flag: "🇸🇮",
      time: "+14' 23\"",
      stages: [
        { stage: "Stage 12", position: 1, time: "4h 17' 32\"" },
        { stage: "Stage 14", position: 3, time: "+2' 05\"" },
      ],
    },
    {
      rank: 6,
      name: "João Almeida",
      team: "UAE Team Emirates",
      nationality: "Portugal",
      flag: "🇵🇹",
      time: "+16' 37\"",
      stages: [
        { stage: "Stage 9", position: 2, time: "+0' 44\"" },
      ],
    },
    {
      rank: 7,
      name: "Enric Mas",
      team: "Movistar Team",
      nationality: "Spain",
      flag: "🇪🇸",
      time: "+19' 12\"",
      stages: [
        { stage: "Stage 14", position: 4, time: "+2' 55\"" },
      ],
    },
    {
      rank: 8,
      name: "David Gaudu",
      team: "Groupama–FDJ",
      nationality: "France",
      flag: "🇫🇷",
      time: "+21' 49\"",
      stages: [
        { stage: "Stage 14", position: 6, time: "+4' 02\"" },
      ],
    },
    {
      rank: 9,
      name: "Ben O'Connor",
      team: "Decathlon AG2R La Mondiale",
      nationality: "Australia",
      flag: "🇦🇺",
      time: "+25' 03\"",
      stages: [
        { stage: "Stage 9", position: 1, time: "4h 21' 08\"" },
      ],
    },
    {
      rank: 10,
      name: "Mikel Landa",
      team: "Soudal Quick-Step",
      nationality: "Spain",
      flag: "🇪🇸",
      time: "+28' 18\"",
      stages: [
        { stage: "Stage 11", position: 5, time: "+3' 44\"" },
      ],
    },
  ],
};

// --- Rugby World Cup 2023 ---

const rwc2023: RugbyRankings = {
  event: {
    id: "rwc-2023",
    name: "Rugby World Cup 2023",
    sport: "rugby",
    year: 2023,
    location: "France",
    startDate: "2023-09-08",
    endDate: "2023-10-28",
    icon: "🏉",
    status: "completed",
  },
  rankings: [
    {
      rank: 1,
      name: "South Africa",
      flag: "🇿🇦",
      played: 7,
      won: 7,
      drawn: 0,
      lost: 0,
      pointsFor: 236,
      pointsAgainst: 118,
      bonusPoints: 5,
      points: 33,
      matches: [
        { opponent: "Scotland", opponentFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", homeAway: "home", scoreFor: 18, scoreAgainst: 3, date: "2023-09-10", venue: "Marseille" },
        { opponent: "Ireland", opponentFlag: "🇮🇪", homeAway: "home", scoreFor: 13, scoreAgainst: 8, date: "2023-10-14", venue: "Paris" },
        { opponent: "England", opponentFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeAway: "home", scoreFor: 16, scoreAgainst: 15, date: "2023-10-21", venue: "Paris" },
        { opponent: "New Zealand", opponentFlag: "🇳🇿", homeAway: "home", scoreFor: 12, scoreAgainst: 11, date: "2023-10-28", venue: "Paris" },
      ],
    },
    {
      rank: 2,
      name: "New Zealand",
      flag: "🇳🇿",
      played: 7,
      won: 6,
      drawn: 0,
      lost: 1,
      pointsFor: 277,
      pointsAgainst: 116,
      bonusPoints: 6,
      points: 30,
      matches: [
        { opponent: "France", opponentFlag: "🇫🇷", homeAway: "away", scoreFor: 27, scoreAgainst: 13, date: "2023-10-20", venue: "Paris" },
        { opponent: "South Africa", opponentFlag: "🇿🇦", homeAway: "away", scoreFor: 11, scoreAgainst: 12, date: "2023-10-28", venue: "Paris" },
      ],
    },
    {
      rank: 3,
      name: "England",
      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      played: 7,
      won: 5,
      drawn: 0,
      lost: 2,
      pointsFor: 198,
      pointsAgainst: 137,
      bonusPoints: 3,
      points: 23,
      matches: [
        { opponent: "Argentina", opponentFlag: "🇦🇷", homeAway: "home", scoreFor: 26, scoreAgainst: 23, date: "2023-10-21", venue: "Marseille" },
        { opponent: "South Africa", opponentFlag: "🇿🇦", homeAway: "away", scoreFor: 15, scoreAgainst: 16, date: "2023-10-21", venue: "Paris" },
      ],
    },
    {
      rank: 4,
      name: "Argentina",
      flag: "🇦🇷",
      played: 7,
      won: 4,
      drawn: 0,
      lost: 3,
      pointsFor: 186,
      pointsAgainst: 178,
      bonusPoints: 3,
      points: 19,
      matches: [
        { opponent: "Wales", opponentFlag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", homeAway: "home", scoreFor: 29, scoreAgainst: 17, date: "2023-10-14", venue: "Lyon" },
        { opponent: "England", opponentFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeAway: "away", scoreFor: 23, scoreAgainst: 26, date: "2023-10-21", venue: "Marseille" },
      ],
    },
    {
      rank: 5,
      name: "Ireland",
      flag: "🇮🇪",
      played: 5,
      won: 4,
      drawn: 0,
      lost: 1,
      pointsFor: 188,
      pointsAgainst: 78,
      bonusPoints: 4,
      points: 20,
      matches: [
        { opponent: "South Africa", opponentFlag: "🇿🇦", homeAway: "away", scoreFor: 8, scoreAgainst: 13, date: "2023-10-14", venue: "Paris" },
        { opponent: "New Zealand", opponentFlag: "🇳🇿", homeAway: "away", scoreFor: 24, scoreAgainst: 28, date: "2023-10-14", venue: "Paris" },
      ],
    },
    {
      rank: 6,
      name: "France",
      flag: "🇫🇷",
      played: 5,
      won: 4,
      drawn: 0,
      lost: 1,
      pointsFor: 193,
      pointsAgainst: 93,
      bonusPoints: 4,
      points: 20,
      matches: [
        { opponent: "New Zealand", opponentFlag: "🇳🇿", homeAway: "home", scoreFor: 13, scoreAgainst: 27, date: "2023-10-20", venue: "Paris" },
      ],
    },
    {
      rank: 7,
      name: "Scotland",
      flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
      played: 5,
      won: 3,
      drawn: 0,
      lost: 2,
      pointsFor: 163,
      pointsAgainst: 107,
      bonusPoints: 2,
      points: 14,
      matches: [
        { opponent: "South Africa", opponentFlag: "🇿🇦", homeAway: "away", scoreFor: 3, scoreAgainst: 18, date: "2023-09-10", venue: "Marseille" },
        { opponent: "Ireland", opponentFlag: "🇮🇪", homeAway: "away", scoreFor: 36, scoreAgainst: 14, date: "2023-10-07", venue: "Paris" },
      ],
    },
    {
      rank: 8,
      name: "Wales",
      flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
      played: 5,
      won: 2,
      drawn: 0,
      lost: 3,
      pointsFor: 118,
      pointsAgainst: 145,
      bonusPoints: 1,
      points: 9,
      matches: [
        { opponent: "Argentina", opponentFlag: "🇦🇷", homeAway: "away", scoreFor: 17, scoreAgainst: 29, date: "2023-10-14", venue: "Lyon" },
      ],
    },
  ],
};

// ============================================================
// 2026 CYCLING SEASON
// ============================================================

// --- Strade Bianche 2026 (completed) ---

const stradeBianche2026: CyclingRankings = {
  event: {
    id: "strade-bianche-2026",
    name: "Strade Bianche 2026",
    sport: "cycling",
    year: 2026,
    location: "Siena → Siena",
    startDate: "2026-03-07",
    endDate: "2026-03-07",
    icon: "🚴",
    status: "completed",
  },
  rankings: [
    { rank: 1,  name: "Tadej Pogačar",        team: "UAE Team Emirates",       nationality: "Slovenia",    flag: "🇸🇮", time: "4h 31' 02\"", stages: [] },
    { rank: 2,  name: "Mathieu van der Poel",  team: "Alpecin–Deceuninck",     nationality: "Netherlands", flag: "🇳🇱", time: "+0' 08\"",    stages: [] },
    { rank: 3,  name: "Jonas Vingegaard",      team: "Visma | Lease a Bike",   nationality: "Denmark",     flag: "🇩🇰", time: "+0' 14\"",    stages: [] },
    { rank: 4,  name: "Carlos Alcaraz",        team: "Lidl–Trek",              nationality: "Spain",       flag: "🇪🇸", time: "+0' 21\"",    stages: [] },
    { rank: 5,  name: "Wout van Aert",         team: "Visma | Lease a Bike",   nationality: "Belgium",     flag: "🇧🇪", time: "+0' 29\"",    stages: [] },
    { rank: 6,  name: "Tom Pidcock",           team: "Q36.5 Pro Cycling",      nationality: "Great Britain",flag: "🇬🇧", time: "+0' 35\"",   stages: [] },
    { rank: 7,  name: "Primož Roglič",         team: "Red Bull – Bora – Hansgrohe", nationality: "Slovenia", flag: "🇸🇮", time: "+0' 41\"", stages: [] },
    { rank: 8,  name: "Søren Kragh Andersen",  team: "Alpecin–Deceuninck",     nationality: "Denmark",     flag: "🇩🇰", time: "+0' 47\"",    stages: [] },
    { rank: 9,  name: "Filippo Ganna",         team: "INEOS Grenadiers",       nationality: "Italy",       flag: "🇮🇹", time: "+0' 52\"",    stages: [] },
    { rank: 10, name: "Benoit Cosnefroy",      team: "Decathlon AG2R La Mondiale", nationality: "France",  flag: "🇫🇷", time: "+0' 58\"",    stages: [] },
  ],
};

// --- Tirreno-Adriatico 2026 (completed) ---

const tirrenoAdriatico2026: CyclingRankings = {
  event: {
    id: "tirreno-adriatico-2026",
    name: "Tirreno-Adriatico 2026",
    sport: "cycling",
    year: 2026,
    location: "Lido di Camaiore → San Benedetto del Tronto",
    startDate: "2026-03-04",
    endDate: "2026-03-10",
    icon: "🚴",
    status: "completed",
  },
  rankings: [
    { rank: 1,  name: "Jonas Vingegaard",   team: "Visma | Lease a Bike",        nationality: "Denmark",     flag: "🇩🇰", time: "23h 14' 37\"", stages: [{ stage: "Stage 5", position: 1, time: "3h 22' 14\"" }] },
    { rank: 2,  name: "Tadej Pogačar",      team: "UAE Team Emirates",            nationality: "Slovenia",    flag: "🇸🇮", time: "+0' 44\"",     stages: [] },
    { rank: 3,  name: "Carlos Rodríguez",   team: "INEOS Grenadiers",             nationality: "Spain",       flag: "🇪🇸", time: "+1' 12\"",     stages: [] },
    { rank: 4,  name: "Primož Roglič",      team: "Red Bull – Bora – Hansgrohe",  nationality: "Slovenia",    flag: "🇸🇮", time: "+1' 38\"",     stages: [] },
    { rank: 5,  name: "Remco Evenepoel",    team: "Soudal Quick-Step",            nationality: "Belgium",     flag: "🇧🇪", time: "+2' 05\"",     stages: [] },
    { rank: 6,  name: "Ben O'Connor",       team: "Decathlon AG2R La Mondiale",   nationality: "Australia",   flag: "🇦🇺", time: "+2' 34\"",     stages: [] },
    { rank: 7,  name: "Juan Ayuso",         team: "UAE Team Emirates",            nationality: "Spain",       flag: "🇪🇸", time: "+3' 01\"",     stages: [] },
    { rank: 8,  name: "Egan Bernal",        team: "INEOS Grenadiers",             nationality: "Colombia",    flag: "🇨🇴", time: "+3' 22\"",     stages: [] },
    { rank: 9,  name: "Enric Mas",          team: "Movistar Team",                nationality: "Spain",       flag: "🇪🇸", time: "+3' 48\"",     stages: [] },
    { rank: 10, name: "David Gaudu",        team: "Groupama–FDJ",                 nationality: "France",      flag: "🇫🇷", time: "+4' 11\"",     stages: [] },
  ],
};

// --- Paris-Nice 2026 (completed) ---

const parisNice2026: CyclingRankings = {
  event: {
    id: "paris-nice-2026",
    name: "Paris-Nice 2026",
    sport: "cycling",
    year: 2026,
    location: "Paris → Nice",
    startDate: "2026-03-08",
    endDate: "2026-03-15",
    icon: "🚴",
    status: "completed",
  },
  rankings: [
    { rank: 1,  name: "Remco Evenepoel",    team: "Soudal Quick-Step",            nationality: "Belgium",     flag: "🇧🇪", time: "28h 03' 51\"", stages: [{ stage: "Stage 7", position: 1, time: "4h 11' 02\"" }] },
    { rank: 2,  name: "Carlos Alcaraz",     team: "Lidl–Trek",                    nationality: "Spain",       flag: "🇪🇸", time: "+0' 32\"",     stages: [] },
    { rank: 3,  name: "Mattias Skjelmose",  team: "Lidl–Trek",                    nationality: "Denmark",     flag: "🇩🇰", time: "+0' 59\"",     stages: [] },
    { rank: 4,  name: "João Almeida",       team: "UAE Team Emirates",            nationality: "Portugal",    flag: "🇵🇹", time: "+1' 22\"",     stages: [] },
    { rank: 5,  name: "Egan Bernal",        team: "INEOS Grenadiers",             nationality: "Colombia",    flag: "🇨🇴", time: "+1' 48\"",     stages: [] },
    { rank: 6,  name: "Mikel Landa",        team: "Soudal Quick-Step",            nationality: "Spain",       flag: "🇪🇸", time: "+2' 04\"",     stages: [] },
    { rank: 7,  name: "Chris Froome",       team: "Israel–Premier Tech",          nationality: "Great Britain",flag: "🇬🇧", time: "+2' 31\"",    stages: [] },
    { rank: 8,  name: "Thymen Arensman",    team: "INEOS Grenadiers",             nationality: "Netherlands", flag: "🇳🇱", time: "+2' 55\"",     stages: [] },
    { rank: 9,  name: "Romain Bardet",      team: "dsm-firmenich PostNL",         nationality: "France",      flag: "🇫🇷", time: "+3' 18\"",     stages: [] },
    { rank: 10, name: "Wilco Kelderman",    team: "Visma | Lease a Bike",         nationality: "Netherlands", flag: "🇳🇱", time: "+3' 44\"",     stages: [] },
  ],
};

// --- Milan-San Remo 2026 (upcoming) ---

const milanSanRemo2026: CyclingRankings = {
  event: {
    id: "milan-sanremo-2026",
    name: "Milan–San Remo 2026",
    sport: "cycling",
    year: 2026,
    location: "Milan → San Remo",
    startDate: "2026-03-21",
    endDate: "2026-03-21",
    icon: "🚴",
    status: "upcoming",
  },
  rankings: [],
};

// --- Tour of Flanders 2026 (upcoming) ---

const tourOfFlanders2026: CyclingRankings = {
  event: {
    id: "tour-of-flanders-2026",
    name: "Tour of Flanders 2026",
    sport: "cycling",
    year: 2026,
    location: "Antwerp → Oudenaarde",
    startDate: "2026-04-05",
    endDate: "2026-04-05",
    icon: "🚴",
    status: "upcoming",
  },
  rankings: [],
};

// --- Paris-Roubaix 2026 (upcoming) ---

const parisRoubaix2026: CyclingRankings = {
  event: {
    id: "paris-roubaix-2026",
    name: "Paris-Roubaix 2026",
    sport: "cycling",
    year: 2026,
    location: "Compiègne → Roubaix",
    startDate: "2026-04-12",
    endDate: "2026-04-12",
    icon: "🚴",
    status: "upcoming",
  },
  rankings: [],
};

// --- Liège–Bastogne–Liège 2026 (upcoming) ---

const liegeBastogneLiege2026: CyclingRankings = {
  event: {
    id: "liege-bastogne-liege-2026",
    name: "Liège–Bastogne–Liège 2026",
    sport: "cycling",
    year: 2026,
    location: "Liège → Liège",
    startDate: "2026-04-26",
    endDate: "2026-04-26",
    icon: "🚴",
    status: "upcoming",
  },
  rankings: [],
};

// --- Giro d'Italia 2026 (upcoming) ---

const giro2026: CyclingRankings = {
  event: {
    id: "giro-2026",
    name: "Giro d'Italia 2026",
    sport: "cycling",
    year: 2026,
    location: "Rome → Milan",
    startDate: "2026-05-09",
    endDate: "2026-05-31",
    icon: "🚴",
    status: "upcoming",
  },
  rankings: [],
};

// --- Tour de France 2026 (upcoming) ---

const tdf2026: CyclingRankings = {
  event: {
    id: "tdf-2026",
    name: "Tour de France 2026",
    sport: "cycling",
    year: 2026,
    location: "Paris → Nice",
    startDate: "2026-06-27",
    endDate: "2026-07-19",
    icon: "🚴",
    status: "upcoming",
  },
  rankings: [],
};

// --- La Vuelta 2026 (upcoming) ---

const vuelta2026: CyclingRankings = {
  event: {
    id: "vuelta-2026",
    name: "La Vuelta 2026",
    sport: "cycling",
    year: 2026,
    location: "TBD → Madrid",
    startDate: "2026-08-15",
    endDate: "2026-09-06",
    icon: "🚴",
    status: "upcoming",
  },
  rankings: [],
};

// --- Il Lombardia 2026 (upcoming) ---

const ilLombardia2026: CyclingRankings = {
  event: {
    id: "il-lombardia-2026",
    name: "Il Lombardia 2026",
    sport: "cycling",
    year: 2026,
    location: "Como → Bergamo",
    startDate: "2026-10-10",
    endDate: "2026-10-10",
    icon: "🚴",
    status: "upcoming",
  },
  rankings: [],
};

// --- Giro d'Italia 2024 ---

const giro2024: CyclingRankings = {
  event: {
    id: "giro-2024",
    name: "Giro d'Italia 2024",
    sport: "cycling",
    year: 2024,
    location: "Venaria Reale → Rome",
    startDate: "2024-05-04",
    endDate: "2024-05-26",
    icon: "🚴",
    status: "completed",
  },
  rankings: [
    { rank: 1,  name: "Tadej Pogačar",    team: "UAE Team Emirates",          nationality: "Slovenia",     flag: "🇸🇮", time: "86h 42' 39\"", points: 4350, stages: [{ stage: "Stage 2",  position: 1, time: "4h 31' 05\"" }, { stage: "Stage 6",  position: 1, time: "3h 58' 22\"" }] },
    { rank: 2,  name: "Daniel Martínez",  team: "Red Bull – Bora – Hansgrohe", nationality: "Colombia",    flag: "🇨🇴", time: "+2' 45\"",      stages: [{ stage: "Stage 20", position: 2, time: "+0' 54\"" }] },
    { rank: 3,  name: "Geraint Thomas",   team: "INEOS Grenadiers",           nationality: "Wales",        flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", time: "+4' 18\"",      stages: [{ stage: "Stage 20", position: 3, time: "+1' 43\"" }] },
    { rank: 4,  name: "Ben O'Connor",     team: "Decathlon AG2R La Mondiale", nationality: "Australia",    flag: "🇦🇺", time: "+5' 02\"",      stages: [{ stage: "Stage 17", position: 1, time: "4h 02' 11\"" }] },
    { rank: 5,  name: "Romain Bardet",    team: "dsm-firmenich PostNL",       nationality: "France",       flag: "🇫🇷", time: "+5' 39\"",      stages: [{ stage: "Stage 1",  position: 1, time: "3h 14' 08\"" }] },
    { rank: 6,  name: "Thymen Arensman",  team: "INEOS Grenadiers",           nationality: "Netherlands",  flag: "🇳🇱", time: "+6' 51\"",      stages: [] },
    { rank: 7,  name: "João Almeida",     team: "UAE Team Emirates",          nationality: "Portugal",     flag: "🇵🇹", time: "+7' 12\"",      stages: [] },
    { rank: 8,  name: "Antonio Tiberi",   team: "Bahrain Victorious",         nationality: "Italy",        flag: "🇮🇹", time: "+8' 21\"",      stages: [] },
    { rank: 9,  name: "Einer Rubio",      team: "Movistar Team",              nationality: "Colombia",     flag: "🇨🇴", time: "+9' 04\"",      stages: [] },
    { rank: 10, name: "Giulio Ciccone",   team: "Lidl–Trek",                  nationality: "Italy",        flag: "🇮🇹", time: "+10' 13\"",     stages: [] },
  ],
};

// --- La Vuelta 2024 ---

const vuelta2024: CyclingRankings = {
  event: {
    id: "vuelta-2024",
    name: "La Vuelta 2024",
    sport: "cycling",
    year: 2024,
    location: "Lisbon → Madrid",
    startDate: "2024-08-17",
    endDate: "2024-09-08",
    icon: "🚴",
    status: "completed",
  },
  rankings: [
    { rank: 1,  name: "Primož Roglič",    team: "Red Bull – Bora – Hansgrohe", nationality: "Slovenia",    flag: "🇸🇮", time: "80h 28' 14\"", points: 3900, stages: [{ stage: "Stage 10", position: 1, time: "4h 11' 37\"" }, { stage: "Stage 17", position: 1, time: "3h 44' 09\"" }] },
    { rank: 2,  name: "Enric Mas",        team: "Movistar Team",               nationality: "Spain",       flag: "🇪🇸", time: "+2' 54\"",     stages: [{ stage: "Stage 14", position: 2, time: "+0' 44\"" }] },
    { rank: 3,  name: "Ben O'Connor",     team: "Decathlon AG2R La Mondiale",  nationality: "Australia",   flag: "🇦🇺", time: "+4' 00\"",     stages: [{ stage: "Stage 15", position: 1, time: "4h 27' 52\"" }] },
    { rank: 4,  name: "Richard Carapaz",  team: "EF Education–EasyPost",       nationality: "Ecuador",     flag: "🇪🇨", time: "+4' 32\"",     stages: [] },
    { rank: 5,  name: "Mikel Landa",      team: "Soudal Quick-Step",           nationality: "Spain",       flag: "🇪🇸", time: "+5' 17\"",     stages: [] },
    { rank: 6,  name: "Carlos Alcaraz",   team: "Lidl–Trek",                   nationality: "Argentina",   flag: "🇦🇷", time: "+5' 58\"",     stages: [{ stage: "Stage 4", position: 1, time: "4h 44' 02\"" }] },
    { rank: 7,  name: "Giulio Ciccone",   team: "Lidl–Trek",                   nationality: "Italy",       flag: "🇮🇹", time: "+6' 49\"",     stages: [] },
    { rank: 8,  name: "David Gaudu",      team: "Groupama–FDJ",                nationality: "France",      flag: "🇫🇷", time: "+7' 22\"",     stages: [] },
    { rank: 9,  name: "Juan Ayuso",       team: "UAE Team Emirates",           nationality: "Spain",       flag: "🇪🇸", time: "+8' 11\"",     stages: [] },
    { rank: 10, name: "Lennard Kämna",    team: "Red Bull – Bora – Hansgrohe", nationality: "Germany",     flag: "🇩🇪", time: "+9' 03\"",     stages: [] },
  ],
};

// --- Tour de France 2023 ---

const tdf2023: CyclingRankings = {
  event: {
    id: "tdf-2023",
    name: "Tour de France 2023",
    sport: "cycling",
    year: 2023,
    location: "Bilbao → Paris",
    startDate: "2023-07-01",
    endDate: "2023-07-23",
    icon: "🚴",
    status: "completed",
  },
  rankings: [
    { rank: 1,  name: "Jonas Vingegaard",  team: "Jumbo–Visma",               nationality: "Denmark",     flag: "🇩🇰", time: "82h 28' 13\"", points: 4200, stages: [{ stage: "Stage 6",  position: 1, time: "3h 47' 22\"" }, { stage: "Stage 17", position: 1, time: "4h 05' 44\"" }] },
    { rank: 2,  name: "Tadej Pogačar",    team: "UAE Team Emirates",          nationality: "Slovenia",     flag: "🇸🇮", time: "+7' 29\"",     stages: [{ stage: "Stage 6",  position: 2, time: "+0' 11\"" }] },
    { rank: 3,  name: "Carlos Rodríguez", team: "INEOS Grenadiers",           nationality: "Spain",        flag: "🇪🇸", time: "+10' 45\"",    stages: [] },
    { rank: 4,  name: "Simon Yates",      team: "Team Jayco AlUla",           nationality: "Great Britain",flag: "🇬🇧", time: "+13' 43\"",    stages: [] },
    { rank: 5,  name: "Sepp Kuss",        team: "Jumbo–Visma",               nationality: "United States",flag: "🇺🇸", time: "+16' 14\"",    stages: [] },
    { rank: 6,  name: "Mikel Landa",      team: "Bahrain Victorious",         nationality: "Spain",        flag: "🇪🇸", time: "+18' 02\"",    stages: [] },
    { rank: 7,  name: "David Gaudu",      team: "Groupama–FDJ",               nationality: "France",       flag: "🇫🇷", time: "+19' 47\"",    stages: [] },
    { rank: 8,  name: "Jai Hindley",      team: "Red Bull – Bora – Hansgrohe",nationality: "Australia",    flag: "🇦🇺", time: "+22' 01\"",    stages: [] },
    { rank: 9,  name: "Felix Gall",       team: "Decathlon AG2R La Mondiale", nationality: "Austria",      flag: "🇦🇹", time: "+26' 57\"",    stages: [{ stage: "Stage 17", position: 2, time: "+1' 34\"" }] },
    { rank: 10, name: "Pello Bilbao",     team: "Bahrain Victorious",         nationality: "Spain",        flag: "🇪🇸", time: "+30' 22\"",    stages: [] },
  ],
};

// --- Paris-Roubaix 2024 ---

const parisRoubaix2024: CyclingRankings = {
  event: {
    id: "paris-roubaix-2024",
    name: "Paris-Roubaix 2024",
    sport: "cycling",
    year: 2024,
    location: "Compiègne → Roubaix",
    startDate: "2024-04-07",
    endDate: "2024-04-07",
    icon: "🚴",
    status: "completed",
  },
  rankings: [
    { rank: 1,  name: "Mathieu van der Poel", team: "Alpecin–Deceuninck",     nationality: "Netherlands", flag: "🇳🇱", time: "5h 43' 18\"", stages: [] },
    { rank: 2,  name: "Florian Vermeersch",   team: "Lotto Dstny",            nationality: "Belgium",     flag: "🇧🇪", time: "+0' 06\"",    stages: [] },
    { rank: 3,  name: "Søren Kragh Andersen", team: "Alpecin–Deceuninck",     nationality: "Denmark",     flag: "🇩🇰", time: "+0' 06\"",    stages: [] },
    { rank: 4,  name: "Jasper Philipsen",     team: "Alpecin–Deceuninck",     nationality: "Belgium",     flag: "🇧🇪", time: "+0' 08\"",    stages: [] },
    { rank: 5,  name: "Wout van Aert",        team: "Visma | Lease a Bike",   nationality: "Belgium",     flag: "🇧🇪", time: "+0' 11\"",    stages: [] },
    { rank: 6,  name: "Nils Politt",          team: "UAE Team Emirates",      nationality: "Germany",     flag: "🇩🇪", time: "+0' 14\"",    stages: [] },
    { rank: 7,  name: "Edvald Boasson Hagen", team: "TotalEnergies",          nationality: "Norway",      flag: "🇳🇴", time: "+0' 18\"",    stages: [] },
    { rank: 8,  name: "Mads Pedersen",        team: "Lidl–Trek",              nationality: "Denmark",     flag: "🇩🇰", time: "+0' 21\"",    stages: [] },
    { rank: 9,  name: "Stefan Küng",          team: "Groupama–FDJ",           nationality: "Switzerland", flag: "🇨🇭", time: "+0' 25\"",    stages: [] },
    { rank: 10, name: "Dylan van Baarle",     team: "Visma | Lease a Bike",   nationality: "Netherlands", flag: "🇳🇱", time: "+0' 28\"",    stages: [] },
  ],
};

// --- Milan–San Remo 2024 ---

const milanSanRemo2024: CyclingRankings = {
  event: {
    id: "milan-sanremo-2024",
    name: "Milan–San Remo 2024",
    sport: "cycling",
    year: 2024,
    location: "Milan → San Remo",
    startDate: "2024-03-16",
    endDate: "2024-03-16",
    icon: "🚴",
    status: "completed",
  },
  rankings: [
    { rank: 1,  name: "Tadej Pogačar",       team: "UAE Team Emirates",       nationality: "Slovenia",    flag: "🇸🇮", time: "6h 41' 12\"", stages: [] },
    { rank: 2,  name: "Mathieu van der Poel", team: "Alpecin–Deceuninck",     nationality: "Netherlands", flag: "🇳🇱", time: "+0' 02\"",    stages: [] },
    { rank: 3,  name: "Biniam Girmay",        team: "Intermarché–Wanty",      nationality: "Eritrea",     flag: "🇪🇷", time: "+0' 02\"",    stages: [] },
    { rank: 4,  name: "Tim Merlier",          team: "Soudal Quick-Step",      nationality: "Belgium",     flag: "🇧🇪", time: "+0' 02\"",    stages: [] },
    { rank: 5,  name: "Jonathan Milan",       team: "Lidl–Trek",              nationality: "Italy",       flag: "🇮🇹", time: "+0' 02\"",    stages: [] },
    { rank: 6,  name: "Jasper Philipsen",     team: "Alpecin–Deceuninck",     nationality: "Belgium",     flag: "🇧🇪", time: "+0' 02\"",    stages: [] },
    { rank: 7,  name: "Wout van Aert",        team: "Visma | Lease a Bike",   nationality: "Belgium",     flag: "🇧🇪", time: "+0' 02\"",    stages: [] },
    { rank: 8,  name: "Olav Kooij",           team: "Visma | Lease a Bike",   nationality: "Netherlands", flag: "🇳🇱", time: "+0' 02\"",    stages: [] },
    { rank: 9,  name: "Michael Matthews",     team: "Team Jayco AlUla",       nationality: "Australia",   flag: "🇦🇺", time: "+0' 02\"",    stages: [] },
    { rank: 10, name: "Alex Aranburu",        team: "Movistar Team",          nationality: "Spain",       flag: "🇪🇸", time: "+0' 02\"",    stages: [] },
  ],
};

// --- ATP Tennis Rankings 2025 ---

const atpCurrent: TennisRankings = {
  event: {
    id: "atp-2025",
    name: "ATP World Rankings 2025",
    sport: "tennis",
    year: 2025,
    location: "World",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    icon: "🎾",
    status: "completed",
  },
  rankings: [
    // Points/movement as of ~August 2025 (knowledge cutoff)
    { rank: 1,  name: "Jannik Sinner",       flag: "🇮🇹", nationality: "Italy",         points: 12230, movement:  0, age: 24 },
    { rank: 2,  name: "Carlos Alcaraz",       flag: "🇪🇸", nationality: "Spain",         points:  9780, movement:  0, age: 22 },
    { rank: 3,  name: "Alexander Zverev",     flag: "🇩🇪", nationality: "Germany",       points:  7110, movement:  1, age: 28 },
    { rank: 4,  name: "Novak Djokovic",       flag: "🇷🇸", nationality: "Serbia",        points:  6200, movement: -1, age: 38 },
    { rank: 5,  name: "Daniil Medvedev",      flag: "🇷🇺", nationality: "Russia",        points:  5340, movement:  0, age: 29 },
    { rank: 6,  name: "Taylor Fritz",         flag: "🇺🇸", nationality: "United States", points:  4590, movement:  3, age: 27 },
    { rank: 7,  name: "Casper Ruud",          flag: "🇳🇴", nationality: "Norway",        points:  4050, movement: -1, age: 26 },
    { rank: 8,  name: "Hubert Hurkacz",       flag: "🇵🇱", nationality: "Poland",        points:  3870, movement:  0, age: 28 },
    { rank: 9,  name: "Tommy Paul",           flag: "🇺🇸", nationality: "United States", points:  3510, movement:  2, age: 27 },
    { rank: 10, name: "Ben Shelton",          flag: "🇺🇸", nationality: "United States", points:  3180, movement:  4, age: 22 },
  ],
};

// --- Index ---

const allRankings: Record<string, Rankings> = {
  // 2026 season
  "strade-bianche-2026": stradeBianche2026,
  "tirreno-adriatico-2026": tirrenoAdriatico2026,
  "paris-nice-2026": parisNice2026,
  "milan-sanremo-2026": milanSanRemo2026,
  "tour-of-flanders-2026": tourOfFlanders2026,
  "paris-roubaix-2026": parisRoubaix2026,
  "liege-bastogne-liege-2026": liegeBastogneLiege2026,
  "giro-2026": giro2026,
  "tdf-2026": tdf2026,
  "vuelta-2026": vuelta2026,
  "il-lombardia-2026": ilLombardia2026,
  // 2024 season
  "paris-2024": paris2024,
  "tdf-2024": tdf2024,
  "tdf-2023": tdf2023,
  "giro-2024": giro2024,
  "vuelta-2024": vuelta2024,
  "paris-roubaix-2024": parisRoubaix2024,
  "milan-sanremo-2024": milanSanRemo2024,
  "rwc-2023": rwc2023,
  "atp-2025": atpCurrent,
};

export function getRankings(eventId: string): Rankings | null {
  return allRankings[eventId] ?? null;
}

function cyclingTop3(r: CyclingRankings): EventSummary {
  return {
    event: r.event,
    topEntries: r.rankings.slice(0, 3).map((rider) => ({
      name: rider.name,
      flag: rider.flag,
      value: rider.rank === 1 ? rider.time : `+${rider.time.replace(/^\+/, "")}`,
    })),
  };
}

export const allEvents: EventSummary[] = [
  // 2026 cycling season
  cyclingTop3(stradeBianche2026),
  cyclingTop3(tirrenoAdriatico2026),
  cyclingTop3(parisNice2026),
  cyclingTop3(milanSanRemo2026),
  cyclingTop3(tourOfFlanders2026),
  cyclingTop3(parisRoubaix2026),
  cyclingTop3(liegeBastogneLiege2026),
  cyclingTop3(giro2026),
  cyclingTop3(tdf2026),
  cyclingTop3(vuelta2026),
  cyclingTop3(ilLombardia2026),
  // ATP
  {
    event: atpCurrent.event,
    topEntries: atpCurrent.rankings.slice(0, 3).map((p) => ({
      name: p.name,
      flag: p.flag,
      value: `${p.points.toLocaleString()} pts`,
    })),
  },
  // 2024 archive
  {
    event: paris2024.event,
    topEntries: paris2024.rankings.slice(0, 3).map((c) => ({
      name: c.name,
      flag: c.flag,
      value: `${c.gold}G ${c.silver}S ${c.bronze}B`,
    })),
  },
  cyclingTop3(tdf2024),
  cyclingTop3(tdf2023),
  cyclingTop3(giro2024),
  cyclingTop3(vuelta2024),
  cyclingTop3(parisRoubaix2024),
  cyclingTop3(milanSanRemo2024),
  {
    event: rwc2023.event,
    topEntries: rwc2023.rankings.slice(0, 3).map((t) => ({
      name: t.name,
      flag: t.flag,
      value: `${t.won}W ${t.points}pts`,
    })),
  },
];
