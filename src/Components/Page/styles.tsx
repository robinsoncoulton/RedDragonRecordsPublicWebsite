import styled from "styled-components";
import { designTokens } from "../../DesignSystem";

export const StyledPage = styled.div`
  width: 100%;
  position: relative;
  z-index: -1;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-width: ${designTokens.size.contentMax};
  margin: 0 auto ${designTokens.spacing["6xl"]};
  box-sizing: border-box;
  padding: ${designTokens.spacing.md};
  --page-frame-rise: 12.5rem;

  body.artists-page & {
    z-index: 1000;

    @media (max-width: 768px) {
      --page-frame-rise: 0px;
      --artists-mobile-top: calc(env(safe-area-inset-top, 0px) + 5.25rem);
      height: 100dvh;
      max-height: 100dvh;
      margin-bottom: 0;
      padding: var(--artists-mobile-top) ${designTokens.spacing.sm} 0;
      overflow: hidden;

      &::before,
      &::after {
        bottom: 0;
        right: 0;
        left: 0;
      }
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: calc(-1 * var(--page-frame-rise));
    right: ${designTokens.spacing.xs};
    bottom: ${designTokens.spacing.xs};
    left: ${designTokens.spacing.xs};
    border: 5px solid rgba(107, 35, 27, 0.78);
    border-top: none;
    pointer-events: none;
    z-index: 1;
  }
  &::after {
    content: "";
    position: absolute;
    top: calc(-1 * var(--page-frame-rise) + ${designTokens.spacing.md} - ${designTokens.spacing.xs});
    right: ${designTokens.spacing.md};
    bottom: ${designTokens.spacing.md};
    left: ${designTokens.spacing.md};
    border: 1.5px solid var(--frame-inner-color, rgba(103, 78, 61, 0.65));
    border-top: none;
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
  flex: 1;
  display: flex;
  flex-direction: column;

  body.artists-page & {
    @media (max-width: 768px) {
      display: grid;
      grid-template-rows: minmax(0, 1fr) auto;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }
  }
`;
