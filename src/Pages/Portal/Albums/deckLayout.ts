/** Horizontal card deck: the current track in the middle, neighbours fully visible, and the rest
 *  stacked closer together the further out they are, always inside the stage. Nearer cards sit on
 *  top, so each stacked card shows a strip on its outer edge. Hovering one opens the deck in front
 *  of it (it and the cards beyond slide out until it's fully visible) and lifts it, keeping its
 *  place in the stack so every other strip stays reachable. Pure, so it's tested without a browser. */

export const SIDE_SCALE = 0.84;
export const MIN_STRIP = 18; // px of every stacked card left showing, so it can always be hovered
export const MIN_STRIP_OPEN = 10; // while one card is opened, the others squeeze to this
const GAP = 16; // px between cards that aren't stacked
const EDGE = 8; // px kept clear of the stage's sides
const DECAY = 0.7; // each step out keeps this share of the previous one's spare room

export type CardPose = { x: number; scale: number; z: number; lifted: boolean; depth: number };

export const cardWidthFor = (stage: number) => Math.round(Math.min(320, Math.max(140, stage * 0.22)));

/** n gaps, each at least MIN_STRIP (when the budget allows) and at most cap, shrinking outward. */
function spread(budget: number, n: number, cap: number, min = MIN_STRIP): number[] {
  if (n <= 0) return [];
  if (budget <= min * n) return Array(n).fill(Math.max(0, budget / n));
  const spare = budget - min * n;
  const first = (spare * (1 - DECAY)) / (1 - DECAY ** n);
  return Array.from({ length: n }, (_, i) => Math.min(cap, min + first * DECAY ** i));
}

/** Centre-to-centre distances of the n cards on one side, nearest first. hovered: 1-based, or null. */
function side(stage: number, width: number, n: number, hovered: number | null): number[] {
  if (n === 0) return [];
  const half = (width * SIDE_SCALE) / 2;
  const reach = stage / 2 - half - EDGE; // furthest a side card's centre may sit
  const clearOfCentre = width / 2 + half + GAP;
  const clearOfCard = 2 * half + GAP;
  const first = Math.max(0, Math.min(clearOfCentre, reach - MIN_STRIP * (n - 1)));
  let steps = spread(reach - first, n - 1, clearOfCard);

  if (hovered !== null && hovered >= 2) {
    // Widen the gap in front of the hovered card (up to its full width) by squeezing the others.
    const budget = reach - first;
    const open = Math.min(clearOfCard, budget - MIN_STRIP_OPEN * (n - 2));
    if (open > steps[hovered - 2]!) {
      const others = spread(budget - open, n - 2, clearOfCard, MIN_STRIP_OPEN);
      steps = [...others.slice(0, hovered - 2), open, ...others.slice(hovered - 2)];
    }
  }

  const xs = [first];
  for (const step of steps) xs.push(xs[xs.length - 1]! + step);
  return xs;
}

export function deckLayout(o: { stage: number; count: number; index: number; hovered: number | null }): CardPose[] {
  const width = cardWidthFor(o.stage);
  const hoverDepth = o.hovered === null ? null : o.hovered - o.index;
  const right = side(o.stage, width, o.count - 1 - o.index, hoverDepth !== null && hoverDepth > 0 ? hoverDepth : null);
  const left = side(o.stage, width, o.index, hoverDepth !== null && hoverDepth < 0 ? -hoverDepth : null);
  return Array.from({ length: o.count }, (_, i) => {
    const depth = i - o.index;
    const lifted = i === o.hovered && depth !== 0;
    const x = depth === 0 ? 0 : depth > 0 ? right[depth - 1]! : -left[-depth - 1]!;
    return { x, scale: depth === 0 ? 1 : SIDE_SCALE, z: 100 - Math.abs(depth), lifted, depth };
  });
}
