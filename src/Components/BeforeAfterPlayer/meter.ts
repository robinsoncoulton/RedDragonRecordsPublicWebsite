import { clamp01 } from "./utils";

export type MeterFrame = {
  peakL: number;
  peakR: number;
  holdL: number;
  holdR: number;
  rms: number;
  flux: number;
  energy: number;
  pulse: number;
  bass: number;
  bpm: number;
  beat: number;
};

export type MeterState = {
  prevRms: number;
  prevPeak: number;
  prevKick: number;
  prevSnare: number;
  energy: number;
  pulse: number;
  holdL: number;
  holdR: number;
  holdAgeL: number;
  holdAgeR: number;
};

const FFT_SIZE = 2048;
const HOLD_FRAMES = 16;
const KICK_HZ = { from: 45, to: 95 };
const SNARE_HZ = { from: 2500, to: 5200 };
const BASS_HZ = { from: 35, to: 120 };
const FLUX_LEAK = 0.55;
const ONSET_GATE = 0.05;
const ONSET_SPAN = 0.32;
const LOG_STEEPNESS = 99;
const LOG_POWER = 4;
const PULSE_ATTACK = 0.5;
const PULSE_RELEASE = 0.07;
const ENERGY_ATTACK = 0.1;
const ENERGY_RELEASE = 0.035;
const SILENT_FRAME: MeterFrame = {
  peakL: 0,
  peakR: 0,
  holdL: 0,
  holdR: 0,
  rms: 0,
  flux: 0,
  energy: 0,
  pulse: 0,
  bass: 0,
  bpm: 0,
  beat: 0,
};

export const METER_FFT_SIZE = FFT_SIZE;

export const createMeterState = (): MeterState => ({
  prevRms: 0,
  prevPeak: 0,
  prevKick: 0,
  prevSnare: 0,
  energy: 0,
  pulse: 0,
  holdL: 0,
  holdR: 0,
  holdAgeL: 0,
  holdAgeR: 0,
});

export const emptyMeterFrame = (): MeterFrame => ({ ...SILENT_FRAME });

const peakOf = (samples: Float32Array) => {
  let peak = 0;
  let sumSq = 0;
  for (let i = 0; i < samples.length; i += 1) {
    const value = Math.abs(samples[i] ?? 0);
    if (value > peak) {
      peak = value;
    }
    sumSq += value * value;
  }
  return { peak, rms: Math.sqrt(sumSq / Math.max(1, samples.length)) };
};

const toMeterScale = (peak: number) => {
  const db = 20 * Math.log10(Math.max(peak, 1e-6));
  return clamp01((db + 42) / 42);
};

const updateHold = (state: MeterState, side: "L" | "R", peak: number) => {
  const holdKey = side === "L" ? "holdL" : "holdR";
  const ageKey = side === "L" ? "holdAgeL" : "holdAgeR";
  if (peak >= state[holdKey]) {
    state[holdKey] = peak;
    state[ageKey] = 0;
    return;
  }
  state[ageKey] += 1;
  if (state[ageKey] > HOLD_FRAMES) {
    state[holdKey] *= 0.92;
  }
};

const bandLevel = (
  bins: Uint8Array,
  sampleRate: number,
  fftSize: number,
  fromHz: number,
  toHz: number
) => {
  const binHz = sampleRate / fftSize;
  const start = Math.max(1, Math.floor(fromHz / binHz));
  const end = Math.min(bins.length - 1, Math.ceil(toHz / binHz));
  let sum = 0;
  let count = 0;
  for (let i = start; i <= end; i += 1) {
    sum += (bins[i] ?? 0) / 255;
    count += 1;
  }
  return count > 0 ? sum / count : 0;
};

const onsetOf = (current: number, previous: number) =>
  Math.max(0, current - previous * FLUX_LEAK);

const steepLog = (value: number) => {
  const u = clamp01((value - ONSET_GATE) / ONSET_SPAN);
  if (u <= 0) {
    return 0;
  }
  return Math.log10(1 + LOG_STEEPNESS * Math.pow(u, LOG_POWER)) / Math.log10(1 + LOG_STEEPNESS);
};

const follow = (current: number, target: number, attack: number, release: number) => {
  const coeff = target > current ? attack : release;
  return current + (target - current) * coeff;
};

export const sampleMeter = (
  analyserL: AnalyserNode | null,
  analyserR: AnalyserNode | null,
  timeL: Float32Array,
  timeR: Float32Array,
  freq: Uint8Array,
  state: MeterState,
  playing: boolean
): MeterFrame => {
  if (!analyserL || !analyserR || !playing) {
    state.pulse = follow(state.pulse, 0, PULSE_ATTACK, PULSE_RELEASE);
    state.energy = follow(state.energy, 0, ENERGY_ATTACK, ENERGY_RELEASE);
    state.holdL *= 0.86;
    state.holdR *= 0.86;
    state.prevKick *= 0.9;
    state.prevSnare *= 0.9;
    state.prevRms *= 0.85;
    state.prevPeak *= 0.85;
    if (state.pulse < 0.002) {
      state.pulse = 0;
    }
    if (state.energy < 0.002) {
      state.energy = 0;
    }
    return {
      peakL: 0,
      peakR: 0,
      holdL: state.holdL,
      holdR: state.holdR,
      rms: 0,
      flux: 0,
      energy: state.energy,
      pulse: state.pulse,
      bass: 0,
      bpm: 0,
      beat: 0,
    };
  }

  analyserL.getFloatTimeDomainData(timeL);
  analyserR.getFloatTimeDomainData(timeR);
  analyserL.getByteFrequencyData(freq);

  const left = peakOf(timeL);
  const right = peakOf(timeR);
  const rms = (left.rms + right.rms) * 0.5;
  const sampleRate = analyserL.context.sampleRate;
  const fftSize = analyserL.fftSize;
  const kick = bandLevel(freq, sampleRate, fftSize, KICK_HZ.from, KICK_HZ.to);
  const snare = bandLevel(freq, sampleRate, fftSize, SNARE_HZ.from, SNARE_HZ.to);
  const bass = bandLevel(freq, sampleRate, fftSize, BASS_HZ.from, BASS_HZ.to);
  const kickOnset = onsetOf(kick, state.prevKick);
  const snareOnset = onsetOf(snare, state.prevSnare);
  const flux = Math.max(kickOnset, snareOnset);
  const strength = steepLog(flux);

  state.pulse = follow(state.pulse, strength, PULSE_ATTACK, PULSE_RELEASE);
  state.energy = follow(state.energy, state.pulse * 0.32, ENERGY_ATTACK, ENERGY_RELEASE);

  const peakL = toMeterScale(left.peak);
  const peakR = toMeterScale(right.peak);
  updateHold(state, "L", peakL);
  updateHold(state, "R", peakR);

  state.prevRms = rms;
  state.prevPeak = Math.max(left.peak, right.peak);
  state.prevKick = kick;
  state.prevSnare = snare;

  return {
    peakL,
    peakR,
    holdL: state.holdL,
    holdR: state.holdR,
    rms,
    flux,
    energy: state.energy,
    pulse: state.pulse,
    bass,
    bpm: 0,
    beat: 0,
  };
};
