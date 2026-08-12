import type { AtpLivePlayer, AtpLiveSnapshot, AtpTournamentStatus } from "@/types";

// ATP rankings as published Monday, June 8, 2026 (mock).
// Grass season week 1: BOSS Open (Stuttgart, ATP 250) and Libema Open
// ('s-Hertogenbosch, ATP 250) are in progress.

interface BasePlayer {
  officialRank: number;
  name: string;
  countryCode: string;
  flag: string;
  age: number;
  officialPoints: number;
  careerHigh: number;
  dropping: number;
  tournament?: AtpTournamentStatus;
}

const STUTTGART = "Stuttgart";
const DEN_BOSCH = "'s-Hertogenbosch";

function entered(name: string): AtpTournamentStatus {
  return { name, round: "R32", active: true };
}

const basePlayers: BasePlayer[] = [
  { officialRank: 1,  name: "Jannik Sinner",            countryCode: "ITA", flag: "🇮🇹", age: 24, officialPoints: 11830, careerHigh: 1,  dropping: 0 },
  { officialRank: 2,  name: "Carlos Alcaraz",           countryCode: "ESP", flag: "🇪🇸", age: 23, officialPoints: 11540, careerHigh: 1,  dropping: 0 },
  { officialRank: 3,  name: "Alexander Zverev",         countryCode: "GER", flag: "🇩🇪", age: 29, officialPoints: 6885,  careerHigh: 2,  dropping: 50,  tournament: entered(STUTTGART) },
  { officialRank: 4,  name: "Jack Draper",              countryCode: "GBR", flag: "🇬🇧", age: 24, officialPoints: 5930,  careerHigh: 4,  dropping: 25,  tournament: entered(STUTTGART) },
  { officialRank: 5,  name: "Novak Djokovic",           countryCode: "SRB", flag: "🇷🇸", age: 39, officialPoints: 5630,  careerHigh: 1,  dropping: 0 },
  { officialRank: 6,  name: "Lorenzo Musetti",          countryCode: "ITA", flag: "🇮🇹", age: 24, officialPoints: 4840,  careerHigh: 6,  dropping: 100 },
  { officialRank: 7,  name: "Taylor Fritz",             countryCode: "USA", flag: "🇺🇸", age: 28, officialPoints: 4735,  careerHigh: 4,  dropping: 250, tournament: entered(STUTTGART) },
  { officialRank: 8,  name: "Alex de Minaur",           countryCode: "AUS", flag: "🇦🇺", age: 27, officialPoints: 4245,  careerHigh: 6,  dropping: 165, tournament: entered(DEN_BOSCH) },
  { officialRank: 9,  name: "Holger Rune",              countryCode: "DEN", flag: "🇩🇰", age: 23, officialPoints: 3855,  careerHigh: 4,  dropping: 0,   tournament: entered(STUTTGART) },
  { officialRank: 10, name: "Daniil Medvedev",          countryCode: "RUS", flag: "🇷🇺", age: 30, officialPoints: 3590,  careerHigh: 1,  dropping: 50,  tournament: entered(DEN_BOSCH) },
  { officialRank: 11, name: "Ben Shelton",              countryCode: "USA", flag: "🇺🇸", age: 23, officialPoints: 3470,  careerHigh: 9,  dropping: 100, tournament: entered(STUTTGART) },
  { officialRank: 12, name: "Tommy Paul",               countryCode: "USA", flag: "🇺🇸", age: 29, officialPoints: 3245,  careerHigh: 9,  dropping: 0 },
  { officialRank: 13, name: "Casper Ruud",              countryCode: "NOR", flag: "🇳🇴", age: 27, officialPoints: 3130,  careerHigh: 2,  dropping: 0 },
  { officialRank: 14, name: "Andrey Rublev",            countryCode: "RUS", flag: "🇷🇺", age: 28, officialPoints: 2980,  careerHigh: 5,  dropping: 25,  tournament: entered(DEN_BOSCH) },
  { officialRank: 15, name: "Jakub Mensik",             countryCode: "CZE", flag: "🇨🇿", age: 20, officialPoints: 2865,  careerHigh: 15, dropping: 0,   tournament: entered(DEN_BOSCH) },
  { officialRank: 16, name: "Tomas Machac",             countryCode: "CZE", flag: "🇨🇿", age: 25, officialPoints: 2710,  careerHigh: 16, dropping: 13 },
  { officialRank: 17, name: "Francisco Cerundolo",      countryCode: "ARG", flag: "🇦🇷", age: 27, officialPoints: 2585,  careerHigh: 17, dropping: 0 },
  { officialRank: 18, name: "Karen Khachanov",          countryCode: "RUS", flag: "🇷🇺", age: 30, officialPoints: 2460,  careerHigh: 8,  dropping: 50,  tournament: entered(DEN_BOSCH) },
  { officialRank: 19, name: "Frances Tiafoe",           countryCode: "USA", flag: "🇺🇸", age: 28, officialPoints: 2390,  careerHigh: 10, dropping: 100, tournament: entered(STUTTGART) },
  { officialRank: 20, name: "Alexei Popyrin",           countryCode: "AUS", flag: "🇦🇺", age: 26, officialPoints: 2280,  careerHigh: 19, dropping: 0 },
  { officialRank: 21, name: "Ugo Humbert",              countryCode: "FRA", flag: "🇫🇷", age: 27, officialPoints: 2205,  careerHigh: 13, dropping: 165, tournament: entered(DEN_BOSCH) },
  { officialRank: 22, name: "Jiri Lehecka",             countryCode: "CZE", flag: "🇨🇿", age: 24, officialPoints: 2150,  careerHigh: 22, dropping: 25,  tournament: entered(STUTTGART) },
  { officialRank: 23, name: "Arthur Fils",              countryCode: "FRA", flag: "🇫🇷", age: 22, officialPoints: 2085,  careerHigh: 20, dropping: 0 },
  { officialRank: 24, name: "Grigor Dimitrov",          countryCode: "BUL", flag: "🇧🇬", age: 35, officialPoints: 1990,  careerHigh: 3,  dropping: 50,  tournament: entered(STUTTGART) },
  { officialRank: 25, name: "Alejandro Davidovich Fokina", countryCode: "ESP", flag: "🇪🇸", age: 27, officialPoints: 1920, careerHigh: 21, dropping: 0, tournament: entered(DEN_BOSCH) },
  { officialRank: 26, name: "Matteo Berrettini",        countryCode: "ITA", flag: "🇮🇹", age: 30, officialPoints: 1855,  careerHigh: 6,  dropping: 250, tournament: entered(STUTTGART) },
  { officialRank: 27, name: "Felix Auger-Aliassime",    countryCode: "CAN", flag: "🇨🇦", age: 25, officialPoints: 1790,  careerHigh: 6,  dropping: 13,  tournament: entered(STUTTGART) },
  { officialRank: 28, name: "Alex Michelsen",           countryCode: "USA", flag: "🇺🇸", age: 21, officialPoints: 1720,  careerHigh: 28, dropping: 0,   tournament: entered(DEN_BOSCH) },
  { officialRank: 29, name: "Alexander Bublik",         countryCode: "KAZ", flag: "🇰🇿", age: 29, officialPoints: 1675,  careerHigh: 17, dropping: 165, tournament: entered(DEN_BOSCH) },
  { officialRank: 30, name: "Tallon Griekspoor",        countryCode: "NED", flag: "🇳🇱", age: 29, officialPoints: 1610,  careerHigh: 21, dropping: 100, tournament: entered(DEN_BOSCH) },
  { officialRank: 31, name: "Stefanos Tsitsipas",       countryCode: "GRE", flag: "🇬🇷", age: 27, officialPoints: 1565,  careerHigh: 3,  dropping: 0 },
  { officialRank: 32, name: "Sebastian Korda",          countryCode: "USA", flag: "🇺🇸", age: 25, officialPoints: 1510,  careerHigh: 15, dropping: 50,  tournament: entered(DEN_BOSCH) },
  { officialRank: 33, name: "Denis Shapovalov",         countryCode: "CAN", flag: "🇨🇦", age: 27, officialPoints: 1460,  careerHigh: 10, dropping: 0,   tournament: entered(STUTTGART) },
  { officialRank: 34, name: "Lorenzo Sonego",           countryCode: "ITA", flag: "🇮🇹", age: 31, officialPoints: 1415,  careerHigh: 21, dropping: 25 },
  { officialRank: 35, name: "Flavio Cobolli",           countryCode: "ITA", flag: "🇮🇹", age: 24, officialPoints: 1380,  careerHigh: 32, dropping: 0,   tournament: entered(STUTTGART) },
  { officialRank: 36, name: "Joao Fonseca",             countryCode: "BRA", flag: "🇧🇷", age: 19, officialPoints: 1345,  careerHigh: 36, dropping: 0,   tournament: entered(DEN_BOSCH) },
  { officialRank: 37, name: "Giovanni Mpetshi Perricard", countryCode: "FRA", flag: "🇫🇷", age: 22, officialPoints: 1305, careerHigh: 30, dropping: 250, tournament: entered(STUTTGART) },
  { officialRank: 38, name: "Brandon Nakashima",        countryCode: "USA", flag: "🇺🇸", age: 24, officialPoints: 1270,  careerHigh: 36, dropping: 13,  tournament: entered(DEN_BOSCH) },
  { officialRank: 39, name: "Jordan Thompson",          countryCode: "AUS", flag: "🇦🇺", age: 32, officialPoints: 1230,  careerHigh: 26, dropping: 50,  tournament: entered(DEN_BOSCH) },
  { officialRank: 40, name: "Luciano Darderi",          countryCode: "ITA", flag: "🇮🇹", age: 24, officialPoints: 1195,  careerHigh: 32, dropping: 0 },
  // Ranks 41-100 to ensure pagination works even with UTS down
  { officialRank: 41, name: "Miomir Kecmanovic",        countryCode: "SRB", flag: "🇷🇸", age: 26, officialPoints: 1160,  careerHigh: 27, dropping: 0 },
  { officialRank: 42, name: "Botic van de Zandschulp", countryCode: "NED", flag: "🇳🇱", age: 30, officialPoints: 1125,  careerHigh: 22, dropping: 50 },
  { officialRank: 43, name: "Alexander Shevchenko",     countryCode: "KAZ", flag: "🇰🇿", age: 23, officialPoints: 1090,  careerHigh: 43, dropping: 0 },
  { officialRank: 44, name: "Mariano Navone",           countryCode: "ARG", flag: "🇦🇷", age: 24, officialPoints: 1055,  careerHigh: 36, dropping: 25 },
  { officialRank: 45, name: "Nuno Borges",              countryCode: "POR", flag: "🇵🇹", age: 28, officialPoints: 1020,  careerHigh: 42, dropping: 0 },
  { officialRank: 46, name: "Zhizhen Zhang",            countryCode: "CHN", flag: "🇨🇳", age: 29, officialPoints: 990,   careerHigh: 40, dropping: 13 },
  { officialRank: 47, name: "Cameron Norrie",           countryCode: "GBR", flag: "🇬🇧", age: 30, officialPoints: 960,   careerHigh: 8,  dropping: 100 },
  { officialRank: 48, name: "Pavel Kotov",              countryCode: "RUS", flag: "🇷🇺", age: 27, officialPoints: 935,   careerHigh: 42, dropping: 0 },
  { officialRank: 49, name: "Taro Daniel",              countryCode: "JPN", flag: "🇯🇵", age: 33, officialPoints: 910,   careerHigh: 47, dropping: 25 },
  { officialRank: 50, name: "Jaume Munar",              countryCode: "ESP", flag: "🇪🇸", age: 28, officialPoints: 885,   careerHigh: 48, dropping: 0 },
  { officialRank: 51, name: "Pedro Martinez",           countryCode: "ESP", flag: "🇪🇸", age: 28, officialPoints: 865,   careerHigh: 40, dropping: 50 },
  { officialRank: 52, name: "Daniel Elahi Galan",       countryCode: "COL", flag: "🇨🇴", age: 29, officialPoints: 845,   careerHigh: 49, dropping: 0 },
  { officialRank: 53, name: "James Duckworth",          countryCode: "AUS", flag: "🇦🇺", age: 34, officialPoints: 825,   careerHigh: 46, dropping: 13 },
  { officialRank: 54, name: "Thiago Monteiro",          countryCode: "BRA", flag: "🇧🇷", age: 32, officialPoints: 805,   careerHigh: 53, dropping: 25 },
  { officialRank: 55, name: "Emil Ruusuvuori",          countryCode: "FIN", flag: "🇫🇮", age: 26, officialPoints: 790,   careerHigh: 37, dropping: 0 },
  { officialRank: 56, name: "Roman Safiullin",          countryCode: "RUS", flag: "🇷🇺", age: 28, officialPoints: 775,   careerHigh: 43, dropping: 0 },
  { officialRank: 57, name: "Yoshihito Nishioka",       countryCode: "JPN", flag: "🇯🇵", age: 30, officialPoints: 760,   careerHigh: 52, dropping: 13 },
  { officialRank: 58, name: "Thanasi Kokkinakis",       countryCode: "AUS", flag: "🇦🇺", age: 30, officialPoints: 745,   careerHigh: 65, dropping: 25 },
  { officialRank: 59, name: "Mackenzie McDonald",       countryCode: "USA", flag: "🇺🇸", age: 30, officialPoints: 730,   careerHigh: 44, dropping: 0 },
  { officialRank: 60, name: "Dusan Lajovic",            countryCode: "SRB", flag: "🇷🇸", age: 36, officialPoints: 715,   careerHigh: 23, dropping: 50 },
  { officialRank: 61, name: "Roberto Bautista Agut",    countryCode: "ESP", flag: "🇪🇸", age: 38, officialPoints: 700,   careerHigh: 9,  dropping: 25 },
  { officialRank: 62, name: "Facundo Diaz Acosta",      countryCode: "ARG", flag: "🇦🇷", age: 24, officialPoints: 685,   careerHigh: 56, dropping: 0 },
  { officialRank: 63, name: "Yannick Hanfmann",         countryCode: "GER", flag: "🇩🇪", age: 34, officialPoints: 670,   careerHigh: 61, dropping: 13 },
  { officialRank: 64, name: "Alexandre Muller",         countryCode: "FRA", flag: "🇫🇷", age: 28, officialPoints: 655,   careerHigh: 64, dropping: 0 },
  { officialRank: 65, name: "Fabio Fognini",            countryCode: "ITA", flag: "🇮🇹", age: 38, officialPoints: 640,   careerHigh: 9,  dropping: 50 },
  { officialRank: 66, name: "Aleksandar Vukic",         countryCode: "AUS", flag: "🇦🇺", age: 29, officialPoints: 625,   careerHigh: 60, dropping: 0 },
  { officialRank: 67, name: "Albert Ramos-Vinolas",     countryCode: "ESP", flag: "🇪🇸", age: 38, officialPoints: 610,   careerHigh: 17, dropping: 25 },
  { officialRank: 68, name: "Hugo Gaston",              countryCode: "FRA", flag: "🇫🇷", age: 25, officialPoints: 595,   careerHigh: 62, dropping: 0 },
  { officialRank: 69, name: "Adrian Mannarino",         countryCode: "FRA", flag: "🇫🇷", age: 37, officialPoints: 580,   careerHigh: 22, dropping: 13 },
  { officialRank: 70, name: "Sumit Nagal",              countryCode: "IND", flag: "🇮🇳", age: 28, officialPoints: 565,   careerHigh: 68, dropping: 0 },
  { officialRank: 71, name: "Corentin Moutet",          countryCode: "FRA", flag: "🇫🇷", age: 26, officialPoints: 550,   careerHigh: 64, dropping: 25 },
  { officialRank: 72, name: "Christopher Eubanks",      countryCode: "USA", flag: "🇺🇸", age: 29, officialPoints: 535,   careerHigh: 29, dropping: 50 },
  { officialRank: 73, name: "Tomas Martin Etcheverry",  countryCode: "ARG", flag: "🇦🇷", age: 26, officialPoints: 520,   careerHigh: 30, dropping: 0 },
  { officialRank: 74, name: "Camilo Ugo Carabelli",     countryCode: "ARG", flag: "🇦🇷", age: 26, officialPoints: 505,   careerHigh: 74, dropping: 13 },
  { officialRank: 75, name: "Rinky Hijikata",           countryCode: "AUS", flag: "🇦🇺", age: 24, officialPoints: 490,   careerHigh: 72, dropping: 0 },
  { officialRank: 76, name: "Hugo Humbert",             countryCode: "FRA", flag: "🇫🇷", age: 22, officialPoints: 475,   careerHigh: 76, dropping: 0 },
  { officialRank: 77, name: "Laslo Djere",              countryCode: "SRB", flag: "🇷🇸", age: 30, officialPoints: 460,   careerHigh: 27, dropping: 25 },
  { officialRank: 78, name: "Constant Lestienne",       countryCode: "FRA", flag: "🇫🇷", age: 33, officialPoints: 445,   careerHigh: 65, dropping: 50 },
  { officialRank: 79, name: "Cristian Garin",           countryCode: "CHI", flag: "🇨🇱", age: 29, officialPoints: 430,   careerHigh: 17, dropping: 0 },
  { officialRank: 80, name: "Max Purcell",              countryCode: "AUS", flag: "🇦🇺", age: 27, officialPoints: 415,   careerHigh: 40, dropping: 13 },
  { officialRank: 81, name: "Facundo Bagnis",           countryCode: "ARG", flag: "🇦🇷", age: 35, officialPoints: 400,   careerHigh: 55, dropping: 0 },
  { officialRank: 82, name: "Yosuke Watanuki",          countryCode: "JPN", flag: "🇯🇵", age: 28, officialPoints: 390,   careerHigh: 77, dropping: 25 },
  { officialRank: 83, name: "Oscar Otte",               countryCode: "GER", flag: "🇩🇪", age: 32, officialPoints: 380,   careerHigh: 36, dropping: 0 },
  { officialRank: 84, name: "Federico Coria",           countryCode: "ARG", flag: "🇦🇷", age: 33, officialPoints: 370,   careerHigh: 49, dropping: 13 },
  { officialRank: 85, name: "Maximilian Marterer",      countryCode: "GER", flag: "🇩🇪", age: 30, officialPoints: 360,   careerHigh: 45, dropping: 50 },
  { officialRank: 86, name: "Quentin Halys",            countryCode: "FRA", flag: "🇫🇷", age: 28, officialPoints: 350,   careerHigh: 61, dropping: 0 },
  { officialRank: 87, name: "Roberto Carballes Baena",  countryCode: "ESP", flag: "🇪🇸", age: 32, officialPoints: 340,   careerHigh: 51, dropping: 0 },
  { officialRank: 88, name: "Marc-Andrea Huesler",      countryCode: "SUI", flag: "🇨🇭", age: 29, officialPoints: 330,   careerHigh: 64, dropping: 25 },
  { officialRank: 89, name: "Filip Misolic",            countryCode: "AUT", flag: "🇦🇹", age: 24, officialPoints: 320,   careerHigh: 89, dropping: 0 },
  { officialRank: 90, name: "Nicolas Jarry",            countryCode: "CHI", flag: "🇨🇱", age: 30, officialPoints: 310,   careerHigh: 16, dropping: 13 },
  { officialRank: 91, name: "Mattia Bellucci",          countryCode: "ITA", flag: "🇮🇹", age: 24, officialPoints: 300,   careerHigh: 91, dropping: 0 },
  { officialRank: 92, name: "Damir Dzumhur",            countryCode: "BIH", flag: "🇧🇦", age: 33, officialPoints: 290,   careerHigh: 23, dropping: 50 },
  { officialRank: 93, name: "Bernabe Zapata Miralles",  countryCode: "ESP", flag: "🇪🇸", age: 28, officialPoints: 280,   careerHigh: 68, dropping: 0 },
  { officialRank: 94, name: "Juan Manuel Cerundolo",    countryCode: "ARG", flag: "🇦🇷", age: 24, officialPoints: 270,   careerHigh: 86, dropping: 25 },
  { officialRank: 95, name: "Dominik Koepfer",          countryCode: "GER", flag: "🇩🇪", age: 31, officialPoints: 260,   careerHigh: 50, dropping: 0 },
  { officialRank: 96, name: "Andrea Vavassori",         countryCode: "ITA", flag: "🇮🇹", age: 30, officialPoints: 250,   careerHigh: 91, dropping: 13 },
  { officialRank: 97, name: "Dennis Novak",             countryCode: "AUT", flag: "🇦🇹", age: 32, officialPoints: 240,   careerHigh: 85, dropping: 0 },
  { officialRank: 98, name: "Luca Van Assche",          countryCode: "FRA", flag: "🇫🇷", age: 21, officialPoints: 230,   careerHigh: 98, dropping: 0 },
  { officialRank: 99, name: "Richard Gasquet",          countryCode: "FRA", flag: "🇫🇷", age: 39, officialPoints: 220,   careerHigh: 7,  dropping: 50 },
  { officialRank: 100, name: "Billy Harris",            countryCode: "GBR", flag: "🇬🇧", age: 30, officialPoints: 210,   careerHigh: 98, dropping: 0 },
];

