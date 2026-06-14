import { NextResponse } from "next/server";
import { getLiveData, isTour } from "@/lib/liveFeed";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ tour: string }> }
) {
  const { tour } = await params;
  if (!isTour(tour)) {
    return NextResponse.json({ error: "Unknown tour" }, { status: 404 });
  }
  return NextResponse.json(await getLiveData(tour));
}
