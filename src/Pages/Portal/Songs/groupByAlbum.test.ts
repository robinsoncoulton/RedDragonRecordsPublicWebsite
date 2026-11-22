import { formatLength, groupByAlbum, totalDurationMs } from "./groupByAlbum";

const song = (id: string, projectId: string, projectTitle: string, trackNumber: number | null) => ({
  id, projectId, projectTitle, trackNumber, title: id, durationMs: null, status: "mixing", canRename: false,
});

it("puts No Album last and orders each album by track number", () => {
  const groups = groupByAlbum([
    song("loose", "p0", "No Album", null),
    song("b", "p1", "First Light", 2),
    song("a", "p1", "First Light", 1),
    song("x", "p2", "Afterglow", null),
  ]);
  expect(groups.map((g) => [g.title, g.songs.map((s) => s.id)])).toEqual([
    ["Afterglow", ["x"]],
    ["First Light", ["a", "b"]],
    ["No Album", ["loose"]],
  ]);
});

it("totals known song lengths and formats them", () => {
  expect(totalDurationMs([{ durationMs: 61_000 }, { durationMs: null }, { durationMs: 2_000 }])).toBe(63_000);
  expect(formatLength(63_000)).toBe("1:03");
  expect(formatLength(3_729_000)).toBe("1:02:09");
});
