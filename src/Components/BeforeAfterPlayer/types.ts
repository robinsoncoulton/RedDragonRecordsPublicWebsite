import type React from "react";
import { Theme } from "../../Utils/Theme/types";
import { MeterFrame } from "./meter";

export type { MeterFrame };

export type BeforeAfterTrack = {
  src: string;
  label: string;
  /** "include" for cross-origin audio behind a session cookie (the portal API). */
  credentials?: RequestCredentials;
};

export type BeforeAfterPlayerHandle = {
  play: () => Promise<void>;
  /** Starts at `when` on the AudioContext clock, e.g. another player's getEndTime(). */
  playAt: (when: number, offset?: number) => Promise<void>;
  /** When playback reaches the end on the AudioContext clock; null if paused or looping. */
  getEndTime: () => number | null;
  pause: () => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  select: (index: number) => void;
  setLoop: (loop: boolean) => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getActiveIndex: () => number;
  isPlaying: () => boolean;
  isReady: () => boolean;
  getLevels: () => MeterFrame;
  getBpm: () => number | null;
};

export type BeforeAfterPlayerProps = {
  theme: Theme;
  tracks?: BeforeAfterTrack[];
  srcA?: string;
  srcB?: string;
  labelA?: string;
  labelB?: string;
  crossfadeMs?: number;
  showProgress?: boolean;
  showWaveform?: boolean;
  showMeter?: boolean;
  syncToBpm?: boolean;
  onLevels?: (levels: MeterFrame) => void;
  /** Drawn over the waveform rows (each WAVEFORM_ROW_HEIGHT tall) without clipping, e.g. comment markers. */
  waveformOverlay?: React.ReactNode;
  /** Share one clock between players so one can start exactly when another ends. */
  audioContext?: AudioContext;
  /** Playback reached the end (not on pause, seek or loop). */
  onEnded?: () => void;
};
