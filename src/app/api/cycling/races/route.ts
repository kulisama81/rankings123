import { NextResponse } from "next/server";
import { getCyclingRaces, getPrimaryRace } from "@/lib/cyclingFeed";

export async function GET() {
  try {
    const races = await getCyclingRaces();
    const primary = getPrimaryRace(races);

    return NextResponse.json({
      races,
      primary,
      hasActivePrimary: !!primary,
    });
  } catch {
    // Fail silently, return empty state (CX-first: graceful degradation)
    return NextResponse.json({
      races: [],
      primary: null,
      hasActivePrimary: false,
    });
  }
}
