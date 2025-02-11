import { NextRequest, NextResponse } from "next/server";

import { SpotifyClient } from "@/shared/api/spotify";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get("period") as "일" | "주" | "월" | "년";
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
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
