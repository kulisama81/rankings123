/**
 * FIFA 2026 World Cup official knockout bracket tree structure.
 * Maps how Round of 32 matches flow through R16, QF, SF to the Final.
 * Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_knockout_stage
 */

export type BracketHalf = "top" | "bottom";

export interface BracketNode {
  round: "R32" | "R16" | "QF" | "SF" | "Final";
  index: number; // index within that round's matches array
  half: BracketHalf;
  feedsInto?: { round: "R16" | "QF" | "SF" | "Final"; index: number };
}

/**
 * Official FIFA 2026 Round of 32 → Round of 16 mapping.
 * R32_TEMPLATE indices (0-15) correspond to matches M73-M88.
 */
const R32_TO_R16: { r32Index: number; r16Index: number; half: BracketHalf }[] = [
  // TOP HALF (feeds into SF1/M101)
  { r32Index: 1, r16Index: 0, half: "top" }, // M74 → M89
  { r32Index: 4, r16Index: 0, half: "top" }, // M77 → M89
  { r32Index: 0, r16Index: 1, half: "top" }, // M73 → M90
  { r32Index: 2, r16Index: 1, half: "top" }, // M75 → M90
  { r32Index: 10, r16Index: 4, half: "top" }, // M83 → M93
  { r32Index: 11, r16Index: 4, half: "top" }, // M84 → M93
  { r32Index: 8, r16Index: 5, half: "top" }, // M81 → M94
  { r32Index: 9, r16Index: 5, half: "top" }, // M82 → M94

  // BOTTOM HALF (feeds into SF2/M102)
  { r32Index: 3, r16Index: 2, half: "bottom" }, // M76 → M91
  { r32Index: 5, r16Index: 2, half: "bottom" }, // M78 → M91
  { r32Index: 6, r16Index: 3, half: "bottom" }, // M79 → M92
  { r32Index: 7, r16Index: 3, half: "bottom" }, // M80 → M92
  { r32Index: 13, r16Index: 6, half: "bottom" }, // M86 → M95
  { r32Index: 15, r16Index: 6, half: "bottom" }, // M88 → M95
  { r32Index: 12, r16Index: 7, half: "bottom" }, // M85 → M96
  { r32Index: 14, r16Index: 7, half: "bottom" }, // M87 → M96
];

/**
 * Round of 16 → Quarterfinals mapping.
 */
const R16_TO_QF: { r16Index: number; qfIndex: number; half: BracketHalf }[] = [
  { r16Index: 0, qfIndex: 0, half: "top" }, // M89 → M97
  { r16Index: 1, qfIndex: 0, half: "top" }, // M90 → M97
  { r16Index: 4, qfIndex: 1, half: "top" }, // M93 → M98
  { r16Index: 5, qfIndex: 1, half: "top" }, // M94 → M98
  { r16Index: 2, qfIndex: 2, half: "bottom" }, // M91 → M99
  { r16Index: 3, qfIndex: 2, half: "bottom" }, // M92 → M99
  { r16Index: 6, qfIndex: 3, half: "bottom" }, // M95 → M100
  { r16Index: 7, qfIndex: 3, half: "bottom" }, // M96 → M100
];

/**
 * Quarterfinals → Semifinals mapping.
 */
const QF_TO_SF: { qfIndex: number; sfIndex: number; half: BracketHalf }[] = [
  { qfIndex: 0, sfIndex: 0, half: "top" }, // M97 → M101
  { qfIndex: 1, sfIndex: 0, half: "top" }, // M98 → M101
  { qfIndex: 2, sfIndex: 1, half: "bottom" }, // M99 → M102
  { qfIndex: 3, sfIndex: 1, half: "bottom" }, // M100 → M102
];

/**
 * Semifinals → Final mapping.
 */
const SF_TO_FINAL: { sfIndex: number }[] = [
  { sfIndex: 0 }, // M101 → M104
  { sfIndex: 1 }, // M102 → M104
];

/**
 * Get the R16 slot and half that a given R32 match feeds into.
 */
export function getR32Destination(r32Index: number): {
  r16Index: number;
  half: BracketHalf;
} | null {
  const mapping = R32_TO_R16.find((m) => m.r32Index === r32Index);
  return mapping ? { r16Index: mapping.r16Index, half: mapping.half } : null;
}

/**
 * Get the QF slot and half that a given R16 match feeds into.
 */
export function getR16Destination(r16Index: number): {
  qfIndex: number;
  half: BracketHalf;
} | null {
  const mapping = R16_TO_QF.find((m) => m.r16Index === r16Index);
  return mapping ? { qfIndex: mapping.qfIndex, half: mapping.half } : null;
}

/**
 * Get the SF slot and half that a given QF match feeds into.
 */
export function getQFDestination(qfIndex: number): {
  sfIndex: number;
  half: BracketHalf;
} | null {
  const mapping = QF_TO_SF.find((m) => m.qfIndex === qfIndex);
  return mapping ? { sfIndex: mapping.sfIndex, half: mapping.half } : null;
}

/**
 * Get which SF match feeds into the Final.
 */
export function getSFDestination(sfIndex: number): { final: true } | null {
  return SF_TO_FINAL.find((m) => m.sfIndex === sfIndex) ? { final: true } : null;
}

/**
 * Get all R32 matches that feed into a specific R16 match.
 */
export function getR16Sources(r16Index: number): number[] {
  return R32_TO_R16.filter((m) => m.r16Index === r16Index).map((m) => m.r32Index);
}

/**
 * Get all R16 matches that feed into a specific QF match.
 */
export function getQFSources(qfIndex: number): number[] {
  return R16_TO_QF.filter((m) => m.qfIndex === qfIndex).map((m) => m.r16Index);
}

/**
 * Get all QF matches that feed into a specific SF match.
 */
export function getSFSources(sfIndex: number): number[] {
  return QF_TO_SF.filter((m) => m.sfIndex === sfIndex).map((m) => m.qfIndex);
}

/**
 * Get which bracket half a match belongs to.
 */
export function getMatchHalf(
  round: "R32" | "R16" | "QF" | "SF",
  index: number
): BracketHalf | null {
  if (round === "R32") return R32_TO_R16.find((m) => m.r32Index === index)?.half ?? null;
  if (round === "R16") return R16_TO_QF.find((m) => m.r16Index === index)?.half ?? null;
  if (round === "QF") return QF_TO_SF.find((m) => m.qfIndex === index)?.half ?? null;
  if (round === "SF") return QF_TO_SF.find((m) => m.sfIndex === index)?.half ?? null;
  return null;
}
