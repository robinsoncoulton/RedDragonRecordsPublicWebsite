import type { LibrarySong } from "../../../Api/portal";

export const NO_ALBUM = "No Album";

const byTrack = (a: LibrarySong, b: LibrarySong) =>
  (a.trackNumber ?? Infinity) - (b.trackNumber ?? Infinity) ||
  a.title.localeCompare(b.title, undefined, { sensitivity: "base", numeric: true });

/** Songs grouped under their album (project), A–Z with "No Album" last, each in track order. */
export const groupByAlbum = (songs: LibrarySong[]) => {
  const groups = new Map<string, { title: string; songs: LibrarySong[] }>();
  for (const song of songs) {
    const group = groups.get(song.projectId) ?? { title: song.projectTitle, songs: [] };
    group.songs.push(song);
    groups.set(song.projectId, group);
  }
  return Array.from(groups, ([id, g]) => ({ id, title: g.title, songs: g.songs.sort(byTrack) })).sort(
    (a, b) =>
      Number(a.title === NO_ALBUM) - Number(b.title === NO_ALBUM) ||
      a.title.localeCompare(b.title, undefined, { sensitivity: "base", numeric: true })
  );
};

/** Total length of the songs whose length is known, in ms. */
export const totalDurationMs = (songs: { durationMs: number | null }[]) =>
  songs.reduce((sum, s) => sum + (s.durationMs ?? 0), 0);

/** 3:07, or 1:02:09 past an hour. */
export const formatLength = (ms: number) => {
  const total = Math.round(ms / 1000);
  const [h, m, s] = [Math.floor(total / 3600), Math.floor(total / 60) % 60, total % 60];
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
};
