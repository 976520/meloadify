import { ArtistCard } from "./ArtistCard";
import type { SpotifyArtist } from "@/shared/types/spotify";

interface ArtistListProps {
  artists: SpotifyArtist[];
}

export function ArtistList({ artists }: ArtistListProps) {
  if (!artists || artists.length === 0) {
    return <div className="text-center p-4 text-zinc-400">아티스트가 없어요</div>;
  }

  return (
    <div className="space-y-3">
      {artists.map((artist, index) => (
        <ArtistCard key={artist.id} artist={artist} index={index} />
      ))}
    </div>
  );
}
