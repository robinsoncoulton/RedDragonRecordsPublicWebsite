import { forgetRemembered, rememberedThenFresh } from "./remembered";

test("shows the remembered value first, then the fresh one only when it changed", async () => {
  forgetRemembered();
  const seen: number[][] = [];
  await rememberedThenFresh("k", async () => [1], (v) => seen.push(v));
  await rememberedThenFresh("k", async () => [1], (v) => seen.push(v));
  await rememberedThenFresh("k", async () => [2], (v) => seen.push(v));
  expect(seen).toEqual([[1], [1], [1], [2]]);
  forgetRemembered();
  await rememberedThenFresh("k", async () => [3], (v) => seen.push(v));
  expect(seen.at(-1)).toEqual([3]);
  expect(seen).toHaveLength(5);
});
