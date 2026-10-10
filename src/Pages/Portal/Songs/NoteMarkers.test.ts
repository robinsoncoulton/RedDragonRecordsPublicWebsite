import { noteAtPlayhead, NoteMarker } from "./NoteMarkers";

const note = (id: string, timestampMs: number): NoteMarker => ({
  id,
  timestampMs,
  author: "A",
  image: null,
  content: id,
});

const notes = [note("a", 1000), note("b", 2500), note("c", 10000)];

test("shows nothing before the first note", () => {
  expect(noteAtPlayhead(notes, 500)).toBeNull();
});

test("shows a note from its timestamp until the window passes", () => {
  expect(noteAtPlayhead(notes, 1000)?.id).toBe("a");
  expect(noteAtPlayhead(notes, 2400)?.id).toBe("a");
  expect(noteAtPlayhead(notes, 6000)).toBeNull();
});

test("a later note takes over from an earlier one", () => {
  expect(noteAtPlayhead(notes, 3000)?.id).toBe("b");
});
