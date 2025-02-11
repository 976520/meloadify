import Image from "next/image";
import type { SpotifyTrack } from "@/shared/types/spotify";

interface TrackListProps {
  tracks: SpotifyTrack[];
}

export function TrackList({ tracks }: TrackListProps) {
  if (!tracks || tracks.length === 0) {
    return <div className="text-center p-4 text-zinc-400">No tracks available</div>;
  }

  return (
    <div className="space-y-4">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center space-x-4 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
        >
          <div className="flex-shrink-0">
            <Image
              src={track.album.images[0]?.url || "/placeholder-album.png"}
              alt={track.album.name}
              width={64}
              height={64}
              className="rounded-md"
            />
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-medium truncate">{track.name}</h3>
            <p className="text-sm text-zinc-400 truncate">{track.artists.map((artist) => artist.name).join(", ")}</p>
            <p className="text-xs text-zinc-500">{track.album.name}</p>
          </div>
          {track.preview_url && (
            <audio controls className="w-32 h-8" src={track.preview_url}>
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      ))}
    </div>
  );
}
