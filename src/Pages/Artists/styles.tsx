import styled, { css, keyframes } from "styled-components";
import { designTokens } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";

interface DeckSlideProps {
  $mode: "active" | "entering" | "leaving";
  $direction: 1 | -1;
  $elastic: number;
  $durationMs?: number;
}

interface HeroFrameProps {
  $mode: "hidden" | "active" | "entering" | "leaving";
  $direction: 1 | -1;
  $durationMs: number;
  $hasHero?: boolean;
  $spinning?: boolean;
}

interface DeckViewportProps {
  $compact?: boolean;
}

export const ArtistsShell = styled.div<ThemedElementProps>`
  width: 100%;
  color: ${({ theme }) => getColors(theme).text};
  padding: ${designTokens.spacing.xl} 0;
`;

export const ArtistsHeading = styled.h1<ThemedElementProps>`
  font-family: var(--font-headline);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize["5xl"]};
  line-height: ${designTokens.lineHeight.tight};
  margin-bottom: ${designTokens.spacing.lg};
`;

const leaveToTopLeft = keyframes`
  from {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
  to {
    transform: translate3d(-28%, -28%, 0) scale(0.96);
    opacity: 0;
  }
`;

const enterFromBottomRight = keyframes`
  from {
    transform: translate3d(28%, 28%, 0) scale(1.04);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
`;

const leaveToBottomRight = keyframes`
  from {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
  to {
    transform: translate3d(28%, 28%, 0) scale(0.96);
    opacity: 0;
  }
`;

const enterFromTopLeft = keyframes`
  from {
    transform: translate3d(-28%, -28%, 0) scale(1.04);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
`;

export const DeckViewport = styled.section<ThemedElementProps & DeckViewportProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  container-type: inline-size;
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
  cursor: grab;
  touch-action: pan-y;
  transform-origin: center center;
  ${({ $compact }) =>
    $compact
      ? css`
          height: calc(100cqw * 9 / 16);
        `
      : css`
          height: calc(100cqw * 9 / 16 + min(38vh, 30rem));
        `}
  transition: height 540ms cubic-bezier(0.22, 1, 0.36, 1);
`;

export const HeroStage = styled.div`
  position: relative;
  width: 100%;
  flex: 0 0 auto;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000000;
