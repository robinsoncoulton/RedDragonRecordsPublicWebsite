import React from "react";
import styled from "styled-components";
import { designTokens } from "../../../DesignSystem";
import Page from "../../../Components/Page";
import { useTheme } from "../../../Utils/Theme";
import { library, LibrarySong } from "../../../Api/portal";
import { FormStatus } from "../../Join/styles";
import { Shell } from "../../Login/styles";
import { IndexItem, IndexList, Meta, PortalTitle, Sweep, useSweep } from "../IndexList";
import { NO_ALBUM, formatLength, groupByAlbum, totalDurationMs } from "./groupByAlbum";
import { useAlbumDownload } from "../Albums/useAlbumDownload";
import { formatTime } from "../../../Components/BeforeAfterPlayer/utils";

const AlbumTitle = styled.h3`
  margin: ${designTokens.spacing.xl} 0 ${designTokens.spacing.sm};
  font-size: ${designTokens.fontSize.lg};
`;

const AlbumHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${designTokens.spacing.md};
`;

const AlbumActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${designTokens.spacing.md};
`;

const PlayAlbum = styled.button`
  appearance: none;
  border: none;
  background: none;
  padding: 0;
  color: inherit;
  font: inherit;
  font-size: ${designTokens.fontSize.sm};
  text-decoration: underline;
  cursor: pointer;

  &:disabled {
    cursor: progress;
    opacity: 0.6;
  }
`;

const songItems = (songs: LibrarySong[]): IndexItem[] =>
  songs.map((song) => ({
    id: song.id,
    title: song.title,
    marker: song.trackNumber !== null ? String(song.trackNumber).padStart(2, "0") : "",
    aside: song.durationMs !== null ? formatTime(song.durationMs / 1000) : undefined,
  }));

const AlbumRow: React.FC<{
  id: string;
  title: string;
  songs: LibrarySong[];
  onOpen: (item: IndexItem) => void;
  onPlayAlbum: (albumId: string, songId?: string) => void;
}> = ({ id, title, songs, onOpen, onPlayAlbum }) => {
  const { theme } = useTheme();
  const download = useAlbumDownload(id);
  const length = totalDurationMs(songs);
  return (
    <section>
      <AlbumHeader>
        <div>
          <AlbumTitle>{title}</AlbumTitle>
          <Meta theme={theme}>
            {songs.length} {songs.length === 1 ? "song" : "songs"}
            {length ? ` · ${formatLength(length)}` : ""}
          </Meta>
        </div>
        <AlbumActions>
          <PlayAlbum type="button" onClick={() => onPlayAlbum(id)}>
            ▶ Play album
          </PlayAlbum>
          <PlayAlbum type="button" disabled={download.busy} onClick={download.start}>
            {download.label}
          </PlayAlbum>
        </AlbumActions>
      </AlbumHeader>
      {download.message ? <Meta theme={theme}>{download.message}</Meta> : null}
      <IndexList
        items={songItems(songs)}
        empty=""
        // Album songs open in the album player at that song; loose songs keep their own page.
        onOpen={title === NO_ALBUM ? onOpen : (item) => onPlayAlbum(id, item.id)}
      />
    </section>
  );
};

export const SongsByAlbum: React.FC<{
  songs: LibrarySong[] | null;
  empty: string;
  onOpen: (item: IndexItem) => void;
  /** Without songId: play from the start. With it: open the album at that song. */
  onPlayAlbum: (albumId: string, songId?: string) => void;
}> = ({ songs, empty, onOpen, onPlayAlbum }) =>
  !songs || songs.length === 0 ? (
    <IndexList items={songs} empty={empty} onOpen={onOpen} />
  ) : (
    <>
      {groupByAlbum(songs).map((album) => (
        <AlbumRow key={album.id} {...album} onOpen={onOpen} onPlayAlbum={onPlayAlbum} />
      ))}
    </>
  );

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
            <SongsByAlbum
              songs={songs}
              empty="No songs yet."
              onPlayAlbum={(id, song) => go(`/portal/albums/${id}?${song ? `track=${song}` : "play"}`)}
              onOpen={(item) => go(`/portal/songs/${item.id}`)}
            />
          )}
        </Sweep>
      </Shell>
    </Page>
  );
};

export default Songs;
