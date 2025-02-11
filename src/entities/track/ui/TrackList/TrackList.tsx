import { List } from "./styles";
import { TrackCard } from "../TrackCard";
import { TrackListProps } from "../../model/types";

export function TrackList({ tracks }: TrackListProps) {
  return (
    <List>
      {tracks.map((track, index) => (
        <TrackCard key={track.id} track={track} index={index} />
      ))}
    </List>
  );
}
