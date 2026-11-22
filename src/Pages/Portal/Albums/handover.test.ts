import { handoverTime } from "./handover";

const base = { autoNext: true, hasNext: true, endTime: 100, now: 97 };

it("schedules the next song at the exact end time once it's close", () => {
  expect(handoverTime(base)).toBe(100);
});

it("doesn't schedule too early, when off, on the last song, or when paused or looping", () => {
  expect(handoverTime({ ...base, now: 50 })).toBeNull();
  expect(handoverTime({ ...base, autoNext: false })).toBeNull();
  expect(handoverTime({ ...base, hasNext: false })).toBeNull();
  expect(handoverTime({ ...base, endTime: null })).toBeNull();
});
