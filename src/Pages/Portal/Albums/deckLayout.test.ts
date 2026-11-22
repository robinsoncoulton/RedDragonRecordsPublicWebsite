import { MIN_STRIP, MIN_STRIP_OPEN, SIDE_SCALE, cardWidthFor, deckLayout } from "./deckLayout";

const STAGE = 1000;
const width = cardWidthFor(STAGE);
const half = (width * SIDE_SCALE) / 2;
const edges = (poses: ReturnType<typeof deckLayout>) =>
  poses.map((p) => [p.x - (width * p.scale) / 2, p.x + (width * p.scale) / 2]);

it("keeps every card inside the stage, even with the current track at one end of 12", () => {
  for (const index of [0, 5, 11]) {
    for (const [l, r] of edges(deckLayout({ stage: STAGE, count: 12, index, hovered: null }))) {
      expect(l).toBeGreaterThanOrEqual(-STAGE / 2);
      expect(r).toBeLessThanOrEqual(STAGE / 2);
    }
  }
});

it("shows neighbours in full and stacks the rest closer together, each still hoverable", () => {
  const poses = deckLayout({ stage: STAGE, count: 12, index: 0, hovered: null });
  expect(poses[1]!.x - half).toBeGreaterThan(width / 2); // neighbour clear of the current card
  const gaps = poses.slice(2).map((p, i) => p.x - poses[i + 1]!.x);
  gaps.forEach((g) => expect(g).toBeGreaterThanOrEqual(MIN_STRIP - 0.001));
  gaps.slice(1).forEach((g, i) => expect(g).toBeLessThanOrEqual(gaps[i]! + 0.001));
});

it("opens the deck in front of a hovered card, keeping every other card hoverable and inside", () => {
  for (const hovered of [2, 4, 9, 11]) {
    const closed = deckLayout({ stage: STAGE, count: 12, index: 0, hovered: null });
    const open = deckLayout({ stage: STAGE, count: 12, index: 0, hovered });
    expect(open[hovered]!.lifted).toBe(true);
    expect(open[hovered]!.z).toBe(closed[hovered]!.z); // keeps its place in the stack
    const shown = (p: typeof open, i: number) => [p[i - 1]!.x + half, p[i]!.x + half]; // its uncovered span
    const [wasFrom, wasTo] = shown(closed, hovered);
    const [from, to] = shown(open, hovered);
    expect(to - from).toBeGreaterThan(wasTo - wasFrom + 40); // visibly opens
    expect(from).toBeLessThanOrEqual(wasFrom + 0.001); // only grows, so the pointer stays on it
    expect(to).toBeGreaterThanOrEqual(wasTo - 0.001);
    const strips = open.slice(2).map((p, i) => p.x - open[i + 1]!.x);
    strips.forEach((g) => expect(g).toBeGreaterThanOrEqual(MIN_STRIP_OPEN - 0.001));
    for (const [, r] of edges(open)) expect(r).toBeLessThanOrEqual(STAGE / 2);
  }
});

it("opens a card fully when the stage is wide enough", () => {
  const wide = 1800;
  const half = (cardWidthFor(wide) * SIDE_SCALE) / 2;
  const open = deckLayout({ stage: wide, count: 12, index: 0, hovered: 6 });
  expect(open[6]!.x - open[5]!.x).toBeGreaterThanOrEqual(2 * half);
});

it("mirrors on the left", () => {
  const poses = deckLayout({ stage: STAGE, count: 5, index: 4, hovered: null });
  expect(poses.slice(0, 4).every((p) => p.x < 0)).toBe(true);
});
