import styled from "styled-components";
import { getColors } from "../../Styles/colors";
import hexToRgb from "../../Utils/hextToRgba";
import { designTokens } from "../../DesignSystem";

export const StyledNav = styled.div`
  display: flex;
  a {
    margin-right: ${designTokens.spacing.sm};
    text-decoration: none;
    font-family: AkayaTelivigala-Regular;
    font-size: ${designTokens.fontSize.xl};
    padding-bottom: ${designTokens.spacing.md};
    height: min-content;
    color: ${(props) => getColors(props.theme).text};
    opacity: 0.8;

    &:hover {
      border-bottom: ${designTokens.borderWidth.strong} solid
        ${(props) => hexToRgb(getColors(props.theme).text, "1")};
      opacity: 1;
      transition: opacity ${designTokens.duration.normal}
        ${designTokens.easing.in};
    }
  }
`;
