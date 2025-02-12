import { NextRequest, NextResponse } from "next/server";

import { SpotifyClient } from "@/shared/api/spotify";
import type { TimeRange } from "@/features/time-range-selector/model/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get("period") as TimeRange;
    const accessToken = request.headers.get("Authorization")?.replace("Bearer ", "");
    const refreshToken = request.headers.get("Refresh-Token");

    if (!accessToken) {
      return NextResponse.json({ error: "인증 실패 (401)" }, { status: 401 });
    }

    if (!period) {
      return NextResponse.json({ error: "유효하지 않은 기간 (400)" }, { status: 400 });
    }

    const client = new SpotifyClient(accessToken, refreshToken || undefined);

    try {
      const stats = await client.getListeningStats(period);
      return NextResponse.json(stats);
    } catch (error) {
      console.error(error);

      if (error instanceof Error && error.message.includes("token expired")) {
        return NextResponse.json({ error: "토큰 만료 (401)" }, { status: 401 });
      }

      return NextResponse.json(
        {
          error: "데이터를 불러오는데 실패했어요",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "서버 오류 (500)", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
