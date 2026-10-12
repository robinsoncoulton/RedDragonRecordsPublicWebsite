import React from "react";
import styled, { keyframes } from "styled-components";
import Avatar from "../../../Components/Avatar";
import { formatTime } from "../../../Components/BeforeAfterPlayer/utils";
import { designTokens } from "../../../DesignSystem";
import { getColors } from "../../../Styles/colors";
import { Theme, ThemedElementProps } from "../../../Utils/Theme/types";

const MARKER_PX = 22;
/** How long a note's bubble stays up after the playhead reaches it. */
export const BUBBLE_MS = 3000;

export type NoteMarker = {
  id: string;
  /** Waveform row (version index) the note belongs to. */
  row: number;
  timestampMs: number;
  author: string;
  image: string | null;
  content: string;
};

/** The note the playhead most recently passed, if it's within `windowMs`. */
export const noteAtPlayhead = (markers: NoteMarker[], currentMs: number, windowMs = BUBBLE_MS) => {
  let hit: NoteMarker | null = null;
  for (const m of markers) {
    const since = currentMs - m.timestampMs;
    if (since >= 0 && since < windowMs && (!hit || m.timestampMs > hit.timestampMs)) hit = m;
  }
  return hit;
};

const pop = keyframes`
  from { opacity: 0; transform: translate(var(--bubble-x), 6px) scale(0.92); }
  to { opacity: 1; transform: translate(var(--bubble-x), 0) scale(1); }
`;

const Marker = styled.button<ThemedElementProps & { $active: boolean; $dimmed: boolean }>`
  position: absolute;
  width: ${MARKER_PX}px;
  height: ${MARKER_PX}px;
  transform: translateX(-50%);
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  pointer-events: auto;
  border-radius: ${designTokens.radius.round};
  z-index: ${({ $active, $dimmed }) => ($active ? 3 : $dimmed ? 1 : 2)};
  /* Notes on versions not playing are greyed out like their waveform. */
  opacity: ${({ $dimmed }) => ($dimmed ? 0.45 : 1)};
  filter: ${({ $dimmed }) => ($dimmed ? "grayscale(1)" : "none")};
  transition: opacity ${designTokens.duration.fast} ${designTokens.easing.standard};

  &:hover,
  &:focus-visible {
    opacity: 1;
    filter: none;
  }

  /* Avatar's own border is 1px outside the circle, so it sat off-centre here. */
  & > span:first-child {
    border: 0;
  }

  &:focus-visible {
    outline: ${designTokens.borderWidth.regular} solid
      ${({ theme }) => getColors(theme).accent};
  }
`;

// --bubble-x keeps bubbles near the edges inside the player instead of centring off-screen.
const Bubble = styled.span<ThemedElementProps & { $align: "left" | "center" | "right" }>`
  --bubble-x: ${({ $align }) => ($align === "center" ? "-50%" : "0")};
  position: absolute;
  bottom: calc(100% + 10px);
  ${({ $align }) => ($align === "right" ? "right: -4px;" : $align === "left" ? "left: -4px;" : "left: 50%;")}
  width: max-content;
  max-width: 16rem;
  padding: ${designTokens.spacing.sm} ${designTokens.spacing.md};
  background: ${({ theme }) => getColors(theme).text};
  color: ${({ theme }) => getColors(theme).background};
  border-radius: ${designTokens.radius.md};
  box-shadow: ${designTokens.shadow.lg};
  font-size: ${designTokens.fontSize.sm};
  line-height: 1.35;
  text-align: left;
  pointer-events: none;
  transform: translate(var(--bubble-x), 0);
  animation: ${pop} 160ms ${designTokens.easing.out} both;

  /* Tail pointing at the avatar. */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    ${({ $align }) =>
      $align === "right"
        ? `right: ${MARKER_PX / 2}px;`
        : $align === "left"
        ? `left: ${MARKER_PX / 2}px;`
        : "left: 50%; margin-left: -6px;"}
    border: 6px solid transparent;
    border-top-color: ${({ theme }) => getColors(theme).text};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/**
 * Avatars centred on each version's waveform row, one per timestamped note;
 * rows other than `activeRow` are dimmed and never pop a bubble at the playhead.
 * Rendered in the player's waveformOverlay, so coordinates are relative to the waveform.
 */
const NoteMarkers: React.FC<{
  theme: Theme;
  durationMs: number;
  currentMs: number;
  activeRow: number;
  rowHeight: number;
  markers: NoteMarker[];
  activeId: string | null;
  onOpen: (marker: NoteMarker) => void;
}> = ({ theme, durationMs, currentMs, activeRow, rowHeight, markers, activeId, onOpen }) => {
  const [hovered, setHovered] = React.useState<string | null>(null);
  if (!durationMs) return null;
  const atPlayhead = noteAtPlayhead(markers.filter((m) => m.row === activeRow), currentMs);
  const shown = hovered ?? atPlayhead?.id ?? null;
  return (
    <>
      {markers.map((m) => {
        const pct = Math.min(100, Math.max(0, (m.timestampMs / durationMs) * 100));
        return (
          <Marker
            key={m.id}
            theme={theme}
            type="button"
            $active={m.id === activeId || m.id === atPlayhead?.id}
            $dimmed={m.row !== activeRow}
            style={{ left: `${pct}%`, top: m.row * rowHeight + (rowHeight - MARKER_PX) / 2 }}
            aria-label={`Note by ${m.author} at ${formatTime(m.timestampMs / 1000)}: ${m.content}`}
            onMouseEnter={() => setHovered(m.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(m.id)}
            onBlur={() => setHovered(null)}
            onClick={() => onOpen(m)}
          >
            <Avatar theme={theme} name={m.author} image={m.image} size={`${MARKER_PX}px`} />
            {shown === m.id ? (
              <Bubble
                key={m.id}
                theme={theme}
                $align={pct < 20 ? "left" : pct > 80 ? "right" : "center"}
                role="status"
              >
                <strong>{m.author}</strong> · {formatTime(m.timestampMs / 1000)}
                <br />
                {m.content}
              </Bubble>
            ) : null}
          </Marker>
        );
      })}
    </>
  );
};

export default NoteMarkers;
