import { NextRequest, NextResponse } from "next/server";

import { SpotifyClient } from "@/shared/api/spotify";
import type { TimeRange } from "@/features/time-range-selector/model/types";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get("period") as TimeRange;

    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized - No access token" }, { status: 401 });
    }

    if (!period) {
      return NextResponse.json({ error: "Invalid period" }, { status: 400 });
    }

    const client = new SpotifyClient(session.accessToken, session.refreshToken);

    try {
      const stats = await client.getListeningStats(period);
      return NextResponse.json(stats);
    } catch (error) {
      console.error("Spotify API Error:", error);

      if (error instanceof Error && error.message.includes("token expired")) {
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }

      return NextResponse.json(
        {
          error: "Failed to fetch data from Spotify API",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
