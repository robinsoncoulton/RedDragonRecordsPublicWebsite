import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Page from "../../../Components/Page";
import { ControlButton } from "../../../Components/BeforeAfterPlayer/styles";
import { designTokens } from "../../../DesignSystem";
import { getColors } from "../../../Styles/colors";
import { useTheme } from "../../../Utils/Theme";
import { ThemedElementProps } from "../../../Utils/Theme/types";
import { BeforeAfterPlayerHandle } from "../../../Components/BeforeAfterPlayer";
import { library, songPage } from "../../../Api/portal";
import { FormStatus } from "../../Join/styles";
import { LinkButton, Shell } from "../../Login/styles";
import { Meta, PortalTitle } from "../IndexList";
import { SongReview } from "../Songs/SongDetail";
import { handoverTime } from "./handover";
import { cardWidthFor, deckLayout } from "./deckLayout";
import { useAlbumDownload } from "./useAlbumDownload";
import { formatLength } from "../Songs/groupByAlbum";

const EASE = "420ms cubic-bezier(0.22, 1, 0.36, 1)"; // close to the Artists deck slide

/* Fills the page inside its border (not just the content column); deckLayout keeps every card inside. */
const Stage = styled.div`
  position: relative;
  height: clamp(11rem, 30vh, 18rem);
  margin: ${designTokens.spacing.sm} ${designTokens.spacing.lg}
    ${designTokens.spacing.lg};
`;

// Horizontal take on the Artists deck; position, size and stacking come from deckLayout.
const TrackCard = styled.article<ThemedElementProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: ${designTokens.spacing.lg};
  border: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).border};
  border-radius: ${designTokens.spacing.lg};
  background: ${({ theme }) => getColors(theme).surface};
  color: ${({ theme }) => getColors(theme).text};
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.35);
  transition:
    transform ${EASE},
    opacity ${EASE},
    filter ${EASE};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const LIFT = "-0.75rem";
/** Further out is dimmer, but never so faint it can't be found and hovered. */
const looks = (depth: number, lifted: boolean) => {
  const k = Math.abs(depth);
  if (k === 0 || lifted) return { opacity: 1, brightness: k === 0 ? 1 : 0.95 };
  return {
    opacity: Math.max(0.55, 1 - 0.06 * (k - 1)),
    brightness: Math.max(0.4, 0.75 - 0.05 * (k - 1)),
  };
};

// Covers a side card so the whole card is one "go to this track" target.
const CardButton = styled.button`
  position: absolute;
  inset: 0;
  z-index: 1;
  border: none;
  background: none;
  cursor: pointer;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(0.5rem); }
  to { opacity: 1; transform: none; }
`;

// Replays whenever it's un-hidden (display: none → block), i.e. on every track change.
const Review = styled.div`
  animation: ${fadeIn} 400ms ${designTokens.easing.out} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TrackNumber = styled.span`
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1;
  font-variant-numeric: tabular-nums;
`;

const TrackFooter = styled.div`
  overflow: hidden;
  align-self: stretch;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${designTokens.spacing.sm};
  min-width: 0;
`;

const TrackLength = styled.span`
  flex: none;
  font-size: ${designTokens.fontSize.sm};
  font-variant-numeric: tabular-nums;
  opacity: 0.7;
`;

const TrackTitle = styled.span`
  font-size: ${designTokens.fontSize.xl};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${designTokens.spacing.sm};
  margin-bottom: ${designTokens.spacing.xl};
