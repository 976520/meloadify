"use client";

import { ArtistList } from "@/entities/artist";
import type { ListeningStats } from "@/shared/types/spotify";
import { StatCard } from "@/shared/ui/stat-card";
import { TrackList } from "@/entities/track";
import { formatDuration } from "@/shared/lib/format";

interface StatsDisplayProps {
  stats: ListeningStats | null;
  loading: boolean;
  period: "일" | "주" | "월" | "년";
}

export function StatsDisplay({ stats, loading, period }: StatsDisplayProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-zinc-400">No stats available</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="들은 시간" value={formatDuration(stats.totalListeningTime)} period={period} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">최애곡</h2>
          <TrackList tracks={stats.topTracks} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">최애아티스트</h2>
          <ArtistList artists={stats.topArtists} />
        </div>
      </div>
    </div>
  );
}
