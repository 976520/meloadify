import Image from "next/image";
import type { SpotifyArtist } from "@/shared/types/spotify";

interface ArtistListProps {
  artists: SpotifyArtist[];
}

export function ArtistList({ artists }: ArtistListProps) {
  return (
    <div className="space-y-4">
      {artists.map((artist) => (
        <div
          key={artist.id}
          className="flex items-center space-x-4 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
        >
          <div className="flex-shrink-0">
            <Image
              src={artist.images[0]?.url || "/placeholder-artist.png"}
              alt={artist.name}
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-medium truncate">{artist.name}</h3>
            <p className="text-sm text-zinc-400 truncate">{artist.genres.slice(0, 3).join(", ")}</p>
            <div className="mt-1 flex items-center">
              <div className="flex-grow h-1 bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${artist.popularity}%` }} />
              </div>
              <span className="ml-2 text-xs text-zinc-400">{artist.popularity}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
