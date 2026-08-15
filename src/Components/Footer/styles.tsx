import styled from "styled-components";
import { designTokens, media } from "../../DesignSystem";
import { ThemedElementProps } from "../../Utils/Theme/types";

export const StyledFooter = styled.div<ThemedElementProps>`
  margin-top: auto;
  flex-shrink: 0;
  border-top: ${designTokens.borderWidth.thin} solid var(--frame-inner-color);
  padding: ${designTokens.spacing.xl} ${designTokens.spacing.lg};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "icons"
    "location"
    "copyright";
  align-items: center;
  justify-items: center;
  gap: ${designTokens.spacing.md};
  color: var(--frame-inner-color);
  font-size: ${designTokens.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;

  body.artists-page & {
    @media (max-width: 768px) {
      grid-template-areas: "copyright";
      gap: 0;
      margin-top: 0;
      padding: ${designTokens.spacing.sm} ${designTokens.spacing.md}
        calc(${designTokens.spacing.sm} + env(safe-area-inset-bottom, 0px));
      border-top-width: ${designTokens.borderWidth.thin};
    }
  }

  ${media.lg} {
    padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: "icons copyright location";
    justify-items: stretch;
    gap: ${designTokens.spacing.sm};
    font-size: ${designTokens.fontSize.sm};
    letter-spacing: 0.08em;
  }
`;

export const FooterLeft = styled.div`
  grid-area: icons;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${designTokens.spacing.md};
  flex-wrap: wrap;

  body.artists-page & {
    @media (max-width: 768px) {
      display: none;
    }
  }

  ${media.lg} {
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
`;

export const FooterCenter = styled.div`
  grid-area: copyright;
  text-align: center;
  white-space: normal;
  max-width: 28rem;
  line-height: 1.5;

  ${media.lg} {
    white-space: nowrap;
    max-width: none;
    line-height: normal;
  }
`;

export const FooterRight = styled.div`
  grid-area: location;
  text-align: center;
  white-space: normal;

  body.artists-page & {
    @media (max-width: 768px) {
      display: none;
    }
  }

  ${media.lg} {
    text-align: right;
    white-space: nowrap;
  }
`;

export const FooterIcon = styled.a`
  color: var(--frame-inner-color);
  width: 2.75rem;
  height: 2.75rem;
  padding: ${designTokens.spacing.sm};
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: color var(--theme-transition-duration) var(--theme-transition-easing);

  ${media.lg} {
    width: 2.5rem;
    height: 2.5rem;
  }

  &:hover {
    color: var(--footer-icon-hover-color, #ffffff);
  }
  svg {
    width: 100%;
    height: 100%;
  }
  svg path {
    fill: currentColor;
  }
`;