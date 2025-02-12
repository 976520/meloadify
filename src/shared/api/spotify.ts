import type { ListeningStats, SpotifyArtist, SpotifyTrack } from "../types/spotify";
import { startOfDay, subMonths, subWeeks, subYears } from "date-fns";

import { SPOTIFY_CONFIG } from "../config/spotify";
import SpotifyWebApi from "spotify-web-api-node";

export class SpotifyClient {
  private client: SpotifyWebApi;
  private refreshToken?: string;

  constructor(accessToken: string, refreshToken?: string) {
    this.client = new SpotifyWebApi({
      clientId: SPOTIFY_CONFIG.clientId,
      clientSecret: SPOTIFY_CONFIG.clientSecret,
      redirectUri: SPOTIFY_CONFIG.redirectUri,
      accessToken,
      refreshToken,
    });
    this.refreshToken = refreshToken;
  }

  private async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error("토큰이 없어요 ");
    }

    try {
      const data = await this.client.refreshAccessToken();
      const { access_token } = data.body;

      this.client.setAccessToken(access_token);

      return access_token;
    } catch (error) {
      console.error(error);
      throw new Error("토큰 갱신이 실패했어요");
    }
  }

  private async refreshAccessTokenIfNeeded() {
    try {
      await this.client.getMe();
    } catch (error) {
      if (error instanceof Error && error.message.includes("토큰이 만료되었어요")) {
        const newAccessToken = await this.refreshAccessToken();
        this.client.setAccessToken(newAccessToken);
      } else {
        throw error;
      }
    }
  }

  private async getRecentlyPlayed(before: number): Promise<SpotifyApi.PlayHistoryObject[]> {
    let allTracks: SpotifyApi.PlayHistoryObject[] = [];
    let currentBefore = before;
    const limit = 50;

    try {
      while (true) {
        const response = await this.client.getMyRecentlyPlayedTracks({
          limit,
          before: Math.floor(currentBefore / 1000),
        });

        const tracks = response.body.items;

        if (tracks.length === 0) break;

        const validTracks = tracks.filter((item) => {
          const isValid = item.track && typeof item.track.duration_ms === "number" && item.track.duration_ms > 0;
          return isValid;
        });

        allTracks = [...allTracks, ...validTracks];

        const lastTrack = tracks[tracks.length - 1];
        const lastPlayedAt = new Date(lastTrack.played_at).getTime();

        if (lastPlayedAt >= currentBefore) break;

        currentBefore = lastPlayedAt;

        if (tracks.length < limit || allTracks.length >= 500) {
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      return allTracks;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private async getTopTracks(
    time_range: "short_term" | "medium_term" | "long_term" = "short_term",
    limit: number = 20
  ): Promise<SpotifyTrack[]> {
    const response = await this.client.getMyTopTracks({ time_range, limit });
    return response.body.items;
  }

  private async getTopArtists(
    time_range: "short_term" | "medium_term" | "long_term" = "short_term",
    limit: number = 20
  ): Promise<SpotifyArtist[]> {
    const response = await this.client.getMyTopArtists({ time_range, limit });
    return response.body.items;
  }

  private getTimeRange(period: "4주" | "6개월" | "전체"): "short_term" | "medium_term" | "long_term" {
    switch (period) {
      case "4주":
        return "short_term";
      case "6개월":
        return "medium_term";
      case "전체":
        return "long_term";
      default:
        return "short_term";
    }
  }

  async getListeningStats(period: "4주" | "6개월" | "전체"): Promise<ListeningStats> {
    try {
      await this.refreshAccessTokenIfNeeded();

      const now = new Date();
      const startDate = startOfDay(now);
      const endDate = now;

      const timeRange = this.getTimeRange(period);

      try {
        const currentTime = endDate.getTime();

        const [recentTracks, topTracks, topArtists] = await Promise.all([
          this.getRecentlyPlayed(currentTime),
          this.getTopTracks(timeRange, 10),
          this.getTopArtists(timeRange, 10),
        ]);

        const filteredTracks = recentTracks.filter((track) => {
          const playedAt = new Date(track.played_at);
          const isInRange = playedAt >= startDate && playedAt <= endDate;
          return isInRange;
        });

        const totalListeningTime = filteredTracks.reduce((acc, track) => {
          const duration = track.track?.duration_ms;
          if (duration && duration > 0) {
            return acc + duration;
          }
          return acc;
        }, 0);

        return {
          totalListeningTime,
          topTracks: topTracks || [],
          topArtists: topArtists || [],
          period,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };
      } catch (error) {
        console.error(error);
        throw new Error("데이터를 불러오는데 실패했어요");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
