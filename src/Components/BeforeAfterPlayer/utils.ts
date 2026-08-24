import { BeforeAfterPlayerProps, BeforeAfterTrack } from "./types";

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }
  const whole = Math.floor(seconds);
  const minutes = Math.floor(whole / 60);
  const rest = whole % 60;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
};

export const resolveTracks = ({
  tracks,
  srcA,
  srcB,
  labelA = "Before",
  labelB = "After",
}: Pick<
  BeforeAfterPlayerProps,
  "tracks" | "srcA" | "srcB" | "labelA" | "labelB"
>): BeforeAfterTrack[] => {
  if (tracks && tracks.length >= 2) {
    return tracks;
  }
  if (srcA && srcB) {
    return [
      { src: srcA, label: labelA },
      { src: srcB, label: labelB },
    ];
  }
  return [];
};

export const stopBufferSources = (sources: AudioBufferSourceNode[]) => {
  sources.forEach((source) => {
    source.onended = null;
    try {
      source.stop();
    } catch {
      return;
    } finally {
      source.disconnect();
    }
  });
};
