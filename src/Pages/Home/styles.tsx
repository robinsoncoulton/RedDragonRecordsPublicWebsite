import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { designTokens, media } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";

interface ToolsSectionBackgroundProps {
  $topColor: string;
}

interface PanelProps extends ThemedElementProps {
  bordered?: boolean;
  borderBottomOnly?: boolean;
  noPadding?: boolean;
}

interface SubHeadingProps extends ThemedElementProps {
  borderTop?: boolean;
}

const headlineWipe = keyframes`
  0% {
    clip-path: inset(0 100% 0 0);
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  100% {
    clip-path: inset(0 0% 0 0);
    opacity: 1;
  }
`;

export const HomeShell = styled.div<ThemedElementProps>`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.xl};
  color: ${({ theme }) => getColors(theme).text};
`;

export const  Panel = styled.section<PanelProps>`
  ${({ noPadding }) =>
    noPadding
      ? css`
          padding: ${designTokens.spacing.none};
        `
      : css`
          padding: ${designTokens.spacing.xl};
        `}
  ${({ bordered }) =>
    bordered
      ? css`
          border-top: ${designTokens.borderWidth.thin} solid var(--frame-inner-color);
          border-bottom: ${designTokens.borderWidth.thin} solid var(--frame-inner-color);
        `
      : ""}
  ${({ borderBottomOnly }) =>
    borderBottomOnly
      ? css`
          border-bottom: ${designTokens.borderWidth.thin} solid var(--frame-inner-color);
        `
      : ""}
`;

export const ServicesPanelShell = styled.div`
  position: relative;
  padding: ${designTokens.spacing["5xl"]};
`;

export const HeroGrid = styled.div`
  display: grid;
  gap: ${designTokens.spacing.xl};
  ${media.lg} {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

export const Headline = styled.h1`
  font-family: var(--font-headline);
  font-size: ${designTokens.fontSize["6xl"]};
  line-height: ${designTokens.lineHeight.tight};
  margin-bottom: ${designTokens.spacing.md};
`;

export const HeadlineStack = styled(Headline)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

interface HeadlineWipeLineProps {
  $delayMs: number;
}

export const HeadlineWipeLine = styled.span<HeadlineWipeLineProps>`
  display: block;
  width: fit-content;
  will-change: clip-path, opacity;
  animation-name: ${headlineWipe};
  animation-duration: 0.65s;
  animation-timing-function: cubic-bezier(0.2, 0.85, 0.2, 1);
  animation-delay: ${({ $delayMs }) => `${$delayMs}ms`};
  animation-fill-mode: both;
  animation-iteration-count: 1;
`;

export const SubHeading = styled.h2<SubHeadingProps>`
  font-family: var(--font-subheadline);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize["3xl"]};
  line-height: ${designTokens.lineHeight.compact};
  margin-bottom: ${designTokens.spacing.sm};
  ${({ borderTop, theme }) =>
    borderTop
      ? css`
          border-top: ${designTokens.borderWidth.thin} solid
            ${getColors(theme).subheadingBorder};
          padding-top: ${designTokens.spacing.sm};
        `
      : ""}
`;

export const Body = styled.p<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.normal};
`;

export const PrimaryButton = styled.button<ThemedElementProps>`
  margin-top: ${designTokens.spacing.xl};
  border: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).primary};
  color: ${({ theme }) => getColors(theme).primary};
  background: ${({ theme }) => getColors(theme).background};
  border-radius: ${designTokens.radius.md};
  position: relative;
  overflow: hidden;
  padding: ${designTokens.spacing.md} ${designTokens.spacing["4xl"]}
    ${designTokens.spacing.md} ${designTokens.spacing.xl};
  min-width: 14rem;
  font-size: ${designTokens.fontSize.md};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.9, 0, 0.1, 1);
  &:hover {
    color: ${({ theme }) => getColors(theme).background};
  }
`;

export const PrimaryButtonText = styled.span`
  position: relative;
  z-index: 3;
`;

export const PrimaryButtonFill = styled.span<ThemedElementProps>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3.25rem;
  background: ${({ theme }) => getColors(theme).primary};
  border-radius: ${designTokens.radius.md} ${designTokens.radius.md}
    ${designTokens.radius.md} 0;
  z-index: 1;
  transition: width 0.3s cubic-bezier(0.9, 0, 0.1, 1),
    border-radius 0.3s cubic-bezier(0.9, 0, 0.1, 1);
  ${PrimaryButton}:hover & {
    width: 100%;
    border-radius: ${designTokens.radius.md};
  }
`;

export const PrimaryButtonArrow = styled.span<ThemedElementProps>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3.25rem;
  color: ${({ theme }) => getColors(theme).background};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
`;

export const HeroPlaceholder = styled.div<ThemedElementProps>`
  position: relative;
  min-height: 24rem;
  display: grid;
  place-items: center;
  width: 100%;
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const HeroLogo = styled.img`
  position: absolute;
  bottom: -61px;
  right: -100px;
  height: 128%;
