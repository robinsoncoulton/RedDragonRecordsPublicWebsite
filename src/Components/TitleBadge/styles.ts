import styled from "styled-components";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";
import { designTokens } from "../../DesignSystem";

export const Container = styled.div<ThemedElementProps>`
  border: ${designTokens.borderWidth.heavy} solid
    ${(props) => getColors(props.theme).text};
  box-sizing: border-box;
  height: min-content;
  padding: ${designTokens.spacing.none} ${designTokens.spacing.lg};
`;

export const Badge = styled.img`
  height: min-content;
`;

export const Title = styled.h1<ThemedElementProps>`
  font-family: "Chinglish1";
  color: ${(props) => getColors(props.theme).text};
  font-size: ${designTokens.fontSize["6xl"]};
  line-height: ${designTokens.lineHeight.tight};
`;
