import { getColors } from "./../../Styles/colors";
import styled, { css } from "styled-components";
import { ElementProps } from "./types";
import { Theme } from "../../Utils/Theme/types";
import { designTokens } from "../../DesignSystem";

export const Container = styled.button<ElementProps>`
  width: ${designTokens.size.controlSm};
  height: ${designTokens.size.controlLg};
  position: relative;
  border: none;
  direction: rtl;
  cursor: pointer;
  padding: 0.5rem 0px 0.75rem;
`;

export const Sun = styled.div<ElementProps>`
  width: ${designTokens.size.iconMd};
  height: ${designTokens.size.iconMd};
  margin: 0;
  padding: 0;
  border-radius: ${designTokens.radius.pill};
  position: absolute;
  z-index: ${designTokens.zIndex.raised};
  top: ${designTokens.spacing.sm};
  box-sizing: border-box;

  ${(props) =>
    props.theme === Theme.LIGHT &&
    css`
      background-color: ${(props) => getColors(props.theme).background};
      right: 0;
      box-shadow: 0 0 2px 2px
        ${(props) => getColors(props.theme).accentLight};
      transition: background-color var(--theme-transition-duration)
          var(--theme-transition-easing),
        right var(--theme-transition-duration) var(--theme-transition-easing),
        box-shadow var(--theme-transition-duration)
          var(--theme-transition-easing);
    `}

  ${(props) =>
    props.theme === Theme.DARK &&
    css`
      background-color: ${(props) => getColors(props.theme).background};
      right: ${designTokens.spacing.sm};
      transition: background-color var(--theme-transition-duration)
          var(--theme-transition-easing),
        right var(--theme-transition-duration) var(--theme-transition-easing),
        box-shadow var(--theme-transition-duration)
          var(--theme-transition-easing);
    `}
`;

export const Moon = styled.div<ElementProps>`
  width: ${designTokens.size.iconMd};
  height: ${designTokens.size.iconMd};
  margin: 0;
  padding: 0;
  border-radius: ${designTokens.radius.pill};
  background-color: ${(props) => getColors(props.theme).text};
  box-sizing: border-box;
  position: absolute;
  top: ${designTokens.spacing.sm};
`;
