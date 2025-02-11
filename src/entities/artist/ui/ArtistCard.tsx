import Image from "next/image";
import type { SpotifyArtist } from "@/shared/types/spotify";

interface ArtistCardProps {
  artist: SpotifyArtist;
  index: number;
}

export function ArtistCard({ artist, index }: ArtistCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors">
      <div className="flex-shrink-0 w-12 text-center text-zinc-400 font-medium">{index + 1}</div>
      <div className="flex-shrink-0">
        <Image
          src={artist.images[0]?.url || "/placeholder-artist.png"}
          alt={artist.name}
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="text-base font-medium text-white truncate">{artist.name}</h3>
        <p className="text-sm text-zinc-400 truncate">{artist.genres.slice(0, 3).join(", ")}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex-grow h-1.5 bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${artist.popularity}%` }}
            />
          </div>
          <span className="text-xs text-zinc-400 flex-shrink-0 w-8">{artist.popularity}%</span>
        </div>
      </div>
    </div>
  );
}
