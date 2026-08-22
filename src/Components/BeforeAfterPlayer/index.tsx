import React from "react";
import {
  ActiveLabel,
  CarouselNav,
  ControlButton,
  NavButton,
  Row,
  Shell,
  SideButton,
  SideToggle,
  StepDot,
  StepDots,
  VolumeLabel,
  VolumeRow,
  VolumeSlider,
  VolumeValue,
} from "./styles";
import { BeforeAfterPlayerProps, BeforeAfterTrack } from "./types";

const DEFAULT_CROSSFADE_MS = 200;
const DRIFT_MS = 0.04;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const resolveTracks = ({
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

const BeforeAfterPlayer: React.FC<BeforeAfterPlayerProps> = ({
  theme,
  tracks: tracksProp,
  srcA,
  srcB,
  labelA = "Before",
  labelB = "After",
  crossfadeMs = DEFAULT_CROSSFADE_MS,
}) => {
  const tracks = React.useMemo(
    () => resolveTracks({ tracks: tracksProp, srcA, srcB, labelA, labelB }),
    [tracksProp, srcA, srcB, labelA, labelB]
  );

  const audiosRef = React.useRef<HTMLAudioElement[]>([]);
  const mixesRef = React.useRef<number[]>([]);
  const globalVolumeRef = React.useRef(0.5);
  const activeIndexRef = React.useRef(0);
  const loopingRef = React.useRef(false);
  const playingRef = React.useRef(false);
  const fadeRafRef = React.useRef<number | null>(null);

  const [playing, setPlaying] = React.useState(false);
  const [looping, setLooping] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [globalVolume, setGlobalVolume] = React.useState(0.5);

  const applyVolumes = () => {
    const master = globalVolumeRef.current;
    audiosRef.current.forEach((audio, index) => {
      audio.volume = clamp01(master * (mixesRef.current[index] ?? 0));
    });
  };

  const syncClocks = (prefer = activeIndexRef.current) => {
    const audios = audiosRef.current;
    const leader = audios[prefer] ?? audios[0];
    if (!leader) {
      return;
    }
    audios.forEach((audio) => {
      if (audio === leader) {
        return;
      }
      if (Math.abs(leader.currentTime - audio.currentTime) > DRIFT_MS) {
        audio.currentTime = leader.currentTime;
      }
    });
  };

  const cancelFade = () => {
    if (fadeRafRef.current !== null) {
      window.cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
  };

  const crossfadeTo = (nextIndex: number) => {
    cancelFade();
    const count = mixesRef.current.length;
    if (count === 0 || nextIndex < 0 || nextIndex >= count) {
      return;
    }
    const from = mixesRef.current.slice();
    const to = Array.from({ length: count }, (_, index) => (index === nextIndex ? 1 : 0));
    const started = performance.now();
    const duration = Math.max(1, crossfadeMs);

    const tick = (now: number) => {
      const t = clamp01((now - started) / duration);
      const eased = t * t * (3 - 2 * t);
      mixesRef.current = from.map((value, index) => value + (to[index] - value) * eased);
      applyVolumes();
      if (t < 1) {
        fadeRafRef.current = window.requestAnimationFrame(tick);
        return;
      }
      mixesRef.current = to;
      applyVolumes();
      fadeRafRef.current = null;
    };

    fadeRafRef.current = window.requestAnimationFrame(tick);
  };

  React.useEffect(() => {
    globalVolumeRef.current = globalVolume;
    applyVolumes();
  }, [globalVolume]);

  React.useEffect(() => {
    loopingRef.current = looping;
  }, [looping]);

  React.useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  React.useEffect(() => {
    cancelFade();
    audiosRef.current.forEach((audio) => {
      audio.pause();
    });

    const audios = tracks.map((track) => {
      const audio = new Audio(track.src);
      audio.preload = "auto";
      return audio;
    });
    audiosRef.current = audios;
    mixesRef.current = audios.map((_, index) => (index === 0 ? 1 : 0));
    activeIndexRef.current = 0;
    setActiveIndex(0);
    setPlaying(false);
    applyVolumes();

    const restartLoop = () => {
      audios.forEach((audio) => {
        audio.currentTime = 0;
      });
      syncClocks(0);
      applyVolumes();
      void Promise.all(audios.map((audio) => audio.play())).catch(() => {
        setPlaying(false);
        playingRef.current = false;
      });
    };

    const onEnded = (event: Event) => {
      const ended = event.currentTarget as HTMLAudioElement;
      const leader = audios[activeIndexRef.current] ?? audios[0];
      if (ended !== leader) {
        return;
      }
      if (loopingRef.current && playingRef.current) {
        restartLoop();
        return;
      }
      audios.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      setPlaying(false);
      playingRef.current = false;
    };

    const onTimeUpdate = () => {
      if (playingRef.current) {
        syncClocks();
      }
    };

    audios.forEach((audio) => {
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("timeupdate", onTimeUpdate);
    });

    return () => {
      cancelFade();
      audios.forEach((audio) => {
        audio.pause();
        audio.removeEventListener("ended", onEnded);
        audio.removeEventListener("timeupdate", onTimeUpdate);
      });
      audiosRef.current = [];
      mixesRef.current = [];
    };
  }, [tracks]);

  const playAll = async () => {
    const audios = audiosRef.current;
    if (audios.length === 0) {
      return;
    }
    syncClocks();
    applyVolumes();
    await Promise.all(audios.map((audio) => audio.play()));
    setPlaying(true);
  };

  const pauseAll = () => {
    audiosRef.current.forEach((audio) => audio.pause());
    setPlaying(false);
  };

  const togglePlay = () => {
    if (playing) {
      pauseAll();
      return;
    }
    void playAll().catch(() => {
      setPlaying(false);
    });
  };

  const selectIndex = (nextIndex: number) => {
    if (nextIndex === activeIndexRef.current || nextIndex < 0 || nextIndex >= tracks.length) {
      return;
    }
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    crossfadeTo(nextIndex);
  };

  if (tracks.length < 2) {
    return null;
  }

  const isPair = tracks.length === 2;

  return (
    <Shell theme={theme}>
      <Row>
        <ControlButton theme={theme} type="button" onClick={togglePlay}>
          {playing ? "Pause" : "Play"}
        </ControlButton>
        <ControlButton
          theme={theme}
          type="button"
          $active={looping}
          aria-pressed={looping}
          onClick={() => setLooping((value) => !value)}
        >
          Loop
        </ControlButton>
      </Row>

      {isPair ? (
        <SideToggle theme={theme}>
          {tracks.map((track, index) => (
            <SideButton
              key={`${track.label}-${index}`}
              theme={theme}
              type="button"
              $active={activeIndex === index}
              onClick={() => selectIndex(index)}
            >
              {track.label}
            </SideButton>
          ))}
        </SideToggle>
      ) : (
        <>
          <ActiveLabel>{tracks[activeIndex]?.label}</ActiveLabel>
          <CarouselNav>
            <NavButton
              theme={theme}
              type="button"
              disabled={activeIndex === 0}
              onClick={() => selectIndex(activeIndex - 1)}
            >
              Prev
            </NavButton>
            <SideToggle theme={theme}>
              {tracks.map((track, index) => (
                <SideButton
                  key={`${track.label}-${index}`}
                  theme={theme}
                  type="button"
                  $active={activeIndex === index}
                  onClick={() => selectIndex(index)}
                >
                  {track.label}
                </SideButton>
              ))}
            </SideToggle>
            <NavButton
              theme={theme}
              type="button"
              disabled={activeIndex === tracks.length - 1}
              onClick={() => selectIndex(activeIndex + 1)}
            >
              Next
            </NavButton>
          </CarouselNav>
          <StepDots>
            {tracks.map((track, index) => (
              <StepDot
                key={`${track.label}-dot-${index}`}
                theme={theme}
                type="button"
                $active={activeIndex === index}
                aria-label={track.label}
                title={track.label}
                onClick={() => selectIndex(index)}
              />
            ))}
          </StepDots>
        </>
      )}

      <VolumeRow>
        <VolumeLabel>Volume</VolumeLabel>
        <VolumeSlider
          theme={theme}
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(globalVolume * 100)}
          onChange={(event) => setGlobalVolume(Number(event.target.value) / 100)}
          aria-label="Global volume"
        />
        <VolumeValue>{Math.round(globalVolume * 100)}%</VolumeValue>
      </VolumeRow>
    </Shell>
  );
};

export default BeforeAfterPlayer;
