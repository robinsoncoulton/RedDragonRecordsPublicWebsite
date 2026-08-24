import React from "react";
import { METER_FFT_SIZE, MeterFrame, MeterState, createMeterState, emptyMeterFrame, sampleMeter } from "./meter";
import { BeforeAfterTrack } from "./types";
import { clamp01, stopBufferSources } from "./utils";
import { WAVEFORM_BARS, normalizePeaks, peaksFromBuffer } from "./waveform";

const DEFAULT_CROSSFADE_MS = 200;

type EngineOptions = {
  tracks: BeforeAfterTrack[];
  crossfadeMs?: number;
};

export const usePlayerEngine = ({ tracks, crossfadeMs = DEFAULT_CROSSFADE_MS }: EngineOptions) => {
  const ctxRef = React.useRef<AudioContext | null>(null);
  const masterRef = React.useRef<GainNode | null>(null);
  const splitterRef = React.useRef<ChannelSplitterNode | null>(null);
  const analyserLRef = React.useRef<AnalyserNode | null>(null);
  const analyserRRef = React.useRef<AnalyserNode | null>(null);
  const gainsRef = React.useRef<GainNode[]>([]);
  const buffersRef = React.useRef<AudioBuffer[]>([]);
  const sourcesRef = React.useRef<AudioBufferSourceNode[]>([]);
  const mixesRef = React.useRef<number[]>([]);
  const startedAtRef = React.useRef(0);
  const offsetRef = React.useRef(0);
  const durationRef = React.useRef(0);
  const playingRef = React.useRef(false);
  const loopingRef = React.useRef(false);
  const activeIndexRef = React.useRef(0);
  const volumeRef = React.useRef(0.5);
  const generationRef = React.useRef(0);
  const fadeRafRef = React.useRef<number | null>(null);
  const readyRef = React.useRef(false);
  const scrubbingRef = React.useRef(false);
  const resumeAfterScrubRef = React.useRef(false);
  const meterStateRef = React.useRef<MeterState>(createMeterState());
  const timeLRef = React.useRef(new Float32Array(0));
  const timeRRef = React.useRef(new Float32Array(0));
  const freqRef = React.useRef(new Uint8Array(0));
  const lastFrameRef = React.useRef<MeterFrame>(emptyMeterFrame());

  const [playing, setPlaying] = React.useState(false);
  const [looping, setLooping] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [volume, setVolumeState] = React.useState(0.5);
  const [ready, setReady] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [peaks, setPeaks] = React.useState<Float32Array[]>([]);

  const applyMixes = (mixes: number[]) => {
    mixesRef.current = mixes;
    gainsRef.current.forEach((gain, index) => {
      gain.gain.value = clamp01(mixes[index] ?? 0);
    });
  };

  const cancelFade = () => {
    if (fadeRafRef.current !== null) {
      window.cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
  };

  const stopSources = () => {
    generationRef.current += 1;
    stopBufferSources(sourcesRef.current);
    sourcesRef.current = [];
  };

  const currentOffset = () => {
    const ctx = ctxRef.current;
    const total = durationRef.current;
    if (!playingRef.current || !ctx || total <= 0) {
      return offsetRef.current;
    }
    const elapsed = Math.max(0, ctx.currentTime - startedAtRef.current);
    const position = offsetRef.current + elapsed;
    if (loopingRef.current) {
      return position % total;
    }
    return Math.min(position, total);
  };

  const startSourcesAt = async (offset: number) => {
    const ctx = ctxRef.current;
    const buffers = buffersRef.current;
    const gains = gainsRef.current;
    const total = durationRef.current;
    if (!ctx || buffers.length < 2 || gains.length !== buffers.length || total <= 0) {
      return;
    }
    await ctx.resume();
    stopSources();
    const gen = generationRef.current;
    const startOffset = Math.min(Math.max(0, offset), Math.max(0, total - 0.0001));
    const when = ctx.currentTime;
    const loop = loopingRef.current;
    const sources = buffers.map((buffer, index) => {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = loop;
      source.loopStart = 0;
      source.loopEnd = total;
      source.connect(gains[index]);
      if (loop) {
        source.start(when, startOffset);
      } else {
        source.start(when, startOffset, Math.max(0, total - startOffset));
      }
      return source;
    });
    const leader = sources[activeIndexRef.current] ?? sources[0];
    leader.onended = () => {
      if (generationRef.current !== gen || loopingRef.current || !playingRef.current) {
        return;
      }
      offsetRef.current = 0;
      playingRef.current = false;
      setPlaying(false);
      stopSources();
    };
    sourcesRef.current = sources;
    startedAtRef.current = when;
    offsetRef.current = startOffset;
    playingRef.current = true;
    setPlaying(true);
  };

  const crossfadeTo = (nextIndex: number) => {
    cancelFade();
    const count = mixesRef.current.length;
    if (count === 0 || nextIndex < 0 || nextIndex >= count) {
      return;
    }
    const from = gainsRef.current.map(
      (gain, index) => gain.gain.value || mixesRef.current[index] || 0
    );
    const to = Array.from({ length: count }, (_, index) => (index === nextIndex ? 1 : 0));
    const started = performance.now();
    const fadeDuration = Math.max(1, crossfadeMs);

    const tick = (now: number) => {
      const t = clamp01((now - started) / fadeDuration);
      const eased = t * t * (3 - 2 * t);
      applyMixes(from.map((value, index) => value + (to[index] - value) * eased));
      if (t < 1) {
        fadeRafRef.current = window.requestAnimationFrame(tick);
        return;
      }
      applyMixes(to);
      fadeRafRef.current = null;
    };

    fadeRafRef.current = window.requestAnimationFrame(tick);
  };

  React.useEffect(() => {
    volumeRef.current = volume;
    const master = masterRef.current;
    if (master) {
      master.gain.value = clamp01(volume);
    }
  }, [volume]);

  React.useEffect(() => {
    loopingRef.current = looping;
  }, [looping]);

  React.useEffect(() => {
    let cancelled = false;
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = clamp01(volumeRef.current);
    const tap = ctx.createGain();
    tap.gain.value = 1;
    const splitter = ctx.createChannelSplitter(2);
    const analyserL = ctx.createAnalyser();
    const analyserR = ctx.createAnalyser();
    analyserL.fftSize = METER_FFT_SIZE;
    analyserR.fftSize = METER_FFT_SIZE;
    analyserL.smoothingTimeConstant = 0.25;
    analyserR.smoothingTimeConstant = 0.25;
    tap.connect(master);
    tap.connect(splitter);
    master.connect(ctx.destination);
    splitter.connect(analyserL, 0);
    splitter.connect(analyserR, 1);
    ctxRef.current = ctx;
    masterRef.current = master;
    splitterRef.current = splitter;
    analyserLRef.current = analyserL;
    analyserRRef.current = analyserR;
    timeLRef.current = new Float32Array(analyserL.fftSize);
    timeRRef.current = new Float32Array(analyserR.fftSize);
    freqRef.current = new Uint8Array(analyserL.frequencyBinCount);
    readyRef.current = false;
    setReady(false);
    setPeaks([]);
    setDuration(0);
    cancelFade();
    stopSources();
    offsetRef.current = 0;
    playingRef.current = false;
    setPlaying(false);
    activeIndexRef.current = 0;
    setActiveIndex(0);
    meterStateRef.current = createMeterState();

    const load = async () => {
      if (tracks.length < 2) {
        return;
      }
      const buffers = await Promise.all(
        tracks.map(async (track) => {
          const response = await fetch(track.src);
          const data = await response.arrayBuffer();
          return ctx.decodeAudioData(data);
        })
      );
      if (cancelled) {
        return;
      }
      buffersRef.current = buffers;
      const total = Math.min(...buffers.map((buffer) => buffer.duration));
      durationRef.current = total;
      setDuration(total);
      const gains = buffers.map((_, index) => {
        const gain = ctx.createGain();
        gain.gain.value = index === 0 ? 1 : 0;
        gain.connect(tap);
        return gain;
      });
      gainsRef.current = gains;
      mixesRef.current = buffers.map((_, index) => (index === 0 ? 1 : 0));
      const nextPeaks = normalizePeaks(
        buffers.map((buffer) => peaksFromBuffer(buffer, WAVEFORM_BARS))
      );
      setPeaks(nextPeaks);
      readyRef.current = true;
      setReady(true);
    };

    void load().catch(() => {
      if (!cancelled) {
        readyRef.current = false;
        setReady(false);
      }
    });

    return () => {
      cancelled = true;
      cancelFade();
      stopSources();
      gainsRef.current.forEach((gain) => gain.disconnect());
      gainsRef.current = [];
      buffersRef.current = [];
      splitter.disconnect();
      analyserL.disconnect();
      analyserR.disconnect();
      tap.disconnect();
      master.disconnect();
      void ctx.close();
      ctxRef.current = null;
      masterRef.current = null;
      splitterRef.current = null;
      analyserLRef.current = null;
      analyserRRef.current = null;
      readyRef.current = false;
      setReady(false);
    };
  }, [tracks]);

  const pause = () => {
    offsetRef.current = currentOffset();
    playingRef.current = false;
    setPlaying(false);
    stopSources();
  };

  const play = () => {
    if (!readyRef.current || playingRef.current) {
      return Promise.resolve();
    }
    return startSourcesAt(currentOffset()).catch(() => {
      playingRef.current = false;
      setPlaying(false);
    });
  };

  const togglePlay = () => {
    if (!readyRef.current) {
      return;
    }
    if (playingRef.current) {
      pause();
      return;
    }
    void play();
  };

  const setLoop = (next: boolean) => {
    if (loopingRef.current === next) {
      return;
    }
    loopingRef.current = next;
    setLooping(next);
    if (!playingRef.current) {
      return;
    }
    void startSourcesAt(currentOffset()).catch(() => {
      playingRef.current = false;
      setPlaying(false);
    });
  };

  const select = (nextIndex: number) => {
    if (nextIndex === activeIndexRef.current || nextIndex < 0 || nextIndex >= tracks.length) {
      return;
    }
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    crossfadeTo(nextIndex);
  };

  const seek = (seconds: number) => {
    const total = durationRef.current;
    const next = Math.min(Math.max(0, seconds), Math.max(0, total - 0.0001));
    offsetRef.current = next;
    if (playingRef.current) {
      void startSourcesAt(next).catch(() => {
        playingRef.current = false;
        setPlaying(false);
      });
    }
  };

  const setOffsetRatio = (ratio: number) => {
    offsetRef.current = clamp01(ratio) * Math.max(0, durationRef.current - 0.0001);
  };

  const beginScrub = () => {
    scrubbingRef.current = true;
    if (playingRef.current) {
      resumeAfterScrubRef.current = true;
      pause();
    }
  };

  const endScrub = () => {
    scrubbingRef.current = false;
    if (!resumeAfterScrubRef.current) {
      return;
    }
    resumeAfterScrubRef.current = false;
    void play();
  };

  const readMeterFrame = () => {
    const frame = sampleMeter(
      analyserLRef.current,
      analyserRRef.current,
      timeLRef.current,
      timeRRef.current,
      freqRef.current,
      meterStateRef.current,
      playingRef.current
    );
    lastFrameRef.current = frame;
    return frame;
  };

  return {
    ready,
    playing,
    looping,
    activeIndex,
    volume,
    duration,
    peaks,
    play,
    pause,
    togglePlay,
    seek,
    select,
    setLoop,
    setVolume: (next: number) => setVolumeState(clamp01(next)),
    getCurrentTime: currentOffset,
    getDuration: () => durationRef.current,
    getActiveIndex: () => activeIndexRef.current,
    isPlaying: () => playingRef.current,
    isReady: () => readyRef.current,
    isScrubbing: () => scrubbingRef.current,
    setOffsetRatio,
    beginScrub,
    endScrub,
    readMeterFrame,
    getLevels: () => lastFrameRef.current,
  };
};
