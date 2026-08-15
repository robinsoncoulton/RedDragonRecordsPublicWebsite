import styled, { css, keyframes } from "styled-components";
import { designTokens, media } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";
import {
  peekBrightnessFor,
  peekOpacityFor,
  peekScaleFor,
  peekTranslateFor,
} from "./deckConfig";

interface CardFrameProps {
  $mode: "hidden" | "active" | "peek";
  $offset: number;
  $tracking?: boolean;
  $interactive?: boolean;
}

interface HeroFrameProps {
  $mode: "hidden" | "active" | "entering" | "leaving" | "peek";
  $direction: 1 | -1;
  $durationMs: number;
  $hasHero?: boolean;
}

interface DeckSlideProps {
  $mode: "active" | "entering" | "leaving";
  $direction: 1 | -1;
  $elastic: number;
  $durationMs?: number;
}

interface DeckViewportProps {
  $compact?: boolean;
}

export const ArtistsShadow = styled.div`
  position: relative;
  width: 100%;
  padding: ${designTokens.spacing["3xl"]} 0;

  @media (max-width: 768px) {
    min-height: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    box-sizing: border-box;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: min(1000%, 80rem);
    width: 100%;
    pointer-events: none;
    z-index: 5;
    background:
      radial-gradient(
        ellipse 46% 100% at 50% 100%,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.58) 26%,
        rgba(0, 0, 0, 0.22) 48%,
        rgba(0, 0, 0, 0.06) 64%,
        rgba(0, 0, 0, 0) 76%
      ),
      radial-gradient(
        ellipse 72% 70% at 50% 100%,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0.12) 42%,
        rgba(0, 0, 0, 0) 70%
      );
  }
`;

export const ArtistsShell = styled.div<ThemedElementProps>`
  position: relative;
  width: 100%;
  color: ${({ theme }) => getColors(theme).text};
  padding: ${designTokens.spacing.xl} 0;
  z-index: 1000;

  @media (max-width: 768px) {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100%;
    padding: 0;
  }
`;

export const AlphabetRail = styled.aside`
  position: fixed;
  left: ${designTokens.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  z-index: 1100;
  width: 2.75rem;
  height: min(52vh, 28rem);
  overflow: hidden;
  pointer-events: auto;
  touch-action: none;
  cursor: grab;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    #000 18%,
    #000 82%,
    transparent 100%
  );

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AlphabetTrack = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  will-change: transform;
`;

export const AlphabetLetter = styled.button<ThemedElementProps & { $active?: boolean }>`
  display: grid;
  place-items: center;
  width: 100%;
  height: 2.25rem;
  border: none;
  padding: 0;
  margin: 0;
  font-family: var(--font-headline);
  font-size: ${designTokens.fontSize.lg};
  letter-spacing: 0.04em;
  cursor: pointer;
  color: ${({ theme, $active }) =>
    $active ? getColors(theme).background : getColors(theme).primary};
  background: ${({ theme, $active }) =>
    $active ? getColors(theme).primary : "transparent"};
  transition: background ${designTokens.duration.fast} ${designTokens.easing.standard},
    color ${designTokens.duration.fast} ${designTokens.easing.standard};
`;

export const InvisibleSearch = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  border: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
`;

const searchFlashFade = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const SearchFlash = styled.div<ThemedElementProps & { $active: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: grid;
  place-items: center;
  pointer-events: none;
  opacity: 0;
  ${({ $active }) =>
    $active
      ? css`
          animation: ${searchFlashFade} 1000ms ease-out forwards;
        `
      : ""}
`;

export const SearchFlashText = styled.p<ThemedElementProps>`
  margin: 0;
  max-width: min(90vw, 48rem);
  padding: 0 ${designTokens.spacing.lg};
  font-family: var(--font-headline);
  font-size: clamp(3rem, 12vw, 8rem);
  line-height: ${designTokens.lineHeight.tight};
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => getColors(theme).primary};
  text-shadow: 0 0.15em 0.4em rgba(0, 0, 0, 0.45);
  word-break: break-word;
`;