// Scripted live results, applied one at a time as the week "progresses".
// Point deltas follow ATP 250 increments: reach R16 +13, QF +37, SF +50, F +65, title +85.
interface ScriptedResult {
  player: string;
  tournament: string;
  round: string; // round now reached (or "out")
  delta: number; // live points gained by this result
  active: boolean;
}

const scriptedResults: ScriptedResult[] = [
  // Already played by Tuesday morning
  { player: "Holger Rune",            tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Frances Tiafoe",         tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Daniil Medvedev",        tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Jakub Mensik",           tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  // Rolling in while you watch
  { player: "Jack Draper",            tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Matteo Berrettini",      tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Alex de Minaur",         tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Alexander Bublik",       tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Taylor Fritz",           tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Denis Shapovalov",       tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Joao Fonseca",           tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Karen Khachanov",        tournament: DEN_BOSCH, round: "out", delta: 0,  active: false },
  { player: "Alexander Zverev",       tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Ben Shelton",            tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Ugo Humbert",            tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Andrey Rublev",          tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Grigor Dimitrov",        tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Jiri Lehecka",           tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Tallon Griekspoor",      tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Sebastian Korda",        tournament: DEN_BOSCH, round: "out", delta: 0,  active: false },
  { player: "Felix Auger-Aliassime",  tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Flavio Cobolli",         tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Alex Michelsen",         tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Brandon Nakashima",      tournament: DEN_BOSCH, round: "out", delta: 0,  active: false },
  { player: "Giovanni Mpetshi Perricard", tournament: STUTTGART, round: "R16", delta: 13, active: true },
  { player: "Alejandro Davidovich Fokina", tournament: DEN_BOSCH, round: "R16", delta: 13, active: true },
  { player: "Jordan Thompson",        tournament: DEN_BOSCH, round: "out", delta: 0,  active: false },
  // Round of 16 begins
  { player: "Holger Rune",            tournament: STUTTGART, round: "QF",  delta: 37, active: true },
  { player: "Taylor Fritz",           tournament: STUTTGART, round: "QF",  delta: 37, active: true },
  { player: "Daniil Medvedev",        tournament: DEN_BOSCH, round: "QF",  delta: 37, active: true },
  { player: "Alex de Minaur",         tournament: DEN_BOSCH, round: "QF",  delta: 37, active: true },
  { player: "Jack Draper",            tournament: STUTTGART, round: "QF",  delta: 37, active: true },
  { player: "Frances Tiafoe",         tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Jakub Mensik",           tournament: DEN_BOSCH, round: "QF",  delta: 37, active: true },
  { player: "Alexander Bublik",       tournament: DEN_BOSCH, round: "QF",  delta: 37, active: true },
  { player: "Alexander Zverev",       tournament: STUTTGART, round: "QF",  delta: 37, active: true },
  { player: "Ben Shelton",            tournament: STUTTGART, round: "out", delta: 0,  active: false },
  { player: "Joao Fonseca",           tournament: DEN_BOSCH, round: "QF",  delta: 37, active: true },
  { player: "Ugo Humbert",            tournament: DEN_BOSCH, round: "out", delta: 0,  active: false },
];

// How often a new scripted result lands (ms). The clock starts when the
// server process boots, so the table visibly "goes live" while browsing.
const RESULT_INTERVAL_MS = 25_000;
const INITIAL_RESULTS = 4;

const bootTime = Date.now();

export function getAtpLiveSnapshot(now: number = Date.now()): AtpLiveSnapshot {
  const elapsed = Math.max(0, now - bootTime);
  const applied = Math.min(
    scriptedResults.length,
    INITIAL_RESULTS + Math.floor(elapsed / RESULT_INTERVAL_MS)
  );

  const players = basePlayers.map((p) => ({
    ...p,
    livePoints: p.officialPoints,
    tournament: p.tournament ? { ...p.tournament } : undefined,
  }));
  const byName = new Map(players.map((p) => [p.name, p]));

  for (const result of scriptedResults.slice(0, applied)) {
    const player = byName.get(result.player);
    if (!player) continue;
    player.livePoints += result.delta;
    player.tournament = {
      name: result.tournament,
      round: result.round,
      active: result.active,
    };
  }

  const sorted = [...players].sort(
    (a, b) => b.livePoints - a.livePoints || a.officialRank - b.officialRank
  );

  const live: AtpLivePlayer[] = sorted.map((p, i) => ({
    liveRank: i + 1,
    officialRank: p.officialRank,
    movement: p.officialRank - (i + 1),
    name: p.name,
    countryCode: p.countryCode,
    flag: p.flag,
    age: p.age,
    officialPoints: p.officialPoints,
    livePoints: p.livePoints,
    pointsDelta: p.livePoints - p.officialPoints,
    careerHigh: p.careerHigh,
    dropping: p.dropping,
    tournament: p.tournament,
  }));

  return {
    lastUpdated: new Date(now).toISOString(),
    weekLabel: "Week of June 8, 2026 · Grass season",
    players: live,
  };
}
