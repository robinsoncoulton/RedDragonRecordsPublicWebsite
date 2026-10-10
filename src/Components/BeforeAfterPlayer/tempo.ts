import { clamp01 } from "./utils";

export type TempoMap = {
  bpm: number;
  offset: number;
  confidence: number;
};

const MIN_BPM = 72;
const MAX_BPM = 176;
const ENVELOPE_HZ = 250;
const ANALYZE_SECONDS = 8;
const LOWPASS_HZ = 110;

const mixSample = (left: Float32Array, right: Float32Array, index: number) =>
  ((left[index] ?? 0) + (right[index] ?? 0)) * 0.5;

const onsetEnvelope = (buffer: AudioBuffer) => {
  const sampleRate = buffer.sampleRate;
  const hop = Math.max(1, Math.round(sampleRate / ENVELOPE_HZ));
  const left = buffer.getChannelData(0);
  const right = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : left;
  const limit = Math.min(left.length, Math.floor(sampleRate * ANALYZE_SECONDS));
  const count = Math.floor(limit / hop);
  const env = new Float32Array(count);
  const alpha = 1 - Math.exp((-2 * Math.PI * LOWPASS_HZ) / sampleRate);
  let lp = 0;
  let prev = 0;
  for (let i = 0; i < count; i += 1) {
    const start = i * hop;
    let sum = 0;
    for (let j = 0; j < hop; j += 1) {
      const sample = mixSample(left, right, start + j);
      lp += alpha * (sample - lp);
      sum += lp * lp;
    }
    const rms = Math.sqrt(sum / hop);
    env[i] = Math.max(0, rms - prev * 0.65);
    prev = rms;
  }
  return env;
};

const correlate = (env: Float32Array, lag: number) => {
  if (lag <= 0 || lag >= env.length) {
    return 0;
  }
  let sum = 0;
  const n = env.length - lag;
  for (let i = 0; i < n; i += 1) {
    sum += env[i] * env[i + lag];
  }
  return n > 0 ? sum / n : 0;
};

const combScore = (env: Float32Array, lag: number) => {
  const fundamental = correlate(env, lag);
  const double = correlate(env, lag * 2);
  const triple = correlate(env, lag * 3);
  const half = correlate(env, Math.round(lag / 2));
  return fundamental + double * 0.45 + triple * 0.2 - half * 0.15;
};

const lagToBpm = (lag: number) => (60 * ENVELOPE_HZ) / lag;

const bpmToLag = (bpm: number) => Math.round((60 * ENVELOPE_HZ) / bpm);

const pickMusicalBpm = (bpm: number, env: Float32Array) => {
  const options = [bpm / 2, bpm, bpm * 2].filter((value) => value >= MIN_BPM && value <= MAX_BPM);
  let best = bpm;
  let bestScore = -Infinity;
  options.forEach((value) => {
    const lag = bpmToLag(value);
    const centered = 1 - Math.abs(value - 118) / 160;
    const score = combScore(env, lag) * (0.82 + clamp01(centered) * 0.18);
    if (score > bestScore) {
      bestScore = score;
      best = value;
    }
  });
  return best;
};

const beatOffset = (env: Float32Array, lag: number) => {
  let bestPhase = 0;
  let bestScore = -Infinity;
  for (let phase = 0; phase < lag; phase += 1) {
    let score = 0;
    let hits = 0;
    for (let i = phase; i < env.length; i += lag) {
      score += env[i] ?? 0;
      hits += 1;
    }
    const mean = hits > 0 ? score / hits : 0;
    if (mean > bestScore) {
      bestScore = mean;
      bestPhase = phase;
    }
  }
  return bestPhase / ENVELOPE_HZ;
};

export const detectTempo = (buffer: AudioBuffer): TempoMap | null => {
  const env = onsetEnvelope(buffer);
  if (env.length < ENVELOPE_HZ * 4) {
    return null;
  }
  const minLag = bpmToLag(MAX_BPM);
  const maxLag = Math.min(bpmToLag(MIN_BPM), Math.floor(env.length / 4));
  let bestLag = minLag;
  let bestScore = -Infinity;
  let total = 0;
  let count = 0;
  for (let lag = minLag; lag <= maxLag; lag += 1) {
    const score = combScore(env, lag);
    total += score;
    count += 1;
    if (score > bestScore) {
      bestScore = score;
      bestLag = lag;
    }
  }
  const mean = count > 0 ? total / count : 0;
  if (bestScore <= 0 || bestScore < mean * 1.18) {
    return null;
  }
  const bpm = pickMusicalBpm(lagToBpm(bestLag), env);
  const lag = bpmToLag(bpm);
  return {
    bpm,
    offset: beatOffset(env, lag),
    confidence: mean > 0 ? bestScore / mean : 0,
  };
};

export const beatPulse = (time: number, tempo: TempoMap, playing: boolean) => {
  if (!playing || tempo.bpm <= 0) {
    return { pulse: 0, energy: 0, beat: 0 };
  }
  const period = 60 / tempo.bpm;
  const shifted = Math.max(0, time - tempo.offset);
  const beats = shifted / period;
  const frac = beats - Math.floor(beats);
  const downbeat = Math.floor(beats) % 4 === 0;
  const pulse = Math.exp(-frac * 5.5) * (downbeat ? 0.62 : 0.38);
  return {
    pulse,
    energy: pulse * 0.4,
    beat: beats,
  };
};
