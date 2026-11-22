/** How far ahead of the end the next song is scheduled. Far enough to absorb a slow frame. */
export const HANDOVER_WINDOW_S = 5;

/**
 * When the next song should start on the shared AudioContext clock, or null when it
 * shouldn't be scheduled (play next off, last song, current paused or looping, or not near the end yet).
 */
export const handoverTime = (o: { autoNext: boolean; hasNext: boolean; endTime: number | null; now: number }) =>
  o.autoNext && o.hasNext && o.endTime !== null && o.endTime - o.now <= HANDOVER_WINDOW_S ? o.endTime : null;
