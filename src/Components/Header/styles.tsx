import styled from "styled-components";
import "../../Fonts/powdwrk5.ttf";
import { designTokens } from "../../DesignSystem";

export const StyledHeader = styled.div<{
  $isPastThreshold: boolean;
  $forceOpaque: boolean;
}>`
  @property --header-fade-start {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 0%;
  }
  --header-fade-start: ${({ $isPastThreshold, $forceOpaque }) =>
    $isPastThreshold && !$forceOpaque ? "0%" : "100%"};
  --header-fade-duration: ${({ $isPastThreshold, $forceOpaque }) =>
    !$isPastThreshold || $forceOpaque ? "0.14s" : "0.35s"};
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - (${designTokens.spacing["4xl"]} * 2));
  max-width: ${designTokens.size.contentMax};
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: 2002;
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) var(--header-fade-start),
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) var(--header-fade-start),
    rgba(0, 0, 0, 0) 100%
  );
  transition: --header-fade-start var(--header-fade-duration) ease-in-out;
  :hover {
    --header-fade-start: ${({ $isPastThreshold, $forceOpaque }) =>
      $isPastThreshold && !$forceOpaque ? "90%" : "100%"};
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