export const ArtistsHeading = styled.h1<ThemedElementProps>`
  display: none;
  font-family: var(--font-headline);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize["5xl"]};
  line-height: ${designTokens.lineHeight.tight};
  margin-bottom: ${designTokens.spacing.lg};

  @media (max-width: 768px) {
    display: block;
    grid-column: 2;
    margin: 0;
    padding: 0;
    font-size: ${designTokens.fontSize["2xl"]};
    letter-spacing: 0.06em;
    text-align: center;
    text-transform: uppercase;
  }
`;

export const ArtistsTitleBar = styled.div`
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 2.75rem minmax(0, 1fr) 2.75rem;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
    min-height: 2.75rem;
    z-index: 8;
  }

  @media (min-width: 769px) {
    position: absolute;
    inset: 0;
    z-index: 1100;
    pointer-events: none;
  }
`;

export const DeckViewport = styled.section<ThemedElementProps & DeckViewportProps>`
  position: relative;
  z-index: 1000;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  cursor: grab;
  touch-action: pan-y;
  transform-origin: center center;
  isolation: isolate;
  outline: none;
  ${({ $compact }) =>
    $compact
      ? css`
          height: min(72vh, 42rem);
        `
      : css`
          height: min(82vh, 52rem);
        `}
  transition: height 540ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 768px) {
    flex: 1 1 0;
    align-self: stretch;
    width: 100%;
    height: auto;
    min-height: 0;
  }
`;

export const CardStage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  flex: 1 1 0;
  min-height: 0;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const CardFrame = styled.div<CardFrameProps>`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  min-height: 0;
  transform: ${({ $offset }) => peekTranslateFor($offset)}
    scale(${({ $offset }) => peekScaleFor($offset)});
  filter: brightness(${({ $offset }) => peekBrightnessFor($offset)});
  z-index: ${({ $offset, $interactive, $mode }) => {
    if ($interactive || $mode === "active") {
      return 5;
    }
    if ($offset > 0.001) {
      return 6;
    }
    if ($offset < -0.001) {
      return Math.max(1, 3 - Math.floor(Math.abs($offset)));
    }
    return 0;
  }};
  pointer-events: ${({ $interactive }) => ($interactive ? "auto" : "none")};
  transition: ${({ $tracking }) =>
    $tracking
      ? "none"
      : "transform 540ms cubic-bezier(0.22, 1, 0.36, 1), opacity 540ms cubic-bezier(0.22, 1, 0.36, 1), filter 540ms cubic-bezier(0.22, 1, 0.36, 1)"};
  opacity: ${({ $offset, $mode, $tracking }) => {
    const next = peekOpacityFor($offset);
    if ($tracking || $mode === "active") {
      return next;
    }
    if ($mode === "hidden") {
      return 0;
    }
    return 0;
  }};

  ${({ $mode, $offset, $tracking }) =>
    $mode === "peek" && !$tracking
      ? css`
          ${media.lg} {
            opacity: ${peekOpacityFor($offset)};
          }
        `
      : ""}
`;

