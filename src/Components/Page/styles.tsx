import styled from "styled-components";
import { designTokens } from "../../DesignSystem";

export const StyledPage = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;
  height: 100%;
  min-height: 100%;
  max-width: ${designTokens.size.contentMax};
  margin: 150px auto 300px;
  box-sizing: border-box;
  padding: ${designTokens.spacing.md};
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    inset: ${designTokens.spacing.xs};
    border: 5px solid rgba(107, 35, 27, 0.78);
    pointer-events: none;
    z-index: 1;
  }
  &::after {
    content: "";
    position: absolute;
    inset: ${designTokens.spacing.md};
    border: 1.5px solid var(--frame-inner-color, rgba(103, 78, 61, 0.65));
    pointer-events: none;
    z-index: 1;
  }
`;

export const StyledPageTexture = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  > * {
    width: 100%;
    height: 100%;
  }
`;

export const StyledPageContent = styled.div`
  position: relative;
  z-index: 2;
`;
