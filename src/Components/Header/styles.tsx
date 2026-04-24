import styled from "styled-components";
import "../../Fonts/powdwrk5.ttf";
import { designTokens } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import hexToRgb from "../../Utils/hextToRgba";

export const StyledHeader = styled.div`
  position: relative;
  top: ${designTokens.spacing.none};
  margin: ${designTokens.spacing["4xl"]} ${designTokens.spacing.none}
    ${designTokens.spacing.lg} ${designTokens.spacing.none};
  display: flex;
  align-items: center;

  margin: 0 ${designTokens.spacing["4xl"]} ${designTokens.spacing["4xl"]};
`;

export const HeaderSide = styled.div<{ align: "left" | "right" }>`
  flex: 0 0 auto;
  min-width: 300px;
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
