export const DECK_PEEK_STAGES = 2;
export const DECK_PEEK_STEP_REM = 3;
export const ELASTIC_TRIGGER = 150;

export const peekOpacityFor = (offset: number): number => {
  const depth = Math.abs(offset);
  if (depth < 0.001) {
    return 1;
  }
  if (depth >= DECK_PEEK_STAGES + 1) {
    return 0;
  }
  if (depth < 1) {
    return 1 - depth * (1 - 0.7);
  }
  if (depth <= DECK_PEEK_STAGES) {
    if (DECK_PEEK_STAGES <= 1) {
      return 0.7;
    }
    const t = (depth - 1) / (DECK_PEEK_STAGES - 1);
    return 0.7 - t * 0.5;
  }
  const edge = 0.2;
  const t = depth - DECK_PEEK_STAGES;
  return edge * (1 - t);
};

export const peekBrightnessFor = (offset: number): number => {
  const depth = Math.abs(offset);
  if (depth < 0.001) {
    return 1;
  }
  if (depth >= DECK_PEEK_STAGES + 1) {
    return 0.25;
  }
  if (depth < 1) {
    return 1 - depth * (1 - 0.52);
  }
  if (depth <= DECK_PEEK_STAGES) {
    if (DECK_PEEK_STAGES <= 1) {
      return 0.5;
    }
    const t = (depth - 1) / (DECK_PEEK_STAGES - 1);
    return 0.52 - t * 0.26;
  }
  const edge = 0.26;
  const t = depth - DECK_PEEK_STAGES;
  return edge + (0.25 - edge) * t;
};

export const peekScaleFor = (_offset: number): number => 1;

export const peekTranslateFor = (offset: number) => {
  const distance = offset * DECK_PEEK_STEP_REM;
  return `translate3d(${distance}rem, ${distance}rem, 0)`;
};

export const peekExitOffset = (side: 1 | -1) => side * (DECK_PEEK_STAGES + 1);
