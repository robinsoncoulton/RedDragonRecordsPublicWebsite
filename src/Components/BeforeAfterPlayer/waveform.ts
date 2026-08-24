import { Palette } from "../../Styles/types";

export const WAVEFORM_BARS = 320;
export const WAVEFORM_ROW_HEIGHT = 52;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const peaksFromBuffer = (buffer: AudioBuffer, bars: number) => {
  const left = buffer.getChannelData(0);
  const right = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : left;
  const length = left.length;
  const block = Math.max(1, Math.floor(length / bars));
  const step = Math.max(1, Math.floor(block / 48));
  const peaks = new Float32Array(bars);
  for (let i = 0; i < bars; i += 1) {
    let max = 0;
    const start = i * block;
    const end = Math.min(length, start + block);
    for (let j = start; j < end; j += step) {
      const sample = (Math.abs(left[j] ?? 0) + Math.abs(right[j] ?? 0)) * 0.5;
      if (sample > max) {
        max = sample;
      }
    }
    peaks[i] = max;
  }
  return peaks;
};

export const normalizePeaks = (rows: Float32Array[]) => {
  let max = 0;
  rows.forEach((row) => {
    for (let i = 0; i < row.length; i += 1) {
      if (row[i] > max) {
        max = row[i];
      }
    }
  });
  if (max <= 0) {
    return rows;
  }
  const scale = 1 / max;
  return rows.map((row) => {
    const next = new Float32Array(row.length);
    for (let i = 0; i < row.length; i += 1) {
      next[i] = row[i] * scale;
    }
    return next;
  });
};

export const drawWaveforms = (
  canvas: HTMLCanvasElement,
  peaks: Float32Array[],
  activeIndex: number,
  progress: number,
  colors: Palette
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx || peaks.length === 0) {
    return;
  }
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = WAVEFORM_ROW_HEIGHT * peaks.length;
  const pixelWidth = Math.max(1, Math.floor(width * dpr));
  const pixelHeight = Math.max(1, Math.floor(height * dpr));
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  peaks.forEach((row, index) => {
    const y0 = index * WAVEFORM_ROW_HEIGHT;
    const mid = y0 + WAVEFORM_ROW_HEIGHT / 2;
    const amp = WAVEFORM_ROW_HEIGHT / 2 - 6;
    ctx.fillStyle = index === activeIndex ? colors.primary : colors.accentLight;
    const gap = width / row.length;
    for (let i = 0; i < row.length; i += 1) {
      const h = Math.max(1, row[i] * amp);
      ctx.fillRect(i * gap, mid - h, Math.max(1, gap * 0.85), h * 2);
    }
  });

  const x = clamp01(progress) * width;
  ctx.strokeStyle = colors.text;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + 0.5, 0);
  ctx.lineTo(x + 0.5, height);
  ctx.stroke();
};
