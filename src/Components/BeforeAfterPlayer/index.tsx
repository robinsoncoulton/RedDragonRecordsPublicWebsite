import React from "react";
import { getColors } from "../../Styles/colors";
import { TrackSelect } from "./TrackSelect";
import { VuMeter, VuMeterHandle } from "./VuMeter";
import {
  ControlButton,
  Row,
  Shell,
  VolumeLabel,
  VolumeRow,
  VolumeSlider,
  VolumeValue,
  WaveformCanvas,
  WaveformLabel,
  WaveformLabels,
  WaveformStack,
} from "./styles";
import {
  BeforeAfterPlayerHandle,
  BeforeAfterPlayerProps,
  BeforeAfterTrack,
} from "./types";
import { MeterFrame } from "./meter";
import { usePlayerEngine } from "./usePlayerEngine";
import { clamp01, formatTime, resolveTracks } from "./utils";
import { WAVEFORM_ROW_HEIGHT, drawWaveforms } from "./waveform";

const BeforeAfterPlayer = React.forwardRef<BeforeAfterPlayerHandle, BeforeAfterPlayerProps>(
  (
    {
      theme,
      tracks: tracksProp,
      srcA,
      srcB,
      labelA = "Before",
      labelB = "After",
      crossfadeMs,
      showProgress = false,
      showWaveform = false,
      showMeter = false,
      syncToBpm = false,
      onLevels,
    },
    ref
  ) => {
    const tracks = React.useMemo(
      () => resolveTracks({ tracks: tracksProp, srcA, srcB, labelA, labelB }),
      [tracksProp, srcA, srcB, labelA, labelB]
    );
    const engine = usePlayerEngine({ tracks, crossfadeMs });
    const [bpmSync, setBpmSync] = React.useState(syncToBpm);
    const shellRef = React.useRef<HTMLDivElement | null>(null);
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const progressSliderRef = React.useRef<HTMLInputElement | null>(null);
    const currentTimeRef = React.useRef<HTMLSpanElement | null>(null);
    const vuRef = React.useRef<VuMeterHandle | null>(null);
    const peaksRef = React.useRef(engine.peaks);
    const onLevelsRef = React.useRef(onLevels);
    const paintRef = React.useRef<() => void>(() => {});

    peaksRef.current = engine.peaks;
    onLevelsRef.current = onLevels;
    engine.setPulseSync(bpmSync);

    React.useEffect(() => {
      setBpmSync(syncToBpm);
    }, [syncToBpm]);

    const paint = () => {
      const total = engine.getDuration();
      const offset = engine.getCurrentTime();
      const ratio = total > 0 ? clamp01(offset / total) : 0;
      if (progressSliderRef.current && !engine.isScrubbing()) {
        progressSliderRef.current.value = String(Math.round(ratio * 1000));
      }
      if (currentTimeRef.current) {
        currentTimeRef.current.textContent = formatTime(offset);
      }
      const canvas = canvasRef.current;
      if (canvas && peaksRef.current.length > 0) {
        drawWaveforms(
          canvas,
          peaksRef.current,
          engine.getActiveIndex(),
          ratio,
          getColors(theme)
        );
      }
      const frame = engine.readMeterFrame();
      if (shellRef.current) {
        shellRef.current.style.setProperty("--pulse", String(frame.pulse));
        shellRef.current.style.setProperty("--energy", String(frame.energy));
      }
      vuRef.current?.setLevels(frame.peakL, frame.peakR, frame.holdL, frame.holdR);
      onLevelsRef.current?.(frame);
    };

    paintRef.current = paint;

    React.useEffect(() => {
      paintRef.current();
      if (!engine.playing) {
        let frames = 24;
        let raf = 0;
        const tick = () => {
          paintRef.current();
          frames -= 1;
          if (frames > 0) {
            raf = window.requestAnimationFrame(tick);
          }
        };
        raf = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(raf);
      }
      let raf = 0;
      const tick = () => {
        paintRef.current();
        raf = window.requestAnimationFrame(tick);
      };
      raf = window.requestAnimationFrame(tick);
      return () => window.cancelAnimationFrame(raf);
    }, [engine.playing, showProgress, showWaveform, showMeter, bpmSync, engine.tempo, engine.peaks, engine.activeIndex, theme, engine.ready]);

    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !showWaveform) {
        return;
      }
      const observer = new ResizeObserver(() => paintRef.current());
      observer.observe(canvas);
      return () => observer.disconnect();
    }, [showWaveform, engine.peaks]);

    const ratioFromPointer = (event: React.PointerEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width <= 0) {
        return 0;
      }
      return clamp01((event.clientX - rect.left) / rect.width);
    };

    const rowFromPointer = (event: React.PointerEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.height <= 0 || tracks.length === 0) {
        return 0;
      }
      const rowHeight = rect.height / tracks.length;
      return Math.min(
        tracks.length - 1,
        Math.max(0, Math.floor((event.clientY - rect.top) / rowHeight))
      );
    };

    React.useImperativeHandle(ref, () => ({
      play: engine.play,
      pause: engine.pause,
      togglePlay: engine.togglePlay,
      seek: engine.seek,
      select: engine.select,
      setLoop: engine.setLoop,
      setVolume: engine.setVolume,
      getCurrentTime: engine.getCurrentTime,
      getDuration: engine.getDuration,
      getActiveIndex: engine.getActiveIndex,
      isPlaying: engine.isPlaying,
      isReady: engine.isReady,
      getLevels: engine.getLevels,
      getBpm: engine.getBpm,
    }));

    if (tracks.length < 2) {
      return null;
    }

    return (
      <Shell ref={shellRef} theme={theme}>
        <Row>
          <ControlButton
            theme={theme}
            type="button"
            onClick={engine.togglePlay}
            disabled={!engine.ready}
          >
            {!engine.ready ? "Loading" : engine.playing ? "Pause" : "Play"}
          </ControlButton>
          <ControlButton
            theme={theme}
            type="button"
            $active={engine.looping}
            aria-pressed={engine.looping}
            onClick={() => engine.setLoop(!engine.looping)}
          >
            Loop
          </ControlButton>
          {engine.tempo ? (
            <ControlButton
              theme={theme}
              type="button"
              $active={bpmSync}
              aria-pressed={bpmSync}
              onClick={() => setBpmSync((value) => !value)}
            >
              {Math.round(engine.tempo.bpm)} BPM
            </ControlButton>
          ) : null}
        </Row>

        <TrackSelect
          theme={theme}
          tracks={tracks}
          activeIndex={engine.activeIndex}
          onSelect={engine.select}
        />

        {showWaveform ? (
          <WaveformStack
            theme={theme}
            style={{ minHeight: tracks.length * WAVEFORM_ROW_HEIGHT }}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              engine.beginScrub();
              engine.select(rowFromPointer(event));
              engine.setOffsetRatio(ratioFromPointer(event));
              paintRef.current();
            }}
            onPointerMove={(event) => {
              if (!engine.isScrubbing()) {
                return;
              }
              engine.select(rowFromPointer(event));
              engine.setOffsetRatio(ratioFromPointer(event));
              paintRef.current();
            }}
            onPointerUp={() => {
              engine.endScrub();
              paintRef.current();
            }}
            onPointerCancel={() => {
              engine.endScrub();
              paintRef.current();
            }}
          >
            <WaveformCanvas ref={canvasRef} />
            <WaveformLabels $rows={tracks.length}>
              {tracks.map((track, index) => (
                <WaveformLabel
                  key={`${track.label}-wave-${index}`}
                  theme={theme}
                  $active={engine.activeIndex === index}
                >
                  {track.label}
                </WaveformLabel>
              ))}
            </WaveformLabels>
          </WaveformStack>
        ) : null}

        {showProgress ? (
          <VolumeRow>
            <VolumeValue ref={currentTimeRef}>{formatTime(0)}</VolumeValue>
            <VolumeSlider
              ref={progressSliderRef}
              theme={theme}
              type="range"
              min={0}
              max={1000}
              step={1}
              defaultValue={0}
              disabled={!engine.ready}
              aria-label="Seek"
              onPointerDown={engine.beginScrub}
              onPointerUp={engine.endScrub}
              onPointerCancel={engine.endScrub}
              onInput={(event) => {
                engine.setOffsetRatio(Number(event.currentTarget.value) / 1000);
                paintRef.current();
              }}
              onChange={(event) => {
                const ratio = Number(event.currentTarget.value) / 1000;
                if (engine.isScrubbing()) {
                  engine.setOffsetRatio(ratio);
                  paintRef.current();
                  return;
                }
                engine.seek(ratio * engine.getDuration());
                paintRef.current();
              }}
            />
            <VolumeValue>{formatTime(engine.duration)}</VolumeValue>
          </VolumeRow>
        ) : null}

        {showMeter ? <VuMeter ref={vuRef} theme={theme} /> : null}

        <VolumeRow>
          <VolumeLabel>Volume</VolumeLabel>
          <VolumeSlider
            theme={theme}
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(engine.volume * 100)}
            onChange={(event) => engine.setVolume(Number(event.target.value) / 100)}
            aria-label="Global volume"
          />
          <VolumeValue>{Math.round(engine.volume * 100)}%</VolumeValue>
        </VolumeRow>
      </Shell>
    );
  }
);

BeforeAfterPlayer.displayName = "BeforeAfterPlayer";

export type { BeforeAfterPlayerHandle, BeforeAfterPlayerProps, BeforeAfterTrack, MeterFrame };
export { BeforeAfterPlayer };
export default BeforeAfterPlayer;
