import { act, renderHook } from "@testing-library/react";
import { setSharedVolume, useSharedVolume } from "./sharedVolume";

it("changes every player's volume together and remembers it", () => {
  const { result: first } = renderHook(() => useSharedVolume());
  const { result: second } = renderHook(() => useSharedVolume());
  act(() => setSharedVolume(0.8));
  expect(first.current).toBe(0.8);
  expect(second.current).toBe(0.8);
  expect(localStorage.getItem("rdr-volume")).toBe("0.8");
  act(() => setSharedVolume(3));
  expect(first.current).toBe(1);
});
