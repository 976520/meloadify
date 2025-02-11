import { NextRequest, NextResponse } from "next/server";

import { SpotifyClient } from "@/shared/api/spotify";
import type { TimeRange } from "@/features/time-range-selector/model/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get("period") as TimeRange;
    const accessToken = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!period) {
      return NextResponse.json({ error: "Invalid period" }, { status: 400 });
    }

    const client = new SpotifyClient(accessToken);
    const stats = await client.getListeningStats(period);

    return NextResponse.json(stats);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
