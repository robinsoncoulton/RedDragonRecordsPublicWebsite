import styled, { css, keyframes } from "styled-components";
import { designTokens } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";

interface DeckSlideProps {
  $mode: "active" | "entering" | "leaving";
  $direction: 1 | -1;
  $elastic: number;
}

export const ArtistsShell = styled.div<ThemedElementProps>`
  color: ${({ theme }) => getColors(theme).text};
  padding: ${designTokens.spacing.xl};
`;

export const ArtistsHeading = styled.h1<ThemedElementProps>`
  font-family: var(--font-headline);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize["5xl"]};
  line-height: ${designTokens.lineHeight.tight};
  margin-bottom: ${designTokens.spacing.lg};
`;

export const DeckViewport = styled.section<ThemedElementProps>`
  position: relative;
  overflow: hidden;
  height: min(76vh, 56rem);
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
  cursor: grab;
  touch-action: pan-y;
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

export const DeckSlide = styled.article<DeckSlideProps>`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: auto 1fr;
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
  ${({ $mode, $direction }) =>
    $mode === "leaving" && $direction === 1
      ? css`
          animation: ${leaveToTopLeft} 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
  ${({ $mode, $direction }) =>
    $mode === "entering" && $direction === 1
      ? css`
          animation: ${enterFromBottomRight} 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
  ${({ $mode, $direction }) =>
    $mode === "leaving" && $direction === -1
      ? css`
          animation: ${leaveToBottomRight} 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
  ${({ $mode, $direction }) =>
    $mode === "entering" && $direction === -1
      ? css`
          animation: ${enterFromTopLeft} 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `
      : ""}
`;

export const ArtistMeta = styled.div<ThemedElementProps>`
  padding: ${designTokens.spacing.lg};
  border-bottom: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
  display: grid;
  gap: ${designTokens.spacing.xs};
`;

export const ArtistName = styled.h2<ThemedElementProps>`
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize["3xl"]};
`;

export const ArtistTag = styled.p`
  font-size: ${designTokens.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const ArtistScrollArea = styled.div<ThemedElementProps>`
  min-height: 0;
  overflow-y: auto;
  padding: ${designTokens.spacing.lg};
  display: grid;
  gap: ${designTokens.spacing.lg};
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => getColors(theme).primary} transparent;
`;

export const ArtistCopy = styled.p<ThemedElementProps>`
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.md};
  line-height: ${designTokens.lineHeight.normal};
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
