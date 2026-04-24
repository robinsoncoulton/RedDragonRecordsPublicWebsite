import styled, { css } from "styled-components";
import { designTokens, media } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";

interface ToolsSectionBackgroundProps {
  $overlayColor: string;
}

interface PanelProps extends ThemedElementProps {
  bordered?: boolean;
  borderBottomOnly?: boolean;
  noPadding?: boolean;
}

interface SubHeadingProps extends ThemedElementProps {
  borderTop?: boolean;
}

export const HomeShell = styled.div<ThemedElementProps>`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.xl};
  color: ${({ theme }) => getColors(theme).text};
`;

export const Panel = styled.section<PanelProps>`
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
  padding: ${designTokens.spacing.md} ${designTokens.spacing.xl};
  font-size: ${designTokens.fontSize.md};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const HeroPlaceholder = styled.div<ThemedElementProps>`
  min-height: 24rem;
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
  display: grid;
  place-items: center;
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const ThreeCol = styled.div`
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

export const GalleryGrid = styled.div`
  display: grid;
  gap: ${designTokens.spacing.md};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  ${media.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const GalleryItem = styled.div<ThemedElementProps>`
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
  min-height: 8rem;
  overflow: hidden;
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ToolsGrid = styled.div`
  display: grid;
  gap: ${designTokens.spacing.md};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  ${media.md} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const ToolsSectionBackground = styled.div<ToolsSectionBackgroundProps>`
  position: relative;
  overflow: hidden;
`;

export const ToolsSectionTexture = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.1;
  z-index: 0;
  > * {
    width: 100%;
    height: 100%;
  }
`;

export const ToolsSectionOverlay = styled.div<ToolsSectionBackgroundProps>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(
    0deg,
    ${({ $overlayColor }) => `${$overlayColor}03`} 0%,
    ${({ $overlayColor }) => `${$overlayColor}26`} 42%,
    ${({ $overlayColor }) => `${$overlayColor}4d`} 100%
  );
`;

export const ToolsSectionContent = styled.div`
  position: relative;
  z-index: 2;
`;

export const ToolTile = styled.div<ThemedElementProps>`
  padding: ${designTokens.spacing.lg};
  text-align: center;
`;

export const ToolLabel = styled.p`
  margin-top: ${designTokens.spacing.sm};
  font-size: ${designTokens.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.06em;
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
  padding: ${designTokens.spacing.xxl};
  text-align: center;
`;
