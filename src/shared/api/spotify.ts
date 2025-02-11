import type { ListeningStats, SpotifyArtist, SpotifyTrack } from "../types/spotify";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";

import { SPOTIFY_CONFIG } from "../config/spotify";
import SpotifyWebApi from "spotify-web-api-node";

export class SpotifyClient {
  private client: SpotifyWebApi;

  constructor(accessToken: string) {
    this.client = new SpotifyWebApi({
      clientId: SPOTIFY_CONFIG.clientId,
      clientSecret: SPOTIFY_CONFIG.clientSecret,
      redirectUri: SPOTIFY_CONFIG.redirectUri,
      accessToken,
    });
  }

  private async getRecentlyPlayed(after: number, before: number): Promise<SpotifyApi.PlayHistoryObject[]> {
    const response = await this.client.getMyRecentlyPlayedTracks({
      limit: 50,
      after,
      before,
    });
    return response.body.items;
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
      const now = new Date();
      let startDate: Date;
      let endDate = now;

      switch (period) {
        case "4주":
          startDate = subWeeks(now, 4);
          break;
        case "6개월":
          startDate = subMonths(now, 6);
          break;
        case "전체":
          startDate = subYears(now, 50);
          break;
        default:
          throw new Error("Invalid period");
      }

      const timeRange = this.getTimeRange(period);

      try {
        const [recentTracks, topTracks, topArtists] = await Promise.all([
          this.getRecentlyPlayed(startDate.getTime(), endDate.getTime()),
          this.getTopTracks(timeRange, 10).catch(() => []),
          this.getTopArtists(timeRange, 10).catch(() => []),
        ]);

        const filteredTracks = recentTracks.filter((track) => {
          const playedAt = new Date(track.played_at);
          return playedAt >= startDate && playedAt <= endDate;
        });

        const totalListeningTime = filteredTracks.reduce((acc, track) => acc + track.track.duration_ms, 0);

        return {
          totalListeningTime,
          topTracks: topTracks || [],
          topArtists: topArtists || [],
          period,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };
      } catch (error) {
        console.error("API call error:", error);
        throw new Error("Failed to fetch data from Spotify API");
      }
    } catch (error) {
      console.error("Error in getListeningStats:", error);
      throw error;
    }
  }
}
