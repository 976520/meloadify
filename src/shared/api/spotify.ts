import type { ListeningStats, SpotifyArtist, SpotifyTrack } from "../types/spotify";
import { startOfDay, subMonths, subWeeks, subYears } from "date-fns";

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
      console.error("Error fetching recently played tracks:", error);
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
          startDate = subYears(now, 1);
          break;
        default:
          throw new Error("Invalid period");
      }

      startDate = startOfDay(startDate);
      endDate = now;

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
        console.error("API call error:", error);
        throw new Error("Failed to fetch data from Spotify API");
      }
    } catch (error) {
      console.error("Error in getListeningStats:", error);
      throw error;
    }
  }
}