export const DeckNavButton = styled.button<ThemedElementProps & { $side: "prev" | "next" }>`
  position: absolute;
  top: 50%;
  z-index: 8;
  transform: translateY(-50%);
  pointer-events: auto;
  ${({ $side }) =>
    $side === "prev"
      ? css`
          left: ${designTokens.spacing.md};
        `
      : css`
          right: ${designTokens.spacing.md};
        `}
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 999px;
  padding: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: ${({ theme }) => getColors(theme).white};
  background: transparent;
  box-shadow: none;
  transition: transform ${designTokens.duration.fast} ${designTokens.easing.standard},
    opacity ${designTokens.duration.fast} ${designTokens.easing.standard};

  &:hover {
    transform: translateY(-50%) scale(1.08);
  }

  &:active {
    transform: translateY(-50%) scale(0.96);
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
    transform: translateY(-50%);
  }

  svg {
    width: 1.35rem;
    height: 1.35rem;
    filter: drop-shadow(0 0.1rem 0.35rem rgba(0, 0, 0, 0.55));
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    transform: none;
    color: ${({ theme }) => getColors(theme).primary};

    svg {
      filter: none;
    }

    &:hover {
      transform: scale(1.08);
    }

    &:active {
      transform: scale(0.96);
    }

    &:disabled {
      transform: none;
    }
  }

  ${media.lg} {
    ${({ $side }) =>
      $side === "prev"
        ? css`
            left: max(${designTokens.spacing.xl}, calc(50% - 21rem));
          `
        : css`
            right: max(${designTokens.spacing.xl}, calc(50% - 21rem));
          `}
  }
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
  ${({ $mode }) =>
    $mode === "hidden"
      ? css`
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        `
      : css`
          z-index: 1;
        `}
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

export const TradingCard = styled.article<ThemedElementProps>`
  position: relative;
  z-index: 2;
  width: min(100%, 26rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  box-sizing: border-box;
  container-type: size;
  border: 0.55rem solid ${({ theme }) => getColors(theme).brandDarkHighlight};
  border-radius: 1.15rem;
  background: ${({ theme }) => getColors(theme).brandDarkest};
  color: ${({ theme }) => getColors(theme).white};
  overflow: hidden;
  box-shadow:
    0 0.35rem 1.1rem rgba(0, 0, 0, 0.28),
    0 1.4rem 2.6rem rgba(0, 0, 0, 0.22);
  transition: width ${designTokens.duration.normal} ${designTokens.easing.standard};

  @media (max-width: 768px) {
    border-radius: 0;
    width: 100%;
  }

  ${media.lg} {
    width: min(100%, 30rem);
  }
`;

export const TradingCardScroll = styled.div<ThemedElementProps>`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => getColors(theme).primary} transparent;
`;

export const TradingCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${designTokens.spacing.md};
  padding: ${designTokens.spacing.md} ${designTokens.spacing.md} ${designTokens.spacing.sm};
  flex-shrink: 0;
`;

export const TradingCardNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.4rem;
  padding: 0.2rem 0.45rem;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 0.2rem;
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => getColors(theme).white};
`;

export const TradingCardAffiliation = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.82);

  svg {
    width: 0.85rem;
    height: 0.85rem;
    flex-shrink: 0;
  }
`;

export const TradingCardHero = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  max-height: 58cqh;
  overflow: visible;
  background: #000000;
  flex-shrink: 0;
  min-height: 12rem;
  container-type: size;
`;

export const TradingCardHeroMedia = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #000000;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.88) 0%,
      rgba(0, 0, 0, 0.35) 42%,
      rgba(0, 0, 0, 0) 68%
    );
  }
`;

export const TradingCardHeroImage = styled.img`
  width: 112%;
  height: 112%;
  max-width: none;
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
  object-fit: cover;
  transform: translate3d(-50%, -50%, 0) scale(1);
  will-change: transform;
  transition: transform 160ms ${designTokens.easing.out};
`;

export const TradingCardName = styled.h2<ThemedElementProps>`
  position: absolute;
  left: ${designTokens.spacing.md};
  right: ${designTokens.spacing.md};
  bottom: ${designTokens.spacing.md};
  z-index: 2;
  margin: 0;
  max-height: 42%;
  overflow: visible;
  color: ${({ theme }) => getColors(theme).white};
`;

export const TradingCardNameText = styled.span<{ $fontSizePx: number; $scaleX: number }>`
  display: block;
  width: 100%;
  font-family: var(--font-headline);
  font-size: ${({ $fontSizePx }) => `${$fontSizePx}px`};
  line-height: 0.92;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: left;
  white-space: normal;
  word-break: normal;
  overflow-wrap: normal;
  hyphens: none;
  transform: scaleX(${({ $scaleX }) => $scaleX});
  transform-origin: left bottom;
`;

export const TradingCardHeroFallback = styled.div`
  width: 100%;
  height: 100%;
  background: #000000;
`;

export const TradingCardInfoBar = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: ${designTokens.spacing.md};
  padding: ${designTokens.spacing.sm} ${designTokens.spacing.md};
  background: rgba(255, 255, 255, 0.06);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const TradingCardInfoBlock = styled.div<{ $divider?: boolean }>`
  display: grid;
  gap: 0.2rem;
  min-width: 0;
  ${({ $divider }) =>
    $divider
      ? css`
          padding-left: ${designTokens.spacing.md};
          border-left: 1px solid rgba(255, 255, 255, 0.2);
        `
      : ""}
`;

