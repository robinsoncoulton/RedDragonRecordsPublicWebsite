import styled from "styled-components";
import { designTokens } from "../../DesignSystem";
import { ThemedElementProps } from "../../Utils/Theme/types";
import { getColors } from "../../Styles/colors";

export const Shell = styled.div<ThemedElementProps & { $wide?: boolean }>`
  width: 100%;
  max-width: ${({ $wide }) => ($wide ? "640px" : "420px")};
  margin: 0 auto;
  box-sizing: border-box;
  padding: ${designTokens.spacing["3xl"]} ${designTokens.spacing.lg};
  color: ${({ theme }) => getColors(theme).text};
  font-family: var(--font-body);
`;

export const LinkButton = styled.button<ThemedElementProps>`
  align-self: center;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: ${({ theme }) => getColors(theme).primary};
  text-decoration: underline;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
