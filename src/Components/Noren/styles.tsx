import styled, { css } from "styled-components";
import { designTokens } from "../../DesignSystem";
import { norenBreeze, norenGust, norenShadeGust } from "./animations";

interface NorenClothProps {
  $isGusting: boolean;
  $phaseDelayMs: number;
  $baseColor: string;
  $shadeColor: string;
  $breezeMultiplier: number;
}

interface NorenColorProps {
  $wrapGradient: string;
}

interface NorenContainerProps {
  $clothWidth: string;
  $clothHeight: string;
}

interface NorenScaleFrameProps {
  $naturalHeightPx: number;
  $scaledHeightPx: number;
  $scale: number;
}

interface NorenScaleContentProps {
  $scale: number;
}

export const NorenScaleFrame = styled.div<NorenScaleFrameProps>`
  position: relative;
  width: 100%;
  display: block;
  height: ${({ $scale, $naturalHeightPx, $scaledHeightPx }) =>
    `${Math.round(($scale >= 1 ? $naturalHeightPx : $scaledHeightPx) || 0)}px`};
  overflow: visible;
`;

export const NorenScaleContent = styled.div<NorenScaleContentProps>`
  position: absolute;
  left: 50%;
  top: 0;
  width: max-content;
  margin: 0;
  transform-origin: top center;
  transform: translateX(-50%) scale(${({ $scale }) => $scale});
`;

export const NorenContainer = styled.div<NorenContainerProps>`
  position: relative;
  width: max-content;
  --noren-cloth-width: ${({ $clothWidth }) => $clothWidth};
  --noren-cloth-height: ${({ $clothHeight }) => $clothHeight};
  --noren-strap-size: 20px;
  --noren-strap-gap: 0px;
  margin-bottom: ${designTokens.spacing.xl};
  padding-top: ${designTokens.spacing.lg};
`;

export const NorenPole = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(${designTokens.spacing.lg} + 1px);
  height: calc(var(--noren-strap-size) - 1px);
  background: linear-gradient(
    0deg,
    #4a2b1d 0%,
    #6e402b 30%,
    #805138 50%,
    #6e402b 70%,
    #4a2b1d 100%
  );
  z-index: 0;
`;

export const NorenRow = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2px;
`;

export const NorenPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--noren-strap-gap);
`;

export const NorenWraps = styled.div`
  width: var(--noren-cloth-width);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NorenWrap = styled.span<NorenColorProps>`
  width: var(--noren-strap-size);
  height: var(--noren-strap-size);
  border-radius: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.06) 0.6px, transparent 0.9px),
    radial-gradient(rgba(0, 0, 0, 0.1) 0.6px, transparent 0.9px),
    ${({ $wrapGradient }) => $wrapGradient};
  background-size: 3px 3px, 4px 4px, 100% 100%;
  background-position: 0 0, 1px 1px, 0 0;
`;

export const NorenCloth = styled.div<NorenClothProps>`
  width: var(--noren-cloth-width);
  height: var(--noren-cloth-height);
  position: relative;
  overflow: hidden;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${designTokens.spacing.xs};
  color: #ffffff;
  font-size: ${designTokens.fontSize["3xl"]};
  letter-spacing: 0.04em;
  background-image: radial-gradient(rgba(255, 255, 255, 0.05) 0.6px, transparent 0.9px),
    radial-gradient(rgba(0, 0, 0, 0.09) 0.6px, transparent 1px),
    linear-gradient(180deg, ${({ $baseColor }) => $baseColor} 0%, ${({ $baseColor }) => $baseColor} 100%);
  background-size: 3px 3px, 4px 4px, 100% 100%;
  background-position: 0 0, 1px 1px, 0 0;
  transition: clip-path 220ms ease, box-shadow 220ms ease;
  will-change: clip-path, box-shadow, background;
  --noren-breeze-right-offset: ${({ $breezeMultiplier }) => `${2 * $breezeMultiplier}%`};
  --noren-breeze-left-offset: ${({ $breezeMultiplier }) => `${4 * $breezeMultiplier}%`};
  --noren-gust-right-peak-offset: ${({ $breezeMultiplier }) => `${9 * $breezeMultiplier}%`};
  --noren-gust-left-peak-offset: ${({ $breezeMultiplier }) => `${15 * $breezeMultiplier}%`};
  --noren-gust-right-secondary-offset: ${({ $breezeMultiplier }) =>
    `${13 * $breezeMultiplier}%`};
  --noren-gust-left-secondary-offset: ${({ $breezeMultiplier }) => `${5 * $breezeMultiplier}%`};
  ${({ $isGusting, $phaseDelayMs }) =>
    $isGusting
      ? css`
          animation: ${norenGust} 1200ms cubic-bezier(0.19, 0.86, 0.35, 1) 1,
            ${norenBreeze} 3600ms ease-in-out infinite;
          animation-delay: 0ms, ${$phaseDelayMs}ms;
        `
      : css`
          animation: ${norenBreeze} 3600ms ease-in-out infinite;
          animation-delay: ${$phaseDelayMs}ms;
        `}
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 50%,
      ${({ $shadeColor }) => `${$shadeColor}80`} 75%,
      ${({ $shadeColor }) => $shadeColor} 100%
    );
    opacity: 0.8;
    ${({ $isGusting }) =>
      $isGusting
        ? css`
            animation: ${norenShadeGust} 1200ms cubic-bezier(0.2, 0.85, 0.2, 1) 1;
          `
        : css`
            animation: none;
          `}
    z-index: 0;
  }
  > * {
    position: relative;
    z-index: 1;
  }
`;
