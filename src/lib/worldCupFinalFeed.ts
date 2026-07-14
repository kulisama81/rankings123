import type { WorldCupMatch } from "@/types";
import { getWorldCupBracket } from "./worldCupBracketFeed";

export interface WorldCupFinalPreview {
  finalMatch: WorldCupMatch | null;
  semifinals: WorldCupMatch[];
  finalistsConfirmed: boolean;
  source: "espn" | "projected";
}

/**
 * Get World Cup Final match data and semifinal results for the predictions page.
 * Returns the final match if available, plus semifinal matches to show the path.
 */
export async function getWorldCupFinalPreview(): Promise<WorldCupFinalPreview> {
  try {
    const bracket = await getWorldCupBracket();

    // Find the final match
    const finalStage = bracket.stages.find((s) => s.name === "Final");
    const finalMatch = finalStage?.matches[0] ?? null;

    // Find semifinal matches
    const semifinalStage = bracket.stages.find((s) => s.name === "Semifinals");
    const semifinals = semifinalStage?.matches ?? [];

    // Finalists are confirmed if both teams in the final are known (not TBD)
    const finalistsConfirmed = !!(
      finalMatch &&
      finalMatch.homeName !== "TBD" &&
      finalMatch.awayName !== "TBD"
    );

    // Source is "espn" if we have real match data, "projected" if still TBD
    const source: "espn" | "projected" = finalistsConfirmed ? "espn" : "projected";

    return {
      finalMatch,
      semifinals,
      finalistsConfirmed,
      source,
    };
  } catch (error) {
    console.error("Failed to fetch World Cup Final data:", error);
    // Return empty preview on error rather than throwing
    return {
      finalMatch: null,
      semifinals: [],
      finalistsConfirmed: false,
      source: "projected",
    };
  }
}
