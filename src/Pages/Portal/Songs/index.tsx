import React from "react";
import Page from "../../../Components/Page";
import { useTheme } from "../../../Utils/Theme";
import { library, LibrarySong } from "../../../Api/portal";
import { FormStatus } from "../../Join/styles";
import { Shell } from "../../Login/styles";
import { IndexItem, IndexList, PortalTitle, Sweep, useSweep } from "../IndexList";
import { formatTime } from "../../../Components/BeforeAfterPlayer/utils";

export const songItems = (songs: LibrarySong[]): IndexItem[] =>
  songs.map((song) => ({
    id: song.id,
    title: song.title,
    meta: `${song.projectTitle} · ${song.status.replace(/_/g, " ")}`,
    aside: song.durationMs !== null ? formatTime(song.durationMs / 1000) : undefined,
  }));

const Songs: React.FC = () => {
  const { theme } = useTheme();
  const { go, sweepProps } = useSweep();
  const [songs, setSongs] = React.useState<LibrarySong[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    library.songs().then(setSongs, (e: Error) => setError(e.message));
  }, []);

  return (
    <Page>
      <Shell theme={theme} $wide style={{ overflowX: "clip" }}>
        <Sweep {...sweepProps}>
          <PortalTitle>Songs</PortalTitle>
          {error ? (
            <FormStatus theme={theme} $tone="error">
              {error}
            </FormStatus>
          ) : (
            <IndexList
              items={songs && songItems(songs)}
              empty="No songs yet."
              onOpen={(item) => go(`/portal/songs/${item.id}`)}
            />
          )}
        </Sweep>
      </Shell>
    </Page>
  );
};

export default Songs;
