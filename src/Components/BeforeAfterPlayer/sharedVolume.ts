import React from "react";

// One volume for every player on the page, remembered between visits, so turning one
// track up keeps the next one at the same level.
const KEY = "rdr-volume";
const DEFAULT = 0.5;

const read = () => {
  try {
    const stored = Number(localStorage.getItem(KEY));
    return localStorage.getItem(KEY) !== null && stored >= 0 && stored <= 1 ? stored : DEFAULT;
  } catch {
    return DEFAULT; // storage blocked (private mode, previews)
  }
};

let volume = read();
const listeners = new Set<() => void>();

export const getSharedVolume = () => volume;

export function setSharedVolume(next: number) {
  volume = Math.min(1, Math.max(0, next));
  try {
    localStorage.setItem(KEY, String(volume));
  } catch {
    // still shared for this page, just not remembered
  }
  listeners.forEach((notify) => notify());
}

const subscribe = (notify: () => void) => {
  listeners.add(notify);
  return () => listeners.delete(notify);
};

export const useSharedVolume = () => React.useSyncExternalStore(subscribe, getSharedVolume);