export const TradingCardInfoLabel = styled.span`
  font-family: var(--font-body);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
`;

export const TradingCardInfoValue = styled.span`
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.xs};
  line-height: ${designTokens.lineHeight.compact};
  color: ${({ theme }) => getColors(theme).white};
`;

export const TradingCardBody = styled.div`
  display: grid;
  gap: ${designTokens.spacing.lg};
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.md};

  ${ArtistCopyBlocks} {
    gap: ${designTokens.spacing.md};
  }

  ${ArtistCopy} {
    color: rgba(255, 255, 255, 0.72);
    font-size: ${designTokens.fontSize.sm};
    line-height: ${designTokens.lineHeight.relaxed};
  }

  ${ArtistQuote} {
    color: rgba(255, 255, 255, 0.78);
    font-size: ${designTokens.fontSize.sm};
    border-left-color: ${({ theme }) => getColors(theme).primary};
  }

  ${ArtistQuoteAttribution} {
    color: ${({ theme }) => getColors(theme).primary};
  }

  ${ArtistCopyHeading} {
    color: ${({ theme }) => getColors(theme).white};
    font-size: ${designTokens.fontSize.md};
  }

  ${ArtistCopyListItem} {
    color: rgba(255, 255, 255, 0.72);
    font-size: ${designTokens.fontSize.sm};
  }
`;

