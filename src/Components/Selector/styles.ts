import styled from "styled-components";
import { getColors } from "./../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";
import { HighlightProps, OptionProps } from "./types";
import { designTokens } from "../../DesignSystem";

export const Container = styled.div<ThemedElementProps>`
  position: relative;
  height: min-content;
  width: min-content;
  padding: ${designTokens.spacing.sm} ${designTokens.spacing.none}
    ${designTokens.spacing.md} ${designTokens.spacing.none};
  display: flex;
  flex-wrap: nowrap;
  gap: ${designTokens.spacing.lg};
`;

export const Highlight = styled.div<HighlightProps>`
  position: absolute;
  bottom: ${designTokens.spacing.none};
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${designTokens.borderWidth.strong};
  border-radius: ${designTokens.radius.pill};
  border-bottom: ${designTokens.borderWidth.strong} solid
    ${(props) => getColors(props.theme).text};
  transition: left ${designTokens.duration.normal} ${designTokens.easing.out},
    width ${designTokens.duration.normal} ${designTokens.easing.out};
  pointer-events: none;
`;

export const Option = styled.button<OptionProps>`
  position: relative;
  z-index: ${designTokens.zIndex.raised};
  background: transparent;
  color: ${(props) => getColors(props.theme).text};
  white-space: nowrap;
  box-sizing: border-box;
  border: 0;
  padding: ${designTokens.spacing.xs} ${designTokens.spacing.none};
  opacity: ${(props) => (props.selected ? 1 : 0.7)};
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.compact};
  transition: opacity ${designTokens.duration.fast} ${designTokens.easing.in};

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
