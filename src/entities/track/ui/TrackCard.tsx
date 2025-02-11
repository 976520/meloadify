import Image from "next/image";
import type { SpotifyTrack } from "@/shared/types/spotify";

interface TrackCardProps {
  track: SpotifyTrack;
  index: number;
}

export function TrackCard({ track, index }: TrackCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors">
      <div className="flex-shrink-0 w-12 text-center text-zinc-400 font-medium">{index + 1}</div>
      <div className="flex-shrink-0">
        <Image
          src={track.album.images[0]?.url || "/placeholder-album.png"}
          alt={track.album.name}
          width={48}
          height={48}
          className="rounded-md"
        />
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="text-base font-medium text-white truncate">{track.name}</h3>
        <p className="text-sm text-zinc-400 truncate">{track.artists.map((artist) => artist.name).join(", ")}</p>
      </div>
      {track.preview_url && (
        <audio controls className="w-28 h-8 flex-shrink-0" src={track.preview_url}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