`;

export const HeroFrame = styled.div<HeroFrameProps>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #000000;
  ${({ $hasHero }) =>
    $hasHero
      ? css`
          &::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 42%;
            pointer-events: none;
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.72) 0%,
              rgba(0, 0, 0, 0.28) 55%,
              rgba(0, 0, 0, 0) 100%
            );
          }
        `
      : ""}
  ${({ $spinning, $mode }) =>
    $spinning
      ? css`
          animation: none;
          transition: none;
          will-change: transform, opacity;
        `
      : $mode === "hidden"
        ? css`
            opacity: 0;
            pointer-events: none;
            z-index: 0;
            transform: none;
            animation: none;
          `
        : css`
            z-index: ${$mode === "entering" ? 3 : $mode === "leaving" ? 2 : 1};
          `}
  ${({ $spinning, $mode, $direction, $durationMs }) =>
    !$spinning && $mode === "leaving" && $direction === 1
      ? css`
          animation: ${leaveToTopLeft} ${$durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
  ${({ $spinning, $mode, $direction, $durationMs }) =>
    !$spinning && $mode === "entering" && $direction === 1
      ? css`
          animation: ${enterFromBottomRight} ${$durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
  ${({ $spinning, $mode, $direction, $durationMs }) =>
    !$spinning && $mode === "leaving" && $direction === -1
      ? css`
          animation: ${leaveToBottomRight} ${$durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
  ${({ $spinning, $mode, $direction, $durationMs }) =>
    !$spinning && $mode === "entering" && $direction === -1
      ? css`
          animation: ${enterFromTopLeft} ${$durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
`;

export const CardReveal = styled.div<{ $open: boolean }>`
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 540ms cubic-bezier(0.22, 1, 0.36, 1);
`;

export const CardRevealInner = styled.div`
  position: relative;
  min-height: 0;
  overflow: hidden;
  height: 100%;
`;

export const DeckSlide = styled.article<DeckSlideProps>`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => getColors(theme).background};
  ${({ $mode, $elastic }) =>
    $mode === "active"
      ? css`
          transform: translate3d(${-0.18 * $elastic}px, ${-0.18 * $elastic}px, 0);
          transition: transform 140ms ease-out;
        `
      : css`
          transition: none;
        `}
  ${({ $mode, $direction, $durationMs = 540 }) =>
    $mode === "leaving" && $direction === 1
      ? css`
          animation: ${leaveToTopLeft} ${$durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
  ${({ $mode, $direction, $durationMs = 540 }) =>
    $mode === "entering" && $direction === 1
      ? css`
          animation: ${enterFromBottomRight} ${$durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
  ${({ $mode, $direction, $durationMs = 540 }) =>
    $mode === "leaving" && $direction === -1
      ? css`
          animation: ${leaveToBottomRight} ${$durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
  ${({ $mode, $direction, $durationMs = 540 }) =>
    $mode === "entering" && $direction === -1
      ? css`
          animation: ${enterFromTopLeft} ${$durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
`;

const slideInName = keyframes`
  from {
    transform: translate3d(-1.75rem, 0, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

export const ArtistHero = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  flex-shrink: 0;
  overflow: hidden;
  background: #000000;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 42%;
    pointer-events: none;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.72) 0%,
      rgba(0, 0, 0, 0.28) 55%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;

export const ArtistHeroImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

export const HeroPlaceholder = styled.div<ThemedElementProps>`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: ${designTokens.spacing.lg};
  box-sizing: border-box;
  color: ${({ theme }) => getColors(theme).primary};
  font-family: var(--font-headline);
  font-size: ${designTokens.fontSize["3xl"]};
  line-height: ${designTokens.lineHeight.tight};
  text-align: center;
  z-index: 1;
`;

export const ArtistMeta = styled.div<ThemedElementProps>`
  display: grid;
  gap: ${designTokens.spacing.xs};
`;

export const ArtistName = styled.h2<ThemedElementProps & { $overlay?: boolean; $animate?: boolean }>`
  margin: 0;
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize["3xl"]};
  ${({ $overlay }) =>
    $overlay
      ? css`
          position: absolute;
          left: ${designTokens.spacing.lg};
          bottom: ${designTokens.spacing.lg};
          z-index: 1;
          max-width: calc(100% - ${designTokens.spacing.lg} * 2);
        `
      : ""}
  ${({ $animate }) =>
    $animate
      ? css`
          opacity: 0;
          animation: ${slideInName} ${designTokens.duration.slower} ${designTokens.easing.out} 80ms forwards;
        `
      : css`
          opacity: 1;
        `}
`;

export const ArtistTag = styled.p`
  font-size: ${designTokens.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const ArtistScrollArea = styled.div<ThemedElementProps>`
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => getColors(theme).primary} transparent;
`;

export const ArtistBody = styled.div`
  width: 100%;
  flex: 0 0 auto;
  padding: ${designTokens.spacing.lg};
  display: grid;
  gap: ${designTokens.spacing.lg};
  box-sizing: border-box;
`;

export const ArtistCopy = styled.p<ThemedElementProps>`
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.md};
  line-height: ${designTokens.lineHeight.normal};
  margin: 0;
`;

export const ArtistCopyBlocks = styled.div`
  display: grid;
  gap: ${designTokens.spacing.lg};
`;

export const ArtistQuote = styled.blockquote<ThemedElementProps>`
  margin: 0;
  padding-left: ${designTokens.spacing.lg};
  border-left: ${designTokens.borderWidth.regular} solid
    ${({ theme }) => getColors(theme).primary};
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.md};
  line-height: ${designTokens.lineHeight.relaxed};
  font-style: italic;
`;

export const ArtistQuoteAttribution = styled.cite<ThemedElementProps>`
  display: block;
  margin-top: ${designTokens.spacing.sm};
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize.sm};
  font-style: normal;
  letter-spacing: 0.04em;
`;

export const ArtistCopyHeading = styled.h3<ThemedElementProps>`
  margin: 0;
  color: ${({ theme }) => getColors(theme).text};
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.compact};
  letter-spacing: 0.02em;
`;

export const ArtistCopyList = styled.ul`
  margin: 0;
  padding-left: ${designTokens.spacing.lg};
  display: grid;
  gap: ${designTokens.spacing.xs};
`;

export const ArtistCopyListItem = styled.li<ThemedElementProps>`
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.md};
  line-height: ${designTokens.lineHeight.normal};
`;

export const ArtistMusicLinks = styled.div`
  display: grid;
  gap: ${designTokens.spacing.md};
  width: 100%;

  iframe {
    display: block;
    width: 100%;
    max-width: 100%;
  }
`;

export const ArtistImageStrip = styled.div`
  display: grid;
  gap: ${designTokens.spacing.sm};
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

export const ArtistImageMock = styled.div<ThemedElementProps>`
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
  min-height: 8rem;
  display: grid;
  place-items: center;
  font-size: ${designTokens.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const ArtistCredits = styled.ul`
  margin: 0;
  padding-left: ${designTokens.spacing.lg};
  display: grid;
  gap: ${designTokens.spacing.xs};
`;

export const ArtistCredit = styled.li`
  font-size: ${designTokens.fontSize.sm};
`;

export const ArtistSocialLinks = styled.div<ThemedElementProps>`
  width: 100%;
  flex: 0 0 auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${designTokens.spacing.md};
  padding: ${designTokens.spacing.lg};
  border-top: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
`;

export const ArtistSocialLink = styled.a<ThemedElementProps & { $textOnly?: boolean }>`
  color: ${({ theme }) => getColors(theme).primary};
  width: ${({ $textOnly }) => ($textOnly ? "auto" : "2.5rem")};
  min-width: 2.5rem;
  height: 2.5rem;
  padding: ${({ $textOnly }) => ($textOnly ? `0 ${designTokens.spacing.sm}` : "0")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: color ${designTokens.duration.fast} ${designTokens.easing.standard};

  &:hover {
    color: ${({ theme }) => getColors(theme).text};
  }

  &:focus-visible {
    outline: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).primary};
    outline-offset: 2px;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  svg path {
    fill: currentColor;
  }
`;

export const ArtistSocialFallback = styled.span`
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
`;
