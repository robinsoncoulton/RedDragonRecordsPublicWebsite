import styled from "styled-components";
import { designTokens } from "../../DesignSystem";

export const StyledPage = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;
  height: 100%;
  min-height: 100%;
  max-width: ${designTokens.size.contentMax};
  margin: 0 auto 0;
  box-sizing: border-box;
  padding: ${designTokens.spacing.md};
  margin-bottom: ${designTokens.spacing["6xl"]};
  &::before {
    content: "";
    position: absolute;
    inset: ${designTokens.spacing.xs};
    border: 5px solid rgba(107, 35, 27, 0.78);
    pointer-events: none;
  }
  &::after {
    content: "";
    position: absolute;
    inset: ${designTokens.spacing.md};
    border: 1.5px solid var(--frame-inner-color, rgba(103, 78, 61, 0.65));
    pointer-events: none;
  }
`;
