import { NextResponse } from "next/server";
import { getRankings } from "@/data";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;
  const data = getRankings(eventId);
  if (!data) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}
