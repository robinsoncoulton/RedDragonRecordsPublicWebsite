import styled from "styled-components";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";
import { designTokens, media } from "../../DesignSystem";

export const Container = styled.div<ThemedElementProps>`
  background: transparent;
  width: 100%;
  height: 100%;
  padding: ${designTokens.spacing.none} ${designTokens.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
  ${media.lg} {
    padding: ${designTokens.spacing.none} ${designTokens.spacing.lg};
  }
`;

export const Badge = styled.img`
  height: min-content;
`;

export const Title = styled.h1<ThemedElementProps>`
  font-family: "Chinglish1";
  color: ${(props) => getColors(props.theme).text};
  display: inline-block;
  font-size: ${designTokens.fontSize["6xl"]};
  line-height: ${designTokens.lineHeight.tight};
  text-align: center;
  margin: 0;
  background: transparent;
  white-space: nowrap;
  transform-origin: center;
`;
