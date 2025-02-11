import type { SpotifyTrack } from "@/shared/types/spotify";
import { TrackCard } from "./TrackCard";

interface TrackListProps {
  tracks: SpotifyTrack[];
}

export function TrackList({ tracks }: TrackListProps) {
  if (!tracks || tracks.length === 0) {
    return <div className="text-center p-4 text-zinc-400">곡이 없어요</div>;
  }

  return (
    <div className="space-y-3">
      {tracks.map((track, index) => (
        <TrackCard key={track.id} track={track} index={index} />
      ))}
    </div>
  );
}
