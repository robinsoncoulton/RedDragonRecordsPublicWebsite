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
};