`;

const pad = (n: number) => String(n).padStart(2, "0");

type AlbumTrack = {
  songId: string;
  title: string;
  trackNumber: number | null;
  durationMs: number | null;
};

const SETTLE_MS = 800; // a track's player counts as loaded once its height stops changing this long
const RESTART_THRESHOLD_S = 3; // "previous" restarts the song if it's past this point

const AlbumPlayer: React.FC = () => {
  const { albumId = "" } = useParams();
  // "Play album" links add ?play: start track 1 as soon as it has loaded.
  const autoplay = new URLSearchParams(useLocation().search).has("play");
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState<string | null>(null);
  const [tracks, setTracks] = React.useState<AlbumTrack[] | null>(null);
  const [skipped, setSkipped] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const [project, songs] = await Promise.all([
        songPage.project(albumId),
        songPage.albumSongs(albumId),
      ]);
      // Songs with no audio the viewer can see are left out of the running order.
      const counts = await Promise.all(
        songs.map((s) => library.versions(s.id).then((v) => v.length)),
      );
      const playable = songs.filter((_, i) => counts[i] > 0);
      setTitle(project.title);
      setSkipped(songs.length - playable.length);
      setTracks(
        playable.map((s) => ({
          songId: s.id,
          title: s.title,
          trackNumber: s.trackNumber,
          durationMs: s.durationMs,
        })),
      );
    })().catch((e: Error) => setError(e.message));
  }, [albumId]);

  return (
    <Page>
      <Shell
        theme={theme}
        $wide
        style={{ maxWidth: "960px", paddingBottom: 0 }}
      >
        <LinkButton
          theme={theme}
          type="button"
          style={{ alignSelf: "flex-start" }}
          onClick={() => navigate(-1)}
        >
          ← Back
        </LinkButton>
        <PortalTitle>{title ?? "\u00a0"}</PortalTitle>
        {error ? (
          <FormStatus theme={theme} $tone="error">
            {error}
          </FormStatus>
        ) : tracks === null ? (
          <Meta theme={theme}>Loading…</Meta>
        ) : tracks.length === 0 ? (
          <Meta theme={theme}>No audio uploaded for this album yet.</Meta>
        ) : null}
        {skipped > 0 ? (
          <Meta theme={theme}>
            {skipped} {skipped === 1 ? "song has" : "songs have"} no audio yet
            and {skipped === 1 ? "is" : "are"} skipped.
          </Meta>
        ) : null}
      </Shell>
      {tracks?.length ? (
        <Album albumId={albumId} tracks={tracks} autoplay={autoplay} />
      ) : null}
    </Page>
  );
};

/**
 * The current song's full review (versions, seek, loop, notes) plus the next song's,
 * mounted hidden so it decodes ahead. Both share one AudioContext, so the next song
 * is scheduled to start on the exact sample the current one ends.
 */
const Album: React.FC<{
  albumId: string;
  tracks: AlbumTrack[];
  autoplay?: boolean;
}> = ({ albumId, tracks, autoplay = false }) => {
  const { theme } = useTheme();
  const [index, setIndex] = React.useState(0);
  const [autoNext, setAutoNext] = React.useState(true);
  const [ctx] = React.useState(() => new AudioContext());
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [stageWidth, setStageWidth] = React.useState(0);
  const stageRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => setStageWidth(stage.clientWidth));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);
  // The player area keeps the last settled height while a new track's player loads, so the
  // page (and footer) doesn't collapse and jump back on every track change.
  const slotRef = React.useRef<HTMLDivElement>(null);
  const settledHeight = React.useRef(0);
  const [holdHeight, setHoldHeight] = React.useState(0);
  React.useLayoutEffect(() => setHoldHeight(settledHeight.current), [index]);
  React.useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    let timer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        settledHeight.current = slot.offsetHeight;
        setHoldHeight(0); // settled: size to the content again
      }, SETTLE_MS);
    });
    observer.observe(slot);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);
  const poses = deckLayout({
    stage: stageWidth,
    count: tracks.length,
    index,
    hovered,
  });
  const cardWidth = cardWidthFor(stageWidth);
  const download = useAlbumDownload(albumId);
  const handles = React.useRef(
    new Map<string, React.RefObject<BeforeAfterPlayerHandle>>(),
  );
  const scheduled = React.useRef<number | null>(null); // when the next song is set to start
  const playWhenReady = React.useRef(autoplay);
  const state = React.useRef({ index, autoNext });
  state.current = { index, autoNext };

  const handleFor = (songId: string) => {
    let ref = handles.current.get(songId);
    if (!ref)
      handles.current.set(
        songId,
        (ref = React.createRef<BeforeAfterPlayerHandle>()),
      );
    return ref;
  };
  const player = (i: number) =>
    tracks[i] ? handleFor(tracks[i].songId).current : null;

  const cancelHandover = () => {
    const next = player(state.current.index + 1);
    if (scheduled.current !== null && next) {
      next.pause();
      next.seek(0);
    }
    scheduled.current = null;
  };

  // Keeps the next song scheduled for the current one's end, following pause, seek and loop.
  React.useEffect(() => {
    const timer = window.setInterval(() => {
      const { index: i, autoNext: on } = state.current;
      const current = player(i);
      if (playWhenReady.current && current?.isReady()) {
        playWhenReady.current = false;
        if (!current.isPlaying()) void current.play();
      }
      const next = player(i + 1);
      if (!next?.isReady()) return;
      const want = handoverTime({
        autoNext: on,
        hasNext: true,
        endTime: current?.getEndTime() ?? null,
        now: ctx.currentTime,
      });
      const same =
        want === scheduled.current ||
        (want !== null &&
          scheduled.current !== null &&
          Math.abs(want - scheduled.current) < 0.002);
      if (same) return;
      next.pause();
      next.seek(0);
      if (want !== null) void next.playAt(want, 0);
      scheduled.current = want;
    }, 100);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reads live values through refs
  }, [ctx]);

  React.useEffect(() => () => void ctx.close(), [ctx]);

  const onEnded = () => {
    const { index: i, autoNext: on } = state.current;
    if (!on || i + 1 >= tracks.length) return;
    // Normally already playing from the handover; if it wasn't decoded in time, start it once it is.
    if (!player(i + 1)?.isPlaying()) playWhenReady.current = true;
    scheduled.current = null;
    setIndex(i + 1);
  };

  const goTo = (i: number) => {
    if (i < 0 || i >= tracks.length || i === index) return;
    const current = player(index);
    const wasPlaying = current?.isPlaying() ?? false;
    cancelHandover();
    current?.pause();
    player(i)?.seek(0);
    playWhenReady.current = wasPlaying;
    setIndex(i);
  };

  const previous = () => {
    const current = player(index);
    if (current && current.getCurrentTime() > RESTART_THRESHOLD_S)
      current.seek(0);
    else goTo(index - 1);
  };

  const keys = React.useRef({ previous, next: () => goTo(index + 1) });
  keys.current = { previous, next: () => goTo(index + 1) };
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        tag === "input" ||
        tag === "textarea" ||
        tag === "button"
      )
        return;
      if (e.key === " ") player(state.current.index)?.togglePlay();
      else if (e.key === "ArrowRight") keys.current.next();
      else if (e.key === "ArrowLeft") keys.current.previous();
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reads live values through refs
  }, []);

  const controls = (
    <Controls>
      <ControlButton theme={theme} type="button" onClick={previous}>
        ⏮ Previous
      </ControlButton>
      <ControlButton
        theme={theme}
        type="button"
        disabled={index >= tracks.length - 1}
        onClick={() => goTo(index + 1)}
      >
        Next ⏭
      </ControlButton>
      <ControlButton
        theme={theme}
        type="button"
        $active={autoNext}
        aria-pressed={autoNext}
        onClick={() => {
          if (autoNext) cancelHandover();
          setAutoNext(!autoNext);
        }}
      >
        Auto play
      </ControlButton>
      <ControlButton
        theme={theme}
        type="button"
        disabled={download.busy}
        onClick={download.start}
      >
        {download.label}
      </ControlButton>
    </Controls>
  );

  return (
    <>
      <Stage ref={stageRef} onPointerLeave={() => setHovered(null)}>
        {stageWidth > 0 &&
          tracks.map((t, i) => {
            const pose = poses[i]!;
            const look = looks(pose.depth, pose.lifted);
            return (
              <TrackCard
                key={t.songId}
                theme={theme}
                aria-label={
                  pose.depth === 0 ? `Now playing: ${t.title}` : undefined
                }
                onPointerEnter={() => setHovered(i)}
                style={{
                  width: cardWidth,
                  zIndex: pose.z,
                  opacity: look.opacity,
                  filter: `brightness(${look.brightness})`,
                  transform: `translateX(calc(-50% + ${pose.x}px)) translateY(${pose.lifted ? LIFT : "0px"}) scale(${pose.scale})`,
                  // Right-hand cards show their outer (right) edge when stacked, so their text sits there.
                  alignItems: pose.depth > 0 ? "flex-end" : "flex-start",
                  textAlign: pose.depth > 0 ? "right" : "left",
                }}
              >
                <TrackNumber>{pad(t.trackNumber ?? i + 1)}</TrackNumber>
                <TrackFooter
                  style={{
                    flexDirection: pose.depth > 0 ? "row-reverse" : "row",
                  }}
                >
                  <TrackTitle>{t.title}</TrackTitle>
                  {t.durationMs !== null ? (
                    <TrackLength>{formatLength(t.durationMs)}</TrackLength>
                  ) : null}
                </TrackFooter>
                {pose.depth !== 0 ? (
                  <CardButton
                    type="button"
                    aria-label={`Play ${t.title}`}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered((h) => (h === i ? null : h))}
                    onClick={() => goTo(i)}
                  />
                ) : null}
              </TrackCard>
            );
          })}
      </Stage>

      <Shell theme={theme} $wide style={{ maxWidth: "960px", paddingTop: 0 }}>
        {controls}
        {download.message ? (
          <Meta theme={theme}>{download.message}</Meta>
        ) : null}

        {/* Keyed by song so the next song's review, mounted hidden to decode ahead, is the
            same instance (still playing) once it becomes current. */}
        <div style={{ minHeight: holdHeight || undefined }}>
          <div ref={slotRef}>
            {tracks.map((t, i) =>
              i === index || i === index + 1 ? (
                <Review key={t.songId} hidden={i !== index}>
                  <SongReview
                    songId={t.songId}
                    playerRef={handleFor(t.songId)}
                    audioContext={ctx}
                    onEnded={i === index ? onEnded : undefined}
                  />
                </Review>
              ) : null,
            )}
          </div>
        </div>
      </Shell>
    </>
  );
};

export default AlbumPlayer;
