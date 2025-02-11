import { ArtistCard } from "../ArtistCard";
import { ArtistListProps } from "../../model/types";
import { List } from "./styles";

export function ArtistList({ artists }: ArtistListProps) {
  return (
    <List>
      {artists.map((artist, index) => (
        <ArtistCard key={artist.id} artist={artist} index={index} />
      ))}
    </List>
  );
}