export const TradingCardBioRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${designTokens.spacing.md};
  align-items: start;
  padding-bottom: ${designTokens.spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`;

export const TradingCardBio = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.sm};
  line-height: ${designTokens.lineHeight.relaxed};
  color: rgba(255, 255, 255, 0.72);
  padding-bottom: ${designTokens.spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`;

export const TradingCardSpark = styled.span`
  color: ${({ theme }) => getColors(theme).primary};
  display: inline-flex;
  margin-top: 0.15rem;

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

export const TradingCardSection = styled.section`
  display: grid;
  gap: ${designTokens.spacing.sm};
`;

export const TradingCardSectionHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${designTokens.spacing.md};
`;

export const TradingCardSectionTitle = styled.h3`
  margin: 0;
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => getColors(theme).primary};
`;

export const TradingCardSectionAction = styled.span`
  font-family: var(--font-body);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
`;

export const TradingCardReleaseCarousel = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: ${designTokens.spacing.xs};
  align-items: center;
`;

export const TradingCardReleaseSlide = styled.div`
  display: grid;
  gap: ${designTokens.spacing.sm};
  align-content: start;
  min-width: 0;
`;

export const TradingCardReleaseCoverStage = styled.div<{ $peekable?: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ $peekable }) => ($peekable ? "11.5rem" : "12.5rem")};
  overflow: hidden;
  isolation: isolate;
`;

export const TradingCardReleaseCoverFrame = styled.button<{
  $offset: number;
  $interactive?: boolean;
}>`
  appearance: none;
  border: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(72%, 12.5rem);
  aspect-ratio: 1;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  cursor: ${({ $interactive, $offset }) =>
    $interactive || $offset === 0 ? "pointer" : "default"};
  transform-origin: center center;
  transition:
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 420ms cubic-bezier(0.22, 1, 0.36, 1),
    z-index 0s linear 0s;
  z-index: ${({ $offset }) => Math.max(0, 8 - Math.abs($offset) * 2)};
  opacity: ${({ $offset }) => {
    if ($offset === 0) {
      return 1;
    }
    if (Math.abs($offset) === 1) {
      return 0.55;
    }
    return 0;
  }};
  filter: ${({ $offset }) => ($offset === 0 ? "none" : "brightness(0.72)")};
  transform: ${({ $offset }) => {
    if ($offset === 0) {
      return "translate(-50%, -50%) scale(1)";
    }
    if ($offset < 0) {
      return `translate(calc(-50% - ${2.8 + Math.abs($offset) * 1.1}rem), -50%) scale(${Math.max(0.62, 0.84 - Math.abs($offset) * 0.08)})`;
    }
    return `translate(calc(-50% + ${2.8 + Math.abs($offset) * 1.1}rem), -50%) scale(${Math.max(0.62, 0.84 - Math.abs($offset) * 0.08)})`;
  }};
  pointer-events: ${({ $offset }) => (Math.abs($offset) <= 1 ? "auto" : "none")};
  box-shadow:
    0 0.35rem 1rem rgba(0, 0, 0, 0.35),
    0 0.1rem 0.3rem rgba(0, 0, 0, 0.25);
`;

export const TradingCardReleaseCoverFallback = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
`;

export const TradingCardReleaseNav = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  color: ${({ theme }) => getColors(theme).primary};
  width: 1.75rem;
  height: 1.75rem;
  display: grid;
  place-items: center;
  padding: 0;
  cursor: pointer;
  font-size: ${designTokens.fontSize["2xl"]};
  line-height: 1;
  flex-shrink: 0;
  z-index: 10;

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
`;

export const TradingCardReleaseMeta = styled.div`
  display: grid;
  gap: 0.15rem;
  justify-items: center;
  text-align: center;
`;

export const TradingCardReleaseTitle = styled.h4<ThemedElementProps>`
  margin: 0;
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.sm};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => getColors(theme).white};
`;

export const TradingCardReleaseYear = styled.span`
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
`;

export const TradingCardReleaseCredit = styled.p`
  margin: 0.2rem 0 0;
  max-width: 18rem;
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.xs};
  line-height: ${designTokens.lineHeight.compact};
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.45);
`;

export const TradingCardRelease = styled.a`
  position: relative;
  display: block;
  width: 100%;
  max-width: 14rem;
  margin: 0 auto;
  aspect-ratio: 1;
  overflow: hidden;
  text-decoration: none;
  color: ${({ theme }) => getColors(theme).white};
  background: rgba(255, 255, 255, 0.08);
`;

export const TradingCardReleaseTile = styled.div`
  position: relative;
  display: block;
  width: 100%;
  max-width: 14rem;
  margin: 0 auto;
  aspect-ratio: 1;
  overflow: hidden;
  color: ${({ theme }) => getColors(theme).white};
  background: rgba(255, 255, 255, 0.08);
`;

export const TradingCardReleaseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const TradingCardReleaseCaption = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.35rem 0.4rem;
  font-family: var(--font-body);
  font-size: 0.58rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.2;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
`;

export const TradingCardReleaseEmbedStack = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  min-width: 0;
`;

export const TradingCardReleaseEmbed = styled.div<{ $active?: boolean; $visible?: boolean }>`
  position: relative;
  grid-area: 1 / 1;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border-radius: 0.15rem;
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};

  > div {
    width: 100% !important;
    max-width: 100%;
  }

  iframe {
    display: block;
    width: 100%;
    max-width: 100%;
    border: 0;
    pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
  }
`;

export const TradingCardReleaseEmbedShield = styled.button`
  position: absolute;
  inset: 0;
  z-index: 1;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background: transparent;
`;

export const TradingCardHighlightList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
`;

export const TradingCardHighlightRow = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) auto;
  gap: ${designTokens.spacing.sm};
  align-items: baseline;
  padding: 0.55rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.xs};
  color: ${({ theme }) => getColors(theme).white};

  &:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const TradingCardHighlightMeta = styled.span`
  color: rgba(255, 255, 255, 0.78);
  min-width: 0;
`;

export const TradingCardHighlightCollab = styled.span`
  text-align: right;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  min-width: 0;
`;

export const TradingCardHighlightYear = styled.span`
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.04em;
`;

export const TradingCardFooter = styled.div`
  padding: ${designTokens.spacing.md} ${designTokens.spacing.lg} ${designTokens.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${designTokens.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: ${({ theme }) => getColors(theme).primary};

  ${ArtistSocialLink} {
    flex: 0 0 2.25rem;
    width: 2.25rem;
    min-width: 2.25rem;
    max-width: 2.25rem;
    height: 2.25rem;
    padding: 0;
  }
`;

export const TradingCardSocials = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${designTokens.spacing.sm};
  padding: 0 ${designTokens.spacing.md} ${designTokens.spacing.md};
`;

