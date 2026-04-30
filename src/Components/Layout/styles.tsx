import styled from "styled-components";
import { ThemedElementProps } from "../../Utils/Theme/types";
import { getColors } from "../../Styles/colors";
import { designTokens } from "../../DesignSystem";

export const Background = styled.div<ThemedElementProps>`
  display: flex;
  justify-content: center;
  margin: ${designTokens.spacing.none};
  padding: ${designTokens.spacing.xxl} ${designTokens.spacing.none};
  height: 100%;
`;

export const Wrapper = styled.div`
  position: relative;
  margin: ${designTokens.spacing.none} ${designTokens.spacing.lg};
  padding: ${designTokens.spacing.none} ${designTokens.spacing["5xl"]};
  width: 100%;
  max-width: ${designTokens.size.contentMax};
  min-height: ${designTokens.size.pageMinHeight};
  box-sizing: border-box;
  border: ${designTokens.borderWidth.strong} solid
    ${(props) => getColors(props.theme).accent};
`;

export const IosNotchBuffer = styled.div`
  height: env(safe-area-inset-top);
  width: 100%;
  // background: ${(props) => getColors(props.theme).danger};
  background: red;
  top: -500px;
  position: fixed;
  z-index: 99999;
  height: 500px;
`;