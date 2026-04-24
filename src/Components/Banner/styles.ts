import styled from "styled-components";
import { TailsInterface } from "./types";
import { getColors } from "../../Styles/colors";
import { designTokens } from "../../DesignSystem";

export const Tails = styled.div<TailsInterface>`
  border: ${designTokens.borderWidth.heavy} solid
    ${({ theme }) => getColors(theme).text};
  width: 10rem;
  box-sizing: border-box;
  margin-bottom: ${designTokens.spacing.lg};
`;

export const Container = styled.div`
  margin: ${designTokens.spacing.xxl};
  color: ${({ theme }) => getColors(theme).text};
  display: flex;
  justify-content: center;
`;

export const Body = styled.div`
  border: ${designTokens.borderWidth.heavy} solid
    ${({ theme }) => getColors(theme).text};
  color: ${({ theme }) => getColors(theme).text};
  width: min-content;
  white-space: nowrap;
  padding: ${designTokens.spacing.xl} ${designTokens.spacing["4xl"]}
    ${designTokens.spacing.lg} ${designTokens.spacing["4xl"]};
  font-size: ${designTokens.fontSize["2xl"]};
  box-sizing: border-box;
  margin-top: ${designTokens.spacing.lg};
  position: absolute;
`;

export const Spacer = styled.div`
  border: ${designTokens.borderWidth.heavy} solid transparent;
  width: min-content;
  white-space: nowrap;
  padding: ${designTokens.spacing.xxl};
  font-size: ${designTokens.fontSize.md};
  box-sizing: border-box;
  opacity: 0;
`;
