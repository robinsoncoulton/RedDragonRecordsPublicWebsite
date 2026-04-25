import styled from "styled-components";
import "../../Fonts/powdwrk5.ttf";
import { designTokens } from "../../DesignSystem";

export const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - (${designTokens.spacing["4xl"]} * 2));
  max-width: ${designTokens.size.contentMax};
  overflow: hidden;
  display: flex;
  align-items: center;
  background: var(--app-background);
  z-index: 1200;
`;

export const HeaderTexture = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.45;
  > * {
    width: 100%;
    height: 100%;
  }
`;

export const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const HeaderSide = styled.div<{ align: "left" | "right" }>`
  flex: 0 0 auto;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.align === "left" ? "flex-start" : "flex-end"};
  position: relative;
  z-index: ${designTokens.zIndex.overlay};
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
`;

export const HeaderLogo = styled.img`
  width: ${designTokens.size.brandLogo};
  height: ${designTokens.size.brandLogo};
`;

export const Title = styled.h1`
  font-family: "MyFont";
  font-size: ${designTokens.fontSize["6xl"]};
`;

export const TitleLogoContainer = styled.div`
  flex: 0 0 auto;
  flex-shrink: 0;
  position: relative;
  padding: ${designTokens.spacing.lg};
  z-index: ${designTokens.zIndex.overlay};
  display: flex;
  align-items: center;
`;

export const LanguageThemeContainer = styled.div`
  height: min-content;
  width: min-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${designTokens.spacing.sm};
`;
