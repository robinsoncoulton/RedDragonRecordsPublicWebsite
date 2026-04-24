import styled from "styled-components";
import { designTokens } from "../../DesignSystem";
import { ThemedElementProps } from "../../Utils/Theme/types";

export const StyledFooter = styled.div<ThemedElementProps>`
  border-top: ${designTokens.borderWidth.thin} solid var(--frame-inner-color);
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${designTokens.spacing.sm};
  color: var(--frame-inner-color);
  font-size: ${designTokens.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.md};
`;

export const FooterCenter = styled.div`
  text-align: center;
  white-space: nowrap;
`;

export const FooterRight = styled.div`
  text-align: right;
  white-space: nowrap;
`;

export const FooterIcon = styled.button`
  color: var(--frame-inner-color);
  width: 2.5rem;
  height: 2.5rem;
  padding: ${designTokens.spacing.sm};
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color var(--theme-transition-duration) var(--theme-transition-easing);
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