`;

export const HeroVerticalBanner = styled.div<ThemedElementProps>`
  font-family: Chinese1;
  font-size: ${designTokens.fontSize["5xl"]};
  color: ${({ theme }) => getColors(theme).primary};
  position: absolute;
  top: ${designTokens.spacing.lg};
  right: ${designTokens.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
`;

export const HeroCharacter = styled.p`
  margin: 0;
`;

export const ThreeCol = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: ${designTokens.spacing.xl};
  ${media.lg} {
    grid-template-columns: 0.7fr 1.3fr 0.8fr;
  }
`;

export const ServicesList = styled.div`
  display: grid;
  gap: ${designTokens.spacing.md};
`;

export const ServiceRow = styled.div<ThemedElementProps>`
  border-top: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
  padding-top: ${designTokens.spacing.md};
  display: flex;
  gap: ${designTokens.spacing.md};
  align-items: baseline;
`;

export const ServiceIndex = styled.span<ThemedElementProps>`
  color: ${({ theme }) => getColors(theme).primary};
  min-width: 1.8rem;
  font-size: ${designTokens.fontSize.lg};
`;

export const ServiceName = styled.span`
  font-size: ${designTokens.fontSize.xl};
`;

export const ToolsSectionBackground = styled.div<ToolsSectionBackgroundProps>`
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  margin: 0 2px;
  background: linear-gradient(180deg, ${({ $topColor }) => $topColor} 0%, #000000 100%);
`;

export const ToolsSectionTexture = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.08;
  z-index: 0;
  > * {
    width: 100%;
    height: 100%;
  }
`;

export const ToolsSectionTopTexture = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.25;
  -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  > * {
    width: 100%;
    height: 100%;
  }
`;

export const ToolsSectionContent = styled.div`
  position: relative;
  z-index: 2;
`;

export const ToolsSideFadeOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0) 90%,
    rgba(0, 0, 0, 0.95) 100%
  );
`;


export const ToolTile = styled.div<ThemedElementProps>`
  padding: ${designTokens.spacing.lg};
  min-height: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const ToolLabel = styled.p`
  margin-top: ${designTokens.spacing.md};
  font-size: ${designTokens.fontSize.md};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const ToolIcon = styled.img`
  width: 300px;
  max-width: 100%;
  height: 300px;
  max-height: 100%;
  object-fit: contain;
  background: transparent;
`;

export const ToolCategory = styled.p<ThemedElementProps>`
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize.sm};
  margin-bottom: ${designTokens.spacing.md};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  overflow: visible;
`;

export const CarouselViewport = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  cursor: grab;
  touch-action: pan-y;
`;

export const CarouselContainer = styled.div`
  position: relative;
  z-index: 1;
  overflow: visible;
  display: flex;
  margin-left: -${designTokens.spacing.md};
  padding-bottom: ${designTokens.spacing["3xl"]};
  transition-timing-function: ease-in-out;
`;

export const CarouselSlide = styled.div<ThemedElementProps & { $showSeparator: boolean }>`
  min-width: 0;
  flex: 0 0 90%;
  padding-left: ${designTokens.spacing.md};
  position: relative;
  ${({ $showSeparator, theme }) =>
    $showSeparator
      ? css`
          &::after {
            content: "";
            position: absolute;
            bottom: ${designTokens.spacing.lg};
            right: calc(-${designTokens.spacing.md} / 2);
            transform: translate(50%, -50%);
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 999px;
            background: ${getColors(theme).danger};
            box-shadow: 0 0 5rem ${`${getColors(theme).danger}99`};
          }
        `
      : ""}
  ${media.md} {
    flex: 0 0 48%;
  }
  ${media.lg} {
    flex: 0 0 32%;
  }
`;


export const ViewFullGearLink = styled(Link)<ThemedElementProps>`
  border: ${({ borderless, theme }) => borderless ? "none" : `${designTokens.borderWidth.thin} solid ${getColors(theme).primary}`};
  color: ${({ theme }) => getColors(theme).primary};
  padding: ${designTokens.spacing.sm} ${designTokens.spacing.lg};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  position: absolute;
  bottom: ${designTokens.spacing.sm};
  right: ${designTokens.spacing.sm};
  white-space: nowrap;
  z-index: 3;
`;

export const ToolAssetIcon = styled.div<ThemedElementProps>`
  width: 100%;
  height: auto;
  color: ${({ theme }) => getColors(theme).text};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 100%;
    height: auto;
    display: block;
  }
  path,
  line,
  circle,
  rect,
  polygon,
  polyline {
    fill: currentColor;
    stroke: currentColor;
    stroke-width: 0.0001;
  }
`;

export const CTA = styled.div<ThemedElementProps>`
  padding: ${designTokens.spacing["5xl"]};
  text-align: center;
`;
